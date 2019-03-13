import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminContainerComponent } from "./admin-container.component/admin-container.component";
import { MaterialModule } from "../material.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { TranslationModule } from "../common/translations-module/translation.module";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material";
import { MomentDateAdapter } from "@angular/material-moment-adapter";

@NgModule({
  declarations: [AdminContainerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
    TranslationModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]}
  ]
})
export class AdminModule {
}