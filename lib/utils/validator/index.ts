import _ from 'lodash';
import { getLocaleLang } from 'utils/validator/utils/getLocale';

export default class {
  static resourceName = (str: string, lang: string): string | boolean => {
    const locale = getLocaleLang(lang);
    // eslint-disable-next-line no-control-regex
    const containsFullWidthCharacter = /[^\x01-\x7E]/.test(str);
    if (containsFullWidthCharacter) return locale.resourceName.invalidFormat;
    return true;
  };

  static filePath = (str: string, lang: string): string | boolean => {
    const locale = getLocaleLang(lang);
    if (_.isEmpty(str)) return locale.filePath.required;
    if (!str.endsWith('.yml') && !str.endsWith('.yaml')) return locale.mustBeYaml;
    return true;
  };

  static serverlessConfigPath = (str: string, lang: string): string | boolean => {
    const locale = getLocaleLang(lang);
    if (_.isEmpty(str)) return locale.serverlessConfigPath.required;
    if (!str.endsWith('.yml') && !str.endsWith('.yaml')) return locale.mustBeYaml;
    return true;
  };
}
