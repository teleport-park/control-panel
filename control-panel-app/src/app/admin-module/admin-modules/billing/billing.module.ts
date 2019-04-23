import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingComponent } from './billing.component';
import { RouterModule, Routes } from '@angular/router';
import { GamesTariffsComponent } from './games-tariffs/games-tariffs.component';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../common/shared-module/shared.module';
import { TariffsService } from './games-tariffs/services/tariffs.service';
import { IncomeTariffsComponent } from './income-tariffs/income-tariffs.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionsService } from './transactions/services/transactions.service';
import { IncomeTariffsService } from './income-tariffs/services/income-tariffs.service';

const routes: Routes = [{
  path: '',
  component: BillingComponent,
  children: [{
    path: 'games-tariffs',
    component: GamesTariffsComponent,
    data: {title: 'ADMIN_MENU_GAMES_TARIFFS'}
  }, {
    path: 'income-tariffs',
    component: IncomeTariffsComponent,
    data: {title: 'ADMIN_MENU_INCOME_TARIFFS'}
  }, {
    path: 'transactions',
    component: TransactionsComponent,
    data: {title: 'ADMIN_MENU_TRANSACTIONS'}
  }]
}];

export const BillingRoutingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [BillingComponent, GamesTariffsComponent, IncomeTariffsComponent, TransactionsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    BillingRoutingModule
  ],
  providers: [TariffsService, TransactionsService, IncomeTariffsService]
})
export class BillingModule { }
