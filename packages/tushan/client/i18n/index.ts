import i18n from 'i18next';
import type { Resource } from 'i18next';
import { useTranslation, initReactI18next, Trans } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { defaultI18NResources } from './default';

export async function initI18N(resources?: Resource) {
  let fallbackLng = 'en';
  if (resources) {
    fallbackLng = Object.keys(resources)[0];
  }

  await i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      fallbackLng,
      resources: resources ?? defaultI18NResources,
    });
}

export type TranslationKeys = {
  resources?: {
    [name: string]: {
      name: string;
      fields?: Record<string, string>;
    };
  };
  [key: string]: any;
};

export { useTranslation, Trans };
