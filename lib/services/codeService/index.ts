import parser from 'utils/parser';
import typescript from 'services/codeService/templates/typescript';
import vtl from 'services/codeService/templates/vtl';
import { asFullPath, createDirectories, isFileExists } from 'utils/cli';
import fs from 'fs';
import Logger from 'utils/logger';
import { chalk } from 'yargonaut';

export default class CodeService {
  public static get templates() {
    return {
      typescript,
      vtl,
    };
  }

  constructor(args: { filePath: string; code: string; type: 'typescript' | 'vtl' }) {
    const { filePath, code, type } = args;
    const [directories, fileName] = parser.parseFilePath(filePath);
    this.type = type;
    this.filePath = filePath;
    this.code = code;
    this.destinationPath = directories.join('/') + '/';
    if (type === 'typescript') {
      this.fileName = parser.extractFilename(fileName);
    } else {
      this.fileName = fileName;
    }
    this.logger = Logger.getLogger();
  }

  private readonly filePath: string;
  private readonly type: 'typescript' | 'vtl';
  private readonly destinationPath: string;
  private readonly fileName: string;
  private readonly code: string;
  private readonly logger;

  private get extension(): string {
    switch (this.type) {
      case 'typescript':
        return 'ts';
      case 'vtl':
        return 'vtl';
      default:
        this.logger.error(`An unsupported file type was specified. : ${this.filePath}`);
        throw Error('An unsupported file type was specified.');
    }
  }

  public write(): void {
    const destination = `${asFullPath(this.destinationPath)}${this.fileName}.${this.extension}`;
    if (isFileExists(destination)) {
      this.logger.info(`already exists file, skip write : ${destination}`);
      return;
    }
    createDirectories(this.destinationPath);
    this.logger.info(`create directories : ${this.destinationPath}`);
    fs.writeFileSync(destination, this.code, 'utf8');
    this.logger.info(`write : ${destination}`);
    this.logger.info(chalk().green(this.code));
  }
}
