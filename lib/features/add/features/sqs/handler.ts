import Logger from 'utils/logger';
import { AWS_REGION, AwsResource, FeatureHandlerAbstract } from 'types/index';
import yargs from 'yargs';
import _ from 'lodash';
import { loadYaml, writeServerlessConfig, writeYaml } from 'utils/yaml';
import { getLocaleLang } from 'features/add/features/sqs/utils/getLocale';
import { DuplicatedPropertyError } from 'exceptions/index';
import inquirer from 'inquirer';
import validator from 'utils/validator';
import transformer from 'utils/transformer';
import filter from 'utils/filter';
import { StandardQueueType, StandardDeadLetterQueueType, FifoDeadLetterQueueType, FifoQueueType } from 'features/add/features/sqs/types';
import { chalk } from 'yargonaut';

export default class extends FeatureHandlerAbstract {
  constructor(argv: yargs.ArgumentsCamelCase<{ region: AWS_REGION }>) {
    super(argv);
  }

  private get defaultResourcePath(): string {
    return `serverless/${this.argv.region}/resources/sqs.yml`;
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
          message: 'input a sqs resource name',
          filter: (input: string) => input.replace(/\s+/g, ''),
          transformer: (input: string) => input.replace(/\s+/g, ''),
          validate: (value: string) => {
            if (_.isEmpty(value)) return locale.error.reqiredResourceName;
            return validator.resourceName(value, this.lang);
          },
        },
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
          default: () => this.defaultResourcePath,
          validate: (value: string) => validator.filePath(value, this.lang),
          transformer: (input: string) => transformer.filePath(input),
          filter: (input: string) => filter.filePath(input),
        },
        {
          type: 'input',
          name: 'serverlessConfigPath',
          message: 'input a serverless config file path',
          default: () => this.defaultServerlessConfigPath,
          validate: (value: string) => validator.serverlessConfigPath(value, this.lang),
          transformer: (input: string) => transformer.serverlessConfigPath(input),
          filter: (input: string) => filter.serverlessConfigPath(input),
        },
      ])
      .then((answers) => {
        return answers as Record<string, unknown>;
      })) as {
      resourceName: string;
      queueType: 'Standard' | 'Fifo';
      useDeadLetterQueue: boolean;
      contentBasedDeduplication: boolean;
      filePath: string;
      serverlessConfigPath: string;
    };

    logger.debug(`input values : ${JSON.stringify(res)}}`);

    const { resourceName, queueType, useDeadLetterQueue, contentBasedDeduplication, filePath, serverlessConfigPath } = res;

    const resources: AwsResource<StandardQueueType | StandardDeadLetterQueueType | FifoDeadLetterQueueType | FifoQueueType> = {
      Resources: {},
    };

    if (queueType === 'Standard') {
      const queue: StandardQueueType = {
        Type: 'AWS::SQS::Queue',
        Properties: {
          ContentBasedDeduplication: contentBasedDeduplication,
          DelaySeconds: 0,
          MaximumMessageSize: 262144,
          MessageRetentionPeriod: 240,
          QueueName: resourceName,
          VisibilityTimeout: 40,
        },
      };
      if (useDeadLetterQueue) {
        const deadLetterQueueName = `${resourceName}DeadLetter`;
        const deadLetterQueue: StandardDeadLetterQueueType = {
          Type: 'AWS::SQS::Queue',
          Properties: {
            DelaySeconds: 0,
            MaximumMessageSize: 262144,
            MessageRetentionPeriod: 240,
            QueueName: deadLetterQueueName,
            VisibilityTimeout: 40,
          },
        };
        queue.Properties.RedrivePolicy = {
          deadLetterTargetArn: { 'Fn::GetAtt': [deadLetterQueueName, 'Arn'] },
          maxReceiveCount: 5,
        };
        resources.Resources = { ...resources.Resources, [deadLetterQueueName]: deadLetterQueue };
      }
      resources.Resources = { ...resources.Resources, [resourceName]: queue };
    } else if (queueType === 'Fifo') {
      const queue: FifoQueueType = {
        Type: 'AWS::SQS::Queue',
        Properties: {
          ContentBasedDeduplication: contentBasedDeduplication,
          DelaySeconds: 0,
          FifoQueue: true,
          MaximumMessageSize: 262144,
          MessageRetentionPeriod: 240,
          QueueName: resourceName,
          VisibilityTimeout: 40,
        },
      };
      if (useDeadLetterQueue) {
        const deadLetterQueueName = `${resourceName}DeadLetter`;
        const deadLetterQueue: FifoDeadLetterQueueType = {
          Type: 'AWS::SQS::Queue',
          Properties: {
            DelaySeconds: 0,
            FifoQueue: true,
            MaximumMessageSize: 262144,
            MessageRetentionPeriod: 345600,
            QueueName: deadLetterQueueName,
            VisibilityTimeout: 60,
          },
        };
        queue.Properties.RedrivePolicy = {
          deadLetterTargetArn: { 'Fn::GetAtt': [deadLetterQueueName, 'Arn'] },
          maxReceiveCount: 5,
        };
        resources.Resources = { ...resources.Resources, [deadLetterQueueName]: deadLetterQueue };
      }
      resources.Resources = { ...resources.Resources, [resourceName]: queue };
    }

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
          ...resources.Resources,
        },
      });
      logger.info(filePath);
      logger.info(`${locale.overrightFile} : ${filePath}`);
      logger.info(chalk().green(yamlText));
    } catch (e) {
      if ((e as Error).name === 'DuplicatedPropertyError') throw e;
      logger.debug('create a new yaml file');
      const yamlText = writeYaml(filePath, resources);
      logger.info(filePath);
      logger.info(`${locale.outputFile} : ${filePath}`);
      logger.info(chalk().green(yamlText));
    }

    writeServerlessConfig({ serverlessConfigPath, resourceFilePath: filePath });
  }
}
