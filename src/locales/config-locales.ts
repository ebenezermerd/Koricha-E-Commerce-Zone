// ----------------------------------------------------------------------

export type LanguageValue = 'en' | 'ar' | 'am';

export const defaultLang = {
  value: 'en',
  label: 'English',
  icon: '/assets/icons/flags/ic_flag_en.svg',
  adapterLocale: 'en',
};

export const fallbackLng = defaultLang.value;
export const languages = ['en', 'ar', 'am'];
export const defaultNS = 'common';
export const cookieName = 'i18next';

// ----------------------------------------------------------------------

export function i18nOptions(lng: string) {
  return {
    supportedLngs: ['am', 'en', 'ar'],
    lng,
    fallbackLng,
    debug: false,
    load: 'languageOnly',
    whitelist: ['am', 'en', 'ar'],
    preload: ['am', 'en', 'ar'],
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
  ar: {
    success: 'تم تغيير اللغة!',
    error: 'خطأ في تغيير اللغة!',
    loading: 'جارٍ التحميل...',
  },
  am: {
    success: 'ቋንቋ ተቀየረ!',
    error: 'ቋንቋ ተቀየረ፡፡',
    loading: 'በማድረግ ላይ...',
  },
};
