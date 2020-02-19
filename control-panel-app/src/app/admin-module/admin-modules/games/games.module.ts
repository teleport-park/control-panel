import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { GamesService } from './services/games.service';
import { TranslationModule } from '../../../common/translations-module/translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../common/shared-module/shared.module';

const routes: Routes = [{
   path: '',
   component: GamesComponent
}];

const GamesRouterModule = RouterModule.forChild(routes);

@NgModule({
   declarations: [GamesComponent],
   imports: [
      CommonModule,
      GamesRouterModule,
      MaterialModule,
      TranslationModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule
   ],
   providers: [
      GamesService
   ]
})
export class GamesModule {
}
