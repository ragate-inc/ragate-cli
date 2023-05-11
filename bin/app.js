#!/usr/bin/env node
(() => {
  'use strict';
  var e = {
      712: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(278));
        (async () => {
          const e = new o.default();
          await e.run();
        })();
      },
      322: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(147)),
          n = s(r(517)),
          i = {
            npmVersion: o.default.version,
            repositoyUrl: 'https://github.com/ragate-inc/serverless-starter',
            templates: n.default
              .chain([{ category: 'Node.js', name: 'Node.js - aws-node-appsync', value: 'aws-node-appsync' }])
              .sortBy('category')
              .map((e) => ({ name: `${e.category} - ${e.name}`, value: e.value }))
              .value(),
            lang: process.env.LOCALE ?? 'en',
          };
        t.default = i;
      },
      278: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(444)),
          n = s(r(32)),
          i = r(870),
          a = s(r(517)),
          l = s(r(322)),
          u = r(14),
          c = s(r(798)),
          p = s(r(72));
        t.default = class {
          constructor() {
            (0, i.init)(), (this.chalk = i.chalk), (this.lang = l.default.lang), (this.locale = (0, u.getLocaleLang)(this.lang)), (this.npmVersion = l.default.npmVersion);
          }
          chalk;
          lang;
          locale;
          npmVersion;
          verbose = !1;
          get version() {
            return `ragate-cli v${this.npmVersion}`;
          }
          get logger() {
            return o.default.getLogger(this.verbose ? 'debug' : 'info');
          }
          outputResultError = (e) => {
            e.forEach((e) => {
              this.logger.error(` ${e}`);
            });
          };
          cli() {
            const { lang: e, version: t, chalk: r, locale: s } = this;
            return (0, n.default)(process.argv.slice(2))
              .scriptName('')
              .default('processed', !1)
              .hide('processed')
              .options({
                verbose: { describe: r.grey(s.options.describe.verbose), default: !1, type: 'boolean' },
                region: {
                  alias: 'r',
                  describe: r.grey(s.options.describe.region),
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
              .middleware((e) => {
                this.verbose = e.verbose || !1;
              })
              .usage(t)
              .help('help', r.grey(s.help))
              .alias('h', 'help')
              .version('version', r.grey(s.version), t)
              .alias('v', 'version')
              .command(
                'create',
                r.grey(s.command.description.create),
                (e) => new c.default.builder().build({ yargs: e, logger: this.logger }),
                (e) => new c.default.handler({ argv: e, logger: this.logger }).run().finally(() => (e.processed = !0))
              )
              .command('add', r.grey(s.command.description.add), (e) => new p.default.builder().build({ yargs: e, logger: this.logger }))
              .wrap(Math.max((0, n.default)().terminalWidth() - 5, 60))
              .locale(e);
          }
          async run() {
            try {
              const e = await this.cli().parseAsync();
              e.processed ||
                (a.default.isEmpty(e._)
                  ? this.outputResultError([this.locale.unProcessed.required])
                  : this.outputResultError([this.locale.unProcessed.notFound, `${this.locale.yourInput}: ${e._.join(' ')}`]));
            } catch (e) {
              const t = e;
              this.outputResultError([t.message]);
            }
          }
        };
      },
      843: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            usage: 'Usage',
            help: 'Show help',
            version: 'Show version',
            yourInput: 'your input',
            command: { description: { create: 'Create a new project', add: 'Add aws resouces' } },
            options: { describe: { verbose: 'Show verbose logs', region: 'Aws region' } },
            unProcessed: {
              required: 'please input a command. Run "ragate help" for a list of all available commands.',
              notFound: 'The command entered does not exist. Run "ragate help" for a list of all available commands.',
            },
          });
      },
      471: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            usage: '使い方',
            help: 'ヘルプを表示',
            version: 'バージョンを表示',
            yourInput: '入力されたコマンド',
            command: { description: { create: 'プロジェクトを作成', add: 'AWSリソースの追加' } },
            options: { describe: { verbose: '詳細なログを出力', region: 'AWSリージョン' } },
            unProcessed: {
              required: 'コマンドを入力してください。「ragate help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',
              notFound: '入力されたコマンドは存在しません。「ragate help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',
            },
          });
      },
      14: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const o = s(r(471)),
          n = s(r(843)),
          i = r(33);
        t.getLocaleLang = (e) => {
          switch (e) {
            case 'ja':
              return o.default;
            case 'en':
              return n.default;
            default:
              throw new i.EnvironmentError('An invalid environment variable is specified. : LOCALE');
          }
        };
      },
      33: (e, t) => {
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
      40: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = r(702),
          n = s(r(444));
        class i extends o.FeatureBuilderAbstract {
          constructor() {
            super();
          }
          build(e) {
            return e.yargs.version(!1).fail((e, t) => n.default.handleFaildLog({ msg: e, err: t }));
          }
        }
        t.default = i;
      },
      72: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(40));
        t.default = { builder: o.default };
      },
      818: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = r(702),
          n = s(r(444));
        class i extends o.FeatureBuilderAbstract {
          constructor() {
            super();
          }
          build(e) {
            return e.yargs.version(!1).fail((e, t) => n.default.handleFaildLog({ msg: e, err: t }));
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
        const o = s(r(290)),
          n = s(r(322)),
          i = r(868),
          a = s(r(517)),
          l = s(r(169)),
          u = r(762),
          c = r(702);
        class p extends c.FeatureHandlerAbstract {
          constructor(e) {
            super(e), o.default.registerPrompt('autocomplete', l.default);
          }
          async run() {
            const { argv: e, logger: t } = this;
            t.debug('create hander : ', e);
            const r = (0, i.getLocaleLang)(n.default.lang),
              s = await o.default
                .prompt([
                  {
                    type: 'autocomplete',
                    name: 'template',
                    emptyText: r.inquirer.template.autocomplete.emptyText,
                    message: r.inquirer.template.choiceTemplate,
                    source: (e, t) => (a.default.isEmpty(t) ? n.default.templates : n.default.templates.filter((e) => e.name.includes(t))),
                  },
                  {
                    type: 'input',
                    name: 'projectName',
                    message: 'input a project name',
                    default: (e) => e.template,
                    validate: (e) => !a.default.isEmpty(e) || 'required input a project name',
                  },
                ])
                .then((e) => e);
            t.debug(`input values : ${JSON.stringify(s)}}`);
            const { template: l, projectName: c } = s;
            if ((t.info(`template : ${l}`), t.info(`projectName : ${c}`), (0, u.isExistsDirectory)(`${u.processCurrent}/${c}`)))
              throw new Error(`${r.error.alreadyExistsDirectory} : ${u.processCurrent}/${c}`);
            (0, u.isExistsDirectory)(u.tmpPath) && (0, u.cleanUpTmpDirectory)(),
              (0, u.gitClone)(n.default.repositoyUrl, u.tmpPath),
              (0, u.copyDirectory)(`${u.tmpPath}/${l}`, `${u.processCurrent}/${c}`);
          }
        }
        t.default = p;
      },
      798: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(818)),
          n = s(r(975));
        t.default = { builder: o.default, handler: n.default };
      },
      544: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            error: { alreadyExistsDirectory: 'already exists directory' },
            inquirer: { template: { choiceTemplate: 'Choose a project template', autocomplete: { emptyText: 'No result' } } },
          });
      },
      16: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            error: { alreadyExistsDirectory: '既にディレクトリが存在します' },
            inquirer: { template: { choiceTemplate: 'プロジェクトの雛形を選択してください。', autocomplete: { emptyText: '該当するテンプレートが見つかりません' } } },
          });
      },
      868: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const o = s(r(16)),
          n = s(r(544)),
          i = r(33);
        t.getLocaleLang = (e) => {
          switch (e) {
            case 'ja':
              return o.default;
            case 'en':
              return n.default;
            default:
              throw new i.EnvironmentError('An invalid environment variable is specified. : LOCALE');
          }
        };
      },
      702: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.FeatureBuilderAbstract = t.FeatureHandlerAbstract = void 0);
        const o = s(r(322)),
          n = r(14),
          i = r(870);
        (t.FeatureHandlerAbstract = class {
          _argv;
          _logger;
          constructor(e) {
            const { argv: t, logger: r } = e;
            (this._argv = t), (this._logger = r);
          }
          get argv() {
            return this._argv;
          }
          get logger() {
            return this._logger;
          }
        }),
          (t.FeatureBuilderAbstract = class {
            _lang;
            _locale;
            _npmVersion;
            _chalk;
            constructor() {
              (this._chalk = i.chalk), (this._lang = o.default.lang), (this._locale = (0, n.getLocaleLang)(this.lang)), (this._npmVersion = o.default.npmVersion);
            }
            get lang() {
              return this._lang;
            }
            get locale() {
              return this._locale;
            }
            get npmVersion() {
              return this._npmVersion;
            }
            get chalk() {
              return this._chalk;
            }
          });
      },
      762: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.isExistsDirectory = t.cleanUpTmpDirectory = t.copyDirectory = t.gitClone = t.tmpPath = t.processCurrent = void 0);
        const o = r(81),
          n = r(33),
          i = s(r(444)),
          a = s(r(17));
        t.processCurrent = a.default.resolve();
        const l = a.default.dirname(process.argv[1]);
        (t.tmpPath = `${l}/../tmp`),
          (t.gitClone = function (e, t) {
            const r = i.default.getLogger();
            try {
              r.debug((0, o.execSync)(`git clone ${e} ${t}`).toString());
            } catch (e) {
              const t = e;
              throw new n.CLIError(t.message);
            }
          }),
          (t.copyDirectory = function (e, t) {
            const r = i.default.getLogger();
            try {
              r.debug((0, o.execSync)(`cp -r ${e} ${t}`).toString());
            } catch (e) {
              const t = e;
              throw new n.CLIError(t.message);
            }
          }),
          (t.cleanUpTmpDirectory = function () {
            const e = i.default.getLogger();
            try {
              e.debug((0, o.execSync)(`rm -rf ${t.tmpPath}`).toString()), e.debug((0, o.execSync)(`mkdir ${t.tmpPath}`).toString());
            } catch (e) {
              const t = e;
              throw new n.CLIError(t.message);
            }
          }),
          (t.isExistsDirectory = function (e) {
            const t = i.default.getLogger();
            try {
              return t.debug((0, o.execSync)(`test -d ${e}`).toString()), !0;
            } catch (e) {
              return !1;
            }
          });
      },
      444: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const o = s(r(545)),
          n = s(r(233)),
          i = r(870),
          a = (0, n.default)({ colorize: !0 });
        t.default = class {
          constructor() {
            throw new Error('singleton cannot be instantiated');
          }
          static logger;
          static getLogger(e = 'info') {
            return e ? ((this.logger = (0, o.default)({ level: e }, a)), this.logger) : (this.logger || (this.logger = (0, o.default)({ level: e }, a)), this.logger);
          }
          static handleFaildLog(e) {
            const { msg: t, err: r } = e,
              s = this.getLogger();
            t && s.error(i.chalk.red(t)), r && (r.stack ? s.error(i.chalk.red(r.stack)) : s.error(i.chalk.red(r.message))), process.exit(1);
          }
        };
      },
      870: function (e, t, r) {
        var s =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.chalk = t.init = void 0);
        const o = s(r(347));
        (t.init = () => o.default.font('SansSerif').helpStyle('grey').errorsStyle('red')), (t.chalk = o.default.chalk());
      },
      387: (e) => {
        e.exports = require('colorette');
      },
      612: (e) => {
        e.exports = require('dateformat');
      },
      563: (e) => {
        e.exports = require('fast-copy');
      },
      376: (e) => {
        e.exports = require('fast-safe-stringify');
      },
      290: (e) => {
        e.exports = require('inquirer');
      },
      169: (e) => {
        e.exports = require('inquirer-autocomplete-prompt');
      },
      517: (e) => {
        e.exports = require('lodash');
      },
      67: (e) => {
        e.exports = require('on-exit-leak-free');
      },
      545: (e) => {
        e.exports = require('pino');
      },
      454: (e) => {
        e.exports = require('pino-abstract-transport');
      },
      304: (e) => {
        e.exports = require('pump');
      },
      248: (e) => {
        e.exports = require('readable-stream');
      },
      915: (e) => {
        e.exports = require('secure-json-parse');
      },
      246: (e) => {
        e.exports = require('sonic-boom');
      },
      347: (e) => {
        e.exports = require('yargonaut');
      },
      32: (e) => {
        e.exports = require('yargs/yargs');
      },
      81: (e) => {
        e.exports = require('child_process');
      },
      17: (e) => {
        e.exports = require('path');
      },
      267: (e) => {
        e.exports = require('worker_threads');
      },
      233: (e, t, r) => {
        const { isColorSupported: s } = r(387),
          o = r(304),
          { Transform: n } = r(248),
          i = r(454),
          a = r(915),
          l = r(903),
          { ERROR_LIKE_KEYS: u, MESSAGE_KEY: c, TIMESTAMP_KEY: p, LEVEL_KEY: d, LEVEL_NAMES: g } = r(318),
          {
            isObject: f,
            prettifyErrorLog: m,
            prettifyLevel: y,
            prettifyMessage: h,
            prettifyMetadata: v,
            prettifyObject: b,
            prettifyTime: _,
            buildSafeSonicBoom: L,
            filterLog: E,
            handleCustomlevelsOpts: O,
            handleCustomlevelNamesOpts: j,
          } = r(385),
          w = (e) => {
            try {
              return { value: a.parse(e, { protoAction: 'remove' }) };
            } catch (e) {
              return { err: e };
            }
          },
          M = {
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
            timestampKey: p,
            translateTime: !0,
            useMetadata: !1,
            outputStream: process.stdout,
            customPrettifiers: {},
            hideObject: !1,
            ignore: 'hostname',
            include: void 0,
            singleLine: !1,
          };
        function x(e) {
          const t = Object.assign({}, M, e),
            r = t.crlf ? '\r\n' : '\n',
            s = '    ',
            o = t.messageKey,
            n = t.levelKey,
            i = t.levelLabel,
            a = t.minimumLevel,
            u = t.messageFormat,
            c = t.timestampKey,
            p = t.errorLikeObjectKeys,
            L = t.errorProps.split(','),
            x = 'boolean' == typeof t.useOnlyCustomProps ? t.useOnlyCustomProps : 'true' === t.useOnlyCustomProps,
            S = O(t.customLevels),
            $ = j(t.customLevels),
            P = t.customColors
              ? t.customColors.split(',').reduce((e, r) => {
                  const [s, o] = r.split(':'),
                    n = (x ? t.customLevels : void 0 !== $[s]) ? $[s] : g[s],
                    i = void 0 !== n ? n : s;
                  return e.push([i, o]), e;
                }, [])
              : void 0,
            k = { customLevels: S, customLevelNames: $ };
          x && !t.customLevels && ((k.customLevels = void 0), (k.customLevelNames = void 0));
          const C = t.customPrettifiers,
            A = void 0 !== t.include ? new Set(t.include.split(',')) : void 0,
            K = !A && t.ignore ? new Set(t.ignore.split(',')) : void 0,
            T = t.hideObject,
            D = t.singleLine,
            q = l(t.colorize, P, x),
            R = t.colorizeObjects ? q : l(!1, [], !1);
          return function (e) {
            let l;
            if (f(e)) l = e;
            else {
              const t = w(e);
              if (t.err || !f(t.value)) return e + r;
              l = t.value;
            }
            if (a) {
              const e = ((x ? t.customLevels : void 0 !== $[a]) ? $[a] : g[a]) || Number(a);
              if (l[void 0 === n ? d : n] < e) return;
            }
            const O = h({ log: l, messageKey: o, colorizer: q, messageFormat: u, levelLabel: i, ...k, useOnlyCustomProps: x });
            (K || A) && (l = E({ log: l, ignoreKeys: K, includeKeys: A }));
            const j = y({ log: l, colorizer: q, levelKey: n, prettifier: C.level, ...k }),
              M = v({ log: l, prettifiers: C }),
              S = _({ log: l, translateFormat: t.translateTime, timestampKey: c, prettifier: C.time });
            let P = '';
            if (
              (t.levelFirst && j && (P = `${j}`),
              S && '' === P ? (P = `${S}`) : S && (P = `${P} ${S}`),
              !t.levelFirst && j && (P = P.length > 0 ? `${P} ${j}` : j),
              M && (P = P.length > 0 ? `${P} ${M}:` : M),
              !1 === P.endsWith(':') && '' !== P && (P += ':'),
              O && (P = P.length > 0 ? `${P} ${O}` : O),
              P.length > 0 && !D && (P += r),
              'Error' === l.type && l.stack)
            ) {
              const e = m({ log: l, errorLikeKeys: p, errorProperties: L, ident: s, eol: r });
              D && (P += r), (P += e);
            } else if (!T) {
              const e = [o, n, c].filter((e) => 'string' == typeof l[e] || 'number' == typeof l[e]),
                t = b({ input: l, skipKeys: e, customPrettifiers: C, errorLikeKeys: p, eol: r, ident: s, singleLine: D, colorizer: R });
              D && !/^\s$/.test(t) && (P += ' '), (P += t);
            }
            return P;
          };
        }
        function S(e = {}) {
          const t = x(e);
          return i(
            function (r) {
              const s = new n({
                objectMode: !0,
                autoDestroy: !0,
                transform(e, r, s) {
                  s(null, t(e));
                },
              });
              let i;
              return (
                (i =
                  'object' == typeof e.destination && 'function' == typeof e.destination.write
                    ? e.destination
                    : L({ dest: e.destination || 1, append: e.append, mkdir: e.mkdir, sync: e.sync })),
                r.on('unknown', function (e) {
                  i.write(e + '\n');
                }),
                o(r, s, i),
                s
              );
            },
            { parse: 'lines' }
          );
        }
        (e.exports = S), (e.exports.prettyFactory = x), (e.exports.colorizerFactory = l), (e.exports.default = S);
      },
      903: (e, t, r) => {
        const { LEVELS: s, LEVEL_NAMES: o } = r(318),
          n = (e) => e,
          i = { default: n, 60: n, 50: n, 40: n, 30: n, 20: n, 10: n, message: n, greyMessage: n },
          { createColors: a } = r(387),
          l = a({ useColor: !0 }),
          { white: u, bgRed: c, red: p, yellow: d, green: g, blue: f, gray: m, cyan: y } = l,
          h = { default: u, 60: c, 50: p, 40: d, 30: g, 20: f, 10: m, message: y, greyMessage: m };
        function v(e) {
          return function (t, r, { customLevels: n, customLevelNames: i } = {}) {
            const a = e ? n || s : Object.assign({}, s, n),
              l = e ? i || o : Object.assign({}, o, i);
            let u = 'default';
            u = Number.isInteger(+t) ? (Object.prototype.hasOwnProperty.call(a, t) ? t : u) : Object.prototype.hasOwnProperty.call(l, t.toLowerCase()) ? l[t.toLowerCase()] : u;
            const c = a[u];
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
                    return t(e, i, r);
                  };
                return (r.message = i.message), (r.greyMessage = i.greyMessage), r;
              })(r);
        };
      },
      318: (e) => {
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
        const { createCopier: s } = r(563),
          o = r(612),
          n = r(246),
          i = r(376),
          { isMainThread: a } = r(267),
          l = r(903)(),
          { DATE_FORMAT: u, ERROR_LIKE_KEYS: c, MESSAGE_KEY: p, LEVEL_KEY: d, LEVEL_LABEL: g, TIMESTAMP_KEY: f, LOGGER_KEYS: m, LEVELS: y, DATE_FORMAT_SIMPLE: h } = r(318),
          v = s({});
        function b(e, t = !1) {
          if (!1 === t) return e;
          const r = _(e);
          if (!L(r)) return e;
          if (!0 === t) return o(r, h);
          const s = t.toUpperCase();
          if ('SYS:STANDARD' === s) return o(r, u);
          const n = s.substr(0, 4);
          return o(r, 'SYS:' === n || 'UTC:' === n ? ('UTC:' === n ? t : t.slice(4)) : `UTC:${t}`);
        }
        function _(e) {
          let t = new Date(e);
          return L(t) || (t = new Date(+e)), t;
        }
        function L(e) {
          return e instanceof Date && !Number.isNaN(e.getTime());
        }
        function E(e) {
          return '[object Object]' === Object.prototype.toString.apply(e);
        }
        function O({ input: e, ident: t = '    ', eol: r = '\n' }) {
          const s = e.split(/\r?\n/);
          for (let e = 1; e < s.length; e += 1) s[e] = t + s[e];
          return s.join(r);
        }
        function j({
          input: e,
          ident: t = '    ',
          eol: r = '\n',
          skipKeys: s = [],
          customPrettifiers: o = {},
          errorLikeKeys: n = c,
          excludeLoggerKeys: a = !0,
          singleLine: u = !1,
          colorizer: p = l,
        }) {
          const d = [].concat(s);
          !0 === a && Array.prototype.push.apply(d, m);
          let g = '';
          const { plain: f, errors: y } = Object.entries(e).reduce(
            ({ plain: t, errors: r }, [s, i]) => {
              if (!1 === d.includes(s)) {
                const a = 'function' == typeof o[s] ? o[s](i, s, e) : i;
                n.includes(s) ? (r[s] = a) : (t[s] = a);
              }
              return { plain: t, errors: r };
            },
            { plain: {}, errors: {} }
          );
          return (
            u
              ? (Object.keys(f).length > 0 && (g += p.greyMessage(i(f))), (g += r), (g = g.replace(/\\\\/gi, '\\')))
              : Object.entries(f).forEach(([e, s]) => {
                  let n = 'function' == typeof o[e] ? s : i(s, null, 2);
                  if (void 0 === n) return;
                  n = n.replace(/\\\\/gi, '\\');
                  const a = O({ input: n, ident: t, eol: r });
                  g += `${t}${e}:${a.startsWith(r) ? '' : ' '}${a}${r}`;
                }),
            Object.entries(y).forEach(([e, s]) => {
              const n = 'function' == typeof o[e] ? s : i(s, null, 2);
              void 0 !== n && (g += w({ keyName: e, lines: n, eol: r, ident: t }));
            }),
            g
          );
        }
        function w({ keyName: e, lines: t, eol: r, ident: s }) {
          let o = '';
          const n = `${s}${e}: ${O({ input: t, ident: s, eol: r })}${r}`.split(r);
          for (let e = 0; e < n.length; e += 1) {
            0 !== e && (o += r);
            const t = n[e];
            if (/^\s*"stack"/.test(t)) {
              const e = /^(\s*"stack":)\s*(".*"),?$/.exec(t);
              if (e && 3 === e.length) {
                const s = /^\s*/.exec(t)[0].length + 4,
                  n = ' '.repeat(s),
                  i = e[2];
                o += e[1] + r + n + JSON.parse(i).replace(/\n/g, r + n);
              } else o += t;
            } else o += t;
          }
          return o;
        }
        function M(e) {
          const t = [];
          let r = !1,
            s = '';
          for (let o = 0; o < e.length; o++) {
            const n = e.charAt(o);
            '\\' !== n ? (r ? ((r = !1), (s += n)) : '.' !== n ? (s += n) : (t.push(s), (s = ''))) : (r = !0);
          }
          return s.length && t.push(s), t;
        }
        function x(e, t) {
          const r = Array.isArray(t) ? t : M(t);
          for (const t of r) {
            if (!Object.prototype.hasOwnProperty.call(e, t)) return;
            e = e[t];
          }
          return e;
        }
        function S(e, t) {
          const r = M(t),
            s = r.pop();
          null !== (e = x(e, r)) && 'object' == typeof e && Object.prototype.hasOwnProperty.call(e, s) && delete e[s];
        }
        function $() {}
        function P(e, t) {
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
          prettifyErrorLog: function ({ log: e, messageKey: t = p, ident: r = '    ', eol: s = '\n', errorLikeKeys: o = c, errorProperties: n = [] }) {
            let i = `${r}${O({ input: e.stack, ident: r, eol: s })}${s}`;
            if (n.length > 0) {
              const a = m.concat(t, 'type', 'stack');
              let l;
              l = '*' === n[0] ? Object.keys(e).filter((e) => !1 === a.includes(e)) : n.filter((e) => !1 === a.includes(e));
              for (let t = 0; t < l.length; t += 1) {
                const n = l[t];
                n in e != 0 &&
                  (i = E(e[n]) ? `${i}${r}${n}: {${s}${j({ input: e[n], errorLikeKeys: o, excludeLoggerKeys: !1, eol: s, ident: r + r })}${r}}${s}` : `${i}${r}${n}: ${e[n]}${s}`);
              }
            }
            return i;
          },
          prettifyLevel: function ({ log: e, colorizer: t = l, levelKey: r = d, prettifier: s, customLevels: o, customLevelNames: n }) {
            const i = x(e, r);
            return void 0 === i ? void 0 : s ? s(i) : t(i, { customLevels: o, customLevelNames: n });
          },
          prettifyMessage: function ({
            log: e,
            messageFormat: t,
            messageKey: r = p,
            colorizer: s = l,
            levelLabel: o = g,
            levelKey: n = d,
            customLevels: i,
            useOnlyCustomProps: a,
          }) {
            if (t && 'string' == typeof t) {
              const r = String(t).replace(/{([^{}]+)}/g, function (t, r) {
                let s;
                return r === o && void 0 !== (s = x(e, n)) ? ((a ? void 0 === i : void 0 === i[s]) ? y[s] : i[s]) : x(e, r) || '';
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
          prettifyObject: j,
          prettifyTime: function ({ log: e, timestampKey: t = f, translateFormat: r, prettifier: s }) {
            let o = null;
            if ((t in e ? (o = e[t]) : 'timestamp' in e && (o = e.timestamp), null === o)) return;
            const n = r ? b(o, r) : o;
            return s ? s(n) : `[${n}]`;
          },
          buildSafeSonicBoom: function (e) {
            const t = new n(e);
            return (
              t.on('error', function e(r) {
                if ('EPIPE' === r.code) return (t.write = $), (t.end = $), (t.flushSync = $), void (t.destroy = $);
                t.removeListener('error', e);
              }),
              !e.sync &&
                a &&
                (function (e) {
                  if (global.WeakRef && global.WeakMap && global.FinalizationRegistry) {
                    const t = r(67);
                    t.register(e, P),
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
                S(s, e);
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
            formatTime: b,
            joinLinesWithIndentation: O,
            prettifyError: w,
            getPropertyValue: x,
            deleteLogProperty: S,
            splitPropertyKey: M,
            createDate: _,
            isValidDate: L,
          });
      },
      147: (e) => {
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
  })(712);
})();
