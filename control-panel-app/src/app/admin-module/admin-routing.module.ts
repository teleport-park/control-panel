import { RouterModule, Routes } from '@angular/router';
import { AdminContainerComponent } from './admin-container.component/admin-container.component';
import { PermissionGuard } from '../common/auth-module/guards/permission-guard';

const routes: Routes = [
    {
        path: '',
        component: AdminContainerComponent,
        children: [
            {
                path: '',
                redirectTo: 'park', // TODO think about redirect to first active route
                pathMatch: 'full',
                canActivate: [PermissionGuard]
            }, {
                path: 'park',
                loadChildren: () => import('./admin-modules/park/park.module').then(m => m.ParkModule),
                data: {title: 'ADMIN_MENU_PARK'},
                canActivate: [PermissionGuard]
            }, {
                path: 'teleport-vr',
                loadChildren: () => import('./admin-modules/teleport-vr/teleport-vr.module').then(m => m.TeleportVrModule),
                data: {title: 'ADMIN_MENU_TELEPORT_VR'},
                canActivate: [PermissionGuard]
            }, {
                path: 'teleport-ng',
                loadChildren: () => import('./admin-modules/teleport-ng/teleport-ng.module').then(m => m.TeleportNgModule),
                data: {title: 'ADMIN_MENU_TELEPORT_NG'},
                canActivate: [PermissionGuard]
            },  {
                path: 'cashbox',
                loadChildren: () => import('./admin-modules/cashbox/cashbox.module').then(m => m.CashboxModule),
                data: {title: 'ADMIN_MENU_CASHBOX'},
                canActivate: [PermissionGuard]
            }
        ]
    }
];

export const AdminRoutingModule = RouterModule.forChild(routes);
