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
        loadChildren: './admin-modules/dashboard/dashboard.module#DashboardModule',
        data: {title: 'ADMIN_MENU_DASHBOARD'},
        canActivate: [PermissionGuard]
      }, {
        path: 'amusements',
        loadChildren: './admin-modules/amusements/amusements.module#AmusementsModule',
        data: {title: 'ADMIN_MENU_AMUSEMENT'},
        canActivate: [PermissionGuard]
      }, {
        path: 'administration',
        loadChildren: './admin-modules/administration/administration.module#AdministrationModule',
        data: {title: 'ADMIN_MENU_ADMINISTRATION'},
        canActivate: [PermissionGuard]
      }, {
        path: 'billing',
        loadChildren: './admin-modules/billing/billing.module#BillingModule',
        data: {title: 'ADMIN_MENU_BILLING'},
        canActivate: [PermissionGuard]
      }, {
        path: 'user-management',
        loadChildren: './admin-modules/user-management/user-management.module#UserManagementModule',
        data: {title: 'ADMIN_MENU_USER_MANAGEMENT'},
        canActivate: [PermissionGuard]
      }
    ]
  }
];

export const AdminRoutingModule = RouterModule.forChild(routes);
