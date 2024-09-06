import 'intl-pluralrules'; // Polyfill for Intl.PluralRules
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import { NativeModules, Platform } from 'react-native';

const getDeviceLanguage = () => {
  const language =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  return language ? language.split('_')[0] : 'en'; // Extract language (e.g., "en" from "en_US")
};

i18n
  .use(initReactI18next) // Pass the i18n instance to react-i18next
  .use(HttpBackend) // Load translations from backend (local JSON files)
  .init({
    fallbackLng: 'en', // Fallback language if the current language translations are not available
    lng: getDeviceLanguage(), // Get the device language
    backend: {
      loadPath: '../constants/locales/{{lng}}/translation.json' // Path to translation files
    },
    interpolation: {
      escapeValue: false // React already escapes values
    },
    react: {
      useSuspense: false // Disable suspense mode
    }
  });
