import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TariffsComponent } from './tariffs.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../common/shared-module/shared.module';
import { TariffsService } from './services/tariffs.service';

const routes: Routes = [{
  path: '',
  component: TariffsComponent
}];

export const TariffsRoutingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [TariffsComponent],
  imports: [
    CommonModule,
    SharedModule,
    TariffsRoutingModule
  ], providers: [TariffsService]
})
export class TariffsModule { }
