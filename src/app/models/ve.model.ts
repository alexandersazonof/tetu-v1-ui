import { VeNftEntity } from '@generated/gql';
import { AmountModel } from '@models/amount.model';
import { ZERO_ADDRESS } from '@shared/constants/addresses/addresses';
import { BN_ZERO } from '@shared/constants/number.constant';
import { format } from 'date-fns';
import { BigNumber } from 'ethers';

export enum VOTE_TYPE {
  UNKNOWN,
  VAULT,
  PLATFORM_INVEST_FUND,
  PLATFORM_GAUGES,
  PLATFORM_STRATEGY,
}

export type VoteDataType = {
  date: Date;
  formattedDate: string;
  title: string;
  meaning: string;
  type: VOTE_TYPE;
  timeLock: boolean;
  target?: string;
  untilUnlockDelay?: string;
};

export class VeModel {
  address: string;
  id: number;

  readonly power: BigNumber;
  readonly powerFormatted: string;
  readonly powerPercent: number;
  readonly lockEnd: Date;
  readonly lockEndFormatted: string;
  readonly veNFTEntity?: VeNftEntity;

  lockedTokens: AmountModel[] = [];

  votes: VoteDataType[] = [];

  expectedApr = '0';
  totalVotes: number = 0;
  votesPerVault = new Map<string, number>();
  votesPerVaultPercent = new Map<string, number>();

  canNotBeWithdrawn = false;

  constructor({
    address,
    id,
    power,
    powerFormatted,
    powerPercent,
    lockEnd,
    veNFTEntity,
  }: {
    address: string;
    id: number;
    power: BigNumber;
    powerFormatted: string;
    powerPercent: number;
    lockEnd: Date;
    veNFTEntity?: VeNftEntity;
  }) {
    this.address = address;
    this.id = id;
    this.power = power;
    this.powerFormatted = powerFormatted;
    this.powerPercent = powerPercent;
    this.lockEnd = lockEnd;
    this.lockEndFormatted = format(lockEnd, 'dd MMMM yyyy');
    this.veNFTEntity = veNFTEntity;

    this.canNotBeWithdrawn = (veNFTEntity?.attachments ?? 0) > 0 || (veNFTEntity?.voted ?? 0) > 0;
  }

  // public merge(from: VeModel): void {
  //   this.address = from.address;
  //   this.id = from.id;
  //   this.power = from.power;
  //   this.powerFormatted = from.powerFormatted;
  //   this.powerPercent = from.powerPercent;
  //   this.lockEnd = from.lockEnd;
  //   this.lockEndFormatted = from.lockEndFormatted;
  //   this.expectedApr = from.expectedApr;
  //   this.lockedTokens = [];
  //   from.lockedTokens.forEach(t => this.lockedTokens.push(structuredClone(t)));
  // }

  public clone(): VeModel {
    const ve = structuredClone(this);
    ve.lockedTokens = [];
    this.lockedTokens.forEach(t => ve.lockedTokens.push(structuredClone(t)));
    return ve;
  }

  addVote(vault: string, value: number) {
    // it is so weird, but we receive 01 here and broke the logic
    value = parseFloat(value + '');
    const prevVote = this.votesPerVault.get(vault) ?? 0;
    this.totalVotes -= prevVote;
    this.totalVotes += value;

    this.votesPerVault.set(vault, value);
    this.votesPerVaultPercent.set(vault, (value / this.totalVotes) * 100);

    for (const v of Array.from(this.votesPerVaultPercent.keys())) {
      const vote = this.votesPerVault.get(v) ?? 0;
      this.votesPerVaultPercent.set(v, (vote / this.totalVotes) * 100);
    }
  }

  public static emptyModel() {
    return new VeModel({
      address: ZERO_ADDRESS,
      id: 0,
      power: BN_ZERO,
      powerFormatted: '0',
      powerPercent: 0,
      lockEnd: new Date(),
    });
  }
}
