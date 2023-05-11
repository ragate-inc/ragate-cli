import ja from 'features/add/locale/ja';
import en from 'features/add/locale/en';
import { Locale } from 'features/add/types/index';

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
