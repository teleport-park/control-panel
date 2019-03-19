import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { StaffService } from './services/staff.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { TranslationModule } from '../../../common/translations-module/translation.module';
import { UserFormModule } from '../../../common/user-form/user-form.module';
import { SharedModule } from '../../../common/shared-module/shared.module';
import { AddOrEditEntityDialogComponent } from '../../../common/user-form';
import { ConfirmDialogComponent } from '../../../common/shared-module';

const routes: Routes = [{
  path: '',
  component: StaffComponent,
  children: [{
    path: 'groups',
    component: GroupsComponent,
    data: {title: 'ADMIN_MENU_GROUPS'}
  }]
}];

export const StaffRoutingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [StaffComponent, GroupsComponent],
  imports: [
    CommonModule,
    StaffRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslationModule,
    UserFormModule,
    SharedModule
  ],
  providers: [StaffService],
  entryComponents: [AddOrEditEntityDialogComponent, ConfirmDialogComponent]
})
export class StaffModule {
}
