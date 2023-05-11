export default class {
  static filePath = (str: string): string | boolean => {
    if (str.startsWith('/')) return str.slice(1);
    return str;
  };

  static serverlessConfigPath = (str: string): string | boolean => {
    if (str.startsWith('/')) return str.slice(1);
    return str;
  };
}
