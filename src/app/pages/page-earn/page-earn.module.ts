import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EarnComponent } from './components/earn/earn.component';
import { PageEarnRoutingModule } from "./page-earn-routing.module";
import { NzIconModule } from "ng-zorro-antd/icon";
import { SelectDrawerModule, TooltipModule } from "@tetu_io/tetu-ui";
import { ApyTooltipComponent } from './components/apy-tooltip/apy-tooltip.component';
import { ApyModalComponent } from './components/apy-modal/apy-modal.component';
import { ApyDetailsComponent } from './components/apy-details/apy-details.component';



@NgModule({
  declarations: [
    EarnComponent,
    ApyTooltipComponent,
    ApyModalComponent,
    ApyDetailsComponent
  ],
  imports: [
    CommonModule,
    PageEarnRoutingModule,
    NzIconModule,
    TooltipModule,
    SelectDrawerModule,
  ],
  exports: [
    PageEarnRoutingModule,
    ApyModalComponent
  ]
})
export class PageEarnModule { }
