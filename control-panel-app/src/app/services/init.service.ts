import { Injectable } from '@angular/core';

/**
 * config interface
 */
export interface InitConfig {
  api_url: string;
}

@Injectable({
  providedIn: 'root'
})

export class InitService {

  /**
   * init config
   */
  config: InitConfig;

  constructor() {  }

  /**
   * init app
   */
  init() {
    return new Promise<void>((resolve, reject) => {
      try {
        this.config = require('../../config/app-init-config.json');
        if (this.config && this.config.api_url) {
          console.log('[API_URL]:', this.config.api_url);
          resolve();
          return;
        } else {
          reject('Property "api_url" is not defined');
        }
      } catch (e) {
        reject('File app-init-config.json is missing');
      }
    });
  }
}
