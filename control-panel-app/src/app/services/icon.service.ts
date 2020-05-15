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
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'gate-open', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'gate-closed', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'gate-blocked', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'coin', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'memory', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'chevron_right', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'expand_more', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'local_parking', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'people', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'people_outline', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'list', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'local_atm', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'accessibility', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'monetization_on', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'markunread_mailbox', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'developer_board', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'router', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'videogame_asset', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'computer', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'zoom_out_map', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'exit_to_app', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'hourglass_empty', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'credit_card', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'male', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'female', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'settings', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'empty', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'calendar', iconPath);
    IconService.pushSvgIconToRegistry(iconRegistry, sanitizer, 'local_offer', iconPath);
  }

  private static pushSvgIconToRegistry(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, iconName: string, iconPath: string): void {
    iconRegistry.addSvgIcon(iconName, sanitizer.bypassSecurityTrustResourceUrl(`${iconPath}/${iconName}.svg`));
  }
}
