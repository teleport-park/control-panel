import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { TranslationModule } from '../translations-module/translation.module';
import { SharedModule } from '../shared-module/shared.module';

@NgModule({
  declarations: [AuthComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        TranslationModule,
        SharedModule
    ],
  exports: [AuthComponent]
})
export class AuthModule { }
