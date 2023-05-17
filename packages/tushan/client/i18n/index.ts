import i18n, { Resource, ResourceKey } from 'i18next';
import { useTranslation, initReactI18next, Trans } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export async function initI18N(resources: Resource) {
  await i18n.use(initReactI18next).use(LanguageDetector).init({
    fallbackLng: 'en',
    resources,
  });
}

export { useTranslation, Trans };
export type { ResourceKey };
