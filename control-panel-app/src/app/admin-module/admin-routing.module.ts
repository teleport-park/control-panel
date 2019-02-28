import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./admin-container/components/dashboard/dashboard.component";
import { UsersComponent } from "./admin-container/components/users/users.component";
import { AdminContainerComponent } from "./admin-container/admin-container.component";
import { DevicesComponent } from "./admin-container/components/devices/devices.component";

const routes: Routes = [
  {
    path: 'admin',
    component: AdminContainerComponent,
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
