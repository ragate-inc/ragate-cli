import jsyaml from 'js-yaml';
import fs from 'fs';
import Logger from 'utils/logger';
import { processCurrent } from 'utils/cli';

const convertAsFullPath = (path: string) => {
  return path.startsWith('/') ? path : `${processCurrent}/${path}`;
};

export const writeYaml = (path: string, data: Record<string, unknown>): string => {
  const yamlText = jsyaml.dump(data, {});
  // TODO: ディレクトリを再帰的に作成すること
  fs.writeFileSync(convertAsFullPath(path), yamlText, 'utf8');
  return yamlText;
};

export const readYaml = (path: string) => {
  return jsyaml.load(fs.readFileSync(convertAsFullPath(path), 'utf8'));
};

type ServerlessConfig = { resources: string[] };

export const writeServerlessConfig = (args: { serverlessConfigPath: string; resourceFilePath: string }): void => {
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
