import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { StaffService } from './services/staff.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import { TranslationModule } from '../../../../common/translations-module/translation.module';
import { FormModule } from '../../../../common/form/form.module';
import { SharedModule } from '../../../../common/shared-module/shared.module';
import {
  AddGroupDialogComponent,
  AddOrEditEntityDialogComponent,
  AddSimpleEntityDialogComponent, AddStaffDialogComponent,
  ConfirmDialogComponent
} from '../../../../common/shared-module';
import { GroupsService } from './groups/services/groups.service';
import { PermissionGuard } from '../../../../common/auth-module/guards/permission-guard';
import { StaffMemberComponent } from './staff-member/staff-member.component';

const routes: Routes = [{
  path: '',
  component: StaffComponent,
  children: [{
    path: 'groups',
    component: GroupsComponent,
    data: {title: 'ADMIN_MENU_GROUPS'},
    canActivate: [PermissionGuard]
  }, {
    path: ':id',
    component: StaffMemberComponent,
    data: {title: 'ADMIN_MENU_STAFF'},
    canActivate: [PermissionGuard]
  }]
}];

export const StaffRoutingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [StaffComponent, GroupsComponent, StaffMemberComponent],
  imports: [
    CommonModule,
    StaffRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslationModule,
    FormModule,
    SharedModule
  ],
  providers: [StaffService, GroupsService],
  entryComponents: [
    AddOrEditEntityDialogComponent,
    ConfirmDialogComponent,
    AddGroupDialogComponent,
    AddSimpleEntityDialogComponent,
    AddStaffDialogComponent
  ]
})
export class StaffModule {
}