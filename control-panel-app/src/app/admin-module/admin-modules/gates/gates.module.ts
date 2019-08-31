import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GatesComponent } from './gates/gates.component';
import { GatesMainComponent } from './gates-main.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '../../../common/auth-module/guards/permission-guard';
import { SharedModule } from '../../../common/shared-module/shared.module';
import { MaterialModule } from '../../../material.module';
import { ZonesComponent } from './zones/zones.component';

const routes: Routes = [{
    path: '',
    component: GatesMainComponent,
    children: [{
        path: '', redirectTo: 'gates', canActivate: [PermissionGuard]
    }, {
        path: 'gates', component: GatesComponent, data: {title: 'ADMIN_MENU_GATES'}, canActivate: [PermissionGuard]
    }, {
        path: 'zones', component: ZonesComponent, data: {title: 'ADMIN_MENU_ZONES'}, canActivate: [PermissionGuard]
    }]
}];

export const GatesRouteModule = RouterModule.forChild(routes);

@NgModule({
    declarations: [GatesComponent, GatesMainComponent, ZonesComponent],
    imports: [
        CommonModule,
        GatesRouteModule,
        SharedModule,
        MaterialModule
    ]
})
export class GatesModule {
}
