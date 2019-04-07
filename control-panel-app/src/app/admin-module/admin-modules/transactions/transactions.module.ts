import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: TransactionsComponent
}];

export const TransactionsRoutingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [TransactionsComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule
  ]
})

export class TransactionsModule {
}
