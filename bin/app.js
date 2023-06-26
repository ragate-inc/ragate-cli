#!/usr/bin/env node
(() => {
  'use strict';
  var e = {
      4712: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(9026));
        (async () => {
          const e = new n.default();
          await e.run();
        })();
      },
      2322: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(4147)),
          s = r(a(6517)),
          o = r(a(1017)),
          i = {
            npmVersion: n.default.version,
            repositoyUrl: 'https://github.com/ragate-inc/serverless-starter',
            tmpPath: `${o.default.dirname(process.argv[1])}/../tmp`,
            currentPath: o.default.resolve(),
            templates: s.default
              .chain([{ category: 'Node.js', name: 'Node.js - aws-node-appsync', value: 'aws-node-appsync' }])
              .sortBy('category')
              .map((e) => ({ name: `${e.category} - ${e.name}`, value: e.value }))
              .value(),
          };
        t.default = i;
      },
      9026: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(6444)),
          s = r(a(9267)),
          o = a(6870),
          i = r(a(2322)),
          l = a(8014),
          u = r(a(8798)),
          c = r(a(8072)),
          d = r(a(9189)),
          p = a(6702),
          m = r(a(6517)),
          f = a(2762);
        t.default = class {
          constructor() {
            try {
              (0, o.init)(), (this.chalk = o.chalk);
              const e = (0, s.default)(process.argv.slice(2))
                .options({
                  lang: { default: this.langRef.default, type: this.langRef.type },
                  verbose: { type: this.verboseRef.type },
                  region: { default: this.regionRef.default, type: this.regionRef.type },
                })
                .check((e) => ((e.verbose = m.default.hasIn(e, 'verbose')), !0))
                .help(!1)
                .version(!1)
                .parseSync();
              (this.lang = e.lang),
                (this.verbose = e.verbose),
                (this.region = e.region),
                (this.locale = (0, l.getLocaleLang)(e.lang)),
                (this.logger = n.default.getLogger(this.verbose ? 'debug' : 'info')),
                (this.npmVersion = i.default.npmVersion);
            } finally {
              (0, f.cleanUpTmpDirectory)();
            }
          }
          chalk;
          logger;
          locale;
          lang;
          langRef = { default: process.env.LANG ?? 'en', type: 'string' };
          verbose;
          verboseRef = { type: 'flag' };
          npmVersion;
          get version() {
            return `ragate-cli v${this.npmVersion}`;
          }
          region;
          regionRef = { default: 'ap-northeast-1', type: 'string' };
          handleError(e) {
            const t = n.default.getLogger();
            e.name && t.debug(e.name), e.stack && t.debug(e.stack), console.error('\n', o.chalk.red(e.message)), process.exit(1);
          }
          cli() {
            const { version: e, chalk: t, locale: a, lang: r } = this;
            return (0, s.default)(process.argv.slice(2))
              .scriptName('')
              .options({
                verbose: { describe: t.grey(a.options.describe.verbose), type: this.verboseRef.type },
                lang: { describe: t.grey(a.options.describe.lang), default: this.langRef.default, type: this.langRef.type },
                region: { alias: 'r', describe: t.grey(a.options.describe.region), default: this.regionRef.default, type: this.regionRef.type, choices: p.awsRegions },
              })
              .usage(e)
              .help('help', t.grey(a.help))
              .alias('h', 'help')
              .version('version', t.grey(a.version), e)
              .alias('v', 'version')
              .check((e) => {
                if (0 === e._.length) throw new Error(this.locale.unProcessed.required);
                return !0;
              })
              .command(
                'create',
                t.grey(a.command.description.create),
                (e) => {
                  const t = { lang: this.lang, region: this.region };
                  return new u.default.builder(t).build(e);
                },
                (e) => new u.default.handler(e).run()
              )
              .command('add', t.grey(a.command.description.add), (e) => {
                const t = { lang: this.lang, region: this.region };
                return new c.default.builder(t).build(e);
              })
              .command('codegen', t.grey(a.command.description.codegen), (e) => {
                const t = { lang: this.lang, region: this.region };
                return new d.default.builder(t).build(e);
              })
              .command(
                '*',
                '',
                () => ({}),
                () => {
                  throw new Error(this.locale.unProcessed.notFound);
                }
              )
              .wrap(Math.max((0, s.default)().terminalWidth() - 5, 60))
              .locale(r)
              .fail((e, t) => this.handleError(t));
          }
          async run() {
            try {
              await this.cli().parseAsync();
            } catch (e) {
              this.handleError(e);
            }
          }
        };
      },
      1843: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            help: 'Show help',
            version: 'Show version',
            yourInput: 'your input',
            command: { description: { create: 'Create a new project', add: 'Add aws resouces', codegen: 'Auto generate graphql api source code' } },
            options: { describe: { verbose: 'Show verbose logs', region: 'Aws region', lang: 'Display language' } },
            unProcessed: {
              required: 'please input a command. Run "ragate help" for a list of all available commands.',
              notFound: 'The command entered does not exist. Run "ragate help" for a list of all available commands.',
            },
          });
      },
      6471: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            help: 'ヘルプを表示',
            version: 'バージョンを表示',
            yourInput: '入力されたコマンド',
            command: { description: { create: 'プロジェクトを作成', add: 'AWSリソースの追加', codegen: 'GraphqlAPI ソースコード自動生成' } },
            options: { describe: { verbose: '詳細なログを出力', region: 'AWSリージョン', lang: '表示言語' } },
            unProcessed: {
              required: '指定のコマンドは存在しません。「ragate help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',
              notFound: '入力されたコマンドは存在しません。「ragate help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',
            },
          });
      },
      8014: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const n = r(a(6471)),
          s = r(a(1843));
        t.getLocaleLang = (e) => ('ja' === e ? n.default : s.default);
      },
      5033: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.CLIError = t.EnvironmentError = t.BaseClass = void 0);
        class a extends Error {
          constructor(e) {
            super(e), (this.name = new.target.name), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), Object.setPrototypeOf(this, new.target.prototype);
          }
        }
        (t.BaseClass = a),
          (t.EnvironmentError = class extends a {
            constructor(e) {
              super(e), (this.name = 'EnvironmentError');
            }
          }),
          (t.CLIError = class extends a {
            constructor(e) {
              super(e), (this.name = 'CLIError');
            }
          });
      },
      6040: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = a(6702),
          s = r(a(6444)),
          o = r(a(9211)),
          i = r(a(592)),
          l = r(a(8785)),
          u = r(a(8806)),
          c = a(6870),
          d = a(7264);
        class p extends n.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            const t = this.args.lang,
              a = (0, d.getLocaleLang)(t),
              r = s.default.getLogger();
            return e
              .version(!1)
              .usage('Usage: add <command> <options>')
              .command(
                'sns',
                c.chalk.grey(a.command.description.sns),
                (e) => new o.default.builder(this.args).build(e),
                (e) => new o.default.handler(e).run()
              )
              .command(
                'sqs',
                c.chalk.grey(a.command.description.sns),
                (e) => new i.default.builder(this.args).build(e),
                (e) => new i.default.handler(e).run()
              )
              .command(
                'basicauthlambda',
                c.chalk.grey(a.command.description.basicAuthLambda),
                (e) => new l.default.builder(this.args).build(e),
                (e) => new l.default.handler(e).run()
              )
              .command(
                'api',
                c.chalk.grey(a.command.description.api),
                (e) => new u.default.builder(this.args).build(e),
                (e) => new u.default.handler(e).run()
              )
              .command(
                '*',
                c.chalk.grey('<command> <options>'),
                () => ({}),
                () => {
                  r.error(c.chalk.red(a.unProcessed));
                }
              );
          }
        }
        t.default = p;
      },
      7352: (e, t, a) => {
        Object.defineProperty(t, '__esModule', { value: !0 });
        const r = a(6702);
        class n extends r.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            return e.version(!1).usage('Usage: $0 api');
          }
        }
        t.default = n;
      },
      1723: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(6444)),
          s = a(6702),
          o = r(a(6517)),
          i = r(a(1325)),
          l = r(a(3290)),
          u = r(a(7973)),
          c = r(a(5837)),
          d = r(a(1092)),
          p = r(a(3448)),
          m = r(a(6849)),
          f = r(a(8391)),
          y = r(a(245)),
          g = r(a(7116)),
          h = a(8854);
        class v extends s.FeatureHandlerAbstract {
          constructor(e) {
            super(e);
          }
          get defaultSchemaGrapqlFilePath() {
            return 'appsync/schema.graphql';
          }
          get defaultServerlessConfigPath() {
            return `serverless/${this.argv.region}/serverless.yml`;
          }
          async run() {
            const e = n.default.getLogger(),
              t = (0, h.getLocaleLang)(this.lang),
              a = await l.default.prompt([
                {
                  type: 'input',
                  name: 'apiName',
                  message: t.inquirer.apiName,
                  filter: (e) => e.replace(/\s+/g, ''),
                  transformer: (e) => e.replace(/\s+/g, ''),
                  validate: (e) => new u.default(e, this.lang).required().mustNoIncludeZenkaku().value(),
                },
                { type: 'list', name: 'apiType', choices: ['Mutation', 'Query'], message: t.inquirer.apiType, validate: (e) => new u.default(e, this.lang).required().value() },
                {
                  type: 'list',
                  name: 'resolverType',
                  choices: ['UNIT', 'PIPELINE'],
                  message: t.inquirer.resolverType,
                  validate: (e) => new u.default(e, this.lang).required().value(),
                },
                {
                  type: 'input',
                  name: 'serverlessConfigPath',
                  message: t.inquirer.serverlessConfigPath,
                  default: () => this.defaultServerlessConfigPath,
                  validate: (e) => new u.default(e, this.lang).required().mustBeYamlFilePath().value(),
                  transformer: (e) => new d.default(e).removeAllSpace().value(),
                  filter: (e) => new c.default(e).removeAllSpace().value(),
                },
              ]);
            e.debug(`input info values : ${JSON.stringify(a)}}`);
            const r = new i.default({ region: this.argv.region, serverlessConfigPath: a.serverlessConfigPath, lang: this.lang });
            if (!r.isExistsServelessConfig) throw new Error(t.error.notFoundServerlessConfig);
            const s = r.serverlessConfig;
            if (!(s.plugins ?? []).includes('serverless-appsync-plugin')) throw new Error(t.error.notInstalledAppSyncPlugin);
            const v = p.default.parseSlsRecursivelyReference(s.custom?.appSync);
            if (o.default.isEmpty(v)) throw new Error(`${t.error.invalidServerlessCustomAppSync} : \${file(./appsync/stack.yml)}`);
            const $ = new g.default({ stackFilePath: v, lang: this.lang, region: this.argv.region }),
              S = $.appSyncStack;
            if (S?.mappingTemplates.some((e) => e.type === a.apiType && e.field === a.apiName)) throw new Error(t.error.alreadyExistsMappingTemplate);
            if ('PIPELINE' === a.resolverType && S?.functionConfigurations.some((e) => e.name === `Mutation${a.apiName}`)) throw new Error(t.error.alreadyExistsResolver);
            if ('Mutation' === a.apiType) {
              if (S?.schema.isExistsMutationApi(a.apiName)) throw new Error(t.error.alreadyExistsAPI);
              return (0, m.default)({ appSyncStackService: $, lang: this.lang, slsConfig: r, info: a });
            }
            if ('Query' === a.apiType) {
              if (S?.schema.isExistsQueryApi(a.apiName)) throw new Error(t.error.alreadyExistsAPI);
              const { queryOperation: e } = await l.default.prompt([
                {
                  type: 'list',
                  name: 'queryOperation',
                  choices: ['Query', 'GetItem'],
                  message: t.inquirer.queryOperation,
                  validate: (e) => new u.default(e, this.lang).required().value(),
                },
              ]);
              if ('Query' === e) return (0, f.default)({ appSyncStackService: $, lang: this.lang, slsConfig: r, info: a });
              if ('GetItem' === e) return (0, y.default)({ appSyncStackService: $, lang: this.lang, slsConfig: r, info: a });
            }
          }
        }
        t.default = v;
      },
      8806: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(7352)),
          s = r(a(1723));
        t.default = { builder: n.default, handler: s.default };
      },
      4538: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            error: {
              notFoundServerlessConfig: 'Serverless.yml does not exist',
              notInstalledAppSyncPlugin: 'serverless-appsync-plugin is not installed',
              invalidServerlessCustomAppSync: 'The custom.appsync in serverless.yml is incorrect, custom.appsync must have the following string set',
              alreadyExistsMappingTemplate: 'A definition already exists in the mapping template',
              alreadyExistsResolver: 'A definition already exists in the resolver',
              alreadyExistsAPI: 'A definition already exists in the API',
            },
            inquirer: {
              apiName: 'Enter API name',
              apiType: 'Select API Type',
              resolverType: 'Select Resolver Type',
              serverlessConfigPath: 'Enter the path to serverless.yml',
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
                error: { notFoundDataSource: 'Data source does not exist, data source must be created' },
              },
              generateQueryService: { inquirer: { gsiName: 'Enter GSI name' } },
            },
          });
      },
      3957: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            error: {
              notFoundServerlessConfig: 'serverless.ymlが存在しません',
              notInstalledAppSyncPlugin: 'serverless-appsync-pluginがインストールされていません',
              invalidServerlessCustomAppSync: 'serverless.ymlのcustom.appsyncが不正です、custom.appsyncには、以下のような文字列が設定されている必要があります',
              alreadyExistsMappingTemplate: '既にマッピングテンプレートに定義が存在します',
              alreadyExistsResolver: '既にリゾルバーに定義が存在します',
              alreadyExistsAPI: '既にAPIに定義が存在します',
            },
            inquirer: {
              apiName: 'API名を入力',
              apiType: 'APIタイプを選択',
              resolverType: 'リゾルバータイプを選択',
              serverlessConfigPath: 'serverless.ymlのパスを入力',
              queryOperation: 'Queryのタイプを選択',
            },
            services: {
              common: {
                inquirer: {
                  createDataSource: 'データソースを新しく作成しますか？',
                  lambdaFunctionName: 'Lambda関数名を入力',
                  lambdaHandler: 'Lambdaハンドラーのパスを入力',
                  dataSource: 'データソースを選択',
                  template: 'テンプレートを選択',
                  primaryKeyName: 'プライマリーキー名を入力',
                  sortKeyName: 'ソートキー名を入力',
                  indexName: 'インデックス名を入力',
                },
                error: { notFoundDataSource: 'データソースが存在しません、データソースを作成する必要があります' },
              },
              generateQueryService: { inquirer: { gsiName: 'GSI名を入力' } },
            },
          });
      },
      245: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(6444)),
          s = r(a(3290)),
          o = r(a(7973)),
          i = r(a(2056)),
          l = r(a(1017)),
          u = r(a(6517)),
          c = a(7343),
          d = a(8854),
          p = a(6134);
        t.default = async (e) => {
          const { appSyncStackService: t, lang: a, slsConfig: r, info: m } = e,
            f = n.default.getLogger(),
            y = (0, d.getLocaleLang)(a);
          f.debug(`appsyncStack : ${JSON.stringify(t.appSyncStack)}`);
          const g = await (0, p.isCreateDataSource)({ lang: a, dataSource: t.appSyncStack?.dataSources ?? [] }),
            h = async (e) => {
              if ('AMAZON_DYNAMODB' === e.type) {
                const {
                  template: e,
                  primaryKeyName: t,
                  sortKeyName: r,
                } = await s.default.prompt([
                  {
                    type: 'list',
                    name: 'template',
                    choices: ['getItem', 'getItemConsistentRead', 'localResolver'],
                    message: y.services.common.inquirer.template,
                    validate: (e) => new o.default(e, a).required().value(),
                  },
                  {
                    type: 'input',
                    name: 'primaryKeyName',
                    message: y.services.common.inquirer.primaryKeyName,
                    default: () => 'Id',
                    filter: (e) => e.replace(/\s+/g, ''),
                    transformer: (e) => e.replace(/\s+/g, ''),
                    validate: (e) => new o.default(e, a).required().mustNoIncludeZenkaku().value(),
                  },
                  {
                    type: 'input',
                    name: 'sortKeyName',
                    message: y.services.common.inquirer.sortKeyName,
                    default: () => 'Sk',
                    filter: (e) => e.replace(/\s+/g, ''),
                    transformer: (e) => e.replace(/\s+/g, ''),
                    validate: (e) => new o.default(e, a).required().mustNoIncludeZenkaku().value(),
                  },
                ]);
                if ('getItem' === e)
                  return {
                    before: i.default.templates.vtl.addDynamoGetItemRequest({ consistentRead: !1, primaryKeyName: t, sortKeyName: r }),
                    after: i.default.templates.vtl.addDynamoGetItemResponse,
                  };
                if ('getItemConsistentRead' === e)
                  return {
                    before: i.default.templates.vtl.addDynamoGetItemRequest({ consistentRead: !0, primaryKeyName: t, sortKeyName: r }),
                    after: i.default.templates.vtl.addDynamoGetItemResponse,
                  };
                if ('localResolver' === e) return { before: i.default.templates.vtl.localResolverRequest, after: i.default.templates.vtl.localResolverResponse };
              } else {
                if ('AMAZON_ELASTICSEARCH' === e.type) {
                  const { indexName: e } = await s.default.prompt([
                    {
                      type: 'input',
                      name: 'indexName',
                      message: y.services.common.inquirer.indexName,
                      default: () => m.apiName,
                      filter: (e) => e.replace(/\s+/g, ''),
                      transformer: (e) => e.replace(/\s+/g, ''),
                      validate: (e) => new o.default(e, a).required().mustNoIncludeZenkaku().value(),
                    },
                  ]);
                  return { before: i.default.templates.vtl.openSearchQueryRequest({ indexName: e }), after: i.default.templates.vtl.openSearchQueryResponse };
                }
                if ('RELATIONAL_DATABASE' === e.type) return { before: i.default.templates.vtl.rdbQueryRequest, after: i.default.templates.vtl.rdbQueryResponse };
                if ('HTTP' === e.type) return { before: i.default.templates.vtl.httpQueryRequest, after: i.default.templates.vtl.httpQueryResponse };
              }
              return { before: '{}', after: '{}' };
            },
            v = await (async () =>
              g
                ? await (0, p.addLambda)({ appSyncStackService: t, lang: a, slsConfig: r, info: m })
                : await (0, p.selectDataSource)({ lang: a, appSyncStackService: t, slsConfig: r }))(),
            $ = await (async (e) => {
              const { dataSource: a } = e;
              if ('UNIT' === m.resolverType) return Promise.resolve(void 0);
              const r = t.appSyncStack?.functionConfigurationsLocation ?? './',
                n = {
                  dataSource: a.name,
                  name: `${m.apiType}${u.default.upperFirst(m.apiName)}`,
                  request: 'AWS_LAMBDA' !== a.type && `functions/${m.apiType}.${m.apiName}.request.vtl`,
                  response: 'AWS_LAMBDA' !== a.type && `functions/${m.apiType}.${m.apiName}.response.vtl`,
                };
              if ('AWS_LAMBDA' !== a.type) {
                const { before: e, after: t } = await h(a);
                u.default.isString(n.request) && new i.default({ filePath: l.default.join(r, n.request), code: e, type: 'vtl' }).write(),
                  u.default.isString(n.response) && new i.default({ filePath: l.default.join(r, n.response), code: t, type: 'vtl' }).write();
              }
              return t.addFunctionConfiguration({ functionConfiguration: n }), f.debug('finished functionConfigurationsProcess'), Promise.resolve(n);
            })({ dataSource: v }),
            S = await (async (e) => {
              const { dataSource: a, functionConfigurations: r } = e,
                n = await (async () => {
                  if ('PIPELINE' === m.resolverType) {
                    const e = t.appSyncStack?.mappingTemplatesLocation ?? './',
                      a = {
                        type: m.apiType,
                        request: `queries/${m.apiType}.${m.apiName}.request.vtl`,
                        response: `queries/${m.apiType}.${m.apiName}.response.vtl`,
                        field: m.apiName,
                        kind: m.resolverType,
                        functions: [r?.name],
                      };
                    return (
                      new i.default({ filePath: l.default.join(e, a.request), code: i.default.templates.vtl.pipelineBefore, type: 'vtl' }).write(),
                      new i.default({ filePath: l.default.join(e, a.response), code: i.default.templates.vtl.pipelineAfter, type: 'vtl' }).write(),
                      a
                    );
                  }
                  const e = {
                    dataSource: a.name,
                    type: m.apiType,
                    field: m.apiName,
                    kind: m.resolverType,
                    request: 'AWS_LAMBDA' !== a.type && `queries/${m.apiType}.${m.apiName}.request.vtl`,
                    response: 'AWS_LAMBDA' !== a.type && `queries/${m.apiType}.${m.apiName}.response.vtl`,
                  };
                  if ('AWS_LAMBDA' !== a.type) {
                    const r = t.appSyncStack?.mappingTemplatesLocation ?? './',
                      { before: n, after: s } = await h(a);
                    u.default.isString(e.request) && new i.default({ filePath: l.default.join(r, e.request), code: n, type: 'vtl' }).write(),
                      u.default.isString(e.response) && new i.default({ filePath: l.default.join(r, e.response), code: s, type: 'vtl' }).write();
                  }
                  return e;
                })();
              return t.addMappingTemplate({ mappingTemplate: n }), f.debug('finished mappingTemplateProcess'), n;
            })({ dataSource: v, functionConfigurations: $ }),
            _ = await (async () => {
              const e = t.graphqlEditor,
                a = t.graphqlEditor.addExampleType(m.apiName);
              return (
                t.updateCustomSchemaGraphl({ query: { apiName: m.apiName, type: a.getType(), args: { example: { type: c.GraphQLString } } } }),
                f.debug('finished scheneGraphqlProcess'),
                Promise.resolve(e.customSchema)
              );
            })();
          f.debug({ dataSource: v, functionConfigurations: $, mappingTemplate: S, schemaGraphql: _ });
        };
      },
      6849: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(6444)),
          s = r(a(2056)),
          o = r(a(1017)),
          i = r(a(6517)),
          l = a(6134);
        t.default = async (e) => {
          const { appSyncStackService: t, lang: a, slsConfig: r, info: u } = e,
            c = n.default.getLogger();
          c.debug(`appsyncStack : ${JSON.stringify(t.appSyncStack)}`);
          const d = await (0, l.isCreateDataSource)({ lang: a, dataSource: t.appSyncStack?.dataSources ?? [] }),
            p = await (async () =>
              d
                ? await (0, l.addLambda)({ appSyncStackService: t, lang: a, slsConfig: r, info: u })
                : await (0, l.selectDataSource)({ lang: a, appSyncStackService: t, slsConfig: r }))(),
            m = await ((e) => {
              const { dataSource: a } = e;
              if ('UNIT' === u.resolverType) return Promise.resolve(void 0);
              const r = { dataSource: a.name, name: `${u.apiType}${i.default.upperFirst(u.apiName)}`, request: !1, response: !1 };
              return t.addFunctionConfiguration({ functionConfiguration: r }), c.debug('finished functionConfigurationsProcess'), Promise.resolve(r);
            })({ dataSource: p }),
            f = await (async (e) => {
              const { dataSource: a, functionConfigurations: r } = e,
                n = (() => {
                  if ('PIPELINE' === u.resolverType) {
                    const e = t.appSyncStack?.mappingTemplatesLocation ?? './',
                      a = {
                        type: u.apiType,
                        request: `mutations/${u.apiType}.${u.apiName}.request.vtl`,
                        response: `mutations/${u.apiType}.${u.apiName}.response.vtl`,
                        field: u.apiName,
                        kind: u.resolverType,
                        functions: [r?.name],
                      };
                    return (
                      new s.default({ filePath: o.default.join(e, a.request), code: s.default.templates.vtl.pipelineBefore, type: 'vtl' }).write(),
                      new s.default({ filePath: o.default.join(e, a.response), code: s.default.templates.vtl.pipelineAfter, type: 'vtl' }).write(),
                      a
                    );
                  }
                  return { dataSource: a.name, type: u.apiType, field: u.apiName, kind: u.resolverType, request: !1, response: !1 };
                })();
              return t.addMappingTemplate({ mappingTemplate: n }), c.debug('finished mappingTemplateProcess'), n;
            })({ dataSource: p, functionConfigurations: m }),
            y = await (async () => {
              const e = t.graphqlEditor,
                a = t.graphqlEditor.addExampleType(u.apiName),
                r = t.graphqlEditor.addExampleInput(u.apiName);
              return (
                t.updateCustomSchemaGraphl({ mutation: { apiName: u.apiName, type: a.getType(), input: r.getType() } }),
                c.debug('finished scheneGraphqlProcess'),
                Promise.resolve(e.customSchema)
              );
            })();
          c.debug({ dataSource: p, functionConfigurations: m, mappingTemplate: f, schemaGraphql: y });
        };
      },
      8391: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(6444)),
          s = r(a(3290)),
          o = r(a(7973)),
          i = r(a(2056)),
          l = r(a(1017)),
          u = r(a(6517)),
          c = a(7343),
          d = a(8854),
          p = a(6134);
        t.default = async (e) => {
          const { appSyncStackService: t, lang: a, slsConfig: r, info: m } = e,
            f = n.default.getLogger();
          f.debug(`appsyncStack : ${JSON.stringify(t.appSyncStack)}`);
          const y = (0, d.getLocaleLang)(a),
            g = await (0, p.isCreateDataSource)({ lang: a, dataSource: t.appSyncStack?.dataSources ?? [] }),
            h = async (e) => {
              if ('AMAZON_DYNAMODB' === e.type) {
                const {
                  template: e,
                  primaryKeyName: t,
                  sortKeyName: r,
                } = await s.default.prompt([
                  {
                    type: 'list',
                    name: 'template',
                    choices: ['query', 'queryWithGsi', 'scan'],
                    message: y.services.common.inquirer.template,
                    validate: (e) => new o.default(e, a).required().value(),
                  },
                  {
                    type: 'input',
                    name: 'primaryKeyName',
                    message: y.services.common.inquirer.primaryKeyName,
                    default: () => 'Id',
                    filter: (e) => e.replace(/\s+/g, ''),
                    transformer: (e) => e.replace(/\s+/g, ''),
                    validate: (e) => new o.default(e, a).required().mustNoIncludeZenkaku().value(),
                  },
                  {
                    type: 'input',
                    name: 'sortKeyName',
                    message: y.services.common.inquirer.sortKeyName,
                    default: () => 'Sk',
                    filter: (e) => e.replace(/\s+/g, ''),
                    transformer: (e) => e.replace(/\s+/g, ''),
                    validate: (e) => new o.default(e, a).required().mustNoIncludeZenkaku().value(),
                  },
                ]);
                if ('query' === e)
                  return { before: i.default.templates.vtl.addDynamoQueryRequest({ primaryKeyName: t, sortKeyName: r }), after: i.default.templates.vtl.addDynamoGetItemResponse };
                if ('queryWithGsi' === e) {
                  const { gsiName: e } = await s.default.prompt([
                    {
                      type: 'input',
                      name: 'gsiName',
                      message: y.services.generateQueryService.inquirer.gsiName,
                      default: () => 'ExampleIndex',
                      filter: (e) => e.replace(/\s+/g, ''),
                      transformer: (e) => e.replace(/\s+/g, ''),
                      validate: (e) => new o.default(e, a).required().mustNoIncludeZenkaku().value(),
                    },
                  ]);
                  return {
                    before: i.default.templates.vtl.addDynamoQueryRequest({ gsiName: e, primaryKeyName: t, sortKeyName: r }),
                    after: i.default.templates.vtl.addDynamoGetItemResponse,
                  };
                }
                if ('scan' === e) return { before: i.default.templates.vtl.dynamoScanRequest, after: i.default.templates.vtl.dynamoScanResponse };
              } else {
                if ('AMAZON_ELASTICSEARCH' === e.type) {
                  const { indexName: e } = await s.default.prompt([
                    {
                      type: 'input',
                      name: 'indexName',
                      message: y.services.common.inquirer.indexName,
                      default: () => m.apiName,
                      filter: (e) => e.replace(/\s+/g, ''),
                      transformer: (e) => e.replace(/\s+/g, ''),
                      validate: (e) => new o.default(e, a).required().mustNoIncludeZenkaku().value(),
                    },
                  ]);
                  return { before: i.default.templates.vtl.openSearchQueryRequest({ indexName: e }), after: i.default.templates.vtl.openSearchQueryResponse };
                }
                if ('RELATIONAL_DATABASE' === e.type) return { before: i.default.templates.vtl.rdbQueryRequest, after: i.default.templates.vtl.rdbQueryResponse };
                if ('HTTP' === e.type) return { before: i.default.templates.vtl.httpQueryRequest, after: i.default.templates.vtl.httpQueryResponse };
              }
              return { before: '{}', after: '{}' };
            },
            v = await (async () =>
              g
                ? await (0, p.addLambda)({ appSyncStackService: t, lang: a, slsConfig: r, info: m })
                : await (0, p.selectDataSource)({ lang: a, appSyncStackService: t, slsConfig: r }))(),
            $ = await (async (e) => {
              const { dataSource: a } = e;
              if ('UNIT' === m.resolverType) return Promise.resolve(void 0);
              const r = t.appSyncStack?.functionConfigurationsLocation ?? './',
                n = {
                  dataSource: a.name,
                  name: `${m.apiType}${u.default.upperFirst(m.apiName)}`,
                  request: 'AWS_LAMBDA' !== a.type && `functions/${m.apiType}.${m.apiName}.request.vtl`,
                  response: 'AWS_LAMBDA' !== a.type && `functions/${m.apiType}.${m.apiName}.response.vtl`,
                };
              if ('AWS_LAMBDA' !== a.type) {
                const { before: e, after: t } = await h(a);
                u.default.isString(n.request) && new i.default({ filePath: l.default.join(r, n.request), code: e, type: 'vtl' }).write(),
                  u.default.isString(n.response) && new i.default({ filePath: l.default.join(r, n.response), code: t, type: 'vtl' }).write();
              }
              return t.addFunctionConfiguration({ functionConfiguration: n }), f.debug('finished functionConfigurationsProcess'), Promise.resolve(n);
            })({ dataSource: v }),
            S = await (async (e) => {
              const { dataSource: a, functionConfigurations: r } = e,
                n = await (async () => {
                  if ('PIPELINE' === m.resolverType) {
                    const e = t.appSyncStack?.mappingTemplatesLocation ?? './',
                      a = {
                        type: m.apiType,
                        request: `queries/${m.apiType}.${m.apiName}.request.vtl`,
                        response: `queries/${m.apiType}.${m.apiName}.response.vtl`,
                        field: m.apiName,
                        kind: m.resolverType,
                        functions: [r?.name],
                      };
                    return (
                      new i.default({ filePath: l.default.join(e, a.request), code: i.default.templates.vtl.pipelineBefore, type: 'vtl' }).write(),
                      new i.default({ filePath: l.default.join(e, a.response), code: i.default.templates.vtl.pipelineAfter, type: 'vtl' }).write(),
                      a
                    );
                  }
                  const e = {
                    dataSource: a.name,
                    type: m.apiType,
                    field: m.apiName,
                    kind: m.resolverType,
                    request: 'AWS_LAMBDA' !== a.type && `queries/${m.apiType}.${m.apiName}.request.vtl`,
                    response: 'AWS_LAMBDA' !== a.type && `queries/${m.apiType}.${m.apiName}.response.vtl`,
                  };
                  if ('AWS_LAMBDA' !== a.type) {
                    const r = t.appSyncStack?.mappingTemplatesLocation ?? './',
                      { before: n, after: s } = await h(a);
                    u.default.isString(e.request) && new i.default({ filePath: l.default.join(r, e.request), code: n, type: 'vtl' }).write(),
                      u.default.isString(e.response) && new i.default({ filePath: l.default.join(r, e.response), code: s, type: 'vtl' }).write();
                  }
                  return e;
                })();
              return t.addMappingTemplate({ mappingTemplate: n }), f.debug('finished mappingTemplateProcess'), n;
            })({ dataSource: v, functionConfigurations: $ }),
            _ = await (async () => {
              const e = t.graphqlEditor,
                a = t.graphqlEditor.addExampleType(m.apiName);
              return (
                t.updateCustomSchemaGraphl({ query: { apiName: m.apiName, type: a.getType(), args: { example: { type: c.GraphQLString } } } }),
                f.debug('finished scheneGraphqlProcess'),
                Promise.resolve(e.customSchema)
              );
            })();
          f.debug({ dataSource: v, functionConfigurations: $, mappingTemplate: S, schemaGraphql: _ });
        };
      },
      8854: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const n = r(a(3957)),
          s = r(a(4538));
        t.getLocaleLang = (e) => ('ja' === e ? n.default : s.default);
      },
      6134: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.selectDataSource = t.addLambda = t.isCreateDataSource = void 0);
        const n = r(a(3290)),
          s = r(a(7973)),
          o = r(a(1092)),
          i = r(a(5837)),
          l = r(a(2056)),
          u = a(6870),
          c = a(8854);
        (t.isCreateDataSource = async (e) => {
          const { lang: a, dataSource: r } = e,
            o = (0, c.getLocaleLang)(a),
            { createDataSource: i } = await n.default.prompt([
              {
                type: 'expand',
                name: 'createDataSource',
                message: o.services.common.inquirer.createDataSource,
                choices: [
                  { key: 'y', name: 'yes', value: !0 },
                  { key: 'n', name: 'no', value: !1 },
                ],
                validate: (e) => new s.default(e, a).required().value(),
              },
            ]);
          return i || (0 === r.length && (console.log(u.chalk.red(o.services.common.error.notFoundDataSource)), (0, t.isCreateDataSource)(e)));
        }),
          (t.addLambda = async (e) => {
            const { lang: t, slsConfig: a, info: r, appSyncStackService: u } = e,
              { apiName: d, apiType: p } = r,
              m = (0, c.getLocaleLang)(t),
              { lambdaFunctionName: f, lambdaHandler: y } = await n.default.prompt([
                {
                  type: 'input',
                  name: 'lambdaFunctionName',
                  message: m.services.common.inquirer.lambdaFunctionName,
                  default: () => d,
                  filter: (e) => e.replace(/\s+/g, ''),
                  transformer: (e) => e.replace(/\s+/g, ''),
                  validate: (e) => new s.default(e, t).required().mustNoIncludeZenkaku().value(),
                },
                {
                  type: 'input',
                  name: 'lambdaHandler',
                  message: m.services.common.inquirer.lambdaHandler,
                  default: () => `src/functions/appsync/${d}.handler`,
                  validate: (e) => new s.default(e, t).required().mustBeExtension().value(),
                  transformer: (e) => new o.default(e).removeAllSpace().value(),
                  filter: (e) => new i.default(e).removeAllSpace().value(),
                },
              ]);
            a.addFunction({ lambdaFunctionName: f, lambdaHandler: y, code: l.default.templates.typescript.skeleton });
            const g = {
              type: 'AWS_LAMBDA',
              name: f,
              description: `It is for ${p}.${d}`,
              config: {
                functionName: { Ref: `${f}LambdaFunction` },
                lambdaFunctionArn: { 'Fn::GetAtt': [`${f}LambdaFunction`, 'Arn'] },
                serviceRoleArn: { 'Fn::GetAtt': [u.appSyncLambdaRoleName, 'Arn'] },
              },
            };
            return u.addIamRoleByDataSource({ dataSource: 'AWS_LAMBDA', sls: a }), u.addDataSource(g), g;
          }),
          (t.selectDataSource = async (e) => {
            const { appSyncStackService: t, lang: a, slsConfig: r } = e,
              o = (0, c.getLocaleLang)(a),
              { dataSource: i } = await n.default.prompt([
                {
                  type: 'list',
                  name: 'dataSource',
                  choices: t.appSyncStack?.dataSources.map((e) => e.name),
                  message: o.services.common.inquirer.dataSource,
                  validate: (e) => new s.default(e, a).required().value(),
                },
              ]),
              l = t.appSyncStack?.dataSources.find((e) => e.name === i);
            return t.addIamRoleByDataSource({ dataSource: l.type, sls: r }), l;
          });
      },
      3582: (e, t, a) => {
        Object.defineProperty(t, '__esModule', { value: !0 });
        const r = a(6702);
        class n extends r.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            return e.version(!1).usage('Usage: $0 basic-auth-lambda');
          }
        }
        t.default = n;
      },
      306: function (e, t, a) {
        var r =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, a, r) {
                  void 0 === r && (r = a);
                  var n = Object.getOwnPropertyDescriptor(t, a);
                  (n && !('get' in n ? !t.__esModule : n.writable || n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return t[a];
                      },
                    }),
                    Object.defineProperty(e, r, n);
                }
              : function (e, t, a, r) {
                  void 0 === r && (r = a), (e[r] = t[a]);
                }),
          n =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, 'default', { enumerable: !0, value: t });
                }
              : function (e, t) {
                  e.default = t;
                }),
          s =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e) for (var a in e) 'default' !== a && Object.prototype.hasOwnProperty.call(e, a) && r(t, e, a);
              return n(t, e), t;
            },
          o =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const i = o(a(6444)),
          l = a(6702),
          u = o(a(3290)),
          c = o(a(7973)),
          d = o(a(1092)),
          p = o(a(5837)),
          m = s(a(7808)),
          f = s(a(2e3)),
          y = o(a(2056)),
          g = o(a(1325)),
          h = o(a(3624)),
          v = o(a(1325));
        class $ extends l.FeatureHandlerAbstract {
          constructor(e) {
            super(e);
          }
          defaultServerlessConfigPath = 'serverless/us-east-1/serverless.yml';
          defaultFunctionYamlPath = 'serverless/us-east-1/resources/functions.yml';
          defaultIamRolePath = 'serverless/us-east-1/resources/iamrole/defaultLambdarole.yml';
          defaultBasicLambdaPath = 'src/functions/lambdaedge/basicAuth.handler';
          defaultLambdaRoleName = 'DefaultLambdaRole';
          lambdaEdgeTimeout = 5;
          lambdaEdgeMemorySize = 128;
          generateLambdaIamRoleCf() {
            return h.default.generateCloudFormation(this.defaultLambdaRoleName, (e) => {
              const t = new m.Role(e, this.defaultLambdaRoleName, { assumedBy: new m.ServicePrincipal('edgelambda.amazonaws.com') });
              return (
                t.addToPolicy(
                  new m.PolicyStatement({
                    effect: m.Effect.ALLOW,
                    resources: [f.Fn.join(':', ['arn:aws:logs', f.Fn.ref('AWS::Region'), f.Fn.ref('AWS::AccountId'), 'log-group:/aws/lambda/*:*:*'])],
                    actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
                  })
                ),
                t.addToPolicy(
                  new m.PolicyStatement({
                    effect: m.Effect.ALLOW,
                    resources: [f.Fn.join(':', ['arn:aws:logs', this.argv.region, f.Fn.ref('AWS::AccountId'), 'log-group:/aws/lambda/*:*:*'])],
                    actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
                  })
                ),
                t
              );
            });
          }
          get defaultServerlessConfig() {
            return g.default.generateServerlessConfig({
              service: 'basic-lambda-auth',
              provider: { region: 'us-east-1', environment: { LOG_LEVEL: 'WARN' }, iam: { role: this.defaultLambdaRoleName } },
              custom: { awsResourcePrefix: '${self:service}-${self:provider.region}-${self:provider.stage}-' },
              functions: `\${file(./${this.defaultFunctionYamlPath})}`,
              resources: [`\${file(./${this.defaultIamRolePath})}`],
            });
          }
          async prompt() {
            return await u.default
              .prompt([
                {
                  type: 'input',
                  name: 'functionName',
                  message: 'input a functions name',
                  default: 'BasicAuth',
                  validate: (e) => new c.default(e, this.lang).required().mustNoIncludeZenkaku().value(),
                  transformer: (e) => new d.default(e).removeAllSpace().value(),
                  filter: (e) => new p.default(e).removeAllSpace().value(),
                },
                {
                  type: 'input',
                  name: 'lamndaRoleCfPath',
                  message: 'input a lambda iam role cloudformation path',
                  default: () => this.defaultIamRolePath,
                  validate: (e) => new c.default(e, this.lang).required().mustBeYamlFilePath().value(),
                  transformer: (e) => new d.default(e).removeAllSpace().value(),
                  filter: (e) => new p.default(e).removeAllSpace().value(),
                },
                {
                  type: 'input',
                  name: 'lambdaHandler',
                  message: 'input a lambda handler path',
                  default: () => this.defaultBasicLambdaPath,
                  validate: (e) => new c.default(e, this.lang).required().mustBeExtension().value(),
                  transformer: (e) => new d.default(e).removeAllSpace().value(),
                  filter: (e) => new p.default(e).removeAllSpace().value(),
                },
                {
                  type: 'input',
                  name: 'lamndaRoleName',
                  message: 'input a lambda iam role name',
                  default: () => this.defaultLambdaRoleName,
                  validate: (e) => new c.default(e, this.lang).required().value(),
                  transformer: (e) => new d.default(e).removeAllSpace().value(),
                  filter: (e) => new p.default(e).removeAllSpace().value(),
                },
                {
                  type: 'input',
                  name: 'serverlessConfigPath',
                  message: 'input a serverless config file path',
                  default: () => this.defaultServerlessConfigPath,
                  validate: (e) => new c.default(e, this.lang).required().mustBeYamlFilePath().value(),
                  transformer: (e) => new d.default(e).removeAllSpace().value(),
                  filter: (e) => new p.default(e).removeAllSpace().value(),
                },
              ])
              .then((e) => e);
          }
          async run() {
            const e = i.default.getLogger(),
              t = await this.prompt();
            e.debug(`input values : ${JSON.stringify(t)}}`);
            const { functionName: a, serverlessConfigPath: r, lamndaRoleCfPath: n, lamndaRoleName: s, lambdaHandler: o } = t,
              l = new v.default({ region: this.argv.region, serverlessConfigPath: r, lang: this.lang });
            if ('us-east-1' !== l.region) throw new Error('lambda edge must be in us-east-1');
            l.addFunction({
              lambdaFunctionName: a,
              lambdaHandler: o,
              memorySize: this.lambdaEdgeMemorySize,
              timeout: this.lambdaEdgeTimeout,
              code: y.default.templates.typescript.basicauthlambda,
            }),
              l.addResource({ filePath: n, resourceName: s, cf: this.generateLambdaIamRoleCf() });
          }
        }
        t.default = $;
      },
      8785: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(3582)),
          s = r(a(306));
        t.default = { builder: n.default, handler: s.default };
      },
      6433: (e, t, a) => {
        Object.defineProperty(t, '__esModule', { value: !0 });
        const r = a(6702);
        class n extends r.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            return e.version(!1).usage('Usage: $0 sns');
          }
        }
        t.default = n;
      },
      2917: function (e, t, a) {
        var r =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, a, r) {
                  void 0 === r && (r = a);
                  var n = Object.getOwnPropertyDescriptor(t, a);
                  (n && !('get' in n ? !t.__esModule : n.writable || n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return t[a];
                      },
                    }),
                    Object.defineProperty(e, r, n);
                }
              : function (e, t, a, r) {
                  void 0 === r && (r = a), (e[r] = t[a]);
                }),
          n =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, 'default', { enumerable: !0, value: t });
                }
              : function (e, t) {
                  e.default = t;
                }),
          s =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e) for (var a in e) 'default' !== a && Object.prototype.hasOwnProperty.call(e, a) && r(t, e, a);
              return n(t, e), t;
            },
          o =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const i = o(a(6444)),
          l = a(6702),
          u = o(a(6517)),
          c = a(3362),
          d = o(a(3290)),
          p = o(a(7973)),
          m = o(a(5837)),
          f = o(a(1092)),
          y = o(a(3624)),
          g = s(a(8890)),
          h = s(a(9087)),
          v = s(a(6324)),
          $ = s(a(5862)),
          S = s(a(2e3)),
          _ = o(a(1325));
        class b extends l.FeatureHandlerAbstract {
          constructor(e) {
            super(e);
          }
          defaultResourcePath(e) {
            return `serverless/${this.argv.region}/resources/sns/${e}.yml`;
          }
          get defaultServerlessConfigPath() {
            return `serverless/${this.argv.region}/serverless.yml`;
          }
          generateSnsCf(e, t) {
            return y.default.generateCloudFormation(e, (a) => {
              const r = new g.Topic(a, e, { topicName: e });
              return (
                t.forEach((t) => {
                  'email' === t
                    ? r.addSubscription(new v.EmailSubscription('****@****.com'))
                    : 'lambda' === t
                    ? r.addSubscription(
                        new v.LambdaSubscription($.Function.fromFunctionArn(a, `${e}Lambda`, `arn:aws:lambda:${this.argv.region}:${S.Fn.ref('AWS::AccountId')}:function:*****`))
                      )
                    : 'sms' === t
                    ? r.addSubscription(new v.SmsSubscription('0000000000'))
                    : 'url' === t
                    ? r.addSubscription(new v.UrlSubscription('https://*****.com'))
                    : 'sqs' === t && r.addSubscription(new v.SqsSubscription(new h.Queue(a, `${e}SubscribeQueue`)));
                }),
                r
              );
            });
          }
          async run() {
            const e = i.default.getLogger(),
              t = (0, c.getLocaleLang)(this.lang),
              a = await d.default
                .prompt([
                  {
                    type: 'input',
                    name: 'resourceName',
                    message: 'input a sns resource name',
                    filter: (e) => e.replace(/\s+/g, ''),
                    transformer: (e) => e.replace(/\s+/g, ''),
                    validate: (e) => new p.default(e, this.lang).required().mustNoIncludeZenkaku().value(),
                  },
                ])
                .then(async (e) => ({
                  ...(await d.default.prompt([
                    {
                      type: 'checkbox',
                      name: 'subscriptions',
                      message: 'select a sns subscriptions',
                      choices: ['email', 'lambda', 'sms', 'url', 'sqs'],
                      validate: (e) => !u.default.isEmpty(e) || t.error.reqiredSubscriptions,
                    },
                    {
                      type: 'input',
                      name: 'filePath',
                      message: 'input a cloudformation file path',
                      default: () => this.defaultResourcePath(e.resourceName),
                      validate: (e) => new p.default(e, this.lang).required().mustBeYamlFilePath().value(),
                      transformer: (e) => new f.default(e).filePath().value(),
                      filter: (e) => new m.default(e).filePath().value(),
                    },
                    {
                      type: 'input',
                      name: 'serverlessConfigPath',
                      message: 'input a serverless config file path',
                      default: () => this.defaultServerlessConfigPath,
                      validate: (e) => new p.default(e, this.lang).required().mustBeYamlFilePath().value(),
                      transformer: (e) => new f.default(e).removeAllSpace().value(),
                      filter: (e) => new m.default(e).removeAllSpace().value(),
                    },
                  ])),
                  ...e,
                }));
            e.debug(`input values : ${JSON.stringify(a)}}`);
            const { resourceName: r, filePath: n, subscriptions: s, serverlessConfigPath: o } = a,
              l = new _.default({ region: this.argv.region, serverlessConfigPath: o, lang: this.lang }),
              y = this.generateSnsCf(r, s);
            l.addResource({ filePath: n, resourceName: r, cf: y });
          }
        }
        t.default = b;
      },
      9211: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(6433)),
          s = r(a(2917));
        t.default = { builder: n.default, handler: s.default };
      },
      6353: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = { error: { reqiredSubscriptions: 'required select a subscriptions' } });
      },
      5423: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = { error: { reqiredSubscriptions: 'サブスクリプションを選択して下さい' } });
      },
      3362: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const n = r(a(5423)),
          s = r(a(6353));
        t.getLocaleLang = (e) => ('ja' === e ? n.default : s.default);
      },
      6621: (e, t, a) => {
        Object.defineProperty(t, '__esModule', { value: !0 });
        const r = a(6702);
        class n extends r.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            return e.version(!1).usage('Usage: $0 sqs');
          }
        }
        t.default = n;
      },
      4267: function (e, t, a) {
        var r =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, a, r) {
                  void 0 === r && (r = a);
                  var n = Object.getOwnPropertyDescriptor(t, a);
                  (n && !('get' in n ? !t.__esModule : n.writable || n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return t[a];
                      },
                    }),
                    Object.defineProperty(e, r, n);
                }
              : function (e, t, a, r) {
                  void 0 === r && (r = a), (e[r] = t[a]);
                }),
          n =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, 'default', { enumerable: !0, value: t });
                }
              : function (e, t) {
                  e.default = t;
                }),
          s =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e) for (var a in e) 'default' !== a && Object.prototype.hasOwnProperty.call(e, a) && r(t, e, a);
              return n(t, e), t;
            },
          o =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const i = o(a(6444)),
          l = a(6702),
          u = o(a(6517)),
          c = o(a(3290)),
          d = o(a(7973)),
          p = o(a(5837)),
          m = o(a(1092)),
          f = s(a(9087)),
          y = o(a(3624)),
          g = o(a(1325));
        class h extends l.FeatureHandlerAbstract {
          constructor(e) {
            super(e);
          }
          defaultResourcePath(e) {
            return `serverless/${this.argv.region}/resources/sqs/${e}.yml`;
          }
          get defaultServerlessConfigPath() {
            return `serverless/${this.argv.region}/serverless.yml`;
          }
          defaultMaxMessageSizeBytes = 262144;
          defaultMaxReceiveCount = 3;
          generateSqsCf(e, t) {
            return y.default.generateCloudFormation(e, (a) => {
              const r = 'Fifo' === t.queueType;
              if (t.useDeadLetterQueue) {
                const n = { queueName: `${e}DeadLetter` };
                r && u.default.assign(n, { queueName: `${e}DeadLetter.fifo`, fifo: !0 });
                const s = new f.Queue(a, `${e}DeadLetter`, n),
                  o = { queueName: e, fifo: r, maxMessageSizeBytes: this.defaultMaxMessageSizeBytes, deadLetterQueue: { maxReceiveCount: this.defaultMaxReceiveCount, queue: s } };
                return r && u.default.assign(o, { queueName: `${e}.fifo`, contentBasedDeduplication: t.contentBasedDeduplication }), new f.Queue(a, e, o);
              }
              const n = { queueName: e, fifo: r, maxMessageSizeBytes: this.defaultMaxMessageSizeBytes };
              return r && u.default.assign(n, { queueName: `${e}.fifo`, contentBasedDeduplication: t.contentBasedDeduplication }), new f.Queue(a, e, n);
            });
          }
          async run() {
            const e = i.default.getLogger(),
              t = await c.default
                .prompt([
                  {
                    type: 'input',
                    name: 'resourceName',
                    message: 'input a sqs resource name',
                    filter: (e) => e.replace(/\s+/g, ''),
                    transformer: (e) => e.replace(/\s+/g, ''),
                    validate: (e) => new d.default(e, this.lang).required().mustNoIncludeZenkaku().value(),
                  },
                ])
                .then(async (e) => ({
                  ...(await c.default.prompt([
                    { type: 'list', name: 'queueType', default: 'Standard', choices: ['Standard', 'Fifo'], message: 'Is it a FIFO queue?' },
                    {
                      type: 'expand',
                      name: 'useDeadLetterQueue',
                      message: 'Do you use dead letter queue?',
                      choices: [
                        { key: 'y', name: 'yes', value: !0 },
                        { key: 'n', name: 'no', value: !1 },
                      ],
                    },
                    {
                      type: 'expand',
                      name: 'contentBasedDeduplication',
                      message: 'Do you use content-based deduplication?',
                      choices: [
                        { key: 'y', name: 'yes', value: !0 },
                        { key: 'n', name: 'no', value: !1 },
                      ],
                    },
                    {
                      type: 'input',
                      name: 'filePath',
                      message: 'input a cloudformation file path',
                      default: () => this.defaultResourcePath(e.resourceName),
                      validate: (e) => new d.default(e, this.lang).required().mustBeYamlFilePath().value(),
                      transformer: (e) => new m.default(e).filePath().value(),
                      filter: (e) => new p.default(e).filePath().value(),
                    },
                    {
                      type: 'input',
                      name: 'serverlessConfigPath',
                      message: 'input a serverless config file path',
                      default: () => this.defaultServerlessConfigPath,
                      validate: (e) => new d.default(e, this.lang).required().mustBeYamlFilePath().value(),
                      transformer: (e) => new m.default(e).removeAllSpace().value(),
                      filter: (e) => new p.default(e).removeAllSpace().value(),
                    },
                  ])),
                  ...e,
                }));
            e.debug(`input values : ${JSON.stringify(t)}}`);
            const { resourceName: a, queueType: r, useDeadLetterQueue: n, contentBasedDeduplication: s, filePath: o, serverlessConfigPath: l } = t,
              u = new g.default({ region: this.argv.region, serverlessConfigPath: l, lang: this.lang }),
              f = this.generateSqsCf(a, { queueType: r, useDeadLetterQueue: n, contentBasedDeduplication: s });
            u.addResource({ filePath: o, resourceName: a, cf: f });
          }
        }
        t.default = h;
      },
      592: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(6621)),
          s = r(a(4267));
        t.default = { builder: n.default, handler: s.default };
      },
      8072: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(6040));
        t.default = { builder: n.default };
      },
      4005: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            command: { description: { sns: 'add AWS SQS', sqs: 'add AWS SQS', basicAuthLambda: 'add AWS Basic lambda auth in us-east-1', api: 'add graphql api' } },
            unProcessed: 'The command entered does not exist. Run "ragate add help" for a list of all available commands.',
          });
      },
      5699: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            command: {
              description: { sns: 'AWS SQS を追加', sqs: 'AWS SQS を追加', basicAuthLambda: 'us-east-1 リージョンに Basic 認証用の Lambda を追加', api: 'Graphql API を追加' },
            },
            unProcessed: '入力されたコマンドは存在しません。「ragate add help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',
          });
      },
      7264: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const n = r(a(5699)),
          s = r(a(4005));
        t.getLocaleLang = (e) => ('ja' === e ? n.default : s.default);
      },
      2504: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = a(6702),
          s = a(6870),
          o = r(a(8798)),
          i = a(2848),
          l = r(a(6444)),
          u = r(a(5237));
        class c extends n.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            const t = this.args.lang,
              a = (0, i.getLocaleLang)(t);
            return (
              l.default.getLogger(),
              e
                .version(!1)
                .usage('Usage: codegen <command> <options>')
                .command(
                  'crud',
                  s.chalk.grey(a.command.description.crud),
                  (e) => new u.default.builder(this.args).build(e),
                  (e) => new u.default.handler(e).run()
                )
                .command(
                  '*',
                  s.chalk.grey('<command> <options>'),
                  () => ({}),
                  (e) => {
                    if (1 === e._.length) return new o.default.handler(e).run();
                    throw new Error('locale.error.unProcessed');
                  }
                )
            );
          }
        }
        t.default = c;
      },
      7379: (e, t, a) => {
        Object.defineProperty(t, '__esModule', { value: !0 });
        const r = a(6702);
        class n extends r.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            return e.version(!1).usage('Usage: $0 crud');
          }
        }
        t.default = n;
      },
      2303: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = a(6702),
          s = r(a(3290)),
          o = a(7704),
          i = r(a(6517)),
          l = r(a(1325)),
          u = r(a(3448)),
          c = a(3462),
          d = r(a(5265)),
          p = r(a(2056)),
          m = r(a(2377)),
          f = r(a(9415)),
          y = r(a(6444));
        class g extends n.FeatureHandlerAbstract {
          constructor(e) {
            super(e), s.default.registerPrompt('table', d.default);
          }
          get defaultServerlessConfigPath() {
            return `serverless/${this.argv.region}/serverless.yml`;
          }
          async run() {
            const e = (0, o.getLocaleLang)(this.lang),
              t = await s.default.prompt([m.default.serverlessConfigPath(this.lang, this.defaultServerlessConfigPath)]).then(({ serverlessConfigPath: e }) => e),
              a = new l.default({ region: this.argv.region, serverlessConfigPath: t, lang: this.lang });
            if (!a.isExistsServelessConfig) throw new Error(e.error.notFoundServerlessConfig);
            const r = a.serverlessConfig;
            if (!(r.plugins ?? []).includes('serverless-appsync-plugin')) throw new Error(e.error.notInstalledAppSyncPlugin);
            const n = u.default.parseSlsRecursivelyReference(r.appSync);
            if (i.default.isEmpty(n)) throw new Error(`${e.error.invalidServerlessCustomAppSync} : \${file(./appsync/stack.yml)}`);
            const d = (0, c.loadYaml)(n);
            if (i.default.isEmpty(d)) throw new Error(`${e.error.invalidServerlessCustomAppSync} : ${n}`);
            const g = (0, f.default)(d.schema),
              h = await s.default.prompt([m.default.resolverInfo(this.lang, g.apiInfo)]).then((e) =>
                i.default.reduce(
                  e.resolverInfo,
                  (e, t, a) => {
                    const [r, n] = i.default.split(t, ',');
                    return e[r].push({ resolver: r, type: n, name: g.apiInfo[a].name, returnValue: g.apiInfo[a].returnValue }), e;
                  },
                  { vtl: [], lambda: [] }
                )
              ),
              v = await s.default
                .prompt([m.default.relationInfo(this.lang, g.relationInfo)])
                .then((e) => i.default.reduce(e.relationInfo, (e, t, a) => (e.push({ type: g.relationInfo[a].type, field: g.relationInfo[a].field, resolver: t }), e), []));
            if (
              (i.default.isArray(d.dataSources) &&
                i.default.each(d.dataSources, (e) => {
                  if (!i.default.includes(e, 'datasources.yml')) return;
                  const t = u.default.parseSlsRecursivelyReference(e),
                    a = (0, c.loadYaml)(t) || {};
                  i.default.each(h.lambda, (e) => {
                    const t = i.default.upperFirst(e.name),
                      r = `${t}LambdaFunction`;
                    a[r]
                      ? y.default.getLogger().warn('already exists *** ')
                      : (a[r] = {
                          type: 'AWS_LAMBDA',
                          description: r,
                          config: {
                            functionName: t,
                            lambdaFunctionArn: { 'Fn::GetAtt': ['UpdatePostLambdaFunction', 'Arn'] },
                            serviceRoleArn: { 'Fn::GetAtt': ['AppSyncLambdaServiceRole', 'Arn'] },
                          },
                        });
                  }),
                    (0, c.writeYaml)(t, a);
                }),
              i.default.isArray(d.pipelineFunctions) &&
                i.default.each(d.pipelineFunctions, (e) => {
                  if (!i.default.includes(e, 'pipelineFunctions.yml')) return;
                  const t = u.default.parseSlsRecursivelyReference(e),
                    a = (0, c.loadYaml)(t) || {};
                  i.default.each(h.vtl, (e) => {
                    const t = i.default.upperFirst(e.name);
                    if (a[t]) return void y.default.getLogger().warn('already exists *** ');
                    const r = a[t]?.dataSource || 'YourDataSourceName',
                      n = `appsync/resolvers/functions/Query.${t}.request`,
                      s = (() => {
                        switch (e.type) {
                          case 'GetItem':
                            return p.default.templates.vtl.codegenDynamoGetItemRequest;
                          case 'LocalResolver':
                            return p.default.templates.vtl.localResolverRequest;
                          case 'Query':
                            return p.default.templates.vtl.codegenDynamoQueryRequest;
                          default:
                            return '';
                        }
                      })();
                    new p.default({ filePath: n, code: s, type: 'vtl' }).write(),
                      (a[t] = { dataSource: r, request: `${n}.vtl`, response: 'appsync/resolvers/common/resolver.response.vtl' });
                  }),
                    i.default.each(h.lambda, (e) => {
                      const t = i.default.upperFirst(e.name);
                      if (a[t]) return void y.default.getLogger().warn('already exists *** ');
                      const r = `${t}LambdaFunction`;
                      console.log(`Add Lambda Function: ${r}`), (a[t] = { dataSource: r });
                    }),
                    (0, c.writeYaml)(t, a);
                }),
              i.default.isArray(d.resolvers) &&
                i.default.each(d.resolvers, (e) => {
                  if (!i.default.includes(e, 'resolvers.yml')) return;
                  const t = u.default.parseSlsRecursivelyReference(e),
                    a = (0, c.loadYaml)(t) || {};
                  i.default.each(h.vtl, (e) => {
                    const t = `Query.${e.name}`;
                    if (a[t]) return void y.default.getLogger().warn('already exists *** ');
                    const r = `appsync/resolvers/queries/${e.name}.request`,
                      n = i.default.upperFirst(e.name);
                    new p.default({ filePath: r, code: p.default.templates.vtl.pipelineBefore, type: 'vtl' }).write(),
                      (a[t] = { request: `${r}.vtl`, response: 'appsync/resolvers/common/pipeline.after.vtl', functions: [n] });
                  }),
                    i.default.each(h.lambda, (e) => {
                      const t = `Mutation.${e.name}`;
                      if (a[t]) return void y.default.getLogger().warn('already exists *** ');
                      const r = i.default.upperFirst(e.name),
                        n = `appsync/resolvers/mutations/${e.name}.request`;
                      new p.default({ filePath: n, code: p.default.templates.vtl.pipelineBefore, type: 'vtl' }).write(),
                        (a[t] = { request: `${n}.vtl`, response: 'appsync/resolvers/common/pipeline.after.vtl', functions: [r] });
                    }),
                    i.default.each(v, (e) => {
                      const t = `${e.type}.${e.field}`;
                      if (a[t]) return void y.default.getLogger().warn('already exists *** ');
                      const r = `appsync/resolvers/relations/${e.type}.${e.field}.request`,
                        n = (() => {
                          switch (e.resolver) {
                            case 'GetItem':
                              return p.default.templates.vtl.codegenDynamoGetItemRequest;
                            case 'LocalResolver':
                              return p.default.templates.vtl.localResolverRequest;
                            case 'Query':
                              return p.default.templates.vtl.codegenDynamoQueryRequest;
                            default:
                              return '';
                          }
                        })();
                      new p.default({ filePath: r, code: n, type: 'vtl' }).write(),
                        (a[t] = { kind: 'UNIT', dataSource: 'YourDataSourceName', request: `${r}.vtl`, response: 'appsync/resolvers/common/resolver.response.vtl' });
                    }),
                    (0, c.writeYaml)(t, a);
                }),
              !i.default.isString(r.functions))
            )
              throw new Error(e.error.notFoundFunctionsConfig);
            const $ = u.default.parseSlsRecursivelyReference(r.functions);
            if (i.default.isEmpty($)) throw new Error(`${e.error.notFoundFunctionsConfig} : \${file(./serverless/ap-northeast-1/resources/functions.yml)}`);
            const S = (0, c.loadYaml)($) || {};
            i.default.each(h.lambda, (e) => {
              const t = i.default.upperFirst(e.name);
              if (S[t]) return void y.default.getLogger().warn('already exists *** ');
              const a = `src/functions/appsync/${e.name}`,
                r = `${a}.handler`,
                n = `\${self:custom.awsResourcePrefix}${t}`,
                s = i.default.includes(['create', 'update', 'delete'], e.type)
                  ? p.default.templates.typescript[e.type](`${t}MutationVariables`, e.returnValue)
                  : p.default.templates.typescript.skeleton;
              new p.default({ filePath: a, code: s, type: 'typescript' }).write(), (S[t] = { handler: r, name: n, memorySize: 1024, timeout: 30 });
            }),
              (0, c.writeYaml)($, S);
          }
        }
        t.default = g;
      },
      5237: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(7379)),
          s = r(a(2303));
        t.default = { builder: n.default, handler: s.default };
      },
      1041: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            error: {
              notFoundServerlessConfig: 'Serverless.yml does not exist',
              notInstalledAppSyncPlugin: 'serverless-appsync-plugin is not installed',
              notFoundFunctionsConfig: 'No functions configuration exists',
              invalidServerlessCustomAppSync: 'The custom.appsync in serverless.yml is incorrect, custom.appsync must have the following string set',
              alreadyExistsMappingTemplate: 'A definition already exists in the mapping template',
              alreadyExistsResolver: 'A definition already exists in the resolver',
              alreadyExistsAPI: 'A definition already exists in the API',
              required: 'Please enter all items',
            },
            inquirer: {
              apiName: 'Enter API name',
              apiType: 'Select API Type',
              resolverInfo: 'Enter Resolver Info',
              relationInfo: 'Enter Relation Info',
              resolverType: 'Select Resolver Type',
              serverlessConfigPath: 'Enter the path to serverless.yml',
              schemaGraphqlFilePath: 'Enter the path to schema.graphql',
              queryOperation: 'Select Query Type',
              dataSource: 'Select Data Source',
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
                error: { notFoundDataSource: 'Data source does not exist, data source must be created' },
              },
              generateQueryService: { inquirer: { gsiName: 'Enter GSI name' } },
            },
          });
      },
      1279: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            error: {
              notFoundServerlessConfig: 'serverless.ymlが存在しません',
              notInstalledAppSyncPlugin: 'serverless-appsync-pluginがインストールされていません',
              notFoundFunctionsConfig: 'functionsの設定が存在しません',
              invalidServerlessCustomAppSync: 'serverless.ymlのcustom.appsyncが不正です、custom.appsyncには、以下のような文字列が設定されている必要があります',
              alreadyExistsMappingTemplate: '既にマッピングテンプレートに定義が存在します',
              alreadyExistsResolver: '既にリゾルバーに定義が存在します',
              alreadyExistsAPI: '既にAPIに定義が存在します',
              required: '全ての項目を入力してください',
            },
            inquirer: {
              apiName: 'API名を入力',
              apiType: 'APIタイプを選択',
              resolverInfo: 'リゾルバー情報を入力',
              relationInfo: 'リレーション情報を入力',
              resolverType: 'リゾルバータイプを選択',
              serverlessConfigPath: 'serverless.ymlのパスを入力',
              schemaGraphqlFilePath: 'schema.graphqlのパスを入力',
              queryOperation: 'Queryのタイプを選択',
              dataSource: 'データソースを選択',
            },
            services: {
              common: {
                inquirer: {
                  createDataSource: 'データソースを新しく作成しますか？',
                  lambdaFunctionName: 'Lambda関数名を入力',
                  lambdaHandler: 'Lambdaハンドラーのパスを入力',
                  dataSource: 'データソースを選択',
                  template: 'テンプレートを選択',
                  primaryKeyName: 'プライマリーキー名を入力',
                  sortKeyName: 'ソートキー名を入力',
                  indexName: 'インデックス名を入力',
                },
                error: { notFoundDataSource: 'データソースが存在しません、データソースを作成する必要があります' },
              },
              generateQueryService: { inquirer: { gsiName: 'GSI名を入力' } },
            },
          });
      },
      9415: function (e, t, a) {
        var r =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, a, r) {
                  void 0 === r && (r = a);
                  var n = Object.getOwnPropertyDescriptor(t, a);
                  (n && !('get' in n ? !t.__esModule : n.writable || n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return t[a];
                      },
                    }),
                    Object.defineProperty(e, r, n);
                }
              : function (e, t, a, r) {
                  void 0 === r && (r = a), (e[r] = t[a]);
                }),
          n =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, 'default', { enumerable: !0, value: t });
                }
              : function (e, t) {
                  e.default = t;
                }),
          s =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e) for (var a in e) 'default' !== a && Object.prototype.hasOwnProperty.call(e, a) && r(t, e, a);
              return n(t, e), t;
            };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.buildSchemaGraphqlInfo = void 0);
        const o = s(a(6517)),
          i = s(a(7147)),
          l = a(7343);
        (t.buildSchemaGraphqlInfo = (e) => {
          const t = (function (e) {
              return o
                .chain(e)
                .thru((e) => (o.isString(e) ? [e] : e))
                .map((e) => i.readFileSync(e).toString())
                .join('\n')
                .value();
            })(e),
            a = { apiInfo: [], relationInfo: [] },
            r = (0, l.parse)(t),
            n = [];
          return (
            (0, l.visit)(r, {
              enter(e) {
                if ('ObjectTypeDefinition' === e.kind)
                  if ('Query' === e.name.value || 'Mutation' === e.name.value)
                    o.each(e.fields, (t) => {
                      a.apiInfo.push({
                        type: e.name.value,
                        name: t.name.value,
                        arguments: o.map(t.arguments, (e) => ({
                          name: e.name.value,
                          type: o.get(e, 'type.type.name.value', o.get(e, 'type.name.value', 'other')),
                          nonnull: e.type.kind === l.Kind.NON_NULL_TYPE,
                        })),
                        returnValue: o.get(t, 'type.type.name.value', o.get(t, 'type.name.value', 'other')),
                      });
                    });
                  else {
                    const t = {
                      name: e.name.value,
                      attributes: o.map(e.fields, (e) => {
                        const t = e.type.kind === l.Kind.NON_NULL_TYPE,
                          a = e.type.kind === l.Kind.LIST_TYPE,
                          r = t ? o.get(e, 'type.type.name.value', 'other') : o.get(e, 'type.name.value', 'other');
                        return { name: e.name.value, type: r, nonnull: t, list: a };
                      }),
                    };
                    n.push(t);
                  }
              },
            }),
            o.each(n, (e) => {
              o.each(e.attributes, (t) => {
                const r = o.find(n, (e) => e.name === t.type);
                r && a.relationInfo.push({ type: e.name, field: t.name, resolver: o.includes(r.name, 'Connection') ? 'list' : 'get' });
              });
            }),
            a
          );
        }),
          (t.default = t.buildSchemaGraphqlInfo);
      },
      7704: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const n = r(a(1279)),
          s = r(a(1041));
        t.getLocaleLang = (e) => ('ja' === e ? n.default : s.default);
      },
      2377: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(941)),
          s = r(a(1148)),
          o = r(a(6821));
        t.default = { serverlessConfigPath: n.default, resolverInfo: s.default, relationInfo: o.default };
      },
      6821: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = a(7704),
          s = r(a(7973)),
          o = a(6517);
        t.default = (e, t) => ({
          type: 'table',
          name: 'relationInfo',
          message: (0, n.getLocaleLang)(e).inquirer.resolverInfo,
          columns: [
            { name: 'VTL(Local)', value: 'LocalResolver' },
            { name: 'VTL(Get)', value: 'GetItem' },
            { name: 'VTL(Query)', value: 'Query' },
          ],
          rows: (0, o.map)(t, (e) => ({
            name: `${e.type}.${e.field}`,
            value: (0, o.chain)(e)
              .thru((e) => {
                const t = [
                  { name: 'local', value: 'LocalResolver' },
                  { name: 'get', value: 'GetItem' },
                  { name: 'list', value: 'Query' },
                ].find((t) => e.resolver === t.name);
                return t?.value;
              })
              .value(),
          })),
          validate: (t) => new s.default(t, e).required().value(),
        });
      },
      1148: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = a(7704),
          s = r(a(7973)),
          o = a(6517);
        t.default = (e, t) => ({
          type: 'table',
          name: 'resolverInfo',
          message: (0, n.getLocaleLang)(e).inquirer.resolverInfo,
          columns: [
            { name: 'VTL(Local)', value: 'vtl,LocalResolver' },
            { name: 'VTL(Get)', value: 'vtl,GetItem' },
            { name: 'VTL(Query)', value: 'vtl,Query' },
            { name: 'Lambda(Create)', value: 'lambda,create' },
            { name: 'Lambda(Update)', value: 'lambda,update' },
            { name: 'Lambda(Delete)', value: 'lambda,delete' },
          ],
          rows: (0, o.map)(t, (e) => ({
            name: e.name,
            value: (0, o.chain)(e.name)
              .thru((e) => {
                const t = [
                  { name: 'local', value: 'vtl,LocalResolver' },
                  { name: 'get', value: 'vtl,GetItem' },
                  { name: 'list', value: 'vtl,Query' },
                  { name: 'create', value: 'lambda,create' },
                  { name: 'update', value: 'lambda,update' },
                  { name: 'delete', value: 'lambda,delete' },
                ].find((t) => e.startsWith(t.name));
                return t?.value;
              })
              .value(),
          })),
          validate: (t) => new s.default(t, e).required().value(),
        });
      },
      941: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = a(7704),
          s = r(a(7973)),
          o = r(a(5837)),
          i = r(a(1092));
        t.default = (e, t) => ({
          type: 'input',
          name: 'serverlessConfigPath',
          message: (0, n.getLocaleLang)(e).inquirer.serverlessConfigPath,
          default: () => t,
          validate: (t) => new s.default(t, e).required().mustBeYamlFilePath().value(),
          transformer: (e) => new i.default(e).removeAllSpace().value(),
          filter: (e) => new o.default(e).removeAllSpace().value(),
        });
      },
      9189: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(2504));
        t.default = { builder: n.default };
      },
      8922: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = { command: { description: { crud: 'Generate CRUD code based on schema.graphql' } } });
      },
      2044: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = { command: { description: { crud: 'schema.graphql を元に CRUD のコードを生成' } } });
      },
      2848: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const n = r(a(2044)),
          s = r(a(8922));
        t.getLocaleLang = (e) => ('ja' === e ? n.default : s.default);
      },
      3818: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = a(6702),
          s = a(6870),
          o = r(a(8798));
        class i extends n.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            return e
              .version(!1)
              .usage('Usage: create <options>')
              .command(
                '*',
                s.chalk.grey('<command> <options>'),
                () => ({}),
                (e) => {
                  if (1 === e._.length) return new o.default.handler(e).run();
                  throw new Error('locale.error.unProcessed');
                }
              );
          }
        }
        t.default = i;
      },
      975: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(3290)),
          s = r(a(2322)),
          o = a(2868),
          i = r(a(6517)),
          l = r(a(169)),
          u = a(2762),
          c = r(a(6444)),
          d = a(6702),
          p = r(a(1017));
        class m extends d.FeatureHandlerAbstract {
          constructor(e) {
            super(e), n.default.registerPrompt('autocomplete', l.default);
          }
          async run() {
            const { argv: e } = this,
              t = c.default.getLogger();
            t.debug('create hander : ', e);
            const a = (0, o.getLocaleLang)(this.lang),
              r = await n.default
                .prompt([
                  {
                    type: 'autocomplete',
                    name: 'template',
                    emptyText: a.inquirer.template.autocomplete.emptyText,
                    message: a.inquirer.template.choiceTemplate,
                    source: (e, t) => (i.default.isEmpty(t) ? s.default.templates : s.default.templates.filter((e) => e.name.includes(t))),
                  },
                  {
                    type: 'input',
                    name: 'projectName',
                    message: 'input a project name',
                    default: (e) => e.template,
                    validate: (e) => !i.default.isEmpty(e) || 'required input a project name',
                  },
                ])
                .then((e) => e);
            t.debug(`input values : ${JSON.stringify(r)}}`);
            const { template: l, projectName: d } = r;
            if (
              (t.info(`template : ${l}`),
              t.info(`projectName : ${d}`),
              t.debug(`check exists directory : ${p.default.join(s.default.currentPath, d)}`),
              (0, u.isExistsDirectory)(p.default.join(s.default.currentPath, d)))
            )
              throw new Error(`${a.error.alreadyExistsDirectory} : ${p.default.join(s.default.currentPath, d)}`);
            await (0, u.gitClone)(s.default.repositoyUrl, s.default.tmpPath), (0, u.moveDirectory)(p.default.join(s.default.tmpPath, l), p.default.join(s.default.currentPath, d));
          }
        }
        t.default = m;
      },
      8798: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(3818)),
          s = r(a(975));
        t.default = { builder: n.default, handler: s.default };
      },
      7544: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            error: {
              alreadyExistsDirectory: 'already exists directory',
              unProcessed: 'The command entered does not exist. Run "ragate create help" for a list of all available commands.',
            },
            inquirer: { template: { choiceTemplate: 'Choose a project template', autocomplete: { emptyText: 'No result' } } },
          });
      },
      7016: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            error: {
              alreadyExistsDirectory: '既にディレクトリが存在します',
              unProcessed: '入力されたコマンドは存在しません。「ragate create help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',
            },
            inquirer: { template: { choiceTemplate: 'プロジェクトの雛形を選択してください。', autocomplete: { emptyText: '該当するテンプレートが見つかりません' } } },
          });
      },
      2868: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const n = r(a(7016)),
          s = r(a(7544));
        t.getLocaleLang = (e) => ('ja' === e ? n.default : s.default);
      },
      7116: function (e, t, a) {
        var r =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, a, r) {
                  void 0 === r && (r = a);
                  var n = Object.getOwnPropertyDescriptor(t, a);
                  (n && !('get' in n ? !t.__esModule : n.writable || n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return t[a];
                      },
                    }),
                    Object.defineProperty(e, r, n);
                }
              : function (e, t, a, r) {
                  void 0 === r && (r = a), (e[r] = t[a]);
                }),
          n =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, 'default', { enumerable: !0, value: t });
                }
              : function (e, t) {
                  e.default = t;
                }),
          s =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e) for (var a in e) 'default' !== a && Object.prototype.hasOwnProperty.call(e, a) && r(t, e, a);
              return n(t, e), t;
            },
          o =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const i = o(a(1017)),
          l = o(a(6444)),
          u = a(3462),
          c = o(a(8705)),
          d = o(a(6517)),
          p = o(a(7147)),
          m = o(a(2322)),
          f = o(a(3448)),
          y = o(a(3624)),
          g = s(a(7808)),
          h = s(a(2e3)),
          v = a(7347),
          $ = o(a(4259));
        t.default = class {
          constructor(e) {
            (this.logger = l.default.getLogger()),
              (this._stackFilePath = e.stackFilePath),
              (this._lang = e.lang),
              (this._region = e.region),
              (this._defaultIamRolePath = `serverless/${e.region}/resources/iamrole/appsync.yml`),
              (this._graphqlEditor = new $.default()),
              this.setAppSyncStackObject();
          }
          _graphqlEditor;
          get graphqlEditor() {
            return this._graphqlEditor;
          }
          appSyncDynamoDBRoleName = 'AppSyncDynamoDBRole';
          appSyncRDSRoleName = 'AppSyncRDSRole';
          appSyncOpenSearchRoleName = 'AppSyncOpenSearchRole';
          appSyncLambdaRoleName = 'AppSyncLambdaRole';
          defaultCustomDataSourcePath = 'appsync/custom_datasources.yml';
          defaultCustomMappingtemplatePath = 'appsync/custom_mappingtemplate.yml';
          defaultCustomFunctionConfigurationsPath = 'appsync/custom_functionConfigurations.yml';
          defaultAppSyncStackIndex = 0;
          logger;
          _defaultIamRolePath;
          get defaultIamRolePath() {
            return this._defaultIamRolePath;
          }
          _appSyncStack;
          get appSyncStack() {
            return this._appSyncStack;
          }
          _stackFilePath;
          get stackFilePath() {
            return this._stackFilePath;
          }
          _lang;
          get lang() {
            return this._lang;
          }
          _region;
          get region() {
            return this._region;
          }
          getAppSyncStackConfig() {
            const e = (0, u.loadYaml)(this.stackFilePath),
              t = this.defaultAppSyncStackIndex;
            return {
              ...e[t],
              functionConfigurations: e[t].functionConfigurations ?? [],
              dataSources: e[t].dataSources ?? [],
              mappingTemplates: e[t].mappingTemplates ?? [],
              schema: e[t].schema ?? [],
            };
          }
          writeAppSyncStackConfig(e) {
            const t = (0, u.loadYaml)(this.stackFilePath);
            t[this.defaultAppSyncStackIndex] = e;
            const a = (0, u.writeYaml)(this.stackFilePath, t);
            this.logger.info((0, v.chalk)().green(a));
          }
          setAppSyncStackObject() {
            const e = this.getAppSyncStackConfig(),
              { schema: t, dataSources: a, mappingTemplates: r, mappingTemplatesLocation: n, functionConfigurationsLocation: s, functionConfigurations: o } = e;
            this._appSyncStack = {
              mappingTemplatesLocation: n,
              functionConfigurationsLocation: s,
              functionConfigurations:
                d.default
                  .chain(o)
                  .map((e) => (0, u.loadYaml)(f.default.parseSlsRecursivelyReference(e)))
                  .flatten()
                  .filter((e) => e && !d.default.isEmpty(e))
                  .value() ?? [],
              dataSources:
                d.default
                  .chain(a)
                  .map((e) => (0, u.loadYaml)(f.default.parseSlsRecursivelyReference(e)))
                  .flatten()
                  .filter((e) => e && !d.default.isEmpty(e))
                  .value() ?? [],
              mappingTemplates:
                d.default
                  .chain(r)
                  .map((e) => (0, u.loadYaml)(f.default.parseSlsRecursivelyReference(e)))
                  .flatten()
                  .filter((e) => e && !d.default.isEmpty(e))
                  .value() ?? [],
              schema: d.default
                .chain(t)
                .thru((e) => {
                  if (d.default.isString(e) && !d.default.isEmpty(e)) {
                    const t = p.default.readFileSync(i.default.join(m.default.currentPath, e), 'utf8');
                    return d.default.isEmpty(t) ? [] : [t];
                  }
                  return d.default.isArray(e) && !d.default.isEmpty(e)
                    ? e
                        .map((e) => {
                          const t = p.default.readFileSync(i.default.join(m.default.currentPath, e), 'utf8');
                          return d.default.isEmpty(t) ? '' : t;
                        })
                        .filter((e) => !d.default.isEmpty(e))
                    : [];
                })
                .thru((e) => new c.default(e))
                .value(),
            };
          }
          addDataSource(e) {
            let t = !1;
            if (this.appSyncStack?.dataSources.some((t) => t.name === e.name)) this.logger.warn(`DataSource ${e.name} is already exists.`), (t = !1);
            else {
              try {
                const t = [...(0, u.loadYaml)(this.defaultCustomDataSourcePath), e],
                  a = (0, u.writeYaml)(this.defaultCustomDataSourcePath, t);
                this.logger.info((0, v.chalk)().green(a));
              } catch (t) {
                const a = (0, u.writeYaml)(this.defaultCustomDataSourcePath, [e]);
                this.logger.info((0, v.chalk)().green(a));
              }
              t = !0;
            }
            if (t) {
              const e = this.getAppSyncStackConfig();
              e.dataSources.every((e) => !e.includes(this.defaultCustomDataSourcePath)) &&
                this.writeAppSyncStackConfig({ ...e, dataSources: [...e.dataSources, `\${file(./${this.defaultCustomDataSourcePath})}`] });
            }
            this.setAppSyncStackObject();
          }
          addMappingTemplate(e) {
            const { mappingTemplate: t } = e;
            let a = !1;
            if (this.appSyncStack?.mappingTemplates.some((e) => e.type === t.type && e.field === t.field))
              this.logger.warn(`MappingTemplate ${t.type}.${t.field} is already exists.`), (a = !1);
            else {
              try {
                const e = [...(0, u.loadYaml)(this.defaultCustomMappingtemplatePath), t],
                  a = (0, u.writeYaml)(this.defaultCustomMappingtemplatePath, e);
                this.logger.info((0, v.chalk)().green(a));
              } catch (e) {
                const a = (0, u.writeYaml)(this.defaultCustomMappingtemplatePath, [t]);
                this.logger.info((0, v.chalk)().green(a));
              }
              a = !0;
            }
            if (a) {
              const e = this.getAppSyncStackConfig();
              e.mappingTemplates.every((e) => !e.includes(this.defaultCustomMappingtemplatePath)) &&
                this.writeAppSyncStackConfig({ ...e, mappingTemplates: [...e.mappingTemplates, `\${file(./${this.defaultCustomMappingtemplatePath})}`] });
            }
            this.setAppSyncStackObject();
          }
          addFunctionConfiguration(e) {
            const { functionConfiguration: t } = e;
            let a = !1;
            if (this.appSyncStack?.functionConfigurations.some((e) => e.name === t.name)) this.logger.warn(`FunctionConfiguration ${t.name} is already exists.`), (a = !1);
            else {
              try {
                const e = [...(0, u.loadYaml)(this.defaultCustomFunctionConfigurationsPath), t],
                  a = (0, u.writeYaml)(this.defaultCustomFunctionConfigurationsPath, e);
                this.logger.info((0, v.chalk)().green(a));
              } catch (e) {
                const a = (0, u.writeYaml)(this.defaultCustomFunctionConfigurationsPath, [t]);
                this.logger.info((0, v.chalk)().green(a));
              }
              a = !0;
            }
            if (a) {
              const e = this.getAppSyncStackConfig();
              e.functionConfigurations.every((e) => !e.includes(this.defaultCustomFunctionConfigurationsPath)) &&
                this.writeAppSyncStackConfig({ ...e, functionConfigurations: [...e.functionConfigurations, `\${file(./${this.defaultCustomFunctionConfigurationsPath})}`] });
            }
            this.setAppSyncStackObject();
          }
          updateCustomSchemaGraphl(e) {
            this.graphqlEditor.updateCustomSchemaGraphl({
              ...e,
              callback: (e, t) => {
                if (e) {
                  const { schemaPath: e } = t,
                    a = this.getAppSyncStackConfig();
                  d.default.isString(a.schema) && !a.schema.includes(e)
                    ? this.writeAppSyncStackConfig({ ...a, schema: [a.schema, e] })
                    : d.default.isArray(a.schema) && !a.schema.includes(e) && this.writeAppSyncStackConfig({ ...a, schema: [...a.schema, e] }),
                    this.setAppSyncStackObject();
                } else this.logger.warn('skip update custom_schema.graphql.');
              },
            });
          }
          addIamRoleByDataSource(e) {
            const { dataSource: t, sls: a } = e;
            switch (t) {
              case 'AMAZON_DYNAMODB':
                a.addResource({
                  resourceName: this.appSyncDynamoDBRoleName,
                  filePath: this.defaultIamRolePath,
                  cf: y.default.generateCloudFormation(this.appSyncDynamoDBRoleName, (e) => {
                    const t = new g.Role(e, this.appSyncDynamoDBRoleName, { assumedBy: new g.ServicePrincipal('appsync.amazonaws.com') });
                    return (
                      t.addToPolicy(
                        new g.PolicyStatement({
                          effect: g.Effect.ALLOW,
                          resources: [h.Fn.join(':', ['arn:aws:dynamodb', this.region, h.Fn.ref('AWS::AccountId'), 'table/*'])],
                          actions: ['dynamodb:*'],
                        })
                      ),
                      t
                    );
                  }),
                });
                break;
              case 'RELATIONAL_DATABASE':
                a.addResource({
                  resourceName: this.appSyncRDSRoleName,
                  filePath: this.defaultIamRolePath,
                  cf: y.default.generateCloudFormation(this.appSyncRDSRoleName, (e) => {
                    const t = new g.Role(e, this.appSyncRDSRoleName, { assumedBy: new g.ServicePrincipal('appsync.amazonaws.com') });
                    return (
                      t.addToPolicy(
                        new g.PolicyStatement({
                          effect: g.Effect.ALLOW,
                          resources: [h.Fn.join(':', ['arn:aws:rds', this.region, h.Fn.ref('AWS::AccountId'), 'secret:*'])],
                          actions: [
                            'rds-data:DeleteItems',
                            'rds-data:ExecuteSql',
                            'rds-data:ExecuteStatement',
                            'rds-data:GetItems',
                            'rds-data:InsertItems',
                            'rds-data:UpdateItems',
                          ],
                        })
                      ),
                      t.addToPolicy(
                        new g.PolicyStatement({
                          effect: g.Effect.ALLOW,
                          resources: [h.Fn.join(':', ['arn:aws:secretsmanager', this.region, h.Fn.ref('AWS::AccountId'), 'table/*'])],
                          actions: ['secretsmanager:GetSecretValue'],
                        })
                      ),
                      t
                    );
                  }),
                });
                break;
              case 'AMAZON_ELASTICSEARCH':
                a.addResource({
                  resourceName: this.appSyncOpenSearchRoleName,
                  filePath: this.defaultIamRolePath,
                  cf: y.default.generateCloudFormation(
                    this.appSyncOpenSearchRoleName,
                    (e) => new g.Role(e, this.appSyncOpenSearchRoleName, { assumedBy: new g.ServicePrincipal('appsync.amazonaws.com') })
                  ),
                });
                break;
              case 'AWS_LAMBDA':
                a.addResource({
                  resourceName: this.appSyncLambdaRoleName,
                  filePath: this.defaultIamRolePath,
                  cf: y.default.generateCloudFormation(this.appSyncLambdaRoleName, (e) => {
                    const t = new g.Role(e, this.appSyncLambdaRoleName, { assumedBy: new g.ServicePrincipal('appsync.amazonaws.com') });
                    return (
                      t.addToPolicy(
                        new g.PolicyStatement({
                          effect: g.Effect.ALLOW,
                          resources: [h.Fn.join(':', ['arn:aws:lambda', this.region, h.Fn.ref('AWS::AccountId'), 'function:*'])],
                          actions: ['lambda:invokeFunction'],
                        })
                      ),
                      t
                    );
                  }),
                });
                break;
              case 'HTTP':
                a.addResource({
                  resourceName: 'AppSyncHttpRole',
                  filePath: this.defaultIamRolePath,
                  cf: y.default.generateCloudFormation('AppSyncHttpRole', (e) => new g.Role(e, 'AppSyncHttpRole', { assumedBy: new g.ServicePrincipal('appsync.amazonaws.com') })),
                });
            }
          }
        };
      },
      3624: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(6444)),
          s = a(6817),
          o = a(2726);
        t.default = class {
          static generateCloudFormation = (e, t) => {
            class a extends s.Stack {
              constructor(a, r, n) {
                super(a, r, n), t(this).node.defaultChild.overrideLogicalId(e);
              }
            }
            const r = n.default.getLogger(),
              i = new a(new s.App(), 'ragate'),
              l = o.SynthUtils.toCloudFormation(i);
            return r.debug('generated cloudFormation template:'), r.debug(l), l.Resources;
          };
        };
      },
      2056: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(3448)),
          s = r(a(5053)),
          o = r(a(7112)),
          i = a(2762),
          l = r(a(7147)),
          u = r(a(6444)),
          c = a(7347);
        t.default = class {
          static get templates() {
            return { typescript: s.default, vtl: o.default };
          }
          constructor(e) {
            const { filePath: t, code: a, type: r } = e,
              [s, o] = n.default.parseFilePath(t);
            (this.type = r),
              (this.filePath = t),
              (this.code = a),
              (this.destinationPath = s.join('/') + '/'),
              (this.fileName = 'typescript' === r ? n.default.extractFilename(o) : o),
              (this.logger = u.default.getLogger());
          }
          filePath;
          type;
          destinationPath;
          fileName;
          code;
          logger;
          get extension() {
            switch (this.type) {
              case 'typescript':
                return 'ts';
              case 'vtl':
                return 'vtl';
              default:
                throw (this.logger.error(`An unsupported file type was specified. : ${this.filePath}`), Error('An unsupported file type was specified.'));
            }
          }
          write() {
            const e = `${(0, i.asFullPath)(this.destinationPath)}${this.fileName}.${this.extension}`;
            (0, i.isFileExists)(e)
              ? this.logger.info(`already exists file, skip write : ${e}`)
              : ((0, i.createDirectories)(this.destinationPath),
                this.logger.info(`create directories : ${this.destinationPath}`),
                l.default.writeFileSync(e, this.code, 'utf8'),
                this.logger.info(`write : ${e}`),
                this.logger.info((0, c.chalk)().green(this.code)));
          }
        };
      },
      5955: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            "import { Context, CloudFrontRequest, Callback, CloudFrontRequestEvent, CloudFrontResultResponse } from 'aws-lambda';\n\nexport const handler = (event: CloudFrontRequestEvent, _context: Context, callback: Callback): void => {\n  const request: CloudFrontRequest = event.Records[0].cf.request;\n  const headers = request.headers;\n\n  const authUser = 'ragate'; // Basic認証のユーザー名\n  const authPass = '20210525'; // Basic認証のパスワード\n\n  const authString = 'Basic ' + Buffer.from(authUser + ':' + authPass).toString('base64');\n  if (typeof headers.authorization === 'undefined' || headers.authorization[0].value !== authString) {\n    const body = 'Unauthorized';\n    const response: CloudFrontResultResponse = {\n      status: '401',\n      statusDescription: 'Unauthorized',\n      body: body,\n      headers: {\n        'www-authenticate': [{ key: 'WWW-Authenticate', value: 'Basic' }],\n      },\n    };\n    callback(null, response);\n  }\n  callback(null, request);\n};\n");
      },
      2139: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = (e, t) =>
            `import { AppSyncResolverEvent } from 'aws-lambda';\nimport moment from 'moment';\nimport DynamoService from 'services/dynamoService';\nimport { ${e}, ${t} } from 'types/API';\nimport { DYNAMO_TABLES } from 'types/index';\nimport { v4 as uuid } from 'uuid';\nimport middy from 'utils/middy';\n\nexport const handler = middy.handler(async (event: AppSyncResolverEvent<${e}>): Promise<${t}> => {\n  const input = event.arguments.input;\n  const now = moment.tz('Asia/Tokyo').format();\n  const dynamoService = new DynamoService();\n  const Id = uuid();\n  const itemId = uuid();\n  const item: ${t} = {\n    ...input,\n    Id: Id,\n    Sk: \`${t}#\${itemId}\`,\n    CreatedAt: now,\n    UpdatedAt: now,\n  };\n  await dynamoService.putItem({\n    putItemCommandInput: {\n      TableName: DYNAMO_TABLES.TableName,\n      Item: item,\n      ConditionExpression: 'attribute_not_exists(Id) and attribute_not_exists(Sk)',\n    },\n  });\n\n  return item;\n});\n`);
      },
      8967: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = (e, t) =>
            `import { AppSyncResolverEvent } from 'aws-lambda';\nimport { ${e}, ${t} } from 'types/API';\nimport { DYNAMO_TABLES } from 'types/index';\nimport DynamoService from 'services/dynamoService';\nimport middy from 'utils/middy';\n\nexport const handler = middy.handler(async (event: AppSyncResolverEvent<${e}>): Promise<${t}> => {\n  const dynamoService = new DynamoService();\n  const item = await dynamoService\n    .deleteItem({\n      deleteItemCommandInput: {\n        TableName: DYNAMO_TABLES.TableName,\n        Key: {\n          Id: event.arguments.input.Id,\n          Sk: \`${t}#\${event.arguments.input.ItemId}\`,\n        },\n        ReturnValues: 'ALL_OLD',\n      },\n    })\n    .then(({ Attributes }) => Attributes as ${t});\n\n  return item;\n});\n`);
      },
      5053: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(5955)),
          s = r(a(146)),
          o = r(a(2139)),
          i = r(a(9652)),
          l = r(a(8967));
        t.default = { basicauthlambda: n.default, skeleton: s.default, create: o.default, update: i.default, delete: l.default };
      },
      146: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            "import { asyncHandlerWrapper } from 'functions/wrapper';\nimport { AppSyncResolverEvent, Context } from 'aws-lambda';\nimport middy from 'utils/middy';\n\ntype Input = {\n  example: string;\n};\n\ntype Response = {\n  example: string;\n};\n\nexport const handler = middy.handler((async (event: AppSyncResolverEvent<Input>): Promise<Response> => {\n  console.log('It is skeleton 👻');\n});\n");
      },
      9652: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = (e, t) =>
            `import { AppSyncResolverEvent } from 'aws-lambda';\nimport moment from 'moment';\nimport DynamoService from 'services/dynamoService';\nimport { ${e}, ${t} } from 'types/API';\nimport { DYNAMO_TABLES } from 'types/index';\nimport middy from 'utils/middy';\n\nexport const handler = middy.handler(async (event: AppSyncResolverEvent<${e}>): Promise<${t}> => {\n  const input = event.arguments.input;\n  const now = moment.tz('Asia/Tokyo').format();\n  const dynamoService = new DynamoService();\n  const item = {\n    ...input,\n    Id: input.Id,\n    Sk: \`${t}#\${input.ItemId}\`,\n    UpdatedAt: now,\n  } as ${t};\n\n  await dynamoService.updateAttributes({\n    tableName: DYNAMO_TABLES.TableName,\n    keyNames: ['Id', 'Sk'],\n    attributes: item,\n    returnValues: 'NONE',\n  });\n\n  return item;\n});\n`);
      },
      7022: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = (e) =>
            `\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n## [Start] 共通設定\n#set( $primaryValue = "your primary key value" )\n#set( $sortKeyValue = "your sort key value" )\n## [End] 共通設定\n\n## [Start] 自動設定\n#set( $consistentRead = ${e.consistentRead.toString()} )\n#set( $primaryKey = "${
              e.primaryKeyName
            }" )\n#set( $sortKeyName = "${
              e.sortKeyName
            }" )\n## [End] 自動設定\n\n## [Start] バリデーション\n#set( $modelExpression = {\n    "version" : "2017-02-28",\n    "operation" : "GetItem",\n    "key" : {},\n    "consistentRead" : $consistentRead\n} )\n#if( $util.isNullOrEmpty($primaryValue) )\n  $util.error("PrimaryValue is null.", "InvalidIndexValueError")\n#else\n  $util.qr($modelExpression.key.put($primaryKey, $util.dynamodb.toDynamoDB($primaryValue)))\n#end\n#if( !$util.isNullOrEmpty($sortKeyName) && $util.isNullOrEmpty($sortKeyValue) )\n  $util.error("sortKeyValue is null.", "InvalidIndexValueError")\n#elseif( !$util.isNullOrEmpty($sortKeyName) && !$util.isNullOrEmpty($sortKeyValue) )\n  $util.qr($modelExpression.key.put($sortKeyName, $util.dynamodb.toDynamoDB($sortKeyValue)))\n#end\n## [End] バリデーション\n\n$util.toJson($modelExpression)\n`);
      },
      4981: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            '\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n#if( $ctx.error )\n  $util.error($ctx.error.message, $ctx.error.type)\n#else\n  $util.toJson($ctx.result)\n#end\n');
      },
      3289: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = (e) =>
            `\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n## [Start] 手動設定\n#set( $primaryValue = "your primary key value" )\n#set( $sortKeyValue = "your sort key value" )\n## [End] 手動設定\n\n## [Start] 自動設定\n${
              e?.gsiName ? `#set( $indexName = "${e?.gsiName}" )` : ''
            }\n#set( $args = $ctx.args )\n#set( $primaryKey = "${e.primaryKeyName}" )\n#set( $sortKeyName = "${
              e.sortKeyName
            }" )\n## [End] 自動設定\n\n## [Start] バリデーション\n#set( $modelQueryExpression = {} )\n#if( $util.isNullOrEmpty($primaryValue) )\n  $util.error("PrimaryValue is null.", "InvalidIndexValueError")\n#else\n  #set( $modelQueryExpression.expression = "#$primaryKey = :$primaryKey" )\n  #set( $modelQueryExpression.expressionNames = {\n    "#$primaryKey": $primaryKey\n  })\n  #set( $modelQueryExpression.expressionValues = {\n    ":$primaryKey": $util.dynamodb.toDynamoDB($primaryValue)\n  })\n#end\n## [End] バリデーション\n\n## [Start] ソートキー用クエリー生成\n#if( !$util.isNullOrEmpty($sortKeyName) && !$util.isNullOrEmpty($sortKeyValue) )\n  #if( !$util.isNull($sortKeyValue.beginsWith) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND begins_with(#sortKey, :sortKey)" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey",  $util.dynamodb.toDynamoDB("$sortKeyValue.beginsWith") ))\n  #elseif( !$util.isNull($sortKeyValue.between) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey BETWEEN :sortKey0 AND :sortKey1" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey0", $util.dynamodb.toDynamoDB("$sortKeyValue.between[0]") ))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey1", $util.dynamodb.toDynamoDB("$sortKeyValue.between[1]") ))\n  #elseif( !$util.isNull($sortKeyValue.eq) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey = :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.eq") ))\n  #elseif( !$util.isNull($sortKeyValue.lt) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey < :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.lt") ))\n  #elseif( !$util.isNull($sortKeyValue.le) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey <= :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.le") ))\n  #elseif( !$util.isNull($sortKeyValue.gt) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey > :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.gt") ))\n  #elseif( !$util.isNull($sortKeyValue.ge) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey >= :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.ge") ))\n  #elseif( !$util.isNull($sortKeyValue.contains) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND contains(#sortKey, :sortKey)" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.contains") ))\n  #elseif( !$util.isNull($sortKeyValue.notContains) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND notContains(#sortKey, :sortKey)" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.notContains") ))\n  #else\n  #end\n#end\n## [End] ソートキー用クエリー生成\n\n## [Start] VTL文字列出力\n#set( $limit = $util.defaultIfNull($args.limit, 100) )\n#set( $request = {\n  "version": "2018-05-29",\n  "limit": $limit\n} )\n#if( $args.nextToken && !$util.isNullOrEmpty($args.nextToken) )\n  #set( $request.nextToken = $args.nextToken )\n#end\n#if( $args.filter )\n  #set( $request.filter = $util.parseJson("$util.transform.toDynamoDBFilterExpression($args.filter)") )\n#end\n#if( !$util.isNull($modelQueryExpression) && !$util.isNullOrEmpty($modelQueryExpression.expression) )\n  $util.qr($request.put("operation", "Query"))\n  $util.qr($request.put("query", $modelQueryExpression))\n  #if( $util.isNullOrEmpty($args.sortDirection) )\n    #set( $request.scanIndexForward = false )\n  #elseif( $args.sortDirection == "ASC" )\n    #set( $request.scanIndexForward = true )\n  #elseif( $args.sortDirection == "DESC" )\n    #set( $request.scanIndexForward = false )\n  #end\n#else\n  $util.qr($request.put("operation", "Scan"))\n#end\n#if(!$util.isNull($indexName))\n    $util.qr($request.put("index", $indexName))\n#end\n$util.toJson($request)\n## [End] VTL文字列出力`);
      },
      563: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            '\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n#if( $ctx.error )\n  $util.error($ctx.error.message, $ctx.error.type)\n#else\n  $util.toJson($ctx.result)\n#end\n');
      },
      7044: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            '## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n## [Start] 共通設定\n#set( $primaryKey = "primary key name" )\n#set( $sortKeyName = "sort key name" )\n#set( $primaryValue = "your primary key value" )\n#set( $sortKeyValue = "your sort key value" )\n#set( $consistentRead = false )\n## [End] 共通設定\n\n## [Start] 自動設定\n## [End] 自動設定\n\n## [Start] バリデーション\n#set( $modelExpression = {\n    "version" : "2017-02-28",\n    "operation" : "GetItem",\n    "key" : {},\n    "consistentRead" : $consistentRead\n} )\n#if( $util.isNullOrEmpty($primaryValue) )\n  $util.error("PrimaryValue is null.", "InvalidIndexValueError")\n#else\n  $util.qr($modelExpression.key.put($primaryKey, $util.dynamodb.toDynamoDB($primaryValue)))\n#end\n#if( !$util.isNullOrEmpty($sortKeyName) && $util.isNullOrEmpty($sortKeyValue) )\n  $util.error("sortKeyValue is null.", "InvalidIndexValueError")\n#elseif( !$util.isNullOrEmpty($sortKeyName) && !$util.isNullOrEmpty($sortKeyValue) )\n  $util.qr($modelExpression.key.put($sortKeyName, $util.dynamodb.toDynamoDB($sortKeyValue)))\n#end\n## [End] バリデーション\n\n$util.toJson($modelExpression)\n');
      },
      8383: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            '## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n#if( $ctx.error )\n  $util.error($ctx.error.message, $ctx.error.type)\n#else\n  $util.toJson($ctx.result)\n#end\n');
      },
      713: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            '## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n## [Start] 手動設定\n##set( $indexName = "gsi index name" )\n#set( $primaryKey = "primary key name" )\n#set( $sortKeyName = "sort key name" )\n#set( $primaryValue = "your primary key value" )\n#set( $sortKeyValue = "your sort key value" )\n#if( $util.isNullOrEmpty($sortKeyValue) )\n    #set( $sortKeyValue = {\n    "beginsWith" : "FacetsName#"\n  } )\n#end\n## [End] 手動設定\n\n## [Start] 自動設定\n#set( $args = $ctx.args )\n## [End] 自動設定\n\n## [Start] バリデーション\n#set( $modelQueryExpression = {} )\n#if( $util.isNullOrEmpty($primaryValue) )\n  $util.error("PrimaryValue is null.", "InvalidIndexValueError")\n#else\n  #set( $modelQueryExpression.expression = "#$primaryKey = :$primaryKey" )\n  #set( $modelQueryExpression.expressionNames = {\n    "#$primaryKey": $primaryKey\n  })\n  #set( $modelQueryExpression.expressionValues = {\n    ":$primaryKey": $util.dynamodb.toDynamoDB($primaryValue)\n  })\n#end\n## [End] バリデーション\n\n## [Start] ソートキー用クエリー生成\n#if( !$util.isNullOrEmpty($sortKeyName) && !$util.isNullOrEmpty($sortKeyValue) )\n  #if( !$util.isNull($sortKeyValue.beginsWith) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND begins_with(#sortKey, :sortKey)" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey",  $util.dynamodb.toDynamoDB("$sortKeyValue.beginsWith") ))\n  #elseif( !$util.isNull($sortKeyValue.between) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey BETWEEN :sortKey0 AND :sortKey1" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey0", $util.dynamodb.toDynamoDB("$sortKeyValue.between[0]") ))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey1", $util.dynamodb.toDynamoDB("$sortKeyValue.between[1]") ))\n  #elseif( !$util.isNull($sortKeyValue.eq) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey = :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.eq") ))\n  #elseif( !$util.isNull($sortKeyValue.lt) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey < :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.lt") ))\n  #elseif( !$util.isNull($sortKeyValue.le) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey <= :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.le") ))\n  #elseif( !$util.isNull($sortKeyValue.gt) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey > :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.gt") ))\n  #elseif( !$util.isNull($sortKeyValue.ge) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey >= :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.ge") ))\n  #elseif( !$util.isNull($sortKeyValue.contains) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND contains(#sortKey, :sortKey)" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.contains") ))\n  #elseif( !$util.isNull($sortKeyValue.notContains) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND notContains(#sortKey, :sortKey)" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.notContains") ))\n  #else\n  #end\n#end\n## [End] ソートキー用クエリー生成\n\n## [Start] VTL文字列出力\n#set( $limit = $util.defaultIfNull($args.limit, 100) )\n#set( $request = {\n  "version": "2018-05-29",\n  "limit": $limit\n} )\n#if( $args.nextToken && !$util.isNullOrEmpty($args.nextToken) )\n  #set( $request.nextToken = $args.nextToken )\n#end\n#if( $args.filter )\n  #set( $request.filter = $util.parseJson("$util.transform.toDynamoDBFilterExpression($args.filter)") )\n#end\n#if( !$util.isNull($modelQueryExpression) && !$util.isNullOrEmpty($modelQueryExpression.expression) )\n  $util.qr($request.put("operation", "Query"))\n  $util.qr($request.put("query", $modelQueryExpression))\n  #if( $util.isNullOrEmpty($args.sortDirection) )\n    #set( $request.scanIndexForward = false )\n  #elseif( $args.sortDirection == "ASC" )\n    #set( $request.scanIndexForward = true )\n  #elseif( $args.sortDirection == "DESC" )\n    #set( $request.scanIndexForward = false )\n  #end\n#else\n  $util.qr($request.put("operation", "Scan"))\n#end\n#if(!$util.isNull($indexName))\n    $util.qr($request.put("index", $indexName))\n#end\n$util.toJson($request)\n## [End] VTL文字列出力');
      },
      9379: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            '## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n#if( $ctx.error )\n  $util.error($ctx.error.message, $ctx.error.type)\n#else\n  $util.toJson($ctx.result)\n#end\n');
      },
      2525: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            '\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n#set( $args = $ctx.args )\n\n## [Start] VTL文字列出力\n#set( $limit = $util.defaultIfNull($args.limit, 100) )\n#set( $request = {\n  "version": "2018-05-29",\n  "limit": $limit\n} )\n#if( $args.nextToken && !$util.isNullOrEmpty($args.nextToken) )\n  #set( $request.nextToken = $args.nextToken )\n#end\n#if( $args.filter )\n  #set( $request.filter = $util.parseJson("$util.transform.toDynamoDBFilterExpression($args.filter)") )\n#end\n$util.qr($request.put("operation", "Scan"))\n$util.toJson($request)\n## [End] VTL文字列出力\n');
      },
      9064: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            '\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n#if( $ctx.error )\n  $util.error($ctx.error.message, $ctx.error.type)\n#else\n  $util.toJson($ctx.result)\n#end\n');
      },
      2292: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            '\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-http.html\n\n{\n    "version": "2018-05-29",\n    "method": "PUT|POST|GET|DELETE|PATCH",\n    "params": {\n        "query": Map,\n        "headers": Map,\n        "body": string\n    },\n    "resourcePath": string\n}\n');
      },
      9768: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            '\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-http.html\n\n#if( $ctx.error )\n  $util.error($ctx.error.message, $ctx.error.type)\n#else\n  $util.toJson($ctx.result)\n#end\n');
      },
      7112: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(4709)),
          s = r(a(5951)),
          o = r(a(8520)),
          i = r(a(8382)),
          l = r(a(3289)),
          u = r(a(563)),
          c = r(a(713)),
          d = r(a(9379)),
          p = r(a(2525)),
          m = r(a(9064)),
          f = r(a(7022)),
          y = r(a(4981)),
          g = r(a(7044)),
          h = r(a(8383)),
          v = r(a(2592)),
          $ = r(a(2922)),
          S = r(a(2292)),
          _ = r(a(9768)),
          b = r(a(1954)),
          w = r(a(8002));
        t.default = {
          pipelineAfter: n.default,
          pipelineBefore: s.default,
          addDynamoGetItemRequest: f.default,
          addDynamoGetItemResponse: y.default,
          addDynamoQueryRequest: l.default,
          addDynamoQueryResponse: u.default,
          codegenDynamoGetItemRequest: g.default,
          codegenDynamoGetItemResponse: h.default,
          codegenDynamoQueryRequest: c.default,
          codegenDynamoQueryResponse: d.default,
          localResolverRequest: o.default,
          localResolverResponse: i.default,
          dynamoScanRequest: p.default,
          dynamoScanResponse: m.default,
          openSearchQueryRequest: v.default,
          openSearchQueryResponse: $.default,
          httpQueryRequest: S.default,
          httpQueryResponse: _.default,
          rdbQueryRequest: b.default,
          rdbQueryResponse: w.default,
        };
      },
      8520: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            '\n## [Start] 共通設定\n#set($payload = $ctx.args )\n#set($primaryValue = "your primary key value" )\n## [End] 共通設定\n\n#if( $util.isNullOrEmpty($primaryValue) )\n  #return\n#end\n\n{\n  "version": "2017-02-28",\n  "payload": $util.toJson($payload)\n}\n');
      },
      8382: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = '\n#if( $ctx.error )\n  $util.error($ctx.error.message, $ctx.error.type)\n#else\n  $util.toJson($ctx.result)\n#end\n');
      },
      2592: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = (e) =>
            `\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-elasticsearch.html\n\n## [START] 共通設定\n#set( $args = $ctx.args )\n#set( $indexName = "${e.indexName}" )\n#set( $allowedAggFields = ["ALLOWED_ALL_FIELDS"] ) ## アグリゲーション指定許可するフィールド名(ALLOWED_ALL_FIELDSを指定時は全フィールド許可)\n## [END] 共通設定\n\n## [START] ソート条件生成\n#set( $sortValues = [] )\n#set( $sortFields = [] )\n#if( !$util.isNullOrEmpty($args.sort) )\n  #foreach( $sortItem in $args.sort )\n    #set( $temp = {\n      $sortItem.field : $sortItem.direction\n    } )\n    $util.qr($sortValues.add($temp))\n  #end\n#end\n## [END] ソート条件生成\n\n## [START] Aggregates適用(分析対象フィールド)\n#set( $aggregateValues = {} )\n#foreach( $aggItem in $args.aggregates )\n  #if( $allowedAggFields[0] == "ALLOWED_ALL_FIELDS" )\n    #set( $aggFilter = { "match_all": {} } )\n  #elseif( $allowedAggFields.contains($aggItem.field) )\n    #set( $aggFilter = { "match_all": {} } )\n  #else\n    $util.error("Unauthorized to run aggregation on field: \${aggItem.field}", "Unauthorized")\n  #end\n  $util.qr($aggregateValues.put("$aggItem.name", { "filter": $aggFilter, "aggs": { "$aggItem.name": { "$aggItem.type": { "field": "$aggItem.field" }}} }))\n#end\n## [END] Aggregates適用(分析対象フィールド)\n\n## [START] フィルター適用\n#if( $util.isNullOrEmpty($args.filter) )\n  #set( $filter = {\n    "match_all": {}\n  } )\n#else\n  #set( $filter = $util.parseJson($util.transform.toElasticsearchQueryDSL($args.filter)) )\n#end\n## [END] フィルター適用\n\n{\n  "version": "2018-05-29",\n  "operation": "GET",\n  "path": "/$indexName/_doc/_search",\n  "params": {\n      "body": {\n                #if( !$util.isNullOrEmpty($args.nextToken) )"search_after": $util.base64Decode($args.nextToken), #end\n                #if( $args.from )"from": $args.from, #end\n                "size": #if( $args.limit ) $args.limit #else 100 #end,\n                "sort": $util.toJson($sortValues),\n                "version": false,\n                "query": $util.toJson($filter),\n                "aggs": $util.toJson($aggregateValues)\n              }\n  }\n}\n`);
      },
      2922: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            '\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-elasticsearch.html\n\n#if( $ctx.error )\n  $util.error($ctx.error.message, $ctx.error.type)\n#end\n\n#set( $es_items = [] )\n#set( $aggregateValues = [] )\n#foreach( $entry in $context.result.hits.hits )\n  #if( !$foreach.hasNext )\n    #set( $nextToken = $util.base64Encode($util.toJson($entry.sort)) )\n  #end\n  $util.qr($es_items.add($entry.get("_source")))\n#end\n#foreach( $aggItem in $context.result.aggregations.keySet() )\n  #set( $aggResult = {} )\n  #set( $aggResultValue = {} )\n  #set( $currentAggItem = $ctx.result.aggregations.get($aggItem) )\n  $util.qr($aggResult.put("name", $aggItem))\n  #if( !$util.isNullOrEmpty($currentAggItem) )\n    #if( !$util.isNullOrEmpty($currentAggItem.get($aggItem).buckets) )\n      ## $util.qr($aggResultValue.put("__typename", "SearchableAggregateBucketResult"))\n      $util.qr($aggResultValue.put("buckets", $currentAggItem.get($aggItem).buckets))\n    #end\n    #if( !$util.isNullOrEmpty($currentAggItem.get($aggItem).value) )\n      ## $util.qr($aggResultValue.put("__typename", "SearchableAggregateScalarResult"))\n      $util.qr($aggResultValue.put("value", $currentAggItem.get($aggItem).value))\n    #end\n  #end\n  $util.qr($aggResult.put("result", $aggResultValue))\n  $util.qr($aggregateValues.add($aggResult))\n#end\n$util.toJson({\n  "items": $es_items,\n  "total": $ctx.result.hits.total.value,\n  "nextToken": $nextToken,\n  "aggregateItems": $aggregateValues\n})\n');
      },
      4709: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = '$util.toJson($ctx.prev.result)');
      },
      5951: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = '{}');
      },
      1954: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            '\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-rds.html\n\n{\n    "version": "2018-05-29",\n    "statements": [],\n    "variableMap": {}\n}\n');
      },
      8002: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            '\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-rds.html\n\n#if( $ctx.error )\n  $util.error($ctx.error.message, $ctx.error.type)\n#else\n  $util.toJson($ctx.result)\n#end\n');
      },
      1325: function (e, t, a) {
        var r =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, a, r) {
                  void 0 === r && (r = a);
                  var n = Object.getOwnPropertyDescriptor(t, a);
                  (n && !('get' in n ? !t.__esModule : n.writable || n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return t[a];
                      },
                    }),
                    Object.defineProperty(e, r, n);
                }
              : function (e, t, a, r) {
                  void 0 === r && (r = a), (e[r] = t[a]);
                }),
          n =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, 'default', { enumerable: !0, value: t });
                }
              : function (e, t) {
                  e.default = t;
                }),
          s =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e) for (var a in e) 'default' !== a && Object.prototype.hasOwnProperty.call(e, a) && r(t, e, a);
              return n(t, e), t;
            },
          o =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const i = o(a(1017)),
          l = o(a(6444)),
          u = a(7347),
          c = o(a(6517)),
          d = a(3462),
          p = o(a(3448)),
          m = o(a(2056)),
          f = o(a(3624)),
          y = s(a(7808)),
          g = s(a(2e3));
        t.default = class {
          constructor(e) {
            (this.logger = l.default.getLogger()),
              (this._serverlessConfigPath = e.serverlessConfigPath),
              (this._lang = e.lang),
              (this._defaultFunctionYamlPath = `serverless/${e.region}/resources/functions.yml`);
            try {
              const t = (0, d.loadYaml)(this.serverlessConfigPath);
              if (((this._serverlessConfig = t), c.default.isString(t.functions))) {
                const e = p.default.parseSlsRecursivelyReference(t.functions);
                this._functionsYamlPath = e;
              }
              this._region = t.provider.region ?? e.region;
            } catch (t) {
              this._region = e.region;
            }
            this._isExistsServelessConfig = this.getIsExistsServelessConfig(this.serverlessConfigPath);
          }
          defaultLambdaTimeOut = 30;
          defaultMemorySize = 1024;
          logger;
          _isExistsServelessConfig;
          get isExistsServelessConfig() {
            return this._isExistsServelessConfig;
          }
          _lang;
          get lang() {
            return this._lang;
          }
          _defaultFunctionYamlPath;
          get defaultFunctionYamlPath() {
            return this._defaultFunctionYamlPath;
          }
          _region;
          get region() {
            return this._region;
          }
          _serverlessConfigPath;
          get serverlessConfigPath() {
            return this._serverlessConfigPath;
          }
          _functionsYamlPath;
          get functionsYamlPath() {
            return this._functionsYamlPath;
          }
          _serverlessConfig;
          get serverlessConfig() {
            return this._serverlessConfig;
          }
          cannotProces() {
            const e = this.logger;
            return this.isExistsServelessConfig
              ? !!c.default.isEmpty(this.region) && (e.warn('not found region property, skip update'), e.warn(`please check a input path : ${this.serverlessConfigPath}`), !0)
              : (e.warn('not found serverless config file, skip update'), e.warn(`please check a input path : ${this.serverlessConfigPath}`), !0);
          }
          addResource = (e) => {
            if (this.cannotProces()) return;
            const t = this.logger,
              { filePath: a, resourceName: r, cf: n } = e;
            (() => {
              const e = this.serverlessConfig,
                r = i.default.join('./', a),
                n = e.resources ?? [];
              if (n.some((e) => e.includes(r))) t.warn(`already exists resource file path : ${r}`);
              else {
                n.push(`\${file(./${r})}`);
                const a = (0, d.writeYaml)(this.serverlessConfigPath, { ...e, resources: n });
                t.info(r), t.info((0, u.chalk)().green(a));
              }
            })(),
              (() => {
                try {
                  const e = (0, d.loadYaml)(a) ?? {};
                  if (c.default.has(e, `Resources.${r}`)) t.warn(`resource name : ${r}`), t.warn(`already exists resource file path : ${a}`);
                  else {
                    const r = (0, d.writeYaml)(a, { ...e, Resources: { ...e.Resources, ...n } });
                    t.info(a), t.info(`over right : ${a}`), t.info((0, u.chalk)().green(r));
                  }
                } catch (e) {
                  const r = (0, d.writeYaml)(a, { Resources: { ...n } });
                  t.info(`created yaml file : ${a}`), t.info((0, u.chalk)().green(r));
                }
              })();
          };
          addFunction = (e) => {
            if (this.cannotProces()) return;
            const { lambdaFunctionName: t, lambdaHandler: a, memorySize: r, timeout: n, code: s } = e,
              o = this.logger;
            o.debug("functionsYamlPath', functionsYamlPath"),
              (() => {
                const e = this.serverlessConfig;
                if (c.default.isEmpty(e.functions)) {
                  const t = (0, d.writeYaml)(this.serverlessConfigPath, { ...e, functions: `\${file(./${this.defaultFunctionYamlPath})}` });
                  o.info('write functions property'), o.info((0, u.chalk)().green(t));
                }
              })(),
              (() => {
                const e = this.functionsYamlPath ?? this.defaultFunctionYamlPath;
                try {
                  const s = (0, d.loadYaml)(e) ?? {};
                  if (c.default.has(s, t)) o.warn(`already exists lambda function at, skip update : ${t}`);
                  else {
                    const i = (0, d.writeYaml)(e, {
                      ...s,
                      ...this.generateFunctionYamlProperty(t, { handler: a, memorySize: r ?? this.defaultMemorySize, timeout: n ?? this.defaultLambdaTimeOut }),
                    });
                    o.info('write functions property'), o.info((0, u.chalk)().green(i));
                  }
                } catch (s) {
                  const i = (0, d.writeYaml)(e, {
                    ...this.generateFunctionYamlProperty(t, { handler: a, memorySize: r ?? this.defaultMemorySize, timeout: n ?? this.defaultLambdaTimeOut }),
                  });
                  o.info('write functions property'), o.info((0, u.chalk)().green(i));
                }
              })(),
              new m.default({ filePath: a, code: s, type: 'typescript' }).write(),
              (() => {
                this.addResource({ filePath: `serverless/${this.region}/resources/iam-role.yml`, resourceName: 'DefaultLambdaRole', cf: this.generateDefaultLambdaRoleCf(t) });
              })();
          };
          generateFunctionYamlProperty = (e, t) => ({
            [e]: {
              handler: t?.handler ?? 'index.handler',
              name: t?.name ?? e,
              memorySize: t?.memorySize ?? this.defaultMemorySize,
              timeout: t?.timeout ?? this.defaultLambdaTimeOut,
            },
          });
          getIsExistsServelessConfig(e) {
            if (c.default.isEmpty(e)) return this.logger.warn('not found serverless config file, skip update'), this.logger.warn(`please check a input path : ${e}`), !1;
            try {
              return (0, d.loadYaml)(e), !0;
            } catch (t) {
              return this.logger.warn('not found serverless config file, skip update'), this.logger.warn(`please check a input path : ${e}`), !1;
            }
          }
          generateDefaultLambdaRoleCf(e) {
            return f.default.generateCloudFormation(e, (t) => {
              const a = new y.Role(t, e, { assumedBy: new y.ServicePrincipal('lambda.amazonaws.com') });
              return (
                a.addToPolicy(
                  new y.PolicyStatement({
                    effect: y.Effect.ALLOW,
                    resources: [g.Fn.join(':', ['arn:aws:logs', g.Fn.ref('AWS::Region'), g.Fn.ref('AWS::AccountId'), 'log-group:/aws/lambda/*:*:*'])],
                    actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
                  })
                ),
                a.addToPolicy(
                  new y.PolicyStatement({
                    effect: y.Effect.ALLOW,
                    resources: [g.Fn.join(':', ['arn:aws:logs', this.region, g.Fn.ref('AWS::AccountId'), 'log-group:/aws/lambda/*:*:*'])],
                    actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
                  })
                ),
                a
              );
            });
          }
          static generateServerlessConfig = (e) => ({
            service: e?.service ?? 'starter',
            useDotenv: e?.useDotenv ?? !0,
            provider: {
              name: e?.provider?.name ?? 'aws',
              runtime: e?.provider?.runtime ?? 'nodejs18.x',
              stage: e?.provider?.stage ?? '${opt:stage}',
              region: e?.provider?.region ?? 'ap-northeast-1',
              iam: { role: e?.provider?.iam?.role ?? 'DefaultLambdaRole' },
              environment: {
                STAGE: e?.provider?.environment?.STAGE ?? '${self:provider.stage}',
                REGION: e?.provider?.environment?.REGION ?? '${self:provider.region}',
                AWS_RESOURCE_PRIFIX: e?.provider?.environment?.AWS_RESOURCE_PRIFIX ?? '${self:custom.awsResourcePrefix}',
                LOG_LEVEL: e?.provider?.environment?.LOG_LEVEL ?? 'INFO',
              },
            },
            plugins: e?.plugins ?? ['serverless-webpack', 'serverless-prune-plugin'],
            functions: e?.functions ?? '${file(./serverless/ap-northeast-1/resources/functions.yml)}',
            resources: e?.resources ?? [],
            package: {
              individually: e?.package?.individually ?? !0,
              includeModules: e?.package?.includeModules ?? !0,
              patterns: e?.package?.patterns ?? ['!appsync/*,*', '!node_modules/**', '!resources/**', '!__tests__/**', '!.git/**', '!tmp/**'],
            },
            custom: {
              awsResourcePrefix: e?.custom?.awsResourcePrefix ?? '${self:service}-${self:provider.stage}-',
              webpack: e?.custom?.webpack ?? { includeModules: !0, packager: 'npm' },
              prune: e?.custom?.prune ?? { automatic: !0, number: 3 },
            },
          });
        };
      },
      6702: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.awsRegions = t.FeatureBuilderAbstract = t.FeatureHandlerAbstract = void 0);
        const n = r(a(2322)),
          s = a(6870);
        (t.FeatureHandlerAbstract = class {
          _argv;
          _lang;
          constructor(e) {
            (this._argv = e), (this._lang = e.lang);
          }
          get argv() {
            return this._argv;
          }
          get lang() {
            return this._lang;
          }
        }),
          (t.FeatureBuilderAbstract = class {
            _args;
            _npmVersion;
            _chalk;
            constructor(e) {
              (this._chalk = s.chalk), (this._args = e), (this._npmVersion = n.default.npmVersion);
            }
            get args() {
              return this._args;
            }
            get npmVersion() {
              return this._npmVersion;
            }
            get chalk() {
              return this._chalk;
            }
          }),
          (t.awsRegions = [
            'us-east-2',
            'us-east-1',
            'us-west-1',
            'us-west-2',
            'af-south-1',
            'ap-east-1',
            'ap-south-2',
            'ap-southeast-3',
            'ap-southeast-4',
            'ap-south-1',
            'ap-northeast-3',
            'ap-northeast-2',
            'ap-southeast-1',
            'ap-southeast-2',
            'ap-northeast-1',
            'ca-central-1',
            'eu-central-1',
            'eu-west-1',
            'eu-west-2',
            'eu-south-1',
            'eu-west-3',
            'eu-south-2',
            'eu-north-1',
            'eu-central-2',
            'me-south-1',
            'me-central-1',
            'sa-east-1',
            'us-gov-east-1',
            'us-gov-west-1',
          ]);
      },
      2762: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.asFullPath = t.createDirectories = t.isFileExists = t.isExistsDirectory = t.cleanUpTmpDirectory = t.moveDirectory = t.gitClone = void 0);
        const n = a(5033),
          s = r(a(6444)),
          o = r(a(4470)),
          i = r(a(2322)),
          l = r(a(6237)),
          u = r(a(1155)),
          c = r(a(1017));
        (t.gitClone = async function (e, t) {
          const a = s.default.getLogger();
          try {
            a.debug(`git clone : ${e} -> ${t}`),
              await o.default.promises.mkdir(t, { recursive: !0 }),
              await l.default.clone({ fs: o.default, http: u.default, dir: t, url: e, singleBranch: !0, depth: 1 });
          } catch (e) {
            const t = e;
            throw new n.CLIError(t.message);
          }
        }),
          (t.moveDirectory = function (e, t) {
            const a = s.default.getLogger();
            try {
              a.debug(`move : ${e} -> ${t}`), o.default.renameSync(e, t);
            } catch (e) {
              const t = e;
              throw new n.CLIError(t.message);
            }
          }),
          (t.cleanUpTmpDirectory = function () {
            const e = s.default.getLogger();
            try {
              e.debug(`clean up tmp directory : ${i.default.tmpPath}`),
                o.default.removeSync(i.default.tmpPath),
                e.debug(`create tmp directory : ${i.default.tmpPath}`),
                o.default.mkdirSync(i.default.tmpPath, { recursive: !0 });
            } catch (e) {
              const t = e;
              throw new n.CLIError(t.message);
            }
          }),
          (t.isExistsDirectory = function (e) {
            const t = s.default.getLogger();
            try {
              return t.debug(`check exists directory : ${e}`), o.default.statSync(e).isDirectory();
            } catch (e) {
              if ('ENOENT' === e.code) return !1;
              throw e;
            }
          }),
          (t.isFileExists = function (e) {
            try {
              return o.default.accessSync(e), !0;
            } catch (e) {
              return !1;
            }
          }),
          (t.createDirectories = (e) => {
            e.split(c.default.sep)
              .slice(0, -1)
              .reduce((e, t) => ((e = c.default.join(e, t)), o.default.existsSync(e) || o.default.mkdirSync(e), e), '');
          }),
          (t.asFullPath = (e) => c.default.join(i.default.currentPath, e));
      },
      8705: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = a(4361),
          s = a(4626),
          o = a(1770),
          i = r(a(6517));
        t.default = class {
          constructor(e) {
            (this._schema = e),
              (this._schemaComposer = i.default.isEmpty(e) ? [new n.SchemaComposer()] : e.map((e) => new n.SchemaComposer((0, o.addScalrs)(e)))),
              (this._mergedSchema = (0, s.mergeSchemas)({ schemas: this._schemaComposer.map((e) => e.buildSchema()) })),
              (this._mutations = this._schemaComposer.map((e) => {
                try {
                  return e.getOTC('Mutation').getFields();
                } catch (e) {
                  return {};
                }
              })),
              (this._queries = this._schemaComposer.map((e) => {
                try {
                  return e.getOTC('Query').getFields();
                } catch (e) {
                  return {};
                }
              })),
              (this._subscriptions = this._schemaComposer.map((e) => {
                try {
                  return e.getOTC('Subscription').getFields();
                } catch (e) {
                  return {};
                }
              }));
          }
          _mutations;
          get mutations() {
            return this._mutations;
          }
          _queries;
          get queries() {
            return this._queries;
          }
          _subscriptions;
          get subscriptions() {
            return this._subscriptions;
          }
          _schema;
          get schema() {
            return this._schema;
          }
          _schemaComposer;
          get schemaComposer() {
            return this._schemaComposer;
          }
          _mergedSchema;
          get mergedSchema() {
            return this._mergedSchema;
          }
          isExistsMutationApi(e) {
            return i.default.some(this.mutations, (t) => i.default.has(t, e));
          }
          isExistsQueryApi(e) {
            return i.default.some(this.queries, (t) => i.default.has(t, e));
          }
          isExistsSubscriptionApi(e) {
            return i.default.some(this.subscriptions, (t) => i.default.has(t, e));
          }
        };
      },
      1770: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.removeScalars = t.addScalrs = void 0);
        const a =
          '\n  scalar ID\n  scalar String\n  scalar Int\n  scalar Float\n  scalar Boolean\n  scalar AWSDate\n  scalar AWSTime\n  scalar AWSDateTime\n  scalar AWSTimestamp\n  scalar AWSEmail\n  scalar AWSJSON\n  scalar AWSPhone\n  scalar AWSURL\n  scalar AWSIPAddress\n';
        (t.addScalrs = (e) => `${a}\n  ${e}`), (t.removeScalars = (e) => e.replace(a, ''));
      },
      4259: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = a(4361),
          s = a(7343),
          o = r(a(6444)),
          i = r(a(6517)),
          l = a(2762),
          u = r(a(7147)),
          c = a(7347),
          d = a(1770);
        t.default = class {
          constructor(e) {
            (this.logger = o.default.getLogger()),
              (this._customSchemaPath = e?.customSchemaPath ?? this.defaultCustomSchemaPath),
              (this._defaultSchemaPath = e?.defaultSchemaPath ?? this.defaultDefaultSchemaPath),
              this.readOrSetCustomSchema(),
              this.readOrSetDefaultSchema(),
              (() => {
                this.customSchema && this.allSchemaComposer.merge((0, s.buildSchema)(this.customSchema)),
                  this.defaultSchema && this.allSchemaComposer.merge((0, s.buildSchema)(this.defaultSchema));
              })(),
              (() => {
                this.customSchema && this.customSchemaComposer.merge((0, s.buildSchema)(this.customSchema));
              })();
          }
          logger;
          defaultCustomSchemaPath = 'appsync/custom_schema.graphql';
          defaultDefaultSchemaPath = 'appsync/schema.graphql';
          _customSchemaPath;
          _defaultSchemaPath;
          _customSchemaComposer = new n.SchemaComposer();
          _allSchemaComposer = new n.SchemaComposer();
          _defaultSchema;
          _customSchema;
          get defaultSchemaPath() {
            return this._defaultSchemaPath;
          }
          get customSchemaPath() {
            return this._customSchemaPath;
          }
          get defaultSchema() {
            if (this._defaultSchema) return (0, d.addScalrs)(this._defaultSchema);
          }
          get customSchema() {
            if (this._customSchema) return (0, d.addScalrs)(this._customSchema);
          }
          get customSchemaComposer() {
            return this._customSchemaComposer;
          }
          get allSchemaComposer() {
            return this._allSchemaComposer;
          }
          readOrSetCustomSchema() {
            try {
              this._customSchema = u.default.readFileSync((0, l.asFullPath)(this.customSchemaPath), 'utf8');
            } catch (e) {
              this.logger.debug(e), this.logger.warn('custom_schema.graphql is not found.');
            }
          }
          readOrSetDefaultSchema() {
            try {
              this._defaultSchema = u.default.readFileSync((0, l.asFullPath)(this.defaultSchemaPath), 'utf8');
            } catch (e) {
              this.logger.debug(e), this.logger.warn('schema.graphql is not found.');
            }
          }
          listQueies() {
            return this.allSchemaComposer.getOTC('Query').getFields();
          }
          listMutation() {
            return this.allSchemaComposer.getOTC('Mutation').getFields();
          }
          listSubscription() {
            return this.allSchemaComposer.getOTC('Subscription').getFields();
          }
          addExampleInput(e) {
            return n.InputTypeComposer.create(`\n      input ${e}Input {\n        example: String!\n      },\n    `, this.customSchemaComposer);
          }
          addExampleType(e) {
            return n.ObjectTypeComposer.create(`\n      type ${e}Response {\n        example: String!\n      }\n    `, this.customSchemaComposer);
          }
          addMutationField(e) {
            const { apiName: t, input: a, type: r } = e;
            return this.customSchemaComposer.Mutation.addFields({ [t]: { type: r, args: { input: new s.GraphQLNonNull(a) } } }), this;
          }
          addQueryField(e) {
            const { apiName: t, args: a, type: r } = e;
            return this.customSchemaComposer.Query.addFields({ [t]: { type: r, args: a } }), this;
          }
          updateCustomSchemaGraphl(e) {
            const { query: t, mutation: a, callback: r } = e;
            let n = !1;
            if (
              (t || a
                ? (t && (i.default.has(this.listQueies(), t.apiName) ? (this.logger.warn(`Query ${t.apiName} is already exists.`), (n = !1)) : (this.addQueryField(t), (n = !0))),
                  a &&
                    (i.default.has(this.listMutation(), a.apiName)
                      ? (this.logger.warn(`Mutation ${a.apiName} is already exists.`), (n = !1))
                      : (this.addMutationField(a), (n = !0))))
                : this.logger.warn('query or mutation is empty.'),
              n)
            ) {
              const e = this.printSchema();
              u.default.writeFileSync((0, l.asFullPath)(this.defaultCustomSchemaPath), e, 'utf8'), this.logger.info((0, c.chalk)().green(e)), this.readOrSetCustomSchema();
            }
            r && r(n, { schemaPath: this.defaultCustomSchemaPath });
          }
          removeEmptyLines(e) {
            return e
              .split('\n')
              .filter((e) => !e.includes('""""""'))
              .join('\n');
          }
          printSchema() {
            const e = (0, n.printSchema)(this.customSchemaComposer.buildSchema()),
              t = this.removeEmptyLines(e);
            return (0, d.removeScalars)(t);
          }
        };
      },
      5837: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(6517));
        t.default = class {
          constructor(e) {
            this.input = e;
          }
          input;
          filters = [];
          filePath = () => (n.default.isString(this.input) && this.filters.push((e) => e.replace(/\s+/g, '')), this);
          removeAllSpace = () => (n.default.isString(this.input) && this.filters.push((e) => e.replace(/\s+/g, '')), this);
          value() {
            return n.default.isEmpty(this.filters) ? this.input : n.default.reduce(this.filters, (e, t) => t(e), this.input);
          }
        };
      },
      5265: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(9829)),
          s = r(a(6517));
        class o extends n.default {
          constructor(e, t, a) {
            super(e, t, a), (this.values = s.default.map(e.rows, (e) => e.value));
          }
        }
        t.default = o;
      },
      1092: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(6517));
        t.default = class {
          constructor(e) {
            this.input = e;
          }
          input;
          transforms = [];
          filePath = () => (n.default.isString(this.input) && this.transforms.push((e) => e.replace(/\s+/g, '')), this);
          removeAllSpace = () => (n.default.isString(this.input) && this.transforms.push((e) => e.replace(/\s+/g, '')), this);
          value() {
            return n.default.isEmpty(this.transforms) ? this.input : n.default.reduce(this.transforms, (e, t) => t(e), this.input);
          }
        };
      },
      6444: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(8545)),
          s = r(a(4233)),
          o = a(6870),
          i = r(a(6517)),
          l = (0, s.default)({
            colorize: !0,
            messageFormat: (e, t) => {
              const a = (t) => (30 === e.level ? o.chalk.white(t) : e.level < 30 ? o.chalk.grey(t) : 40 === e.level ? o.chalk.yellow(t) : e.level >= 50 ? o.chalk.red(t) : t),
                r = e[t];
              return i.default.isEmpty(r)
                ? i.default
                    .chain(e)
                    .omit(['level', 'time', 'pid', 'hostname'])
                    .thru((e) => JSON.stringify(e, null, 2))
                    .thru((e) => a(e))
                    .value()
                : e.requestId
                ? `[${e.requestId}] ${a(r)}`
                : a(r);
            },
            timestampKey: 'time',
            ignore: 'pid,hostname',
            include: 'level,time',
            singleLine: !1,
            translateTime: 'yyyy-mm-dd HH:MM:ss',
            sync: !0,
          });
        t.default = class {
          constructor() {
            throw new Error('singleton cannot be instantiated');
          }
          static logger;
          static getLogger(e) {
            return e
              ? ((this.logger = (0, n.default)({ level: e ?? 'info' }, l)), this.logger)
              : (this.logger || (this.logger = (0, n.default)({ level: e ?? 'info' }, l)), this.logger);
          }
        };
      },
      3448: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(6517));
        t.default = class {
          static parseFilePath(e) {
            const t = e.split('/'),
              a = t.slice(0, -1),
              r = t[t.length - 1];
            return [a.length > 0 ? a : [], r];
          }
          static parseSlsRecursivelyReference = (e) => {
            if (n.default.isEmpty(e)) return;
            const t = e.match(/\${file\((.*?)\)}/);
            return t ? t[1] : void 0;
          };
          static extractFilename(e) {
            const t = e.split('.');
            return 1 === t.length ? e : 2 === t.length ? t[0] : (t.pop(), t.join('.'));
          }
        };
      },
      7973: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const n = r(a(6517)),
          s = a(2414);
        t.default = class {
          constructor(e, t) {
            (this._input = e), (this._lang = t), (this._locale = (0, s.getLocaleLang)(this._lang));
          }
          _input;
          _lang;
          _locale;
          validations = [];
          get locale() {
            return this._locale;
          }
          get input() {
            return this._input;
          }
          required = () => (
            this.validations.push(() =>
              n.default.isUndefined(this.input) || n.default.isNull(this.input) || (n.default.isString(this.input) && n.default.isEmpty(this.input))
                ? this.locale.required
                : !(n.default.isArray(this.input) && !n.default.every(this.input)) || this.locale.required
            ),
            this
          );
          mustNoIncludeZenkaku = () => (
            this.validations.push(() => !n.default.isString(this.input) || !/[^\x01-\x7E]/.test(this.input.toString()) || this.locale.mustNoIncludeZenkaku), this
          );
          mustBeYamlFilePath = () => (
            this.validations.push(() => !n.default.isString(this.input) || !(!this.input.endsWith('.yml') && !this.input.endsWith('.yaml')) || this.locale.mustBeYamlFilePath), this
          );
          mustBeExtension = () => (this.validations.push(() => !n.default.isString(this.input) || !!/\.[^.]*$/.test(this.input) || this.locale.mustBeExtension), this);
          value() {
            for (let e = 0; e < this.validations.length; e++) {
              const t = this.validations[e]();
              if (n.default.isString(t)) return t;
            }
            return !0;
          }
        };
      },
      4179: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            mustBeYamlFilePath: 'input a yaml file path',
            mustNoIncludeZenkaku: 'must no include zenkaku',
            mustBeExtension: 'must be extension',
            required: 'required input',
          });
      },
      6028: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            mustBeYamlFilePath: 'Yamlファイルを指定して下さい',
            mustNoIncludeZenkaku: '全角を含めないでください',
            mustBeExtension: '文字列の最後は「.＋文字列」を入力して下さい',
            required: '入力必須',
          });
      },
      2414: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const n = r(a(6028)),
          s = r(a(4179));
        t.getLocaleLang = (e) => ('ja' === e ? n.default : s.default);
      },
      3462: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.loadYaml = t.writeYaml = void 0);
        const n = r(a(7147)),
          s = r(a(9793)),
          o = a(4355),
          i = a(2762);
        (t.writeYaml = (e, t) => {
          const a = s.default.dump(t, { schema: o.schema, indent: 2, lineWidth: -1 });
          return (0, i.createDirectories)(e), n.default.writeFileSync((0, i.asFullPath)(e), a, 'utf8'), a;
        }),
          (t.loadYaml = (e) => s.default.load(n.default.readFileSync((0, i.asFullPath)(e), 'utf8'), { schema: o.schema }));
      },
      6870: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.chalk = t.init = void 0);
        const n = r(a(7347));
        (t.init = () => n.default.font('SansSerif').helpStyle('grey').errorsStyle('red')), (t.chalk = n.default.chalk());
      },
      2726: (e) => {
        e.exports = require('@aws-cdk/assert');
      },
      7808: (e) => {
        e.exports = require('@aws-cdk/aws-iam');
      },
      5862: (e) => {
        e.exports = require('@aws-cdk/aws-lambda');
      },
      8890: (e) => {
        e.exports = require('@aws-cdk/aws-sns');
      },
      6324: (e) => {
        e.exports = require('@aws-cdk/aws-sns-subscriptions');
      },
      9087: (e) => {
        e.exports = require('@aws-cdk/aws-sqs');
      },
      6817: (e) => {
        e.exports = require('@aws-cdk/core');
      },
      4626: (e) => {
        e.exports = require('@graphql-tools/schema');
      },
      2e3: (e) => {
        e.exports = require('aws-cdk-lib');
      },
      8387: (e) => {
        e.exports = require('colorette');
      },
      4612: (e) => {
        e.exports = require('dateformat');
      },
      4563: (e) => {
        e.exports = require('fast-copy');
      },
      5376: (e) => {
        e.exports = require('fast-safe-stringify');
      },
      4470: (e) => {
        e.exports = require('fs-extra');
      },
      7343: (e) => {
        e.exports = require('graphql');
      },
      4361: (e) => {
        e.exports = require('graphql-compose');
      },
      3290: (e) => {
        e.exports = require('inquirer');
      },
      169: (e) => {
        e.exports = require('inquirer-autocomplete-prompt');
      },
      9829: (e) => {
        e.exports = require('inquirer-table-prompt');
      },
      6237: (e) => {
        e.exports = require('isomorphic-git');
      },
      1155: (e) => {
        e.exports = require('isomorphic-git/http/node');
      },
      9793: (e) => {
        e.exports = require('js-yaml');
      },
      6517: (e) => {
        e.exports = require('lodash');
      },
      2067: (e) => {
        e.exports = require('on-exit-leak-free');
      },
      8545: (e) => {
        e.exports = require('pino');
      },
      454: (e) => {
        e.exports = require('pino-abstract-transport');
      },
      7304: (e) => {
        e.exports = require('pump');
      },
      3248: (e) => {
        e.exports = require('readable-stream');
      },
      7915: (e) => {
        e.exports = require('secure-json-parse');
      },
      5246: (e) => {
        e.exports = require('sonic-boom');
      },
      4355: (e) => {
        e.exports = require('yaml-cfn');
      },
      7347: (e) => {
        e.exports = require('yargonaut');
      },
      9267: (e) => {
        e.exports = require('yargs/yargs');
      },
      7147: (e) => {
        e.exports = require('fs');
      },
      1017: (e) => {
        e.exports = require('path');
      },
      1267: (e) => {
        e.exports = require('worker_threads');
      },
      4233: (e, t, a) => {
        const { isColorSupported: r } = a(8387),
          n = a(7304),
          { Transform: s } = a(3248),
          o = a(454),
          i = a(7915),
          l = a(903),
          { ERROR_LIKE_KEYS: u, MESSAGE_KEY: c, TIMESTAMP_KEY: d, LEVEL_KEY: p, LEVEL_NAMES: m } = a(7318),
          {
            isObject: f,
            prettifyErrorLog: y,
            prettifyLevel: g,
            prettifyMessage: h,
            prettifyMetadata: v,
            prettifyObject: $,
            prettifyTime: S,
            buildSafeSonicBoom: _,
            filterLog: b,
            handleCustomlevelsOpts: w,
            handleCustomlevelNamesOpts: x,
          } = a(385),
          P = (e) => {
            try {
              return { value: i.parse(e, { protoAction: 'remove' }) };
            } catch (e) {
              return { err: e };
            }
          },
          E = {
            colorize: r,
            colorizeObjects: !0,
            crlf: !1,
            errorLikeObjectKeys: u,
            errorProps: '',
            customLevels: null,
            customColors: null,
            useOnlyCustomProps: !0,
            levelFirst: !1,
            messageKey: c,
            messageFormat: !1,
            timestampKey: d,
            translateTime: !0,
            useMetadata: !1,
            outputStream: process.stdout,
            customPrettifiers: {},
            hideObject: !1,
            ignore: 'hostname',
            include: void 0,
            singleLine: !1,
          };
        function N(e) {
          const t = Object.assign({}, E, e),
            a = t.crlf ? '\r\n' : '\n',
            r = '    ',
            n = t.messageKey,
            s = t.levelKey,
            o = t.levelLabel,
            i = t.minimumLevel,
            u = t.messageFormat,
            c = t.timestampKey,
            d = t.errorLikeObjectKeys,
            _ = t.errorProps.split(','),
            N = 'boolean' == typeof t.useOnlyCustomProps ? t.useOnlyCustomProps : 'true' === t.useOnlyCustomProps,
            q = w(t.customLevels),
            A = x(t.customLevels),
            L = t.customColors
              ? t.customColors.split(',').reduce((e, a) => {
                  const [r, n] = a.split(':'),
                    s = (N ? t.customLevels : void 0 !== A[r]) ? A[r] : m[r],
                    o = void 0 !== s ? s : r;
                  return e.push([o, n]), e;
                }, [])
              : void 0,
            D = { customLevels: q, customLevelNames: A };
          N && !t.customLevels && ((D.customLevels = void 0), (D.customLevelNames = void 0));
          const C = t.customPrettifiers,
            O = void 0 !== t.include ? new Set(t.include.split(',')) : void 0,
            R = !O && t.ignore ? new Set(t.ignore.split(',')) : void 0,
            k = t.hideObject,
            M = t.singleLine,
            j = l(t.colorize, L, N),
            I = t.colorizeObjects ? j : l(!1, [], !1);
          return function (e) {
            let l;
            if (f(e)) l = e;
            else {
              const t = P(e);
              if (t.err || !f(t.value)) return e + a;
              l = t.value;
            }
            if (i) {
              const e = ((N ? t.customLevels : void 0 !== A[i]) ? A[i] : m[i]) || Number(i);
              if (l[void 0 === s ? p : s] < e) return;
            }
            const w = h({ log: l, messageKey: n, colorizer: j, messageFormat: u, levelLabel: o, ...D, useOnlyCustomProps: N });
            (R || O) && (l = b({ log: l, ignoreKeys: R, includeKeys: O }));
            const x = g({ log: l, colorizer: j, levelKey: s, prettifier: C.level, ...D }),
              E = v({ log: l, prettifiers: C }),
              q = S({ log: l, translateFormat: t.translateTime, timestampKey: c, prettifier: C.time });
            let L = '';
            if (
              (t.levelFirst && x && (L = `${x}`),
              q && '' === L ? (L = `${q}`) : q && (L = `${L} ${q}`),
              !t.levelFirst && x && (L = L.length > 0 ? `${L} ${x}` : x),
              E && (L = L.length > 0 ? `${L} ${E}:` : E),
              !1 === L.endsWith(':') && '' !== L && (L += ':'),
              w && (L = L.length > 0 ? `${L} ${w}` : w),
              L.length > 0 && !M && (L += a),
              'Error' === l.type && l.stack)
            ) {
              const e = y({ log: l, errorLikeKeys: d, errorProperties: _, ident: r, eol: a });
              M && (L += a), (L += e);
            } else if (!k) {
              const e = [n, s, c].filter((e) => 'string' == typeof l[e] || 'number' == typeof l[e]),
                t = $({ input: l, skipKeys: e, customPrettifiers: C, errorLikeKeys: d, eol: a, ident: r, singleLine: M, colorizer: I });
              M && !/^\s$/.test(t) && (L += ' '), (L += t);
            }
            return L;
          };
        }
        function q(e = {}) {
          const t = N(e);
          return o(
            function (a) {
              const r = new s({
                objectMode: !0,
                autoDestroy: !0,
                transform(e, a, r) {
                  r(null, t(e));
                },
              });
              let o;
              return (
                (o =
                  'object' == typeof e.destination && 'function' == typeof e.destination.write
                    ? e.destination
                    : _({ dest: e.destination || 1, append: e.append, mkdir: e.mkdir, sync: e.sync })),
                a.on('unknown', function (e) {
                  o.write(e + '\n');
                }),
                n(a, r, o),
                r
              );
            },
            { parse: 'lines' }
          );
        }
        (e.exports = q), (e.exports.prettyFactory = N), (e.exports.colorizerFactory = l), (e.exports.default = q);
      },
      903: (e, t, a) => {
        const { LEVELS: r, LEVEL_NAMES: n } = a(7318),
          s = (e) => e,
          o = { default: s, 60: s, 50: s, 40: s, 30: s, 20: s, 10: s, message: s, greyMessage: s },
          { createColors: i } = a(8387),
          l = i({ useColor: !0 }),
          { white: u, bgRed: c, red: d, yellow: p, green: m, blue: f, gray: y, cyan: g } = l,
          h = { default: u, 60: c, 50: d, 40: p, 30: m, 20: f, 10: y, message: g, greyMessage: y };
        function v(e) {
          return function (t, a, { customLevels: s, customLevelNames: o } = {}) {
            const i = e ? s || r : Object.assign({}, r, s),
              l = e ? o || n : Object.assign({}, n, o);
            let u = 'default';
            u = Number.isInteger(+t) ? (Object.prototype.hasOwnProperty.call(i, t) ? t : u) : Object.prototype.hasOwnProperty.call(l, t.toLowerCase()) ? l[t.toLowerCase()] : u;
            const c = i[u];
            return Object.prototype.hasOwnProperty.call(a, u) ? a[u](c) : a.default(c);
          };
        }
        e.exports = function (e = !1, t, a) {
          return e && void 0 !== t
            ? (function (e, t) {
                const a = (function (e) {
                    return e.reduce(
                      function (e, [t, a]) {
                        return (e[t] = 'function' == typeof l[a] ? l[a] : u), e;
                      },
                      { default: u, message: g, greyMessage: y }
                    );
                  })(e),
                  r = t ? a : Object.assign({}, h, a),
                  n = v(t),
                  s = function (e, t) {
                    return n(e, r, t);
                  };
                return (s.message = s.message || r.message), (s.greyMessage = s.greyMessage || r.greyMessage), s;
              })(t, a)
            : e
            ? (function (e) {
                const t = v(e),
                  a = function (e, a) {
                    return t(e, h, a);
                  };
                return (a.message = h.message), (a.greyMessage = h.greyMessage), a;
              })(a)
            : (function (e) {
                const t = v(e),
                  a = function (e, a) {
                    return t(e, o, a);
                  };
                return (a.message = o.message), (a.greyMessage = o.greyMessage), a;
              })(a);
        };
      },
      7318: (e) => {
        e.exports = {
          DATE_FORMAT: 'yyyy-mm-dd HH:MM:ss.l o',
          DATE_FORMAT_SIMPLE: 'HH:MM:ss.l',
          ERROR_LIKE_KEYS: ['err', 'error'],
          MESSAGE_KEY: 'msg',
          LEVEL_KEY: 'level',
          LEVEL_LABEL: 'levelLabel',
          TIMESTAMP_KEY: 'time',
          LEVELS: { default: 'USERLVL', 60: 'FATAL', 50: 'ERROR', 40: 'WARN', 30: 'INFO', 20: 'DEBUG', 10: 'TRACE' },
          LEVEL_NAMES: { fatal: 60, error: 50, warn: 40, info: 30, debug: 20, trace: 10 },
          LOGGER_KEYS: ['pid', 'hostname', 'name', 'level', 'time', 'timestamp', 'caller'],
        };
      },
      385: (e, t, a) => {
        const { createCopier: r } = a(4563),
          n = a(4612),
          s = a(5246),
          o = a(5376),
          { isMainThread: i } = a(1267),
          l = a(903)(),
          { DATE_FORMAT: u, ERROR_LIKE_KEYS: c, MESSAGE_KEY: d, LEVEL_KEY: p, LEVEL_LABEL: m, TIMESTAMP_KEY: f, LOGGER_KEYS: y, LEVELS: g, DATE_FORMAT_SIMPLE: h } = a(7318),
          v = r({});
        function $(e, t = !1) {
          if (!1 === t) return e;
          const a = S(e);
          if (!_(a)) return e;
          if (!0 === t) return n(a, h);
          const r = t.toUpperCase();
          if ('SYS:STANDARD' === r) return n(a, u);
          const s = r.substr(0, 4);
          return n(a, 'SYS:' === s || 'UTC:' === s ? ('UTC:' === s ? t : t.slice(4)) : `UTC:${t}`);
        }
        function S(e) {
          let t = new Date(e);
          return _(t) || (t = new Date(+e)), t;
        }
        function _(e) {
          return e instanceof Date && !Number.isNaN(e.getTime());
        }
        function b(e) {
          return '[object Object]' === Object.prototype.toString.apply(e);
        }
        function w({ input: e, ident: t = '    ', eol: a = '\n' }) {
          const r = e.split(/\r?\n/);
          for (let e = 1; e < r.length; e += 1) r[e] = t + r[e];
          return r.join(a);
        }
        function x({
          input: e,
          ident: t = '    ',
          eol: a = '\n',
          skipKeys: r = [],
          customPrettifiers: n = {},
          errorLikeKeys: s = c,
          excludeLoggerKeys: i = !0,
          singleLine: u = !1,
          colorizer: d = l,
        }) {
          const p = [].concat(r);
          !0 === i && Array.prototype.push.apply(p, y);
          let m = '';
          const { plain: f, errors: g } = Object.entries(e).reduce(
            ({ plain: t, errors: a }, [r, o]) => {
              if (!1 === p.includes(r)) {
                const i = 'function' == typeof n[r] ? n[r](o, r, e) : o;
                s.includes(r) ? (a[r] = i) : (t[r] = i);
              }
              return { plain: t, errors: a };
            },
            { plain: {}, errors: {} }
          );
          return (
            u
              ? (Object.keys(f).length > 0 && (m += d.greyMessage(o(f))), (m += a), (m = m.replace(/\\\\/gi, '\\')))
              : Object.entries(f).forEach(([e, r]) => {
                  let s = 'function' == typeof n[e] ? r : o(r, null, 2);
                  if (void 0 === s) return;
                  s = s.replace(/\\\\/gi, '\\');
                  const i = w({ input: s, ident: t, eol: a });
                  m += `${t}${e}:${i.startsWith(a) ? '' : ' '}${i}${a}`;
                }),
            Object.entries(g).forEach(([e, r]) => {
              const s = 'function' == typeof n[e] ? r : o(r, null, 2);
              void 0 !== s && (m += P({ keyName: e, lines: s, eol: a, ident: t }));
            }),
            m
          );
        }
        function P({ keyName: e, lines: t, eol: a, ident: r }) {
          let n = '';
          const s = `${r}${e}: ${w({ input: t, ident: r, eol: a })}${a}`.split(a);
          for (let e = 0; e < s.length; e += 1) {
            0 !== e && (n += a);
            const t = s[e];
            if (/^\s*"stack"/.test(t)) {
              const e = /^(\s*"stack":)\s*(".*"),?$/.exec(t);
              if (e && 3 === e.length) {
                const r = /^\s*/.exec(t)[0].length + 4,
                  s = ' '.repeat(r),
                  o = e[2];
                n += e[1] + a + s + JSON.parse(o).replace(/\n/g, a + s);
              } else n += t;
            } else n += t;
          }
          return n;
        }
        function E(e) {
          const t = [];
          let a = !1,
            r = '';
          for (let n = 0; n < e.length; n++) {
            const s = e.charAt(n);
            '\\' !== s ? (a ? ((a = !1), (r += s)) : '.' !== s ? (r += s) : (t.push(r), (r = ''))) : (a = !0);
          }
          return r.length && t.push(r), t;
        }
        function N(e, t) {
          const a = Array.isArray(t) ? t : E(t);
          for (const t of a) {
            if (!Object.prototype.hasOwnProperty.call(e, t)) return;
            e = e[t];
          }
          return e;
        }
        function q(e, t) {
          const a = E(t),
            r = a.pop();
          null !== (e = N(e, a)) && 'object' == typeof e && Object.prototype.hasOwnProperty.call(e, r) && delete e[r];
        }
        function A() {}
        function L(e, t) {
          e.destroyed ||
            ('beforeExit' === t
              ? (e.flush(),
                e.on('drain', function () {
                  e.end();
                }))
              : e.flushSync());
        }
        (e.exports = {
          isObject: b,
          prettifyErrorLog: function ({ log: e, messageKey: t = d, ident: a = '    ', eol: r = '\n', errorLikeKeys: n = c, errorProperties: s = [] }) {
            let o = `${a}${w({ input: e.stack, ident: a, eol: r })}${r}`;
            if (s.length > 0) {
              const i = y.concat(t, 'type', 'stack');
              let l;
              l = '*' === s[0] ? Object.keys(e).filter((e) => !1 === i.includes(e)) : s.filter((e) => !1 === i.includes(e));
              for (let t = 0; t < l.length; t += 1) {
                const s = l[t];
                s in e != 0 &&
                  (o = b(e[s]) ? `${o}${a}${s}: {${r}${x({ input: e[s], errorLikeKeys: n, excludeLoggerKeys: !1, eol: r, ident: a + a })}${a}}${r}` : `${o}${a}${s}: ${e[s]}${r}`);
              }
            }
            return o;
          },
          prettifyLevel: function ({ log: e, colorizer: t = l, levelKey: a = p, prettifier: r, customLevels: n, customLevelNames: s }) {
            const o = N(e, a);
            return void 0 === o ? void 0 : r ? r(o) : t(o, { customLevels: n, customLevelNames: s });
          },
          prettifyMessage: function ({
            log: e,
            messageFormat: t,
            messageKey: a = d,
            colorizer: r = l,
            levelLabel: n = m,
            levelKey: s = p,
            customLevels: o,
            useOnlyCustomProps: i,
          }) {
            if (t && 'string' == typeof t) {
              const a = String(t).replace(/{([^{}]+)}/g, function (t, a) {
                let r;
                return a === n && void 0 !== (r = N(e, s)) ? ((i ? void 0 === o : void 0 === o[r]) ? g[r] : o[r]) : N(e, a) || '';
              });
              return r.message(a);
            }
            if (t && 'function' == typeof t) {
              const s = t(e, a, n);
              return r.message(s);
            }
            return a in e == 0 || 'string' != typeof e[a] ? void 0 : r.message(e[a]);
          },
          prettifyMetadata: function ({ log: e, prettifiers: t = {} }) {
            let a = '';
            if (e.name || e.pid || e.hostname) {
              if (((a += '('), e.name && (a += t.name ? t.name(e.name) : e.name), e.pid)) {
                const r = t.pid ? t.pid(e.pid) : e.pid;
                e.name && e.pid ? (a += '/' + r) : (a += r);
              }
              e.hostname && (a += `${'(' === a ? 'on' : ' on'} ${t.hostname ? t.hostname(e.hostname) : e.hostname}`), (a += ')');
            }
            return e.caller && (a += `${'' === a ? '' : ' '}<${t.caller ? t.caller(e.caller) : e.caller}>`), '' === a ? void 0 : a;
          },
          prettifyObject: x,
          prettifyTime: function ({ log: e, timestampKey: t = f, translateFormat: a, prettifier: r }) {
            let n = null;
            if ((t in e ? (n = e[t]) : 'timestamp' in e && (n = e.timestamp), null === n)) return;
            const s = a ? $(n, a) : n;
            return r ? r(s) : `[${s}]`;
          },
          buildSafeSonicBoom: function (e) {
            const t = new s(e);
            return (
              t.on('error', function e(a) {
                if ('EPIPE' === a.code) return (t.write = A), (t.end = A), (t.flushSync = A), void (t.destroy = A);
                t.removeListener('error', e);
              }),
              !e.sync &&
                i &&
                (function (e) {
                  if (global.WeakRef && global.WeakMap && global.FinalizationRegistry) {
                    const t = a(2067);
                    t.register(e, L),
                      e.on('close', function () {
                        t.unregister(e);
                      });
                  }
                })(t),
              t
            );
          },
          filterLog: function ({ log: e, ignoreKeys: t, includeKeys: a }) {
            const r = v(e);
            if (a) {
              const e = {};
              return (
                a.forEach((t) => {
                  e[t] = r[t];
                }),
                e
              );
            }
            return (
              t.forEach((e) => {
                q(r, e);
              }),
              r
            );
          },
          handleCustomlevelsOpts: function (e) {
            return e
              ? 'string' == typeof e
                ? e.split(',').reduce(
                    (e, t, a) => {
                      const [r, n = a] = t.split(':');
                      return (e[n] = r.toUpperCase()), e;
                    },
                    { default: 'USERLVL' }
                  )
                : '[object Object]' === Object.prototype.toString.call(e)
                ? Object.keys(e).reduce((t, a, r) => ((t[e[a]] = a.toUpperCase()), t), { default: 'USERLVL' })
                : {}
              : {};
          },
          handleCustomlevelNamesOpts: function (e) {
            return e
              ? 'string' == typeof e
                ? e.split(',').reduce((e, t, a) => {
                    const [r, n = a] = t.split(':');
                    return (e[r.toLowerCase()] = n), e;
                  }, {})
                : '[object Object]' === Object.prototype.toString.call(e)
                ? Object.keys(e).reduce((t, a, r) => ((t[a.toLowerCase()] = e[a]), t), {})
                : {}
              : {};
          },
        }),
          (e.exports.internals = {
            formatTime: $,
            joinLinesWithIndentation: w,
            prettifyError: P,
            getPropertyValue: N,
            deleteLogProperty: q,
            splitPropertyKey: E,
            createDate: S,
            isValidDate: _,
          });
      },
      4147: (e) => {
        e.exports = JSON.parse(
          '{"name":"ragate-cli","version":"0.2.0","description":"Anyone can immediately start a serverless project using the CLI, automatically generate source code, and start an infinitely extensible and maintainable serverless development project.","engines":{"node":">=18.x"},"scripts":{"test":"echo \'Sorry, test code is in preparation.\\n\'","build:dev":"ENV=development webpack","build:prd":"ENV=production webpack","lint":"eslint . --fix","format":"prettier . --write","prepare":"husky install"},"eslintIgnore":["!/.github",".serverless","bin","tmp","webpack.config.js"],"main":"./lib/app.ts","bin":{"ragate":"./bin/app.js"},"repository":{"type":"git","url":"git+https://github.com/ragate-inc/ragate-cli.git"},"lint-staged":{"*.{ts,js}":["eslint"],"*.{css,html,js,json,md,yaml,yml,ts,js}":["prettier . --write"]},"keywords":["aws","serverless","ragate","cli","amplify","serverless","lambda","amazon"],"author":"Ragate inc.","license":"MIT","bugs":{"url":"https://github.com/ragate-inc/ragate-cli/issues"},"homepage":"https://github.com/ragate-inc/ragate-cli#readme","devDependencies":{"@tsconfig/node-lts":"^18.12.1","@types/figlet":"^1.5.6","@types/fs-extra":"^11.0.1","@types/inquirer":"^9.0.3","@types/inquirer-autocomplete-prompt":"^3.0.0","@types/js-yaml":"^4.0.5","@types/lodash":"^4.14.194","@types/node":"^18.16.3","@types/webpack":"^5.28.1","@types/webpack-node-externals":"^3.0.0","@types/yargs":"^17.0.24","@typescript-eslint/eslint-plugin":"^5.59.2","@typescript-eslint/parser":"^5.59.2","eslint":"^8.39.0","eslint-config-prettier":"^8.8.0","eslint-config-standard-with-typescript":"^34.0.1","husky":"^6.0.0","lint-staged":"^13.2.2","prettier":"2.8.8","ts-loader":"^9.4.2","ts-node":"^10.9.1","tsconfig-paths-webpack-plugin":"^4.0.1","typescript":"^5.0.4","webpack":"^5.81.0","webpack-cli":"^5.0.2","webpack-node-externals":"^3.0.0"},"dependencies":{"@aws-cdk/assert":"^2.68.0","@aws-cdk/aws-iam":"^1.201.0","@aws-cdk/aws-sns":"^1.201.0","@aws-cdk/aws-sns-subscriptions":"^1.201.0","@aws-cdk/aws-sqs":"^1.201.0","aws-cdk-lib":"^2.79.1","figlet":"^1.6.0","fs-extra":"^11.1.1","graphql":"^16.6.0","graphql-compose":"^9.0.10","graphql-tools":"^8.3.20","inquirer":"^8.0.0","inquirer-autocomplete-prompt":"^2.0.0","inquirer-table-prompt":"^0.2.1","isomorphic-git":"^1.23.0","js-yaml":"^4.1.0","lodash":"^4.17.21","parent-require":"^1.0.0","pino":"^8.12.1","pino-pretty":"^10.0.0","yaml-cfn":"^0.3.2","yargonaut":"^1.1.4","yargs":"^17.1.1-candidate.0"}}'
        );
      },
    },
    t = {};
  !(function a(r) {
    var n = t[r];
    if (void 0 !== n) return n.exports;
    var s = (t[r] = { exports: {} });
    return e[r].call(s.exports, s, s.exports, a), s.exports;
  })(4712);
})();
