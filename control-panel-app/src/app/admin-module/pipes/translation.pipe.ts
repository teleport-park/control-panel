import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from "../../services/translate.service";

@Pipe({
  name: 'translate'
})
/**
 * translation pipe
 */
export class TranslationPipe implements  PipeTransform {

  constructor(private translateService: TranslateService) {}

  /**
   *
   * @param key
   * @param args
   */
  transform(key: string, args): any {
    return this.translateService.instant(key, args instanceof Array ? args : null)
  }
}
