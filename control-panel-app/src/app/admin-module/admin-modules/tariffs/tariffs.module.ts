import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TariffsComponent } from './tariffs.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: TariffsComponent
}];

export const TariffsRoutingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [TariffsComponent],
  imports: [
    CommonModule,
    TariffsRoutingModule
  ]
})
export class TariffsModule { }
