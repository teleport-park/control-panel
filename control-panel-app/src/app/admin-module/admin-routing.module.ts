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
        redirectTo: 'dashboard',
        pathMatch: 'full',
        canActivate: [PermissionGuard]
      }, {
        path: 'dashboard',
        loadChildren: './admin-modules/dashboard/dashboard.module#DashboardModule',
        data: {title: 'ADMIN_MENU_DASHBOARD'},
        canActivate: [PermissionGuard]
      }, {
        path: 'users',
        loadChildren: './admin-modules/users/users.module#UsersModule',
        data: {title: 'ADMIN_MENU_USERS'},
        canActivate: [PermissionGuard]
      }, {
        path: 'amusements',
        loadChildren: './admin-modules/amusements/amusements.module#AmusementsModule',
        data: {title: 'ADMIN_MENU_AMUSEMENT'},
        canActivate: [PermissionGuard]
      }, {
        path: 'staff',
        loadChildren: './admin-modules/staff/staff.module#StaffModule',
        data: {title: 'ADMIN_MENU_STAFF'},
        canActivate: [PermissionGuard]
      }, {
        path: 'administration',
        loadChildren: './admin-modules/administration/administration.module#AdministrationModule',
        data: {title: 'ADMIN_MENU_ADMINISTRATION'},
        canActivate: [PermissionGuard]
      }, {
        path: 'keychain',
        loadChildren: './admin-modules/keychain/keychain.module#KeychainModule',
        data: {title: 'ADMIN_MENU_KEYCHAIN'},
        canActivate: [PermissionGuard]
      }, {
        path: 'billing',
        loadChildren: './admin-modules/billing/billing.module#BillingModule',
        data: {title: 'ADMIN_MENU_BILLING'},
        canActivate: [PermissionGuard]
      }
    ]
  }
];

export const AdminRoutingModule = RouterModule.forChild(routes);
