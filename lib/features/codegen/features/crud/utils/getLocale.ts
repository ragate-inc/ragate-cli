import ja from 'features/codegen/features/crud/locale/ja';
import en from 'features/codegen/features/crud/locale/en';
import { Locale } from 'features/codegen/features/crud/types/index';

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
