import Logger from 'utils/logger';
import { AWS_REGION, FeatureHandlerAbstract, ServerlessConfig } from 'types/index';
import yargs from 'yargs';
import _ from 'lodash';
import ServerlessConfigService from 'services/serverlessConfigService';
import inquirer from 'inquirer';
import Validator from 'utils/validator';
import Filter from 'utils/inquirer/filter';
import Transformer from 'utils/inquirer/transformer';
import * as Type from 'features/add/features/api/types/';
import Parser from 'utils/parser';
import generateMutationService from 'features/add/features/api/services/generateMutationService';
import generateQueryService from 'features/add/features/api/services/generateQueryService';
import generateGetItemService from 'features/add/features/api/services/generateGetItemService';
import AppSyncStackService from 'services/appSyncStackService';
import { getLocaleLang } from 'features/add/features/api/utils/getLocale';

export default class extends FeatureHandlerAbstract {
  constructor(argv: yargs.ArgumentsCamelCase<{ region: AWS_REGION }>) {
    super(argv);
  }

  private get defaultSchemaGrapqlFilePath(): string {
    return `appsync/schema.graphql`;
  }

  private get defaultServerlessConfigPath(): string {
    return `serverless/${this.argv.region}/serverless.yml`;
  }

  public async run(): Promise<void> {
    const logger = Logger.getLogger();
    const locale = getLocaleLang(this.lang);

    const info = (await inquirer.prompt([
      {
        type: 'input',
        name: 'apiName',
        message: locale.inquirer.apiName,
        filter: (input: string) => input.replace(/\s+/g, ''),
        transformer: (input: string) => input.replace(/\s+/g, ''),
        validate: (value: string) => new Validator(value, this.lang).required().mustNoIncludeZenkaku().value(),
      },
      {
        type: 'list',
        name: 'apiType',
        choices: ['Mutation', 'Query'],
        message: locale.inquirer.apiType,
        validate: (value: string) => new Validator(value, this.lang).required().value(),
      },
      {
        type: 'list',
        name: 'resolverType',
        choices: ['UNIT', 'PIPELINE'],
        message: locale.inquirer.resolverType,
        validate: (value: string) => new Validator(value, this.lang).required().value(),
      },
      {
        type: 'input',
        name: 'serverlessConfigPath',
        message: locale.inquirer.serverlessConfigPath,
        default: () => this.defaultServerlessConfigPath,
        validate: (value: string) => new Validator(value, this.lang).required().mustBeYamlFilePath().value(),
        transformer: (input: string) => new Transformer(input).removeAllSpace().value(),
        filter: (input: string) => new Filter(input).removeAllSpace().value(),
      },
    ])) as Type.PromptApiInfo;

    logger.debug(`input info values : ${JSON.stringify(info)}}`);

    const sls = new ServerlessConfigService({ region: this.argv.region as AWS_REGION, serverlessConfigPath: info.serverlessConfigPath, lang: this.lang });

    if (!sls.isExistsServelessConfig) {
      throw new Error(locale.error.notFoundServerlessConfig);
    }

    const slsConfig = sls.serverlessConfig as ServerlessConfig;

    if (!(slsConfig.plugins ?? []).includes('serverless-appsync-plugin')) {
      throw new Error(locale.error.notInstalledAppSyncPlugin);
    }

    const appSyncStackPath: string = Parser.parseSlsRecursivelyReference(slsConfig.custom?.appSync as string) as string;

    if (_.isEmpty(appSyncStackPath)) {
      throw new Error(`${locale.error.invalidServerlessCustomAppSync} : \${file(./appsync/stack.yml)}`);
    }

    const appSyncStackService = new AppSyncStackService({ stackFilePath: appSyncStackPath, lang: this.lang, region: this.argv.region as AWS_REGION });
    const appSyncStack = appSyncStackService.appSyncStack;

    if (appSyncStack?.mappingTemplates.some((m) => m.type === info.apiType && m.field === info.apiName)) {
      throw new Error(locale.error.alreadyExistsMappingTemplate);
    }

    if (info.resolverType === 'PIPELINE' && appSyncStack?.functionConfigurations.some((m) => m.name === `Mutation${info.apiName}`)) {
      throw new Error(locale.error.alreadyExistsResolver);
    }

    if (info.apiType === 'Mutation') {
      if (appSyncStack?.schema.isExistsMutationApi(info.apiName)) throw new Error(locale.error.alreadyExistsAPI);
      return generateMutationService({ appSyncStackService: appSyncStackService, lang: this.lang, slsConfig: sls, info });
    }

    if (info.apiType === 'Query') {
      if (appSyncStack?.schema.isExistsQueryApi(info.apiName)) throw new Error(locale.error.alreadyExistsAPI);
      const { queryOperation } = (await inquirer.prompt([
        {
          type: 'list',
          name: 'queryOperation',
          choices: ['Query', 'GetItem'],
          message: locale.inquirer.queryOperation,
          validate: (value: string) => new Validator(value, this.lang).required().value(),
        },
      ])) as { queryOperation: 'Query' | 'GetItem' };
      if (queryOperation === 'Query') return generateQueryService({ appSyncStackService: appSyncStackService, lang: this.lang, slsConfig: sls, info });
      if (queryOperation === 'GetItem') return generateGetItemService({ appSyncStackService: appSyncStackService, lang: this.lang, slsConfig: sls, info });
    }
  }
}
