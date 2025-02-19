// core (MUI)
import {
  amET as amETCore,
  enUS as enUSCore,
} from '@mui/material/locale';
// date pickers (MUI)
import {
  enUS as enUSDate,
} from '@mui/x-date-pickers/locales';
// data grid (MUI)
import {
  enUS as enUSDataGrid,
} from '@mui/x-data-grid/locales';

// ----------------------------------------------------------------------

export const allLangs = [
  {
    value: 'en',
    label: 'English',
    countryCode: 'GB',
    adapterLocale: 'en',
    numberFormat: { code: 'en-US', currency: 'ETB' },
    systemValue: {
      components: { ...enUSCore.components, ...enUSDate.components, ...enUSDataGrid.components },
    },
  },
  {
    value: 'am',
    label: 'አማርኛ',
    countryCode: 'ET',
    adapterLocale: 'am',
    numberFormat: { code: 'am-ET', currency: 'ETB' },
    systemValue: {
      components: { ...amETCore.components },
    },
  },
  {
    value: 'om',
    label: 'Afaan Oromoo',
    countryCode: 'ET', 
    adapterLocale: 'om',
    numberFormat: { code: 'om-ET', currency: 'ETB' },
    systemValue: {
      components: { ...amETCore.components },
    },
  },
];

/**
 * Country code:
 * https://flagcdn.com/en/codes.json
 *
 * Number format code:
 * https://gist.github.com/raushankrjha/d1c7e35cf87e69aa8b4208a8171a8416
 */
