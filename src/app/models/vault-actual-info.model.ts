export class VaultActualInfoModel {
  readonly vaultAdr: string;
  readonly sharePrice: string;

  constructor(vaultAdr: string, sharePrice: string) {
    this.vaultAdr = vaultAdr;
    this.sharePrice = sharePrice;
  }
}
