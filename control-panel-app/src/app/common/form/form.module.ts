import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { TranslationModule } from '../translations-module/translation.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    TranslationModule,
    NgxMaskModule.forRoot({prefix: '+375'})
  ],
  exports: [FormComponent],
  providers: []
})
export class FormModule {
}
