import { RouterModule, Routes } from '@angular/router';
import { AdminContainerComponent } from './admin-container.component/admin-container.component';

const routes: Routes = [
  {
    path: '',
    component: AdminContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      }, {
        path: 'dashboard',
        loadChildren: './admin-modules/dashboard/dashboard.module#DashboardModule',
        data: {title: 'ADMIN_MENU_DASHBOARD'}
      }, {
        path: 'users',
        loadChildren: './admin-modules/users/users.module#UsersModule',
        data: {title: 'ADMIN_MENU_USERS'}
      }, {
        path: 'amusements',
        loadChildren: './admin-modules/amusements/amusements.module#AmusementsModule',
        data: {title: 'ADMIN_MENU_AMUSEMENT'}
      }, {
        path: 'staff',
        loadChildren: './admin-modules/staff/staff.module#StaffModule',
        data: {title: 'ADMIN_MENU_STAFF'}
      }, {
        path: 'administration',
        loadChildren: './admin-modules/administration/administration.module#AdministrationModule',
        data: {title: 'ADMIN_MENU_ADMINISTRATION'}
      }, {
        path: 'keychain',
        loadChildren: './admin-modules/keychain/keychain.module#KeychainModule',
        data: {title: 'ADMIN_MENU_KEYCHAIN'}
      }, {
        path: 'transactions',
        loadChildren: './admin-modules/transactions/transactions.module#TransactionsModule',
        data: {title: 'ADMIN_MENU_TRANSACTIONS'}
      }, {
        path: 'tariffs',
        loadChildren: './admin-modules/tariffs/tariffs.module#TariffsModule',
        data: {title: 'ADMIN_MENU_TARIFFS'}
      }
    ]
  }
];

export const AdminRoutingModule = RouterModule.forChild(routes);
