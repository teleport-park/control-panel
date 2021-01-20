import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardReaderComponent } from './card-reader.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: CardReaderComponent,
}];

const CardReaderRouter: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  declarations: [CardReaderComponent],
  imports: [
    CommonModule,
    CardReaderRouter
  ]
})
export class CardReaderModule {
}
