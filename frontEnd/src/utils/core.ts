import { trim } from 'lodash';

export const REACT_APP_ENV = trim(process.env.REACT_APP_ENV);
export const isProd = REACT_APP_ENV === 'production';
export const isDev = REACT_APP_ENV === 'development';
export const isLocal = REACT_APP_ENV === 'local' || !REACT_APP_ENV;

export const REACT_APPAPI_GATEWAY = process.env.REACT_APP_API_GATEWAY_ENDPOINT;
export const REACT_APPAPI_GATALOG = process.env.REACT_APP_API_GATALOG_ENDPOINT;
export const REACT_APP_ADMIN_WEB_URL = process.env.REACT_APP_ADMIN_WEB_URL;
export const BASE_URL_PATH = '/user-console';
console.log(process.env);

export const resourceBase = process.env.PUBLIC_URL;

if (!isProd) {
  // console.log('env', REACT_APP_ENV);
}
