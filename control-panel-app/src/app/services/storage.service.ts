import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  /**
   * get locale
   */
  get locale(): string {
    return localStorage.getItem('locale') || 'en';
  }

  /**
   * set locale
   * @param locale
   */
  setLocale(locale: string) {
    localStorage.setItem('locale', locale);
  }
}
