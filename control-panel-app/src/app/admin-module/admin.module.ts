import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminContainerComponent } from "./admin-container/admin-container.component";
import { MaterialModule } from "../material.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { DashboardComponent } from './admin-container/components/dashboard/dashboard.component';
import { UsersComponent } from './admin-container/components/users/users.component';
import { DevicesComponent } from './admin-container/components/devices/devices.component';
import { UserService } from "./admin-container/services/user.service";
import { TranslateService } from "./admin-container/services/translate.service";
import { PipesModule } from "./admin-container/pipes/pipes.module";

@NgModule({
  declarations: [AdminContainerComponent, DashboardComponent, UsersComponent, DevicesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
    PipesModule
  ],
  providers: [UserService, TranslateService]
})
export class AdminModule {
}
