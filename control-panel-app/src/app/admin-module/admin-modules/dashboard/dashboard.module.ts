import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./dashboard.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{
  path: '',
  component: DashboardComponent
}];

export const DashboardRoutingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
