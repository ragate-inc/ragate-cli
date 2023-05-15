import _ from 'lodash';

export default class Filter {
  constructor(input: string | number) {
    this.input = input;
  }

  private readonly input: string | number;

  private filters: ((value: string | number) => string | number)[] = [];

  public filePath = (): Filter => {
    if (_.isString(this.input)) {
      this.filters.push((value: string | number) => {
        return (value as string).replace(/\s+/g, '');
      });
    }
    return this;
  };

  public removeAllSpace = (): Filter => {
    if (_.isString(this.input)) {
      this.filters.push((value: string | number) => {
        return (value as string).replace(/\s+/g, '');
      });
    }
    return this;
  };

  public value(): string | number {
    if (_.isEmpty(this.filters)) return this.input;
    return _.reduce(
      this.filters,
      (result: string | number, filter) => {
        return filter(result);
      },
      this.input
    );
  }
}
