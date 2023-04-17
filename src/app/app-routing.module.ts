import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MAIN_ROUTES } from "@constants";
import { environment } from "@environments/environment";
import { NetworkGuard } from "@shared/guards/network.guard";

const routes: Routes = [
  {
    path: MAIN_ROUTES.EARN,
    loadChildren: () => import('./pages/page-earn/page-earn.module').then(m => m.PageEarnModule),
    canLoad: [NetworkGuard],
  },
  {
    path: MAIN_ROUTES.VAULT,
    loadChildren: () => import('./pages/page-vault/page-vault.module').then(m => m.PageVaultModule),
    canLoad: [NetworkGuard],
  },
  {
    path: MAIN_ROUTES.EMPTY,
    redirectTo: environment['DEFAULT_ROUTE'] || MAIN_ROUTES.EARN,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
