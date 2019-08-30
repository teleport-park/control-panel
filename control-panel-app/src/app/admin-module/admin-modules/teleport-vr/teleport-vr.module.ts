import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeleportVrComponent } from './teleport-vr.component';
import { MashinesComponent } from './mashines/mashines.component';
import { VrGamesComponent } from './vr-games/vr-games.component';

@NgModule({
  declarations: [TeleportVrComponent, MashinesComponent, VrGamesComponent],
  imports: [
    CommonModule
  ]
})
export class TeleportVrModule { }
