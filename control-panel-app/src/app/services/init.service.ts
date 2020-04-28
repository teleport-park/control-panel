import { Injectable } from '@angular/core';

/**
 * config interface
 */
export interface InitConfig {
    api_url: string;
    refresh_interval: number;
    ws_url: string;
}

@Injectable({
    providedIn: 'root'
})

export class InitService {

    private readonly API_URL: string = 'CONTROL_PANEL_API_URL';

    private _defaultApiUrl: string;

    get DefaultApi() {
        return this._defaultApiUrl;
    }

    /**
     * init config
     */
    config: InitConfig = {api_url: '/', refresh_interval: 10, ws_url: '/'};



    constructor() {
    }

    /**
     * init app
     */
    init() {
        return new Promise<void>((resolve, reject) => {
            try {
                const config = require('../../config/app-init-config.json');
                if (config && config.api_url) {
                    console.log('[API_URL]:', config.api_url);
                    this.config = config;
                    const apiUrlFromStorage = JSON.parse(localStorage.getItem(this.API_URL));
                    this._defaultApiUrl = config.api_url;
                    if (apiUrlFromStorage) {
                        this.config.api_url = apiUrlFromStorage;
                    } else {
                        localStorage.setItem(this.API_URL, this.config.api_url);
                    }
                    resolve();
                } else {
                    console.warn('Property "api_url" is not defined in "app-init-config.json", default value "/" has been used');
                    resolve();
                }
            } catch (e) {
                console.warn('File app-init-config.json is missing, default value "/" has been used');
                resolve();
            }
        });
    }

    setAPiUrl(url: string) {
        this.config.api_url = url;
        localStorage.setItem(this.API_URL, JSON.stringify(url));
    }
}
