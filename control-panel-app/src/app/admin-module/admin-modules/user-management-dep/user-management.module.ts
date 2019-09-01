import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { SharedModule } from '../../../common/shared-module/shared.module';
import { MaterialModule } from '../../../material.module';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '../../../common/auth-module/guards/permission-guard';

const routes: Routes = [{
  path: '',
  component: UserManagementComponent,
  children: [{
    path: 'staff',
    loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule),
    data: {title: 'ADMIN_MENU_STAFF'},
    canActivate: [PermissionGuard]
  }]
}];

export const UserManagementRoutingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [UserManagementComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule { }
