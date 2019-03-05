import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesComponent } from "./devices.component";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [{
  path: '',
  component: DevicesComponent
}];

export const DevicesRoutingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [DevicesComponent],
  imports: [
    CommonModule,
    DevicesRoutingModule
  ]
})
export class DevicesModule {
}
