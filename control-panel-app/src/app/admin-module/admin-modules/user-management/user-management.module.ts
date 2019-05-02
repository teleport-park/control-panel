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
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
    data: {title: 'ADMIN_MENU_USERS'},
    canActivate: [PermissionGuard]
  }, {
    path: 'staff',
    loadChildren: './staff/staff.module#StaffModule',
    data: {title: 'ADMIN_MENU_STAFF'},
    canActivate: [PermissionGuard]
  }, {
    path: 'cards',
    loadChildren: './cards/cards.module#CardsModule',
    data: {title: 'ADMIN_MENU_CARDS'},
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
