export default class {
  public static parseLambdaHandlerPath(input: string): [string[], string] {
    const parts = input.split('/');
    const path = parts.slice(0, -1);
    const filename = parts[parts.length - 1];
    return [path.length > 0 ? path : [], filename];
  }

  public static parseSlsRecursivelyReference = (str: string): string | undefined => {
    const regex = /\${file\((.*?)\)}/;
    const match = str.match(regex);
    if (match) {
      const pathInfo = match[1];
      return pathInfo;
    }
  };

  public static extractFilename(input: string): string {
    const filename = input.split('.')[0];
    return filename;
  }
}
