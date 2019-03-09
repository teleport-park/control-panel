import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from "./users.component";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../../../material.module";
import { UserService } from "./services/user.service";
import { TranslationModule } from "../../../common/translations-module/translation.module";
import { UserFormModule } from "../../../common/user-form/user-form.module";
import { AddUserDialogComponent } from "../../../common/user-form";

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
    UserFormModule
  ],
  providers: [UserService],
  entryComponents: [AddUserDialogComponent]
})
export class UsersModule {
}
