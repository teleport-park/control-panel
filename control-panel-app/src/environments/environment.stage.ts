// stage environments
import { API } from '../app/api';

export const environment = {
    production: true,
    dev: true,
    api: API,
    VERSION: require('../../package.json').version
};
