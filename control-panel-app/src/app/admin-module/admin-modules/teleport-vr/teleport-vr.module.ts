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
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../services/api-urls.service';
import { CommonInstanceService } from '../../../services';
import { TVRController } from '../../../models/controller';
import { INSTANCE_SERVICE } from '../../../models/intefaces';
import { ControllerGamesService } from '../../../services/common-services/controller-games.service';

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

export function VrMachinesFactory(http: HttpClient, apiUrlService: ApiUrlsService) {
    return new CommonInstanceService(http, apiUrlService.getTVRMachines, (item) => new TVRController(item));
}

@NgModule({
    declarations: [VrMachinesComponent, VrGamesComponent, TeleportVrComponent],
    imports: [
        CommonModule,
        TeleportNGRouterModule,
        SharedModule,
        MaterialModule,
        TranslationModule,
        ReactiveFormsModule
    ],
    providers: [
        {provide: INSTANCE_SERVICE, useFactory: VrMachinesFactory, deps: [HttpClient, ApiUrlsService]},
        ControllerGamesService
    ]
})
export class TeleportVrModule {
}
