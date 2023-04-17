import { Injectable } from '@angular/core';
import { ProviderService, TransactionDataModel } from "@tetu_io/tetu-ui";
import { ON_CHAIN_CALL_RETRY } from "@constants";
import { mergeMap, retry, from, Observable } from "rxjs";
import { IERC20__factory } from "@generated/abi";
import { BigNumber, providers } from "ethers";
import { formatAddress } from "@helpers";
import { NGXLogger } from "ngx-logger";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private providerService: ProviderService, private logger: NGXLogger) {
  }

  createERC20(token: string, signer: providers.JsonRpcSigner) {
    return IERC20__factory.connect(token, signer);
  }

  balanceOf$(account: string, token: string, adr: string): Observable<BigNumber> {
    return this.providerService.getSigner$(account).pipe(
      mergeMap(signer => {
        return this.createERC20(token, signer).balanceOf(adr)
      }),
      retry(ON_CHAIN_CALL_RETRY),
    );
  }

  allowance$(token: string, owner: string, spender: string): Observable<BigNumber> {
    return this.providerService.getSigner$(owner).pipe(
      mergeMap(signer => {
        return this.createERC20(token, signer).allowance(owner, spender);
      }),
      retry(ON_CHAIN_CALL_RETRY),
    )
  }

  approve$(account: string, token: string, spender: string, amount: BigNumber) {
    this.logger.trace(`REQUEST approve
       account: ${account}
       token: ${token}
       spender: ${spender}
       amount: ${amount.toString()}
    `);

    return this.providerService.getSignerAndTxData$(account).pipe(
      mergeMap(data => {
        return from(this.createERC20(token, data.signer).estimateGas.approve(spender, amount)).pipe(
          mergeMap(gas => {
            return this.providerService.onChainCall(
              new TransactionDataModel({
                symbol: token,
                description: `Approve spend ${formatAddress(token)} for ${formatAddress(spender)}`,
              }),
              this.createERC20(token, data.signer).approve(spender, amount, {
                gasLimit: this.providerService.adjustGasLimit(gas),
                ...data.txData,
              }),
            );
          }),
        );
      }),
    );
  }
}
