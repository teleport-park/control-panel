import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeleportPolyComponent } from './teleport-poly.component';
import { PolyServersComponent } from './poly-servers/poly-servers.component';
import { PolyControllersAppsComponent } from './poly-controllers-apps/poly-controllers-apps.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '../../../common/auth-module/guards/permission-guard';

const routes: Routes = [{
    path: '',
    component: TeleportPolyComponent,
    children: [{
        path: '',
        redirectTo: 'poly-servers',
        pathMatch: 'full'
    }, {
        path: 'poly-servers',
        component: PolyServersComponent,
        data: {title: 'ADMIN_MENU_SERVERS'},
        canActivate: [PermissionGuard]
    }, {
        path: 'poly-controllers',
        component: PolyControllersAppsComponent,
        data: {title: 'ADMIN_MENU_CONTROLLERS'},
        canActivate: [PermissionGuard]
    }]
}];

export const TeleportPolyRouterModule = RouterModule.forChild(routes);

@NgModule({
    declarations: [TeleportPolyComponent, PolyServersComponent, PolyControllersAppsComponent],
    imports: [
        CommonModule,
        TeleportPolyRouterModule
    ]
})
export class TeleportPolyModule {
}
