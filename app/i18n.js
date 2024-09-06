import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ta from "../constants/locales/en.json";
import hi from "../constants/locales/hi.json";

i18n
  .use(initReactI18next)
  .init({
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    resources: {
      ta: { translation: ta },
      hi: { translation: hi },
    },
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
  });

export default i18n;