#!/usr/bin/env node
(() => {
  'use strict';
  var e = {
      712: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = o(r(278));
        (async () => {
          const e = new s.default();
          await e.run();
        })();
      },
      322: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = o(r(147)),
          n = o(r(517)),
          i = {
            npmVersion: s.default.version,
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
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = o(r(444)),
          n = o(r(32)),
          i = r(870),
          a = o(r(517)),
          l = o(r(322)),
          c = r(14),
          u = o(r(798)),
          p = o(r(72));
        t.default = class {
          constructor() {
            (0, i.init)(), (this.chalk = i.chalk), (this.locale = l.default.lang), (this.lang = (0, c.getLocaleLang)(this.locale)), (this.npmVersion = l.default.npmVersion);
          }
          chalk;
          locale;
          lang;
          npmVersion;
          verbose = !1;
          get version() {
            return `ragate-cli v${this.npmVersion}`;
          }
          get logger() {
            return s.default.getLogger(this.verbose ? 'debug' : 'info');
          }
          outputResultError = (e) => {
            e.forEach((e) => {
              this.logger.error(` ${e}`);
            });
          };
          cli() {
            const { lang: e, version: t, chalk: r, locale: o } = this;
            return (0, n.default)(process.argv.slice(2))
              .scriptName('')
              .default('processed', !1)
              .hide('processed')
              .options({ verbose: { describe: r.grey(e.options.describe.verbose), default: !1, type: 'boolean' } })
              .middleware((e) => {
                this.verbose = e.verbose || !1;
              })
              .usage(t)
              .help('help', r.grey(e.help))
              .alias('h', 'help')
              .version('version', r.grey(e.version), t)
              .alias('v', 'version')
              .command(
                'create',
                r.grey(e.command.description.create),
                (e) => u.default.builder(e),
                (e) => u.default.handler({ argv: e }).finally(() => (e.processed = !0))
              )
              .command(
                'add',
                r.grey(e.command.description.add),
                (e) => p.default.builder(e),
                (e) => p.default.handler({ argv: e }).finally(() => (e.processed = !0))
              )
              .wrap(Math.max((0, n.default)().terminalWidth() - 5, 60))
              .locale(o);
          }
          async run() {
            try {
              const e = await this.cli().parseAsync();
              e.processed ||
                (a.default.isEmpty(e._)
                  ? this.outputResultError([this.lang.unProcessed.required])
                  : this.outputResultError([this.lang.unProcessed.notFound, `${this.lang.yourInput}: ${e._.join(' ')}`]));
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
            options: { describe: { verbose: 'Show verbose logs' } },
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
            options: { describe: { verbose: '詳細なログを出力' } },
            unProcessed: {
              required: 'コマンドを入力してください。「ragate help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',
              notFound: '入力されたコマンドは存在しません。「ragate help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',
            },
          });
      },
      14: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const s = o(r(471)),
          n = o(r(843)),
          i = r(33);
        t.getLocaleLang = (e) => {
          switch (e) {
            case 'ja':
              return s.default;
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
      40: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = (e) => e.version(!1));
      },
      588: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = o(r(444));
        t.default = async (e) => {
          const { argv: t } = e;
          s.default.getLogger().info('Coming soon'), await new Promise((e) => setTimeout(e, 0));
        };
      },
      72: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = o(r(40)),
          n = o(r(588));
        t.default = { builder: s.default, handler: n.default };
      },
      818: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = (e) => e.version(!1));
      },
      975: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = o(r(290)),
          n = o(r(444)),
          i = o(r(322)),
          a = r(868),
          l = o(r(517)),
          c = o(r(169)),
          u = r(762);
        s.default.registerPrompt('autocomplete', c.default),
          (t.default = async (e) => {
            const { argv: t } = e,
              r = n.default.getLogger();
            console.log('test'), r.debug('create hander : ', t);
            const o = (0, a.getLocaleLang)(i.default.lang),
              c = await s.default
                .prompt([
                  {
                    type: 'autocomplete',
                    name: 'template',
                    emptyText: o.inquirer.template.autocomplete.emptyText,
                    message: o.inquirer.template.choiceTemplate,
                    source: (e, t) => (l.default.isEmpty(t) ? i.default.templates : i.default.templates.filter((e) => e.name.includes(t))),
                  },
                  {
                    type: 'input',
                    name: 'projectName',
                    message: 'input a project name',
                    default: (e) => e.template,
                    validate: (e) => !l.default.isEmpty(e) || 'required input a project name',
                  },
                ])
                .then((e) => e)
                .catch((e) => {
                  r.error(e);
                });
            r.debug(`input values : ${JSON.stringify(c)}}`);
            const { template: p, projectName: d } = c;
            if ((r.info(`template : ${p}`), r.info(`projectName : ${d}`), r.info('in progress...'), (0, u.isExistsDirectory)(`${u.processCurrent}/${d}`)))
              throw (r.error(`${o.error.alreadyExistsDirectory} : ${u.processCurrent}/${d}`), new Error(`${o.error.alreadyExistsDirectory} : ${u.processCurrent}/${d}`));
            (0, u.isExistsDirectory)(u.tmpPath) && (0, u.cleanUpTmpDirectory)(),
              (0, u.gitClone)(i.default.repositoyUrl, u.tmpPath),
              (0, u.copyDirectory)(`${u.tmpPath}/${p}`, `${u.processCurrent}/${d}`),
              r.info('done.');
          });
      },
      798: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = o(r(818)),
          n = o(r(975));
        t.default = { builder: s.default, handler: n.default };
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
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.getLocaleLang = void 0);
        const s = o(r(16)),
          n = o(r(544)),
          i = r(33);
        t.getLocaleLang = (e) => {
          switch (e) {
            case 'ja':
              return s.default;
            case 'en':
              return n.default;
            default:
              throw new i.EnvironmentError('An invalid environment variable is specified. : LOCALE');
          }
        };
      },
      762: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.isExistsDirectory = t.cleanUpTmpDirectory = t.copyDirectory = t.gitClone = t.tmpPath = t.processCurrent = void 0);
        const s = r(81),
          n = r(33),
          i = o(r(444)),
          a = o(r(17));
        t.processCurrent = a.default.resolve();
        const l = a.default.dirname(process.argv[1]);
        (t.tmpPath = `${l}/../tmp`),
          (t.gitClone = function (e, t) {
            const r = i.default.getLogger();
            try {
              r.debug((0, s.execSync)(`git clone ${e} ${t}`));
            } catch (e) {
              const t = e;
              throw new n.CLIError(t.message);
            }
          }),
          (t.copyDirectory = function (e, t) {
            const r = i.default.getLogger();
            try {
              r.debug((0, s.execSync)(`cp -r ${e} ${t}`));
            } catch (e) {
              const t = e;
              throw new n.CLIError(t.message);
            }
          }),
          (t.cleanUpTmpDirectory = function () {
            const e = i.default.getLogger();
            try {
              e.debug((0, s.execSync)(`rm -rf ${t.tmpPath}`)), e.debug((0, s.execSync)(`mkdir ${t.tmpPath}`));
            } catch (e) {
              const t = e;
              throw new n.CLIError(t.message);
            }
          }),
          (t.isExistsDirectory = function (e) {
            const t = i.default.getLogger();
            try {
              return t.debug((0, s.execSync)(`test -d ${e}`)), !0;
            } catch (e) {
              return !1;
            }
          });
      },
      444: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 });
        const s = o(r(545)),
          n = (0, o(r(233)).default)({ colorize: !0 });
        t.default = class {
          constructor() {
            throw new Error('singleton cannot be instantiated');
          }
          static logger;
          static getLogger(e = 'error') {
            return e ? ((this.logger = (0, s.default)({ level: e }, n)), this.logger) : (this.logger || (this.logger = (0, s.default)({ level: e }, n)), this.logger);
          }
        };
      },
      870: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.chalk = t.init = void 0);
        const s = o(r(347));
        (t.init = () => s.default.font('SansSerif').helpStyle('grey').errorsStyle('red')), (t.chalk = s.default.chalk());
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
        const { isColorSupported: o } = r(387),
          s = r(304),
          { Transform: n } = r(248),
          i = r(454),
          a = r(915),
          l = r(903),
          { ERROR_LIKE_KEYS: c, MESSAGE_KEY: u, TIMESTAMP_KEY: p, LEVEL_KEY: d, LEVEL_NAMES: f } = r(318),
          {
            isObject: m,
            prettifyErrorLog: g,
            prettifyLevel: y,
            prettifyMessage: h,
            prettifyMetadata: v,
            prettifyObject: b,
            prettifyTime: E,
            buildSafeSonicBoom: L,
            filterLog: _,
            handleCustomlevelsOpts: O,
            handleCustomlevelNamesOpts: j,
          } = r(385),
          M = (e) => {
            try {
              return { value: a.parse(e, { protoAction: 'remove' }) };
            } catch (e) {
              return { err: e };
            }
          },
          $ = {
            colorize: o,
            colorizeObjects: !0,
            crlf: !1,
            errorLikeObjectKeys: c,
            errorProps: '',
            customLevels: null,
            customColors: null,
            useOnlyCustomProps: !0,
            levelFirst: !1,
            messageKey: u,
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
        function w(e) {
          const t = Object.assign({}, $, e),
            r = t.crlf ? '\r\n' : '\n',
            o = '    ',
            s = t.messageKey,
            n = t.levelKey,
            i = t.levelLabel,
            a = t.minimumLevel,
            c = t.messageFormat,
            u = t.timestampKey,
            p = t.errorLikeObjectKeys,
            L = t.errorProps.split(','),
            w = 'boolean' == typeof t.useOnlyCustomProps ? t.useOnlyCustomProps : 'true' === t.useOnlyCustomProps,
            x = O(t.customLevels),
            S = j(t.customLevels),
            P = t.customColors
              ? t.customColors.split(',').reduce((e, r) => {
                  const [o, s] = r.split(':'),
                    n = (w ? t.customLevels : void 0 !== S[o]) ? S[o] : f[o],
                    i = void 0 !== n ? n : o;
                  return e.push([i, s]), e;
                }, [])
              : void 0,
            C = { customLevels: x, customLevelNames: S };
          w && !t.customLevels && ((C.customLevels = void 0), (C.customLevelNames = void 0));
          const k = t.customPrettifiers,
            K = void 0 !== t.include ? new Set(t.include.split(',')) : void 0,
            T = !K && t.ignore ? new Set(t.ignore.split(',')) : void 0,
            D = t.hideObject,
            A = t.singleLine,
            q = l(t.colorize, P, w),
            R = t.colorizeObjects ? q : l(!1, [], !1);
          return function (e) {
            let l;
            if (m(e)) l = e;
            else {
              const t = M(e);
              if (t.err || !m(t.value)) return e + r;
              l = t.value;
            }
            if (a) {
              const e = ((w ? t.customLevels : void 0 !== S[a]) ? S[a] : f[a]) || Number(a);
              if (l[void 0 === n ? d : n] < e) return;
            }
            const O = h({ log: l, messageKey: s, colorizer: q, messageFormat: c, levelLabel: i, ...C, useOnlyCustomProps: w });
            (T || K) && (l = _({ log: l, ignoreKeys: T, includeKeys: K }));
            const j = y({ log: l, colorizer: q, levelKey: n, prettifier: k.level, ...C }),
              $ = v({ log: l, prettifiers: k }),
              x = E({ log: l, translateFormat: t.translateTime, timestampKey: u, prettifier: k.time });
            let P = '';
            if (
              (t.levelFirst && j && (P = `${j}`),
              x && '' === P ? (P = `${x}`) : x && (P = `${P} ${x}`),
              !t.levelFirst && j && (P = P.length > 0 ? `${P} ${j}` : j),
              $ && (P = P.length > 0 ? `${P} ${$}:` : $),
              !1 === P.endsWith(':') && '' !== P && (P += ':'),
              O && (P = P.length > 0 ? `${P} ${O}` : O),
              P.length > 0 && !A && (P += r),
              'Error' === l.type && l.stack)
            ) {
              const e = g({ log: l, errorLikeKeys: p, errorProperties: L, ident: o, eol: r });
              A && (P += r), (P += e);
            } else if (!D) {
              const e = [s, n, u].filter((e) => 'string' == typeof l[e] || 'number' == typeof l[e]),
                t = b({ input: l, skipKeys: e, customPrettifiers: k, errorLikeKeys: p, eol: r, ident: o, singleLine: A, colorizer: R });
              A && !/^\s$/.test(t) && (P += ' '), (P += t);
            }
            return P;
          };
        }
        function x(e = {}) {
          const t = w(e);
          return i(
            function (r) {
              const o = new n({
                objectMode: !0,
                autoDestroy: !0,
                transform(e, r, o) {
                  o(null, t(e));
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
                s(r, o, i),
                o
              );
            },
            { parse: 'lines' }
          );
        }
        (e.exports = x), (e.exports.prettyFactory = w), (e.exports.colorizerFactory = l), (e.exports.default = x);
      },
      903: (e, t, r) => {
        const { LEVELS: o, LEVEL_NAMES: s } = r(318),
          n = (e) => e,
          i = { default: n, 60: n, 50: n, 40: n, 30: n, 20: n, 10: n, message: n, greyMessage: n },
          { createColors: a } = r(387),
          l = a({ useColor: !0 }),
          { white: c, bgRed: u, red: p, yellow: d, green: f, blue: m, gray: g, cyan: y } = l,
          h = { default: c, 60: u, 50: p, 40: d, 30: f, 20: m, 10: g, message: y, greyMessage: g };
        function v(e) {
          return function (t, r, { customLevels: n, customLevelNames: i } = {}) {
            const a = e ? n || o : Object.assign({}, o, n),
              l = e ? i || s : Object.assign({}, s, i);
            let c = 'default';
            c = Number.isInteger(+t) ? (Object.prototype.hasOwnProperty.call(a, t) ? t : c) : Object.prototype.hasOwnProperty.call(l, t.toLowerCase()) ? l[t.toLowerCase()] : c;
            const u = a[c];
            return Object.prototype.hasOwnProperty.call(r, c) ? r[c](u) : r.default(u);
          };
        }
        e.exports = function (e = !1, t, r) {
          return e && void 0 !== t
            ? (function (e, t) {
                const r = (function (e) {
                    return e.reduce(
                      function (e, [t, r]) {
                        return (e[t] = 'function' == typeof l[r] ? l[r] : c), e;
                      },
                      { default: c, message: y, greyMessage: g }
                    );
                  })(e),
                  o = t ? r : Object.assign({}, h, r),
                  s = v(t),
                  n = function (e, t) {
                    return s(e, o, t);
                  };
                return (n.message = n.message || o.message), (n.greyMessage = n.greyMessage || o.greyMessage), n;
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
        const { createCopier: o } = r(563),
          s = r(612),
          n = r(246),
          i = r(376),
          { isMainThread: a } = r(267),
          l = r(903)(),
          { DATE_FORMAT: c, ERROR_LIKE_KEYS: u, MESSAGE_KEY: p, LEVEL_KEY: d, LEVEL_LABEL: f, TIMESTAMP_KEY: m, LOGGER_KEYS: g, LEVELS: y, DATE_FORMAT_SIMPLE: h } = r(318),
          v = o({});
        function b(e, t = !1) {
          if (!1 === t) return e;
          const r = E(e);
          if (!L(r)) return e;
          if (!0 === t) return s(r, h);
          const o = t.toUpperCase();
          if ('SYS:STANDARD' === o) return s(r, c);
          const n = o.substr(0, 4);
          return s(r, 'SYS:' === n || 'UTC:' === n ? ('UTC:' === n ? t : t.slice(4)) : `UTC:${t}`);
        }
        function E(e) {
          let t = new Date(e);
          return L(t) || (t = new Date(+e)), t;
        }
        function L(e) {
          return e instanceof Date && !Number.isNaN(e.getTime());
        }
        function _(e) {
          return '[object Object]' === Object.prototype.toString.apply(e);
        }
        function O({ input: e, ident: t = '    ', eol: r = '\n' }) {
          const o = e.split(/\r?\n/);
          for (let e = 1; e < o.length; e += 1) o[e] = t + o[e];
          return o.join(r);
        }
        function j({
          input: e,
          ident: t = '    ',
          eol: r = '\n',
          skipKeys: o = [],
          customPrettifiers: s = {},
          errorLikeKeys: n = u,
          excludeLoggerKeys: a = !0,
          singleLine: c = !1,
          colorizer: p = l,
        }) {
          const d = [].concat(o);
          !0 === a && Array.prototype.push.apply(d, g);
          let f = '';
          const { plain: m, errors: y } = Object.entries(e).reduce(
            ({ plain: t, errors: r }, [o, i]) => {
              if (!1 === d.includes(o)) {
                const a = 'function' == typeof s[o] ? s[o](i, o, e) : i;
                n.includes(o) ? (r[o] = a) : (t[o] = a);
              }
              return { plain: t, errors: r };
            },
            { plain: {}, errors: {} }
          );
          return (
            c
              ? (Object.keys(m).length > 0 && (f += p.greyMessage(i(m))), (f += r), (f = f.replace(/\\\\/gi, '\\')))
              : Object.entries(m).forEach(([e, o]) => {
                  let n = 'function' == typeof s[e] ? o : i(o, null, 2);
                  if (void 0 === n) return;
                  n = n.replace(/\\\\/gi, '\\');
                  const a = O({ input: n, ident: t, eol: r });
                  f += `${t}${e}:${a.startsWith(r) ? '' : ' '}${a}${r}`;
                }),
            Object.entries(y).forEach(([e, o]) => {
              const n = 'function' == typeof s[e] ? o : i(o, null, 2);
              void 0 !== n && (f += M({ keyName: e, lines: n, eol: r, ident: t }));
            }),
            f
          );
        }
        function M({ keyName: e, lines: t, eol: r, ident: o }) {
          let s = '';
          const n = `${o}${e}: ${O({ input: t, ident: o, eol: r })}${r}`.split(r);
          for (let e = 0; e < n.length; e += 1) {
            0 !== e && (s += r);
            const t = n[e];
            if (/^\s*"stack"/.test(t)) {
              const e = /^(\s*"stack":)\s*(".*"),?$/.exec(t);
              if (e && 3 === e.length) {
                const o = /^\s*/.exec(t)[0].length + 4,
                  n = ' '.repeat(o),
                  i = e[2];
                s += e[1] + r + n + JSON.parse(i).replace(/\n/g, r + n);
              } else s += t;
            } else s += t;
          }
          return s;
        }
        function $(e) {
          const t = [];
          let r = !1,
            o = '';
          for (let s = 0; s < e.length; s++) {
            const n = e.charAt(s);
            '\\' !== n ? (r ? ((r = !1), (o += n)) : '.' !== n ? (o += n) : (t.push(o), (o = ''))) : (r = !0);
          }
          return o.length && t.push(o), t;
        }
        function w(e, t) {
          const r = Array.isArray(t) ? t : $(t);
          for (const t of r) {
            if (!Object.prototype.hasOwnProperty.call(e, t)) return;
            e = e[t];
          }
          return e;
        }
        function x(e, t) {
          const r = $(t),
            o = r.pop();
          null !== (e = w(e, r)) && 'object' == typeof e && Object.prototype.hasOwnProperty.call(e, o) && delete e[o];
        }
        function S() {}
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
          isObject: _,
          prettifyErrorLog: function ({ log: e, messageKey: t = p, ident: r = '    ', eol: o = '\n', errorLikeKeys: s = u, errorProperties: n = [] }) {
            let i = `${r}${O({ input: e.stack, ident: r, eol: o })}${o}`;
            if (n.length > 0) {
              const a = g.concat(t, 'type', 'stack');
              let l;
              l = '*' === n[0] ? Object.keys(e).filter((e) => !1 === a.includes(e)) : n.filter((e) => !1 === a.includes(e));
              for (let t = 0; t < l.length; t += 1) {
                const n = l[t];
                n in e != 0 &&
                  (i = _(e[n]) ? `${i}${r}${n}: {${o}${j({ input: e[n], errorLikeKeys: s, excludeLoggerKeys: !1, eol: o, ident: r + r })}${r}}${o}` : `${i}${r}${n}: ${e[n]}${o}`);
              }
            }
            return i;
          },
          prettifyLevel: function ({ log: e, colorizer: t = l, levelKey: r = d, prettifier: o, customLevels: s, customLevelNames: n }) {
            const i = w(e, r);
            return void 0 === i ? void 0 : o ? o(i) : t(i, { customLevels: s, customLevelNames: n });
          },
          prettifyMessage: function ({
            log: e,
            messageFormat: t,
            messageKey: r = p,
            colorizer: o = l,
            levelLabel: s = f,
            levelKey: n = d,
            customLevels: i,
            useOnlyCustomProps: a,
          }) {
            if (t && 'string' == typeof t) {
              const r = String(t).replace(/{([^{}]+)}/g, function (t, r) {
                let o;
                return r === s && void 0 !== (o = w(e, n)) ? ((a ? void 0 === i : void 0 === i[o]) ? y[o] : i[o]) : w(e, r) || '';
              });
              return o.message(r);
            }
            if (t && 'function' == typeof t) {
              const n = t(e, r, s);
              return o.message(n);
            }
            return r in e == 0 || 'string' != typeof e[r] ? void 0 : o.message(e[r]);
          },
          prettifyMetadata: function ({ log: e, prettifiers: t = {} }) {
            let r = '';
            if (e.name || e.pid || e.hostname) {
              if (((r += '('), e.name && (r += t.name ? t.name(e.name) : e.name), e.pid)) {
                const o = t.pid ? t.pid(e.pid) : e.pid;
                e.name && e.pid ? (r += '/' + o) : (r += o);
              }
              e.hostname && (r += `${'(' === r ? 'on' : ' on'} ${t.hostname ? t.hostname(e.hostname) : e.hostname}`), (r += ')');
            }
            return e.caller && (r += `${'' === r ? '' : ' '}<${t.caller ? t.caller(e.caller) : e.caller}>`), '' === r ? void 0 : r;
          },
          prettifyObject: j,
          prettifyTime: function ({ log: e, timestampKey: t = m, translateFormat: r, prettifier: o }) {
            let s = null;
            if ((t in e ? (s = e[t]) : 'timestamp' in e && (s = e.timestamp), null === s)) return;
            const n = r ? b(s, r) : s;
            return o ? o(n) : `[${n}]`;
          },
          buildSafeSonicBoom: function (e) {
            const t = new n(e);
            return (
              t.on('error', function e(r) {
                if ('EPIPE' === r.code) return (t.write = S), (t.end = S), (t.flushSync = S), void (t.destroy = S);
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
            const o = v(e);
            if (r) {
              const e = {};
              return (
                r.forEach((t) => {
                  e[t] = o[t];
                }),
                e
              );
            }
            return (
              t.forEach((e) => {
                x(o, e);
              }),
              o
            );
          },
          handleCustomlevelsOpts: function (e) {
            return e
              ? 'string' == typeof e
                ? e.split(',').reduce(
                    (e, t, r) => {
                      const [o, s = r] = t.split(':');
                      return (e[s] = o.toUpperCase()), e;
                    },
                    { default: 'USERLVL' }
                  )
                : '[object Object]' === Object.prototype.toString.call(e)
                ? Object.keys(e).reduce((t, r, o) => ((t[e[r]] = r.toUpperCase()), t), { default: 'USERLVL' })
                : {}
              : {};
          },
          handleCustomlevelNamesOpts: function (e) {
            return e
              ? 'string' == typeof e
                ? e.split(',').reduce((e, t, r) => {
                    const [o, s = r] = t.split(':');
                    return (e[o.toLowerCase()] = s), e;
                  }, {})
                : '[object Object]' === Object.prototype.toString.call(e)
                ? Object.keys(e).reduce((t, r, o) => ((t[r.toLowerCase()] = e[r]), t), {})
                : {}
              : {};
          },
        }),
          (e.exports.internals = {
            formatTime: b,
            joinLinesWithIndentation: O,
            prettifyError: M,
            getPropertyValue: w,
            deleteLogProperty: x,
            splitPropertyKey: $,
            createDate: E,
            isValidDate: L,
          });
      },
      147: (e) => {
        e.exports = JSON.parse(
          '{"name":"ragate-cli","version":"0.0.7","description":"Anyone can immediately start a serverless project using the CLI, automatically generate source code, and start an infinitely extensible and maintainable serverless development project.","engines":{"node":">=18.x"},"scripts":{"test":"echo \'Sorry, test code is in preparation.\\n\'","build:dev":"ENV=development webpack","build:prd":"ENV=production webpack","lint":"eslint . --fix","format":"prettier . --write","prepare":"husky install"},"eslintIgnore":["!/.github",".serverless","bin","webpack.config.js"],"main":"./lib/app.ts","bin":{"ragate":"./bin/app.js"},"repository":{"type":"git","url":"git+https://github.com/ragate-inc/ragate-cli.git"},"lint-staged":{"*.{ts,js}":["eslint"],"*.{css,html,js,json,md,yaml,yml,ts,js}":["prettier . --write"]},"keywords":["aws","serverless","ragate","cli","amplify","serverless","lambda","amazon"],"author":"Ragate inc.","license":"MIT","bugs":{"url":"https://github.com/ragate-inc/ragate-cli/issues"},"homepage":"https://github.com/ragate-inc/ragate-cli#readme","devDependencies":{"@tsconfig/node-lts":"^18.12.1","@types/figlet":"^1.5.6","@types/inquirer":"^9.0.3","@types/inquirer-autocomplete-prompt":"^3.0.0","@types/lodash":"^4.14.194","@types/node":"^18.16.3","@types/webpack":"^5.28.1","@types/webpack-node-externals":"^3.0.0","@types/yargs":"^17.0.24","@typescript-eslint/eslint-plugin":"^5.59.2","@typescript-eslint/parser":"^5.59.2","eslint":"^8.39.0","eslint-config-prettier":"^8.8.0","eslint-config-standard-with-typescript":"^34.0.1","husky":"^6.0.0","lint-staged":"^13.2.2","prettier":"2.8.8","ts-loader":"^9.4.2","ts-node":"^10.9.1","tsconfig-paths-webpack-plugin":"^4.0.1","typescript":"^5.0.4","webpack":"^5.81.0","webpack-cli":"^5.0.2","webpack-node-externals":"^3.0.0"},"dependencies":{"figlet":"^1.6.0","inquirer":"^8.0.0","inquirer-autocomplete-prompt":"^2.0.0","lodash":"^4.17.21","parent-require":"^1.0.0","pino":"^8.12.1","pino-pretty":"^10.0.0","yargonaut":"^1.1.4","yargs":"^17.1.1-candidate.0"}}'
        );
      },
    },
    t = {};
  !(function r(o) {
    var s = t[o];
    if (void 0 !== s) return s.exports;
    var n = (t[o] = { exports: {} });
    return e[o].call(n.exports, n, n.exports, r), n.exports;
  })(712);
})();
