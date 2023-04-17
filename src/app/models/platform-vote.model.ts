import { VOTE_TYPE } from '@models/ve.model';

export class PlatformVoteModel {
  veId: number;
  voteType: PlatformVoteType;
  target: string;
  desiredValue: number;
  weight: number;
  weightedValue: string;
  timestamp: number;

  constructor(
    veId: number,
    voteType: PlatformVoteType,
    target: string,
    desiredValue: number,
    weight: number,
    weightedValue: string,
    timestamp: number,
  ) {
    this.veId = veId;
    this.voteType = voteType;
    this.target = target;
    this.desiredValue = desiredValue;
    this.weight = weight;
    this.weightedValue = weightedValue;
    this.timestamp = timestamp;
  }

  public static platformTypeByIndex(idx: number) {
    return Object.values(PlatformVoteType)[idx] as PlatformVoteType;
  }

  public static getPlatformTypeIndex(value: PlatformVoteType) {
    return Object.keys(PlatformVoteType).indexOf(value.toString());
  }

  public static platformVoteTypeToPrettyString(idx: number) {
    switch (idx) {
      case PlatformVoteType.INVEST_FUND_RATIO:
        return 'Invest Fund ratio';
      case PlatformVoteType.GAUGE_RATIO:
        return 'Gauge ratio';
      case PlatformVoteType.STRATEGY_COMPOUND:
        return 'Strategy compound ratio';
    }
    return 'Unknown';
  }

  public static platformVoteTypeToVoteType(idx: number) {
    switch (idx) {
      case PlatformVoteType.INVEST_FUND_RATIO:
        return VOTE_TYPE.PLATFORM_INVEST_FUND;
      case PlatformVoteType.GAUGE_RATIO:
        return VOTE_TYPE.PLATFORM_GAUGES;
      case PlatformVoteType.STRATEGY_COMPOUND:
        return VOTE_TYPE.PLATFORM_STRATEGY;
    }
    return VOTE_TYPE.UNKNOWN;
  }
}

export enum PlatformVoteType {
  UNKNOWN,
  INVEST_FUND_RATIO,
  GAUGE_RATIO,
  STRATEGY_COMPOUND,
}
