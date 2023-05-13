export default class {
  static filePath = (str: string): string => {
    const res = str.replace(/\s+/g, '');
    return res;
  };

  static removeAllSpace = (str: string): string => {
    const res = str.replace(/\s+/g, '');
    return res;
  };
}
