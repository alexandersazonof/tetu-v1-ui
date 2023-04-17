import { BigNumber } from 'ethers';

export class VaultEstimationModel {
  askedAmount: BigNumber;
  gasCost: string;
  resultAmount: BigNumber;
  resultAmountFormatted: string;
  resultAmountUSD: string;

  constructor({
    askedAmount,
    gasCost,
    resultAmount,
    resultAmountFormatted,
    resultAmountUSD,
  }: {
    askedAmount: BigNumber;
    gasCost: string;
    resultAmount: BigNumber;
    resultAmountFormatted: string;
    resultAmountUSD: string;
  }) {
    this.askedAmount = askedAmount;
    this.gasCost = gasCost;
    this.resultAmount = resultAmount;
    this.resultAmountFormatted = resultAmountFormatted;
    this.resultAmountUSD = resultAmountUSD;
  }
}
