import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminContanerComponent } from "./admin-contaner/admin-contaner.component";
import { MaterialModule } from "../material.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { DashboardComponent } from './admin-contaner/components/dashboard/dashboard.component';
import { UsersComponent } from './admin-contaner/components/users/users.component';
import { DevicesComponent } from './admin-contaner/components/devices/devices.component';
import { UserService } from "./admin-contaner/services/user.service";

@NgModule({
  declarations: [AdminContanerComponent, DashboardComponent, UsersComponent, DevicesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule
  ],
  providers: [UserService]
})
export class AdminModule {
}
