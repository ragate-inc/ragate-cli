import Logger from 'utils/logger';
import { AWS_REGION, FeatureHandlerAbstract } from 'types/index';
import yargs from 'yargs';
import _ from 'lodash';
import { processCurrent } from 'utils/cli';
import { readYaml, writeServerlessConfig, writeYaml } from 'utils/yaml';
import { getLocaleLang } from 'features/add/features/sns/utils/getLocale';
import { DuplicatedPropertyError } from 'exceptions/index';
import inquirer from 'inquirer';
import validator from 'utils/validator';
import transformer from 'utils/transformer';

type SnsType = {
  Type: 'AWS::SNS::Topic';
  Properties: {
    TopicName: string;
    Subscription: string;
  };
};

type Resource = {
  Resources?: Record<string, SnsType>;
};

export default class extends FeatureHandlerAbstract {
  constructor(argv: yargs.ArgumentsCamelCase<{ region: AWS_REGION }>) {
    super(argv);
  }

  private get defaultResourcePath(): string {
    return `serverless/${this.argv.region}/resources/sns.yml`;
  }

  private get defaultServerlessConfigPath(): string {
    return `serverless/${this.argv.region}/serverless.yml`;
  }

  public async run(): Promise<void> {
    const logger = Logger.getLogger();
    const locale = getLocaleLang(this.lang);

    const res = (await inquirer
      .prompt([
        {
          type: 'input',
          name: 'resourceName',
          message: 'input a sns resource name]',
          validate: (value: string) => {
            if (_.isEmpty(value)) return locale.error.reqiredResourceName;
            return validator.resourceName(value, this.lang);
          },
        },
        {
          type: 'checkbox',
          name: 'subscriptions',
          message: 'select a sns subscriptions]',
          choices: ['email', 'lambda'],
          validate: (value: string[]) => {
            if (_.isEmpty(value)) return locale.error.reqiredSubscriptions;
            return true;
          },
        },
        {
          type: 'input',
          name: 'filePath',
          message: 'input a cloudformation file path]',
          default: () => this.defaultResourcePath,
          validate: (value: string) => validator.filePath(value, this.lang),
          transformer: (input: string) => transformer.filePath(input),
        },
        {
          type: 'input',
          name: 'serverlessConfigPath',
          message: 'input a serverless config file path]',
          default: () => this.defaultServerlessConfigPath,
          validate: (value: string) => validator.serverlessConfigPath(value, this.lang),
          transformer: (input: string) => transformer.serverlessConfigPath(input),
        },
      ])
      .then((answers) => {
        return answers as Record<string, unknown>;
      })) as { resourceName: string; filePath: string; subscriptions: string[]; serverlessConfigPath: string };

    logger.debug(`input values : ${JSON.stringify(res)}}`);

    const { resourceName, filePath, subscriptions, serverlessConfigPath } = res;

    const path = `${processCurrent}/${filePath}`;

    const subscription = subscriptions.map((sub) => ({
      Endpoint: sub === 'email' ? 'Your email address' : 'Your lambda Arn',
      Protocol: sub,
    }));

    try {
      const doc: Resource = (readYaml(path) as Resource) ?? {};

      if (_.hasIn(doc, `Resources.${resourceName}`)) {
        logger.error(`${locale.error.alreadyExistResource}`);
        logger.error(`ResourceName : ${resourceName}`);
        logger.error(doc);
        throw new DuplicatedPropertyError(locale.error.alreadyExistResource);
      }

      const yamlText = writeYaml(path, {
        ...doc,
        Resources: {
          ...doc.Resources,
          [resourceName]: {
            Type: 'AWS::SNS::Topic',
            Properties: {
              TopicName: resourceName,
              Subscription: subscription,
            },
          },
        },
      });
      logger.info(path);
      logger.info(`${locale.overrightFile} : ${path}`);
      logger.info(yamlText);
    } catch (e) {
      if ((e as Error).name === 'DuplicatedPropertyError') throw e;
      const yamlText = writeYaml(path, {
        Resources: {
          [resourceName]: {
            Type: 'AWS::SNS::Topic',
            Properties: {
              TopicName: resourceName,
              Subscription: subscription,
            },
          },
        },
      });
      logger.info(path);
      logger.info(`${locale.outputFile} : ${path}`);
      logger.info(yamlText);
    }

    writeServerlessConfig({ serverlessConfigPath, resourceFilePath: filePath });
  }
}
