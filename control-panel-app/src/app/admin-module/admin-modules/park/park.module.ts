import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkComponent } from './park.component';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { PermissionGuard } from '../../../common/auth-module/guards/permission-guard';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../common/shared-module/shared.module';
import { CardsService } from './cards/services/cards.service';
import { GamesService } from './games/services/games.service';
import { GamesComponent } from './games/games.component';
import { UserService } from './users/services/user.service';
import { PackagesComponent } from './packages/packages.component';
import { PricingComponent } from './pricing/pricing.component';
import { TariffsService } from './pricing/services/tariffs.service';
import { PackagesService } from './packages/packages.service';

const routes: Routes = [{
    path: '',
    component: ParkComponent,
    children: [
        {
            path: '', redirectTo: 'visitors', pathMatch: 'full'
        }, {
            path: 'visitors',
            loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
            data: {title: 'ADMIN_MENU_USERS'},
            canActivate: [PermissionGuard]
        }, {
            path: 'cards', component: CardsComponent, data: {title: 'ADMIN_MENU_CARDS'}, canActivate: [PermissionGuard]
        }, {
            path: 'packages', component: PackagesComponent, data: {title: 'ADMIN_MENU_PACKAGES'}, canActivate: [PermissionGuard]
        }, {
            path: 'games', component: GamesComponent, data: {title: 'ADMIN_MENU_GAMES'}, canActivate: [PermissionGuard]
        }, {
            path: 'pricing', component: PricingComponent, data: {title: 'ADMIN_MENU_PRICING'}, canActivate: [PermissionGuard]
        }]
}];

export const ParkRouterModule = RouterModule.forChild(routes);

@NgModule({
    declarations: [ParkComponent, GamesComponent, PackagesComponent, PricingComponent, CardsComponent],
    imports: [
        CommonModule,
        ParkRouterModule,
        MaterialModule,
        SharedModule
    ],
    providers: [CardsService, GamesService, UserService, TariffsService, PackagesService]
})
export class ParkModule {
}
