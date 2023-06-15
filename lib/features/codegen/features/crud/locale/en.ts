import { Locale } from 'features/codegen/features/crud/types/index';

const locale: Locale = {
  error: {
    notFoundServerlessConfig: 'Serverless.yml does not exist',
    notInstalledAppSyncPlugin: 'serverless-appsync-plugin is not installed',
    invalidServerlessCustomAppSync: 'The custom.appsync in serverless.yml is incorrect, custom.appsync must have the following string set',
    alreadyExistsMappingTemplate: 'A definition already exists in the mapping template',
    alreadyExistsResolver: 'A definition already exists in the resolver',
    alreadyExistsAPI: 'A definition already exists in the API',
    required: 'Please enter all items',
  },
  inquirer: {
    apiName: 'Enter API name',
    apiType: 'Select API Type',
    apiInfo: 'Enter API information',
    resolverType: 'Select Resolver Type',
    serverlessConfigPath: 'Enter the path to serverless.yml',
    schemaGraphqlFilePath: 'Enter the path to schema.graphql',
    queryOperation: 'Select Query Type',
  },
  services: {
    common: {
      inquirer: {
        createDataSource: 'Do you want to create a new data source?',
        lambdaFunctionName: 'Enter Lambda function name',
        lambdaHandler: 'Enter the path to the Lambda handler',
        dataSource: 'Select Data Source',
        template: 'Select a template',
        primaryKeyName: 'Enter primary key name',
        sortKeyName: 'Enter sort key name',
        indexName: 'Enter index name',
      },
      error: {
        notFoundDataSource: 'Data source does not exist, data source must be created',
      },
    },
    generateQueryService: {
      inquirer: {
        gsiName: 'Enter GSI name',
      },
    },
  },
};

export default locale;
