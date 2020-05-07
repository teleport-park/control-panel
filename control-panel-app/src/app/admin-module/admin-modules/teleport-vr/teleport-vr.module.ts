import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VrMachinesComponent } from './vr-machines/vr-machines.component';
import { VrGamesComponent } from './vr-games/vr-games.component';
import { TeleportVrComponent } from './teleport-vr.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '../../../common/auth-module/guards/permission-guard';
import { SharedModule } from '../../../common/shared-module/shared.module';
import { MaterialModule } from '../../../material.module';
import { TranslationModule } from '../../../common/translations-module/translation.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{
    path: '', component: TeleportVrComponent,
    children: [{
        path: '',
        redirectTo: 'vr-controllers',
        pathMatch: 'full'
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
    declarations: [VrMachinesComponent, VrGamesComponent, TeleportVrComponent],
    imports: [
        CommonModule,
        TeleportNGRouterModule,
        SharedModule,
        MaterialModule,
        TranslationModule,
        ReactiveFormsModule
    ]
})
export class TeleportVrModule {
}
