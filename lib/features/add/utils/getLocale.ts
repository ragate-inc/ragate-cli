import { Lang } from 'types/index';
import ja from 'features/add/locale/ja';
import en from 'features/add/locale/en';
import { Locale } from 'features/add/types/index';
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
