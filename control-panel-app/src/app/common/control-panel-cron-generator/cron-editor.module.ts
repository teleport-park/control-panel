import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimePickerComponent } from './cron-time-picker.component';
import { CronGenComponent } from './cron-editor.component';
import { CommonModule } from '@angular/common';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MaterialModule } from '../../material.module';
import { TranslationModule } from '../translations-module/translation.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        TranslationModule
    ],
    exports: [TimePickerComponent, CronGenComponent],
    declarations: [TimePickerComponent, CronGenComponent],
    providers: [
        // {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}},
        // {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
    ]
})
export class CronEditorModule {
}
