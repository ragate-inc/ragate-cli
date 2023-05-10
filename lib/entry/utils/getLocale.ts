import ja from 'entry/locale/ja';
import en from 'entry/locale/en';
import { Locale } from 'entry/types/index';
import { EnvironmentError } from 'exceptions/index';

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
