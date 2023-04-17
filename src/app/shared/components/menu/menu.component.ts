import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MENU_TABS_FILTERED } from '@constants';
import { DestroyService, Mediator, MenuActions, TabItemModel } from '@tetu_io/tetu-ui';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'tetu-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class MenuComponent implements OnInit {
  @ViewChild('titleTpl') titleTpl?: TemplateRef<{}>;
  @ViewChild('contentTpl') contentTpl?: TemplateRef<{}>;

  tabs: TabItemModel[] = MENU_TABS_FILTERED;

  constructor(private mediator: Mediator, private destroy$: DestroyService, private nzModalService: NzModalService) {}

  ngOnInit() {
    this.mediator.ofAction(MenuActions.MenuOpen, this.destroy$).subscribe(() => {
      this.openMenu();
    });
  }

  closeModal() {
    this.nzModalService.closeAll();
  }

  private openMenu() {
    this.nzModalService.create({
      nzTitle: this.titleTpl,
      nzFooter: null,
      nzContent: this.contentTpl,
      nzMaskClosable: true,
      nzClosable: false,
      nzWrapClassName: 'modal-mobile__wrap',
      nzClassName: 'modal-mobile__content',
    });
  }
}
