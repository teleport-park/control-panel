import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddOrEditEntityDialogComponent } from './add-entity-dialog/add-or-edit-entity-dialog.component';
import { MaterialModule } from '../../material.module';
import { TranslationModule } from '../translations-module/translation.module';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared-module/shared.module';

@NgModule({
  declarations: [FormComponent, AddOrEditEntityDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    TranslationModule,
    SharedModule,
    NgxMaskModule.forRoot({prefix: '+375'})
  ],
  exports: [FormComponent, AddOrEditEntityDialogComponent],
  providers: []
})
export class UserFormModule {
}
