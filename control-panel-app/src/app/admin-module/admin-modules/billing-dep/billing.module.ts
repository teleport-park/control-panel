import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingComponent } from './billing.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../common/shared-module/shared.module';
import { IncomeTariffsComponent } from './income-tariffs/income-tariffs.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionsService } from './transactions/services/transactions.service';
import { IncomeTariffsService } from './income-tariffs/services/income-tariffs.service';
import { PermissionGuard } from '../../../common/auth-module/guards/permission-guard';

const routes: Routes = [{
  path: '',
  component: BillingComponent,
  children: [ {
    path: 'income-tariffs',
    component: IncomeTariffsComponent,
    data: {title: 'ADMIN_MENU_INCOME_TARIFFS'},
    canActivate: [PermissionGuard]
  }, {
    path: 'transactions',
    component: TransactionsComponent,
    data: {title: 'ADMIN_MENU_TRANSACTIONS'},
    canActivate: [PermissionGuard]
  }]
}];

export const BillingRoutingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [BillingComponent, IncomeTariffsComponent, TransactionsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    BillingRoutingModule
  ],
  providers: [ TransactionsService, IncomeTariffsService]
})
export class BillingModule { }
