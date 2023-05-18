import _ from 'lodash';
export default class {
  public static parseFilePath(input: string): [string[], string] {
    const parts = input.split('/');
    const path = parts.slice(0, -1);
    const filename = parts[parts.length - 1];
    return [path.length > 0 ? path : [], filename];
  }

  public static parseSlsRecursivelyReference = (str: string): string | undefined => {
    if (_.isEmpty(str)) return undefined;
    const regex = /\${file\((.*?)\)}/;
    const match = str.match(regex);
    if (match) {
      const pathInfo = match[1];
      return pathInfo;
    }
  };

  public static extractFilename(input: string): string {
    const array = input.split('.');
    if (array.length === 1) return input;
    else if (array.length === 2) return array[0];
    array.pop();
    return array.join('.');
  }
}
