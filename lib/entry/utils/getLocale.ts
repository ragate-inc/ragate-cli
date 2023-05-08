import { Lang } from 'types/index';
import ja from 'entry/locale/ja';
import en from 'entry/locale/en';
import { Locale } from 'entry/types/index';
import { EnvironmentError } from 'exceptions/index';

export const getLocaleLang = (locale: Lang): Locale => {
  switch (locale) {
    case 'ja':
      return ja;
    case 'en':
      return en;
    default:
      throw new EnvironmentError('An invalid environment variable is specified. : LOCALE');
  }
};
