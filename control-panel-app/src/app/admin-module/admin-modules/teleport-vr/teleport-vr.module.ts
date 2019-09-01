import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeleportVrComponent } from './teleport-vr.component';
import { VrMachinesComponent } from './vr-machines/vr-machines.component';
import { VrGamesComponent } from './vr-games/vr-games.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '../../../common/auth-module/guards/permission-guard';
import { TeleportVrService } from './teleport-vr.service';
import { MaterialModule } from '../../../material.module';

const routes: Routes = [{
  path: '',
  component: TeleportVrComponent,
  children: [
    {path: '', redirectTo: 'vr-machines', pathMatch: 'full'},
    {
      path: 'vr-machines',
      component: VrMachinesComponent,
      data: {title: 'ADMIN_MENU_MACHINES'},
      canActivate: [PermissionGuard]
    },
    {path: 'vr-games', component: VrGamesComponent, data: {title: 'ADMIN_MENU_GAMES'}, canActivate: [PermissionGuard]}
  ]
}];

export const TeleportVrRouteModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [TeleportVrComponent, VrMachinesComponent, VrGamesComponent],
  imports: [
    CommonModule,
    TeleportVrRouteModule,
    MaterialModule
  ],
  providers: [TeleportVrService]
})
export class TeleportVrModule {
}
