import fs from 'fs';
import path from 'path';
import Logger from 'utils/logger';
import config from 'config';
import jsyaml from 'js-yaml';
import _ from 'lodash';
import { schema } from 'yaml-cfn';
import { chalk } from 'yargonaut';
import { ServerlessConfig, ServerlessConfigInput, ServerlessFunctionsYaml, ServerlessFunctionsYamlInput } from 'types/index';
import { Stack, Construct, StackProps, App, CfnResource } from '@aws-cdk/core';
import { Resource } from '@aws-cdk/core';
import { SynthUtils } from '@aws-cdk/assert';

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

export const writeYaml = (destinationPath: string, data: Record<string, unknown> | Record<string, unknown>[]): string => {
  const yamlText = jsyaml.dump(data, { schema });
  createDirectories(destinationPath);
  fs.writeFileSync(asFullPath(destinationPath), yamlText, 'utf8');
  return yamlText;
};

export const loadYaml = <T>(sourcePath: string): T => {
  return jsyaml.load(fs.readFileSync(asFullPath(sourcePath), 'utf8'), { schema }) as T;
};

export const writeServerlessConfig = (args: { serverlessConfigPath: string; resourceFilePath: string }): void => {
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
    resources.push(`\${./file(${destinationPath})}`);
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

export const generateCloudFormation = (resourceName: string, resource: (c: Construct) => Resource): Record<string, unknown> => {
  class DevStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
      super(scope, id, props);
      const res = resource(this);
      const cfn = res.node.defaultChild as CfnResource;
      cfn.overrideLogicalId(resourceName);
    }
  }
  const logger = Logger.getLogger();
  const stack = new DevStack(new App(), 'ragate');
  // Convert to CloudFormation template
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const cfn = SynthUtils.toCloudFormation(stack) as Record<string, unknown>;
  logger.debug('generated cloudFormation template:');
  logger.debug(cfn);
  return cfn;
};

export const generateServerlessConfig = (config?: ServerlessConfigInput) => {
  return {
    service: config?.service ?? 'starter',
    useDotenv: config?.useDotenv ?? true,
    provider: {
      name: config?.provider?.name ?? 'aws',
      runtime: config?.provider?.runtime ?? 'nodejs18.x',
      stage: config?.provider?.stage ?? '${opt:stage}',
      region: config?.provider?.region ?? 'ap-northeast-1',
      iam: {
        role: config?.provider?.iam?.role ?? 'DefaultLambdaRole',
      },
      environment: {
        STAGE: config?.provider?.environment?.STAGE ?? '${self:provider.stage}',
        REGION: config?.provider?.environment?.REGION ?? '${self:provider.region}',
        AWS_RESOURCE_PRIFIX: config?.provider?.environment?.AWS_RESOURCE_PRIFIX ?? '${self:custom.awsResourcePrefix}',
        LOG_LEVEL: config?.provider?.environment?.LOG_LEVEL ?? 'INFO',
      },
    },
    plugins: config?.plugins ?? ['serverless-webpack', 'serverless-prune-plugin'],
    functions: config?.functions ?? '${file(./serverless/ap-northeast-1/resources/functions.yml)}',
    resources: config?.resources ?? [],
    package: {
      individually: config?.package?.individually ?? true,
      includeModules: config?.package?.includeModules ?? true,
      patterns: config?.package?.patterns ?? ['!appsync/*,*', '!node_modules/**', '!resources/**', '!__tests__/**', '!.git/**', '!tmp/**'],
    },
    custom: {
      awsResourcePrefix: config?.custom?.awsResourcePrefix ?? '${self:service}-${self:provider.stage}-',
      webpack: config?.custom?.webpack ?? {
        includeModules: true,
        packager: 'npm',
      },
      prune: config?.custom?.prune ?? {
        automatic: true,
        number: 3,
      },
    },
  };
};

export const generateFunctionYamlProperty = (resourceName: string, input?: ServerlessFunctionsYamlInput): ServerlessFunctionsYaml => {
  return {
    [resourceName]: {
      handler: input?.handler ?? 'handler.handler',
      name: input?.name ?? resourceName,
      memorySize: input?.memorySize ?? 512,
      timeout: input?.timeout ?? 10,
    },
  };
};

export const getPathFromRecursivelyReference = (str: string): string | undefined => {
  const regex = /\${file\((.*?)\)}/;
  const match = str.match(regex);
  if (match) {
    const pathInfo = match[1];
    return pathInfo;
  }
};
