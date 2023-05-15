import ja from 'utils/validator/locale/ja';
import en from 'utils/validator/locale/en';
import { Locale } from 'utils/validator/types/index';

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
