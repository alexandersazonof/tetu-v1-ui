import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VaultDataService } from "@services/data/vault-data.service";
import { VaultModel } from "@models";
import { takeUntil } from "rxjs";
import { DestroyService, Mediator, ModalActions, ProviderService } from "@tetu_io/tetu-ui";
import { numberToCompact } from "@helpers";
import { formatUnits } from "ethers/lib/utils";
import { TokenService } from '@services/onchain/token.service';
import { getNetwork } from "@services/web3modal-ts/helpers/utils";
import { Router } from '@angular/router';
import { calculateApyByVault } from "@helpers/apr.helper";
import { DEFAULT_ICON, EXCLUDE_VAULT_ICON, getIcon } from "@constants/icons/icons";
import { getPlatformByVault } from "@helpers/platform.helper";
import { MODALS_IDS } from '@shared/constants/modals.constant';

@Component({
  selector: 'tetu-earn',
  templateUrl: './earn.component.html',
  styleUrls: ['./earn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class EarnComponent implements OnInit {

  account = '';
  chainId = 0;

  vaults: VaultModel[] = [];
  MODALS_IDS = MODALS_IDS;


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private destroy$: DestroyService,
    private vaultDataService: VaultDataService,
    private tokenService: TokenService,
    private providerService: ProviderService,
    private router: Router,
    private mediator: Mediator
  ) {}

  ngOnInit(): void {
    this.vaultDataService.vaultsObservable.subscribe(vaults => this.vaults = vaults);
    this.providerService.subscribeOnAccountAndNetwork(
      this.destroy$ as never,
      this.changeDetectorRef,
      account => {
        this.account = account;
        this.loadInitData();
      },
      chainId => {
        this.chainId = chainId;
        this.loadInitData();
      }
    )
  }

  loadInitData() {
    if (this.chainId != 0) {
      this.vaultDataService.getVaultsByNetwork(getNetwork(this.chainId).toUpperCase())
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          this.vaults = data.filter(v => v.active);
          this.vaults.forEach(v => {
            v.tvlUsdcFormatted = numberToCompact(+formatUnits(v.tvlUsdc, 18), 2)
            v.price = v.tvlUsdc / v.tvl
            this.tokenService.balanceOf$(this.account, v.addr, this.account)
              .pipe(takeUntil(this.destroy$))
              .subscribe(balance => {
                if (balance && v.price > 0) {
                  v.userBalance = +balance.toString()
                  v.userBalanceUsdc = numberToCompact(v.userBalance * v.price / 10 ** v.decimals, 1)
                }
                this.changeDetectorRef.detectChanges();
              })
          })
          this.changeDetectorRef.detectChanges();
        })
    }
  }

  goToVault(address: string): void {
    this.router.navigate(['/vault', address]);
    this.vaultDataService.setActiveVault(this.vaults.find(vault => address.toLowerCase() == vault.addr.toLowerCase()));
  }

  calculateApy(vault: VaultModel): string {
    const apy = calculateApyByVault(vault);
    return numberToCompact(apy.getSumApy(), 2)
  }

  getIconForVault(vault: VaultModel): string[] {
    const result = this.getIcon(vault.underlying);
    if (result != DEFAULT_ICON) {
      return [result];
    }

    return vault.assets.filter(asset => !EXCLUDE_VAULT_ICON.includes(asset.toLowerCase())).map(asset => this.getIcon(asset))
  }

  getIcon(address: string): string {
    return getIcon(this.chainId, address)
  }

  canShowRewards(vault: VaultModel): boolean {
    return vault.rewardTokensBal.filter(r => r != 0).length > 0
  }

  showRewardIcon(vault: VaultModel, index: number): boolean {
    return vault.rewardTokensBal[index] != 0;
  }

  getPlatform(vault: VaultModel): string {
    return getPlatformByVault(vault);
  }

  showRedoIcon(vault: VaultModel): boolean {
    return vault.rewardsApr.filter(r => r > 0).length > 0;
  }

  onOpenApy(address: string) {
    const modalId = MODALS_IDS.APY + address;
    this.mediator.dispatch(new ModalActions.ModalOpen(modalId));
  }
}
