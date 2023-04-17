import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EarnComponent } from './components/earn/earn.component';
import { PageEarnRoutingModule } from "./page-earn-routing.module";



@NgModule({
  declarations: [
    EarnComponent
  ],
  imports: [
    CommonModule,
    PageEarnRoutingModule
  ],
  exports: [
    PageEarnRoutingModule
  ]
})
export class PageEarnModule { }
