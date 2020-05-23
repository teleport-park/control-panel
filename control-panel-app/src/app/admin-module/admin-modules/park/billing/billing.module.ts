import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BillingComponent } from './billing.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { InvoicesComponent } from './components/invoces/invoices.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { PermissionGuard } from '../../../../common/auth-module/guards/permission-guard';
import { SharedModule } from '../../../../common/shared-module/shared.module';
import { MaterialModule } from '../../../../material.module';
import { FormsModule } from '@angular/forms';
import { TranslationModule } from '../../../../common/translations-module/translation.module';
import { TransactionsService } from './components/transactions/transactions.service';
import { InvoicesService } from './components/invoces/invoices.service';
import { AccountsService } from './components/accounts/accounts.service';

const routes: Routes = [{
   path: '',
   component: BillingComponent,
   children: [
      {
         path: '',
         redirectTo: 'transactions',
         pathMatch: 'full',
      },
      {
         path: 'transactions',
         component: TransactionsComponent,
         data: {title: 'ADMIN_MENU_TRANSACTIONS'},
         canActivate: [PermissionGuard]
      }, {
         path: 'invoices',
         component: InvoicesComponent,
         data: {title: 'ADMIN_MENU_INVOICES'},
         canActivate: [PermissionGuard]
      }, {
         path: 'accounts',
         component: AccountsComponent,
         data: {title: 'ADMIN_MENU_ACCOUNTS'},
         canActivate: [PermissionGuard]
      }]
}];

export const BillingRoutingModule = RouterModule.forChild(routes);


@NgModule({
   declarations: [BillingComponent, TransactionsComponent, InvoicesComponent, AccountsComponent],
   imports: [
      CommonModule,
      BillingRoutingModule,
      SharedModule,
      MaterialModule,
      FormsModule,
      TranslationModule
   ],
   providers: [TransactionsService, InvoicesService, AccountsService]
})
export class BillingModule {
}
