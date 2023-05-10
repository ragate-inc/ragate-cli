import ja from 'features/create/locale/ja';
import en from 'features/create/locale/en';
import { Locale } from 'features/create/types/index';

export const getLocaleLang = (locale: string): Locale => {
  switch (locale) {
    case 'ja':
      return ja;
    case 'en':
      return en;
    default:
      return en;
  }
};
