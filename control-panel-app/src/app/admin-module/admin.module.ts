import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminContainerComponent } from "./admin-container.component/admin-container.component";
import { MaterialModule } from "../material.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { PipesModule } from "./pipes/pipes.module";

@NgModule({
  declarations: [AdminContainerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
    PipesModule
  ],
  providers: []
})
export class AdminModule {
}
