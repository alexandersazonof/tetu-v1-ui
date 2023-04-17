import { BribeVaultEntity } from '@generated/gql';

import { AmountModel } from './amount.model';

export class BribeModel {
  bribeEntity: BribeVaultEntity;
  rewards: AmountModel[];

  constructor(bribeEntity: BribeVaultEntity, rewards: AmountModel[]) {
    this.bribeEntity = bribeEntity;
    this.rewards = rewards;
  }
}
