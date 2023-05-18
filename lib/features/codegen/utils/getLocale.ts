import ja from 'features/codegen/locale/ja';
import en from 'features/codegen/locale/en';
import { Locale } from 'features/codegen/types/index';

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
