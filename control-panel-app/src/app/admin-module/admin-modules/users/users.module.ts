import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from "./users.component";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../../../material.module";
import { UserService } from "./services/user.service";
import { TranslationModule } from "../../../common/translations-module/translation.module";

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
    TranslationModule
  ],
  providers: [UserService]
})
export class UsersModule {
}
