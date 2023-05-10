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
          n = s(r(6517)),
          a = {
            npmVersion: o.default.version,
            repositoyUrl: 'https://github.com/ragate-inc/serverless-starter',
            templates: n.default
              .chain([{ category: 'Node.js', name: 'Node.js - aws-node-appsync', value: 'aws-node-appsync' }])
              .sortBy('category')
              .map((e) => ({ name: `${e.category} - ${e.name}`, value: e.value }))
              .value(),
          };
        t.default = a;
      },
      9026: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(6444)),
          n = s(r(9267)),
          a = r(6870),
          i = s(r(2322)),
          l = r(8014),
          u = s(r(8798)),
          c = s(r(8072));
        t.default = class {
          constructor() {
            (0, a.init)(), (this.chalk = a.chalk);
            const e = (0, n.default)(process.argv.slice(2))
              .options({ lang: { default: this.langRef.default, type: this.langRef.type }, verbose: { default: this.verboseRef.default, type: this.verboseRef.type } })
              .help(!1)
              .version(!1)
              .parseSync();
            (this.lang = e.lang),
              (this.verbose = e.verbose),
              (this.locale = (0, l.getLocaleLang)(e.lang)),
              (this.logger = o.default.getLogger(this.verbose ? 'debug' : 'info')),
              (this.npmVersion = i.default.npmVersion);
          }
          chalk;
          logger;
          locale;
          lang;
          langRef = { default: process.env.LANG ?? 'en', type: 'string' };
          verbose;
          verboseRef = { default: !1, type: 'string' };
          npmVersion;
          get version() {
            return `ragate-cli v${this.npmVersion}`;
          }
          cli() {
            const { version: e, chalk: t, locale: r, lang: s } = this;
            return (0, n.default)(process.argv.slice(2))
              .scriptName('')
              .default('processed', !1)
              .hide('processed')
              .options({
                verbose: { describe: t.grey(r.options.describe.verbose), default: this.verboseRef.default, type: this.verboseRef.type },
                lang: { describe: t.grey(r.options.describe.lang), default: this.langRef.default, type: this.langRef.type },
                region: {
                  alias: 'r',
                  describe: t.grey(r.options.describe.region),
                  default: 'ap-northeast-1',
                  type: 'string',
                  choices: [
                    'ap-northeast-1',
                    'us-east-2',
                    'us-east-1',
                    'us-west-1',
                    'us-west-2',
                    'af-south-1',
                    'ap-east-1',
                    'ap-south-2',
                    'ap-southeast-3',
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
                  ],
                },
              })
              .usage(e)
              .help('help', t.grey(r.help))
              .alias('h', 'help')
              .version('version', t.grey(r.version), e)
              .alias('v', 'version')
              .command(
                'create',
                t.grey(r.command.description.create),
                (e) => new u.default.builder({ lang: this.lang }).build(e),
                (e) => new u.default.handler(e).run()
              )
              .command('add', t.grey(r.command.description.add), (e) => new c.default.builder({ lang: this.lang }).build(e))
              .command(
                '*',
                '',
                () => ({}),
                (e) => {
                  0 === e._.length ? this.logger.error(t.red(this.locale.unProcessed.required)) : this.logger.error(t.red(this.locale.unProcessed.notFound));
                }
              )
              .wrap(Math.max((0, n.default)().terminalWidth() - 5, 60))
              .locale(s);
          }
          async run() {
            await this.cli().parseAsync();
          }
        };
      },
      1843: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            usage: 'Usage',
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
            usage: '使い方',
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
          n = s(r(1843));
        t.getLocaleLang = (e) => ('ja' === e ? o.default : n.default);
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
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = r(6702),
          n = s(r(6444)),
          a = s(r(9211)),
          i = s(r(592)),
          l = r(6870),
          u = r(7264);
        class c extends o.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            const t = (0, u.getLocaleLang)(this.lang),
              r = n.default.getLogger();
            return e
              .version(!1)
              .usage('Usage: add <command> <options>')
              .command(
                'sns',
                l.chalk.grey(t.command.description.sns),
                (e) => new a.default.builder({ lang: this.lang }).build(e),
                (e) => new a.default.handler(e).run()
              )
              .command(
                'sqs',
                l.chalk.grey(t.command.description.sns),
                (e) => new i.default.builder({ lang: this.lang }).build(e),
                (e) => new i.default.handler(e).run()
              )
              .command(
                '*',
                l.chalk.grey('<command> <options>'),
                () => ({}),
                () => {
                  r.error(l.chalk.red(t.unProcessed));
                }
              );
          }
        }
        t.default = c;
      },
      6433: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = r(6702),
          n = s(r(6444));
        class a extends o.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            return e.version(!1).fail((e, t) => n.default.handleFaildLog({ msg: e, err: t }));
          }
        }
        t.default = a;
      },
      2917: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(6444)),
          n = r(6702);
        class a extends n.FeatureHandlerAbstract {
          constructor(e) {
            super(e);
          }
          async run() {
            o.default.getLogger().info('Coming soon'), await new Promise((e) => setTimeout(e, 0));
          }
        }
        t.default = a;
      },
      9211: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(6433)),
          n = s(r(2917));
        t.default = { builder: o.default, handler: n.default };
      },
      6621: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = r(6702),
          n = s(r(6444));
        class a extends o.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            return e.version(!1).fail((e, t) => n.default.handleFaildLog({ msg: e, err: t }));
          }
        }
        t.default = a;
      },
      4267: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(6444)),
          n = r(6702);
        class a extends n.FeatureHandlerAbstract {
          constructor(e) {
            super(e);
          }
          async run() {
            o.default.getLogger().info('Coming soon'), await new Promise((e) => setTimeout(e, 0));
          }
        }
        t.default = a;
      },
      592: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(6621)),
          n = s(r(4267));
        t.default = { builder: o.default, handler: n.default };
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
          n = s(r(4005));
        t.getLocaleLang = (e) => ('ja' === e ? o.default : n.default);
      },
      3818: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = r(6702),
          n = s(r(6444));
        class a extends o.FeatureBuilderAbstract {
          constructor(e) {
            super(e);
          }
          build(e) {
            return e
              .version(!1)
              .usage('Usage: create')
              .fail((e, t) => n.default.handleFaildLog({ msg: e, err: t }));
          }
        }
        t.default = a;
      },
      975: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(3290)),
          n = s(r(2322)),
          a = r(2868),
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
            const r = (0, a.getLocaleLang)(this.lang),
              s = await o.default
                .prompt([
                  {
                    type: 'autocomplete',
                    name: 'template',
                    emptyText: r.inquirer.template.autocomplete.emptyText,
                    message: r.inquirer.template.choiceTemplate,
                    source: (e, t) => (i.default.isEmpty(t) ? n.default.templates : n.default.templates.filter((e) => e.name.includes(t))),
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
            if ((t.info(`template : ${l}`), t.info(`projectName : ${d}`), (0, u.isExistsDirectory)(`${u.processCurrent}/${d}`)))
              throw new Error(`${r.error.alreadyExistsDirectory} : ${u.processCurrent}/${d}`);
            (0, u.isExistsDirectory)(u.tmpPath) && (0, u.cleanUpTmpDirectory)(),
              (0, u.gitClone)(n.default.repositoyUrl, u.tmpPath),
              (0, u.copyDirectory)(`${u.tmpPath}/${l}`, `${u.processCurrent}/${d}`);
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
          n = s(r(975));
        t.default = { builder: o.default, handler: n.default };
      },
      7544: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            error: { alreadyExistsDirectory: 'already exists directory' },
            inquirer: { template: { choiceTemplate: 'Choose a project template', autocomplete: { emptyText: 'No result' } } },
          });
      },
      7016: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            error: { alreadyExistsDirectory: '既にディレクトリが存在します' },
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
          n = s(r(7544));
        t.getLocaleLang = (e) => ('ja' === e ? o.default : n.default);
      },
      6702: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.FeatureBuilderAbstract = t.FeatureHandlerAbstract = void 0);
        const o = s(r(2322)),
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
            _lang;
            _npmVersion;
            _chalk;
            constructor(e) {
              (this._chalk = n.chalk), (this._lang = e?.lang), (this._npmVersion = o.default.npmVersion);
            }
            get lang() {
              return this._lang;
            }
            get npmVersion() {
              return this._npmVersion;
            }
            get chalk() {
              return this._chalk;
            }
          });
      },
      2762: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.isExistsDirectory = t.cleanUpTmpDirectory = t.copyDirectory = t.gitClone = t.tmpPath = t.processCurrent = void 0);
        const o = r(2081),
          n = r(5033),
          a = s(r(6444)),
          i = s(r(1017));
        t.processCurrent = i.default.resolve();
        const l = i.default.dirname(process.argv[1]);
        (t.tmpPath = `${l}/../tmp`),
          (t.gitClone = function (e, t) {
            const r = a.default.getLogger();
            try {
              r.debug((0, o.execSync)(`git clone ${e} ${t}`).toString());
            } catch (e) {
              const t = e;
              throw new n.CLIError(t.message);
            }
          }),
          (t.copyDirectory = function (e, t) {
            const r = a.default.getLogger();
            try {
              r.debug((0, o.execSync)(`cp -r ${e} ${t}`).toString());
            } catch (e) {
              const t = e;
              throw new n.CLIError(t.message);
            }
          }),
          (t.cleanUpTmpDirectory = function () {
            const e = a.default.getLogger();
            try {
              e.debug((0, o.execSync)(`rm -rf ${t.tmpPath}`).toString()), e.debug((0, o.execSync)(`mkdir ${t.tmpPath}`).toString());
            } catch (e) {
              const t = e;
              throw new n.CLIError(t.message);
            }
          }),
          (t.isExistsDirectory = function (e) {
            const t = a.default.getLogger();
            try {
              return t.debug((0, o.execSync)(`test -d ${e}`).toString()), !0;
            } catch (e) {
              return !1;
            }
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
          n = s(r(4233)),
          a = r(6870),
          i = (0, n.default)({ colorize: !0 });
        t.default = class {
          constructor() {
            throw new Error('singleton cannot be instantiated');
          }
          static logger;
          static getLogger(e = 'info') {
            return e ? ((this.logger = (0, o.default)({ level: e }, i)), this.logger) : (this.logger || (this.logger = (0, o.default)({ level: e }, i)), this.logger);
          }
          static handleFaildLog(e) {
            const { msg: t, err: r } = e,
              s = this.getLogger();
            t && s.error(a.chalk.red(t)), r && (r.stack ? s.error(a.chalk.red(r.stack)) : s.error(a.chalk.red(r.message))), process.exit(1);
          }
        };
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
      3290: (e) => {
        e.exports = require('inquirer');
      },
      169: (e) => {
        e.exports = require('inquirer-autocomplete-prompt');
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
      2081: (e) => {
        e.exports = require('child_process');
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
          { Transform: n } = r(3248),
          a = r(454),
          i = r(7915),
          l = r(903),
          { ERROR_LIKE_KEYS: u, MESSAGE_KEY: c, TIMESTAMP_KEY: d, LEVEL_KEY: p, LEVEL_NAMES: f } = r(7318),
          {
            isObject: g,
            prettifyErrorLog: m,
            prettifyLevel: y,
            prettifyMessage: h,
            prettifyMetadata: v,
            prettifyObject: _,
            prettifyTime: b,
            buildSafeSonicBoom: L,
            filterLog: E,
            handleCustomlevelsOpts: M,
            handleCustomlevelNamesOpts: O,
          } = r(385),
          j = (e) => {
            try {
              return { value: i.parse(e, { protoAction: 'remove' }) };
            } catch (e) {
              return { err: e };
            }
          },
          S = {
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
        function w(e) {
          const t = Object.assign({}, S, e),
            r = t.crlf ? '\r\n' : '\n',
            s = '    ',
            o = t.messageKey,
            n = t.levelKey,
            a = t.levelLabel,
            i = t.minimumLevel,
            u = t.messageFormat,
            c = t.timestampKey,
            d = t.errorLikeObjectKeys,
            L = t.errorProps.split(','),
            w = 'boolean' == typeof t.useOnlyCustomProps ? t.useOnlyCustomProps : 'true' === t.useOnlyCustomProps,
            x = M(t.customLevels),
            P = O(t.customLevels),
            $ = t.customColors
              ? t.customColors.split(',').reduce((e, r) => {
                  const [s, o] = r.split(':'),
                    n = (w ? t.customLevels : void 0 !== P[s]) ? P[s] : f[s],
                    a = void 0 !== n ? n : s;
                  return e.push([a, o]), e;
                }, [])
              : void 0,
            k = { customLevels: x, customLevelNames: P };
          w && !t.customLevels && ((k.customLevels = void 0), (k.customLevelNames = void 0));
          const A = t.customPrettifiers,
            C = void 0 !== t.include ? new Set(t.include.split(',')) : void 0,
            D = !C && t.ignore ? new Set(t.ignore.split(',')) : void 0,
            K = t.hideObject,
            T = t.singleLine,
            R = l(t.colorize, $, w),
            q = t.colorizeObjects ? R : l(!1, [], !1);
          return function (e) {
            let l;
            if (g(e)) l = e;
            else {
              const t = j(e);
              if (t.err || !g(t.value)) return e + r;
              l = t.value;
            }
            if (i) {
              const e = ((w ? t.customLevels : void 0 !== P[i]) ? P[i] : f[i]) || Number(i);
              if (l[void 0 === n ? p : n] < e) return;
            }
            const M = h({ log: l, messageKey: o, colorizer: R, messageFormat: u, levelLabel: a, ...k, useOnlyCustomProps: w });
            (D || C) && (l = E({ log: l, ignoreKeys: D, includeKeys: C }));
            const O = y({ log: l, colorizer: R, levelKey: n, prettifier: A.level, ...k }),
              S = v({ log: l, prettifiers: A }),
              x = b({ log: l, translateFormat: t.translateTime, timestampKey: c, prettifier: A.time });
            let $ = '';
            if (
              (t.levelFirst && O && ($ = `${O}`),
              x && '' === $ ? ($ = `${x}`) : x && ($ = `${$} ${x}`),
              !t.levelFirst && O && ($ = $.length > 0 ? `${$} ${O}` : O),
              S && ($ = $.length > 0 ? `${$} ${S}:` : S),
              !1 === $.endsWith(':') && '' !== $ && ($ += ':'),
              M && ($ = $.length > 0 ? `${$} ${M}` : M),
              $.length > 0 && !T && ($ += r),
              'Error' === l.type && l.stack)
            ) {
              const e = m({ log: l, errorLikeKeys: d, errorProperties: L, ident: s, eol: r });
              T && ($ += r), ($ += e);
            } else if (!K) {
              const e = [o, n, c].filter((e) => 'string' == typeof l[e] || 'number' == typeof l[e]),
                t = _({ input: l, skipKeys: e, customPrettifiers: A, errorLikeKeys: d, eol: r, ident: s, singleLine: T, colorizer: q });
              T && !/^\s$/.test(t) && ($ += ' '), ($ += t);
            }
            return $;
          };
        }
        function x(e = {}) {
          const t = w(e);
          return a(
            function (r) {
              const s = new n({
                objectMode: !0,
                autoDestroy: !0,
                transform(e, r, s) {
                  s(null, t(e));
                },
              });
              let a;
              return (
                (a =
                  'object' == typeof e.destination && 'function' == typeof e.destination.write
                    ? e.destination
                    : L({ dest: e.destination || 1, append: e.append, mkdir: e.mkdir, sync: e.sync })),
                r.on('unknown', function (e) {
                  a.write(e + '\n');
                }),
                o(r, s, a),
                s
              );
            },
            { parse: 'lines' }
          );
        }
        (e.exports = x), (e.exports.prettyFactory = w), (e.exports.colorizerFactory = l), (e.exports.default = x);
      },
      903: (e, t, r) => {
        const { LEVELS: s, LEVEL_NAMES: o } = r(7318),
          n = (e) => e,
          a = { default: n, 60: n, 50: n, 40: n, 30: n, 20: n, 10: n, message: n, greyMessage: n },
          { createColors: i } = r(8387),
          l = i({ useColor: !0 }),
          { white: u, bgRed: c, red: d, yellow: p, green: f, blue: g, gray: m, cyan: y } = l,
          h = { default: u, 60: c, 50: d, 40: p, 30: f, 20: g, 10: m, message: y, greyMessage: m };
        function v(e) {
          return function (t, r, { customLevels: n, customLevelNames: a } = {}) {
            const i = e ? n || s : Object.assign({}, s, n),
              l = e ? a || o : Object.assign({}, o, a);
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
                      { default: u, message: y, greyMessage: m }
                    );
                  })(e),
                  s = t ? r : Object.assign({}, h, r),
                  o = v(t),
                  n = function (e, t) {
                    return o(e, s, t);
                  };
                return (n.message = n.message || s.message), (n.greyMessage = n.greyMessage || s.greyMessage), n;
              })(t, r)
            : e
            ? (function (e) {
                const t = v(e),
                  r = function (e, r) {
                    return t(e, h, r);
                  };
                return (r.message = h.message), (r.greyMessage = h.greyMessage), r;
              })(r)
            : (function (e) {
                const t = v(e),
                  r = function (e, r) {
                    return t(e, a, r);
                  };
                return (r.message = a.message), (r.greyMessage = a.greyMessage), r;
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
          n = r(5246),
          a = r(5376),
          { isMainThread: i } = r(1267),
          l = r(903)(),
          { DATE_FORMAT: u, ERROR_LIKE_KEYS: c, MESSAGE_KEY: d, LEVEL_KEY: p, LEVEL_LABEL: f, TIMESTAMP_KEY: g, LOGGER_KEYS: m, LEVELS: y, DATE_FORMAT_SIMPLE: h } = r(7318),
          v = s({});
        function _(e, t = !1) {
          if (!1 === t) return e;
          const r = b(e);
          if (!L(r)) return e;
          if (!0 === t) return o(r, h);
          const s = t.toUpperCase();
          if ('SYS:STANDARD' === s) return o(r, u);
          const n = s.substr(0, 4);
          return o(r, 'SYS:' === n || 'UTC:' === n ? ('UTC:' === n ? t : t.slice(4)) : `UTC:${t}`);
        }
        function b(e) {
          let t = new Date(e);
          return L(t) || (t = new Date(+e)), t;
        }
        function L(e) {
          return e instanceof Date && !Number.isNaN(e.getTime());
        }
        function E(e) {
          return '[object Object]' === Object.prototype.toString.apply(e);
        }
        function M({ input: e, ident: t = '    ', eol: r = '\n' }) {
          const s = e.split(/\r?\n/);
          for (let e = 1; e < s.length; e += 1) s[e] = t + s[e];
          return s.join(r);
        }
        function O({
          input: e,
          ident: t = '    ',
          eol: r = '\n',
          skipKeys: s = [],
          customPrettifiers: o = {},
          errorLikeKeys: n = c,
          excludeLoggerKeys: i = !0,
          singleLine: u = !1,
          colorizer: d = l,
        }) {
          const p = [].concat(s);
          !0 === i && Array.prototype.push.apply(p, m);
          let f = '';
          const { plain: g, errors: y } = Object.entries(e).reduce(
            ({ plain: t, errors: r }, [s, a]) => {
              if (!1 === p.includes(s)) {
                const i = 'function' == typeof o[s] ? o[s](a, s, e) : a;
                n.includes(s) ? (r[s] = i) : (t[s] = i);
              }
              return { plain: t, errors: r };
            },
            { plain: {}, errors: {} }
          );
          return (
            u
              ? (Object.keys(g).length > 0 && (f += d.greyMessage(a(g))), (f += r), (f = f.replace(/\\\\/gi, '\\')))
              : Object.entries(g).forEach(([e, s]) => {
                  let n = 'function' == typeof o[e] ? s : a(s, null, 2);
                  if (void 0 === n) return;
                  n = n.replace(/\\\\/gi, '\\');
                  const i = M({ input: n, ident: t, eol: r });
                  f += `${t}${e}:${i.startsWith(r) ? '' : ' '}${i}${r}`;
                }),
            Object.entries(y).forEach(([e, s]) => {
              const n = 'function' == typeof o[e] ? s : a(s, null, 2);
              void 0 !== n && (f += j({ keyName: e, lines: n, eol: r, ident: t }));
            }),
            f
          );
        }
        function j({ keyName: e, lines: t, eol: r, ident: s }) {
          let o = '';
          const n = `${s}${e}: ${M({ input: t, ident: s, eol: r })}${r}`.split(r);
          for (let e = 0; e < n.length; e += 1) {
            0 !== e && (o += r);
            const t = n[e];
            if (/^\s*"stack"/.test(t)) {
              const e = /^(\s*"stack":)\s*(".*"),?$/.exec(t);
              if (e && 3 === e.length) {
                const s = /^\s*/.exec(t)[0].length + 4,
                  n = ' '.repeat(s),
                  a = e[2];
                o += e[1] + r + n + JSON.parse(a).replace(/\n/g, r + n);
              } else o += t;
            } else o += t;
          }
          return o;
        }
        function S(e) {
          const t = [];
          let r = !1,
            s = '';
          for (let o = 0; o < e.length; o++) {
            const n = e.charAt(o);
            '\\' !== n ? (r ? ((r = !1), (s += n)) : '.' !== n ? (s += n) : (t.push(s), (s = ''))) : (r = !0);
          }
          return s.length && t.push(s), t;
        }
        function w(e, t) {
          const r = Array.isArray(t) ? t : S(t);
          for (const t of r) {
            if (!Object.prototype.hasOwnProperty.call(e, t)) return;
            e = e[t];
          }
          return e;
        }
        function x(e, t) {
          const r = S(t),
            s = r.pop();
          null !== (e = w(e, r)) && 'object' == typeof e && Object.prototype.hasOwnProperty.call(e, s) && delete e[s];
        }
        function P() {}
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
          isObject: E,
          prettifyErrorLog: function ({ log: e, messageKey: t = d, ident: r = '    ', eol: s = '\n', errorLikeKeys: o = c, errorProperties: n = [] }) {
            let a = `${r}${M({ input: e.stack, ident: r, eol: s })}${s}`;
            if (n.length > 0) {
              const i = m.concat(t, 'type', 'stack');
              let l;
              l = '*' === n[0] ? Object.keys(e).filter((e) => !1 === i.includes(e)) : n.filter((e) => !1 === i.includes(e));
              for (let t = 0; t < l.length; t += 1) {
                const n = l[t];
                n in e != 0 &&
                  (a = E(e[n]) ? `${a}${r}${n}: {${s}${O({ input: e[n], errorLikeKeys: o, excludeLoggerKeys: !1, eol: s, ident: r + r })}${r}}${s}` : `${a}${r}${n}: ${e[n]}${s}`);
              }
            }
            return a;
          },
          prettifyLevel: function ({ log: e, colorizer: t = l, levelKey: r = p, prettifier: s, customLevels: o, customLevelNames: n }) {
            const a = w(e, r);
            return void 0 === a ? void 0 : s ? s(a) : t(a, { customLevels: o, customLevelNames: n });
          },
          prettifyMessage: function ({
            log: e,
            messageFormat: t,
            messageKey: r = d,
            colorizer: s = l,
            levelLabel: o = f,
            levelKey: n = p,
            customLevels: a,
            useOnlyCustomProps: i,
          }) {
            if (t && 'string' == typeof t) {
              const r = String(t).replace(/{([^{}]+)}/g, function (t, r) {
                let s;
                return r === o && void 0 !== (s = w(e, n)) ? ((i ? void 0 === a : void 0 === a[s]) ? y[s] : a[s]) : w(e, r) || '';
              });
              return s.message(r);
            }
            if (t && 'function' == typeof t) {
              const n = t(e, r, o);
              return s.message(n);
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
          prettifyObject: O,
          prettifyTime: function ({ log: e, timestampKey: t = g, translateFormat: r, prettifier: s }) {
            let o = null;
            if ((t in e ? (o = e[t]) : 'timestamp' in e && (o = e.timestamp), null === o)) return;
            const n = r ? _(o, r) : o;
            return s ? s(n) : `[${n}]`;
          },
          buildSafeSonicBoom: function (e) {
            const t = new n(e);
            return (
              t.on('error', function e(r) {
                if ('EPIPE' === r.code) return (t.write = P), (t.end = P), (t.flushSync = P), void (t.destroy = P);
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
                x(s, e);
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
            joinLinesWithIndentation: M,
            prettifyError: j,
            getPropertyValue: w,
            deleteLogProperty: x,
            splitPropertyKey: S,
            createDate: b,
            isValidDate: L,
          });
      },
      4147: (e) => {
        e.exports = JSON.parse(
          '{"name":"ragate-cli","version":"0.1.0","description":"Anyone can immediately start a serverless project using the CLI, automatically generate source code, and start an infinitely extensible and maintainable serverless development project.","engines":{"node":">=18.x"},"scripts":{"test":"echo \'Sorry, test code is in preparation.\\n\'","build:dev":"ENV=development webpack","build:prd":"ENV=production webpack","lint":"eslint . --fix","format":"prettier . --write","prepare":"husky install"},"eslintIgnore":["!/.github",".serverless","bin","tmp","webpack.config.js"],"main":"./lib/app.ts","bin":{"ragate":"./bin/app.js"},"repository":{"type":"git","url":"git+https://github.com/ragate-inc/ragate-cli.git"},"lint-staged":{"*.{ts,js}":["eslint"],"*.{css,html,js,json,md,yaml,yml,ts,js}":["prettier . --write"]},"keywords":["aws","serverless","ragate","cli","amplify","serverless","lambda","amazon"],"author":"Ragate inc.","license":"MIT","bugs":{"url":"https://github.com/ragate-inc/ragate-cli/issues"},"homepage":"https://github.com/ragate-inc/ragate-cli#readme","devDependencies":{"@tsconfig/node-lts":"^18.12.1","@types/figlet":"^1.5.6","@types/inquirer":"^9.0.3","@types/inquirer-autocomplete-prompt":"^3.0.0","@types/lodash":"^4.14.194","@types/node":"^18.16.3","@types/webpack":"^5.28.1","@types/webpack-node-externals":"^3.0.0","@types/yargs":"^17.0.24","@typescript-eslint/eslint-plugin":"^5.59.2","@typescript-eslint/parser":"^5.59.2","eslint":"^8.39.0","eslint-config-prettier":"^8.8.0","eslint-config-standard-with-typescript":"^34.0.1","husky":"^6.0.0","lint-staged":"^13.2.2","prettier":"2.8.8","ts-loader":"^9.4.2","ts-node":"^10.9.1","tsconfig-paths-webpack-plugin":"^4.0.1","typescript":"^5.0.4","webpack":"^5.81.0","webpack-cli":"^5.0.2","webpack-node-externals":"^3.0.0"},"dependencies":{"figlet":"^1.6.0","inquirer":"^8.0.0","inquirer-autocomplete-prompt":"^2.0.0","lodash":"^4.17.21","parent-require":"^1.0.0","pino":"^8.12.1","pino-pretty":"^10.0.0","yargonaut":"^1.1.4","yargs":"^17.1.1-candidate.0"}}'
        );
      },
    },
    t = {};
  !(function r(s) {
    var o = t[s];
    if (void 0 !== o) return o.exports;
    var n = (t[s] = { exports: {} });
    return e[s].call(n.exports, n, n.exports, r), n.exports;
  })(4712);
})();
