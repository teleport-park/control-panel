import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminContainerComponent } from "./admin-container.component/admin-container.component";
import { MaterialModule } from "../material.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { TranslationModule } from "../common/translations-module/translation.module";

@NgModule({
  declarations: [AdminContainerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
    TranslationModule
  ],
  providers: []
})
export class AdminModule {
}
