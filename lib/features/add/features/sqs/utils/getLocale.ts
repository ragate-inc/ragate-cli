import ja from 'features/add/features/sqs/locale/ja';
import en from 'features/add/features/sqs/locale/en';
import { Locale } from 'features/add/features/sqs/types/index';

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
