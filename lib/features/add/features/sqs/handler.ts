import Logger from 'utils/logger';
import { AWS_REGION, AwsResource, FeatureHandlerAbstract } from 'types/index';
import yargs from 'yargs';
import _ from 'lodash';
import { loadYaml, writeServerlessConfig, writeYaml } from 'utils/yaml';
import { getLocaleLang } from 'features/add/features/sqs/utils/getLocale';
import { DuplicatedPropertyError } from 'exceptions/index';
import inquirer from 'inquirer';
import Validator from 'utils/validator';
import Filter from 'utils/inquirer/filter';
import Transformer from 'utils/inquirer/transformer';
import { StandardQueueType, StandardDeadLetterQueueType, FifoDeadLetterQueueType, FifoQueueType } from 'features/add/features/sqs/types';
import { chalk } from 'yargonaut';
import { generateCloudFormation } from 'utils/yaml';
import * as sqs from '@aws-cdk/aws-sqs';

type generateSqsCfInput = {
  queueType: 'Standard' | 'Fifo';
  useDeadLetterQueue: boolean;
  contentBasedDeduplication: boolean;
};

type Prompt = {
  resourceName: string;
  queueType: 'Standard' | 'Fifo';
  useDeadLetterQueue: boolean;
  contentBasedDeduplication: boolean;
  filePath: string;
  serverlessConfigPath: string;
};

export default class extends FeatureHandlerAbstract {
  constructor(argv: yargs.ArgumentsCamelCase<{ region: AWS_REGION }>) {
    super(argv);
  }

  private defaultResourcePath(resourceName: string): string {
    return `serverless/${this.argv.region}/resources/sqs/${resourceName}.yml`;
  }

  private get defaultServerlessConfigPath(): string {
    return `serverless/${this.argv.region}/serverless.yml`;
  }

  private readonly defaultMaxMessageSizeBytes = 262144;
  private readonly defaultMaxReceiveCount = 3;

  private generateSqsCf(queueName: string, input: generateSqsCfInput) {
    return generateCloudFormation(queueName, (c) => {
      const isFifo = input.queueType === 'Fifo';
      if (input.useDeadLetterQueue) {
        const dlqParams = {
          queueName: `${queueName}DeadLetter`,
        };
        if (isFifo) {
          _.assign(dlqParams, {
            queueName: `${queueName}DeadLetter.fifo`,
            fifo: true,
          });
        }
        const dlq = new sqs.Queue(c, `${queueName}DeadLetter`, dlqParams);
        const params = {
          queueName: queueName,
          fifo: isFifo,
          maxMessageSizeBytes: this.defaultMaxMessageSizeBytes,
          deadLetterQueue: {
            maxReceiveCount: this.defaultMaxReceiveCount,
            queue: dlq,
          },
        };
        if (isFifo) {
          _.assign(params, {
            queueName: `${queueName}.fifo`,
            contentBasedDeduplication: input.contentBasedDeduplication,
          });
        }
        const queue = new sqs.Queue(c, queueName, params);
        return queue;
      }
      const params = {
        queueName: queueName,
        fifo: isFifo,
        maxMessageSizeBytes: this.defaultMaxMessageSizeBytes,
      };
      if (isFifo) {
        _.assign(params, {
          queueName: `${queueName}.fifo`,
          contentBasedDeduplication: input.contentBasedDeduplication,
        });
      }
      const queue = new sqs.Queue(c, queueName, params);
      return queue;
    });
  }

  public async run(): Promise<void> {
    const logger = Logger.getLogger();
    const locale = getLocaleLang(this.lang);

    const res = await inquirer
      .prompt([
        {
          type: 'input',
          name: 'resourceName',
          message: 'input a sqs resource name',
          filter: (input: string) => input.replace(/\s+/g, ''),
          transformer: (input: string) => input.replace(/\s+/g, ''),
          validate: (value: string) => new Validator(value, this.lang).required().mustNoIncludeZenkaku().value(),
        },
      ])
      .then(async (answers: { resourceName: string }) => {
        const res = (await inquirer.prompt([
          {
            type: 'list',
            name: 'queueType',
            default: 'Standard',
            choices: ['Standard', 'Fifo'],
            message: 'Is it a FIFO queue?',
          },
          {
            type: 'expand',
            name: 'useDeadLetterQueue',
            message: 'Do you use dead letter queue?',
            choices: [
              {
                key: 'y',
                name: 'yes',
                value: true,
              },
              {
                key: 'n',
                name: 'no',
                value: false,
              },
            ],
          },
          {
            type: 'expand',
            name: 'contentBasedDeduplication',
            message: 'Do you use content-based deduplication?',
            choices: [
              {
                key: 'y',
                name: 'yes',
                value: true,
              },
              {
                key: 'n',
                name: 'no',
                value: false,
              },
            ],
          },
          {
            type: 'input',
            name: 'filePath',
            message: 'input a cloudformation file path',
            default: () => this.defaultResourcePath(answers.resourceName),
            validate: (value: string) => new Validator(value, this.lang).required().mustBeYamlFilePath().value(),
            transformer: (input: string) => new Transformer(input).filePath().value(),
            filter: (input: string) => new Filter(input).filePath().value(),
          },
          {
            type: 'input',
            name: 'serverlessConfigPath',
            message: 'input a serverless config file path',
            default: () => this.defaultServerlessConfigPath,
            validate: (value: string) => new Validator(value, this.lang).required().mustBeYamlFilePath().value(),
            transformer: (input: string) => new Transformer(input).removeAllSpace().value(),
            filter: (input: string) => new Filter(input).removeAllSpace().value(),
          },
        ])) as Omit<Prompt, 'resourceName'>;
        return {
          ...res,
          ...answers,
        } as Prompt;
      });

    logger.debug(`input values : ${JSON.stringify(res)}}`);

    const { resourceName, queueType, useDeadLetterQueue, contentBasedDeduplication, filePath, serverlessConfigPath } = res;

    const resources = this.generateSqsCf(resourceName, {
      queueType,
      useDeadLetterQueue,
      contentBasedDeduplication,
    });

    try {
      const doc = loadYaml<AwsResource<StandardQueueType | StandardDeadLetterQueueType | FifoDeadLetterQueueType | FifoQueueType>>(filePath) ?? {};
      logger.debug('readed yaml file');
      logger.debug(doc);

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
          ...resources,
        },
      });
      logger.info(filePath);
      logger.info(`${locale.overrightFile} : ${filePath}`);
      logger.info(chalk().green(yamlText));
    } catch (e) {
      if ((e as Error).name === 'DuplicatedPropertyError') throw e;
      logger.debug('create a new yaml file');
      const yamlText = writeYaml(filePath, {
        Resources: {
          ...resources,
        },
      });
      logger.info(filePath);
      logger.info(`${locale.outputFile} : ${filePath}`);
      logger.info(chalk().green(yamlText));
    }

    writeServerlessConfig({ serverlessConfigPath, resourceFilePath: filePath });
  }
}
