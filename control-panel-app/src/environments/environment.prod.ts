import { API } from '../app/api';

export const environment = {
    production: true,
    dev: false,
    api: API,
    VERSION: require('../../package.json').version
};
