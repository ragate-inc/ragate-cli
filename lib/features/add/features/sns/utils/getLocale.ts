import ja from 'features/add/features/sns/locale/ja';
import en from 'features/add/features/sns/locale/en';
import { Locale } from 'features/add/features/sns/types/index';

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
