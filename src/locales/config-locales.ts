// ----------------------------------------------------------------------

export type LanguageValue = 'en' | 'am' | 'om';

export const defaultLang = {
  value: 'en',
  label: 'English',
  icon: '/assets/icons/flags/ic_flag_en.svg',
  adapterLocale: 'en',
};

// Add language icons
export const allLangIcons = {
  en: '/assets/icons/flags/ic_flag_en.svg',
  am: '/assets/icons/flags/ic_flag_et.svg',
  om: '/assets/icons/flags/oromo.png'
};

export const fallbackLng = defaultLang.value;
export const languages = ['en', 'am', 'om'];
export const defaultNS = 'common';
export const cookieName = 'i18next';

// ----------------------------------------------------------------------

export function i18nOptions(lng: string) {
  return {
    supportedLngs: languages,
    lng,
    fallbackLng,
    debug: false,
    load: 'languageOnly',
    whitelist: languages,
    preload: languages,
  };
}

// ----------------------------------------------------------------------

export const changeLangMessages: Record<
  LanguageValue,
  { success: string; error: string; loading: string }
> = {
  en: {
    success: 'Language has been changed!',
    error: 'Error changing language!',
    loading: 'Loading...',
  },
  am: {
    success: 'ቋንቋ ተቀይሯል!',
    error: 'ቋንቋ መቀየር አልተቻለም!',
    loading: 'በመጫን ላይ...',
  },
  om: {
    success: 'Afaan jijjiirameera!',
    error: 'Afaan jijjiiruun hin danda\'amne!',
    loading: 'Fe\'aa jira...',
  },
};
