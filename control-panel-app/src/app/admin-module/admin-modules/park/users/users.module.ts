import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../../../material.module';
import { TranslationModule } from '../../../../common/translations-module/translation.module';
import { FormModule } from '../../../../common/form/form.module';
import { SharedModule } from '../../../../common/shared-module/shared.module';
import { AddOrEditEntityDialogComponent, ConfirmDialogComponent } from '../../../../common/shared-module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { PermissionGuard } from '../../../../common/auth-module/guards/permission-guard';
import { ExtendedFiltersModule } from '../../../../common/extended-filters-module/extended-filters.module';
import { USER_SERVICE } from '../../../../models/intefaces';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../../services/api-urls.service';
import { CommonUserService } from '../../../../services/common-services/common-user.service';

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

export function UserServiceFactory(http: HttpClient, apiUrlService: ApiUrlsService) {
    return new CommonUserService(http, apiUrlService.getVisitors);
}

@NgModule({
  declarations: [UsersComponent, UserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    UserRoutingModule,
    TranslationModule,
    FormModule,
    SharedModule,
    ExtendedFiltersModule
  ],
  providers: [ {
      provide: USER_SERVICE, useFactory: UserServiceFactory, deps: [HttpClient, ApiUrlsService]
  }],
  entryComponents: [AddOrEditEntityDialogComponent, ConfirmDialogComponent]
})
export class UsersModule {
}
