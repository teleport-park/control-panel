import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmusementsComponent } from './amusements.component';
import { SharedModule } from '../../../common/shared-module/shared.module';
import { MaterialModule } from '../../../material.module';
import { RouterModule, Routes } from '@angular/router';
import { HardwareComponent } from './hardware/hardware.component';
import { HardwareService } from './hardware/services/hardware.service';
import { GamesService } from './games/services/games.service';
import { PermissionGuard } from '../../../common/auth-module/guards/permission-guard';
import { GamesComponent } from './games/games.component';
import { DeviceComponent } from './device/device.component';

const routes: Routes = [{
  path: '',
  component: AmusementsComponent,
  children: [
    {
      path: '',
      redirectTo: 'hardware',
      pathMatch: 'full'
    }, {
      path: 'hardware',
      component: HardwareComponent,
      data: {title: 'ADMIN_MENU_HARDWARE'},
      canActivate: [PermissionGuard]
    }, {
      path: 'games',
      component: GamesComponent,
      data: {title: 'ADMIN_MENU_GAMES'},
      canActivate: [PermissionGuard]
    }, {
      path: 'hardware/:id',
      component: DeviceComponent,
      data: {title: 'ADMIN_MENU_HARDWARE'},
      canActivate: [PermissionGuard]
    }]
}];

export const AmusementRoutingModule = RouterModule.forChild(routes);


@NgModule({
  declarations: [AmusementsComponent, HardwareComponent, GamesComponent, DeviceComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    AmusementRoutingModule
  ], providers: [HardwareService, GamesService]
})
export class AmusementsModule {
}
