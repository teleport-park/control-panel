import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashboxComponent } from './cashbox.component';
import { CashboxMachinesComponent } from './cashbox-machines/cashbox-machines.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '../../../common/auth-module/guards/permission-guard';

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

@NgModule({
    declarations: [CashboxComponent, CashboxMachinesComponent],
    imports: [
        CommonModule,
        CashboxRouterModule
    ]
})
export class CashboxModule {
}
