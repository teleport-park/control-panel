import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeychainComponent } from './keychain.component';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { SharedModule } from '../../../common/shared-module/shared.module';
import { MaterialModule } from '../../../material.module';
import { CardsService } from './cards/services/cards.service';
import { PermissionGuard } from '../../../common/auth-module/guards/permission-guard';

const routes: Routes = [{
  path: '',
  component: KeychainComponent,
  children: [{
    path: 'cards',
    component: CardsComponent,
    data: {title: 'ADMIN_MENU_CARDS'},
    canActivate: [PermissionGuard]
  }]
}];

export const KeychainRouteModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [KeychainComponent, CardsComponent],
  imports: [
    CommonModule,
    KeychainRouteModule,
    SharedModule,
    MaterialModule
  ],
  providers: [CardsService]
})
export class KeychainModule {
}
