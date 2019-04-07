import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HardwareComponent } from './hardware.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [{
  path: '',
  component: HardwareComponent
}];

export const HardwareRoutingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [HardwareComponent],
  imports: [
    CommonModule,
    HardwareRoutingModule
  ]
})
export class HardwareModule {
}
