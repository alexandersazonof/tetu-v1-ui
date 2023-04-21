import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DestroyService, Mediator, ModalActions } from "@tetu_io/tetu-ui";
import { VaultModel } from "@models";
import { filter, takeUntil } from "rxjs";
import { NzModalRef } from "ng-zorro-antd/modal";
import { DEFAULT_ICON, EXCLUDE_VAULT_ICON, getIcon } from "@constants/icons/icons";
import { getPlatformByVault } from "@helpers/platform.helper";
import { getDescriptionByVault, getAdditionalDescription } from "@helpers/description.helper";
import { TokenService } from '@services/onchain/token.service';
import { numberToCompact } from "@helpers";
import { calculateApy, calculateDetailsApy } from "@helpers/apr.helper";
import { ApyFullDetailsModel } from "@models/apy.model";

@Component({
  selector: 'tetu-apy-modal',
  templateUrl: './apy-modal.component.html',
  styleUrls: ['./apy-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class ApyModalComponent implements OnInit {
  @Input() chainId;
  @Input() account;
  @Input() modalId;
  @Input() vault: VaultModel | undefined;

  isOpened = false;
  isVisible: boolean = false;
  rewardTokenNames: string[] = []
  apyDetails: ApyFullDetailsModel | undefined;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private destroy$: DestroyService,
    private mediator: Mediator,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.getRewardTokeName();
    this.getFullApy();
    this.mediator
      .ofAction(ModalActions.ModalOpen, this.destroy$)
      .pipe(filter(payload => !payload || payload.modalId === this.modalId))
      .subscribe(() => this.openModal());
  }

  onClose() {
    this.isVisible = false;
  }

  private openModal() {
    this.isVisible = true;

    this.changeDetectorRef.detectChanges();
  }

  getFullApy() {
    if (this.vault) {
      this.apyDetails = calculateDetailsApy(this.vault);
    }
  }

  getRewardTokeName(): void {
    if (this.vault) {
      this.vault.rewardTokens.forEach(reward => {
        this.tokenService.name$(this.account, reward)
          .pipe(takeUntil(this.destroy$))
          .subscribe(result => {
            this.rewardTokenNames.push(result);
            this.changeDetectorRef.detectChanges();
          })
      })
    }
  }

  getIconForVault(): string[] {
    if (this.vault) {
      const result = this.getIcon(this.vault.underlying);
      if (result != DEFAULT_ICON) {
        return [result];
      }

      return this.vault.assets.filter(asset => !EXCLUDE_VAULT_ICON.includes(asset.toLowerCase())).map(asset => this.getIcon(asset))
    }
    return [DEFAULT_ICON];
  }

  getIcon(address: string): string {
    return getIcon(this.chainId, address)
  }

  getPlatform(): string {
    if (this.vault) {
      return getPlatformByVault(this.vault);
    }
    return '';
  }

  getDescription(): string | null {
    if (this.vault) {
      return getDescriptionByVault(this.vault, this.chainId);
    }
    return null;
  }

  getAdditionalDescription(): string | null {
    if (this.vault) {
      return getAdditionalDescription(this.vault, this.chainId);
    }
    return null;
  }

  getAprForRewardToken(index: number): string {
    if (this.vault && this.vault.rewardsApr[index] > 0) {
      return numberToCompact(this.vault.rewardsApr[index] / 10 ** 18, 2)
    }

    return '0;'
  }

  getApyForRewardToken(index: number): string {
    if (this.vault && this.vault.rewardsApr[index] > 0) {
      return numberToCompact(calculateApy(this.vault.rewardsApr[index] / 10 ** 18).apy, 2)
    }

    return '0;'
  }

  canShowApy(index: number): boolean {
    if (this.vault && this.vault.rewardsApr[index] > 0) {
      return true;
    }
    return false;
  }

  canShowRewards(): boolean {
    if (this.vault) {
      return this.vault.rewardTokensBal.filter(r => r != 0).length > 0
    }
    return false;
  }

  canShowTradingFeeApy(): boolean {
    if (this.vault) {
      return this.vault.swapFeesAprDaily > 0
    }
    return false
  }
}
