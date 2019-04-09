import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HardwareComponent } from './hardware.component';
import { RouterModule, Routes } from '@angular/router';
import { HardwareService } from './services/hardware.service';
import { SharedModule } from '../../../common/shared-module/shared.module';


const routes: Routes = [{
  path: '',
  component: HardwareComponent
}];

export const HardwareRoutingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [HardwareComponent],
  imports: [
    CommonModule,
    HardwareRoutingModule,
    SharedModule
  ],
  providers: [HardwareService]
})
export class HardwareModule {
}
