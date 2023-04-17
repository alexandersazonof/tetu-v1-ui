import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MAIN_ROUTES } from '@constants';
import { EarnComponent } from "./components/earn/earn.component";


const routes: Routes = [{ path: MAIN_ROUTES.EMPTY, component: EarnComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageEarnRoutingModule {}
