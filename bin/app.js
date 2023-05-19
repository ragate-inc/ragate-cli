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
        const s = r(a(9026));
        (async () => {
          const e = new s.default();
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
        const s = r(a(4147)),
          n = r(a(6517)),
          i = r(a(1017)),
          o = {
            npmVersion: s.default.version,
            repositoyUrl: 'https://github.com/ragate-inc/serverless-starter',
            tmpPath: `${i.default.dirname(process.argv[1])}/../tmp`,
            currentPath: i.default.resolve(),
            templates: n.default
              .chain([{ category: 'Node.js', name: 'Node.js - aws-node-appsync', value: 'aws-node-appsync' }])
              .sortBy('category')
              .map((e) => ({ name: `${e.category} - ${e.name}`, value: e.value }))
              .value(),
          };
        t.default = o;
      },
      9026: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = r(a(6444)),
          n = r(a(9267)),
          i = a(6870),
          o = r(a(2322)),
          l = a(8014),
          u = r(a(8798)),
          c = r(a(8072)),
          d = a(6702),
          p = r(a(6517)),
          m = a(2762);
        t.default = class {
          constructor() {
            try {
              (0, i.init)(), (this.chalk = i.chalk);
              const e = (0, n.default)(process.argv.slice(2))
                .options({
                  lang: { default: this.langRef.default, type: this.langRef.type },
                  verbose: { type: this.verboseRef.type },
                  region: { default: this.regionRef.default, type: this.regionRef.type },
                })
                .check((e) => ((e.verbose = p.default.hasIn(e, 'verbose')), !0))
                .help(!1)
                .version(!1)
                .parseSync();
              (this.lang = e.lang),
                (this.verbose = e.verbose),
                (this.region = e.region),
                (this.locale = (0, l.getLocaleLang)(e.lang)),
                (this.logger = s.default.getLogger(this.verbose ? 'debug' : 'info')),
                (this.npmVersion = o.default.npmVersion);
            } finally {
              (0, m.cleanUpTmpDirectory)();
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
            const t = s.default.getLogger();
            e.name && t.debug(e.name), e.stack && t.debug(e.stack), console.error('\n', i.chalk.red(e.message)), process.exit(1);
          }
          cli() {
            const { version: e, chalk: t, locale: a, lang: r } = this;
            return (0, n.default)(process.argv.slice(2))
              .scriptName('')
              .options({
                verbose: { describe: t.grey(a.options.describe.verbose), type: this.verboseRef.type },
                lang: { describe: t.grey(a.options.describe.lang), default: this.langRef.default, type: this.langRef.type },
                region: { alias: 'r', describe: t.grey(a.options.describe.region), default: this.regionRef.default, type: this.regionRef.type, choices: d.awsRegions },
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
              .command(
                '*',
                '',
                () => ({}),
                () => {
                  throw new Error(this.locale.unProcessed.notFound);
                }
              )
              .wrap(Math.max((0, n.default)().terminalWidth() - 5, 60))
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
            command: { description: { create: 'Create a new project', add: 'Add aws resouces' } },
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
            command: { description: { create: 'プロジェクトを作成', add: 'AWSリソースの追加' } },
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
        const s = r(a(6471)),
          n = r(a(1843));
        t.getLocaleLang = (e) => ('ja' === e ? s.default : n.default);
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
        const s = a(6702),
          n = r(a(6444)),
          i = r(a(9211)),
          o = r(a(592)),
          l = r(a(8785)),
          u = r(a(8806)),
          c = a(6870),
          d = a(7264);
        class p extends s.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            const t = this.args.lang,
              a = (0, d.getLocaleLang)(t),
              r = n.default.getLogger();
            return e
              .version(!1)
              .usage('Usage: add <command> <options>')
              .command(
                'sns',
                c.chalk.grey(a.command.description.sns),
                (e) => new i.default.builder(this.args).build(e),
                (e) => new i.default.handler(e).run()
              )
              .command(
                'sqs',
                c.chalk.grey(a.command.description.sns),
                (e) => new o.default.builder(this.args).build(e),
                (e) => new o.default.handler(e).run()
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
        class s extends r.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            return e.version(!1).usage('Usage: $0 api');
          }
        }
        t.default = s;
      },
      1723: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = r(a(6444)),
          n = a(6702),
          i = r(a(6517)),
          o = r(a(1325)),
          l = r(a(3290)),
          u = r(a(7973)),
          c = r(a(5837)),
          d = r(a(1092)),
          p = r(a(3448)),
          m = r(a(6849)),
          f = r(a(8391)),
          g = r(a(245)),
          h = r(a(7116)),
          y = a(8854);
        class v extends n.FeatureHandlerAbstract {
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
            const e = s.default.getLogger(),
              t = (0, y.getLocaleLang)(this.lang),
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
            const r = new o.default({ region: this.argv.region, serverlessConfigPath: a.serverlessConfigPath, lang: this.lang });
            if (!r.isExistsServelessConfig) throw new Error(t.error.notFoundServerlessConfig);
            const n = r.serverlessConfig;
            if (!(n.plugins ?? []).includes('serverless-appsync-plugin')) throw new Error(t.error.notInstalledAppSyncPlugin);
            const v = p.default.parseSlsRecursivelyReference(n.custom?.appSync);
            if (i.default.isEmpty(v)) throw new Error(`${t.error.invalidServerlessCustomAppSync} : \${file(./appsync/stack.yml)}`);
            const S = new h.default({ stackFilePath: v, lang: this.lang, region: this.argv.region }),
              _ = S.appSyncStack;
            if (_?.mappingTemplates.some((e) => e.type === a.apiType && e.field === a.apiName)) throw new Error(t.error.alreadyExistsMappingTemplate);
            if ('PIPELINE' === a.resolverType && _?.functionConfigurations.some((e) => e.name === `Mutation${a.apiName}`)) throw new Error(t.error.alreadyExistsResolver);
            if ('Mutation' === a.apiType) {
              if (_?.schema.isExistsMutationApi(a.apiName)) throw new Error(t.error.alreadyExistsAPI);
              return (0, m.default)({ appSyncStackService: S, lang: this.lang, slsConfig: r, info: a });
            }
            if ('Query' === a.apiType) {
              if (_?.schema.isExistsQueryApi(a.apiName)) throw new Error(t.error.alreadyExistsAPI);
              const { queryOperation: e } = await l.default.prompt([
                {
                  type: 'list',
                  name: 'queryOperation',
                  choices: ['Query', 'GetItem'],
                  message: t.inquirer.queryOperation,
                  validate: (e) => new u.default(e, this.lang).required().value(),
                },
              ]);
              if ('Query' === e) return (0, f.default)({ appSyncStackService: S, lang: this.lang, slsConfig: r, info: a });
              if ('GetItem' === e) return (0, g.default)({ appSyncStackService: S, lang: this.lang, slsConfig: r, info: a });
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
        const s = r(a(7352)),
          n = r(a(1723));
        t.default = { builder: s.default, handler: n.default };
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
        const s = r(a(6444)),
          n = r(a(3290)),
          i = r(a(7973)),
          o = r(a(2056)),
          l = r(a(1017)),
          u = r(a(6517)),
          c = a(7343),
          d = a(8854),
          p = a(6134);
        t.default = async (e) => {
          const { appSyncStackService: t, lang: a, slsConfig: r, info: m } = e,
            f = s.default.getLogger(),
            g = (0, d.getLocaleLang)(a);
          f.debug(`appsyncStack : ${JSON.stringify(t.appSyncStack)}`);
          const h = await (0, p.isCreateDataSource)({ lang: a, dataSource: t.appSyncStack?.dataSources ?? [] }),
            y = async (e) => {
              if ('AMAZON_DYNAMODB' === e.type) {
                const {
                  template: e,
                  primaryKeyName: t,
                  sortKeyName: r,
                } = await n.default.prompt([
                  {
                    type: 'list',
                    name: 'template',
                    choices: ['getItem', 'getItemConsistentRead', 'localResolver'],
                    message: g.services.common.inquirer.template,
                    validate: (e) => new i.default(e, a).required().value(),
                  },
                  {
                    type: 'input',
                    name: 'primaryKeyName',
                    message: g.services.common.inquirer.primaryKeyName,
                    default: () => 'Id',
                    filter: (e) => e.replace(/\s+/g, ''),
                    transformer: (e) => e.replace(/\s+/g, ''),
                    validate: (e) => new i.default(e, a).required().mustNoIncludeZenkaku().value(),
                  },
                  {
                    type: 'input',
                    name: 'sortKeyName',
                    message: g.services.common.inquirer.sortKeyName,
                    default: () => 'Sk',
                    filter: (e) => e.replace(/\s+/g, ''),
                    transformer: (e) => e.replace(/\s+/g, ''),
                    validate: (e) => new i.default(e, a).required().mustNoIncludeZenkaku().value(),
                  },
                ]);
                if ('getItem' === e)
                  return {
                    before: o.default.templates.vtl.dynamoGetItemRequest({ consistentRead: !1, primaryKeyName: t, sortKeyName: r }),
                    after: o.default.templates.vtl.dynamoGetItemResponse,
                  };
                if ('getItemConsistentRead' === e)
                  return {
                    before: o.default.templates.vtl.dynamoGetItemRequest({ consistentRead: !0, primaryKeyName: t, sortKeyName: r }),
                    after: o.default.templates.vtl.dynamoGetItemResponse,
                  };
                if ('localResolver' === e) return { before: o.default.templates.vtl.localResolverRequest, after: o.default.templates.vtl.localResolverResponse };
              } else {
                if ('AMAZON_ELASTICSEARCH' === e.type) {
                  const { indexName: e } = await n.default.prompt([
                    {
                      type: 'input',
                      name: 'indexName',
                      message: g.services.common.inquirer.indexName,
                      default: () => m.apiName,
                      filter: (e) => e.replace(/\s+/g, ''),
                      transformer: (e) => e.replace(/\s+/g, ''),
                      validate: (e) => new i.default(e, a).required().mustNoIncludeZenkaku().value(),
                    },
                  ]);
                  return { before: o.default.templates.vtl.openSearchQueryRequest({ indexName: e }), after: o.default.templates.vtl.openSearchQueryResponse };
                }
                if ('RELATIONAL_DATABASE' === e.type) return { before: o.default.templates.vtl.rdbQueryRequest, after: o.default.templates.vtl.rdbQueryResponse };
                if ('HTTP' === e.type) return { before: o.default.templates.vtl.httpQueryRequest, after: o.default.templates.vtl.httpQueryResponse };
              }
              return { before: '{}', after: '{}' };
            },
            v = await (async () =>
              h
                ? await (0, p.addLambda)({ appSyncStackService: t, lang: a, slsConfig: r, info: m })
                : await (0, p.selectDataSource)({ lang: a, appSyncStackService: t, slsConfig: r }))(),
            S = await (async (e) => {
              const { dataSource: a } = e;
              if ('UNIT' === m.resolverType) return Promise.resolve(void 0);
              const r = t.appSyncStack?.functionConfigurationsLocation ?? './',
                s = {
                  dataSource: a.name,
                  name: `${m.apiType}${u.default.upperFirst(m.apiName)}`,
                  request: 'AWS_LAMBDA' !== a.type && `functions/${m.apiType}.${m.apiName}.request.vtl`,
                  response: 'AWS_LAMBDA' !== a.type && `functions/${m.apiType}.${m.apiName}.response.vtl`,
                };
              if ('AWS_LAMBDA' !== a.type) {
                const { before: e, after: t } = await y(a);
                u.default.isString(s.request) && new o.default({ filePath: l.default.join(r, s.request), code: e, type: 'vtl' }).write(),
                  u.default.isString(s.response) && new o.default({ filePath: l.default.join(r, s.response), code: t, type: 'vtl' }).write();
              }
              return t.addFunctionConfiguration({ functionConfiguration: s }), f.debug('finished functionConfigurationsProcess'), Promise.resolve(s);
            })({ dataSource: v }),
            _ = await (async (e) => {
              const { dataSource: a, functionConfigurations: r } = e,
                s = await (async () => {
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
                      new o.default({ filePath: l.default.join(e, a.request), code: o.default.templates.vtl.pipelineBefore, type: 'vtl' }).write(),
                      new o.default({ filePath: l.default.join(e, a.response), code: o.default.templates.vtl.pipelineAfter, type: 'vtl' }).write(),
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
                      { before: s, after: n } = await y(a);
                    u.default.isString(e.request) && new o.default({ filePath: l.default.join(r, e.request), code: s, type: 'vtl' }).write(),
                      u.default.isString(e.response) && new o.default({ filePath: l.default.join(r, e.response), code: n, type: 'vtl' }).write();
                  }
                  return e;
                })();
              return t.addMappingTemplate({ mappingTemplate: s }), f.debug('finished mappingTemplateProcess'), s;
            })({ dataSource: v, functionConfigurations: S }),
            $ = await (async () => {
              const e = t.graphqlEditor,
                a = t.graphqlEditor.addExampleType(m.apiName);
              return (
                t.updateCustomSchemaGraphl({ query: { apiName: m.apiName, type: a.getType(), args: { example: { type: c.GraphQLString } } } }),
                f.debug('finished scheneGraphqlProcess'),
                Promise.resolve(e.customSchema)
              );
            })();
          f.debug({ dataSource: v, functionConfigurations: S, mappingTemplate: _, schemaGraphql: $ });
        };
      },
      6849: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = r(a(6444)),
          n = r(a(2056)),
          i = r(a(1017)),
          o = r(a(6517)),
          l = a(6134);
        t.default = async (e) => {
          const { appSyncStackService: t, lang: a, slsConfig: r, info: u } = e,
            c = s.default.getLogger();
          c.debug(`appsyncStack : ${JSON.stringify(t.appSyncStack)}`);
          const d = await (0, l.isCreateDataSource)({ lang: a, dataSource: t.appSyncStack?.dataSources ?? [] }),
            p = await (async () =>
              d
                ? await (0, l.addLambda)({ appSyncStackService: t, lang: a, slsConfig: r, info: u })
                : await (0, l.selectDataSource)({ lang: a, appSyncStackService: t, slsConfig: r }))(),
            m = await ((e) => {
              const { dataSource: a } = e;
              if ('UNIT' === u.resolverType) return Promise.resolve(void 0);
              const r = { dataSource: a.name, name: `${u.apiType}${o.default.upperFirst(u.apiName)}`, request: !1, response: !1 };
              return t.addFunctionConfiguration({ functionConfiguration: r }), c.debug('finished functionConfigurationsProcess'), Promise.resolve(r);
            })({ dataSource: p }),
            f = await (async (e) => {
              const { dataSource: a, functionConfigurations: r } = e,
                s = (() => {
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
                      new n.default({ filePath: i.default.join(e, a.request), code: n.default.templates.vtl.pipelineBefore, type: 'vtl' }).write(),
                      new n.default({ filePath: i.default.join(e, a.response), code: n.default.templates.vtl.pipelineAfter, type: 'vtl' }).write(),
                      a
                    );
                  }
                  return { dataSource: a.name, type: u.apiType, field: u.apiName, kind: u.resolverType, request: !1, response: !1 };
                })();
              return t.addMappingTemplate({ mappingTemplate: s }), c.debug('finished mappingTemplateProcess'), s;
            })({ dataSource: p, functionConfigurations: m }),
            g = await (async () => {
              const e = t.graphqlEditor,
                a = t.graphqlEditor.addExampleType(u.apiName),
                r = t.graphqlEditor.addExampleInput(u.apiName);
              return (
                t.updateCustomSchemaGraphl({ mutation: { apiName: u.apiName, type: a.getType(), input: r.getType() } }),
                c.debug('finished scheneGraphqlProcess'),
                Promise.resolve(e.customSchema)
              );
            })();
          c.debug({ dataSource: p, functionConfigurations: m, mappingTemplate: f, schemaGraphql: g });
        };
      },
      8391: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = r(a(6444)),
          n = r(a(3290)),
          i = r(a(7973)),
          o = r(a(2056)),
          l = r(a(1017)),
          u = r(a(6517)),
          c = a(7343),
          d = a(8854),
          p = a(6134);
        t.default = async (e) => {
          const { appSyncStackService: t, lang: a, slsConfig: r, info: m } = e,
            f = s.default.getLogger();
          f.debug(`appsyncStack : ${JSON.stringify(t.appSyncStack)}`);
          const g = (0, d.getLocaleLang)(a),
            h = await (0, p.isCreateDataSource)({ lang: a, dataSource: t.appSyncStack?.dataSources ?? [] }),
            y = async (e) => {
              if ('AMAZON_DYNAMODB' === e.type) {
                const {
                  template: e,
                  primaryKeyName: t,
                  sortKeyName: r,
                } = await n.default.prompt([
                  {
                    type: 'list',
                    name: 'template',
                    choices: ['query', 'queryWithGsi', 'scan'],
                    message: g.services.common.inquirer.template,
                    validate: (e) => new i.default(e, a).required().value(),
                  },
                  {
                    type: 'input',
                    name: 'primaryKeyName',
                    message: g.services.common.inquirer.primaryKeyName,
                    default: () => 'Id',
                    filter: (e) => e.replace(/\s+/g, ''),
                    transformer: (e) => e.replace(/\s+/g, ''),
                    validate: (e) => new i.default(e, a).required().mustNoIncludeZenkaku().value(),
                  },
                  {
                    type: 'input',
                    name: 'sortKeyName',
                    message: g.services.common.inquirer.sortKeyName,
                    default: () => 'Sk',
                    filter: (e) => e.replace(/\s+/g, ''),
                    transformer: (e) => e.replace(/\s+/g, ''),
                    validate: (e) => new i.default(e, a).required().mustNoIncludeZenkaku().value(),
                  },
                ]);
                if ('query' === e)
                  return { before: o.default.templates.vtl.dynamoQueryRequest({ primaryKeyName: t, sortKeyName: r }), after: o.default.templates.vtl.dynamoGetItemResponse };
                if ('queryWithGsi' === e) {
                  const { gsiName: e } = await n.default.prompt([
                    {
                      type: 'input',
                      name: 'gsiName',
                      message: g.services.generateQueryService.inquirer.gsiName,
                      default: () => 'ExampleIndex',
                      filter: (e) => e.replace(/\s+/g, ''),
                      transformer: (e) => e.replace(/\s+/g, ''),
                      validate: (e) => new i.default(e, a).required().mustNoIncludeZenkaku().value(),
                    },
                  ]);
                  return {
                    before: o.default.templates.vtl.dynamoQueryRequest({ gsiName: e, primaryKeyName: t, sortKeyName: r }),
                    after: o.default.templates.vtl.dynamoGetItemResponse,
                  };
                }
                if ('scan' === e) return { before: o.default.templates.vtl.dynamoScanRequest, after: o.default.templates.vtl.dynamoScanResponse };
              } else {
                if ('AMAZON_ELASTICSEARCH' === e.type) {
                  const { indexName: e } = await n.default.prompt([
                    {
                      type: 'input',
                      name: 'indexName',
                      message: g.services.common.inquirer.indexName,
                      default: () => m.apiName,
                      filter: (e) => e.replace(/\s+/g, ''),
                      transformer: (e) => e.replace(/\s+/g, ''),
                      validate: (e) => new i.default(e, a).required().mustNoIncludeZenkaku().value(),
                    },
                  ]);
                  return { before: o.default.templates.vtl.openSearchQueryRequest({ indexName: e }), after: o.default.templates.vtl.openSearchQueryResponse };
                }
                if ('RELATIONAL_DATABASE' === e.type) return { before: o.default.templates.vtl.rdbQueryRequest, after: o.default.templates.vtl.rdbQueryResponse };
                if ('HTTP' === e.type) return { before: o.default.templates.vtl.httpQueryRequest, after: o.default.templates.vtl.httpQueryResponse };
              }
              return { before: '{}', after: '{}' };
            },
            v = await (async () =>
              h
                ? await (0, p.addLambda)({ appSyncStackService: t, lang: a, slsConfig: r, info: m })
                : await (0, p.selectDataSource)({ lang: a, appSyncStackService: t, slsConfig: r }))(),
            S = await (async (e) => {
              const { dataSource: a } = e;
              if ('UNIT' === m.resolverType) return Promise.resolve(void 0);
              const r = t.appSyncStack?.functionConfigurationsLocation ?? './',
                s = {
                  dataSource: a.name,
                  name: `${m.apiType}${u.default.upperFirst(m.apiName)}`,
                  request: 'AWS_LAMBDA' !== a.type && `functions/${m.apiType}.${m.apiName}.request.vtl`,
                  response: 'AWS_LAMBDA' !== a.type && `functions/${m.apiType}.${m.apiName}.response.vtl`,
                };
              if ('AWS_LAMBDA' !== a.type) {
                const { before: e, after: t } = await y(a);
                u.default.isString(s.request) && new o.default({ filePath: l.default.join(r, s.request), code: e, type: 'vtl' }).write(),
                  u.default.isString(s.response) && new o.default({ filePath: l.default.join(r, s.response), code: t, type: 'vtl' }).write();
              }
              return t.addFunctionConfiguration({ functionConfiguration: s }), f.debug('finished functionConfigurationsProcess'), Promise.resolve(s);
            })({ dataSource: v }),
            _ = await (async (e) => {
              const { dataSource: a, functionConfigurations: r } = e,
                s = await (async () => {
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
                      new o.default({ filePath: l.default.join(e, a.request), code: o.default.templates.vtl.pipelineBefore, type: 'vtl' }).write(),
                      new o.default({ filePath: l.default.join(e, a.response), code: o.default.templates.vtl.pipelineAfter, type: 'vtl' }).write(),
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
                      { before: s, after: n } = await y(a);
                    u.default.isString(e.request) && new o.default({ filePath: l.default.join(r, e.request), code: s, type: 'vtl' }).write(),
                      u.default.isString(e.response) && new o.default({ filePath: l.default.join(r, e.response), code: n, type: 'vtl' }).write();
                  }
                  return e;
                })();
              return t.addMappingTemplate({ mappingTemplate: s }), f.debug('finished mappingTemplateProcess'), s;
            })({ dataSource: v, functionConfigurations: S }),
            $ = await (async () => {
              const e = t.graphqlEditor,
                a = t.graphqlEditor.addExampleType(m.apiName);
              return (
                t.updateCustomSchemaGraphl({ query: { apiName: m.apiName, type: a.getType(), args: { example: { type: c.GraphQLString } } } }),
                f.debug('finished scheneGraphqlProcess'),
                Promise.resolve(e.customSchema)
              );
            })();
          f.debug({ dataSource: v, functionConfigurations: S, mappingTemplate: _, schemaGraphql: $ });
        };
      },
      8854: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const s = r(a(3957)),
          n = r(a(4538));
        t.getLocaleLang = (e) => ('ja' === e ? s.default : n.default);
      },
      6134: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.selectDataSource = t.addLambda = t.isCreateDataSource = void 0);
        const s = r(a(3290)),
          n = r(a(7973)),
          i = r(a(1092)),
          o = r(a(5837)),
          l = r(a(2056)),
          u = a(6870),
          c = a(8854);
        (t.isCreateDataSource = async (e) => {
          const { lang: a, dataSource: r } = e,
            i = (0, c.getLocaleLang)(a),
            { createDataSource: o } = await s.default.prompt([
              {
                type: 'expand',
                name: 'createDataSource',
                message: i.services.common.inquirer.createDataSource,
                choices: [
                  { key: 'y', name: 'yes', value: !0 },
                  { key: 'n', name: 'no', value: !1 },
                ],
                validate: (e) => new n.default(e, a).required().value(),
              },
            ]);
          return o || (0 === r.length && (console.log(u.chalk.red(i.services.common.error.notFoundDataSource)), (0, t.isCreateDataSource)(e)));
        }),
          (t.addLambda = async (e) => {
            const { lang: t, slsConfig: a, info: r, appSyncStackService: u } = e,
              { apiName: d, apiType: p } = r,
              m = (0, c.getLocaleLang)(t),
              { lambdaFunctionName: f, lambdaHandler: g } = await s.default.prompt([
                {
                  type: 'input',
                  name: 'lambdaFunctionName',
                  message: m.services.common.inquirer.lambdaFunctionName,
                  default: () => d,
                  filter: (e) => e.replace(/\s+/g, ''),
                  transformer: (e) => e.replace(/\s+/g, ''),
                  validate: (e) => new n.default(e, t).required().mustNoIncludeZenkaku().value(),
                },
                {
                  type: 'input',
                  name: 'lambdaHandler',
                  message: m.services.common.inquirer.lambdaHandler,
                  default: () => `src/functions/appsync/${d}.handler`,
                  validate: (e) => new n.default(e, t).required().mustBeExtension().value(),
                  transformer: (e) => new i.default(e).removeAllSpace().value(),
                  filter: (e) => new o.default(e).removeAllSpace().value(),
                },
              ]);
            a.addFunction({ lambdaFunctionName: f, lambdaHandler: g, code: l.default.templates.typescript.skeleton });
            const h = {
              type: 'AWS_LAMBDA',
              name: f,
              description: `It is for ${p}.${d}`,
              config: {
                functionName: { Ref: `${f}LambdaFunction` },
                lambdaFunctionArn: { 'Fn::GetAtt': [`${f}LambdaFunction`, 'Arn'] },
                serviceRoleArn: { 'Fn::GetAtt': [u.appSyncLambdaRoleName, 'Arn'] },
              },
            };
            return u.addIamRoleByDataSource({ dataSource: 'AWS_LAMBDA', sls: a }), u.addDataSource(h), h;
          }),
          (t.selectDataSource = async (e) => {
            const { appSyncStackService: t, lang: a, slsConfig: r } = e,
              i = (0, c.getLocaleLang)(a),
              { dataSource: o } = await s.default.prompt([
                {
                  type: 'list',
                  name: 'dataSource',
                  choices: t.appSyncStack?.dataSources.map((e) => e.name),
                  message: i.services.common.inquirer.dataSource,
                  validate: (e) => new n.default(e, a).required().value(),
                },
              ]),
              l = t.appSyncStack?.dataSources.find((e) => e.name === o);
            return t.addIamRoleByDataSource({ dataSource: l.type, sls: r }), l;
          });
      },
      3582: (e, t, a) => {
        Object.defineProperty(t, '__esModule', { value: !0 });
        const r = a(6702);
        class s extends r.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            return e.version(!1).usage('Usage: $0 basic-auth-lambda');
          }
        }
        t.default = s;
      },
      306: function (e, t, a) {
        var r =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, a, r) {
                  void 0 === r && (r = a);
                  var s = Object.getOwnPropertyDescriptor(t, a);
                  (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                    (s = {
                      enumerable: !0,
                      get: function () {
                        return t[a];
                      },
                    }),
                    Object.defineProperty(e, r, s);
                }
              : function (e, t, a, r) {
                  void 0 === r && (r = a), (e[r] = t[a]);
                }),
          s =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, 'default', { enumerable: !0, value: t });
                }
              : function (e, t) {
                  e.default = t;
                }),
          n =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e) for (var a in e) 'default' !== a && Object.prototype.hasOwnProperty.call(e, a) && r(t, e, a);
              return s(t, e), t;
            },
          i =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = i(a(6444)),
          l = a(6702),
          u = i(a(3290)),
          c = i(a(7973)),
          d = i(a(1092)),
          p = i(a(5837)),
          m = n(a(7808)),
          f = n(a(2e3)),
          g = i(a(2056)),
          h = i(a(1325)),
          y = i(a(3624)),
          v = i(a(1325));
        class S extends l.FeatureHandlerAbstract {
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
            return y.default.generateCloudFormation(this.defaultLambdaRoleName, (e) => {
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
            return h.default.generateServerlessConfig({
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
            const e = o.default.getLogger(),
              t = await this.prompt();
            e.debug(`input values : ${JSON.stringify(t)}}`);
            const { functionName: a, serverlessConfigPath: r, lamndaRoleCfPath: s, lamndaRoleName: n, lambdaHandler: i } = t,
              l = new v.default({ region: this.argv.region, serverlessConfigPath: r, lang: this.lang });
            if ('us-east-1' !== l.region) throw new Error('lambda edge must be in us-east-1');
            l.addFunction({
              lambdaFunctionName: a,
              lambdaHandler: i,
              memorySize: this.lambdaEdgeMemorySize,
              timeout: this.lambdaEdgeTimeout,
              code: g.default.templates.typescript.basicauthlambda,
            }),
              l.addResource({ filePath: s, resourceName: n, cf: this.generateLambdaIamRoleCf() });
          }
        }
        t.default = S;
      },
      8785: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = r(a(3582)),
          n = r(a(306));
        t.default = { builder: s.default, handler: n.default };
      },
      6433: (e, t, a) => {
        Object.defineProperty(t, '__esModule', { value: !0 });
        const r = a(6702);
        class s extends r.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            return e.version(!1).usage('Usage: $0 sns');
          }
        }
        t.default = s;
      },
      2917: function (e, t, a) {
        var r =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, a, r) {
                  void 0 === r && (r = a);
                  var s = Object.getOwnPropertyDescriptor(t, a);
                  (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                    (s = {
                      enumerable: !0,
                      get: function () {
                        return t[a];
                      },
                    }),
                    Object.defineProperty(e, r, s);
                }
              : function (e, t, a, r) {
                  void 0 === r && (r = a), (e[r] = t[a]);
                }),
          s =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, 'default', { enumerable: !0, value: t });
                }
              : function (e, t) {
                  e.default = t;
                }),
          n =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e) for (var a in e) 'default' !== a && Object.prototype.hasOwnProperty.call(e, a) && r(t, e, a);
              return s(t, e), t;
            },
          i =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = i(a(6444)),
          l = a(6702),
          u = i(a(6517)),
          c = a(3362),
          d = i(a(3290)),
          p = i(a(7973)),
          m = i(a(5837)),
          f = i(a(1092)),
          g = i(a(3624)),
          h = n(a(8890)),
          y = n(a(9087)),
          v = n(a(6324)),
          S = n(a(5862)),
          _ = n(a(2e3)),
          $ = i(a(1325));
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
            return g.default.generateCloudFormation(e, (a) => {
              const r = new h.Topic(a, e, { topicName: e });
              return (
                t.forEach((t) => {
                  'email' === t
                    ? r.addSubscription(new v.EmailSubscription('****@****.com'))
                    : 'lambda' === t
                    ? r.addSubscription(
                        new v.LambdaSubscription(S.Function.fromFunctionArn(a, `${e}Lambda`, `arn:aws:lambda:${this.argv.region}:${_.Fn.ref('AWS::AccountId')}:function:*****`))
                      )
                    : 'sms' === t
                    ? r.addSubscription(new v.SmsSubscription('0000000000'))
                    : 'url' === t
                    ? r.addSubscription(new v.UrlSubscription('https://*****.com'))
                    : 'sqs' === t && r.addSubscription(new v.SqsSubscription(new y.Queue(a, `${e}SubscribeQueue`)));
                }),
                r
              );
            });
          }
          async run() {
            const e = o.default.getLogger(),
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
            const { resourceName: r, filePath: s, subscriptions: n, serverlessConfigPath: i } = a,
              l = new $.default({ region: this.argv.region, serverlessConfigPath: i, lang: this.lang }),
              g = this.generateSnsCf(r, n);
            l.addResource({ filePath: s, resourceName: r, cf: g });
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
        const s = r(a(6433)),
          n = r(a(2917));
        t.default = { builder: s.default, handler: n.default };
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
        const s = r(a(5423)),
          n = r(a(6353));
        t.getLocaleLang = (e) => ('ja' === e ? s.default : n.default);
      },
      6621: (e, t, a) => {
        Object.defineProperty(t, '__esModule', { value: !0 });
        const r = a(6702);
        class s extends r.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            return e.version(!1).usage('Usage: $0 sqs');
          }
        }
        t.default = s;
      },
      4267: function (e, t, a) {
        var r =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, a, r) {
                  void 0 === r && (r = a);
                  var s = Object.getOwnPropertyDescriptor(t, a);
                  (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                    (s = {
                      enumerable: !0,
                      get: function () {
                        return t[a];
                      },
                    }),
                    Object.defineProperty(e, r, s);
                }
              : function (e, t, a, r) {
                  void 0 === r && (r = a), (e[r] = t[a]);
                }),
          s =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, 'default', { enumerable: !0, value: t });
                }
              : function (e, t) {
                  e.default = t;
                }),
          n =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e) for (var a in e) 'default' !== a && Object.prototype.hasOwnProperty.call(e, a) && r(t, e, a);
              return s(t, e), t;
            },
          i =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = i(a(6444)),
          l = a(6702),
          u = i(a(6517)),
          c = i(a(3290)),
          d = i(a(7973)),
          p = i(a(5837)),
          m = i(a(1092)),
          f = n(a(9087)),
          g = i(a(3624)),
          h = i(a(1325));
        class y extends l.FeatureHandlerAbstract {
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
            return g.default.generateCloudFormation(e, (a) => {
              const r = 'Fifo' === t.queueType;
              if (t.useDeadLetterQueue) {
                const s = { queueName: `${e}DeadLetter` };
                r && u.default.assign(s, { queueName: `${e}DeadLetter.fifo`, fifo: !0 });
                const n = new f.Queue(a, `${e}DeadLetter`, s),
                  i = { queueName: e, fifo: r, maxMessageSizeBytes: this.defaultMaxMessageSizeBytes, deadLetterQueue: { maxReceiveCount: this.defaultMaxReceiveCount, queue: n } };
                return r && u.default.assign(i, { queueName: `${e}.fifo`, contentBasedDeduplication: t.contentBasedDeduplication }), new f.Queue(a, e, i);
              }
              const s = { queueName: e, fifo: r, maxMessageSizeBytes: this.defaultMaxMessageSizeBytes };
              return r && u.default.assign(s, { queueName: `${e}.fifo`, contentBasedDeduplication: t.contentBasedDeduplication }), new f.Queue(a, e, s);
            });
          }
          async run() {
            const e = o.default.getLogger(),
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
            const { resourceName: a, queueType: r, useDeadLetterQueue: s, contentBasedDeduplication: n, filePath: i, serverlessConfigPath: l } = t,
              u = new h.default({ region: this.argv.region, serverlessConfigPath: l, lang: this.lang }),
              f = this.generateSqsCf(a, { queueType: r, useDeadLetterQueue: s, contentBasedDeduplication: n });
            u.addResource({ filePath: i, resourceName: a, cf: f });
          }
        }
        t.default = y;
      },
      592: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = r(a(6621)),
          n = r(a(4267));
        t.default = { builder: s.default, handler: n.default };
      },
      8072: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = r(a(6040));
        t.default = { builder: s.default };
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
        const s = r(a(5699)),
          n = r(a(4005));
        t.getLocaleLang = (e) => ('ja' === e ? s.default : n.default);
      },
      3818: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(6702),
          n = a(6870),
          i = r(a(8798));
        class o extends s.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            return e
              .version(!1)
              .usage('Usage: create <options>')
              .command(
                '*',
                n.chalk.grey('<command> <options>'),
                () => ({}),
                (e) => {
                  if (1 === e._.length) return new i.default.handler(e).run();
                  throw new Error('locale.error.unProcessed');
                }
              );
          }
        }
        t.default = o;
      },
      975: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = r(a(3290)),
          n = r(a(2322)),
          i = a(2868),
          o = r(a(6517)),
          l = r(a(169)),
          u = a(2762),
          c = r(a(6444)),
          d = a(6702),
          p = r(a(1017));
        class m extends d.FeatureHandlerAbstract {
          constructor(e) {
            super(e), s.default.registerPrompt('autocomplete', l.default);
          }
          async run() {
            const { argv: e } = this,
              t = c.default.getLogger();
            t.debug('create hander : ', e);
            const a = (0, i.getLocaleLang)(this.lang),
              r = await s.default
                .prompt([
                  {
                    type: 'autocomplete',
                    name: 'template',
                    emptyText: a.inquirer.template.autocomplete.emptyText,
                    message: a.inquirer.template.choiceTemplate,
                    source: (e, t) => (o.default.isEmpty(t) ? n.default.templates : n.default.templates.filter((e) => e.name.includes(t))),
                  },
                  {
                    type: 'input',
                    name: 'projectName',
                    message: 'input a project name',
                    default: (e) => e.template,
                    validate: (e) => !o.default.isEmpty(e) || 'required input a project name',
                  },
                ])
                .then((e) => e);
            t.debug(`input values : ${JSON.stringify(r)}}`);
            const { template: l, projectName: d } = r;
            if (
              (t.info(`template : ${l}`),
              t.info(`projectName : ${d}`),
              t.debug(`check exists directory : ${p.default.join(n.default.currentPath, d)}`),
              (0, u.isExistsDirectory)(p.default.join(n.default.currentPath, d)))
            )
              throw new Error(`${a.error.alreadyExistsDirectory} : ${p.default.join(n.default.currentPath, d)}`);
            await (0, u.gitClone)(n.default.repositoyUrl, n.default.tmpPath), (0, u.moveDirectory)(p.default.join(n.default.tmpPath, l), p.default.join(n.default.currentPath, d));
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
        const s = r(a(3818)),
          n = r(a(975));
        t.default = { builder: s.default, handler: n.default };
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
        const s = r(a(7016)),
          n = r(a(7544));
        t.getLocaleLang = (e) => ('ja' === e ? s.default : n.default);
      },
      7116: function (e, t, a) {
        var r =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, a, r) {
                  void 0 === r && (r = a);
                  var s = Object.getOwnPropertyDescriptor(t, a);
                  (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                    (s = {
                      enumerable: !0,
                      get: function () {
                        return t[a];
                      },
                    }),
                    Object.defineProperty(e, r, s);
                }
              : function (e, t, a, r) {
                  void 0 === r && (r = a), (e[r] = t[a]);
                }),
          s =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, 'default', { enumerable: !0, value: t });
                }
              : function (e, t) {
                  e.default = t;
                }),
          n =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e) for (var a in e) 'default' !== a && Object.prototype.hasOwnProperty.call(e, a) && r(t, e, a);
              return s(t, e), t;
            },
          i =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = i(a(1017)),
          l = i(a(6444)),
          u = a(3462),
          c = i(a(8705)),
          d = i(a(6517)),
          p = i(a(7147)),
          m = i(a(2322)),
          f = i(a(3448)),
          g = i(a(3624)),
          h = n(a(7808)),
          y = n(a(2e3)),
          v = a(7347),
          S = i(a(4259));
        t.default = class {
          constructor(e) {
            (this.logger = l.default.getLogger()),
              (this._stackFilePath = e.stackFilePath),
              (this._lang = e.lang),
              (this._region = e.region),
              (this._defaultIamRolePath = `serverless/${e.region}/resources/iamrole/appsync.yml`),
              (this._graphqlEditor = new S.default()),
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
              { schema: t, dataSources: a, mappingTemplates: r, mappingTemplatesLocation: s, functionConfigurationsLocation: n, functionConfigurations: i } = e;
            this._appSyncStack = {
              mappingTemplatesLocation: s,
              functionConfigurationsLocation: n,
              functionConfigurations:
                d.default
                  .chain(i)
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
                    const t = p.default.readFileSync(o.default.join(m.default.currentPath, e), 'utf8');
                    return d.default.isEmpty(t) ? [] : [t];
                  }
                  return d.default.isArray(e) && !d.default.isEmpty(e)
                    ? e
                        .map((e) => {
                          const t = p.default.readFileSync(o.default.join(m.default.currentPath, e), 'utf8');
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
                  cf: g.default.generateCloudFormation(this.appSyncDynamoDBRoleName, (e) => {
                    const t = new h.Role(e, this.appSyncDynamoDBRoleName, { assumedBy: new h.ServicePrincipal('appsync.amazonaws.com') });
                    return (
                      t.addToPolicy(
                        new h.PolicyStatement({
                          effect: h.Effect.ALLOW,
                          resources: [y.Fn.join(':', ['arn:aws:dynamodb', this.region, y.Fn.ref('AWS::AccountId'), 'table/*'])],
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
                  cf: g.default.generateCloudFormation(this.appSyncRDSRoleName, (e) => {
                    const t = new h.Role(e, this.appSyncRDSRoleName, { assumedBy: new h.ServicePrincipal('appsync.amazonaws.com') });
                    return (
                      t.addToPolicy(
                        new h.PolicyStatement({
                          effect: h.Effect.ALLOW,
                          resources: [y.Fn.join(':', ['arn:aws:rds', this.region, y.Fn.ref('AWS::AccountId'), 'secret:*'])],
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
                        new h.PolicyStatement({
                          effect: h.Effect.ALLOW,
                          resources: [y.Fn.join(':', ['arn:aws:secretsmanager', this.region, y.Fn.ref('AWS::AccountId'), 'table/*'])],
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
                  cf: g.default.generateCloudFormation(
                    this.appSyncOpenSearchRoleName,
                    (e) => new h.Role(e, this.appSyncOpenSearchRoleName, { assumedBy: new h.ServicePrincipal('appsync.amazonaws.com') })
                  ),
                });
                break;
              case 'AWS_LAMBDA':
                a.addResource({
                  resourceName: this.appSyncLambdaRoleName,
                  filePath: this.defaultIamRolePath,
                  cf: g.default.generateCloudFormation(this.appSyncLambdaRoleName, (e) => {
                    const t = new h.Role(e, this.appSyncLambdaRoleName, { assumedBy: new h.ServicePrincipal('appsync.amazonaws.com') });
                    return (
                      t.addToPolicy(
                        new h.PolicyStatement({
                          effect: h.Effect.ALLOW,
                          resources: [y.Fn.join(':', ['arn:aws:lambda', this.region, y.Fn.ref('AWS::AccountId'), 'function:*'])],
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
                  cf: g.default.generateCloudFormation('AppSyncHttpRole', (e) => new h.Role(e, 'AppSyncHttpRole', { assumedBy: new h.ServicePrincipal('appsync.amazonaws.com') })),
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
        const s = r(a(6444)),
          n = a(6817),
          i = a(2726);
        t.default = class {
          static generateCloudFormation = (e, t) => {
            class a extends n.Stack {
              constructor(a, r, s) {
                super(a, r, s), t(this).node.defaultChild.overrideLogicalId(e);
              }
            }
            const r = s.default.getLogger(),
              o = new a(new n.App(), 'ragate'),
              l = i.SynthUtils.toCloudFormation(o);
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
        const s = r(a(3448)),
          n = r(a(5053)),
          i = r(a(7112)),
          o = a(2762),
          l = r(a(7147)),
          u = r(a(6444)),
          c = a(7347);
        t.default = class {
          static get templates() {
            return { typescript: n.default, vtl: i.default };
          }
          constructor(e) {
            const { filePath: t, code: a, type: r } = e,
              [n, i] = s.default.parseFilePath(t);
            (this.type = r),
              (this.filePath = t),
              (this.code = a),
              (this.destinationPath = n.join('/') + '/'),
              (this.fileName = 'typescript' === r ? s.default.extractFilename(i) : i),
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
            const e = `${(0, o.asFullPath)(this.destinationPath)}${this.fileName}.${this.extension}`;
            (0, o.isFileExists)(e)
              ? this.logger.info(`already exists file, skip write : ${e}`)
              : ((0, o.createDirectories)(this.destinationPath),
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
      5053: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = r(a(5955)),
          n = r(a(146));
        t.default = { basicauthlambda: s.default, skeleton: n.default };
      },
      146: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            "import { asyncHandlerWrapper } from 'functions/wrapper';\nimport { AppSyncResolverEvent, Context } from 'aws-lambda';\n\ntype Input = {\n  example: string;\n};\n\ntype Response = {\n  example: string;\n};\n\nexport const handler = asyncHandlerWrapper<AppSyncResolverEvent<Input>, Context, Response>(async (event) => {\n  console.log('It is skeleton 👻');\n});\n");
      },
      790: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = (e) =>
            `\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n## [Start] 共通設定\n#set( $primaryValue = "your primary key value" )\n#set( $sortKeyValue = "your sort key value" )\n## [End] 共通設定\n\n## [Start] 自動設定\n#set( $consistentRead = ${e.consistentRead.toString()} )\n#set( $primaryKey = "${
              e.primaryKeyName
            }" )\n#set( $sortKeyName = "${
              e.sortKeyName
            }" )\n## [End] 自動設定\n\n## [Start] バリデーション\n#set( $modelExpression = {\n    "version" : "2017-02-28",\n    "operation" : "GetItem",\n    "key" : {},\n    "consistentRead" : $consistentRead\n} )\n#if( $util.isNullOrEmpty($primaryValue) )\n  $util.error("PrimaryValue is null.", "InvalidIndexValueError")\n#else\n  $util.qr($modelExpression.key.put($primaryKey, $util.dynamodb.toDynamoDB($primaryValue)))\n#end\n#if( !$util.isNullOrEmpty($sortKeyName) && $util.isNullOrEmpty($sortKeyValue) )\n  $util.error("sortKeyValue is null.", "InvalidIndexValueError")\n#elseif( !$util.isNullOrEmpty($sortKeyName) && !$util.isNullOrEmpty($sortKeyValue) )\n  $util.qr($modelExpression.key.put($sortKeyName, $util.dynamodb.toDynamoDB($sortKeyValue)))\n#end\n## [End] バリデーション\n\n$util.toJson($modelExpression)\n`);
      },
      6178: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            '\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n#if( $ctx.error )\n  $util.error($ctx.error.message, $ctx.error.type)\n#else\n  $util.toJson($ctx.result)\n#end\n');
      },
      4771: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = (e) =>
            `\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n## [Start] 手動設定\n#set( $primaryValue = "your primary key value" )\n#set( $sortKeyValue = "your sort key value" )\n## [End] 手動設定\n\n## [Start] 自動設定\n${
              e?.gsiName ? `#set( $indexName = "${e?.gsiName}" )` : ''
            }\n#set( $args = $ctx.args )\n#set( $primaryKey = "${e.primaryKeyName}" )\n#set( $sortKeyName = "${
              e.sortKeyName
            }" )\n## [End] 自動設定\n\n## [Start] バリデーション\n#set( $modelQueryExpression = {} )\n#if( $util.isNullOrEmpty($primaryValue) )\n  $util.error("PrimaryValue is null.", "InvalidIndexValueError")\n#else\n  #set( $modelQueryExpression.expression = "#$primaryKey = :$primaryKey" )\n  #set( $modelQueryExpression.expressionNames = {\n    "#$primaryKey": $primaryKey\n  })\n  #set( $modelQueryExpression.expressionValues = {\n    ":$primaryKey": $util.dynamodb.toDynamoDB($primaryValue)\n  })\n#end\n## [End] バリデーション\n\n## [Start] ソートキー用クエリー生成\n#if( !$util.isNullOrEmpty($sortKeyName) && !$util.isNullOrEmpty($sortKeyValue) )\n  #if( !$util.isNull($sortKeyValue.beginsWith) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND begins_with(#sortKey, :sortKey)" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey",  $util.dynamodb.toDynamoDB("$sortKeyValue.beginsWith") ))\n  #elseif( !$util.isNull($sortKeyValue.between) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey BETWEEN :sortKey0 AND :sortKey1" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey0", $util.dynamodb.toDynamoDB("$sortKeyValue.between[0]") ))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey1", $util.dynamodb.toDynamoDB("$sortKeyValue.between[1]") ))\n  #elseif( !$util.isNull($sortKeyValue.eq) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey = :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.eq") ))\n  #elseif( !$util.isNull($sortKeyValue.lt) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey < :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.lt") ))\n  #elseif( !$util.isNull($sortKeyValue.le) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey <= :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.le") ))\n  #elseif( !$util.isNull($sortKeyValue.gt) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey > :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.gt") ))\n  #elseif( !$util.isNull($sortKeyValue.ge) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey >= :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.ge") ))\n  #elseif( !$util.isNull($sortKeyValue.contains) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND contains(#sortKey, :sortKey)" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.contains") ))\n  #elseif( !$util.isNull($sortKeyValue.notContains) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND notContains(#sortKey, :sortKey)" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.notContains") ))\n  #else\n  #end\n#end\n## [End] ソートキー用クエリー生成\n\n## [Start] VTL文字列出力\n#set( $limit = $util.defaultIfNull($args.limit, 100) )\n#set( $request = {\n  "version": "2018-05-29",\n  "limit": $limit\n} )\n#if( $args.nextToken && !$util.isNullOrEmpty($args.nextToken) )\n  #set( $request.nextToken = $args.nextToken )\n#end\n#if( $args.filter )\n  #set( $request.filter = $util.parseJson("$util.transform.toDynamoDBFilterExpression($args.filter)") )\n#end\n#if( !$util.isNull($modelQueryExpression) && !$util.isNullOrEmpty($modelQueryExpression.expression) )\n  $util.qr($request.put("operation", "Query"))\n  $util.qr($request.put("query", $modelQueryExpression))\n  #if( $util.isNullOrEmpty($args.sortDirection) )\n    #set( $request.scanIndexForward = false )\n  #elseif( $args.sortDirection == "ASC" )\n    #set( $request.scanIndexForward = true )\n  #elseif( $args.sortDirection == "DESC" )\n    #set( $request.scanIndexForward = false )\n  #end\n#else\n  $util.qr($request.put("operation", "Scan"))\n#end\n#if(!$util.isNull($indexName))\n    $util.qr($request.put("index", $indexName))\n#end\n$util.toJson($request)\n## [End] VTL文字列出力`);
      },
      7230: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            '\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n#if( $ctx.error )\n  $util.error($ctx.error.message, $ctx.error.type)\n#else\n  $util.toJson($ctx.result)\n#end\n');
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
        const s = r(a(4709)),
          n = r(a(5951)),
          i = r(a(8520)),
          o = r(a(8382)),
          l = r(a(4771)),
          u = r(a(7230)),
          c = r(a(2525)),
          d = r(a(9064)),
          p = r(a(790)),
          m = r(a(6178)),
          f = r(a(2592)),
          g = r(a(2922)),
          h = r(a(2292)),
          y = r(a(9768)),
          v = r(a(1954)),
          S = r(a(8002));
        t.default = {
          pipelineAfter: s.default,
          pipelineBefore: n.default,
          dynamoGetItemRequest: p.default,
          dynamoGetItemResponse: m.default,
          dynamoQueryRequest: l.default,
          dynamoQueryResponse: u.default,
          localResolverRequest: i.default,
          localResolverResponse: o.default,
          dynamoScanRequest: c.default,
          dynamoScanResponse: d.default,
          openSearchQueryRequest: f.default,
          openSearchQueryResponse: g.default,
          httpQueryRequest: h.default,
          httpQueryResponse: y.default,
          rdbQueryRequest: v.default,
          rdbQueryResponse: S.default,
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
                  var s = Object.getOwnPropertyDescriptor(t, a);
                  (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                    (s = {
                      enumerable: !0,
                      get: function () {
                        return t[a];
                      },
                    }),
                    Object.defineProperty(e, r, s);
                }
              : function (e, t, a, r) {
                  void 0 === r && (r = a), (e[r] = t[a]);
                }),
          s =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, 'default', { enumerable: !0, value: t });
                }
              : function (e, t) {
                  e.default = t;
                }),
          n =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e) for (var a in e) 'default' !== a && Object.prototype.hasOwnProperty.call(e, a) && r(t, e, a);
              return s(t, e), t;
            },
          i =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = i(a(1017)),
          l = i(a(6444)),
          u = a(7347),
          c = i(a(6517)),
          d = a(3462),
          p = i(a(3448)),
          m = i(a(2056)),
          f = i(a(3624)),
          g = n(a(7808)),
          h = n(a(2e3));
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
              { filePath: a, resourceName: r, cf: s } = e;
            (() => {
              const e = this.serverlessConfig,
                r = o.default.join('./', a),
                s = e.resources ?? [];
              if (s.some((e) => e.includes(r))) t.warn(`already exists resource file path : ${r}`);
              else {
                s.push(`\${file(./${r})}`);
                const a = (0, d.writeYaml)(this.serverlessConfigPath, { ...e, resources: s });
                t.info(r), t.info((0, u.chalk)().green(a));
              }
            })(),
              (() => {
                try {
                  const e = (0, d.loadYaml)(a) ?? {};
                  if (c.default.has(e, `Resources.${r}`)) t.warn(`resource name : ${r}`), t.warn(`already exists resource file path : ${a}`);
                  else {
                    const r = (0, d.writeYaml)(a, { ...e, Resources: { ...e.Resources, ...s } });
                    t.info(a), t.info(`over right : ${a}`), t.info((0, u.chalk)().green(r));
                  }
                } catch (e) {
                  const r = (0, d.writeYaml)(a, { Resources: { ...s } });
                  t.info(`created yaml file : ${a}`), t.info((0, u.chalk)().green(r));
                }
              })();
          };
          addFunction = (e) => {
            if (this.cannotProces()) return;
            const { lambdaFunctionName: t, lambdaHandler: a, memorySize: r, timeout: s, code: n } = e,
              i = this.logger;
            i.debug("functionsYamlPath', functionsYamlPath"),
              (() => {
                const e = this.serverlessConfig;
                if (c.default.isEmpty(e.functions)) {
                  const t = (0, d.writeYaml)(this.serverlessConfigPath, { ...e, functions: `\${file(./${this.defaultFunctionYamlPath})}` });
                  i.info('write functions property'), i.info((0, u.chalk)().green(t));
                }
              })(),
              (() => {
                const e = this.functionsYamlPath ?? this.defaultFunctionYamlPath;
                try {
                  const n = (0, d.loadYaml)(e) ?? {};
                  if (c.default.has(n, t)) i.warn(`already exists lambda function at, skip update : ${t}`);
                  else {
                    const o = (0, d.writeYaml)(e, {
                      ...n,
                      ...this.generateFunctionYamlProperty(t, { handler: a, memorySize: r ?? this.defaultMemorySize, timeout: s ?? this.defaultLambdaTimeOut }),
                    });
                    i.info('write functions property'), i.info((0, u.chalk)().green(o));
                  }
                } catch (n) {
                  const o = (0, d.writeYaml)(e, {
                    ...this.generateFunctionYamlProperty(t, { handler: a, memorySize: r ?? this.defaultMemorySize, timeout: s ?? this.defaultLambdaTimeOut }),
                  });
                  i.info('write functions property'), i.info((0, u.chalk)().green(o));
                }
              })(),
              new m.default({ filePath: a, code: n, type: 'typescript' }).write(),
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
              const a = new g.Role(t, e, { assumedBy: new g.ServicePrincipal('lambda.amazonaws.com') });
              return (
                a.addToPolicy(
                  new g.PolicyStatement({
                    effect: g.Effect.ALLOW,
                    resources: [h.Fn.join(':', ['arn:aws:logs', h.Fn.ref('AWS::Region'), h.Fn.ref('AWS::AccountId'), 'log-group:/aws/lambda/*:*:*'])],
                    actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
                  })
                ),
                a.addToPolicy(
                  new g.PolicyStatement({
                    effect: g.Effect.ALLOW,
                    resources: [h.Fn.join(':', ['arn:aws:logs', this.region, h.Fn.ref('AWS::AccountId'), 'log-group:/aws/lambda/*:*:*'])],
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
        const s = r(a(2322)),
          n = a(6870);
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
              (this._chalk = n.chalk), (this._args = e), (this._npmVersion = s.default.npmVersion);
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
        const s = a(5033),
          n = r(a(6444)),
          i = r(a(4470)),
          o = r(a(2322)),
          l = r(a(6237)),
          u = r(a(1155)),
          c = r(a(1017));
        (t.gitClone = async function (e, t) {
          const a = n.default.getLogger();
          try {
            a.debug(`git clone : ${e} -> ${t}`),
              await i.default.promises.mkdir(t, { recursive: !0 }),
              await l.default.clone({ fs: i.default, http: u.default, dir: t, url: e, singleBranch: !0, depth: 1 });
          } catch (e) {
            const t = e;
            throw new s.CLIError(t.message);
          }
        }),
          (t.moveDirectory = function (e, t) {
            const a = n.default.getLogger();
            try {
              a.debug(`move : ${e} -> ${t}`), i.default.renameSync(e, t);
            } catch (e) {
              const t = e;
              throw new s.CLIError(t.message);
            }
          }),
          (t.cleanUpTmpDirectory = function () {
            const e = n.default.getLogger();
            try {
              e.debug(`clean up tmp directory : ${o.default.tmpPath}`),
                i.default.removeSync(o.default.tmpPath),
                e.debug(`create tmp directory : ${o.default.tmpPath}`),
                i.default.mkdirSync(o.default.tmpPath, { recursive: !0 });
            } catch (e) {
              const t = e;
              throw new s.CLIError(t.message);
            }
          }),
          (t.isExistsDirectory = function (e) {
            const t = n.default.getLogger();
            try {
              return t.debug(`check exists directory : ${e}`), i.default.statSync(e).isDirectory();
            } catch (e) {
              if ('ENOENT' === e.code) return !1;
              throw e;
            }
          }),
          (t.isFileExists = function (e) {
            try {
              return i.default.accessSync(e), !0;
            } catch (e) {
              return !1;
            }
          }),
          (t.createDirectories = (e) => {
            e.split(c.default.sep)
              .slice(0, -1)
              .reduce((e, t) => ((e = c.default.join(e, t)), i.default.existsSync(e) || i.default.mkdirSync(e), e), '');
          }),
          (t.asFullPath = (e) => c.default.join(o.default.currentPath, e));
      },
      8705: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(4361),
          n = a(4626),
          i = a(1770),
          o = r(a(6517));
        t.default = class {
          constructor(e) {
            (this._schema = e),
              (this._schemaComposer = o.default.isEmpty(e) ? [new s.SchemaComposer()] : e.map((e) => new s.SchemaComposer((0, i.addScalrs)(e)))),
              (this._mergedSchema = (0, n.mergeSchemas)({ schemas: this._schemaComposer.map((e) => e.buildSchema()) })),
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
            return o.default.some(this.mutations, (t) => o.default.has(t, e));
          }
          isExistsQueryApi(e) {
            return o.default.some(this.queries, (t) => o.default.has(t, e));
          }
          isExistsSubscriptionApi(e) {
            return o.default.some(this.subscriptions, (t) => o.default.has(t, e));
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
        const s = a(4361),
          n = a(7343),
          i = r(a(6444)),
          o = r(a(6517)),
          l = a(2762),
          u = r(a(7147)),
          c = a(7347),
          d = a(1770);
        t.default = class {
          constructor(e) {
            (this.logger = i.default.getLogger()),
              (this._customSchemaPath = e?.customSchemaPath ?? this.defaultCustomSchemaPath),
              (this._defaultSchemaPath = e?.defaultSchemaPath ?? this.defaultDefaultSchemaPath),
              this.readOrSetCustomSchema(),
              this.readOrSetDefaultSchema(),
              (() => {
                this.customSchema && this.allSchemaComposer.merge((0, n.buildSchema)(this.customSchema)),
                  this.defaultSchema && this.allSchemaComposer.merge((0, n.buildSchema)(this.defaultSchema));
              })(),
              (() => {
                this.customSchema && this.customSchemaComposer.merge((0, n.buildSchema)(this.customSchema));
              })();
          }
          logger;
          defaultCustomSchemaPath = 'appsync/custom_schema.graphql';
          defaultDefaultSchemaPath = 'appsync/schema.graphql';
          _customSchemaPath;
          _defaultSchemaPath;
          _customSchemaComposer = new s.SchemaComposer();
          _allSchemaComposer = new s.SchemaComposer();
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
            return s.InputTypeComposer.create(`\n      input ${e}Input {\n        example: String!\n      },\n    `, this.customSchemaComposer);
          }
          addExampleType(e) {
            return s.ObjectTypeComposer.create(`\n      type ${e}Response {\n        example: String!\n      }\n    `, this.customSchemaComposer);
          }
          addMutationField(e) {
            const { apiName: t, input: a, type: r } = e;
            return this.customSchemaComposer.Mutation.addFields({ [t]: { type: r, args: { input: new n.GraphQLNonNull(a) } } }), this;
          }
          addQueryField(e) {
            const { apiName: t, args: a, type: r } = e;
            return this.customSchemaComposer.Query.addFields({ [t]: { type: r, args: a } }), this;
          }
          updateCustomSchemaGraphl(e) {
            const { query: t, mutation: a, callback: r } = e;
            let s = !1;
            if (
              (t || a
                ? (t && (o.default.has(this.listQueies(), t.apiName) ? (this.logger.warn(`Query ${t.apiName} is already exists.`), (s = !1)) : (this.addQueryField(t), (s = !0))),
                  a &&
                    (o.default.has(this.listMutation(), a.apiName)
                      ? (this.logger.warn(`Mutation ${a.apiName} is already exists.`), (s = !1))
                      : (this.addMutationField(a), (s = !0))))
                : this.logger.warn('query or mutation is empty.'),
              s)
            ) {
              const e = this.printSchema();
              u.default.writeFileSync((0, l.asFullPath)(this.defaultCustomSchemaPath), e, 'utf8'), this.logger.info((0, c.chalk)().green(e)), this.readOrSetCustomSchema();
            }
            r && r(s, { schemaPath: this.defaultCustomSchemaPath });
          }
          removeEmptyLines(e) {
            return e
              .split('\n')
              .filter((e) => !e.includes('""""""'))
              .join('\n');
          }
          printSchema() {
            const e = (0, s.printSchema)(this.customSchemaComposer.buildSchema()),
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
        const s = r(a(6517));
        t.default = class {
          constructor(e) {
            this.input = e;
          }
          input;
          filters = [];
          filePath = () => (s.default.isString(this.input) && this.filters.push((e) => e.replace(/\s+/g, '')), this);
          removeAllSpace = () => (s.default.isString(this.input) && this.filters.push((e) => e.replace(/\s+/g, '')), this);
          value() {
            return s.default.isEmpty(this.filters) ? this.input : s.default.reduce(this.filters, (e, t) => t(e), this.input);
          }
        };
      },
      1092: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = r(a(6517));
        t.default = class {
          constructor(e) {
            this.input = e;
          }
          input;
          transforms = [];
          filePath = () => (s.default.isString(this.input) && this.transforms.push((e) => e.replace(/\s+/g, '')), this);
          removeAllSpace = () => (s.default.isString(this.input) && this.transforms.push((e) => e.replace(/\s+/g, '')), this);
          value() {
            return s.default.isEmpty(this.transforms) ? this.input : s.default.reduce(this.transforms, (e, t) => t(e), this.input);
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
        const s = r(a(8545)),
          n = r(a(4233)),
          i = a(6870),
          o = r(a(6517)),
          l = (0, n.default)({
            colorize: !0,
            messageFormat: (e, t) => {
              const a = (t) => (30 === e.level ? i.chalk.white(t) : e.level < 30 ? i.chalk.grey(t) : 40 === e.level ? i.chalk.yellow(t) : e.level >= 50 ? i.chalk.red(t) : t),
                r = e[t];
              return o.default.isEmpty(r)
                ? o.default
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
              ? ((this.logger = (0, s.default)({ level: e ?? 'info' }, l)), this.logger)
              : (this.logger || (this.logger = (0, s.default)({ level: e ?? 'info' }, l)), this.logger);
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
        const s = r(a(6517));
        t.default = class {
          static parseFilePath(e) {
            const t = e.split('/'),
              a = t.slice(0, -1),
              r = t[t.length - 1];
            return [a.length > 0 ? a : [], r];
          }
          static parseSlsRecursivelyReference = (e) => {
            if (s.default.isEmpty(e)) return;
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
        const s = r(a(6517)),
          n = a(2414);
        t.default = class {
          constructor(e, t) {
            (this._input = e), (this._lang = t), (this._locale = (0, n.getLocaleLang)(this._lang));
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
              s.default.isUndefined(this.input) || s.default.isNull(this.input)
                ? this.locale.required
                : !s.default.isString(this.input) || !s.default.isEmpty(this.input) || this.locale.required
            ),
            this
          );
          mustNoIncludeZenkaku = () => (
            this.validations.push(() => !s.default.isString(this.input) || !/[^\x01-\x7E]/.test(this.input.toString()) || this.locale.mustNoIncludeZenkaku), this
          );
          mustBeYamlFilePath = () => (
            this.validations.push(() => !s.default.isString(this.input) || !(!this.input.endsWith('.yml') && !this.input.endsWith('.yaml')) || this.locale.mustBeYamlFilePath), this
          );
          mustBeExtension = () => (this.validations.push(() => !s.default.isString(this.input) || !!/\.[^.]*$/.test(this.input) || this.locale.mustBeExtension), this);
          value() {
            for (let e = 0; e < this.validations.length; e++) {
              const t = this.validations[e]();
              if (s.default.isString(t)) return t;
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
        const s = r(a(6028)),
          n = r(a(4179));
        t.getLocaleLang = (e) => ('ja' === e ? s.default : n.default);
      },
      3462: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.loadYaml = t.writeYaml = void 0);
        const s = r(a(7147)),
          n = r(a(9793)),
          i = a(4355),
          o = a(2762);
        (t.writeYaml = (e, t) => {
          const a = n.default.dump(t, { schema: i.schema, indent: 2, lineWidth: -1 });
          return (0, o.createDirectories)(e), s.default.writeFileSync((0, o.asFullPath)(e), a, 'utf8'), a;
        }),
          (t.loadYaml = (e) => n.default.load(s.default.readFileSync((0, o.asFullPath)(e), 'utf8'), { schema: i.schema }));
      },
      6870: function (e, t, a) {
        var r =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.chalk = t.init = void 0);
        const s = r(a(7347));
        (t.init = () => s.default.font('SansSerif').helpStyle('grey').errorsStyle('red')), (t.chalk = s.default.chalk());
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
          s = a(7304),
          { Transform: n } = a(3248),
          i = a(454),
          o = a(7915),
          l = a(903),
          { ERROR_LIKE_KEYS: u, MESSAGE_KEY: c, TIMESTAMP_KEY: d, LEVEL_KEY: p, LEVEL_NAMES: m } = a(7318),
          {
            isObject: f,
            prettifyErrorLog: g,
            prettifyLevel: h,
            prettifyMessage: y,
            prettifyMetadata: v,
            prettifyObject: S,
            prettifyTime: _,
            buildSafeSonicBoom: $,
            filterLog: b,
            handleCustomlevelsOpts: w,
            handleCustomlevelNamesOpts: P,
          } = a(385),
          E = (e) => {
            try {
              return { value: o.parse(e, { protoAction: 'remove' }) };
            } catch (e) {
              return { err: e };
            }
          },
          x = {
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
          const t = Object.assign({}, x, e),
            a = t.crlf ? '\r\n' : '\n',
            r = '    ',
            s = t.messageKey,
            n = t.levelKey,
            i = t.levelLabel,
            o = t.minimumLevel,
            u = t.messageFormat,
            c = t.timestampKey,
            d = t.errorLikeObjectKeys,
            $ = t.errorProps.split(','),
            N = 'boolean' == typeof t.useOnlyCustomProps ? t.useOnlyCustomProps : 'true' === t.useOnlyCustomProps,
            L = w(t.customLevels),
            A = P(t.customLevels),
            q = t.customColors
              ? t.customColors.split(',').reduce((e, a) => {
                  const [r, s] = a.split(':'),
                    n = (N ? t.customLevels : void 0 !== A[r]) ? A[r] : m[r],
                    i = void 0 !== n ? n : r;
                  return e.push([i, s]), e;
                }, [])
              : void 0,
            C = { customLevels: L, customLevelNames: A };
          N && !t.customLevels && ((C.customLevels = void 0), (C.customLevelNames = void 0));
          const k = t.customPrettifiers,
            O = void 0 !== t.include ? new Set(t.include.split(',')) : void 0,
            R = !O && t.ignore ? new Set(t.ignore.split(',')) : void 0,
            M = t.hideObject,
            D = t.singleLine,
            j = l(t.colorize, q, N),
            T = t.colorizeObjects ? j : l(!1, [], !1);
          return function (e) {
            let l;
            if (f(e)) l = e;
            else {
              const t = E(e);
              if (t.err || !f(t.value)) return e + a;
              l = t.value;
            }
            if (o) {
              const e = ((N ? t.customLevels : void 0 !== A[o]) ? A[o] : m[o]) || Number(o);
              if (l[void 0 === n ? p : n] < e) return;
            }
            const w = y({ log: l, messageKey: s, colorizer: j, messageFormat: u, levelLabel: i, ...C, useOnlyCustomProps: N });
            (R || O) && (l = b({ log: l, ignoreKeys: R, includeKeys: O }));
            const P = h({ log: l, colorizer: j, levelKey: n, prettifier: k.level, ...C }),
              x = v({ log: l, prettifiers: k }),
              L = _({ log: l, translateFormat: t.translateTime, timestampKey: c, prettifier: k.time });
            let q = '';
            if (
              (t.levelFirst && P && (q = `${P}`),
              L && '' === q ? (q = `${L}`) : L && (q = `${q} ${L}`),
              !t.levelFirst && P && (q = q.length > 0 ? `${q} ${P}` : P),
              x && (q = q.length > 0 ? `${q} ${x}:` : x),
              !1 === q.endsWith(':') && '' !== q && (q += ':'),
              w && (q = q.length > 0 ? `${q} ${w}` : w),
              q.length > 0 && !D && (q += a),
              'Error' === l.type && l.stack)
            ) {
              const e = g({ log: l, errorLikeKeys: d, errorProperties: $, ident: r, eol: a });
              D && (q += a), (q += e);
            } else if (!M) {
              const e = [s, n, c].filter((e) => 'string' == typeof l[e] || 'number' == typeof l[e]),
                t = S({ input: l, skipKeys: e, customPrettifiers: k, errorLikeKeys: d, eol: a, ident: r, singleLine: D, colorizer: T });
              D && !/^\s$/.test(t) && (q += ' '), (q += t);
            }
            return q;
          };
        }
        function L(e = {}) {
          const t = N(e);
          return i(
            function (a) {
              const r = new n({
                objectMode: !0,
                autoDestroy: !0,
                transform(e, a, r) {
                  r(null, t(e));
                },
              });
              let i;
              return (
                (i =
                  'object' == typeof e.destination && 'function' == typeof e.destination.write
                    ? e.destination
                    : $({ dest: e.destination || 1, append: e.append, mkdir: e.mkdir, sync: e.sync })),
                a.on('unknown', function (e) {
                  i.write(e + '\n');
                }),
                s(a, r, i),
                r
              );
            },
            { parse: 'lines' }
          );
        }
        (e.exports = L), (e.exports.prettyFactory = N), (e.exports.colorizerFactory = l), (e.exports.default = L);
      },
      903: (e, t, a) => {
        const { LEVELS: r, LEVEL_NAMES: s } = a(7318),
          n = (e) => e,
          i = { default: n, 60: n, 50: n, 40: n, 30: n, 20: n, 10: n, message: n, greyMessage: n },
          { createColors: o } = a(8387),
          l = o({ useColor: !0 }),
          { white: u, bgRed: c, red: d, yellow: p, green: m, blue: f, gray: g, cyan: h } = l,
          y = { default: u, 60: c, 50: d, 40: p, 30: m, 20: f, 10: g, message: h, greyMessage: g };
        function v(e) {
          return function (t, a, { customLevels: n, customLevelNames: i } = {}) {
            const o = e ? n || r : Object.assign({}, r, n),
              l = e ? i || s : Object.assign({}, s, i);
            let u = 'default';
            u = Number.isInteger(+t) ? (Object.prototype.hasOwnProperty.call(o, t) ? t : u) : Object.prototype.hasOwnProperty.call(l, t.toLowerCase()) ? l[t.toLowerCase()] : u;
            const c = o[u];
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
                      { default: u, message: h, greyMessage: g }
                    );
                  })(e),
                  r = t ? a : Object.assign({}, y, a),
                  s = v(t),
                  n = function (e, t) {
                    return s(e, r, t);
                  };
                return (n.message = n.message || r.message), (n.greyMessage = n.greyMessage || r.greyMessage), n;
              })(t, a)
            : e
            ? (function (e) {
                const t = v(e),
                  a = function (e, a) {
                    return t(e, y, a);
                  };
                return (a.message = y.message), (a.greyMessage = y.greyMessage), a;
              })(a)
            : (function (e) {
                const t = v(e),
                  a = function (e, a) {
                    return t(e, i, a);
                  };
                return (a.message = i.message), (a.greyMessage = i.greyMessage), a;
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
          s = a(4612),
          n = a(5246),
          i = a(5376),
          { isMainThread: o } = a(1267),
          l = a(903)(),
          { DATE_FORMAT: u, ERROR_LIKE_KEYS: c, MESSAGE_KEY: d, LEVEL_KEY: p, LEVEL_LABEL: m, TIMESTAMP_KEY: f, LOGGER_KEYS: g, LEVELS: h, DATE_FORMAT_SIMPLE: y } = a(7318),
          v = r({});
        function S(e, t = !1) {
          if (!1 === t) return e;
          const a = _(e);
          if (!$(a)) return e;
          if (!0 === t) return s(a, y);
          const r = t.toUpperCase();
          if ('SYS:STANDARD' === r) return s(a, u);
          const n = r.substr(0, 4);
          return s(a, 'SYS:' === n || 'UTC:' === n ? ('UTC:' === n ? t : t.slice(4)) : `UTC:${t}`);
        }
        function _(e) {
          let t = new Date(e);
          return $(t) || (t = new Date(+e)), t;
        }
        function $(e) {
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
        function P({
          input: e,
          ident: t = '    ',
          eol: a = '\n',
          skipKeys: r = [],
          customPrettifiers: s = {},
          errorLikeKeys: n = c,
          excludeLoggerKeys: o = !0,
          singleLine: u = !1,
          colorizer: d = l,
        }) {
          const p = [].concat(r);
          !0 === o && Array.prototype.push.apply(p, g);
          let m = '';
          const { plain: f, errors: h } = Object.entries(e).reduce(
            ({ plain: t, errors: a }, [r, i]) => {
              if (!1 === p.includes(r)) {
                const o = 'function' == typeof s[r] ? s[r](i, r, e) : i;
                n.includes(r) ? (a[r] = o) : (t[r] = o);
              }
              return { plain: t, errors: a };
            },
            { plain: {}, errors: {} }
          );
          return (
            u
              ? (Object.keys(f).length > 0 && (m += d.greyMessage(i(f))), (m += a), (m = m.replace(/\\\\/gi, '\\')))
              : Object.entries(f).forEach(([e, r]) => {
                  let n = 'function' == typeof s[e] ? r : i(r, null, 2);
                  if (void 0 === n) return;
                  n = n.replace(/\\\\/gi, '\\');
                  const o = w({ input: n, ident: t, eol: a });
                  m += `${t}${e}:${o.startsWith(a) ? '' : ' '}${o}${a}`;
                }),
            Object.entries(h).forEach(([e, r]) => {
              const n = 'function' == typeof s[e] ? r : i(r, null, 2);
              void 0 !== n && (m += E({ keyName: e, lines: n, eol: a, ident: t }));
            }),
            m
          );
        }
        function E({ keyName: e, lines: t, eol: a, ident: r }) {
          let s = '';
          const n = `${r}${e}: ${w({ input: t, ident: r, eol: a })}${a}`.split(a);
          for (let e = 0; e < n.length; e += 1) {
            0 !== e && (s += a);
            const t = n[e];
            if (/^\s*"stack"/.test(t)) {
              const e = /^(\s*"stack":)\s*(".*"),?$/.exec(t);
              if (e && 3 === e.length) {
                const r = /^\s*/.exec(t)[0].length + 4,
                  n = ' '.repeat(r),
                  i = e[2];
                s += e[1] + a + n + JSON.parse(i).replace(/\n/g, a + n);
              } else s += t;
            } else s += t;
          }
          return s;
        }
        function x(e) {
          const t = [];
          let a = !1,
            r = '';
          for (let s = 0; s < e.length; s++) {
            const n = e.charAt(s);
            '\\' !== n ? (a ? ((a = !1), (r += n)) : '.' !== n ? (r += n) : (t.push(r), (r = ''))) : (a = !0);
          }
          return r.length && t.push(r), t;
        }
        function N(e, t) {
          const a = Array.isArray(t) ? t : x(t);
          for (const t of a) {
            if (!Object.prototype.hasOwnProperty.call(e, t)) return;
            e = e[t];
          }
          return e;
        }
        function L(e, t) {
          const a = x(t),
            r = a.pop();
          null !== (e = N(e, a)) && 'object' == typeof e && Object.prototype.hasOwnProperty.call(e, r) && delete e[r];
        }
        function A() {}
        function q(e, t) {
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
          prettifyErrorLog: function ({ log: e, messageKey: t = d, ident: a = '    ', eol: r = '\n', errorLikeKeys: s = c, errorProperties: n = [] }) {
            let i = `${a}${w({ input: e.stack, ident: a, eol: r })}${r}`;
            if (n.length > 0) {
              const o = g.concat(t, 'type', 'stack');
              let l;
              l = '*' === n[0] ? Object.keys(e).filter((e) => !1 === o.includes(e)) : n.filter((e) => !1 === o.includes(e));
              for (let t = 0; t < l.length; t += 1) {
                const n = l[t];
                n in e != 0 &&
                  (i = b(e[n]) ? `${i}${a}${n}: {${r}${P({ input: e[n], errorLikeKeys: s, excludeLoggerKeys: !1, eol: r, ident: a + a })}${a}}${r}` : `${i}${a}${n}: ${e[n]}${r}`);
              }
            }
            return i;
          },
          prettifyLevel: function ({ log: e, colorizer: t = l, levelKey: a = p, prettifier: r, customLevels: s, customLevelNames: n }) {
            const i = N(e, a);
            return void 0 === i ? void 0 : r ? r(i) : t(i, { customLevels: s, customLevelNames: n });
          },
          prettifyMessage: function ({
            log: e,
            messageFormat: t,
            messageKey: a = d,
            colorizer: r = l,
            levelLabel: s = m,
            levelKey: n = p,
            customLevels: i,
            useOnlyCustomProps: o,
          }) {
            if (t && 'string' == typeof t) {
              const a = String(t).replace(/{([^{}]+)}/g, function (t, a) {
                let r;
                return a === s && void 0 !== (r = N(e, n)) ? ((o ? void 0 === i : void 0 === i[r]) ? h[r] : i[r]) : N(e, a) || '';
              });
              return r.message(a);
            }
            if (t && 'function' == typeof t) {
              const n = t(e, a, s);
              return r.message(n);
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
          prettifyObject: P,
          prettifyTime: function ({ log: e, timestampKey: t = f, translateFormat: a, prettifier: r }) {
            let s = null;
            if ((t in e ? (s = e[t]) : 'timestamp' in e && (s = e.timestamp), null === s)) return;
            const n = a ? S(s, a) : s;
            return r ? r(n) : `[${n}]`;
          },
          buildSafeSonicBoom: function (e) {
            const t = new n(e);
            return (
              t.on('error', function e(a) {
                if ('EPIPE' === a.code) return (t.write = A), (t.end = A), (t.flushSync = A), void (t.destroy = A);
                t.removeListener('error', e);
              }),
              !e.sync &&
                o &&
                (function (e) {
                  if (global.WeakRef && global.WeakMap && global.FinalizationRegistry) {
                    const t = a(2067);
                    t.register(e, q),
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
                L(r, e);
              }),
              r
            );
          },
          handleCustomlevelsOpts: function (e) {
            return e
              ? 'string' == typeof e
                ? e.split(',').reduce(
                    (e, t, a) => {
                      const [r, s = a] = t.split(':');
                      return (e[s] = r.toUpperCase()), e;
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
                    const [r, s = a] = t.split(':');
                    return (e[r.toLowerCase()] = s), e;
                  }, {})
                : '[object Object]' === Object.prototype.toString.call(e)
                ? Object.keys(e).reduce((t, a, r) => ((t[a.toLowerCase()] = e[a]), t), {})
                : {}
              : {};
          },
        }),
          (e.exports.internals = {
            formatTime: S,
            joinLinesWithIndentation: w,
            prettifyError: E,
            getPropertyValue: N,
            deleteLogProperty: L,
            splitPropertyKey: x,
            createDate: _,
            isValidDate: $,
          });
      },
      4147: (e) => {
        e.exports = JSON.parse(
          '{"name":"ragate-cli","version":"0.2.0","description":"Anyone can immediately start a serverless project using the CLI, automatically generate source code, and start an infinitely extensible and maintainable serverless development project.","engines":{"node":">=18.x"},"scripts":{"test":"echo \'Sorry, test code is in preparation.\\n\'","build:dev":"ENV=development webpack","build:prd":"ENV=production webpack","lint":"eslint . --fix","format":"prettier . --write","prepare":"husky install"},"eslintIgnore":["!/.github",".serverless","bin","tmp","webpack.config.js"],"main":"./lib/app.ts","bin":{"ragate":"./bin/app.js"},"repository":{"type":"git","url":"git+https://github.com/ragate-inc/ragate-cli.git"},"lint-staged":{"*.{ts,js}":["eslint"],"*.{css,html,js,json,md,yaml,yml,ts,js}":["prettier . --write"]},"keywords":["aws","serverless","ragate","cli","amplify","serverless","lambda","amazon"],"author":"Ragate inc.","license":"MIT","bugs":{"url":"https://github.com/ragate-inc/ragate-cli/issues"},"homepage":"https://github.com/ragate-inc/ragate-cli#readme","devDependencies":{"@tsconfig/node-lts":"^18.12.1","@types/figlet":"^1.5.6","@types/fs-extra":"^11.0.1","@types/inquirer":"^9.0.3","@types/inquirer-autocomplete-prompt":"^3.0.0","@types/js-yaml":"^4.0.5","@types/lodash":"^4.14.194","@types/node":"^18.16.3","@types/webpack":"^5.28.1","@types/webpack-node-externals":"^3.0.0","@types/yargs":"^17.0.24","@typescript-eslint/eslint-plugin":"^5.59.2","@typescript-eslint/parser":"^5.59.2","eslint":"^8.39.0","eslint-config-prettier":"^8.8.0","eslint-config-standard-with-typescript":"^34.0.1","husky":"^6.0.0","lint-staged":"^13.2.2","prettier":"2.8.8","ts-loader":"^9.4.2","ts-node":"^10.9.1","tsconfig-paths-webpack-plugin":"^4.0.1","typescript":"^5.0.4","webpack":"^5.81.0","webpack-cli":"^5.0.2","webpack-node-externals":"^3.0.0"},"dependencies":{"@aws-cdk/assert":"^2.68.0","@aws-cdk/aws-iam":"^1.201.0","@aws-cdk/aws-sns":"^1.201.0","@aws-cdk/aws-sns-subscriptions":"^1.201.0","@aws-cdk/aws-sqs":"^1.201.0","aws-cdk-lib":"^2.79.1","figlet":"^1.6.0","fs-extra":"^11.1.1","graphql":"^16.6.0","graphql-compose":"^9.0.10","graphql-tools":"^8.3.20","inquirer":"^8.0.0","inquirer-autocomplete-prompt":"^2.0.0","isomorphic-git":"^1.23.0","js-yaml":"^4.1.0","lodash":"^4.17.21","parent-require":"^1.0.0","pino":"^8.12.1","pino-pretty":"^10.0.0","yaml-cfn":"^0.3.2","yargonaut":"^1.1.4","yargs":"^17.1.1-candidate.0"}}'
        );
      },
    },
    t = {};
  !(function a(r) {
    var s = t[r];
    if (void 0 !== s) return s.exports;
    var n = (t[r] = { exports: {} });
    return e[r].call(n.exports, n, n.exports, a), n.exports;
  })(4712);
})();
