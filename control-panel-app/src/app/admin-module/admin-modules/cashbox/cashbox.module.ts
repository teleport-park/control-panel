import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashboxComponent } from './cashbox.component';
import { CashboxMachinesComponent } from './cashbox-machines/cashbox-machines.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '../../../common/auth-module/guards/permission-guard';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { LoaderService } from '../../../services/loader.service';
import { ApiUrlsService } from '../../../services/api-urls.service';
import { CommonInstanceService } from '../../../services';
import { CashBoxController } from '../../../models/controller';
import { INSTANCE_SERVICE } from '../../../models';
import { SharedModule } from '../../../common/shared-module/shared.module';

const routes: Routes = [{
    path: '',
    component: CashboxComponent,
    children: [{
        path: '', redirectTo: 'cashbox-machines', pathMatch: 'full'
    }, {
        path: 'cashbox-machines',
        component: CashboxMachinesComponent,
        data: {title: 'ADMIN_MENU_CASHBOX'},
        canActivate: [PermissionGuard]
    }]
}];

export const CashboxRouterModule = RouterModule.forChild(routes);

export function CashBoxFactory(http: HttpClient, apiUrlService: ApiUrlsService) {
    return new CommonInstanceService(http, apiUrlService.getCashBox, (item) => new CashBoxController(item));
}

@NgModule({
    declarations: [CashboxComponent, CashboxMachinesComponent],
    imports: [
        CommonModule,
        CashboxRouterModule,
        SharedModule
    ],
    providers: [
        {provide: INSTANCE_SERVICE, useFactory: CashBoxFactory, deps: [HttpClient, ApiUrlsService]}
    ]
})
export class CashboxModule {
}
