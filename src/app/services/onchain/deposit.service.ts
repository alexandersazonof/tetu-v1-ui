import { Injectable } from '@angular/core';
import { NGXLogger } from "ngx-logger";
import { ProviderService, TransactionDataModel } from "@tetu_io/tetu-ui";
import { DepositHelper, DepositHelper__factory, SmartVault, SmartVault__factory } from "@generated/abi";
import { BigNumber, ContractReceipt, providers } from "ethers";
import { from, mergeMap, Observable } from "rxjs";
import { formatUnits } from "ethers/lib/utils";
import { VaultModel } from "@models";
import { getCoreAddresses } from "@constants/addresses";

@Injectable({
  providedIn: 'root'
})
export class DepositService {

  constructor(private providerService: ProviderService, private logger: NGXLogger) {
  }

  private createDepositHelper(signer: providers.JsonRpcSigner, chainId: number): DepositHelper {
    return DepositHelper__factory.connect(getCoreAddresses(chainId).depositHelper, signer);
  }

  public depositToVault$(
    account: string,
    vault: VaultModel,
    amount: BigNumber,
    chainId: number,
  ): Observable<ContractReceipt> {
    this.logger.trace(`REQUEST depositToVault
    account: ${account}
    vault: ${vault.addr}
    amount: ${amount.toString()}
    chainId: ${chainId}
    `);

    return this.providerService.getSignerAndTxData$(account).pipe(
      mergeMap(data => {
        return from(
          this.createDepositHelper(data.signer, chainId).estimateGas.depositToVault(
            vault.addr,
            amount,
          ),
        ).pipe(
          mergeMap(gas => {
            return this.providerService.onChainCall(
              new TransactionDataModel({
                description: `Deposit to vault ${vault.symbol} amount: ${formatUnits(amount, vault.decimals)}`,
                symbol: vault.symbol,
                amount: formatUnits(amount, vault.underlyingDecimals),
              }),
              this.createDepositHelper(data.signer, chainId).depositToVault(vault.addr, amount, {
                gasLimit: this.providerService.adjustGasLimit(gas),
                ...data.txData,
              }),
            );
          }),
        );
      }),
    );
  }

  public withdrawToVault$(
    account: string,
    vault: VaultModel,
    amount: BigNumber,
    chainId: number,
  ): Observable<ContractReceipt> {
    this.logger.trace(`REQUEST withdrawToVault
    account: ${account}
    vault: ${vault.addr}
    amount: ${amount.toString()}
    chainId: ${chainId}
    `);

    return this.providerService.getSignerAndTxData$(account).pipe(
      mergeMap(data => {
        return from(
          this.createDepositHelper(data.signer, chainId).estimateGas.withdrawFromVault(
            vault.addr,
            amount,
          ),
        ).pipe(
          mergeMap(gas => {
            return this.providerService.onChainCall(
              new TransactionDataModel({
                description: `Withdraw to vault ${vault.symbol} amount: ${formatUnits(amount, vault.decimals)}`,
                symbol: vault.symbol,
                amount: formatUnits(amount, vault.decimals),
              }),
              this.createDepositHelper(data.signer, chainId).withdrawFromVault(vault.addr, amount, {
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
    vault: string,
    chainId: number,
  ): Observable<ContractReceipt> {
    this.logger.trace(`REQUEST getAllRewards
    account: ${account}
    vault: ${vault}
    chainId: ${chainId}
    `);

    return this.providerService.getSignerAndTxData$(account).pipe(
      mergeMap(data => {
        return from(
          this.createDepositHelper(data.signer, chainId).estimateGas.getAllRewards(
            vault,
          ),
        ).pipe(
          mergeMap(gas => {
            return this.providerService.onChainCall(
              new TransactionDataModel({
                description: `Get all rewards for ${vault}`,
              }),
              this.createDepositHelper(data.signer, chainId).getAllRewards(vault, {
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
