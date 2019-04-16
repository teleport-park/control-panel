import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmusementsComponent } from './amusements.component';
import { SharedModule } from '../../../common/shared-module/shared.module';
import { MaterialModule } from '../../../material.module';
import { RouterModule, Routes } from '@angular/router';
import { HardwareComponent } from './hardware/hardware.component';
import { HardwareService } from './hardware/services/hardware.service';
import { AmusementsService } from './services/amusements.service';

const routes: Routes = [{
  path: '',
  component: AmusementsComponent,
  children: [{
    path: 'hardware',
    component: HardwareComponent,
    data: {title: 'ADMIN_MENU_HARDWARE'}
  }]
}];

export const AmusementRoutingModule = RouterModule.forChild(routes);


@NgModule({
  declarations: [AmusementsComponent, HardwareComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    AmusementRoutingModule
  ], providers: [HardwareService, AmusementsService]
})
export class AmusementsModule { }
