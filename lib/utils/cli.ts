import { execSync } from 'child_process';
import { CLIError } from 'exceptions/index';
import Logger from 'utils/logger';
import path from 'path';

export const processCurrent = path.resolve();

const execFilePath = path.dirname(process.argv[1]);
export const tmpPath = `${execFilePath}/../tmp`;

export function gitClone(repositoryUrl: string, destinationPath: string): void {
  const logger = Logger.getLogger();
  try {
    logger.debug(execSync(`git clone ${repositoryUrl} ${destinationPath}`));
  } catch (error) {
    const err = error as Error;
    throw new CLIError(err.message);
  }
}

export function copyDirectory(from: string, to: string): void {
  const logger = Logger.getLogger();
  try {
    logger.debug(execSync(`cp -r ${from} ${to}`));
  } catch (error) {
    const err = error as Error;
    throw new CLIError(err.message);
  }
}

export function cleanUpTmpDirectory(): void {
  const logger = Logger.getLogger();
  try {
    logger.debug(execSync(`rm -rf ${tmpPath}`));
    logger.debug(execSync(`mkdir ${tmpPath}`));
  } catch (error) {
    const err = error as Error;
    throw new CLIError(err.message);
  }
}

export function isExistsDirectory(path: string): boolean {
  const logger = Logger.getLogger();
  try {
    logger.debug(execSync(`test -d ${path}`));
    return true;
  } catch (error) {
    return false;
  }
}
