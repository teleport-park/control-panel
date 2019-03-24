import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'vip',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/data/icons/vip.svg'));
    iconRegistry.addSvgIcon(
      'playing',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/data/icons/playing.svg'));
    iconRegistry.addSvgIcon(
      'blacklist',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/data/icons/blacklist.svg'));
    iconRegistry.addSvgIcon(
      'inpark',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/data/icons/inpark.svg'));
  }
}
