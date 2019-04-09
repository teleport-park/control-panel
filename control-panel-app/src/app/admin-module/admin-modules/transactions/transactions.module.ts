import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsService } from './services/transactions.service';
import { SharedModule } from '../../../common/shared-module/shared.module';

const routes: Routes = [{
  path: '',
  component: TransactionsComponent
}];

export const TransactionsRoutingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [TransactionsComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    SharedModule
  ],
  providers: [TransactionsService]
})

export class TransactionsModule {
}
