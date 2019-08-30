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
        redirectTo: 'amusements', // TODO think about redirect to first active route
        pathMatch: 'full',
        canActivate: [PermissionGuard]
      }, {
        path: 'dashboard',
        loadChildren: () => import('./admin-modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {title: 'ADMIN_MENU_DASHBOARD'},
        canActivate: [PermissionGuard]
      }, {
        path: 'amusements',
        loadChildren: () => import('./admin-modules/amusements/amusements.module').then(m => m.AmusementsModule),
        data: {title: 'ADMIN_MENU_AMUSEMENT'},
        canActivate: [PermissionGuard]
      }, {
        path: 'administration',
        loadChildren: () => import('./admin-modules/administration/administration.module').then(m => m.AdministrationModule),
        data: {title: 'ADMIN_MENU_ADMINISTRATION'},
        canActivate: [PermissionGuard]
      }, {
        path: 'billing',
        loadChildren: () => import('./admin-modules/billing/billing.module').then(m => m.BillingModule),
        data: {title: 'ADMIN_MENU_BILLING'},
        canActivate: [PermissionGuard]
      }, {
        path: 'user-management',
        loadChildren: () => import('./admin-modules/user-management/user-management.module').then(m => m.UserManagementModule),
        data: {title: 'ADMIN_MENU_USER_MANAGEMENT'},
        canActivate: [PermissionGuard]
      }, {
      path: 'teleport-vr',
        loadChildren: () => import('./admin-modules/teleport-vr/teleport-vr.module').then(m => m.TeleportVrModule),
        data: {title: 'ADMIN_MENU_TELEPORT_VR'},
        canActivate: [PermissionGuard]
      }
    ]
  }
];

export const AdminRoutingModule = RouterModule.forChild(routes);
