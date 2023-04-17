export class RewardHistoryModel {
  time: Date;
  amount: string;
  apr: string;
  gaugeDerivedTVL: string;

  constructor(time: Date, amount: string, apr: string, gaugeDerivedTVL: string) {
    this.time = time;
    this.amount = amount;
    this.apr = apr;
    this.gaugeDerivedTVL = gaugeDerivedTVL;
  }
}
