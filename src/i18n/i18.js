import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en/en.json';
import es from './es/es.json';

i18n
  .use(HttpBackend) // Carga traducciones desde archivos
  .use(LanguageDetector) // Detecta idioma automáticamente
  .use(initReactI18next) // Inicializa con React
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: 'es', // Idioma por defecto
    debug: true, // Modo depuración
    interpolation: {
      escapeValue: false, // No escapar HTML
    },

  });

export default i18n;
