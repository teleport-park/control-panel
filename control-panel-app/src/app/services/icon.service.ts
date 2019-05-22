import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    const iconPath = './assets/data/icons';
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'vip', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'playing', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'blacklist', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'inpark', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'power', iconPath);
  }

  private static pushSvgIconToRegistry(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, iconName: string, iconPath: string): void {
    iconRegistry.addSvgIcon(iconName, sanitizer.bypassSecurityTrustResourceUrl(`.${iconPath}/${iconName}.svg`));
  }
}
