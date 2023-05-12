import fs from 'fs';
import path from 'path';
import Logger from 'utils/logger';
import config from 'config';
import jsyaml from 'js-yaml';
import { schema } from 'yaml-cfn';
import { chalk } from 'yargonaut';

const asFullPath = (destinationPath: string) => path.join(config.currentPath, destinationPath);

const createDirectories = (filePath: string): void => {
  const directories = filePath.split(path.sep).slice(0, -1);
  directories.reduce((currentPath: string, directory: string) => {
    currentPath = path.join(currentPath, directory);
    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath);
    }
    return currentPath;
  }, '');
};

export const writeYaml = (destinationPath: string, data: Record<string, unknown>): string => {
  const yamlText = jsyaml.dump(data, { schema });
  createDirectories(destinationPath);
  fs.writeFileSync(asFullPath(destinationPath), yamlText, 'utf8');
  return yamlText;
};

export const loadYaml = <T>(sourcePath: string): T => {
  return jsyaml.load(fs.readFileSync(asFullPath(sourcePath), 'utf8'), { schema }) as T;
};

export const writeServerlessConfig = (args: { serverlessConfigPath: string; resourceFilePath: string }): void => {
  type ServerlessConfig = { resources: string[] };
  const { serverlessConfigPath, resourceFilePath } = args;
  const logger = Logger.getLogger();
  const destinationPath = path.join('./', resourceFilePath);
  try {
    const doc: ServerlessConfig = loadYaml(serverlessConfigPath) ?? {};
    const resources = doc.resources ?? [];
    if (resources.some((v) => v.includes(destinationPath))) {
      logger.debug(`already exists resource file path : ${destinationPath}`);
      return;
    }
    resources.push(`\${file(${destinationPath})}`);
    const yamlText = writeYaml(serverlessConfigPath, {
      ...doc,
      resources,
    });
    logger.info(destinationPath);
    logger.info(chalk().green(yamlText));
  } catch (e) {
    logger.debug(e);
    logger.warn('not found serverless config file, skip update');
    logger.warn(`please check a input path : ${serverlessConfigPath}`);
  }
};
