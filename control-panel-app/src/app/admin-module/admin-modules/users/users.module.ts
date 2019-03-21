import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { UserService } from './services/user.service';
import { TranslationModule } from '../../../common/translations-module/translation.module';
import { FormModule } from '../../../common/form/form.module';
import { SharedModule } from '../../../common/shared-module/shared.module';
import { AddOrEditEntityDialogComponent, ConfirmDialogComponent } from '../../../common/shared-module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  component: UsersComponent
}];

export const UserRoutingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [UsersComponent],
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
