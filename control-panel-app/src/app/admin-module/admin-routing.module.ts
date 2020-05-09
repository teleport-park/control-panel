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
            }, {
                path: 'teleport-poly',
                loadChildren: () => import('./admin-modules/teleport-poly/teleport-poly.module').then(m => m.TeleportPolyModule),
                data: {title: 'ADMIN_MENU_TELEPORT_POLY'},
                canActivate: [PermissionGuard]
            }, {
                path: 'gate',
                loadChildren: () => import('./admin-modules/gates/gates.module').then(m => m.GatesModule),
                data: {title: 'ADMIN_MENU_GATES'},
                canActivate: [PermissionGuard]
            }, {
                path: 'cashbox',
                loadChildren: () => import('./admin-modules/cashbox/cashbox.module').then(m => m.CashboxModule),
                data: {title: 'ADMIN_MENU_CASHBOX'},
                canActivate: [PermissionGuard]
            }, {
                path: 'settings',
                loadChildren: () => import('./admin-modules/settings/settings.module').then(m => m.SettingsModule),
                data: {title: 'ADMIN_MENU_SETTINGS'},
                canActivate: [PermissionGuard]
            }
           // {
           //      path: 'games',
           //      loadChildren: () => import('./admin-modules/games/games.module').then(m => m.GamesModule),
           //      data: {title: 'ADMIN_MENU_GAMES'},
           //      canActivate: [PermissionGuard]
           //  }
            // {
            //     path: 'dashboard',
            //     loadChildren: () => import('./admin-modules/dashboard/dashboard.module').then(m => m.DashboardModule),
            //     data: {title: 'ADMIN_MENU_DASHBOARD'},
            //     canActivate: [PermissionGuard]
            // },
            // {
            //     path: 'user-management',
            //     loadChildren: () => import('./admin-modules/user-management/user-management.module').then(m => m.UserManagementModule),
            //     data: {title: 'ADMIN_MENU_USER_MANAGEMENT'},
            //     canActivate: [PermissionGuard]
            // },
        ]
    }
];

export const AdminRoutingModule = RouterModule.forChild(routes);
