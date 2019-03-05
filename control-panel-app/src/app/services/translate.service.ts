import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { delay } from "rxjs/operators";
import { LoaderService } from "./loader.service";

export interface StringTMap<T> {
  [key: string]: T;
}

@Injectable()

export class TranslateService {
  /**
   * locale
   */
  locale: BehaviorSubject<string> = new BehaviorSubject('ru');

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

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  /**
   * get translations
   * @param locale
   */
  getTranslations(locale: string = 'ru') {
    this.http.get(`./assets/data/translations/${locale}.json`).pipe(delay(2000)).subscribe(
      (result: StringTMap<string>) => {
        this._translations = result;
        this.locale.next(locale);
        this.translationsLoaded = true;
        this.loaderService.dispatchShowLoader(false);
      }
    )
  }

  /**
   * get key value
   * @param key
   * @param interpolateParams
   */
  instant(key: string, interpolateParams?: string[]): string {
    if (interpolateParams) {
      return this.interpolateParams(this._translations[key], interpolateParams);
    }
    return this._translations[key] || key;
  }

  interpolateParams(key: string, params: string[]) {
    return key.replace(/{\d+}/g, (value, _) => {
      let index = +value.replace('{', '').replace('}', '');
      return params[index] || value;
    })

  }
}
