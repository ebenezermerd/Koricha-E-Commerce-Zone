import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { toast } from 'src/components/snackbar';
import { localStorageSetItem } from 'src/utils/storage-available';

import { allLangs } from './all-langs';
import { fallbackLng, changeLangMessages as messages } from './config-locales';

import type { LanguageValue } from './config-locales';

// ----------------------------------------------------------------------

export function useTranslate(ns?: string) {
  const { t, i18n } = useTranslation(ns);

  const fallback = allLangs.find((lang) => lang.value === fallbackLng) || allLangs[0];
  const currentLang = allLangs.find((lang) => lang.value === i18n.resolvedLanguage);

  const onChangeLang = useCallback(
    async (newLang: LanguageValue) => {
      try {
        const langChangePromise = i18n.changeLanguage(newLang);
        
        
        // Persist the language choice
        localStorageSetItem('i18nextLng', newLang);
        document.documentElement.lang = newLang;

        const currentMessages = messages[newLang] || messages.en;

        await toast.promise(langChangePromise, {
          loading: currentMessages.loading,
          success: () => {
            dayjs.locale(currentLang?.adapterLocale || 'en');
            return currentMessages.success;
          },
          error: currentMessages.error,
        });
      } catch (error) {
        console.error('Error changing language:', error);
      }
    },
    [currentLang, i18n]
  );

  return {
    t,
    i18n,

    onChangeLang,
    currentLang: currentLang ?? fallback,
  };
}
