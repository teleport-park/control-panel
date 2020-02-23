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
   AddSimpleEntityDialogComponent,
   AddStaffDialogComponent,
   ConfirmDialogComponent
} from '../../../../common/shared-module';
import { GroupsService } from './groups/services/groups.service';
import { PermissionGuard } from '../../../../common/auth-module/guards/permission-guard';
import { StaffMemberComponent } from './staff-member/staff-member.component';
import { ExtendedFiltersModule } from '../../../../common/extended-filters-module/extended-filters.module';
import { ENTITY_SERVICE } from '../../../../models/intefaces';
import { CommonEntityService } from '../../../../services/common-services/common-entity.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from '../../../../services/api-urls.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Sort } from '@angular/material';
import { AppStorageKey } from '../../../../models/app-storage-key';

const storageKey: string = 'STAFF';

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

export function StaffServiceFactory(http: HttpClient, urlService: ApiUrlsService) {
   return new CommonEntityService(http, urlService.getStaff, sortStorageSet());
}

const sortStorageSet = () => {
   const sortState: Sort = JSON.parse(localStorage.getItem(storageKey + AppStorageKey.Sort)) as Sort;
   if (sortState) {
      const sort = {};
      sort[sortState.active.replace('_at', '')] = sortState.direction;
      return sort;
   }
};

@NgModule({
   declarations: [StaffComponent, GroupsComponent, StaffMemberComponent],
   imports: [
      CommonModule,
      StaffRoutingModule,
      ReactiveFormsModule,
      MaterialModule,
      TranslationModule,
      FormModule,
      SharedModule,
      ExtendedFiltersModule
   ],
   providers: [StaffService, GroupsService,
      {provide: ENTITY_SERVICE, useFactory: StaffServiceFactory, deps: [HttpClient, ApiUrlsService]}
   ],
   entryComponents: [
      AddOrEditEntityDialogComponent,
      ConfirmDialogComponent,
      AddGroupDialogComponent,
      AddSimpleEntityDialogComponent,
      AddStaffDialogComponent
   ]
})
export class StaffModule {
   constructor(overlayContainer: OverlayContainer) {
      overlayContainer.getContainerElement().classList.add('light-theme');
   }
}
