import parser from 'utils/parser';
import templates from 'services/codeService/templates';
import { asFullPath, createDirectories, isFileExists } from 'utils/cli';
import fs from 'fs';
import Logger from 'utils/logger';

export default class CodeService {
  public static get templates() {
    return templates;
  }

  constructor(args: { handlerPath: string; code: string }) {
    this.handlerPath = args.handlerPath;
    const [directories, handlerName] = parser.parseLambdaHandlerPath(args.handlerPath);
    this.destinationPath = directories.join('/') + '/';
    this.handlerName = parser.extractFilename(handlerName);
    this.code = args.code;
    this.logger = Logger.getLogger();
  }

  private readonly handlerPath: string;
  private readonly destinationPath: string;
  private readonly handlerName: string;
  private readonly code: string;
  private readonly logger;

  public write(): void {
    const destination = `${asFullPath(this.destinationPath)}${this.handlerName}.ts`;
    if (isFileExists(destination)) {
      this.logger.info(`already exists file, skip write : ${destination}`);
      return;
    }
    createDirectories(this.destinationPath);
    this.logger.info(`create directories : ${this.handlerPath}`);
    fs.writeFileSync(destination, this.code, 'utf8');
    this.logger.info(`write : ${destination}`);
    this.logger.debug(this.code);
  }
}
