import { RouterModule, Routes } from '@angular/router';
import { AdminContainerComponent } from "./admin-container.component/admin-container.component";

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
        path: 'devices',
        loadChildren: './admin-modules/devices/devices.module#DevicesModule',
        data: {title: 'ADMIN_MENU_DEVICES'}
      }, {
        path: 'staff',
        loadChildren: './admin-modules/staff/staff.module#StaffModule',
        data: {title: 'ADMIN_MENU_STAFF'}
      }
    ]
  }
];

export const AdminRoutingModule = RouterModule.forChild(routes);
