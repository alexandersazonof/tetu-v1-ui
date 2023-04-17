import { TokenEntity } from '@generated/gql';
import { numberToCompact } from '@helpers';
import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';

export class AmountModel {
  readonly token: string;
  readonly tokenSymbol: string;
  amount: number;
  amountFormatted: string;
  amountUsd: number;
  amountUsdFormatted: string;

  constructor(token: string, tokenSymbol: string, amount: number, amountUsd: number) {
    this.token = token;
    this.tokenSymbol = tokenSymbol;
    this.amount = amount;
    this.amountFormatted = numberToCompact(amount);
    this.amountUsd = amountUsd;
    this.amountUsdFormatted = numberToCompact(amountUsd);
  }

  public static empty() {
    return new AmountModel('', '', 0, 0);
  }

  public static fromTokenEntity(entity: TokenEntity, amount: BigNumber) {
    return new AmountModel(
      entity.id,
      entity.symbol,
      +formatUnits(amount, entity.decimals),
      +formatUnits(amount, entity.decimals) * +entity.usdPrice,
    );
  }
}
