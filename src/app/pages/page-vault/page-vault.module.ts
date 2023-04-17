import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VaultComponent } from './components/vault/vault.component';
import { PageVaultRoutingModule } from "./page-vault-routing.module";
import { ButtonModule } from "@tetu_io/tetu-ui";



@NgModule({
  declarations: [
    VaultComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    PageVaultRoutingModule
  ]
})
export class PageVaultModule { }
