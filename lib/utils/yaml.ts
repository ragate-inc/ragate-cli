import jsyaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import Logger from 'utils/logger';
import config from 'config';

const convertAsFullPath = (path: string) => {
  return path.startsWith('/') ? path : `${config.currentPath}/${path}`;
};

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

export const writeYaml = (path: string, data: Record<string, unknown>): string => {
  const yamlText = jsyaml.dump(data, {});
  createDirectories(path);
  fs.writeFileSync(convertAsFullPath(path), yamlText, 'utf8');
  return yamlText;
};

export const readYaml = (path: string) => {
  return jsyaml.load(fs.readFileSync(convertAsFullPath(path), 'utf8'));
};

export const writeServerlessConfig = (args: { serverlessConfigPath: string; resourceFilePath: string }): void => {
  type ServerlessConfig = { resources: string[] };
  const { serverlessConfigPath, resourceFilePath } = args;
  const logger = Logger.getLogger();
  const path = resourceFilePath.startsWith('/') ? resourceFilePath : `/${resourceFilePath}`;
  try {
    const doc: ServerlessConfig = (readYaml(serverlessConfigPath) as ServerlessConfig) ?? {};
    const resources = doc.resources ?? [];
    if (resources.includes(resourceFilePath)) return;
    resources.push(`\${file(.${path})}`);
    const yamlText = writeYaml(serverlessConfigPath, {
      ...doc,
      resources,
    });
    logger.info(path);
    logger.info(yamlText);
  } catch (e) {
    logger.debug(e);
    logger.warn('not found serverless config file, skip update');
    logger.warn(`please check a input path : ${serverlessConfigPath}`);
  }
};
