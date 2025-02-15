import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, I18nextProvider as Provider } from 'react-i18next';

import { localStorageGetItem, localStorageSetItem } from 'src/utils/storage-available';

import { i18nOptions, fallbackLng } from './config-locales';

// ----------------------------------------------------------------------

/**
 * [1] localStorage
 * Auto detection:
 * const lng = localStorageGetItem('i18nextLng')
 */
const lng = localStorageGetItem('i18nextLng', fallbackLng);

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(resourcesToBackend((lang: string, ns: string) => import(`./langs/${lang}/${ns}.json`)))
  .init({
    ...i18nOptions(lng),
    lng,
    ns: ['common', 'navbar', 'product', 'auth', 'cart'],
    defaultNS: 'common',
    fallbackNS: 'common',
    detection: {
      caches: ['localStorage'],
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
    },
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    fallbackLng,
    load: 'languageOnly',
    debug: process.env.NODE_ENV === 'development',
  });

i18next.on('languageChanged', (newLang) => {
  localStorageSetItem('i18nextLng', newLang);
  document.documentElement.lang = newLang;
  document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
});

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function I18nProvider({ children }: Props) {
  return <Provider i18n={i18next}>{children}</Provider>;
}
