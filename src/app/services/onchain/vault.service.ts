import { Injectable } from "@angular/core";
import { ProviderService, TransactionDataModel } from "@tetu_io/tetu-ui";
import { NGXLogger } from "ngx-logger";
import { BigNumber, ContractReceipt, providers } from "ethers";
import { ContractReader__factory, IERC20__factory, SmartVault__factory } from "@generated/abi";
import { from, mergeMap, Observable, retry } from "rxjs";
import { ON_CHAIN_CALL_RETRY } from "@constants";
import { getCoreAddresses } from "@constants/addresses";
import { VaultModel } from "@models";
import { formatUnits } from "ethers/lib/utils";

@Injectable({
  providedIn: 'root'
})
export class VaultService {

  constructor(private providerService: ProviderService, private logger: NGXLogger) {
  }

  createContractReader(signer: providers.JsonRpcSigner, chainId: number) {
    return ContractReader__factory.connect(getCoreAddresses(chainId).contractReader, signer);
  }

  createSmartVault(signer: providers.JsonRpcSigner, vault: string) {
    return SmartVault__factory.connect(vault, signer);
  }

  userRewardsBoostUsdc$(account: string, vault: string, chainId: number): Observable<BigNumber[]> {
    return this.providerService.getSigner$(account).pipe(
      mergeMap(signer => {
        return this.createContractReader(signer, chainId).userRewardsBoostUsdc(account, vault)
      }),
      retry(ON_CHAIN_CALL_RETRY),
    );
  }

  public withdraw$(
    account: string,
    vault: VaultModel,
    amount: BigNumber,
    chainId: number,
  ): Observable<ContractReceipt> {
    this.logger.trace(`REQUEST withdraw
    account: ${account}
    vault: ${vault.addr}
    amount: ${amount.toString()}
    chainId: ${chainId}
    `);

    return this.providerService.getSignerAndTxData$(account).pipe(
      mergeMap(data => {
        return from(
          this.createSmartVault(data.signer, vault.addr).estimateGas.withdraw(
            amount
          ),
        ).pipe(
          mergeMap(gas => {
            return this.providerService.onChainCall(
              new TransactionDataModel({
                description: `Withdraw from vault ${vault.symbol} amount: ${formatUnits(amount, vault.decimals)}`,
                symbol: vault.symbol,
                amount: formatUnits(amount, vault.decimals),
              }),
              this.createSmartVault(data.signer, vault.addr).withdraw(amount, {
                gasLimit: this.providerService.adjustGasLimit(gas),
                ...data.txData,
              }),
            );
          }),
        );
      }),
    );
  }

  public exit$(
    account: string,
    vault: VaultModel,
    chainId: number,
  ): Observable<ContractReceipt> {
    this.logger.trace(`REQUEST exit
    account: ${account}
    vault: ${vault.addr}
    chainId: ${chainId}
    `);

    return this.providerService.getSignerAndTxData$(account).pipe(
      mergeMap(data => {
        return from(
          this.createSmartVault(data.signer, vault.addr).estimateGas.exit(
          ),
        ).pipe(
          mergeMap(gas => {
            return this.providerService.onChainCall(
              new TransactionDataModel({
                description: `Exit from vault ${vault.symbol}`,
                symbol: vault.symbol,
              }),
              this.createSmartVault(data.signer, vault.addr).exit({
                gasLimit: this.providerService.adjustGasLimit(gas),
                ...data.txData,
              }),
            );
          }),
        );
      }),
    );
  }

  public getAllRewards$(
    account: string,
    vault: VaultModel,
    chainId: number,
  ): Observable<ContractReceipt> {
    this.logger.trace(`REQUEST getAllRewards
    account: ${account}
    vault: ${vault.addr}
    chainId: ${chainId}
    `);

    return this.providerService.getSignerAndTxData$(account).pipe(
      mergeMap(data => {
        return from(
          this.createSmartVault(data.signer, vault.addr).estimateGas.getAllRewards(
          ),
        ).pipe(
          mergeMap(gas => {
            return this.providerService.onChainCall(
              new TransactionDataModel({
                description: `Claim from vault ${vault.symbol}`,
                symbol: vault.symbol,
              }),
              this.createSmartVault(data.signer, vault.addr).getAllRewards({
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
