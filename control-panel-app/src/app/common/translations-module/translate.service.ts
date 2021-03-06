import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from '../../services/loader/loader.service';
import { StorageService } from '../../services/storage.service';
import { AppStorageKey } from '../../models/app-storage-key';
import { Locales } from './locales.enum';

export interface StringTMap<T> {
  [key: string]: T;
}

@Injectable({
  providedIn: 'root'
})

export class TranslateService {
  /**
   * locale
   */
  locale: BehaviorSubject<string> = new BehaviorSubject(this.storage.getValue(AppStorageKey.Locale));

  /**
   * translations loaded flag
   */
  public translationsLoaded = false;

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

  constructor(private http: HttpClient,
              private loaderService: LoaderService,
              private storage: StorageService) {
  }

  /**
   * get translations
   * @param locale
   */
  getTranslations(locale: string = Locales['0']) {
    this.http.get(`./assets/data/translations/${locale}.json`).subscribe(
      (result: StringTMap<string>) => {
        this._translations = result;
        this.locale.next(locale);
        this.translationsLoaded = true;
        this.storage.setValue(AppStorageKey.Locale, locale);
        this.loaderService.dispatchShowLoader(false);
      }
    );
  }

  /**
   * get key value
   * @param key
   * @param interpolateParams
   */
  instant(key: string, interpolateParams?: string[]): string {
    if (interpolateParams && this._translations[key]) {
      return this.interpolateParams(this._translations[key], interpolateParams);
    }
    return this._translations[key] || key;
  }

  /**
   * interpolate params
   * @param key
   * @param params
   */
  interpolateParams(key: string, params: string[]) {
    return key.replace(/{\d+}/g, (value, _) => {
      const index = +value.replace('{', '').replace('}', '');
      return params[index] || value;
    });
  }
}
