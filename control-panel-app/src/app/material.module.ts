import { NgModule } from '@angular/core';

import {
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule
} from '@angular/material';

export const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatSlideToggleModule
];

@NgModule({
  imports: [...MATERIAL_MODULES],
  exports: [...MATERIAL_MODULES],
  providers: []
})
export class MaterialModule { }
