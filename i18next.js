import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      // تأكد أن ملفات JSON موجودة في public/locales/en/translation.json
      loadPath: '/locales/{{lng}}/translation.json',
    },
    react: {
      useSuspense: false // تم التعطيل لتجنب الانهيار، وسنعالجها في الكومبوننت
    }
  });

export default i18n;
