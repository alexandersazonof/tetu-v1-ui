import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
// import { UserEntity } from '@generated/gql';
// import { formatAddress } from '@helpers';
// import { SubgraphService } from '@services';
// import { RewardsDataService } from '@services/data/rewards-data.service';
import { MODALS_IDS } from '@shared/constants/modals.constant';
import {
  DeviceService,
  DestroyService,
  Mediator,
  MenuActions,
  ProviderService,
  Web3Actions,
  Web3ModalService,
  CHAIN_FIELDS,
  DEFAULT_CHAIN,
} from '@tetu_io/tetu-ui';
import { formatUnits } from 'ethers/lib/utils';
import { NzModalService } from 'ng-zorro-antd/modal';
import { debounceTime, filter, map, mergeMap, takeUntil } from 'rxjs';
import { getNetwork } from "@services/web3modal-ts/helpers";
import { numberToCompact } from "@helpers";
import { VaultDataService } from '@services/data/vault-data.service';
import { TokenService } from '@services/onchain/token.service';

@Component({
  selector: 'tetu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
  host: {
    class: 'g-flex-column',
  },
})
export class AppComponent implements OnInit, AfterViewInit {
  @HostBinding('class.bg-animation')
  get isBgAnimation(): boolean {
    return (!this.account && this.netChecked) || this.chainId !== this.expectedChainId;
  }

  isWeb3Connected = false;
  account?: string;
  chainId?: number;
  accountFormatted?: string;
  balance = '0';
  rewardsUsdValue = 0;
  rewardsUsdValueFormatted = '0';
  netChecked: boolean = false;
  expectedChainId = DEFAULT_CHAIN[CHAIN_FIELDS.ID];
  MODALS_IDS = MODALS_IDS;

  constructor(
    public device: DeviceService,
    private destroy$: DestroyService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private providerService: ProviderService,
    private web3Modal: Web3ModalService,
    private nzModalService: NzModalService,
    private mediator: Mediator,
    private vaultDataService: VaultDataService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.providerService.subscribeOnAccountAndNetwork(
      this.destroy$ as never,
      this.changeDetectorRef,
      account => {
        this.isWeb3Connected = true;

        if (this.account) {
          this.reset();
        }

        this.account = account;

        this.nzModalService.closeAll();

        this.initData();
        this.loadVaults();
      },
      chainId => {
        if (this.chainId) {
          this.reset();
        }

        this.chainId = chainId;

        if (chainId !== DEFAULT_CHAIN[CHAIN_FIELDS.ID]) {
          this.closeModals();
        }
        this.initData();
        this.loadVaults();
      },
    );
  }

  ngAfterViewInit(): void {
    this.connectWeb3Modal();

    this.mediator
      .ofAction(Web3Actions.Connected, this.destroy$)
      .pipe(
        filter(() => !this.netChecked),
        debounceTime(1000),
      )
      .subscribe(() => {
        this.netChecked = true;

        (document.getElementById('background-video') as HTMLVideoElement)?.play();

        this.changeDetectorRef.markForCheck();
      });
  }

  initData() {
    if (this.account && this.chainId) {
      this.getBalance();
    }
  }

  connectWeb3Modal() {
    console.log('connectWeb3Modal')
    this.web3Modal
      .connect$()
      .pipe(
        mergeMap(web3 => {
          return web3.eth.getAccounts();
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(([account]) => {
        this.isWeb3Connected = true;

        this.account = account;

        this.nzModalService.closeAll();

        this.getBalance();

        this.changeDetectorRef.detectChanges();
      });
  }

  reset() {
    window.location.reload();
  }

  getBalance() {
    this.providerService
      .getProvider$()
      .pipe(
        mergeMap(p => {
          return p.getBalance(this.account || '');
        }),
        map(balance => Number(formatUnits(balance)).toFixed(3)),
        takeUntil(this.destroy$),
      )
      .subscribe(balance => {
        this.balance = `${balance}`;
        this.changeDetectorRef.detectChanges();
      });
  }

  onMenu() {
    this.mediator.dispatch(new MenuActions.MenuOpen());
  }

  private closeModals() {
    this.nzModalService.closeAll();

    document.querySelectorAll('.ant-drawer').forEach(el => {
      el.classList.remove('ant-drawer-open');
    });

    document.querySelectorAll('.ant-drawer-content-wrapper').forEach(el => {
      (el as HTMLElement).style.transform = 'translateY(100%)';
    });

    this.changeDetectorRef.detectChanges();
  }

  loadVaults() {
    if (this.chainId && this.chainId != 0) {
      this.vaultDataService.getVaultsByNetwork(getNetwork(this.chainId).toUpperCase())
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          const vaults = data.filter(v => v.active);
          vaults.forEach(v => {
            v.tvlUsdcFormatted = numberToCompact(+formatUnits(v.tvlUsdc, v.decimals), 2)
            v.price = v.tvlUsdc / v.tvl
            if (this.account) {
              this.tokenService.balanceOf$(this.account, v.addr, this.account)
                .pipe(takeUntil(this.destroy$))
                .subscribe(balance => {
                  if (balance && v.price > 0) {
                    v.userBalance = +balance.toString()
                    v.userBalanceUsdc = numberToCompact(v.userBalance * v.price / 10 ** v.decimals, 1)
                  }
                })
            }
          })
          this.vaultDataService.setVaults(vaults)
        })
    }
  }
}
