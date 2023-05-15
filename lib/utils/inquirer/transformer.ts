import _ from 'lodash';

export default class Transformer {
  constructor(input: string | number) {
    this.input = input;
  }

  private readonly input: string | number;

  private transforms: ((value: string | number) => string | number)[] = [];

  public filePath = (): Transformer => {
    if (_.isString(this.input)) {
      this.transforms.push((value: string | number) => {
        return (value as string).replace(/\s+/g, '');
      });
    }
    return this;
  };

  public removeAllSpace = (): Transformer => {
    if (_.isString(this.input)) {
      this.transforms.push((value: string | number) => {
        return (value as string).replace(/\s+/g, '');
      });
    }
    return this;
  };

  public value(): string | number {
    if (_.isEmpty(this.transforms)) return this.input;
    return _.reduce(
      this.transforms,
      (result: string | number, filter) => {
        return filter(result);
      },
      this.input
    );
  }
}
