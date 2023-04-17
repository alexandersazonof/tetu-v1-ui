import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { MAIN_ROUTES, MENU_TABS_FILTERED } from '@constants';
import { getCoreAddresses } from '@constants/addresses';
import { formatAddress, numberToCompact } from '@helpers';
import { MODALS_IDS } from '@shared/constants/modals.constant';
import {
  DestroyService,
  DeviceService,
  Mediator,
  ProviderService,
  TRANSACTION_STATUS,
  SelectItemModel,
  TabItemModel,
  ModalActions,
  DEFAULT_CHAIN,
} from '@tetu_io/tetu-ui';
import { formatUnits } from 'ethers/lib/utils';
import { takeUntil } from 'rxjs';
import { PriceService } from "@services/onchain/price.service";
import { NETWORKS } from "@constants/network.constant";

@Component({
  selector: 'tetu-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class HeaderComponent implements OnInit {
  @Input() balance: string = '0';
  @Input() rewardsUsdValue: string = '0';

  @Output() rewardsHandler: EventEmitter<void> = new EventEmitter<void>();
  @Output() menuHandler: EventEmitter<void> = new EventEmitter<void>();

  networks: SelectItemModel[] = [];
  selectedNetwork: SelectItemModel | null = null;
  accountFormatted?: string;
  account?: string;
  isShowStatusBadge: boolean = false;

  tetuPrice = '0';

  tabs: TabItemModel[] = MENU_TABS_FILTERED;

  MODALS_IDS = MODALS_IDS;

  constructor(
    public device: DeviceService,
    private destroy$: DestroyService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private mediator: Mediator,
    private priceService: PriceService,
    private providerService: ProviderService,
  ) {}

  ngOnInit() {
    this.providerService.subscribeOnAccountAndNetwork(
      this.destroy$ as never,
      this.changeDetectorRef,
      account => {
        this.account = account;
        this.accountFormatted = formatAddress(account);
      },
      chainId => {
        this.priceService
          .getPriceFromPriceCalculator$(chainId ?? 137, getCoreAddresses(chainId)?.tetu ?? '')
          .pipe(takeUntil(this.destroy$))
          .subscribe(price => {
            this.tetuPrice = numberToCompact(+formatUnits(price), 5);
            this.changeDetectorRef.detectChanges();
          });
      },
    );

    this.providerService.ongoingTransaction.pipe(takeUntil(this.destroy$)).subscribe(tx => {
      this.isShowStatusBadge = tx.status === TRANSACTION_STATUS.PENDING;
      this.changeDetectorRef.detectChanges();
    });

    this.networks = NETWORKS;

    [this.selectedNetwork] = this.networks.filter(x => x.id === DEFAULT_CHAIN.id.toString());
  }

  onSelectNetwork(selectedItem: SelectItemModel) {
    this.providerService.changeNetworkAndRedirect(
      +selectedItem.id,
      selectedItem.rpcUrl ?? '',
      selectedItem.label ?? '',
      this.destroy$ as never,
      result => {
        if (!result) {
          [this.selectedNetwork] = this.networks.filter(x => x.id === DEFAULT_CHAIN.id.toString());
          this.changeDetectorRef.detectChanges();
        }
      },
    );
  }

  onConnect() {
    // noop, never happens
  }

  onOpenAccount(modalId: string) {
    this.mediator.dispatch(new ModalActions.ModalOpen(modalId));
  }
}
