import { API } from '../app/api';

export const environment = {
  production: true,
  origin: 'http://mocks.control-panel.gcloud.teleport-park.com/',
  api: API,
  VERSION: require('../../package.json').version
};
