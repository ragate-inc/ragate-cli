#!/usr/bin/env node
(() => {
  'use strict';
  var e = {
      4712: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(9026));
        (async () => {
          const e = new s.default();
          await e.run();
        })();
      },
      2322: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(4147)),
          n = a(r(6517)),
          i = a(r(1017)),
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
      9026: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(6444)),
          n = a(r(9267)),
          i = r(6870),
          o = a(r(2322)),
          l = r(8014),
          u = a(r(8798)),
          c = a(r(8072)),
          d = r(6702),
          f = a(r(6517)),
          p = r(2762);
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
                .check((e) => ((e.verbose = f.default.hasIn(e, 'verbose')), !0))
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
              (0, p.cleanUpTmpDirectory)();
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
            const { version: e, chalk: t, locale: r, lang: a } = this;
            return (0, n.default)(process.argv.slice(2))
              .scriptName('')
              .options({
                verbose: { describe: t.grey(r.options.describe.verbose), type: this.verboseRef.type },
                lang: { describe: t.grey(r.options.describe.lang), default: this.langRef.default, type: this.langRef.type },
                region: { alias: 'r', describe: t.grey(r.options.describe.region), default: this.regionRef.default, type: this.regionRef.type, choices: d.awsRegions },
              })
              .usage(e)
              .help('help', t.grey(r.help))
              .alias('h', 'help')
              .version('version', t.grey(r.version), e)
              .alias('v', 'version')
              .check((e) => {
                if (0 === e._.length) throw new Error(this.locale.unProcessed.required);
                return !0;
              })
              .command(
                'create',
                t.grey(r.command.description.create),
                (e) => {
                  const t = { lang: this.lang, region: this.region };
                  return new u.default.builder(t).build(e);
                },
                (e) => new u.default.handler(e).run()
              )
              .command('add', t.grey(r.command.description.add), (e) => {
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
              .locale(a)
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
      8014: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const s = a(r(6471)),
          n = a(r(1843));
        t.getLocaleLang = (e) => ('ja' === e ? s.default : n.default);
      },
      5033: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.CLIError = t.EnvironmentError = t.BaseClass = void 0);
        class r extends Error {
          constructor(e) {
            super(e), (this.name = new.target.name), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), Object.setPrototypeOf(this, new.target.prototype);
          }
        }
        (t.BaseClass = r),
          (t.EnvironmentError = class extends r {
            constructor(e) {
              super(e), (this.name = 'EnvironmentError');
            }
          }),
          (t.CLIError = class extends r {
            constructor(e) {
              super(e), (this.name = 'CLIError');
            }
          });
      },
      6040: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = r(6702),
          n = a(r(6444)),
          i = a(r(9211)),
          o = a(r(592)),
          l = a(r(8785)),
          u = a(r(8806)),
          c = r(6870),
          d = r(7264);
        class f extends s.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            const t = this.args.lang,
              r = (0, d.getLocaleLang)(t),
              a = n.default.getLogger();
            return e
              .version(!1)
              .usage('Usage: add <command> <options>')
              .command(
                'sns',
                c.chalk.grey(r.command.description.sns),
                (e) => new i.default.builder(this.args).build(e),
                (e) => new i.default.handler(e).run()
              )
              .command(
                'sqs',
                c.chalk.grey(r.command.description.sns),
                (e) => new o.default.builder(this.args).build(e),
                (e) => new o.default.handler(e).run()
              )
              .command(
                'basicauthlambda',
                c.chalk.grey(r.command.description.basicAuthLambda),
                (e) => new l.default.builder(this.args).build(e),
                (e) => new l.default.handler(e).run()
              )
              .command(
                'api',
                c.chalk.grey(r.command.description.api),
                (e) => new u.default.builder(this.args).build(e),
                (e) => new u.default.handler(e).run()
              )
              .command(
                '*',
                c.chalk.grey('<command> <options>'),
                () => ({}),
                () => {
                  a.error(c.chalk.red(r.unProcessed));
                }
              );
          }
        }
        t.default = f;
      },
      7352: (e, t, r) => {
        Object.defineProperty(t, '__esModule', { value: !0 });
        const a = r(6702);
        class s extends a.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            return e.version(!1).usage('Usage: $0 api');
          }
        }
        t.default = s;
      },
      1723: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(6444)),
          n = r(6702),
          i = a(r(6517)),
          o = a(r(1325)),
          l = a(r(3290)),
          u = a(r(7973)),
          c = a(r(5837)),
          d = a(r(1092)),
          f = a(r(3448)),
          p = a(r(6849)),
          m = a(r(8391)),
          h = a(r(245));
        class g extends n.FeatureHandlerAbstract {
          constructor(e) {
            super(e);
          }
          get defaultSchemeGrapqlFilePath() {
            return 'appsync/schema.graphql';
          }
          get defaultServerlessConfigPath() {
            return `serverless/${this.argv.region}/serverless.yml`;
          }
          async run() {
            const e = s.default.getLogger(),
              t = await l.default.prompt([
                {
                  type: 'input',
                  name: 'apiName',
                  message: 'API名を入力',
                  filter: (e) => e.replace(/\s+/g, ''),
                  transformer: (e) => e.replace(/\s+/g, ''),
                  validate: (e) => new u.default(e, this.lang).required().mustNoIncludeZenkaku().value(),
                },
                { type: 'list', name: 'apiType', choices: ['Mutation', 'Query'], message: 'APIタイプを選択', validate: (e) => new u.default(e, this.lang).required().value() },
                {
                  type: 'list',
                  name: 'resolverType',
                  choices: ['UNIT', 'PIPELINE'],
                  message: 'リゾルバータイプを選択',
                  validate: (e) => new u.default(e, this.lang).required().value(),
                },
                {
                  type: 'input',
                  name: 'serverlessConfigPath',
                  message: 'input a serverless config file path',
                  default: () => this.defaultServerlessConfigPath,
                  validate: (e) => new u.default(e, this.lang).required().mustBeYamlFilePath().value(),
                  transformer: (e) => new d.default(e).removeAllSpace().value(),
                  filter: (e) => new c.default(e).removeAllSpace().value(),
                },
              ]);
            e.debug(`input info values : ${JSON.stringify(t)}}`);
            const r = new o.default({ region: this.argv.region, serverlessConfigPath: t.serverlessConfigPath, lang: this.lang });
            if (!r.isExistsServelessConfig) throw new Error('serverless.ymlが存在しません');
            const a = r.serverlessConfig;
            if (!(a.plugins ?? []).includes('serverless-appsync-plugin')) throw new Error('serverless-appsync-pluginがインストールされていません');
            const n = f.default.parseSlsRecursivelyReference(a.custom?.appSync);
            if (i.default.isEmpty(n))
              throw new Error('serverless.ymlのcustom.appsyncが不正です、custom.appsyncには、以下のような文字列が設定されている必要があります。\n${file(./appsync/stack.yml)}');
            const g = f.default.parseAppSyncStack(n);
            if (g.mappingTemplates.some((e) => e.type === t.apiType && e.field === t.apiName)) throw new Error('既にマッピングテンプレートに定義が存在します');
            if ('PIPELINE' === t.resolverType && g.functionConfigurations.some((e) => e.name === `Mutation${t.apiName}`)) throw new Error('既にリゾルバー関数がAPIが存在します');
            if ('Mutation' === t.apiType) {
              if (g.schema.isExistsMutationApi(t.apiName)) throw new Error('既にschemeにAPI定義が存在します');
              return (0, p.default)({ appSyncStack: g, lang: this.lang });
            }
            if ('Query' === t.apiType) {
              if (g.schema.isExistsQueryApi(t.apiName)) throw new Error('既にschemeにAPI定義が存在します');
              const { operation: e } = await l.default.prompt([
                { type: 'list', name: 'operation', choices: ['Query', 'GetItem'], message: 'Queryのタイプを選択', validate: (e) => new u.default(e, this.lang).required().value() },
              ]);
              if ('Query' === e) return (0, m.default)({ appSyncStack: g, lang: this.lang });
              if ('GetItem' === e) return (0, h.default)({ appSyncStack: g, lang: this.lang });
            }
          }
        }
        t.default = g;
      },
      8806: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(7352)),
          n = a(r(1723));
        t.default = { builder: s.default, handler: n.default };
      },
      4538: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = {});
      },
      3957: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = {});
      },
      245: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(6444));
        t.default = async (e) => {
          const { appSyncStack: t, lang: r } = e;
          s.default.getLogger().debug(`appsyncStack : ${JSON.stringify(t)}`);
        };
      },
      6849: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(6444)),
          n = a(r(3290)),
          i = a(r(7973)),
          o = r(8854);
        t.default = async (e) => {
          const { appSyncStack: t, lang: r } = e;
          (0, o.getLocaleLang)(r), s.default.getLogger().debug(`appsyncStack : ${JSON.stringify(t)}`);
          const { createDataSource: a } = await n.default.prompt([
            {
              type: 'expand',
              name: 'createDataSource',
              message: 'データソースを新しく作成しますか？',
              choices: [
                { key: 'y', name: 'yes', value: !0 },
                { key: 'n', name: 'no', value: !1 },
              ],
              filter: (e) => e.replace(/\s+/g, ''),
              transformer: (e) => e.replace(/\s+/g, ''),
              validate: (e) => new i.default(e, r).required().value(),
            },
          ]);
          if (a) {
            const { lambdaFunctionName: e } = await n.default.prompt([
              {
                type: 'input',
                name: 'lambdaFunctionName',
                message: 'Lambda関数名を入力',
                filter: (e) => e.replace(/\s+/g, ''),
                transformer: (e) => e.replace(/\s+/g, ''),
                validate: (e) => new i.default(e, r).required().mustNoIncludeZenkaku().value(),
              },
            ]);
          }
        };
      },
      8391: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(6444)),
          n = r(8854);
        t.default = async (e) => {
          const { appSyncStack: t, lang: r } = e;
          (0, n.getLocaleLang)(r), s.default.getLogger().debug(`appsyncStack : ${JSON.stringify(t)}`);
        };
      },
      8854: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const s = a(r(3957)),
          n = a(r(4538));
        t.getLocaleLang = (e) => ('ja' === e ? s.default : n.default);
      },
      3582: (e, t, r) => {
        Object.defineProperty(t, '__esModule', { value: !0 });
        const a = r(6702);
        class s extends a.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            return e.version(!1).usage('Usage: $0 basic-auth-lambda');
          }
        }
        t.default = s;
      },
      306: function (e, t, r) {
        var a =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, a) {
                  void 0 === a && (a = r);
                  var s = Object.getOwnPropertyDescriptor(t, r);
                  (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                    (s = {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    }),
                    Object.defineProperty(e, a, s);
                }
              : function (e, t, r, a) {
                  void 0 === a && (a = r), (e[a] = t[r]);
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
              if (null != e) for (var r in e) 'default' !== r && Object.prototype.hasOwnProperty.call(e, r) && a(t, e, r);
              return s(t, e), t;
            },
          i =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = i(r(6444)),
          l = r(6702),
          u = i(r(3290)),
          c = i(r(7973)),
          d = i(r(1092)),
          f = i(r(5837)),
          p = n(r(7808)),
          m = n(r(2e3)),
          h = i(r(2056)),
          g = i(r(1325)),
          y = i(r(3624)),
          v = i(r(1325));
        class _ extends l.FeatureHandlerAbstract {
          constructor(e) {
            super(e);
          }
          defaultServerlessConfigPath = 'serverless/us-east-1/serverless.yml';
          defaultFunctionYamlPath = 'serverless/us-east-1/resources/functions.yml';
          defaultIamRolePath = 'serverless/us-east-1/resources/iam-role.yml';
          defaultBasicLambdaPath = 'src/functions/lambdaedge/basicAuth.handler';
          defaultLambdaRoleName = 'DefaultLambdaRole';
          lambdaEdgeTimeout = 5;
          lambdaEdgeMemorySize = 128;
          generateLambdaIamRoleCf() {
            return y.default.generateCloudFormation(this.defaultLambdaRoleName, (e) => {
              const t = new p.Role(e, this.defaultLambdaRoleName, { assumedBy: new p.ServicePrincipal('edgelambda.amazonaws.com') });
              return (
                t.addToPolicy(
                  new p.PolicyStatement({
                    effect: p.Effect.ALLOW,
                    resources: [m.Fn.join(':', ['arn:aws:logs', m.Fn.ref('AWS::Region'), m.Fn.ref('AWS::AccountId'), 'log-group:/aws/lambda/*:*:*'])],
                    actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
                  })
                ),
                t.addToPolicy(
                  new p.PolicyStatement({
                    effect: p.Effect.ALLOW,
                    resources: [m.Fn.join(':', ['arn:aws:logs', this.argv.region, m.Fn.ref('AWS::AccountId'), 'log-group:/aws/lambda/*:*:*'])],
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
                  filter: (e) => new f.default(e).removeAllSpace().value(),
                },
                {
                  type: 'input',
                  name: 'lamndaRoleCfPath',
                  message: 'input a lambda iam role cloudformation path',
                  default: () => this.defaultIamRolePath,
                  validate: (e) => new c.default(e, this.lang).required().mustBeYamlFilePath().value(),
                  transformer: (e) => new d.default(e).removeAllSpace().value(),
                  filter: (e) => new f.default(e).removeAllSpace().value(),
                },
                {
                  type: 'input',
                  name: 'lambdaHandler',
                  message: 'input a lambda handler path',
                  default: () => this.defaultBasicLambdaPath,
                  validate: (e) => new c.default(e, this.lang).required().mustBeExtension().value(),
                  transformer: (e) => new d.default(e).removeAllSpace().value(),
                  filter: (e) => new f.default(e).removeAllSpace().value(),
                },
                {
                  type: 'input',
                  name: 'lamndaRoleName',
                  message: 'input a lambda iam role name',
                  default: () => this.defaultLambdaRoleName,
                  validate: (e) => new c.default(e, this.lang).required().value(),
                  transformer: (e) => new d.default(e).removeAllSpace().value(),
                  filter: (e) => new f.default(e).removeAllSpace().value(),
                },
                {
                  type: 'input',
                  name: 'serverlessConfigPath',
                  message: 'input a serverless config file path',
                  default: () => this.defaultServerlessConfigPath,
                  validate: (e) => new c.default(e, this.lang).required().mustBeYamlFilePath().value(),
                  transformer: (e) => new d.default(e).removeAllSpace().value(),
                  filter: (e) => new f.default(e).removeAllSpace().value(),
                },
              ])
              .then((e) => e);
          }
          async run() {
            const e = o.default.getLogger(),
              t = await this.prompt();
            e.debug(`input values : ${JSON.stringify(t)}}`);
            const { functionName: r, serverlessConfigPath: a, lamndaRoleCfPath: s, lamndaRoleName: n, lambdaHandler: i } = t,
              l = new v.default({ region: this.argv.region, serverlessConfigPath: a, lang: this.lang });
            if ('us-east-1' !== l.region) throw new Error('lambda edge must be in us-east-1');
            l.addFunction({
              lambdaFunctionName: r,
              lambdaHandler: i,
              memorySize: this.lambdaEdgeMemorySize,
              timeout: this.lambdaEdgeTimeout,
              code: h.default.templates.basicauthlambda,
            }),
              l.addResource({ filePath: s, resourceName: n, cf: this.generateLambdaIamRoleCf() });
          }
        }
        t.default = _;
      },
      8785: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(3582)),
          n = a(r(306));
        t.default = { builder: s.default, handler: n.default };
      },
      6433: (e, t, r) => {
        Object.defineProperty(t, '__esModule', { value: !0 });
        const a = r(6702);
        class s extends a.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            return e.version(!1).usage('Usage: $0 sns');
          }
        }
        t.default = s;
      },
      2917: function (e, t, r) {
        var a =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, a) {
                  void 0 === a && (a = r);
                  var s = Object.getOwnPropertyDescriptor(t, r);
                  (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                    (s = {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    }),
                    Object.defineProperty(e, a, s);
                }
              : function (e, t, r, a) {
                  void 0 === a && (a = r), (e[a] = t[r]);
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
              if (null != e) for (var r in e) 'default' !== r && Object.prototype.hasOwnProperty.call(e, r) && a(t, e, r);
              return s(t, e), t;
            },
          i =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = i(r(6444)),
          l = r(6702),
          u = i(r(6517)),
          c = r(3362),
          d = i(r(3290)),
          f = i(r(7973)),
          p = i(r(5837)),
          m = i(r(1092)),
          h = i(r(3624)),
          g = n(r(8890)),
          y = n(r(9087)),
          v = n(r(6324)),
          _ = n(r(5862)),
          b = n(r(2e3)),
          w = i(r(1325));
        class P extends l.FeatureHandlerAbstract {
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
            return h.default.generateCloudFormation(e, (r) => {
              const a = new g.Topic(r, e, { topicName: e });
              return (
                t.forEach((t) => {
                  'email' === t
                    ? a.addSubscription(new v.EmailSubscription('****@****.com'))
                    : 'lambda' === t
                    ? a.addSubscription(
                        new v.LambdaSubscription(_.Function.fromFunctionArn(r, `${e}Lambda`, `arn:aws:lambda:${this.argv.region}:${b.Fn.ref('AWS::AccountId')}:function:*****`))
                      )
                    : 'sms' === t
                    ? a.addSubscription(new v.SmsSubscription('0000000000'))
                    : 'url' === t
                    ? a.addSubscription(new v.UrlSubscription('https://*****.com'))
                    : 'sqs' === t && a.addSubscription(new v.SqsSubscription(new y.Queue(r, `${e}SubscribeQueue`)));
                }),
                a
              );
            });
          }
          async run() {
            const e = o.default.getLogger(),
              t = (0, c.getLocaleLang)(this.lang),
              r = await d.default
                .prompt([
                  {
                    type: 'input',
                    name: 'resourceName',
                    message: 'input a sns resource name',
                    filter: (e) => e.replace(/\s+/g, ''),
                    transformer: (e) => e.replace(/\s+/g, ''),
                    validate: (e) => new f.default(e, this.lang).required().mustNoIncludeZenkaku().value(),
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
                      validate: (e) => new f.default(e, this.lang).required().mustBeYamlFilePath().value(),
                      transformer: (e) => new m.default(e).filePath().value(),
                      filter: (e) => new p.default(e).filePath().value(),
                    },
                    {
                      type: 'input',
                      name: 'serverlessConfigPath',
                      message: 'input a serverless config file path',
                      default: () => this.defaultServerlessConfigPath,
                      validate: (e) => new f.default(e, this.lang).required().mustBeYamlFilePath().value(),
                      transformer: (e) => new m.default(e).removeAllSpace().value(),
                      filter: (e) => new p.default(e).removeAllSpace().value(),
                    },
                  ])),
                  ...e,
                }));
            e.debug(`input values : ${JSON.stringify(r)}}`);
            const { resourceName: a, filePath: s, subscriptions: n, serverlessConfigPath: i } = r,
              l = new w.default({ region: this.argv.region, serverlessConfigPath: i, lang: this.lang }),
              h = this.generateSnsCf(a, n);
            l.addResource({ filePath: s, resourceName: a, cf: h });
          }
        }
        t.default = P;
      },
      9211: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(6433)),
          n = a(r(2917));
        t.default = { builder: s.default, handler: n.default };
      },
      6353: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = { error: { reqiredSubscriptions: 'required select a subscriptions' } });
      },
      5423: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = { error: { reqiredSubscriptions: 'サブスクリプションを選択して下さい' } });
      },
      3362: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const s = a(r(5423)),
          n = a(r(6353));
        t.getLocaleLang = (e) => ('ja' === e ? s.default : n.default);
      },
      6621: (e, t, r) => {
        Object.defineProperty(t, '__esModule', { value: !0 });
        const a = r(6702);
        class s extends a.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            return e.version(!1).usage('Usage: $0 sqs');
          }
        }
        t.default = s;
      },
      4267: function (e, t, r) {
        var a =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, a) {
                  void 0 === a && (a = r);
                  var s = Object.getOwnPropertyDescriptor(t, r);
                  (s && !('get' in s ? !t.__esModule : s.writable || s.configurable)) ||
                    (s = {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    }),
                    Object.defineProperty(e, a, s);
                }
              : function (e, t, r, a) {
                  void 0 === a && (a = r), (e[a] = t[r]);
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
              if (null != e) for (var r in e) 'default' !== r && Object.prototype.hasOwnProperty.call(e, r) && a(t, e, r);
              return s(t, e), t;
            },
          i =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = i(r(6444)),
          l = r(6702),
          u = i(r(6517)),
          c = i(r(3290)),
          d = i(r(7973)),
          f = i(r(5837)),
          p = i(r(1092)),
          m = n(r(9087)),
          h = i(r(3624)),
          g = i(r(1325));
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
            return h.default.generateCloudFormation(e, (r) => {
              const a = 'Fifo' === t.queueType;
              if (t.useDeadLetterQueue) {
                const s = { queueName: `${e}DeadLetter` };
                a && u.default.assign(s, { queueName: `${e}DeadLetter.fifo`, fifo: !0 });
                const n = new m.Queue(r, `${e}DeadLetter`, s),
                  i = { queueName: e, fifo: a, maxMessageSizeBytes: this.defaultMaxMessageSizeBytes, deadLetterQueue: { maxReceiveCount: this.defaultMaxReceiveCount, queue: n } };
                return a && u.default.assign(i, { queueName: `${e}.fifo`, contentBasedDeduplication: t.contentBasedDeduplication }), new m.Queue(r, e, i);
              }
              const s = { queueName: e, fifo: a, maxMessageSizeBytes: this.defaultMaxMessageSizeBytes };
              return a && u.default.assign(s, { queueName: `${e}.fifo`, contentBasedDeduplication: t.contentBasedDeduplication }), new m.Queue(r, e, s);
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
                      transformer: (e) => new p.default(e).filePath().value(),
                      filter: (e) => new f.default(e).filePath().value(),
                    },
                    {
                      type: 'input',
                      name: 'serverlessConfigPath',
                      message: 'input a serverless config file path',
                      default: () => this.defaultServerlessConfigPath,
                      validate: (e) => new d.default(e, this.lang).required().mustBeYamlFilePath().value(),
                      transformer: (e) => new p.default(e).removeAllSpace().value(),
                      filter: (e) => new f.default(e).removeAllSpace().value(),
                    },
                  ])),
                  ...e,
                }));
            e.debug(`input values : ${JSON.stringify(t)}}`);
            const { resourceName: r, queueType: a, useDeadLetterQueue: s, contentBasedDeduplication: n, filePath: i, serverlessConfigPath: l } = t,
              u = new g.default({ region: this.argv.region, serverlessConfigPath: l, lang: this.lang }),
              m = this.generateSqsCf(r, { queueType: a, useDeadLetterQueue: s, contentBasedDeduplication: n });
            u.addResource({ filePath: i, resourceName: r, cf: m });
          }
        }
        t.default = y;
      },
      592: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(6621)),
          n = a(r(4267));
        t.default = { builder: s.default, handler: n.default };
      },
      8072: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(6040));
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
      7264: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const s = a(r(5699)),
          n = a(r(4005));
        t.getLocaleLang = (e) => ('ja' === e ? s.default : n.default);
      },
      3818: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = r(6702),
          n = r(6870),
          i = a(r(8798));
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
      975: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(3290)),
          n = a(r(2322)),
          i = r(2868),
          o = a(r(6517)),
          l = a(r(169)),
          u = r(2762),
          c = a(r(6444)),
          d = r(6702),
          f = a(r(1017));
        class p extends d.FeatureHandlerAbstract {
          constructor(e) {
            super(e), s.default.registerPrompt('autocomplete', l.default);
          }
          async run() {
            const { argv: e } = this,
              t = c.default.getLogger();
            t.debug('create hander : ', e);
            const r = (0, i.getLocaleLang)(this.lang),
              a = await s.default
                .prompt([
                  {
                    type: 'autocomplete',
                    name: 'template',
                    emptyText: r.inquirer.template.autocomplete.emptyText,
                    message: r.inquirer.template.choiceTemplate,
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
            t.debug(`input values : ${JSON.stringify(a)}}`);
            const { template: l, projectName: d } = a;
            if (
              (t.info(`template : ${l}`),
              t.info(`projectName : ${d}`),
              t.debug(`check exists directory : ${f.default.join(n.default.currentPath, d)}`),
              (0, u.isExistsDirectory)(f.default.join(n.default.currentPath, d)))
            )
              throw new Error(`${r.error.alreadyExistsDirectory} : ${f.default.join(n.default.currentPath, d)}`);
            await (0, u.gitClone)(n.default.repositoyUrl, n.default.tmpPath), (0, u.moveDirectory)(f.default.join(n.default.tmpPath, l), f.default.join(n.default.currentPath, d));
          }
        }
        t.default = p;
      },
      8798: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(3818)),
          n = a(r(975));
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
      2868: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const s = a(r(7016)),
          n = a(r(7544));
        t.getLocaleLang = (e) => ('ja' === e ? s.default : n.default);
      },
      3624: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(6444)),
          n = r(6817),
          i = r(2726);
        t.default = class {
          static generateCloudFormation = (e, t) => {
            class r extends n.Stack {
              constructor(r, a, s) {
                super(r, a, s), t(this).node.defaultChild.overrideLogicalId(e);
              }
            }
            const a = s.default.getLogger(),
              o = new r(new n.App(), 'ragate'),
              l = i.SynthUtils.toCloudFormation(o);
            return a.debug('generated cloudFormation template:'), a.debug(l), l.Resources;
          };
        };
      },
      2056: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(3448)),
          n = a(r(6698)),
          i = r(2762),
          o = a(r(7147)),
          l = a(r(6444));
        t.default = class {
          static get templates() {
            return n.default;
          }
          constructor(e) {
            this.handlerPath = e.handlerPath;
            const [t, r] = s.default.parseLambdaHandlerPath(e.handlerPath);
            (this.destinationPath = t.join('/') + '/'), (this.handlerName = s.default.extractFilename(r)), (this.code = e.code), (this.logger = l.default.getLogger());
          }
          handlerPath;
          destinationPath;
          handlerName;
          code;
          logger;
          write() {
            const e = `${(0, i.asFullPath)(this.destinationPath)}${this.handlerName}.ts`;
            (0, i.isFileExists)(e)
              ? this.logger.info(`already exists file, skip write : ${e}`)
              : ((0, i.createDirectories)(this.destinationPath),
                this.logger.info(`create directories : ${this.handlerPath}`),
                o.default.writeFileSync(e, this.code, 'utf8'),
                this.logger.info(`write : ${e}`),
                this.logger.debug(this.code));
          }
        };
      },
      2996: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            "import { Context, CloudFrontRequest, Callback, CloudFrontRequestEvent, CloudFrontResultResponse } from 'aws-lambda';\n\nexport const handler = (event: CloudFrontRequestEvent, _context: Context, callback: Callback): void => {\n  const request: CloudFrontRequest = event.Records[0].cf.request;\n  const headers = request.headers;\n\n  const authUser = 'ragate'; // Basic認証のユーザー名\n  const authPass = '20210525'; // Basic認証のパスワード\n\n  const authString = 'Basic ' + Buffer.from(authUser + ':' + authPass).toString('base64');\n  if (typeof headers.authorization === 'undefined' || headers.authorization[0].value !== authString) {\n    const body = 'Unauthorized';\n    const response: CloudFrontResultResponse = {\n      status: '401',\n      statusDescription: 'Unauthorized',\n      body: body,\n      headers: {\n        'www-authenticate': [{ key: 'WWW-Authenticate', value: 'Basic' }],\n      },\n    };\n    callback(null, response);\n  }\n  callback(null, request);\n};\n");
      },
      6698: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(2996));
        t.default = { basicauthlambda: s.default };
      },
      1325: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(1017)),
          n = a(r(6444)),
          i = r(7347),
          o = a(r(6517)),
          l = r(3462),
          u = a(r(3448)),
          c = a(r(2056));
        t.default = class {
          constructor(e) {
            (this.logger = n.default.getLogger()),
              (this._serverlessConfigPath = e.serverlessConfigPath),
              (this._lang = e.lang),
              (this._defaultFunctionYamlPath = `serverless/${e.region}/resources/functions.yml`);
            try {
              const t = (0, l.loadYaml)(this.serverlessConfigPath);
              if (((this._serverlessConfig = t), o.default.isString(t.functions))) {
                const e = u.default.parseSlsRecursivelyReference(t.functions);
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
              ? !!o.default.isEmpty(this.region) && (e.warn('not found region property, skip update'), e.warn(`please check a input path : ${this.serverlessConfigPath}`), !0)
              : (e.warn('not found serverless config file, skip update'), e.warn(`please check a input path : ${this.serverlessConfigPath}`), !0);
          }
          addResource = (e) => {
            if (this.cannotProces()) return;
            const t = this.logger,
              { filePath: r, resourceName: a, cf: n } = e;
            (() => {
              const e = (0, l.loadYaml)(this.serverlessConfigPath) ?? {},
                a = s.default.join('./', r),
                n = e.resources ?? [];
              if (n.some((e) => e.includes(a))) t.warn(`already exists resource file path : ${a}`);
              else {
                n.push(`\${file(./${a})}`);
                const r = (0, l.writeYaml)(this.serverlessConfigPath, { ...e, resources: n });
                t.info(a), t.info((0, i.chalk)().green(r));
              }
            })(),
              (() => {
                try {
                  const e = (0, l.loadYaml)(r) ?? {};
                  if (o.default.has(e, `Resources.${a}`)) t.warn(`resource name : ${a}`), t.warn(`already exists resource file path : ${r}`);
                  else {
                    const a = (0, l.writeYaml)(r, { ...e, Resources: { ...e.Resources, ...n } });
                    t.info(r), t.info(`over right : ${r}`), t.info((0, i.chalk)().green(a));
                  }
                } catch (e) {
                  const a = (0, l.writeYaml)(r, { Resources: { ...n } });
                  t.info(`created yaml file : ${r}`), t.info((0, i.chalk)().green(a));
                }
              })();
          };
          addFunction = (e) => {
            if (this.cannotProces()) return;
            const { lambdaFunctionName: t, lambdaHandler: r, memorySize: a, timeout: s, code: n } = e,
              u = this.logger;
            u.debug("functionsYamlPath', functionsYamlPath"),
              (() => {
                const e = (0, l.loadYaml)(this.serverlessConfigPath) ?? {};
                if (o.default.isEmpty(e.functions)) {
                  const t = (0, l.writeYaml)(this.serverlessConfigPath, { ...e, functions: `\${file(./${this.defaultFunctionYamlPath})}` });
                  u.info('write functions property'), u.info((0, i.chalk)().green(t));
                }
              })(),
              (() => {
                const e = this.functionsYamlPath ?? this.defaultFunctionYamlPath;
                try {
                  const n = (0, l.loadYaml)(e) ?? {};
                  if (o.default.has(n, t)) u.warn(`already exists lambda function at, skip update : ${t}`);
                  else {
                    const o = (0, l.writeYaml)(e, {
                      ...n,
                      ...this.generateFunctionYamlProperty(t, { handler: r, memorySize: a ?? this.defaultMemorySize, timeout: s ?? this.defaultLambdaTimeOut }),
                    });
                    u.info('write functions property'), u.info((0, i.chalk)().green(o));
                  }
                } catch (n) {
                  const o = (0, l.writeYaml)(e, {
                    ...this.generateFunctionYamlProperty(t, { handler: r, memorySize: a ?? this.defaultMemorySize, timeout: s ?? this.defaultLambdaTimeOut }),
                  });
                  u.info('write functions property'), u.info((0, i.chalk)().green(o));
                }
              })(),
              new c.default({ handlerPath: r, code: n }).write();
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
            if (o.default.isEmpty(e)) return this.logger.warn('not found serverless config file, skip update'), this.logger.warn(`please check a input path : ${e}`), !1;
            try {
              return (0, l.loadYaml)(e), !0;
            } catch (t) {
              return this.logger.warn('not found serverless config file, skip update'), this.logger.warn(`please check a input path : ${e}`), !1;
            }
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
      6702: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.awsRegions = t.FeatureBuilderAbstract = t.FeatureHandlerAbstract = void 0);
        const s = a(r(2322)),
          n = r(6870);
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
      2762: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.asFullPath = t.createDirectories = t.isFileExists = t.isExistsDirectory = t.cleanUpTmpDirectory = t.moveDirectory = t.gitClone = void 0);
        const s = r(5033),
          n = a(r(6444)),
          i = a(r(4470)),
          o = a(r(2322)),
          l = a(r(6237)),
          u = a(r(1155)),
          c = a(r(1017));
        (t.gitClone = async function (e, t) {
          const r = n.default.getLogger();
          try {
            r.debug(`git clone : ${e} -> ${t}`),
              await i.default.promises.mkdir(t, { recursive: !0 }),
              await l.default.clone({ fs: i.default, http: u.default, dir: t, url: e, singleBranch: !0, depth: 1 });
          } catch (e) {
            const t = e;
            throw new s.CLIError(t.message);
          }
        }),
          (t.moveDirectory = function (e, t) {
            const r = n.default.getLogger();
            try {
              r.debug(`move : ${e} -> ${t}`), i.default.renameSync(e, t);
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
      8705: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = r(4361),
          n = r(4626),
          i = a(r(6517));
        t.default = class {
          constructor(e) {
            (this._scheme = e),
              (this._schemaComposer = i.default.isEmpty(e) ? [new s.SchemaComposer()] : e.map((e) => new s.SchemaComposer(e))),
              (this._mergedSchema = (0, n.mergeSchemas)({ schemas: this._schemaComposer.map((e) => e.buildSchema()) })),
              (this._mutations = this._schemaComposer.map((e) => e.getOTC('Mutation').getFields())),
              (this._queries = this._schemaComposer.map((e) => e.getOTC('Query').getFields())),
              (this._subscriptions = this._schemaComposer.map((e) => e.getOTC('Subscription').getFields()));
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
          _scheme;
          get scheme() {
            return this._scheme;
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
      5837: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(6517));
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
      1092: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(6517));
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
      6444: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(8545)),
          n = a(r(4233)),
          i = r(6870),
          o = a(r(6517)),
          l = (0, n.default)({
            colorize: !0,
            messageFormat: (e, t) => {
              const r = (t) => (30 === e.level ? i.chalk.white(t) : e.level < 30 ? i.chalk.grey(t) : 40 === e.level ? i.chalk.yellow(t) : e.level >= 50 ? i.chalk.red(t) : t),
                a = e[t];
              return o.default.isEmpty(a)
                ? o.default
                    .chain(e)
                    .omit(['level', 'time', 'pid', 'hostname'])
                    .thru((e) => JSON.stringify(e, null, 2))
                    .thru((e) => r(e))
                    .value()
                : e.requestId
                ? `[${e.requestId}] ${r(a)}`
                : r(a);
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
      3448: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = r(3462),
          n = a(r(8705)),
          i = a(r(6517)),
          o = a(r(7147)),
          l = a(r(1017)),
          u = a(r(2322));
        t.default = class {
          static parseLambdaHandlerPath(e) {
            const t = e.split('/'),
              r = t.slice(0, -1),
              a = t[t.length - 1];
            return [r.length > 0 ? r : [], a];
          }
          static parseSlsRecursivelyReference = (e) => {
            if (i.default.isEmpty(e)) return;
            const t = e.match(/\${file\((.*?)\)}/);
            return t ? t[1] : void 0;
          };
          static extractFilename(e) {
            return e.split('.')[0];
          }
          static parseAppSyncStack(e) {
            const t = (0, s.loadYaml)(e),
              { schema: r, dataSources: a, mappingTemplates: c, mappingTemplatesLocation: d, functionConfigurationsLocation: f, functionConfigurations: p } = t[0];
            return {
              mappingTemplatesLocation: d,
              functionConfigurationsLocation: f,
              functionConfigurations:
                i.default
                  .chain(p)
                  .map((e) => (0, s.loadYaml)(this.parseSlsRecursivelyReference(e)))
                  .flatten()
                  .filter((e) => e && !i.default.isEmpty(e))
                  .value() ?? [],
              dataSources:
                i.default
                  .chain(a)
                  .map((e) => (0, s.loadYaml)(this.parseSlsRecursivelyReference(e)))
                  .flatten()
                  .filter((e) => e && !i.default.isEmpty(e))
                  .value() ?? [],
              mappingTemplates:
                i.default
                  .chain(c)
                  .map((e) => (0, s.loadYaml)(this.parseSlsRecursivelyReference(e)))
                  .flatten()
                  .filter((e) => e && !i.default.isEmpty(e))
                  .value() ?? [],
              schema: i.default
                .chain(r)
                .thru((e) => {
                  if (i.default.isString(e) && !i.default.isEmpty(e)) {
                    const t = o.default.readFileSync(l.default.join(u.default.currentPath, e), 'utf8');
                    return i.default.isEmpty(t) ? [] : [t];
                  }
                  return i.default.isArray(e) && !i.default.isEmpty(e)
                    ? e
                        .map((e) => {
                          const t = o.default.readFileSync(l.default.join(u.default.currentPath, e), 'utf8');
                          return i.default.isEmpty(t) ? '' : t;
                        })
                        .filter((e) => !i.default.isEmpty(e))
                    : [];
                })
                .thru((e) => new n.default(e))
                .value(),
            };
          }
        };
      },
      7973: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = a(r(6517)),
          n = r(2414);
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
      2414: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const s = a(r(6028)),
          n = a(r(4179));
        t.getLocaleLang = (e) => ('ja' === e ? s.default : n.default);
      },
      3462: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.loadYaml = t.writeYaml = void 0);
        const s = a(r(7147)),
          n = a(r(9793)),
          i = r(4355),
          o = r(2762);
        (t.writeYaml = (e, t) => {
          const r = n.default.dump(t, { schema: i.schema, indent: 2, lineWidth: -1 });
          return (0, o.createDirectories)(e), s.default.writeFileSync((0, o.asFullPath)(e), r, 'utf8'), r;
        }),
          (t.loadYaml = (e) => n.default.load(s.default.readFileSync((0, o.asFullPath)(e), 'utf8'), { schema: i.schema }));
      },
      6870: function (e, t, r) {
        var a =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.chalk = t.init = void 0);
        const s = a(r(7347));
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
      4233: (e, t, r) => {
        const { isColorSupported: a } = r(8387),
          s = r(7304),
          { Transform: n } = r(3248),
          i = r(454),
          o = r(7915),
          l = r(903),
          { ERROR_LIKE_KEYS: u, MESSAGE_KEY: c, TIMESTAMP_KEY: d, LEVEL_KEY: f, LEVEL_NAMES: p } = r(7318),
          {
            isObject: m,
            prettifyErrorLog: h,
            prettifyLevel: g,
            prettifyMessage: y,
            prettifyMetadata: v,
            prettifyObject: _,
            prettifyTime: b,
            buildSafeSonicBoom: w,
            filterLog: P,
            handleCustomlevelsOpts: S,
            handleCustomlevelNamesOpts: L,
          } = r(385),
          E = (e) => {
            try {
              return { value: o.parse(e, { protoAction: 'remove' }) };
            } catch (e) {
              return { err: e };
            }
          },
          M = {
            colorize: a,
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
        function O(e) {
          const t = Object.assign({}, M, e),
            r = t.crlf ? '\r\n' : '\n',
            a = '    ',
            s = t.messageKey,
            n = t.levelKey,
            i = t.levelLabel,
            o = t.minimumLevel,
            u = t.messageFormat,
            c = t.timestampKey,
            d = t.errorLikeObjectKeys,
            w = t.errorProps.split(','),
            O = 'boolean' == typeof t.useOnlyCustomProps ? t.useOnlyCustomProps : 'true' === t.useOnlyCustomProps,
            k = S(t.customLevels),
            j = L(t.customLevels),
            x = t.customColors
              ? t.customColors.split(',').reduce((e, r) => {
                  const [a, s] = r.split(':'),
                    n = (O ? t.customLevels : void 0 !== j[a]) ? j[a] : p[a],
                    i = void 0 !== n ? n : a;
                  return e.push([i, s]), e;
                }, [])
              : void 0,
            C = { customLevels: k, customLevelNames: j };
          O && !t.customLevels && ((C.customLevels = void 0), (C.customLevelNames = void 0));
          const q = t.customPrettifiers,
            $ = void 0 !== t.include ? new Set(t.include.split(',')) : void 0,
            R = !$ && t.ignore ? new Set(t.ignore.split(',')) : void 0,
            A = t.hideObject,
            F = t.singleLine,
            D = l(t.colorize, x, O),
            N = t.colorizeObjects ? D : l(!1, [], !1);
          return function (e) {
            let l;
            if (m(e)) l = e;
            else {
              const t = E(e);
              if (t.err || !m(t.value)) return e + r;
              l = t.value;
            }
            if (o) {
              const e = ((O ? t.customLevels : void 0 !== j[o]) ? j[o] : p[o]) || Number(o);
              if (l[void 0 === n ? f : n] < e) return;
            }
            const S = y({ log: l, messageKey: s, colorizer: D, messageFormat: u, levelLabel: i, ...C, useOnlyCustomProps: O });
            (R || $) && (l = P({ log: l, ignoreKeys: R, includeKeys: $ }));
            const L = g({ log: l, colorizer: D, levelKey: n, prettifier: q.level, ...C }),
              M = v({ log: l, prettifiers: q }),
              k = b({ log: l, translateFormat: t.translateTime, timestampKey: c, prettifier: q.time });
            let x = '';
            if (
              (t.levelFirst && L && (x = `${L}`),
              k && '' === x ? (x = `${k}`) : k && (x = `${x} ${k}`),
              !t.levelFirst && L && (x = x.length > 0 ? `${x} ${L}` : L),
              M && (x = x.length > 0 ? `${x} ${M}:` : M),
              !1 === x.endsWith(':') && '' !== x && (x += ':'),
              S && (x = x.length > 0 ? `${x} ${S}` : S),
              x.length > 0 && !F && (x += r),
              'Error' === l.type && l.stack)
            ) {
              const e = h({ log: l, errorLikeKeys: d, errorProperties: w, ident: a, eol: r });
              F && (x += r), (x += e);
            } else if (!A) {
              const e = [s, n, c].filter((e) => 'string' == typeof l[e] || 'number' == typeof l[e]),
                t = _({ input: l, skipKeys: e, customPrettifiers: q, errorLikeKeys: d, eol: r, ident: a, singleLine: F, colorizer: N });
              F && !/^\s$/.test(t) && (x += ' '), (x += t);
            }
            return x;
          };
        }
        function k(e = {}) {
          const t = O(e);
          return i(
            function (r) {
              const a = new n({
                objectMode: !0,
                autoDestroy: !0,
                transform(e, r, a) {
                  a(null, t(e));
                },
              });
              let i;
              return (
                (i =
                  'object' == typeof e.destination && 'function' == typeof e.destination.write
                    ? e.destination
                    : w({ dest: e.destination || 1, append: e.append, mkdir: e.mkdir, sync: e.sync })),
                r.on('unknown', function (e) {
                  i.write(e + '\n');
                }),
                s(r, a, i),
                a
              );
            },
            { parse: 'lines' }
          );
        }
        (e.exports = k), (e.exports.prettyFactory = O), (e.exports.colorizerFactory = l), (e.exports.default = k);
      },
      903: (e, t, r) => {
        const { LEVELS: a, LEVEL_NAMES: s } = r(7318),
          n = (e) => e,
          i = { default: n, 60: n, 50: n, 40: n, 30: n, 20: n, 10: n, message: n, greyMessage: n },
          { createColors: o } = r(8387),
          l = o({ useColor: !0 }),
          { white: u, bgRed: c, red: d, yellow: f, green: p, blue: m, gray: h, cyan: g } = l,
          y = { default: u, 60: c, 50: d, 40: f, 30: p, 20: m, 10: h, message: g, greyMessage: h };
        function v(e) {
          return function (t, r, { customLevels: n, customLevelNames: i } = {}) {
            const o = e ? n || a : Object.assign({}, a, n),
              l = e ? i || s : Object.assign({}, s, i);
            let u = 'default';
            u = Number.isInteger(+t) ? (Object.prototype.hasOwnProperty.call(o, t) ? t : u) : Object.prototype.hasOwnProperty.call(l, t.toLowerCase()) ? l[t.toLowerCase()] : u;
            const c = o[u];
            return Object.prototype.hasOwnProperty.call(r, u) ? r[u](c) : r.default(c);
          };
        }
        e.exports = function (e = !1, t, r) {
          return e && void 0 !== t
            ? (function (e, t) {
                const r = (function (e) {
                    return e.reduce(
                      function (e, [t, r]) {
                        return (e[t] = 'function' == typeof l[r] ? l[r] : u), e;
                      },
                      { default: u, message: g, greyMessage: h }
                    );
                  })(e),
                  a = t ? r : Object.assign({}, y, r),
                  s = v(t),
                  n = function (e, t) {
                    return s(e, a, t);
                  };
                return (n.message = n.message || a.message), (n.greyMessage = n.greyMessage || a.greyMessage), n;
              })(t, r)
            : e
            ? (function (e) {
                const t = v(e),
                  r = function (e, r) {
                    return t(e, y, r);
                  };
                return (r.message = y.message), (r.greyMessage = y.greyMessage), r;
              })(r)
            : (function (e) {
                const t = v(e),
                  r = function (e, r) {
                    return t(e, i, r);
                  };
                return (r.message = i.message), (r.greyMessage = i.greyMessage), r;
              })(r);
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
      385: (e, t, r) => {
        const { createCopier: a } = r(4563),
          s = r(4612),
          n = r(5246),
          i = r(5376),
          { isMainThread: o } = r(1267),
          l = r(903)(),
          { DATE_FORMAT: u, ERROR_LIKE_KEYS: c, MESSAGE_KEY: d, LEVEL_KEY: f, LEVEL_LABEL: p, TIMESTAMP_KEY: m, LOGGER_KEYS: h, LEVELS: g, DATE_FORMAT_SIMPLE: y } = r(7318),
          v = a({});
        function _(e, t = !1) {
          if (!1 === t) return e;
          const r = b(e);
          if (!w(r)) return e;
          if (!0 === t) return s(r, y);
          const a = t.toUpperCase();
          if ('SYS:STANDARD' === a) return s(r, u);
          const n = a.substr(0, 4);
          return s(r, 'SYS:' === n || 'UTC:' === n ? ('UTC:' === n ? t : t.slice(4)) : `UTC:${t}`);
        }
        function b(e) {
          let t = new Date(e);
          return w(t) || (t = new Date(+e)), t;
        }
        function w(e) {
          return e instanceof Date && !Number.isNaN(e.getTime());
        }
        function P(e) {
          return '[object Object]' === Object.prototype.toString.apply(e);
        }
        function S({ input: e, ident: t = '    ', eol: r = '\n' }) {
          const a = e.split(/\r?\n/);
          for (let e = 1; e < a.length; e += 1) a[e] = t + a[e];
          return a.join(r);
        }
        function L({
          input: e,
          ident: t = '    ',
          eol: r = '\n',
          skipKeys: a = [],
          customPrettifiers: s = {},
          errorLikeKeys: n = c,
          excludeLoggerKeys: o = !0,
          singleLine: u = !1,
          colorizer: d = l,
        }) {
          const f = [].concat(a);
          !0 === o && Array.prototype.push.apply(f, h);
          let p = '';
          const { plain: m, errors: g } = Object.entries(e).reduce(
            ({ plain: t, errors: r }, [a, i]) => {
              if (!1 === f.includes(a)) {
                const o = 'function' == typeof s[a] ? s[a](i, a, e) : i;
                n.includes(a) ? (r[a] = o) : (t[a] = o);
              }
              return { plain: t, errors: r };
            },
            { plain: {}, errors: {} }
          );
          return (
            u
              ? (Object.keys(m).length > 0 && (p += d.greyMessage(i(m))), (p += r), (p = p.replace(/\\\\/gi, '\\')))
              : Object.entries(m).forEach(([e, a]) => {
                  let n = 'function' == typeof s[e] ? a : i(a, null, 2);
                  if (void 0 === n) return;
                  n = n.replace(/\\\\/gi, '\\');
                  const o = S({ input: n, ident: t, eol: r });
                  p += `${t}${e}:${o.startsWith(r) ? '' : ' '}${o}${r}`;
                }),
            Object.entries(g).forEach(([e, a]) => {
              const n = 'function' == typeof s[e] ? a : i(a, null, 2);
              void 0 !== n && (p += E({ keyName: e, lines: n, eol: r, ident: t }));
            }),
            p
          );
        }
        function E({ keyName: e, lines: t, eol: r, ident: a }) {
          let s = '';
          const n = `${a}${e}: ${S({ input: t, ident: a, eol: r })}${r}`.split(r);
          for (let e = 0; e < n.length; e += 1) {
            0 !== e && (s += r);
            const t = n[e];
            if (/^\s*"stack"/.test(t)) {
              const e = /^(\s*"stack":)\s*(".*"),?$/.exec(t);
              if (e && 3 === e.length) {
                const a = /^\s*/.exec(t)[0].length + 4,
                  n = ' '.repeat(a),
                  i = e[2];
                s += e[1] + r + n + JSON.parse(i).replace(/\n/g, r + n);
              } else s += t;
            } else s += t;
          }
          return s;
        }
        function M(e) {
          const t = [];
          let r = !1,
            a = '';
          for (let s = 0; s < e.length; s++) {
            const n = e.charAt(s);
            '\\' !== n ? (r ? ((r = !1), (a += n)) : '.' !== n ? (a += n) : (t.push(a), (a = ''))) : (r = !0);
          }
          return a.length && t.push(a), t;
        }
        function O(e, t) {
          const r = Array.isArray(t) ? t : M(t);
          for (const t of r) {
            if (!Object.prototype.hasOwnProperty.call(e, t)) return;
            e = e[t];
          }
          return e;
        }
        function k(e, t) {
          const r = M(t),
            a = r.pop();
          null !== (e = O(e, r)) && 'object' == typeof e && Object.prototype.hasOwnProperty.call(e, a) && delete e[a];
        }
        function j() {}
        function x(e, t) {
          e.destroyed ||
            ('beforeExit' === t
              ? (e.flush(),
                e.on('drain', function () {
                  e.end();
                }))
              : e.flushSync());
        }
        (e.exports = {
          isObject: P,
          prettifyErrorLog: function ({ log: e, messageKey: t = d, ident: r = '    ', eol: a = '\n', errorLikeKeys: s = c, errorProperties: n = [] }) {
            let i = `${r}${S({ input: e.stack, ident: r, eol: a })}${a}`;
            if (n.length > 0) {
              const o = h.concat(t, 'type', 'stack');
              let l;
              l = '*' === n[0] ? Object.keys(e).filter((e) => !1 === o.includes(e)) : n.filter((e) => !1 === o.includes(e));
              for (let t = 0; t < l.length; t += 1) {
                const n = l[t];
                n in e != 0 &&
                  (i = P(e[n]) ? `${i}${r}${n}: {${a}${L({ input: e[n], errorLikeKeys: s, excludeLoggerKeys: !1, eol: a, ident: r + r })}${r}}${a}` : `${i}${r}${n}: ${e[n]}${a}`);
              }
            }
            return i;
          },
          prettifyLevel: function ({ log: e, colorizer: t = l, levelKey: r = f, prettifier: a, customLevels: s, customLevelNames: n }) {
            const i = O(e, r);
            return void 0 === i ? void 0 : a ? a(i) : t(i, { customLevels: s, customLevelNames: n });
          },
          prettifyMessage: function ({
            log: e,
            messageFormat: t,
            messageKey: r = d,
            colorizer: a = l,
            levelLabel: s = p,
            levelKey: n = f,
            customLevels: i,
            useOnlyCustomProps: o,
          }) {
            if (t && 'string' == typeof t) {
              const r = String(t).replace(/{([^{}]+)}/g, function (t, r) {
                let a;
                return r === s && void 0 !== (a = O(e, n)) ? ((o ? void 0 === i : void 0 === i[a]) ? g[a] : i[a]) : O(e, r) || '';
              });
              return a.message(r);
            }
            if (t && 'function' == typeof t) {
              const n = t(e, r, s);
              return a.message(n);
            }
            return r in e == 0 || 'string' != typeof e[r] ? void 0 : a.message(e[r]);
          },
          prettifyMetadata: function ({ log: e, prettifiers: t = {} }) {
            let r = '';
            if (e.name || e.pid || e.hostname) {
              if (((r += '('), e.name && (r += t.name ? t.name(e.name) : e.name), e.pid)) {
                const a = t.pid ? t.pid(e.pid) : e.pid;
                e.name && e.pid ? (r += '/' + a) : (r += a);
              }
              e.hostname && (r += `${'(' === r ? 'on' : ' on'} ${t.hostname ? t.hostname(e.hostname) : e.hostname}`), (r += ')');
            }
            return e.caller && (r += `${'' === r ? '' : ' '}<${t.caller ? t.caller(e.caller) : e.caller}>`), '' === r ? void 0 : r;
          },
          prettifyObject: L,
          prettifyTime: function ({ log: e, timestampKey: t = m, translateFormat: r, prettifier: a }) {
            let s = null;
            if ((t in e ? (s = e[t]) : 'timestamp' in e && (s = e.timestamp), null === s)) return;
            const n = r ? _(s, r) : s;
            return a ? a(n) : `[${n}]`;
          },
          buildSafeSonicBoom: function (e) {
            const t = new n(e);
            return (
              t.on('error', function e(r) {
                if ('EPIPE' === r.code) return (t.write = j), (t.end = j), (t.flushSync = j), void (t.destroy = j);
                t.removeListener('error', e);
              }),
              !e.sync &&
                o &&
                (function (e) {
                  if (global.WeakRef && global.WeakMap && global.FinalizationRegistry) {
                    const t = r(2067);
                    t.register(e, x),
                      e.on('close', function () {
                        t.unregister(e);
                      });
                  }
                })(t),
              t
            );
          },
          filterLog: function ({ log: e, ignoreKeys: t, includeKeys: r }) {
            const a = v(e);
            if (r) {
              const e = {};
              return (
                r.forEach((t) => {
                  e[t] = a[t];
                }),
                e
              );
            }
            return (
              t.forEach((e) => {
                k(a, e);
              }),
              a
            );
          },
          handleCustomlevelsOpts: function (e) {
            return e
              ? 'string' == typeof e
                ? e.split(',').reduce(
                    (e, t, r) => {
                      const [a, s = r] = t.split(':');
                      return (e[s] = a.toUpperCase()), e;
                    },
                    { default: 'USERLVL' }
                  )
                : '[object Object]' === Object.prototype.toString.call(e)
                ? Object.keys(e).reduce((t, r, a) => ((t[e[r]] = r.toUpperCase()), t), { default: 'USERLVL' })
                : {}
              : {};
          },
          handleCustomlevelNamesOpts: function (e) {
            return e
              ? 'string' == typeof e
                ? e.split(',').reduce((e, t, r) => {
                    const [a, s = r] = t.split(':');
                    return (e[a.toLowerCase()] = s), e;
                  }, {})
                : '[object Object]' === Object.prototype.toString.call(e)
                ? Object.keys(e).reduce((t, r, a) => ((t[r.toLowerCase()] = e[r]), t), {})
                : {}
              : {};
          },
        }),
          (e.exports.internals = {
            formatTime: _,
            joinLinesWithIndentation: S,
            prettifyError: E,
            getPropertyValue: O,
            deleteLogProperty: k,
            splitPropertyKey: M,
            createDate: b,
            isValidDate: w,
          });
      },
      4147: (e) => {
        e.exports = JSON.parse(
          '{"name":"ragate-cli","version":"0.1.3","description":"Anyone can immediately start a serverless project using the CLI, automatically generate source code, and start an infinitely extensible and maintainable serverless development project.","engines":{"node":">=18.x"},"scripts":{"test":"echo \'Sorry, test code is in preparation.\\n\'","build:dev":"ENV=development webpack","build:prd":"ENV=production webpack","lint":"eslint . --fix","format":"prettier . --write","prepare":"husky install"},"eslintIgnore":["!/.github",".serverless","bin","tmp","webpack.config.js"],"main":"./lib/app.ts","bin":{"ragate":"./bin/app.js"},"repository":{"type":"git","url":"git+https://github.com/ragate-inc/ragate-cli.git"},"lint-staged":{"*.{ts,js}":["eslint"],"*.{css,html,js,json,md,yaml,yml,ts,js}":["prettier . --write"]},"keywords":["aws","serverless","ragate","cli","amplify","serverless","lambda","amazon"],"author":"Ragate inc.","license":"MIT","bugs":{"url":"https://github.com/ragate-inc/ragate-cli/issues"},"homepage":"https://github.com/ragate-inc/ragate-cli#readme","devDependencies":{"@tsconfig/node-lts":"^18.12.1","@types/figlet":"^1.5.6","@types/fs-extra":"^11.0.1","@types/inquirer":"^9.0.3","@types/inquirer-autocomplete-prompt":"^3.0.0","@types/js-yaml":"^4.0.5","@types/lodash":"^4.14.194","@types/node":"^18.16.3","@types/webpack":"^5.28.1","@types/webpack-node-externals":"^3.0.0","@types/yargs":"^17.0.24","@typescript-eslint/eslint-plugin":"^5.59.2","@typescript-eslint/parser":"^5.59.2","eslint":"^8.39.0","eslint-config-prettier":"^8.8.0","eslint-config-standard-with-typescript":"^34.0.1","husky":"^6.0.0","lint-staged":"^13.2.2","prettier":"2.8.8","ts-loader":"^9.4.2","ts-node":"^10.9.1","tsconfig-paths-webpack-plugin":"^4.0.1","typescript":"^5.0.4","webpack":"^5.81.0","webpack-cli":"^5.0.2","webpack-node-externals":"^3.0.0"},"dependencies":{"@aws-cdk/assert":"^2.68.0","@aws-cdk/aws-iam":"^1.201.0","@aws-cdk/aws-sns":"^1.201.0","@aws-cdk/aws-sns-subscriptions":"^1.201.0","@aws-cdk/aws-sqs":"^1.201.0","aws-cdk-lib":"^2.79.1","figlet":"^1.6.0","fs-extra":"^11.1.1","graphql":"^16.6.0","graphql-compose":"^9.0.10","graphql-tools":"^8.3.20","inquirer":"^8.0.0","inquirer-autocomplete-prompt":"^2.0.0","isomorphic-git":"^1.23.0","js-yaml":"^4.1.0","lodash":"^4.17.21","parent-require":"^1.0.0","pino":"^8.12.1","pino-pretty":"^10.0.0","yaml-cfn":"^0.3.2","yargonaut":"^1.1.4","yargs":"^17.1.1-candidate.0"}}'
        );
      },
    },
    t = {};
  !(function r(a) {
    var s = t[a];
    if (void 0 !== s) return s.exports;
    var n = (t[a] = { exports: {} });
    return e[a].call(n.exports, n, n.exports, r), n.exports;
  })(4712);
})();
