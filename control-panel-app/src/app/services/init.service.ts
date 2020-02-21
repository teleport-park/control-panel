import { Injectable } from '@angular/core';

/**
 * config interface
 */
export interface InitConfig {
    api_url: string;
    refresh_interval: number;
}

@Injectable({
    providedIn: 'root'
})

export class InitService {

    /**
     * init config
     */
    config: InitConfig = {api_url: '/', refresh_interval: 10};

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
}
