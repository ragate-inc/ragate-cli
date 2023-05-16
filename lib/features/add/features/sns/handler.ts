import Logger from 'utils/logger';
import { AWS_REGION, FeatureHandlerAbstract } from 'types/index';
import yargs from 'yargs';
import _ from 'lodash';
import { getLocaleLang } from 'features/add/features/sns/utils/getLocale';
import inquirer from 'inquirer';
import Validator from 'utils/validator';
import Filter from 'utils/inquirer/filter';
import Transformer from 'utils/inquirer/transformer';
import CfService from 'services/cloudformationService';
import * as sns from '@aws-cdk/aws-sns';
import * as sqs from '@aws-cdk/aws-sqs';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from 'aws-cdk-lib';
import ServerlessConfigService from 'services/serverlessConfigService';

type Prompt = {
  resourceName: string;
  filePath: string;
  subscriptions: string[];
  serverlessConfigPath: string;
};

export default class extends FeatureHandlerAbstract {
  constructor(argv: yargs.ArgumentsCamelCase<{ region: AWS_REGION }>) {
    super(argv);
  }

  private defaultResourcePath(resourceName: string): string {
    return `serverless/${this.argv.region}/resources/sns/${resourceName}.yml`;
  }

  private get defaultServerlessConfigPath(): string {
    return `serverless/${this.argv.region}/serverless.yml`;
  }

  private generateSnsCf(topicName: string, subscriptions: string[]) {
    return CfService.generateCloudFormation(topicName, (c) => {
      const topic = new sns.Topic(c, topicName, {
        topicName: topicName,
      });
      subscriptions.forEach((s) => {
        if (s === 'email') topic.addSubscription(new subs.EmailSubscription('****@****.com'));
        else if (s === 'lambda')
          topic.addSubscription(
            new subs.LambdaSubscription(
              lambda.Function.fromFunctionArn(c, `${topicName}Lambda`, `arn:aws:lambda:${this.argv.region}:${cdk.Fn.ref('AWS::AccountId')}:function:*****`)
            )
          );
        else if (s === 'sms') topic.addSubscription(new subs.SmsSubscription(`0000000000`));
        else if (s === 'url') topic.addSubscription(new subs.UrlSubscription('https://*****.com'));
        else if (s === 'sqs') topic.addSubscription(new subs.SqsSubscription(new sqs.Queue(c, `${topicName}SubscribeQueue`)));
      });
      return topic;
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
          message: 'input a sns resource name',
          filter: (input: string) => input.replace(/\s+/g, ''),
          transformer: (input: string) => input.replace(/\s+/g, ''),
          validate: (value: string) => new Validator(value, this.lang).required().mustNoIncludeZenkaku().value(),
        },
      ])
      .then(async (answers: { resourceName: string }) => {
        const res = (await inquirer.prompt([
          {
            type: 'checkbox',
            name: 'subscriptions',
            message: 'select a sns subscriptions',
            choices: ['email', 'lambda', 'sms', 'url', 'sqs'],
            validate: (value: string[]) => {
              if (_.isEmpty(value)) return locale.error.reqiredSubscriptions;
              return true;
            },
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

    const { resourceName, filePath, subscriptions, serverlessConfigPath } = res;

    const sls = new ServerlessConfigService({ region: this.argv.region as AWS_REGION, serverlessConfigPath, lang: this.lang });

    const resource = this.generateSnsCf(resourceName, subscriptions);

    sls.addResource({ filePath, resourceName, cf: resource });
  }
}
