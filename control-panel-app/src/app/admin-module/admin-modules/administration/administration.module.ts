import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsComponent } from './permissions/permissions.component';
import { AddSimpleEntityDialogComponent, ConfirmDialogComponent } from '../../../common/shared-module';
import { SharedModule } from '../../../common/shared-module/shared.module';
import { MaterialModule } from '../../../material.module';
import { TranslationModule } from '../../../common/translations-module/translation.module';
import { PermissionsService } from './permissions/services/permissions.service';

const routes: Routes = [{
  path: '',
  component: AdministrationComponent,
  children: [
    {
      path: 'permissions',
      component: PermissionsComponent,
      data: {title: 'GROUP_PERMISSIONS'}
    }
  ]
}];

export const AdministrationModuleRoute = RouterModule.forChild(routes);

@NgModule({
  declarations: [AdministrationComponent, PermissionsComponent],
  imports: [
    CommonModule,
    AdministrationModuleRoute,
    SharedModule,
    MaterialModule,
    TranslationModule
  ],
  providers: [PermissionsService],
  entryComponents: [AddSimpleEntityDialogComponent, ConfirmDialogComponent]
})
export class AdministrationModule {
}
