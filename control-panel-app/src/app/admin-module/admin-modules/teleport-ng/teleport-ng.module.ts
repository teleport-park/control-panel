import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgServersComponent } from './ng-servers/ng-servers.component';
import { NgControllersComponent } from './ng-controllers/ng-controllers.component';
import { NgGamesComponent } from './ng-games/ng-games.component';
import { TeleportNgComponent } from './teleport-ng.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '../../../common/auth-module/guards/permission-guard';

const routes: Routes = [{
    path: '', component: TeleportNgComponent,
    children: [{
        path: '',
        redirectTo: 'ng-controllers',
        pathMatch: 'full'
    }, {
        path: 'ng-controllers',
        component: NgControllersComponent,
        data: {title: 'ADMIN_MENU_CONTROLLERS'},
        canActivate: [PermissionGuard]
    }, {
        path: 'ng-servers',
        component: NgServersComponent,
        data: {title: 'ADMIN_MENU_SERVERS'},
        canActivate: [PermissionGuard]
    }, {
        path: 'ng-games',
        component: NgGamesComponent,
        data: {title: 'ADMIN_MENU_GAMES'},
        canActivate: [PermissionGuard]
    }]
}];

export const TeleportNGRouterModule = RouterModule.forChild(routes);

@NgModule({
    declarations: [NgServersComponent, NgControllersComponent, NgGamesComponent, TeleportNgComponent],
    imports: [
        CommonModule,
        TeleportNGRouterModule
    ]
})
export class TeleportNgModule {
}
