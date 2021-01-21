import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardReaderComponent } from './card-reader.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../common/shared-module/shared.module';
import { MaterialModule } from '../../../material.module';
import { TranslationModule } from '../../../common/translations-module/translation.module';

const routes: Routes = [{
  path: '',
  component: CardReaderComponent,
}];

const CardReaderRouter: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  declarations: [CardReaderComponent],
  imports: [
    CommonModule,
    CardReaderRouter,
    SharedModule,
    MaterialModule,
    TranslationModule
  ]
})
export class CardReaderModule {
}
