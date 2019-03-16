import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { RouterModule, Routes } from "@angular/router";
import { RolesComponent } from './roles/roles.component';
import { StaffService } from "./services/staff.service";

const routes: Routes = [{
  path: '',
  component: StaffComponent,
  children: [{
    path: 'roles',
    component: RolesComponent,
    data: {title: 'ADMIN_MENU_ROLES'}
  }]
}];

export const StaffRoutingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [StaffComponent, RolesComponent],
  imports: [
    CommonModule,
    StaffRoutingModule
  ],
  providers: [StaffService]
})
export class StaffModule {
}
