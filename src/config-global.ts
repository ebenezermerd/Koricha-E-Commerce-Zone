// API
import { paths } from 'src/routes/paths';

interface ImportMeta {
  env: {
    VITE_SERVER_URL: string;
    VITE_ASSETS_DIR: string;
    VITE_MAPBOX_API_KEY: string;
  };
}

import packageJson from '../package.json';
// ----------------------------------------------------------------------

export const GOOGLE_MAP_API = import.meta.env.VITE_MAPBOX_API_KEY;

// LAYOUT
// ----------------------------------------------------------------------

export const NAV = {
  W_BASE: 260,
  W_DRAWER: 280,
  //
  H_ITEM: 48,
  H_ITEM_SUB: 36,
};

export const ICON = {
  NAV_ITEM: 24,
};

export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 88,
};


// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  serverUrl: string;
  assetsDir: string;
  auth: {
    method: 'jwt';
    skip: boolean;
    redirectPath: string;
  };
  mapboxApiKey: string;
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: 'Koricha E-commerce',
  appVersion: packageJson.version,
  serverUrl: import.meta.env.VITE_SERVER_URL || '',
  assetsDir: import.meta.env.VITE_ASSETS_DIR || '',
  /**
   * Auth
   * @method jwt | amplify | firebase | supabase | auth0
   */
  auth: {
    method: 'jwt',
    skip: false,
    redirectPath: paths.eCommerce.account.personal,
  },
  /**
   * Mapbox
   */
  mapboxApiKey: import.meta.env.VITE_MAPBOX_API_KEY || '',
};
