import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface StringTMap<T> { [key: string]: T; }

@Injectable()

export class TranslateService {
  /**
   * translations loaded flag
   */
  public translationsLoaded: boolean = false;

  /**
   * translation
   */
  private _translations: StringTMap<string>;

  /**
   * translations getter
   */
  get translations(): StringTMap<string> {
    return this._translations;
  }
  constructor(private http: HttpClient){}

  /**
   * get translations
   * @param locale
   */
  getTranslations(locale: string = 'ru') {
    this.http.get<StringTMap<string>>(`./assets/data/translations/${locale}.json`).subscribe(
      (result: StringTMap<string>) => {
        this._translations = result;
        this.translationsLoaded = true;
      }
    )
  }

  /**
   * get key value
   * @param key
   */
  instant(key: string): string {
    return this._translations[key] || key;
  }
}
