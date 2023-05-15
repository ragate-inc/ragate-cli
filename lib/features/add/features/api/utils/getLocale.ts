import ja from 'features/add/features/api/locale/ja';
import en from 'features/add/features/api/locale/en';
import { Locale } from 'features/add/features/api/types/index';

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
