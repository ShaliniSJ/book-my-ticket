import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import ta from "../locales/ta.json";
import hi from "../locales/hi.json";

i18n
  .use(initReactI18next) // Pass the i18n instance to react-i18next
  .init({
    compatibilityJSON: "v3", // Use v3 JSON format
    fallbackLng: "en", // Fallback language if the current language translations are not available
    lng : 'en',
    resources: {
      en: { translation: en },
      ta: { translation: ta },
      hi: { translation: hi },
    },
  });

export default i18n;
