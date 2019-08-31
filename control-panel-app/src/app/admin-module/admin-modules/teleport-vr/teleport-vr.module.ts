import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeleportVrComponent } from './teleport-vr.component';
import { VrMachinesComponent } from './vr-machines/vr-machines.component';
import { VrGamesComponent } from './vr-games/vr-games.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '../../../common/auth-module/guards/permission-guard';
import { TeleportVrService } from './teleport-vr.service';

const routes: Routes = [{
  path: '',
  component: TeleportVrComponent,
  children: [
    {path: '', redirectTo: 'machines', pathMatch: 'full'},
    {path: 'machines', component: VrMachinesComponent, data: { title: 'ADMIN_MENU_MACHINES' }, canActivate: [PermissionGuard]},
    {path: 'games', component: VrGamesComponent, data: {title: 'ADMIN_MENU_GAMES'}, canActivate: [PermissionGuard]}
  ]
}];

export const TeleportVrRouteModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [TeleportVrComponent, VrMachinesComponent, VrGamesComponent],
  imports: [
    CommonModule,
    TeleportVrRouteModule
  ],
  providers: [TeleportVrService]
})
export class TeleportVrModule {
}
