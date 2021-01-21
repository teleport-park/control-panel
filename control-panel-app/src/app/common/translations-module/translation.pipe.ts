import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';

@Pipe({
  name: 'translate'
})
/**
 * translation pipe
 */
export class TranslationPipe implements  PipeTransform {

  constructor(private translations: TranslateService) {}

  /**
   *
   * @param key
   * @param args
   */
  transform(key: string, args?: string[]): any {
    return this.translations.instant(key,  args);
  }
}
