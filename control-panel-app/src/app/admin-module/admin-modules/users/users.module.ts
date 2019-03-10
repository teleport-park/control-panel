import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from "./users.component";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../../../material.module";
import { UserService } from "./services/user.service";
import { TranslationModule } from "../../../common/translations-module/translation.module";
import { UserFormModule } from "../../../common/user-form/user-form.module";
import { AddOrEditUserDialogComponent } from "../../../common/user-form";
import { SharedModule } from "../../../common/shared-module/shared.module";
import { ConfirmDialogComponent } from "../../../common/shared-module";

const routes: Routes = [{
  path: '',
  component: UsersComponent
}];

export const UserRoutingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    MaterialModule,
    UserRoutingModule,
    TranslationModule,
    UserFormModule,
    SharedModule
  ],
  providers: [UserService],
  entryComponents: [AddOrEditUserDialogComponent, ConfirmDialogComponent]
})
export class UsersModule {
}
