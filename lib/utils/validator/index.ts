import _ from 'lodash';
import { getLocaleLang } from 'utils/validator/utils/getLocale';
import { Locale } from './types';

export default class Validator {
  constructor(input: string | number, lang: string) {
    this._value = true;
    this._input = input;
    this._lang = lang;
    this._locale = getLocaleLang(this._lang);
  }

  private _input: string | number;
  private _value: string | boolean;
  private _lang: string;
  private _locale: Locale;

  private get locale(): Locale {
    return this._locale;
  }
  private get input(): string | number {
    return this._input;
  }

  public required = (): Validator => {
    if (this._value) return this;
    if (_.isUndefined(this.input) || _.isNull(this.input)) this._value = this.locale.required;
    return this;
  };

  public mustNoIncludeZenkaku = (): Validator => {
    if (this._value) return this;
    // eslint-disable-next-line no-control-regex
    const containsFullWidthCharacter = /[^\x01-\x7E]/.test(this.input.toString());
    if (containsFullWidthCharacter) {
      this._value = this.locale.mustNoIncludeZenkaku;
    }
    return this;
  };

  public mustBeYamlFilePath = (): Validator => {
    if (this._value) return this;
    if (!_.isString(this.input)) return this;
    if (!this.input.endsWith('.yml') && !this.input.endsWith('.yaml')) {
      this._value = this.locale.mustBeYamlFilePath;
    }
    return this;
  };

  public get value(): string | boolean {
    return this._value;
  }
}
