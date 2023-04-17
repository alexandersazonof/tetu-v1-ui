import { Clipboard } from '@angular/cdk/clipboard';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  DestroyService,
  Mediator,
  ModalActions,
  Web3ModalService,
  TransactionDataModel,
  TRANSACTION_STATUS,
  TRANSACTION_STATUS_NAME,
  TransactionsService,
  formatAddress,
} from '@tetu_io/tetu-ui';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { filter } from 'rxjs';

@Component({
  selector: 'tetu-modal-account',
  templateUrl: './modal-account.component.html',
  styleUrls: ['./modal-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class ModalAccountComponent implements OnInit, OnChanges {
  @ViewChild('titleTpl') titleTpl?: TemplateRef<{}>;
  @ViewChild('contentTpl') contentTpl?: TemplateRef<{}>;

  @Input() modalId: string = '';
  @Input() account?: string;

  transactions: TransactionDataModel[] = [];

  TransactionStatus = TRANSACTION_STATUS;
  TransactionStatusName = TRANSACTION_STATUS_NAME;

  accountFormatted?: string;
  isCopied = false;

  private modal: NzModalRef | null = null;

  constructor(
    private destroy$: DestroyService,
    private changeDetectorRef: ChangeDetectorRef,
    private mediator: Mediator,
    private nzModalService: NzModalService,
    private clipboard: Clipboard,
    private transactionsService: TransactionsService,
    private web3ModalService: Web3ModalService,
  ) {}

  ngOnInit(): void {
    if (this.account) {
      this.accountFormatted = formatAddress(this.account);
    }

    this.mediator
      .ofAction(ModalActions.ModalOpen, this.destroy$)
      .pipe(filter(payload => !payload || payload.modalId === this.modalId))
      .subscribe(() => this.openModal());
  }

  ngOnChanges({ account }: SimpleChanges): void {
    if (account && this.account) {
      this.accountFormatted = formatAddress(this.account);
    }
  }

  onCloseModal() {
    this.modal?.close();
  }

  onCopy() {
    this.clipboard.copy(this.account || '');

    this.isCopied = true;

    setTimeout(() => {
      this.isCopied = false;

      this.changeDetectorRef.detectChanges();
    }, 3000);
  }

  onPolygon() {
    window.open(`https://polygonscan.com/address/${this.account}`, '_blank');
  }

  onRemoveTransaction(transaction: TransactionDataModel) {
    this.transactionsService.removeTransaction(transaction);

    this.updateTransactions();
  }

  onClearAll() {
    this.transactions = [];

    this.transactionsService.removeAllTransactions();
  }

  private openModal() {
    this.updateTransactions();

    this.modal = this.nzModalService.create({
      nzTitle: this.titleTpl,
      nzFooter: null,
      nzContent: this.contentTpl,
      nzMaskClosable: true,
      nzClosable: false,
      nzCloseIcon: 'close-md-icon',
      nzWrapClassName: 'modal-mobile__wrap',
      nzClassName: 'modal-mobile__content modal-mobile__content--auto-height modal-mobile__content--wide-width',
    });
  }

  onDisconnect() {
    this.web3ModalService.disconnect();
    this.changeDetectorRef.detectChanges();
  }

  private updateTransactions() {
    const transactions = this.transactionsService.getTransactions();
    this.transactions = Object.values(transactions)
      .map(it => new TransactionDataModel(it))
      .sort((a, b) => (b?.date ?? 0) - (a?.date ?? 0));
  }
}
