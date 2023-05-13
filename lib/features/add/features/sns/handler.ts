import Logger from 'utils/logger';
import { AWS_REGION, AwsResource, FeatureHandlerAbstract } from 'types/index';
import yargs from 'yargs';
import _ from 'lodash';
import { loadYaml, writeServerlessConfig, writeYaml } from 'utils/yaml';
import { getLocaleLang } from 'features/add/features/sns/utils/getLocale';
import { DuplicatedPropertyError } from 'exceptions/index';
import inquirer from 'inquirer';
import Validator from 'utils/validator';
import transformer from 'utils/transformer';
import filter from 'utils/filter';
import { SnsType } from 'features/add/features/sns/types';
import { chalk } from 'yargonaut';

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
          message: 'input a sns resource name',
          filter: (input: string) => input.replace(/\s+/g, ''),
          transformer: (input: string) => input.replace(/\s+/g, ''),
          validate: (value: string) => new Validator(value, this.lang).required().mustNoIncludeZenkaku().value,
        },
        {
          type: 'checkbox',
          name: 'subscriptions',
          message: 'select a sns subscriptions',
          choices: ['email', 'lambda'],
          validate: (value: string[]) => {
            if (_.isEmpty(value)) return locale.error.reqiredSubscriptions;
            return true;
          },
        },
        {
          type: 'input',
          name: 'filePath',
          message: 'input a cloudformation file path',
          default: () => this.defaultResourcePath,
          validate: (value: string) => new Validator(value, this.lang).required().mustBeYamlFilePath().value,
          transformer: (input: string) => transformer.filePath(input),
          filter: (input: string) => filter.filePath(input),
        },
        {
          type: 'input',
          name: 'serverlessConfigPath',
          message: 'input a serverless config file path',
          default: () => this.defaultServerlessConfigPath,
          validate: (value: string) => new Validator(value, this.lang).required().mustBeYamlFilePath().value,
          transformer: (input: string) => transformer.removeAllSpace(input),
          filter: (input: string) => filter.removeAllSpace(input),
        },
      ])
      .then((answers) => {
        return answers as Record<string, unknown>;
      })) as { resourceName: string; filePath: string; subscriptions: string[]; serverlessConfigPath: string };

    logger.debug(`input values : ${JSON.stringify(res)}}`);

    const { resourceName, filePath, subscriptions, serverlessConfigPath } = res;

    const subscription = subscriptions.map((sub) => ({
      Endpoint: sub === 'email' ? 'Your email address' : 'Your lambda Arn',
      Protocol: sub,
    }));

    const resource: SnsType = {
      Type: 'AWS::SNS::Topic',
      Properties: {
        TopicName: resourceName,
        Subscription: subscription,
      },
    };

    try {
      const doc = loadYaml<AwsResource<SnsType>>(filePath) ?? {};

      if (_.hasIn(doc, `Resources.${resourceName}`)) {
        logger.error(`${locale.error.alreadyExistResource}`);
        logger.error(`ResourceName : ${resourceName}`);
        logger.error(doc);
        throw new DuplicatedPropertyError(locale.error.alreadyExistResource);
      }

      const yamlText = writeYaml(filePath, {
        ...doc,
        Resources: {
          ...doc.Resources,
          [resourceName]: resource,
        },
      });
      logger.info(filePath);
      logger.info(`${locale.overrightFile} : ${filePath}`);
      logger.info(chalk().green(yamlText));
    } catch (e) {
      if ((e as Error).name === 'DuplicatedPropertyError') throw e;
      const yamlText = writeYaml(filePath, {
        Resources: {
          [resourceName]: resource,
        },
      });
      logger.info(filePath);
      logger.info(`${locale.outputFile} : ${filePath}`);
      logger.info(chalk().green(yamlText));
    }

    writeServerlessConfig({ serverlessConfigPath, resourceFilePath: filePath });
  }
}
