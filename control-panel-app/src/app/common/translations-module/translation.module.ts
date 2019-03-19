import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSwitcherComponent } from './launguage-switcher/language-switcher.component';
import { TranslationPipe } from './translation.pipe';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [LanguageSwitcherComponent, TranslationPipe],
  imports: [
    CommonModule, MaterialModule
  ],
  exports: [LanguageSwitcherComponent, TranslationPipe]
})
export class TranslationModule { }
