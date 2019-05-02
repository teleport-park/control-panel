import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../../../material.module';
import { UserService } from './services/user.service';
import { TranslationModule } from '../../../../common/translations-module/translation.module';
import { FormModule } from '../../../../common/form/form.module';
import { SharedModule } from '../../../../common/shared-module/shared.module';
import { AddOrEditEntityDialogComponent, ConfirmDialogComponent } from '../../../../common/shared-module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { PermissionGuard } from '../../../../common/auth-module/guards/permission-guard';

const routes: Routes = [{
  path: '',
  component: UsersComponent,
  children: [{
    path: ':id',
    component: UserComponent,
    data: {
      title: 'ADMIN_MENU_USERS'
    },
    canActivate: [PermissionGuard]
  }]
}];

export const UserRoutingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [UsersComponent, UserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    UserRoutingModule,
    TranslationModule,
    FormModule,
    SharedModule
  ],
  providers: [UserService],
  entryComponents: [AddOrEditEntityDialogComponent, ConfirmDialogComponent]
})
export class UsersModule {
}
