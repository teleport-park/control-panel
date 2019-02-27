import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./admin-contaner/components/dashboard/dashboard.component";
import { UsersComponent } from "./admin-contaner/components/users/users.component";
import { AdminContanerComponent } from "./admin-contaner/admin-contaner.component";
import { DevicesComponent } from "./admin-contaner/components/devices/devices.component";

const routes: Routes = [
  {
    path: 'admin',
    component: AdminContanerComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'users',
        component: UsersComponent
      }, {
        path: 'devices',
        component: DevicesComponent
      }
    ]
  }
];

export const AdminRoutingModule = RouterModule.forChild(routes);
