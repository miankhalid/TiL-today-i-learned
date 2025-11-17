import 'intl-pluralrules';

import type { Language } from '@/hooks/language/schema';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en-EN.json';
import fr from './fr-FR.json';

export const defaultNS = 'kryos';

// IMPORTANT:
// this was very important to make sure key doesn't appear instead of the translation
export const resources = {
  'en-EN': {
    kryos: en,
  },
  'fr-FR': {
    kryos: fr,
  },
} as const satisfies Record<Language, unknown>;

void i18n.use(initReactI18next).init({
  defaultNS,
  fallbackLng: 'en-EN',
  lng: 'en-EN',
  resources,
});

// add capitalization formatter
i18n.services.formatter?.add(
  'capitalize',
  (value: string) =>
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
);

export default i18n;
