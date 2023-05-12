#!/usr/bin/env node
(() => {
  'use strict';
  var e = {
      4712: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(9026));
        (async () => {
          const e = new o.default();
          await e.run();
        })();
      },
      2322: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(4147)),
          a = s(r(6517)),
          n = s(r(1017)),
          i = {
            npmVersion: o.default.version,
            repositoyUrl: 'https://github.com/ragate-inc/serverless-starter',
            tmpPath: `${n.default.dirname(process.argv[1])}/../tmp`,
            currentPath: n.default.resolve(),
            templates: a.default
              .chain([{ category: 'Node.js', name: 'Node.js - aws-node-appsync', value: 'aws-node-appsync' }])
              .sortBy('category')
              .map((e) => ({ name: `${e.category} - ${e.name}`, value: e.value }))
              .value(),
          };
        t.default = i;
      },
      9026: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(6444)),
          a = s(r(9267)),
          n = r(6870),
          i = s(r(2322)),
          l = r(8014),
          u = s(r(8798)),
          c = s(r(8072)),
          d = r(6702),
          p = s(r(6517)),
          f = r(2762);
        t.default = class {
          constructor() {
            try {
              (0, n.init)(), (this.chalk = n.chalk);
              const e = (0, a.default)(process.argv.slice(2))
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
                (this.logger = o.default.getLogger(this.verbose ? 'debug' : 'info')),
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
            const t = [];
            e && (e.stack ? t.push(e.stack) : t.push(e.message)), console.error('\n', n.chalk.red(t.join('\n\n'))), process.exit(1);
          }
          cli() {
            const { version: e, chalk: t, locale: r, lang: s } = this;
            return (0, a.default)(process.argv.slice(2))
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
              .wrap(Math.max((0, a.default)().terminalWidth() - 5, 60))
              .locale(s)
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
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const o = s(r(6471)),
          a = s(r(1843));
        t.getLocaleLang = (e) => ('ja' === e ? o.default : a.default);
      },
      5033: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.DuplicatedPropertyError = t.CLIError = t.EnvironmentError = t.BaseClass = void 0);
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
          }),
          (t.DuplicatedPropertyError = class extends r {
            constructor(e) {
              super(e), (this.name = 'DuplicatedPropertyError');
            }
          });
      },
      6040: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = r(6702),
          a = s(r(6444)),
          n = s(r(9211)),
          i = s(r(592)),
          l = r(6870),
          u = r(7264);
        class c extends o.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            const t = this.args.lang,
              r = (0, u.getLocaleLang)(t),
              s = a.default.getLogger();
            return e
              .version(!1)
              .usage('Usage: add <command> <options>')
              .command(
                'sns',
                l.chalk.grey(r.command.description.sns),
                (e) => new n.default.builder(this.args).build(e),
                (e) => new n.default.handler(e).run()
              )
              .command(
                'sqs',
                l.chalk.grey(r.command.description.sns),
                (e) => new i.default.builder(this.args).build(e),
                (e) => new i.default.handler(e).run()
              )
              .command(
                '*',
                l.chalk.grey('<command> <options>'),
                () => ({}),
                () => {
                  s.error(l.chalk.red(r.unProcessed));
                }
              );
          }
        }
        t.default = c;
      },
      6433: (e, t, r) => {
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = r(6702);
        class o extends s.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            return e.version(!1).usage('Usage: $0 sns');
          }
        }
        t.default = o;
      },
      2917: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(6444)),
          a = r(6702),
          n = s(r(6517)),
          i = r(3462),
          l = r(3362),
          u = r(5033),
          c = s(r(3290)),
          d = s(r(7973)),
          p = s(r(6243)),
          f = s(r(5735));
        class m extends a.FeatureHandlerAbstract {
          constructor(e) {
            super(e);
          }
          get defaultResourcePath() {
            return `serverless/${this.argv.region}/resources/sns.yml`;
          }
          get defaultServerlessConfigPath() {
            return `serverless/${this.argv.region}/serverless.yml`;
          }
          async run() {
            const e = o.default.getLogger(),
              t = (0, l.getLocaleLang)(this.lang),
              r = await c.default
                .prompt([
                  {
                    type: 'input',
                    name: 'resourceName',
                    message: 'input a sns resource name',
                    filter: (e) => e.replace(/\s+/g, ''),
                    transformer: (e) => e.replace(/\s+/g, ''),
                    validate: (e) => (n.default.isEmpty(e) ? t.error.reqiredResourceName : d.default.resourceName(e, this.lang)),
                  },
                  {
                    type: 'checkbox',
                    name: 'subscriptions',
                    message: 'select a sns subscriptions',
                    choices: ['email', 'lambda'],
                    validate: (e) => !n.default.isEmpty(e) || t.error.reqiredSubscriptions,
                  },
                  {
                    type: 'input',
                    name: 'filePath',
                    message: 'input a cloudformation file path',
                    default: () => this.defaultResourcePath,
                    validate: (e) => d.default.filePath(e, this.lang),
                    transformer: (e) => p.default.filePath(e),
                    filter: (e) => f.default.filePath(e),
                  },
                  {
                    type: 'input',
                    name: 'serverlessConfigPath',
                    message: 'input a serverless config file path',
                    default: () => this.defaultServerlessConfigPath,
                    validate: (e) => d.default.serverlessConfigPath(e, this.lang),
                    transformer: (e) => p.default.serverlessConfigPath(e),
                    filter: (e) => f.default.serverlessConfigPath(e),
                  },
                ])
                .then((e) => e);
            e.debug(`input values : ${JSON.stringify(r)}}`);
            const { resourceName: s, filePath: a, subscriptions: m, serverlessConfigPath: g } = r,
              h = {
                Type: 'AWS::SNS::Topic',
                Properties: { TopicName: s, Subscription: m.map((e) => ({ Endpoint: 'email' === e ? 'Your email address' : 'Your lambda Arn', Protocol: e })) },
              };
            try {
              const r = (0, i.readYaml)(a) ?? {};
              if (n.default.hasIn(r, `Resources.${s}`))
                throw (e.error(`${t.error.alreadyExistResource}`), e.error(`ResourceName : ${s}`), e.error(r), new u.DuplicatedPropertyError(t.error.alreadyExistResource));
              const o = (0, i.writeYaml)(a, { ...r, Resources: { ...r.Resources, [s]: h } });
              e.info(a), e.info(`${t.overrightFile} : ${a}`), e.info(o);
            } catch (r) {
              if ('DuplicatedPropertyError' === r.name) throw r;
              const o = (0, i.writeYaml)(a, { Resources: { [s]: h } });
              e.info(a), e.info(`${t.outputFile} : ${a}`), e.info(o);
            }
            (0, i.writeServerlessConfig)({ serverlessConfigPath: g, resourceFilePath: a });
          }
        }
        t.default = m;
      },
      9211: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(6433)),
          a = s(r(2917));
        t.default = { builder: o.default, handler: a.default };
      },
      6353: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            error: {
              reqiredResourceName: 'resource name is required',
              reqiredSubscriptions: 'required select a subscriptions',
              mustByYamlFilePath: 'path is not yaml file',
              alreadyExistResource: 'resource name is already exists',
            },
            overrightFile: 'overright yaml file',
            outputFile: 'output yaml file',
          });
      },
      5423: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            error: {
              reqiredResourceName: 'リソース名を指定して下さい',
              reqiredSubscriptions: 'サブスクリプションを選択して下さい',
              mustByYamlFilePath: 'Yamlファイルのパスを指定して下さい',
              alreadyExistResource: '指定のリソース名は既に存在します',
            },
            overrightFile: 'Yamlファイルを上書き',
            outputFile: 'Yamlファイルを出力',
          });
      },
      3362: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const o = s(r(5423)),
          a = s(r(6353));
        t.getLocaleLang = (e) => ('ja' === e ? o.default : a.default);
      },
      6621: (e, t, r) => {
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = r(6702);
        class o extends s.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            return e.version(!1).usage('Usage: $0 sqs');
          }
        }
        t.default = o;
      },
      4267: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(6444)),
          a = r(6702),
          n = s(r(6517)),
          i = r(3462),
          l = r(7009),
          u = r(5033),
          c = s(r(3290)),
          d = s(r(7973)),
          p = s(r(6243)),
          f = s(r(5735));
        class m extends a.FeatureHandlerAbstract {
          constructor(e) {
            super(e);
          }
          get defaultResourcePath() {
            return `serverless/${this.argv.region}/resources/sqs.yml`;
          }
          get defaultServerlessConfigPath() {
            return `serverless/${this.argv.region}/serverless.yml`;
          }
          async run() {
            const e = o.default.getLogger(),
              t = (0, l.getLocaleLang)(this.lang),
              r = await c.default
                .prompt([
                  {
                    type: 'input',
                    name: 'resourceName',
                    message: 'input a sqs resource name',
                    filter: (e) => e.replace(/\s+/g, ''),
                    transformer: (e) => e.replace(/\s+/g, ''),
                    validate: (e) => (n.default.isEmpty(e) ? t.error.reqiredResourceName : d.default.resourceName(e, this.lang)),
                  },
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
                    default: () => this.defaultResourcePath,
                    validate: (e) => d.default.filePath(e, this.lang),
                    transformer: (e) => p.default.filePath(e),
                    filter: (e) => f.default.filePath(e),
                  },
                  {
                    type: 'input',
                    name: 'serverlessConfigPath',
                    message: 'input a serverless config file path',
                    default: () => this.defaultServerlessConfigPath,
                    validate: (e) => d.default.serverlessConfigPath(e, this.lang),
                    transformer: (e) => p.default.serverlessConfigPath(e),
                    filter: (e) => f.default.serverlessConfigPath(e),
                  },
                ])
                .then((e) => e);
            e.debug(`input values : ${JSON.stringify(r)}}`);
            const { resourceName: s, queueType: a, useDeadLetterQueue: m, contentBasedDeduplication: g, filePath: h, serverlessConfigPath: y } = r,
              v = { Resources: {} };
            if ('Standard' === a) {
              const e = {
                Type: 'AWS::SQS::Queue',
                Properties: { ContentBasedDeduplication: g, DelaySeconds: 0, MaximumMessageSize: 262144, MessageRetentionPeriod: 240, QueueName: s, VisibilityTimeout: 40 },
              };
              if (m) {
                const t = `${s}DeadLetter`,
                  r = { Type: 'AWS::SQS::Queue', Properties: { DelaySeconds: 0, MaximumMessageSize: 262144, MessageRetentionPeriod: 240, QueueName: t, VisibilityTimeout: 40 } };
                (e.Properties.RedrivePolicy = { deadLetterTargetArn: `!GetAtt ${t}.Arn`, maxReceiveCount: 5 }), (v.Resources = { ...v.Resources, [t]: r });
              }
              v.Resources = { ...v.Resources, [s]: e };
            } else if ('Fifo' === a) {
              const e = {
                Type: 'AWS::SQS::Queue',
                Properties: {
                  ContentBasedDeduplication: g,
                  DelaySeconds: 0,
                  FifoQueue: !0,
                  MaximumMessageSize: 262144,
                  MessageRetentionPeriod: 240,
                  QueueName: s,
                  VisibilityTimeout: 40,
                },
              };
              if (m) {
                const t = `${s}DeadLetter`,
                  r = {
                    Type: 'AWS::SQS::Queue',
                    Properties: { DelaySeconds: 0, FifoQueue: !0, MaximumMessageSize: 262144, MessageRetentionPeriod: 345600, QueueName: t, VisibilityTimeout: 60 },
                  };
                (e.Properties.RedrivePolicy = { deadLetterTargetArn: `!GetAtt ${t}.Arn`, maxReceiveCount: 5 }), (v.Resources = { ...v.Resources, [t]: r });
              }
              v.Resources = { ...v.Resources, [s]: e };
            }
            try {
              const r = (0, i.readYaml)(h) ?? {};
              if (n.default.hasIn(r, `Resources.${s}`))
                throw (e.error(`${t.error.alreadyExistResource}`), e.error(`ResourceName : ${s}`), e.error(r), new u.DuplicatedPropertyError(t.error.alreadyExistResource));
              const o = (0, i.writeYaml)(h, { ...r, Resources: { ...r.Resources, ...v.Resources } });
              e.info(h), e.info(`${t.overrightFile} : ${h}`), e.info(o);
            } catch (r) {
              if ('DuplicatedPropertyError' === r.name) throw r;
              const s = (0, i.writeYaml)(h, v);
              e.info(h), e.info(`${t.outputFile} : ${h}`), e.info(s);
            }
            (0, i.writeServerlessConfig)({ serverlessConfigPath: y, resourceFilePath: h });
          }
        }
        t.default = m;
      },
      592: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(6621)),
          a = s(r(4267));
        t.default = { builder: o.default, handler: a.default };
      },
      7450: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            error: { reqiredResourceName: 'resource name is required', mustByYamlFilePath: 'path is not yaml file', alreadyExistResource: 'resource name is already exists' },
            overrightFile: 'overright yaml file',
            outputFile: 'output yaml file',
          });
      },
      911: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            error: {
              reqiredResourceName: 'リソース名を指定して下さい',
              mustByYamlFilePath: 'Yamlファイルのパスを指定して下さい',
              alreadyExistResource: '指定のリソース名は既に存在します',
            },
            overrightFile: 'Yamlファイルを上書き',
            outputFile: 'Yamlファイルを出力',
          });
      },
      7009: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const o = s(r(911)),
          a = s(r(7450));
        t.getLocaleLang = (e) => ('ja' === e ? o.default : a.default);
      },
      8072: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(6040));
        t.default = { builder: o.default };
      },
      4005: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            command: { description: { sns: 'add AWS SQS', sqs: 'add AWS SQS' } },
            unProcessed: 'The command entered does not exist. Run "ragate add help" for a list of all available commands.',
          });
      },
      5699: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            command: { description: { sns: 'AWS SQSを追加', sqs: 'AWS SQSを追加' } },
            unProcessed: '入力されたコマンドは存在しません。「ragate add help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',
          });
      },
      7264: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const o = s(r(5699)),
          a = s(r(4005));
        t.getLocaleLang = (e) => ('ja' === e ? o.default : a.default);
      },
      3818: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = r(6702),
          a = r(6870),
          n = s(r(8798));
        class i extends o.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            return e
              .version(!1)
              .usage('Usage: create <options>')
              .command(
                '*',
                a.chalk.grey('<command> <options>'),
                () => ({}),
                (e) => {
                  if (1 === e._.length) return new n.default.handler(e).run();
                  throw new Error('locale.error.unProcessed');
                }
              );
          }
        }
        t.default = i;
      },
      975: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(3290)),
          a = s(r(2322)),
          n = r(2868),
          i = s(r(6517)),
          l = s(r(169)),
          u = r(2762),
          c = s(r(6444)),
          d = r(6702);
        class p extends d.FeatureHandlerAbstract {
          constructor(e) {
            super(e), o.default.registerPrompt('autocomplete', l.default);
          }
          async run() {
            const { argv: e } = this,
              t = c.default.getLogger();
            t.debug('create hander : ', e);
            const r = (0, n.getLocaleLang)(this.lang),
              s = await o.default
                .prompt([
                  {
                    type: 'autocomplete',
                    name: 'template',
                    emptyText: r.inquirer.template.autocomplete.emptyText,
                    message: r.inquirer.template.choiceTemplate,
                    source: (e, t) => (i.default.isEmpty(t) ? a.default.templates : a.default.templates.filter((e) => e.name.includes(t))),
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
            t.debug(`input values : ${JSON.stringify(s)}}`);
            const { template: l, projectName: d } = s;
            if ((t.info(`template : ${l}`), t.info(`projectName : ${d}`), (0, u.isExistsDirectory)(`${a.default.currentPath}/${d}`)))
              throw new Error(`${r.error.alreadyExistsDirectory} : ${a.default.currentPath}/${d}`);
            await (0, u.gitClone)(a.default.repositoyUrl, a.default.tmpPath), (0, u.moveDirectory)(`${a.default.tmpPath}/${l}`, `${a.default.currentPath}/${d}`);
          }
        }
        t.default = p;
      },
      8798: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(3818)),
          a = s(r(975));
        t.default = { builder: o.default, handler: a.default };
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
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const o = s(r(7016)),
          a = s(r(7544));
        t.getLocaleLang = (e) => ('ja' === e ? o.default : a.default);
      },
      6702: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.awsRegions = t.FeatureBuilderAbstract = t.FeatureHandlerAbstract = void 0);
        const o = s(r(2322)),
          a = r(6870);
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
              (this._chalk = a.chalk), (this._args = e), (this._npmVersion = o.default.npmVersion);
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
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.isExistsDirectory = t.cleanUpTmpDirectory = t.moveDirectory = t.gitClone = void 0);
        const o = r(5033),
          a = s(r(6444)),
          n = s(r(4470)),
          i = s(r(2322)),
          l = s(r(6237)),
          u = s(r(1155));
        (t.gitClone = async function (e, t) {
          const r = a.default.getLogger();
          try {
            r.debug(`git clone : ${e} -> ${t}`),
              await n.default.promises.mkdir(t, { recursive: !0 }),
              await l.default.clone({ fs: n.default, http: u.default, dir: t, url: e, singleBranch: !0, depth: 1 });
          } catch (e) {
            const t = e;
            throw new o.CLIError(t.message);
          }
        }),
          (t.moveDirectory = function (e, t) {
            const r = a.default.getLogger();
            try {
              r.debug(`move : ${e} -> ${t}`), n.default.renameSync(e, t);
            } catch (e) {
              const t = e;
              throw new o.CLIError(t.message);
            }
          }),
          (t.cleanUpTmpDirectory = function () {
            const e = a.default.getLogger();
            try {
              e.debug(`clean up tmp directory : ${i.default.tmpPath}`),
                n.default.removeSync(i.default.tmpPath),
                e.debug(`create tmp directory : ${i.default.tmpPath}`),
                n.default.mkdirSync(i.default.tmpPath, { recursive: !0 });
            } catch (e) {
              const t = e;
              throw new o.CLIError(t.message);
            }
          }),
          (t.isExistsDirectory = function (e) {
            const t = a.default.getLogger();
            try {
              return t.debug(`check exists directory : ${e}`), n.default.statSync(e).isDirectory();
            } catch (e) {
              if ('ENOENT' === e.code) return !1;
              throw e;
            }
          });
      },
      5735: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = class {
            static filePath = (e) => e.replace(/\s+/g, '');
            static serverlessConfigPath = (e) => e.replace(/\s+/g, '');
          });
      },
      6444: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(8545)),
          a = s(r(4233)),
          n = r(6870),
          i = s(r(6517)),
          l = (0, a.default)({
            colorize: !0,
            messageFormat: (e, t) => {
              const r = (t) => (30 === e.level ? n.chalk.white(t) : e.level < 30 ? n.chalk.grey(t) : 40 === e.level ? n.chalk.yellow(t) : e.level >= 50 ? n.chalk.red(t) : t),
                s = e[t];
              return i.default.isEmpty(s)
                ? i.default
                    .chain(e)
                    .omit(['level', 'time', 'pid', 'hostname'])
                    .thru((e) => JSON.stringify(e, null, 2))
                    .thru((e) => r(e))
                    .value()
                : e.requestId
                ? `[${e.requestId}] ${r(s)}`
                : r(s);
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
              ? ((this.logger = (0, o.default)({ level: e ?? 'info' }, l)), this.logger)
              : (this.logger || (this.logger = (0, o.default)({ level: e ?? 'info' }, l)), this.logger);
          }
        };
      },
      6243: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = class {
            static filePath = (e) => e.replace(/\s+/g, '');
            static serverlessConfigPath = (e) => e.replace(/\s+/g, '');
          });
      },
      7973: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(6517)),
          a = r(2414);
        t.default = class {
          static resourceName = (e, t) => {
            const r = (0, a.getLocaleLang)(t);
            return !/[^\x01-\x7E]/.test(e) || r.resourceName.invalidFormat;
          };
          static filePath = (e, t) => {
            const r = (0, a.getLocaleLang)(t);
            return o.default.isEmpty(e) ? r.filePath.required : !(!e.endsWith('.yml') && !e.endsWith('.yaml')) || r.mustBeYaml;
          };
          static serverlessConfigPath = (e, t) => {
            const r = (0, a.getLocaleLang)(t);
            return o.default.isEmpty(e) ? r.serverlessConfigPath.required : !(!e.endsWith('.yml') && !e.endsWith('.yaml')) || r.mustBeYaml;
          };
        };
      },
      4179: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            mustBeYaml: 'input a yaml file path',
            resourceName: { invalidFormat: 'invalid format' },
            filePath: { required: 'required input a cloudformation file path' },
            serverlessConfigPath: { required: 'required input a serverless config file path' },
          });
      },
      6028: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            mustBeYaml: 'Yamlファイルを指定して下さい',
            resourceName: { invalidFormat: '正しいフォーマットで入力して下さい' },
            filePath: { required: 'クラウドフォーメーションのパスは必須です' },
            serverlessConfigPath: { required: 'サーバーレスフレームワークの設定ファイル(serverless.yml)のパスは必須です' },
          });
      },
      2414: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const o = s(r(6028)),
          a = s(r(4179));
        t.getLocaleLang = (e) => ('ja' === e ? o.default : a.default);
      },
      3462: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.writeServerlessConfig = t.readYaml = t.writeYaml = void 0);
        const o = s(r(9793)),
          a = s(r(7147)),
          n = s(r(1017)),
          i = s(r(6444)),
          l = s(r(2322)),
          u = (e) => (e.startsWith('/') ? e : `${l.default.currentPath}/${e}`);
        (t.writeYaml = (e, t) => {
          const r = o.default.dump(t, {});
          return (
            e
              .split(n.default.sep)
              .slice(0, -1)
              .reduce((e, t) => ((e = n.default.join(e, t)), a.default.existsSync(e) || a.default.mkdirSync(e), e), ''),
            a.default.writeFileSync(u(e), r, 'utf8'),
            r
          );
        }),
          (t.readYaml = (e) => o.default.load(a.default.readFileSync(u(e), 'utf8'))),
          (t.writeServerlessConfig = (e) => {
            const { serverlessConfigPath: r, resourceFilePath: s } = e,
              o = i.default.getLogger(),
              a = s.startsWith('/') ? s : `/${s}`;
            try {
              const e = (0, t.readYaml)(r) ?? {},
                n = e.resources ?? [];
              if (n.includes(s)) return;
              n.push(`\${file(.${a})}`);
              const i = (0, t.writeYaml)(r, { ...e, resources: n });
              o.info(a), o.info(i);
            } catch (e) {
              o.debug(e), o.warn('not found serverless config file, skip update'), o.warn(`please check a input path : ${r}`);
            }
          });
      },
      6870: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.chalk = t.init = void 0);
        const o = s(r(7347));
        (t.init = () => o.default.font('SansSerif').helpStyle('grey').errorsStyle('red')), (t.chalk = o.default.chalk());
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
        const { isColorSupported: s } = r(8387),
          o = r(7304),
          { Transform: a } = r(3248),
          n = r(454),
          i = r(7915),
          l = r(903),
          { ERROR_LIKE_KEYS: u, MESSAGE_KEY: c, TIMESTAMP_KEY: d, LEVEL_KEY: p, LEVEL_NAMES: f } = r(7318),
          {
            isObject: m,
            prettifyErrorLog: g,
            prettifyLevel: h,
            prettifyMessage: y,
            prettifyMetadata: v,
            prettifyObject: _,
            prettifyTime: b,
            buildSafeSonicBoom: P,
            filterLog: L,
            handleCustomlevelsOpts: E,
            handleCustomlevelNamesOpts: M,
          } = r(385),
          S = (e) => {
            try {
              return { value: i.parse(e, { protoAction: 'remove' }) };
            } catch (e) {
              return { err: e };
            }
          },
          w = {
            colorize: s,
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
        function j(e) {
          const t = Object.assign({}, w, e),
            r = t.crlf ? '\r\n' : '\n',
            s = '    ',
            o = t.messageKey,
            a = t.levelKey,
            n = t.levelLabel,
            i = t.minimumLevel,
            u = t.messageFormat,
            c = t.timestampKey,
            d = t.errorLikeObjectKeys,
            P = t.errorProps.split(','),
            j = 'boolean' == typeof t.useOnlyCustomProps ? t.useOnlyCustomProps : 'true' === t.useOnlyCustomProps,
            O = E(t.customLevels),
            x = M(t.customLevels),
            $ = t.customColors
              ? t.customColors.split(',').reduce((e, r) => {
                  const [s, o] = r.split(':'),
                    a = (j ? t.customLevels : void 0 !== x[s]) ? x[s] : f[s],
                    n = void 0 !== a ? a : s;
                  return e.push([n, o]), e;
                }, [])
              : void 0,
            R = { customLevels: O, customLevelNames: x };
          j && !t.customLevels && ((R.customLevels = void 0), (R.customLevelNames = void 0));
          const k = t.customPrettifiers,
            C = void 0 !== t.include ? new Set(t.include.split(',')) : void 0,
            D = !C && t.ignore ? new Set(t.ignore.split(',')) : void 0,
            q = t.hideObject,
            A = t.singleLine,
            F = l(t.colorize, $, j),
            N = t.colorizeObjects ? F : l(!1, [], !1);
          return function (e) {
            let l;
            if (m(e)) l = e;
            else {
              const t = S(e);
              if (t.err || !m(t.value)) return e + r;
              l = t.value;
            }
            if (i) {
              const e = ((j ? t.customLevels : void 0 !== x[i]) ? x[i] : f[i]) || Number(i);
              if (l[void 0 === a ? p : a] < e) return;
            }
            const E = y({ log: l, messageKey: o, colorizer: F, messageFormat: u, levelLabel: n, ...R, useOnlyCustomProps: j });
            (D || C) && (l = L({ log: l, ignoreKeys: D, includeKeys: C }));
            const M = h({ log: l, colorizer: F, levelKey: a, prettifier: k.level, ...R }),
              w = v({ log: l, prettifiers: k }),
              O = b({ log: l, translateFormat: t.translateTime, timestampKey: c, prettifier: k.time });
            let $ = '';
            if (
              (t.levelFirst && M && ($ = `${M}`),
              O && '' === $ ? ($ = `${O}`) : O && ($ = `${$} ${O}`),
              !t.levelFirst && M && ($ = $.length > 0 ? `${$} ${M}` : M),
              w && ($ = $.length > 0 ? `${$} ${w}:` : w),
              !1 === $.endsWith(':') && '' !== $ && ($ += ':'),
              E && ($ = $.length > 0 ? `${$} ${E}` : E),
              $.length > 0 && !A && ($ += r),
              'Error' === l.type && l.stack)
            ) {
              const e = g({ log: l, errorLikeKeys: d, errorProperties: P, ident: s, eol: r });
              A && ($ += r), ($ += e);
            } else if (!q) {
              const e = [o, a, c].filter((e) => 'string' == typeof l[e] || 'number' == typeof l[e]),
                t = _({ input: l, skipKeys: e, customPrettifiers: k, errorLikeKeys: d, eol: r, ident: s, singleLine: A, colorizer: N });
              A && !/^\s$/.test(t) && ($ += ' '), ($ += t);
            }
            return $;
          };
        }
        function O(e = {}) {
          const t = j(e);
          return n(
            function (r) {
              const s = new a({
                objectMode: !0,
                autoDestroy: !0,
                transform(e, r, s) {
                  s(null, t(e));
                },
              });
              let n;
              return (
                (n =
                  'object' == typeof e.destination && 'function' == typeof e.destination.write
                    ? e.destination
                    : P({ dest: e.destination || 1, append: e.append, mkdir: e.mkdir, sync: e.sync })),
                r.on('unknown', function (e) {
                  n.write(e + '\n');
                }),
                o(r, s, n),
                s
              );
            },
            { parse: 'lines' }
          );
        }
        (e.exports = O), (e.exports.prettyFactory = j), (e.exports.colorizerFactory = l), (e.exports.default = O);
      },
      903: (e, t, r) => {
        const { LEVELS: s, LEVEL_NAMES: o } = r(7318),
          a = (e) => e,
          n = { default: a, 60: a, 50: a, 40: a, 30: a, 20: a, 10: a, message: a, greyMessage: a },
          { createColors: i } = r(8387),
          l = i({ useColor: !0 }),
          { white: u, bgRed: c, red: d, yellow: p, green: f, blue: m, gray: g, cyan: h } = l,
          y = { default: u, 60: c, 50: d, 40: p, 30: f, 20: m, 10: g, message: h, greyMessage: g };
        function v(e) {
          return function (t, r, { customLevels: a, customLevelNames: n } = {}) {
            const i = e ? a || s : Object.assign({}, s, a),
              l = e ? n || o : Object.assign({}, o, n);
            let u = 'default';
            u = Number.isInteger(+t) ? (Object.prototype.hasOwnProperty.call(i, t) ? t : u) : Object.prototype.hasOwnProperty.call(l, t.toLowerCase()) ? l[t.toLowerCase()] : u;
            const c = i[u];
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
                      { default: u, message: h, greyMessage: g }
                    );
                  })(e),
                  s = t ? r : Object.assign({}, y, r),
                  o = v(t),
                  a = function (e, t) {
                    return o(e, s, t);
                  };
                return (a.message = a.message || s.message), (a.greyMessage = a.greyMessage || s.greyMessage), a;
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
                    return t(e, n, r);
                  };
                return (r.message = n.message), (r.greyMessage = n.greyMessage), r;
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
        const { createCopier: s } = r(4563),
          o = r(4612),
          a = r(5246),
          n = r(5376),
          { isMainThread: i } = r(1267),
          l = r(903)(),
          { DATE_FORMAT: u, ERROR_LIKE_KEYS: c, MESSAGE_KEY: d, LEVEL_KEY: p, LEVEL_LABEL: f, TIMESTAMP_KEY: m, LOGGER_KEYS: g, LEVELS: h, DATE_FORMAT_SIMPLE: y } = r(7318),
          v = s({});
        function _(e, t = !1) {
          if (!1 === t) return e;
          const r = b(e);
          if (!P(r)) return e;
          if (!0 === t) return o(r, y);
          const s = t.toUpperCase();
          if ('SYS:STANDARD' === s) return o(r, u);
          const a = s.substr(0, 4);
          return o(r, 'SYS:' === a || 'UTC:' === a ? ('UTC:' === a ? t : t.slice(4)) : `UTC:${t}`);
        }
        function b(e) {
          let t = new Date(e);
          return P(t) || (t = new Date(+e)), t;
        }
        function P(e) {
          return e instanceof Date && !Number.isNaN(e.getTime());
        }
        function L(e) {
          return '[object Object]' === Object.prototype.toString.apply(e);
        }
        function E({ input: e, ident: t = '    ', eol: r = '\n' }) {
          const s = e.split(/\r?\n/);
          for (let e = 1; e < s.length; e += 1) s[e] = t + s[e];
          return s.join(r);
        }
        function M({
          input: e,
          ident: t = '    ',
          eol: r = '\n',
          skipKeys: s = [],
          customPrettifiers: o = {},
          errorLikeKeys: a = c,
          excludeLoggerKeys: i = !0,
          singleLine: u = !1,
          colorizer: d = l,
        }) {
          const p = [].concat(s);
          !0 === i && Array.prototype.push.apply(p, g);
          let f = '';
          const { plain: m, errors: h } = Object.entries(e).reduce(
            ({ plain: t, errors: r }, [s, n]) => {
              if (!1 === p.includes(s)) {
                const i = 'function' == typeof o[s] ? o[s](n, s, e) : n;
                a.includes(s) ? (r[s] = i) : (t[s] = i);
              }
              return { plain: t, errors: r };
            },
            { plain: {}, errors: {} }
          );
          return (
            u
              ? (Object.keys(m).length > 0 && (f += d.greyMessage(n(m))), (f += r), (f = f.replace(/\\\\/gi, '\\')))
              : Object.entries(m).forEach(([e, s]) => {
                  let a = 'function' == typeof o[e] ? s : n(s, null, 2);
                  if (void 0 === a) return;
                  a = a.replace(/\\\\/gi, '\\');
                  const i = E({ input: a, ident: t, eol: r });
                  f += `${t}${e}:${i.startsWith(r) ? '' : ' '}${i}${r}`;
                }),
            Object.entries(h).forEach(([e, s]) => {
              const a = 'function' == typeof o[e] ? s : n(s, null, 2);
              void 0 !== a && (f += S({ keyName: e, lines: a, eol: r, ident: t }));
            }),
            f
          );
        }
        function S({ keyName: e, lines: t, eol: r, ident: s }) {
          let o = '';
          const a = `${s}${e}: ${E({ input: t, ident: s, eol: r })}${r}`.split(r);
          for (let e = 0; e < a.length; e += 1) {
            0 !== e && (o += r);
            const t = a[e];
            if (/^\s*"stack"/.test(t)) {
              const e = /^(\s*"stack":)\s*(".*"),?$/.exec(t);
              if (e && 3 === e.length) {
                const s = /^\s*/.exec(t)[0].length + 4,
                  a = ' '.repeat(s),
                  n = e[2];
                o += e[1] + r + a + JSON.parse(n).replace(/\n/g, r + a);
              } else o += t;
            } else o += t;
          }
          return o;
        }
        function w(e) {
          const t = [];
          let r = !1,
            s = '';
          for (let o = 0; o < e.length; o++) {
            const a = e.charAt(o);
            '\\' !== a ? (r ? ((r = !1), (s += a)) : '.' !== a ? (s += a) : (t.push(s), (s = ''))) : (r = !0);
          }
          return s.length && t.push(s), t;
        }
        function j(e, t) {
          const r = Array.isArray(t) ? t : w(t);
          for (const t of r) {
            if (!Object.prototype.hasOwnProperty.call(e, t)) return;
            e = e[t];
          }
          return e;
        }
        function O(e, t) {
          const r = w(t),
            s = r.pop();
          null !== (e = j(e, r)) && 'object' == typeof e && Object.prototype.hasOwnProperty.call(e, s) && delete e[s];
        }
        function x() {}
        function $(e, t) {
          e.destroyed ||
            ('beforeExit' === t
              ? (e.flush(),
                e.on('drain', function () {
                  e.end();
                }))
              : e.flushSync());
        }
        (e.exports = {
          isObject: L,
          prettifyErrorLog: function ({ log: e, messageKey: t = d, ident: r = '    ', eol: s = '\n', errorLikeKeys: o = c, errorProperties: a = [] }) {
            let n = `${r}${E({ input: e.stack, ident: r, eol: s })}${s}`;
            if (a.length > 0) {
              const i = g.concat(t, 'type', 'stack');
              let l;
              l = '*' === a[0] ? Object.keys(e).filter((e) => !1 === i.includes(e)) : a.filter((e) => !1 === i.includes(e));
              for (let t = 0; t < l.length; t += 1) {
                const a = l[t];
                a in e != 0 &&
                  (n = L(e[a]) ? `${n}${r}${a}: {${s}${M({ input: e[a], errorLikeKeys: o, excludeLoggerKeys: !1, eol: s, ident: r + r })}${r}}${s}` : `${n}${r}${a}: ${e[a]}${s}`);
              }
            }
            return n;
          },
          prettifyLevel: function ({ log: e, colorizer: t = l, levelKey: r = p, prettifier: s, customLevels: o, customLevelNames: a }) {
            const n = j(e, r);
            return void 0 === n ? void 0 : s ? s(n) : t(n, { customLevels: o, customLevelNames: a });
          },
          prettifyMessage: function ({
            log: e,
            messageFormat: t,
            messageKey: r = d,
            colorizer: s = l,
            levelLabel: o = f,
            levelKey: a = p,
            customLevels: n,
            useOnlyCustomProps: i,
          }) {
            if (t && 'string' == typeof t) {
              const r = String(t).replace(/{([^{}]+)}/g, function (t, r) {
                let s;
                return r === o && void 0 !== (s = j(e, a)) ? ((i ? void 0 === n : void 0 === n[s]) ? h[s] : n[s]) : j(e, r) || '';
              });
              return s.message(r);
            }
            if (t && 'function' == typeof t) {
              const a = t(e, r, o);
              return s.message(a);
            }
            return r in e == 0 || 'string' != typeof e[r] ? void 0 : s.message(e[r]);
          },
          prettifyMetadata: function ({ log: e, prettifiers: t = {} }) {
            let r = '';
            if (e.name || e.pid || e.hostname) {
              if (((r += '('), e.name && (r += t.name ? t.name(e.name) : e.name), e.pid)) {
                const s = t.pid ? t.pid(e.pid) : e.pid;
                e.name && e.pid ? (r += '/' + s) : (r += s);
              }
              e.hostname && (r += `${'(' === r ? 'on' : ' on'} ${t.hostname ? t.hostname(e.hostname) : e.hostname}`), (r += ')');
            }
            return e.caller && (r += `${'' === r ? '' : ' '}<${t.caller ? t.caller(e.caller) : e.caller}>`), '' === r ? void 0 : r;
          },
          prettifyObject: M,
          prettifyTime: function ({ log: e, timestampKey: t = m, translateFormat: r, prettifier: s }) {
            let o = null;
            if ((t in e ? (o = e[t]) : 'timestamp' in e && (o = e.timestamp), null === o)) return;
            const a = r ? _(o, r) : o;
            return s ? s(a) : `[${a}]`;
          },
          buildSafeSonicBoom: function (e) {
            const t = new a(e);
            return (
              t.on('error', function e(r) {
                if ('EPIPE' === r.code) return (t.write = x), (t.end = x), (t.flushSync = x), void (t.destroy = x);
                t.removeListener('error', e);
              }),
              !e.sync &&
                i &&
                (function (e) {
                  if (global.WeakRef && global.WeakMap && global.FinalizationRegistry) {
                    const t = r(2067);
                    t.register(e, $),
                      e.on('close', function () {
                        t.unregister(e);
                      });
                  }
                })(t),
              t
            );
          },
          filterLog: function ({ log: e, ignoreKeys: t, includeKeys: r }) {
            const s = v(e);
            if (r) {
              const e = {};
              return (
                r.forEach((t) => {
                  e[t] = s[t];
                }),
                e
              );
            }
            return (
              t.forEach((e) => {
                O(s, e);
              }),
              s
            );
          },
          handleCustomlevelsOpts: function (e) {
            return e
              ? 'string' == typeof e
                ? e.split(',').reduce(
                    (e, t, r) => {
                      const [s, o = r] = t.split(':');
                      return (e[o] = s.toUpperCase()), e;
                    },
                    { default: 'USERLVL' }
                  )
                : '[object Object]' === Object.prototype.toString.call(e)
                ? Object.keys(e).reduce((t, r, s) => ((t[e[r]] = r.toUpperCase()), t), { default: 'USERLVL' })
                : {}
              : {};
          },
          handleCustomlevelNamesOpts: function (e) {
            return e
              ? 'string' == typeof e
                ? e.split(',').reduce((e, t, r) => {
                    const [s, o = r] = t.split(':');
                    return (e[s.toLowerCase()] = o), e;
                  }, {})
                : '[object Object]' === Object.prototype.toString.call(e)
                ? Object.keys(e).reduce((t, r, s) => ((t[r.toLowerCase()] = e[r]), t), {})
                : {}
              : {};
          },
        }),
          (e.exports.internals = {
            formatTime: _,
            joinLinesWithIndentation: E,
            prettifyError: S,
            getPropertyValue: j,
            deleteLogProperty: O,
            splitPropertyKey: w,
            createDate: b,
            isValidDate: P,
          });
      },
      4147: (e) => {
        e.exports = JSON.parse(
          '{"name":"ragate-cli","version":"0.1.0","description":"Anyone can immediately start a serverless project using the CLI, automatically generate source code, and start an infinitely extensible and maintainable serverless development project.","engines":{"node":">=18.x"},"scripts":{"test":"echo \'Sorry, test code is in preparation.\\n\'","build:dev":"ENV=development webpack","build:prd":"ENV=production webpack","lint":"eslint . --fix","format":"prettier . --write","prepare":"husky install"},"eslintIgnore":["!/.github",".serverless","bin","tmp","webpack.config.js"],"main":"./lib/app.ts","bin":{"ragate":"./bin/app.js"},"repository":{"type":"git","url":"git+https://github.com/ragate-inc/ragate-cli.git"},"lint-staged":{"*.{ts,js}":["eslint"],"*.{css,html,js,json,md,yaml,yml,ts,js}":["prettier . --write"]},"keywords":["aws","serverless","ragate","cli","amplify","serverless","lambda","amazon"],"author":"Ragate inc.","license":"MIT","bugs":{"url":"https://github.com/ragate-inc/ragate-cli/issues"},"homepage":"https://github.com/ragate-inc/ragate-cli#readme","devDependencies":{"@tsconfig/node-lts":"^18.12.1","@types/figlet":"^1.5.6","@types/fs-extra":"^11.0.1","@types/inquirer":"^9.0.3","@types/inquirer-autocomplete-prompt":"^3.0.0","@types/js-yaml":"^4.0.5","@types/lodash":"^4.14.194","@types/node":"^18.16.3","@types/webpack":"^5.28.1","@types/webpack-node-externals":"^3.0.0","@types/yargs":"^17.0.24","@typescript-eslint/eslint-plugin":"^5.59.2","@typescript-eslint/parser":"^5.59.2","eslint":"^8.39.0","eslint-config-prettier":"^8.8.0","eslint-config-standard-with-typescript":"^34.0.1","husky":"^6.0.0","lint-staged":"^13.2.2","prettier":"2.8.8","ts-loader":"^9.4.2","ts-node":"^10.9.1","tsconfig-paths-webpack-plugin":"^4.0.1","typescript":"^5.0.4","webpack":"^5.81.0","webpack-cli":"^5.0.2","webpack-node-externals":"^3.0.0"},"dependencies":{"figlet":"^1.6.0","fs-extra":"^11.1.1","inquirer":"^8.0.0","inquirer-autocomplete-prompt":"^2.0.0","isomorphic-git":"^1.23.0","js-yaml":"^4.1.0","lodash":"^4.17.21","parent-require":"^1.0.0","pino":"^8.12.1","pino-pretty":"^10.0.0","yargonaut":"^1.1.4","yargs":"^17.1.1-candidate.0"}}'
        );
      },
    },
    t = {};
  !(function r(s) {
    var o = t[s];
    if (void 0 !== o) return o.exports;
    var a = (t[s] = { exports: {} });
    return e[s].call(a.exports, a, a.exports, r), a.exports;
  })(4712);
})();
