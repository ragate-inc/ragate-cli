import { CLIError } from 'exceptions/index';
import Logger from 'utils/logger';
import fs from 'fs-extra';
import config from 'config';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';

export async function gitClone(repositoryUrl: string, destinationPath: string): Promise<void> {
  const logger = Logger.getLogger();
  try {
    logger.debug(`git clone : ${repositoryUrl} -> ${destinationPath}`);
    await fs.promises.mkdir(destinationPath, { recursive: true });
    await git.clone({
      fs,
      http,
      dir: destinationPath,
      url: repositoryUrl,
      singleBranch: true,
      depth: 1,
    });
  } catch (error) {
    const err = error as Error;
    throw new CLIError(err.message);
  }
}

export function moveDirectory(sourcePath: string, destinationPath: string): void {
  const logger = Logger.getLogger();
  try {
    logger.debug(`move : ${sourcePath} -> ${destinationPath}`);
    fs.renameSync(sourcePath, destinationPath);
  } catch (error) {
    const err = error as Error;
    throw new CLIError(err.message);
  }
}

export function cleanUpTmpDirectory(): void {
  const logger = Logger.getLogger();
  try {
    logger.debug(`clean up tmp directory : ${config.tmpPath}`);
    fs.removeSync(config.tmpPath);
    logger.debug(`create tmp directory : ${config.tmpPath}`);
    fs.mkdirSync(config.tmpPath, { recursive: true });
  } catch (error) {
    const err = error as Error;
    throw new CLIError(err.message);
  }
}

export function isExistsDirectory(directoryPath: string) {
  const logger = Logger.getLogger();
  try {
    logger.debug(`check exists directory : ${directoryPath}`);
    const stats = fs.statSync(directoryPath);
    return stats.isDirectory();
  } catch (error) {
    if ((error as Record<string, string>).code === 'ENOENT') {
      return false;
    } else {
      throw error;
    }
  }
}
