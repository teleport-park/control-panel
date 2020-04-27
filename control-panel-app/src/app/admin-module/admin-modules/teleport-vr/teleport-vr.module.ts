import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VrMachinesComponent } from './vr-machines/vr-machines.component';
import { VrControllersComponent } from './vr-controllers/vr-controllers.component';
import { VrGamesComponent } from './vr-games/vr-games.component';
import { TeleportVrComponent } from './teleport-vr.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '../../../common/auth-module/guards/permission-guard';

const routes: Routes = [{
    path: '', component: TeleportVrComponent,
    children: [{
        path: '',
        redirectTo: 'vr-controllers',
        pathMatch: 'full'
    }, {
        path: 'vr-controllers',
        component: VrControllersComponent,
        data: {title: 'ADMIN_MENU_CONTROLLERS'},
        canActivate: [PermissionGuard]
    }, {
        path: 'vr-machines',
        component: VrMachinesComponent,
        data: {title: 'ADMIN_MENU_SERVERS'},
        canActivate: [PermissionGuard]
    }, {
        path: 'vr-games',
        component: VrGamesComponent,
        data: {title: 'ADMIN_MENU_GAMES'},
        canActivate: [PermissionGuard]
    }]
}];

export const TeleportNGRouterModule = RouterModule.forChild(routes);

@NgModule({
    declarations: [VrMachinesComponent, VrControllersComponent, VrGamesComponent, TeleportVrComponent],
    imports: [
        CommonModule,
        TeleportNGRouterModule
    ]
})
export class TeleportVrModule {
}
