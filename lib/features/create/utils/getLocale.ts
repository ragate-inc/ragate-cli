import { Lang } from 'types/index';
import ja from 'features/create/locale/ja';
import en from 'features/create/locale/en';
import { Locale } from 'features/create/types/index';
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
