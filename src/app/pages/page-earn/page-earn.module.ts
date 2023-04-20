import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EarnComponent } from './components/earn/earn.component';
import { PageEarnRoutingModule } from "./page-earn-routing.module";
import { NzIconModule } from "ng-zorro-antd/icon";
import { TooltipModule } from "@tetu_io/tetu-ui";
import { ApyTooltipComponent } from './components/apy-tooltip/apy-tooltip.component';



@NgModule({
  declarations: [
    EarnComponent,
    ApyTooltipComponent
  ],
  imports: [
    CommonModule,
    PageEarnRoutingModule,
    NzIconModule,
    TooltipModule,
  ],
  exports: [
    PageEarnRoutingModule
  ]
})
export class PageEarnModule { }
