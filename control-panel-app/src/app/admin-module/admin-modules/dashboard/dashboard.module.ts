import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../common/shared-module/shared.module';
import { DashboardService } from './services/dashboard.service';

const routes: Routes = [{
  path: '',
  component: DashboardComponent
}];

export const DashboardRoutingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  providers: [DashboardService]
})
export class DashboardModule { }
