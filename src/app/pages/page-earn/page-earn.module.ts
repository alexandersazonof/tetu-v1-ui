import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EarnComponent } from './components/earn/earn.component';
import { PageEarnRoutingModule } from "./page-earn-routing.module";
import { NzIconModule } from "ng-zorro-antd/icon";



@NgModule({
  declarations: [
    EarnComponent
  ],
  imports: [
    CommonModule,
    PageEarnRoutingModule,
    NzIconModule,
  ],
  exports: [
    PageEarnRoutingModule
  ]
})
export class PageEarnModule { }
