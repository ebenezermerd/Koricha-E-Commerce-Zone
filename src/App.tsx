// scroll bar
import 'simplebar-react/dist/simplebar.min.css';

// lightbox
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// @mui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// routes
import Router from 'src/routes';
// theme
import ThemeProvider from 'src/theme';
// components
import { Snackbar } from 'src/components/snackbar';
import ScrollToTop from 'src/components/scroll-to-top';
import { ThemeSettings, SettingsProvider } from 'src/components/settings';
import MotionLazyContainer from 'src/components/animate/MotionLazyContainer';
import './index.css';

// Auth Context
import { AuthProvider as JwtAuthProvider } from 'src/auth/context/jwt';
import { ProfileImageProvider } from 'src/hooks/use-profile-image';
import { CartProvider } from './contexts/cart-context';
import { WishlistProvider } from './contexts/wishlist-context';
import { I18nextProvider } from 'react-i18next';
import { LocalizationProvider as I18nLocalizationProvider } from 'src/locales';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18nOptions, fallbackLng } from './locales/config-locales';
import { useEffect } from 'react';
import { localStorageGetItem } from 'src/utils/storage-available';

// ----------------------------------------------------------------------
const AuthProvider = JwtAuthProvider;

// Initialize i18next before the App component
i18next
  .use(initReactI18next)
  .init(i18nOptions(fallbackLng));

export default function App() {
  useEffect(() => {
    const savedLang = localStorageGetItem('i18nextLng');
    if (savedLang) {
      document.documentElement.lang = savedLang;
      document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    }
  }, []);

  return (
    <I18nextProvider i18n={i18next}>
      <I18nLocalizationProvider>
        <HelmetProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <AuthProvider>
              <SettingsProvider>
                <CartProvider>
                  <WishlistProvider>
                    <BrowserRouter>
                      <ScrollToTop />
                      <ThemeProvider>
                        <ThemeSettings>
                          <Snackbar />
                          <ProfileImageProvider>
                            <MotionLazyContainer>
                              <Router />
                            </MotionLazyContainer>
                          </ProfileImageProvider>
                        </ThemeSettings>
                      </ThemeProvider>
                    </BrowserRouter>
                  </WishlistProvider>
                </CartProvider>
              </SettingsProvider>
            </AuthProvider>
          </LocalizationProvider>
        </HelmetProvider>
      </I18nLocalizationProvider>
    </I18nextProvider>
  );
}
