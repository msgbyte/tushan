import i18n, { Resource, ResourceKey } from 'i18next';
import { useTranslation, initReactI18next, Trans } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { defaultI18NResources } from './default';

export async function initI18N(resources?: Resource) {
  await i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      fallbackLng: 'en',
      resources: resources ?? defaultI18NResources,
    });
}

export { useTranslation, Trans };
export type { ResourceKey };
