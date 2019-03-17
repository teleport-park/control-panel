import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { RouterModule, Routes } from "@angular/router";
import { GroupsComponent } from './groups/groups.component';
import { StaffService } from "./services/staff.service";

const routes: Routes = [{
  path: '',
  component: StaffComponent,
  children: [{
    path: 'groups',
    component: GroupsComponent,
    data: {title: 'ADMIN_MENU_ROLES'}
  }]
}];

export const StaffRoutingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [StaffComponent, GroupsComponent],
  imports: [
    CommonModule,
    StaffRoutingModule
  ],
  providers: [StaffService]
})
export class StaffModule {
}
