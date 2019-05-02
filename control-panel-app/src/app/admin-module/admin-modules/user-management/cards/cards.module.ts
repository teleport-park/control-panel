import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards.component';
import { SharedModule } from '../../../../common/shared-module/shared.module';
import { MaterialModule } from '../../../../material.module';
import { CardsService } from './services/cards.service';

const routes: Routes = [{
  path: '',
  component: CardsComponent
}];

export const CardsRouteModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [CardsComponent],
  imports: [
    CommonModule,
    CardsRouteModule,
    SharedModule,
    MaterialModule
  ],
  providers: [CardsService]
})

export class CardsModule {
}
