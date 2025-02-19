/* eslint-disable perfectionist/sort-imports */

import 'dayjs/locale/en';
import 'dayjs/locale/am';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider as Provider } from '@mui/x-date-pickers/LocalizationProvider';

import { useTranslate } from './use-locales';

// Define custom locale for Oromo
dayjs.locale('om', {
  name: 'om',
  weekdays: 'Dilbata_Wiixata_Qibxata_Roobii_Kamiisa_Jimaata_Sanbata'.split('_'),
  months: 'Amajjii_Guraandhala_Bitooteessa_Elba_Caamsa_Waxabajjii_Adooleessa_Hagayya_Fuulbana_Onkololeessa_Sadaasa_Muddee'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Dil_Wix_Qib_Rob_Kam_Jim_San'.split('_'),
  monthsShort: 'Ama_Gur_Bit_Elb_Caa_Wax_Ado_Hag_Ful_Onk_Sad_Mud'.split('_'),
  weekdaysMin: 'Di_Wi_Qi_Ro_Ka_Ji_Sa'.split('_'),
  ordinal: (n: number) => n,
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'gara %s',
    past: '%s dura',
    s: 'sekondii muraasa',
    m: 'daqiiqaa 1',
    mm: 'daqiiqaa %d',
    h: 'sa\'aa 1',
    hh: 'sa\'aa %d',
    d: 'guyyaa 1',
    dd: 'guyyaa %d',
    M: 'ji\'a 1',
    MM: 'ji\'a %d',
    y: 'waggaa 1',
    yy: 'waggaa %d'
  }
});

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function LocalizationProvider({ children }: Props) {
  const { currentLang } = useTranslate();

  dayjs.locale(currentLang.adapterLocale);

  return (
    <Provider dateAdapter={AdapterDayjs} adapterLocale={currentLang.adapterLocale}>
      {children}
    </Provider>
  );
}
