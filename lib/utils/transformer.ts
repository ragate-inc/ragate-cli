export default class {
  static filePath = (str: string): string | boolean => {
    const res = str.replace(/\s+/g, '');
    return res;
  };

  static serverlessConfigPath = (str: string): string | boolean => {
    const res = str.replace(/\s+/g, '');
    return res;
  };
}