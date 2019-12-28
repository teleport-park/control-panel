import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BillingComponent } from './billing.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { InvocesComponent } from './components/invoces/invoces.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { PermissionGuard } from '../../../../common/auth-module/guards/permission-guard';
import { SharedModule } from '../../../../common/shared-module/shared.module';
import { BillingService } from './services/billing.service';
import { MaterialModule } from '../../../../material.module';

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
         component: InvocesComponent,
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
   declarations: [BillingComponent, TransactionsComponent, InvocesComponent, AccountsComponent],
   imports: [
      CommonModule,
      BillingRoutingModule,
      SharedModule,
      MaterialModule
   ],
   providers: [BillingService]
})
export class BillingModule {
   // constructor(overlayContainer: OverlayContainer) {
   //    overlayContainer.getContainerElement().classList.add('light-theme');
   // }
}
