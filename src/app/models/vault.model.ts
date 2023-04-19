import { numberToCompact } from "@helpers";
import { formatUnits } from "ethers/lib/utils";

export class VaultModel {
  addr: string;
  name: string;
  symbol: string;
  decimals: number;
  platform: number;
  tvl: number;
  tvlUsdc: number;
  tvlUsdcFormatted: string;
  active: boolean
  userBalance = 0;
  userBalanceUsdc: string = '0';
  price = 0;
  underlying: string;
  underlyingDecimals = 18;
  rewardTokens: string[] = [];
  rewardsApr: number[] = [];
  fullApr: number = 0;
  swapFeesAprDaily: number = 0;
  tokenUnderlyingApr: TokenUnderlyingAprModel | undefined;
  rewardTokensBal: number[] = [];
  subStrategies: SubStrategyModel[] = [];

  constructor(
    addr: string,
    name: string,
    symbol: string,
    decimals: number,
    platform: number,
    tvlUsdc: number,
    active: boolean,
    tvl: number,
    underlying: string
  ) {
    this.addr = addr;
    this.name = name;
    this.symbol = symbol;
    this.decimals = decimals;
    this.platform = platform;
    this.tvlUsdc = tvlUsdc;
    this.active = active;
    this.tvl = tvl;
    this.tvlUsdcFormatted = numberToCompact(+formatUnits(tvlUsdc, 18), 2)
    this.price = this.tvlUsdc / this.tvl;
    this.underlying = underlying;
  }
}

export class TokenUnderlyingAprModel {
  total: number = 0;
}

export class SubStrategyModel {
  platform: number = 0;
}
