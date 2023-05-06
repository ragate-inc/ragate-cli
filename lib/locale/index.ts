import { Locale, LocaleLang } from 'types/index';
import ja from 'locale/ja';
import en from 'locale/en';
import { EnvironmentError } from 'exceptions/index';

export const getLocaleLang = (locale: Locale): LocaleLang => {
  switch (locale) {
    case 'ja':
      return ja;
    case 'en':
      return en;
    default:
      throw new EnvironmentError('An invalid environment variable is specified. : LOCALE');
  }
};
