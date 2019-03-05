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
        loadChildren: './admin-modules/dashboard/dashboard.module#DashboardModule'
      }, {
        path: 'users',
        loadChildren: './admin-modules/users/users.module#UsersModule'
      }, {
        path: 'devices',
        loadChildren: './admin-modules/devices/devices.module#DevicesModule'
      }
    ]
  }
];

export const AdminRoutingModule = RouterModule.forChild(routes);
