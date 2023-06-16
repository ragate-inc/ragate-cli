import _ from 'lodash';
import { getLocaleLang } from 'utils/validator/utils/getLocale';
import { Locale } from './types';

export default class Validator {
  constructor(input: string | number | string[], lang: string) {
    this._input = input;
    this._lang = lang;
    this._locale = getLocaleLang(this._lang);
  }

  private readonly _input: string | number | string[];
  private readonly _lang: string;
  private _locale: Locale;
  private validations: (() => string | boolean)[] = [];

  private get locale(): Locale {
    return this._locale;
  }

  private get input(): string | number | string[] {
    return this._input;
  }

  public required = (): Validator => {
    this.validations.push((): string | boolean => {
      if (_.isUndefined(this.input) || _.isNull(this.input)) return this.locale.required;
      if (_.isString(this.input) && _.isEmpty(this.input)) return this.locale.required;
      if (_.isArray(this.input) && !_.every(this.input)) return this.locale.required;
      return true;
    });
    return this;
  };

  public mustNoIncludeZenkaku = (): Validator => {
    this.validations.push((): string | boolean => {
      if (!_.isString(this.input)) return true;
      // eslint-disable-next-line no-control-regex
      const containsFullWidthCharacter = /[^\x01-\x7E]/.test(this.input.toString());
      if (containsFullWidthCharacter) return this.locale.mustNoIncludeZenkaku;
      return true;
    });
    return this;
  };

  public mustBeYamlFilePath = (): Validator => {
    this.validations.push((): string | boolean => {
      if (!_.isString(this.input)) return true;
      if (!this.input.endsWith('.yml') && !this.input.endsWith('.yaml')) return this.locale.mustBeYamlFilePath;
      return true;
    });
    return this;
  };

  public mustBeExtension = (): Validator => {
    this.validations.push((): string | boolean => {
      const pattern = /\.[^.]*$/;
      if (!_.isString(this.input)) return true;
      if (!pattern.test(this.input)) return this.locale.mustBeExtension;
      return true;
    });
    return this;
  };

  public value(): string | boolean {
    for (let i = 0; i < this.validations.length; i++) {
      const result = this.validations[i]();
      if (_.isString(result)) return result;
    }
    return true;
  }
}
