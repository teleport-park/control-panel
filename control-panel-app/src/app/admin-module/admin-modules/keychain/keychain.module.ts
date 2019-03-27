import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeychainComponent } from './keychain.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';

const routes: Routes = [{
  path: '',
  component: KeychainComponent,
  children: [{
    path: 'cards',
    component: CardsComponent,
    data: {title: 'ADMIN_MENU_CARDS'}
  }]
}];

export const KeychainRouteModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [KeychainComponent, CardsComponent],
  imports: [
    CommonModule,
    KeychainRouteModule
  ]
})
export class KeychainModule { }
