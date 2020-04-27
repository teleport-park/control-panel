import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeleportNgComponent } from './teleport-ng.component';
import { NgServersComponent } from './ng-machines/ng-servers.component';
import { NgGamesComponent } from './ng-games/ng-games.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '../../../common/auth-module/guards/permission-guard';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../common/shared-module/shared.module';
import { INSTANCE_SERVICE } from '../../../models';
import { ApiUrlsService } from '../../../services/api-urls.service';
import { HttpClient } from '@angular/common/http';
import { CommonInstanceService } from '../../../services';
import { TNGController } from '../../../models/controller';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslationModule } from '../../../common/translations-module/translation.module';

const routes: Routes = [{
   path: '',
   component: TeleportNgComponent,
   children: [
      {path: '', redirectTo: 'ng-machines', pathMatch: 'full'},
      {
         path: 'ng-servers',
         component: NgServersComponent,
         data: {title: 'ADMIN_MENU_MACHINES'},
         canActivate: [PermissionGuard]
      },
      {
         path: 'ng-games',
         component: NgGamesComponent,
         data: {title: 'ADMIN_MENU_GAMES'},
         canActivate: [PermissionGuard]
      }
   ]
}];

export const TeleportVrRouteModule = RouterModule.forChild(routes);

export function TeleportVrFactory(http: HttpClient, apiUrlService: ApiUrlsService) {
   return new CommonInstanceService(http, apiUrlService.getTVRUrl, (item) => new TNGController(item));
}

@NgModule({
   declarations: [TeleportNgComponent, NgServersComponent, NgGamesComponent],
   imports: [
      CommonModule,
      TeleportVrRouteModule,
      MaterialModule,
      SharedModule,
      ReactiveFormsModule,
      TranslationModule
   ],
   providers: [
      {provide: INSTANCE_SERVICE, useFactory: TeleportVrFactory, deps: [HttpClient, ApiUrlsService]}
   ]
})
export class TeleportNgModule {
}
