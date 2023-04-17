import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MAIN_ROUTES } from '@constants';
import { VaultComponent } from "./components/vault/vault.component";


const routes: Routes = [{ path: MAIN_ROUTES.EMPTY, component: VaultComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageVaultRoutingModule {}
