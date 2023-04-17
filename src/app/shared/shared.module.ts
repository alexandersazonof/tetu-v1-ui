import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ActionStatusModule,
  LayoutModule,
  UiModule,
  DeviceIfDirectiveModule,
  NetworkModalModule,
  WalletModalModule,
} from '@tetu_io/tetu-ui';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NgxEchartsModule } from 'ngx-echarts';
import { HeaderComponent } from "@shared/components/header/header.component";
import { ModalAccountComponent } from "@shared/components/modal-account/modal-account.component";
import { FooterComponent } from "@shared/components/footer/footer.component";
import { MenuComponent } from "@shared/components/menu/menu.component";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ModalAccountComponent
  ],
  imports: [
    CommonModule,
    NzIconModule,
    UiModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    NzSpinModule,
    DeviceIfDirectiveModule,
    ActionStatusModule,
    LayoutModule,
    WalletModalModule,
    NetworkModalModule,
  ],
  exports: [
    ActionStatusModule,
    LayoutModule,
    WalletModalModule,
    NetworkModalModule,
    HeaderComponent,
    FooterComponent,
    MenuComponent
  ],
})
export class SharedModule {}
