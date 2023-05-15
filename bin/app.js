#!/usr/bin/env node
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ 'use strict';
  /******/ var __webpack_modules__ = {
    /***/ './lib/app.ts':
      /*!********************!*\
  !*** ./lib/app.ts ***!
  \********************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst builder_1 = __importDefault(__webpack_require__(/*! entry/builder */ "./lib/entry/builder.ts"));\nvoid (async () => {\n    const entry = new builder_1.default();\n    await entry.run();\n})();\n\n\n//# sourceURL=webpack://ragate-cli/./lib/app.ts?'
        );

        /***/
      },

    /***/ './lib/config.ts':
      /*!***********************!*\
  !*** ./lib/config.ts ***!
  \***********************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst package_json_1 = __importDefault(__webpack_require__(/*! package.json */ "./package.json"));\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));\nconst path_1 = __importDefault(__webpack_require__(/*! path */ "path"));\n// Additional templates selectable via CLI\n// Consider migrating to a separate file if template types become bloated\nconst templates = [\n    {\n        category: \'Node.js\',\n        name: \'Node.js - aws-node-appsync\',\n        value: \'aws-node-appsync\',\n    },\n];\nconst config = {\n    // current npm package version in package.json\n    npmVersion: package_json_1.default.version,\n    // repository of template\n    repositoyUrl: \'https://github.com/ragate-inc/serverless-starter\',\n    // working directory\n    tmpPath: `${path_1.default.dirname(process.argv[1])}/../tmp`,\n    // current directory\n    currentPath: path_1.default.resolve(),\n    // templates at repository\n    templates: lodash_1.default.chain(templates)\n        .sortBy(\'category\')\n        .map((item) => ({\n        name: `${item.category} - ${item.name}`,\n        value: item.value,\n    }))\n        .value(),\n};\nexports["default"] = config;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/config.ts?'
        );

        /***/
      },

    /***/ './lib/entry/builder.ts':
      /*!******************************!*\
  !*** ./lib/entry/builder.ts ***!
  \******************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          "\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ \"./lib/utils/logger.ts\"));\nconst yargs_1 = __importDefault(__webpack_require__(/*! yargs/yargs */ \"yargs/yargs\"));\nconst yargonaut_1 = __webpack_require__(/*! utils/yargonaut */ \"./lib/utils/yargonaut.ts\");\nconst config_1 = __importDefault(__webpack_require__(/*! config */ \"./lib/config.ts\"));\nconst getLocale_1 = __webpack_require__(/*! entry/utils/getLocale */ \"./lib/entry/utils/getLocale.ts\");\nconst index_1 = __importDefault(__webpack_require__(/*! features/create/index */ \"./lib/features/create/index.ts\"));\nconst index_2 = __importDefault(__webpack_require__(/*! features/add/index */ \"./lib/features/add/index.ts\"));\nconst index_3 = __webpack_require__(/*! types/index */ \"./lib/types/index.ts\");\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nconst cli_1 = __webpack_require__(/*! utils/cli */ \"./lib/utils/cli.ts\");\n/**\n * yargs typescript : https://github.com/yargs/yargs/blob/main/docs/typescript.md\n * yargs api reference : https://yargs.js.org/docs/\n * Inquirer : https://github.com/SBoudrias/Inquirer.js/tree/master\n */\nclass default_1 {\n    constructor() {\n        try {\n            (0, yargonaut_1.init)();\n            this.chalk = yargonaut_1.chalk;\n            const argv = (0, yargs_1.default)(process.argv.slice(2))\n                .options({\n                lang: {\n                    default: this.langRef.default,\n                    type: this.langRef.type,\n                },\n                verbose: {\n                    type: this.verboseRef.type,\n                },\n                region: {\n                    default: this.regionRef.default,\n                    type: this.regionRef.type,\n                },\n            })\n                .check((argv) => {\n                argv.verbose = lodash_1.default.hasIn(argv, 'verbose');\n                return true;\n            })\n                .help(false)\n                .version(false)\n                .parseSync();\n            this.lang = argv.lang;\n            this.verbose = argv.verbose;\n            this.region = argv.region;\n            this.locale = (0, getLocale_1.getLocaleLang)(argv.lang);\n            this.logger = logger_1.default.getLogger(this.verbose ? 'debug' : 'info');\n            this.npmVersion = config_1.default.npmVersion;\n        }\n        finally {\n            (0, cli_1.cleanUpTmpDirectory)();\n        }\n    }\n    chalk;\n    logger;\n    locale;\n    lang;\n    langRef = {\n        default: process.env.LANG ?? 'en',\n        type: 'string',\n    };\n    verbose;\n    verboseRef = {\n        type: 'flag',\n    };\n    npmVersion;\n    get version() {\n        return `ragate-cli v${this.npmVersion}`;\n    }\n    region;\n    regionRef = {\n        default: 'ap-northeast-1',\n        type: 'string',\n    };\n    handleError(err) {\n        const logger = logger_1.default.getLogger();\n        if (err.name)\n            logger.debug(err.name);\n        if (err.stack)\n            logger.debug(err.stack);\n        console.error('\\n', yargonaut_1.chalk.red(err.message));\n        process.exit(1);\n    }\n    cli() {\n        const { version, chalk, locale, lang } = this;\n        return (0, yargs_1.default)(process.argv.slice(2))\n            .scriptName('')\n            .options({\n            verbose: {\n                describe: chalk.grey(locale.options.describe.verbose),\n                type: this.verboseRef.type,\n            },\n            lang: {\n                describe: chalk.grey(locale.options.describe.lang),\n                default: this.langRef.default,\n                type: this.langRef.type,\n            },\n            region: {\n                alias: 'r',\n                describe: chalk.grey(locale.options.describe.region),\n                default: this.regionRef.default,\n                type: this.regionRef.type,\n                choices: index_3.awsRegions,\n            },\n        })\n            .usage(version)\n            .help('help', chalk.grey(locale.help))\n            .alias('h', 'help')\n            .version('version', chalk.grey(locale.version), version)\n            .alias('v', 'version')\n            .check((argv) => {\n            if (argv._.length === 0)\n                throw new Error(this.locale.unProcessed.required);\n            return true;\n        })\n            .command('create', chalk.grey(locale.command.description.create), (_yargs) => {\n            const args = { lang: this.lang, region: this.region };\n            return new index_1.default.builder(args).build(_yargs);\n        }, (argv) => new index_1.default.handler(argv).run())\n            .command('add', chalk.grey(locale.command.description.add), (_yargs) => {\n            const args = { lang: this.lang, region: this.region };\n            return new index_2.default.builder(args).build(_yargs);\n        })\n            .command('*', '', () => ({}), () => {\n            throw new Error(this.locale.unProcessed.notFound);\n        })\n            .wrap(Math.max((0, yargs_1.default)().terminalWidth() - 5, 60))\n            .locale(lang)\n            .fail((msg, err) => this.handleError(err));\n    }\n    async run() {\n        try {\n            await this.cli().parseAsync();\n        }\n        catch (e) {\n            this.handleError(e);\n        }\n    }\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/entry/builder.ts?"
        );

        /***/
      },

    /***/ './lib/entry/locale/en.ts':
      /*!********************************!*\
  !*** ./lib/entry/locale/en.ts ***!
  \********************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    help: 'Show help',\n    version: 'Show version',\n    yourInput: 'your input',\n    command: {\n        description: {\n            create: 'Create a new project',\n            add: 'Add aws resouces',\n        },\n    },\n    options: {\n        describe: {\n            verbose: 'Show verbose logs',\n            region: 'Aws region',\n            lang: 'Display language',\n        },\n    },\n    unProcessed: {\n        required: 'please input a command. Run \"ragate help\" for a list of all available commands.',\n        notFound: 'The command entered does not exist. Run \"ragate help\" for a list of all available commands.',\n    },\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/entry/locale/en.ts?"
        );

        /***/
      },

    /***/ './lib/entry/locale/ja.ts':
      /*!********************************!*\
  !*** ./lib/entry/locale/ja.ts ***!
  \********************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    help: 'ヘルプを表示',\n    version: 'バージョンを表示',\n    yourInput: '入力されたコマンド',\n    command: {\n        description: {\n            create: 'プロジェクトを作成',\n            add: 'AWSリソースの追加',\n        },\n    },\n    options: {\n        describe: {\n            verbose: '詳細なログを出力',\n            region: 'AWSリージョン',\n            lang: '表示言語',\n        },\n    },\n    unProcessed: {\n        required: '指定のコマンドは存在しません。「ragate help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',\n        notFound: '入力されたコマンドは存在しません。「ragate help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',\n    },\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/entry/locale/ja.ts?"
        );

        /***/
      },

    /***/ './lib/entry/utils/getLocale.ts':
      /*!**************************************!*\
  !*** ./lib/entry/utils/getLocale.ts ***!
  \**************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.getLocaleLang = void 0;\nconst ja_1 = __importDefault(__webpack_require__(/*! entry/locale/ja */ "./lib/entry/locale/ja.ts"));\nconst en_1 = __importDefault(__webpack_require__(/*! entry/locale/en */ "./lib/entry/locale/en.ts"));\nconst getLocaleLang = (locale) => {\n    switch (locale) {\n        case \'ja\':\n            return ja_1.default;\n        case \'en\':\n            return en_1.default;\n        default:\n            return en_1.default;\n    }\n};\nexports.getLocaleLang = getLocaleLang;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/entry/utils/getLocale.ts?'
        );

        /***/
      },

    /***/ './lib/exceptions/index.ts':
      /*!*********************************!*\
  !*** ./lib/exceptions/index.ts ***!
  \*********************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.DuplicatedPropertyError = exports.CLIError = exports.EnvironmentError = exports.BaseClass = void 0;\nclass BaseClass extends Error {\n    constructor(message) {\n        super(message);\n        this.name = new.target.name;\n        if (Error.captureStackTrace)\n            Error.captureStackTrace(this, this.constructor);\n        Object.setPrototypeOf(this, new.target.prototype);\n    }\n}\nexports.BaseClass = BaseClass;\nclass EnvironmentError extends BaseClass {\n    constructor(message) {\n        super(message);\n        this.name = 'EnvironmentError';\n    }\n}\nexports.EnvironmentError = EnvironmentError;\nclass CLIError extends BaseClass {\n    constructor(message) {\n        super(message);\n        this.name = 'CLIError';\n    }\n}\nexports.CLIError = CLIError;\nclass DuplicatedPropertyError extends BaseClass {\n    constructor(message) {\n        super(message);\n        this.name = 'DuplicatedPropertyError';\n    }\n}\nexports.DuplicatedPropertyError = DuplicatedPropertyError;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/exceptions/index.ts?"
        );

        /***/
      },

    /***/ './lib/features/add/builder.ts':
      /*!*************************************!*\
  !*** ./lib/features/add/builder.ts ***!
  \*************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst index_1 = __webpack_require__(/*! types/index */ "./lib/types/index.ts");\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ "./lib/utils/logger.ts"));\nconst sns_1 = __importDefault(__webpack_require__(/*! features/add/features/sns */ "./lib/features/add/features/sns/index.ts"));\nconst sqs_1 = __importDefault(__webpack_require__(/*! features/add/features/sqs */ "./lib/features/add/features/sqs/index.ts"));\nconst basicauthlambda_1 = __importDefault(__webpack_require__(/*! features/add/features/basicauthlambda */ "./lib/features/add/features/basicauthlambda/index.ts"));\nconst api_1 = __importDefault(__webpack_require__(/*! features/add/features/api */ "./lib/features/add/features/api/index.ts"));\nconst yargonaut_1 = __webpack_require__(/*! utils/yargonaut */ "./lib/utils/yargonaut.ts");\nconst getLocale_1 = __webpack_require__(/*! features/add/utils/getLocale */ "./lib/features/add/utils/getLocale.ts");\nclass default_1 extends index_1.FeatureBuilderAbstract {\n    constructor(args) {\n        super(args);\n    }\n    build(yargs) {\n        const lang = this.args.lang;\n        const locale = (0, getLocale_1.getLocaleLang)(lang);\n        const logger = logger_1.default.getLogger();\n        return yargs\n            .version(false)\n            .usage(\'Usage: add <command> <options>\')\n            .command(\'sns\', yargonaut_1.chalk.grey(locale.command.description.sns), (_yargs) => new sns_1.default.builder(this.args).build(_yargs), (argv) => new sns_1.default.handler(argv).run())\n            .command(\'sqs\', yargonaut_1.chalk.grey(locale.command.description.sns), (_yargs) => new sqs_1.default.builder(this.args).build(_yargs), (argv) => new sqs_1.default.handler(argv).run())\n            .command(\'basicauthlambda\', yargonaut_1.chalk.grey(locale.command.description.basicAuthLambda), (_yargs) => new basicauthlambda_1.default.builder(this.args).build(_yargs), (argv) => new basicauthlambda_1.default.handler(argv).run())\n            .command(\'api\', yargonaut_1.chalk.grey(locale.command.description.api), (_yargs) => new api_1.default.builder(this.args).build(_yargs), (argv) => new api_1.default.handler(argv).run())\n            .command(\'*\', yargonaut_1.chalk.grey(\'<command> <options>\'), () => ({}), () => {\n            logger.error(yargonaut_1.chalk.red(locale.unProcessed));\n        });\n    }\n}\nexports["default"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/builder.ts?'
        );

        /***/
      },

    /***/ './lib/features/add/features/api/builder.ts':
      /*!**************************************************!*\
  !*** ./lib/features/add/features/api/builder.ts ***!
  \**************************************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst index_1 = __webpack_require__(/*! types/index */ "./lib/types/index.ts");\nclass default_1 extends index_1.FeatureBuilderAbstract {\n    constructor(args) {\n        super(args);\n    }\n    build(_yargs) {\n        return _yargs.version(false).usage(\'Usage: $0 api\');\n    }\n}\nexports["default"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/api/builder.ts?'
        );

        /***/
      },

    /***/ './lib/features/add/features/api/handler.ts':
      /*!**************************************************!*\
  !*** ./lib/features/add/features/api/handler.ts ***!
  \**************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          "\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ \"./lib/utils/logger.ts\"));\nconst index_1 = __webpack_require__(/*! types/index */ \"./lib/types/index.ts\");\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nconst yaml_1 = __webpack_require__(/*! utils/yaml */ \"./lib/utils/yaml.ts\");\nconst getLocale_1 = __webpack_require__(/*! features/add/features/api/utils/getLocale */ \"./lib/features/add/features/api/utils/getLocale.ts\");\nconst inquirer_1 = __importDefault(__webpack_require__(/*! inquirer */ \"inquirer\"));\nconst validator_1 = __importDefault(__webpack_require__(/*! utils/validator */ \"./lib/utils/validator/index.ts\"));\nconst filter_1 = __importDefault(__webpack_require__(/*! utils/inquirer/filter */ \"./lib/utils/inquirer/filter.ts\"));\nconst transformer_1 = __importDefault(__webpack_require__(/*! utils/inquirer/transformer */ \"./lib/utils/inquirer/transformer.ts\"));\nconst cli_1 = __webpack_require__(/*! utils/cli */ \"./lib/utils/cli.ts\");\nconst parser_1 = __importDefault(__webpack_require__(/*! utils/parser */ \"./lib/utils/parser.ts\"));\nconst path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\nconst config_1 = __importDefault(__webpack_require__(/*! config */ \"./lib/config.ts\"));\nclass default_1 extends index_1.FeatureHandlerAbstract {\n    constructor(argv) {\n        super(argv);\n    }\n    get defaultSchemeGrapqlFilePath() {\n        return `appsync/schema.graphql`;\n    }\n    get defaultServerlessConfigPath() {\n        return `serverless/${this.argv.region}/serverless.yml`;\n    }\n    runMutationPrompts(appsyncStack) {\n        const logger = logger_1.default.getLogger();\n        const locale = (0, getLocale_1.getLocaleLang)(this.lang);\n        logger.debug(`appsyncStack : ${JSON.stringify(appsyncStack)}`);\n        logger.debug('TODO runMutationPrompts');\n        /**\n         * ### Mutationの場合\n         * データソース選択または新規にLambda生成を選択\n         * functions.yml更新\n         * dataSource.yml更新\n         * mappingtemplateは、customMappingtemplate.ymlを指定すること（存在しない場合は新規作成）\n         * customMappingtemplate.ymlをstack.ymlへ書き込み\n         * functionConfigurations更新（更新先のfunctionConfigurations.ymlを選択）\n         * scheme.graphqlは、customScheme.graphqlを指定すること（存在しない場合は新規作成）\n         * customScheme.graphqlをstack.ymlへ書き込み\n         * レスポンスの型情報を選択 Example | 全Typeから選択（先にExampleにするか？を質問）\n         */\n    }\n    runQueryPrompts(appsyncStack) {\n        const logger = logger_1.default.getLogger();\n        const locale = (0, getLocale_1.getLocaleLang)(this.lang);\n        logger.debug(`appsyncStack : ${JSON.stringify(appsyncStack)}`);\n        logger.debug('TODO runQueryPrompts');\n        /**\n         * ### Queryの場合\n         * データソース選択\n         * 適用するVTLテンプレートを選択 Query | QueryWithGSI | LocalResolver\n         * resolver.vtl作成\n         * mappingtemplateは、customMappingtemplate.ymlを指定すること（存在しない場合は新規作成）\n         * customMappingtemplate.ymlをstack.ymlへ書き込み\n         * functionConfigurations更新（更新先のfunctionConfigurations.ymlを選択）\n         * scheme.graphqlは、customScheme.graphqlを指定すること（存在しない場合は新規作成）\n         * customScheme.graphqlをstack.ymlへ書き込み\n         * レスポンスの型情報を選択 Example | 全Typeから選択（先にExampleにするか？を質問）\n         */\n    }\n    runGetItemPrompts(appsyncStack) {\n        const logger = logger_1.default.getLogger();\n        const locale = (0, getLocale_1.getLocaleLang)(this.lang);\n        logger.debug(`appsyncStack : ${JSON.stringify(appsyncStack)}`);\n        logger.debug('TODO runGetItemPrompts');\n        /**\n         * ### Getの場合\n         * データソース選択\n         * Getの場合、適用するVTLテンプレートを選択 GetItem | GetItemConsistentRead | LocalResolver\n         * resolver.vtl作成\n         * mappingtemplateは、customMappingtemplate.ymlを指定すること（存在しない場合は新規作成）\n         * customMappingtemplate.ymlをstack.ymlへ書き込み\n         * functionConfigurations更新（更新先のfunctionConfigurations.ymlを選択）\n         * scheme.graphqlは、customScheme.graphqlを指定すること（存在しない場合は新規作成）\n         * customScheme.graphqlをstack.ymlへ書き込み\n         * レスポンスの型情報を選択 Example | 全Typeから選択（先にExampleにするか？を質問）\n         */\n    }\n    async run() {\n        const logger = logger_1.default.getLogger();\n        const locale = (0, getLocale_1.getLocaleLang)(this.lang);\n        const info = (await inquirer_1.default.prompt([\n            {\n                type: 'input',\n                name: 'apiName',\n                message: 'API名を入力',\n                filter: (input) => input.replace(/\\s+/g, ''),\n                transformer: (input) => input.replace(/\\s+/g, ''),\n                validate: (value) => new validator_1.default(value, this.lang).required().mustNoIncludeZenkaku().value(),\n            },\n            {\n                type: 'list',\n                name: 'apiType',\n                choices: ['Mutation', 'Query'],\n                message: 'APIタイプを選択',\n                validate: (value) => new validator_1.default(value, this.lang).required().value(),\n            },\n            {\n                type: 'list',\n                name: 'resolverType',\n                choices: ['UNIT', 'PIPELINE'],\n                message: 'リゾルバータイプを選択',\n                validate: (value) => new validator_1.default(value, this.lang).required().value(),\n            },\n            {\n                type: 'input',\n                name: 'serverlessConfigPath',\n                message: 'input a serverless config file path',\n                default: () => this.defaultServerlessConfigPath,\n                validate: (value) => new validator_1.default(value, this.lang).required().mustBeYamlFilePath().value(),\n                transformer: (input) => new transformer_1.default(input).removeAllSpace().value(),\n                filter: (input) => new filter_1.default(input).removeAllSpace().value(),\n            },\n        ]));\n        logger.debug(`input info values : ${JSON.stringify(info)}}`);\n        if (!(0, cli_1.isFileExists)(path_1.default.join(config_1.default.currentPath, info.serverlessConfigPath))) {\n            throw new Error('serverless.ymlが存在しません');\n        }\n        const slsConfig = (0, yaml_1.loadYaml)(info.serverlessConfigPath);\n        if ((slsConfig.plugins ?? []).includes('serverless-appsync-plugin')) {\n            throw new Error('serverless-appsync-pluginがインストールされていません');\n        }\n        const appSyncStackPath = parser_1.default.parseSlsRecursivelyReference(slsConfig.custom?.appsync);\n        if (!lodash_1.default.isString(appSyncStackPath) || !lodash_1.default.isEmpty(parser_1.default.parseSlsRecursivelyReference(appSyncStackPath))) {\n            throw new Error('serverless.ymlのcustom.appsyncが不正です、custom.appsyncには、以下のような文字列が設定されている必要があります。\\n\\n${file(./appsync/stack.yml)}');\n        }\n        const appSyncStack = parser_1.default.parseAppSyncStack(appSyncStackPath);\n        if (appSyncStack.mappingTemplates.some((m) => m.type === info.apiType && m.field === info.apiName)) {\n            throw new Error('既にマッピングテンプレートに定義が存在します');\n        }\n        if (info.resolverType === 'PIPELINE' && appSyncStack.functionConfigurations.some((m) => m.name === `Mutation${info.apiName}`)) {\n            throw new Error('既にリゾルバー関数がAPIが存在します');\n        }\n        if (info.apiType === 'Mutation') {\n            if (appSyncStack.schema.isExistsMutationApi(info.apiName))\n                throw new Error('既にschemeにAPI定義が存在します');\n            return this.runMutationPrompts(appSyncStack);\n        }\n        if (info.apiType === 'Query') {\n            if (appSyncStack.schema.isExistsQueryApi(info.apiName))\n                throw new Error('既にschemeにAPI定義が存在します');\n            const { operation } = (await inquirer_1.default.prompt([\n                {\n                    type: 'list',\n                    name: 'operation',\n                    choices: ['Query', 'GetItem'],\n                    message: 'Queryのタイプを選択',\n                    validate: (value) => new validator_1.default(value, this.lang).required().value(),\n                },\n            ]));\n            if (operation === 'Query')\n                return this.runQueryPrompts(appSyncStack);\n            if (operation === 'GetItem')\n                return this.runGetItemPrompts(appSyncStack);\n        }\n    }\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/api/handler.ts?"
        );

        /***/
      },

    /***/ './lib/features/add/features/api/index.ts':
      /*!************************************************!*\
  !*** ./lib/features/add/features/api/index.ts ***!
  \************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst builder_1 = __importDefault(__webpack_require__(/*! features/add/features/api/builder */ "./lib/features/add/features/api/builder.ts"));\nconst handler_1 = __importDefault(__webpack_require__(/*! features/add/features/api/handler */ "./lib/features/add/features/api/handler.ts"));\nexports["default"] = {\n    builder: builder_1.default,\n    handler: handler_1.default,\n};\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/api/index.ts?'
        );

        /***/
      },

    /***/ './lib/features/add/features/api/locale/en.ts':
      /*!****************************************************!*\
  !*** ./lib/features/add/features/api/locale/en.ts ***!
  \****************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    error: {\n        mustByYamlFilePath: 'path is not yaml file',\n        alreadyExistResource: 'resource name is already exists',\n    },\n    overrightFile: 'overright yaml file',\n    outputFile: 'output yaml file',\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/api/locale/en.ts?"
        );

        /***/
      },

    /***/ './lib/features/add/features/api/locale/ja.ts':
      /*!****************************************************!*\
  !*** ./lib/features/add/features/api/locale/ja.ts ***!
  \****************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    error: {\n        mustByYamlFilePath: 'Yamlファイルのパスを指定して下さい',\n        alreadyExistResource: '指定のリソース名は既に存在します',\n    },\n    overrightFile: 'Yamlファイルを上書き',\n    outputFile: 'Yamlファイルを出力',\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/api/locale/ja.ts?"
        );

        /***/
      },

    /***/ './lib/features/add/features/api/utils/getLocale.ts':
      /*!**********************************************************!*\
  !*** ./lib/features/add/features/api/utils/getLocale.ts ***!
  \**********************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.getLocaleLang = void 0;\nconst ja_1 = __importDefault(__webpack_require__(/*! features/add/features/api/locale/ja */ "./lib/features/add/features/api/locale/ja.ts"));\nconst en_1 = __importDefault(__webpack_require__(/*! features/add/features/api/locale/en */ "./lib/features/add/features/api/locale/en.ts"));\nconst getLocaleLang = (locale) => {\n    switch (locale) {\n        case \'ja\':\n            return ja_1.default;\n        case \'en\':\n            return en_1.default;\n        default:\n            return en_1.default;\n    }\n};\nexports.getLocaleLang = getLocaleLang;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/api/utils/getLocale.ts?'
        );

        /***/
      },

    /***/ './lib/features/add/features/basicauthlambda/builder.ts':
      /*!**************************************************************!*\
  !*** ./lib/features/add/features/basicauthlambda/builder.ts ***!
  \**************************************************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst index_1 = __webpack_require__(/*! types/index */ "./lib/types/index.ts");\nclass default_1 extends index_1.FeatureBuilderAbstract {\n    constructor(args) {\n        super(args);\n    }\n    build(_yargs) {\n        return _yargs.version(false).usage(\'Usage: $0 basic-auth-lambda\');\n    }\n}\nexports["default"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/basicauthlambda/builder.ts?'
        );

        /***/
      },

    /***/ './lib/features/add/features/basicauthlambda/handler.ts':
      /*!**************************************************************!*\
  !*** ./lib/features/add/features/basicauthlambda/handler.ts ***!
  \**************************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          "\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ \"./lib/utils/logger.ts\"));\nconst index_1 = __webpack_require__(/*! types/index */ \"./lib/types/index.ts\");\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nconst yaml_1 = __webpack_require__(/*! utils/yaml */ \"./lib/utils/yaml.ts\");\nconst getLocale_1 = __webpack_require__(/*! features/add/features/basicauthlambda/utils/getLocale */ \"./lib/features/add/features/basicauthlambda/utils/getLocale.ts\");\nconst inquirer_1 = __importDefault(__webpack_require__(/*! inquirer */ \"inquirer\"));\nconst validator_1 = __importDefault(__webpack_require__(/*! utils/validator */ \"./lib/utils/validator/index.ts\"));\nconst transformer_1 = __importDefault(__webpack_require__(/*! utils/inquirer/transformer */ \"./lib/utils/inquirer/transformer.ts\"));\nconst filter_1 = __importDefault(__webpack_require__(/*! utils/inquirer/filter */ \"./lib/utils/inquirer/filter.ts\"));\nconst yargonaut_1 = __webpack_require__(/*! yargonaut */ \"yargonaut\");\nconst iam = __importStar(__webpack_require__(/*! @aws-cdk/aws-iam */ \"@aws-cdk/aws-iam\"));\nconst cdk = __importStar(__webpack_require__(/*! aws-cdk-lib */ \"aws-cdk-lib\"));\nconst parser_1 = __importDefault(__webpack_require__(/*! utils/parser */ \"./lib/utils/parser.ts\"));\nconst code_1 = __importDefault(__webpack_require__(/*! utils/code */ \"./lib/utils/code/index.ts\"));\nclass default_1 extends index_1.FeatureHandlerAbstract {\n    constructor(argv) {\n        super(argv);\n    }\n    // lambda edge must be in us-east-1\n    defaultServerlessConfigPath = `serverless/us-east-1/serverless.yml`;\n    defaultFunctionYamlPath = `serverless/us-east-1/resources/functions.yml`;\n    defaultIamRolePath = `serverless/us-east-1/resources/iam-role.yml`;\n    defaultBasicLambdaPath = `src/functions/lambdaedge/basicAuth.handler`;\n    defaultLambdaRoleName = 'DefaultLambdaRole';\n    lambdaEdgeTimeout = 5;\n    lambdaEdgeMemorySize = 128;\n    generateLambdaIamRoleCf(region) {\n        return (0, yaml_1.generateCloudFormation)(this.defaultLambdaRoleName, (c) => {\n            const role = new iam.Role(c, this.defaultLambdaRoleName, {\n                assumedBy: new iam.ServicePrincipal('edgelambda.amazonaws.com'),\n            });\n            role.addToPolicy(new iam.PolicyStatement({\n                effect: iam.Effect.ALLOW,\n                resources: [cdk.Fn.join(':', ['arn:aws:logs', cdk.Fn.ref('AWS::Region'), cdk.Fn.ref('AWS::AccountId'), 'log-group:/aws/lambda/*:*:*'])],\n                actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],\n            }));\n            role.addToPolicy(new iam.PolicyStatement({\n                effect: iam.Effect.ALLOW,\n                resources: [cdk.Fn.join(':', ['arn:aws:logs', region, cdk.Fn.ref('AWS::AccountId'), 'log-group:/aws/lambda/*:*:*'])],\n                actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],\n            }));\n            return role;\n        });\n    }\n    get defaultServerlessConfig() {\n        return (0, yaml_1.generateServerlessConfig)({\n            service: 'basic-lambda-auth',\n            provider: {\n                region: 'us-east-1',\n                environment: {\n                    LOG_LEVEL: 'WARN',\n                },\n                iam: { role: this.defaultLambdaRoleName },\n            },\n            custom: {\n                awsResourcePrefix: '${self:service}-${self:provider.region}-${self:provider.stage}-',\n            },\n            functions: `\\${file(./${this.defaultFunctionYamlPath})}`,\n            resources: [`\\${file(./${this.defaultIamRolePath})}`],\n        });\n    }\n    writeIamRoleCf(roleCfPath, lamndaRoleName) {\n        const locale = (0, getLocale_1.getLocaleLang)(this.lang);\n        const logger = logger_1.default.getLogger();\n        try {\n            const doc = (0, yaml_1.loadYaml)(roleCfPath) ?? {};\n            if (lodash_1.default.hasIn(doc, `Resources.${lamndaRoleName}`)) {\n                logger.info(`resource name : ${lamndaRoleName}`);\n                logger.info(`already exists resource file path : ${roleCfPath}`);\n                return;\n            }\n            const yamlText = (0, yaml_1.writeYaml)(roleCfPath, {\n                ...doc,\n                Resources: {\n                    ...doc.Resources,\n                    ...this.generateLambdaIamRoleCf(this.argv.region),\n                },\n            });\n            logger.info(roleCfPath);\n            logger.info(`${locale.overrightFile} : ${roleCfPath}`);\n            logger.info((0, yargonaut_1.chalk)().green(yamlText));\n        }\n        catch (e) {\n            const yamlText = (0, yaml_1.writeYaml)(roleCfPath, this.generateLambdaIamRoleCf(this.argv.region));\n            logger.info(`${locale.outputFile} : ${roleCfPath}`);\n            logger.info((0, yargonaut_1.chalk)().green(yamlText));\n        }\n    }\n    writeFunctionsYaml = (resourceName, yamlPath, lambdaHandler) => {\n        const logger = logger_1.default.getLogger();\n        try {\n            const doc = (0, yaml_1.loadYaml)(yamlPath) ?? {};\n            if (lodash_1.default.has(doc, resourceName))\n                return;\n            const yamlText = (0, yaml_1.writeYaml)(yamlPath, {\n                ...doc,\n                ...(0, yaml_1.generateFunctionYamlProperty)(resourceName, {\n                    handler: lambdaHandler,\n                    memorySize: this.lambdaEdgeMemorySize,\n                    timeout: this.lambdaEdgeTimeout,\n                }),\n            });\n            logger.info('write functions property');\n            logger.info((0, yargonaut_1.chalk)().green(yamlText));\n        }\n        catch (e) {\n            const yamlText = (0, yaml_1.writeYaml)(yamlPath, {\n                ...(0, yaml_1.generateFunctionYamlProperty)(resourceName, {\n                    handler: lambdaHandler,\n                    memorySize: this.lambdaEdgeMemorySize,\n                    timeout: this.lambdaEdgeTimeout,\n                }),\n            });\n            logger.info('write functions property');\n            logger.info((0, yargonaut_1.chalk)().green(yamlText));\n        }\n    };\n    async prompt() {\n        const res = (await inquirer_1.default\n            .prompt([\n            {\n                type: 'input',\n                name: 'functionName',\n                message: 'input a functions name',\n                default: 'BasicAuth',\n                validate: (value) => new validator_1.default(value, this.lang).required().mustNoIncludeZenkaku().value(),\n                transformer: (input) => new transformer_1.default(input).removeAllSpace().value(),\n                filter: (input) => new filter_1.default(input).removeAllSpace().value(),\n            },\n            {\n                type: 'input',\n                name: 'lamndaRoleCfPath',\n                message: 'input a lambda iam role cloudformation path',\n                default: () => this.defaultIamRolePath,\n                validate: (value) => new validator_1.default(value, this.lang).required().mustBeYamlFilePath().value(),\n                transformer: (input) => new transformer_1.default(input).removeAllSpace().value(),\n                filter: (input) => new filter_1.default(input).removeAllSpace().value(),\n            },\n            {\n                type: 'input',\n                name: 'lambdaHandler',\n                message: 'input a lambda handler path',\n                default: () => this.defaultBasicLambdaPath,\n                validate: (value) => new validator_1.default(value, this.lang).required().mustBeExtension().value(),\n                transformer: (input) => new transformer_1.default(input).removeAllSpace().value(),\n                filter: (input) => new filter_1.default(input).removeAllSpace().value(),\n            },\n            {\n                type: 'input',\n                name: 'lamndaRoleName',\n                message: 'input a lambda iam role name',\n                default: () => this.defaultLambdaRoleName,\n                validate: (value) => new validator_1.default(value, this.lang).required().value(),\n                transformer: (input) => new transformer_1.default(input).removeAllSpace().value(),\n                filter: (input) => new filter_1.default(input).removeAllSpace().value(),\n            },\n            {\n                type: 'input',\n                name: 'serverlessConfigPath',\n                message: 'input a serverless config file path',\n                default: () => this.defaultServerlessConfigPath,\n                validate: (value) => new validator_1.default(value, this.lang).required().mustBeYamlFilePath().value(),\n                transformer: (input) => new transformer_1.default(input).removeAllSpace().value(),\n                filter: (input) => new filter_1.default(input).removeAllSpace().value(),\n            },\n        ])\n            .then((answers) => {\n            return answers;\n        }));\n        return res;\n    }\n    async run() {\n        const logger = logger_1.default.getLogger();\n        const locale = (0, getLocale_1.getLocaleLang)(this.lang);\n        const res = await this.prompt();\n        logger.debug(`input values : ${JSON.stringify(res)}}`);\n        const { functionName, serverlessConfigPath, lamndaRoleCfPath, lamndaRoleName, lambdaHandler } = res;\n        try {\n            const doc = (0, yaml_1.loadYaml)(serverlessConfigPath) ?? {};\n            let functionsYamlPath = this.defaultFunctionYamlPath;\n            if (doc.provider.region !== 'us-east-1')\n                throw new Error('lambda edge must be in us-east-1');\n            if (lodash_1.default.isEmpty(doc.functions)) {\n                const yamlText = (0, yaml_1.writeYaml)(serverlessConfigPath, {\n                    ...doc,\n                    functions: `\\${file(./${functionsYamlPath})}`,\n                });\n                logger.info('write functions property');\n                logger.info((0, yargonaut_1.chalk)().green(yamlText));\n            }\n            else if (lodash_1.default.isString(doc.functions)) {\n                const filePath = parser_1.default.parseSlsRecursivelyReference(doc.functions);\n                if (filePath)\n                    functionsYamlPath = filePath;\n            }\n            else if (lodash_1.default.isObject(doc.functions)) {\n                if (Object.keys(doc.functions).every((k) => !k.includes(functionsYamlPath))) {\n                    const yamlText = (0, yaml_1.writeYaml)(serverlessConfigPath, {\n                        ...doc,\n                        functions: {\n                            ...doc.functions,\n                            ...(0, yaml_1.generateFunctionYamlProperty)(functionName, {\n                                handler: lambdaHandler,\n                                memorySize: this.lambdaEdgeMemorySize,\n                                timeout: this.lambdaEdgeTimeout,\n                            }),\n                        },\n                    });\n                    logger.info('write functions property');\n                    logger.info((0, yargonaut_1.chalk)().green(yamlText));\n                }\n            }\n            this.writeFunctionsYaml(functionName, functionsYamlPath, lambdaHandler);\n            this.writeIamRoleCf(lamndaRoleCfPath, lamndaRoleName);\n        }\n        catch (e) {\n            const yamlText = (0, yaml_1.writeYaml)(serverlessConfigPath, this.defaultServerlessConfig);\n            logger.info(`${locale.outputFile} : ${serverlessConfigPath}`);\n            logger.info((0, yargonaut_1.chalk)().green(yamlText));\n            this.writeFunctionsYaml(functionName, this.defaultFunctionYamlPath, lambdaHandler);\n            this.writeIamRoleCf(lamndaRoleCfPath, lamndaRoleName);\n        }\n        new code_1.default({ handlerPath: lambdaHandler, code: code_1.default.templates.basicauthlambda }).write();\n    }\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/basicauthlambda/handler.ts?"
        );

        /***/
      },

    /***/ './lib/features/add/features/basicauthlambda/index.ts':
      /*!************************************************************!*\
  !*** ./lib/features/add/features/basicauthlambda/index.ts ***!
  \************************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst builder_1 = __importDefault(__webpack_require__(/*! features/add/features/basicauthlambda/builder */ "./lib/features/add/features/basicauthlambda/builder.ts"));\nconst handler_1 = __importDefault(__webpack_require__(/*! features/add/features/basicauthlambda/handler */ "./lib/features/add/features/basicauthlambda/handler.ts"));\nexports["default"] = {\n    builder: builder_1.default,\n    handler: handler_1.default,\n};\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/basicauthlambda/index.ts?'
        );

        /***/
      },

    /***/ './lib/features/add/features/basicauthlambda/locale/en.ts':
      /*!****************************************************************!*\
  !*** ./lib/features/add/features/basicauthlambda/locale/en.ts ***!
  \****************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    error: {\n        alreadyExistResource: 'resource name is already exists',\n    },\n    overrightFile: 'overright yaml file',\n    outputFile: 'output yaml file',\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/basicauthlambda/locale/en.ts?"
        );

        /***/
      },

    /***/ './lib/features/add/features/basicauthlambda/locale/ja.ts':
      /*!****************************************************************!*\
  !*** ./lib/features/add/features/basicauthlambda/locale/ja.ts ***!
  \****************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    error: {\n        alreadyExistResource: '指定のリソース名は既に存在します',\n    },\n    overrightFile: 'Yamlファイルを上書き',\n    outputFile: 'Yamlファイルを出力',\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/basicauthlambda/locale/ja.ts?"
        );

        /***/
      },

    /***/ './lib/features/add/features/basicauthlambda/utils/getLocale.ts':
      /*!**********************************************************************!*\
  !*** ./lib/features/add/features/basicauthlambda/utils/getLocale.ts ***!
  \**********************************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.getLocaleLang = void 0;\nconst ja_1 = __importDefault(__webpack_require__(/*! features/add/features/basicauthlambda/locale/ja */ "./lib/features/add/features/basicauthlambda/locale/ja.ts"));\nconst en_1 = __importDefault(__webpack_require__(/*! features/add/features/basicauthlambda/locale/en */ "./lib/features/add/features/basicauthlambda/locale/en.ts"));\nconst getLocaleLang = (locale) => {\n    switch (locale) {\n        case \'ja\':\n            return ja_1.default;\n        case \'en\':\n            return en_1.default;\n        default:\n            return en_1.default;\n    }\n};\nexports.getLocaleLang = getLocaleLang;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/basicauthlambda/utils/getLocale.ts?'
        );

        /***/
      },

    /***/ './lib/features/add/features/sns/builder.ts':
      /*!**************************************************!*\
  !*** ./lib/features/add/features/sns/builder.ts ***!
  \**************************************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst index_1 = __webpack_require__(/*! types/index */ "./lib/types/index.ts");\nclass default_1 extends index_1.FeatureBuilderAbstract {\n    constructor(args) {\n        super(args);\n    }\n    build(_yargs) {\n        return _yargs.version(false).usage(\'Usage: $0 sns\');\n    }\n}\nexports["default"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sns/builder.ts?'
        );

        /***/
      },

    /***/ './lib/features/add/features/sns/handler.ts':
      /*!**************************************************!*\
  !*** ./lib/features/add/features/sns/handler.ts ***!
  \**************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          "\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ \"./lib/utils/logger.ts\"));\nconst index_1 = __webpack_require__(/*! types/index */ \"./lib/types/index.ts\");\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nconst yaml_1 = __webpack_require__(/*! utils/yaml */ \"./lib/utils/yaml.ts\");\nconst getLocale_1 = __webpack_require__(/*! features/add/features/sns/utils/getLocale */ \"./lib/features/add/features/sns/utils/getLocale.ts\");\nconst index_2 = __webpack_require__(/*! exceptions/index */ \"./lib/exceptions/index.ts\");\nconst inquirer_1 = __importDefault(__webpack_require__(/*! inquirer */ \"inquirer\"));\nconst validator_1 = __importDefault(__webpack_require__(/*! utils/validator */ \"./lib/utils/validator/index.ts\"));\nconst filter_1 = __importDefault(__webpack_require__(/*! utils/inquirer/filter */ \"./lib/utils/inquirer/filter.ts\"));\nconst transformer_1 = __importDefault(__webpack_require__(/*! utils/inquirer/transformer */ \"./lib/utils/inquirer/transformer.ts\"));\nconst yargonaut_1 = __webpack_require__(/*! yargonaut */ \"yargonaut\");\nconst yaml_2 = __webpack_require__(/*! utils/yaml */ \"./lib/utils/yaml.ts\");\nconst sns = __importStar(__webpack_require__(/*! @aws-cdk/aws-sns */ \"@aws-cdk/aws-sns\"));\nconst sqs = __importStar(__webpack_require__(/*! @aws-cdk/aws-sqs */ \"@aws-cdk/aws-sqs\"));\nconst subs = __importStar(__webpack_require__(/*! @aws-cdk/aws-sns-subscriptions */ \"@aws-cdk/aws-sns-subscriptions\"));\nconst lambda = __importStar(__webpack_require__(/*! @aws-cdk/aws-lambda */ \"@aws-cdk/aws-lambda\"));\nconst cdk = __importStar(__webpack_require__(/*! aws-cdk-lib */ \"aws-cdk-lib\"));\nclass default_1 extends index_1.FeatureHandlerAbstract {\n    constructor(argv) {\n        super(argv);\n    }\n    defaultResourcePath(resourceName) {\n        return `serverless/${this.argv.region}/resources/sns/${resourceName}.yml`;\n    }\n    get defaultServerlessConfigPath() {\n        return `serverless/${this.argv.region}/serverless.yml`;\n    }\n    generateSnsCf(topicName, subscriptions) {\n        return (0, yaml_2.generateCloudFormation)(topicName, (c) => {\n            const topic = new sns.Topic(c, topicName, {\n                topicName: topicName,\n            });\n            subscriptions.forEach((s) => {\n                if (s === 'email')\n                    topic.addSubscription(new subs.EmailSubscription('****@****.com'));\n                else if (s === 'lambda')\n                    topic.addSubscription(new subs.LambdaSubscription(lambda.Function.fromFunctionArn(c, `${topicName}Lambda`, `arn:aws:lambda:${this.argv.region}:${cdk.Fn.ref('AWS::AccountId')}:function:*****`)));\n                else if (s === 'sms')\n                    topic.addSubscription(new subs.SmsSubscription(`0000000000`));\n                else if (s === 'url')\n                    topic.addSubscription(new subs.UrlSubscription('https://*****.com'));\n                else if (s === 'sqs')\n                    topic.addSubscription(new subs.SqsSubscription(new sqs.Queue(c, `${topicName}SubscribeQueue`)));\n            });\n            return topic;\n        });\n    }\n    async run() {\n        const logger = logger_1.default.getLogger();\n        const locale = (0, getLocale_1.getLocaleLang)(this.lang);\n        const res = await inquirer_1.default\n            .prompt([\n            {\n                type: 'input',\n                name: 'resourceName',\n                message: 'input a sns resource name',\n                filter: (input) => input.replace(/\\s+/g, ''),\n                transformer: (input) => input.replace(/\\s+/g, ''),\n                validate: (value) => new validator_1.default(value, this.lang).required().mustNoIncludeZenkaku().value(),\n            },\n        ])\n            .then(async (answers) => {\n            const res = (await inquirer_1.default.prompt([\n                {\n                    type: 'checkbox',\n                    name: 'subscriptions',\n                    message: 'select a sns subscriptions',\n                    choices: ['email', 'lambda', 'sms', 'url', 'sqs'],\n                    validate: (value) => {\n                        if (lodash_1.default.isEmpty(value))\n                            return locale.error.reqiredSubscriptions;\n                        return true;\n                    },\n                },\n                {\n                    type: 'input',\n                    name: 'filePath',\n                    message: 'input a cloudformation file path',\n                    default: () => this.defaultResourcePath(answers.resourceName),\n                    validate: (value) => new validator_1.default(value, this.lang).required().mustBeYamlFilePath().value(),\n                    transformer: (input) => new transformer_1.default(input).filePath().value(),\n                    filter: (input) => new filter_1.default(input).filePath().value(),\n                },\n                {\n                    type: 'input',\n                    name: 'serverlessConfigPath',\n                    message: 'input a serverless config file path',\n                    default: () => this.defaultServerlessConfigPath,\n                    validate: (value) => new validator_1.default(value, this.lang).required().mustBeYamlFilePath().value(),\n                    transformer: (input) => new transformer_1.default(input).removeAllSpace().value(),\n                    filter: (input) => new filter_1.default(input).removeAllSpace().value(),\n                },\n            ]));\n            return {\n                ...res,\n                ...answers,\n            };\n        });\n        logger.debug(`input values : ${JSON.stringify(res)}}`);\n        const { resourceName, filePath, subscriptions, serverlessConfigPath } = res;\n        const resource = this.generateSnsCf(resourceName, subscriptions);\n        try {\n            const doc = (0, yaml_1.loadYaml)(filePath) ?? {};\n            if (lodash_1.default.hasIn(doc, `Resources.${resourceName}`)) {\n                logger.error(`${locale.error.alreadyExistResource}`);\n                logger.error(`ResourceName : ${resourceName}`);\n                logger.error(doc);\n                throw new index_2.DuplicatedPropertyError(locale.error.alreadyExistResource);\n            }\n            const yamlText = (0, yaml_1.writeYaml)(filePath, {\n                ...doc,\n                Resources: {\n                    ...doc.Resources,\n                    ...resource,\n                },\n            });\n            logger.info(filePath);\n            logger.info(`${locale.overrightFile} : ${filePath}`);\n            logger.info((0, yargonaut_1.chalk)().green(yamlText));\n        }\n        catch (e) {\n            if (e.name === 'DuplicatedPropertyError')\n                throw e;\n            const yamlText = (0, yaml_1.writeYaml)(filePath, {\n                Resources: {\n                    ...resource,\n                },\n            });\n            logger.info(filePath);\n            logger.info(`${locale.outputFile} : ${filePath}`);\n            logger.info((0, yargonaut_1.chalk)().green(yamlText));\n        }\n        (0, yaml_1.writeServerlessConfig)({ serverlessConfigPath, resourceFilePath: filePath });\n    }\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sns/handler.ts?"
        );

        /***/
      },

    /***/ './lib/features/add/features/sns/index.ts':
      /*!************************************************!*\
  !*** ./lib/features/add/features/sns/index.ts ***!
  \************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst builder_1 = __importDefault(__webpack_require__(/*! features/add/features/sns/builder */ "./lib/features/add/features/sns/builder.ts"));\nconst handler_1 = __importDefault(__webpack_require__(/*! features/add/features/sns/handler */ "./lib/features/add/features/sns/handler.ts"));\nexports["default"] = {\n    builder: builder_1.default,\n    handler: handler_1.default,\n};\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sns/index.ts?'
        );

        /***/
      },

    /***/ './lib/features/add/features/sns/locale/en.ts':
      /*!****************************************************!*\
  !*** ./lib/features/add/features/sns/locale/en.ts ***!
  \****************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    error: {\n        reqiredSubscriptions: 'required select a subscriptions',\n        mustByYamlFilePath: 'path is not yaml file',\n        alreadyExistResource: 'resource name is already exists',\n    },\n    overrightFile: 'overright yaml file',\n    outputFile: 'output yaml file',\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sns/locale/en.ts?"
        );

        /***/
      },

    /***/ './lib/features/add/features/sns/locale/ja.ts':
      /*!****************************************************!*\
  !*** ./lib/features/add/features/sns/locale/ja.ts ***!
  \****************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    error: {\n        reqiredSubscriptions: 'サブスクリプションを選択して下さい',\n        mustByYamlFilePath: 'Yamlファイルのパスを指定して下さい',\n        alreadyExistResource: '指定のリソース名は既に存在します',\n    },\n    overrightFile: 'Yamlファイルを上書き',\n    outputFile: 'Yamlファイルを出力',\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sns/locale/ja.ts?"
        );

        /***/
      },

    /***/ './lib/features/add/features/sns/utils/getLocale.ts':
      /*!**********************************************************!*\
  !*** ./lib/features/add/features/sns/utils/getLocale.ts ***!
  \**********************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.getLocaleLang = void 0;\nconst ja_1 = __importDefault(__webpack_require__(/*! features/add/features/sns/locale/ja */ "./lib/features/add/features/sns/locale/ja.ts"));\nconst en_1 = __importDefault(__webpack_require__(/*! features/add/features/sns/locale/en */ "./lib/features/add/features/sns/locale/en.ts"));\nconst getLocaleLang = (locale) => {\n    switch (locale) {\n        case \'ja\':\n            return ja_1.default;\n        case \'en\':\n            return en_1.default;\n        default:\n            return en_1.default;\n    }\n};\nexports.getLocaleLang = getLocaleLang;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sns/utils/getLocale.ts?'
        );

        /***/
      },

    /***/ './lib/features/add/features/sqs/builder.ts':
      /*!**************************************************!*\
  !*** ./lib/features/add/features/sqs/builder.ts ***!
  \**************************************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst index_1 = __webpack_require__(/*! types/index */ "./lib/types/index.ts");\nclass default_1 extends index_1.FeatureBuilderAbstract {\n    constructor(args) {\n        super(args);\n    }\n    build(_yargs) {\n        return _yargs.version(false).usage(\'Usage: $0 sqs\');\n    }\n}\nexports["default"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sqs/builder.ts?'
        );

        /***/
      },

    /***/ './lib/features/add/features/sqs/handler.ts':
      /*!**************************************************!*\
  !*** ./lib/features/add/features/sqs/handler.ts ***!
  \**************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          "\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ \"./lib/utils/logger.ts\"));\nconst index_1 = __webpack_require__(/*! types/index */ \"./lib/types/index.ts\");\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nconst yaml_1 = __webpack_require__(/*! utils/yaml */ \"./lib/utils/yaml.ts\");\nconst getLocale_1 = __webpack_require__(/*! features/add/features/sqs/utils/getLocale */ \"./lib/features/add/features/sqs/utils/getLocale.ts\");\nconst index_2 = __webpack_require__(/*! exceptions/index */ \"./lib/exceptions/index.ts\");\nconst inquirer_1 = __importDefault(__webpack_require__(/*! inquirer */ \"inquirer\"));\nconst validator_1 = __importDefault(__webpack_require__(/*! utils/validator */ \"./lib/utils/validator/index.ts\"));\nconst filter_1 = __importDefault(__webpack_require__(/*! utils/inquirer/filter */ \"./lib/utils/inquirer/filter.ts\"));\nconst transformer_1 = __importDefault(__webpack_require__(/*! utils/inquirer/transformer */ \"./lib/utils/inquirer/transformer.ts\"));\nconst yargonaut_1 = __webpack_require__(/*! yargonaut */ \"yargonaut\");\nconst yaml_2 = __webpack_require__(/*! utils/yaml */ \"./lib/utils/yaml.ts\");\nconst sqs = __importStar(__webpack_require__(/*! @aws-cdk/aws-sqs */ \"@aws-cdk/aws-sqs\"));\nclass default_1 extends index_1.FeatureHandlerAbstract {\n    constructor(argv) {\n        super(argv);\n    }\n    defaultResourcePath(resourceName) {\n        return `serverless/${this.argv.region}/resources/sqs/${resourceName}.yml`;\n    }\n    get defaultServerlessConfigPath() {\n        return `serverless/${this.argv.region}/serverless.yml`;\n    }\n    defaultMaxMessageSizeBytes = 262144;\n    defaultMaxReceiveCount = 3;\n    generateSqsCf(queueName, input) {\n        return (0, yaml_2.generateCloudFormation)(queueName, (c) => {\n            const isFifo = input.queueType === 'Fifo';\n            if (input.useDeadLetterQueue) {\n                const dlqParams = {\n                    queueName: `${queueName}DeadLetter`,\n                };\n                if (isFifo) {\n                    lodash_1.default.assign(dlqParams, {\n                        queueName: `${queueName}DeadLetter.fifo`,\n                        fifo: true,\n                    });\n                }\n                const dlq = new sqs.Queue(c, `${queueName}DeadLetter`, dlqParams);\n                const params = {\n                    queueName: queueName,\n                    fifo: isFifo,\n                    maxMessageSizeBytes: this.defaultMaxMessageSizeBytes,\n                    deadLetterQueue: {\n                        maxReceiveCount: this.defaultMaxReceiveCount,\n                        queue: dlq,\n                    },\n                };\n                if (isFifo) {\n                    lodash_1.default.assign(params, {\n                        queueName: `${queueName}.fifo`,\n                        contentBasedDeduplication: input.contentBasedDeduplication,\n                    });\n                }\n                const queue = new sqs.Queue(c, queueName, params);\n                return queue;\n            }\n            const params = {\n                queueName: queueName,\n                fifo: isFifo,\n                maxMessageSizeBytes: this.defaultMaxMessageSizeBytes,\n            };\n            if (isFifo) {\n                lodash_1.default.assign(params, {\n                    queueName: `${queueName}.fifo`,\n                    contentBasedDeduplication: input.contentBasedDeduplication,\n                });\n            }\n            const queue = new sqs.Queue(c, queueName, params);\n            return queue;\n        });\n    }\n    async run() {\n        const logger = logger_1.default.getLogger();\n        const locale = (0, getLocale_1.getLocaleLang)(this.lang);\n        const res = await inquirer_1.default\n            .prompt([\n            {\n                type: 'input',\n                name: 'resourceName',\n                message: 'input a sqs resource name',\n                filter: (input) => input.replace(/\\s+/g, ''),\n                transformer: (input) => input.replace(/\\s+/g, ''),\n                validate: (value) => new validator_1.default(value, this.lang).required().mustNoIncludeZenkaku().value(),\n            },\n        ])\n            .then(async (answers) => {\n            const res = (await inquirer_1.default.prompt([\n                {\n                    type: 'list',\n                    name: 'queueType',\n                    default: 'Standard',\n                    choices: ['Standard', 'Fifo'],\n                    message: 'Is it a FIFO queue?',\n                },\n                {\n                    type: 'expand',\n                    name: 'useDeadLetterQueue',\n                    message: 'Do you use dead letter queue?',\n                    choices: [\n                        {\n                            key: 'y',\n                            name: 'yes',\n                            value: true,\n                        },\n                        {\n                            key: 'n',\n                            name: 'no',\n                            value: false,\n                        },\n                    ],\n                },\n                {\n                    type: 'expand',\n                    name: 'contentBasedDeduplication',\n                    message: 'Do you use content-based deduplication?',\n                    choices: [\n                        {\n                            key: 'y',\n                            name: 'yes',\n                            value: true,\n                        },\n                        {\n                            key: 'n',\n                            name: 'no',\n                            value: false,\n                        },\n                    ],\n                },\n                {\n                    type: 'input',\n                    name: 'filePath',\n                    message: 'input a cloudformation file path',\n                    default: () => this.defaultResourcePath(answers.resourceName),\n                    validate: (value) => new validator_1.default(value, this.lang).required().mustBeYamlFilePath().value(),\n                    transformer: (input) => new transformer_1.default(input).filePath().value(),\n                    filter: (input) => new filter_1.default(input).filePath().value(),\n                },\n                {\n                    type: 'input',\n                    name: 'serverlessConfigPath',\n                    message: 'input a serverless config file path',\n                    default: () => this.defaultServerlessConfigPath,\n                    validate: (value) => new validator_1.default(value, this.lang).required().mustBeYamlFilePath().value(),\n                    transformer: (input) => new transformer_1.default(input).removeAllSpace().value(),\n                    filter: (input) => new filter_1.default(input).removeAllSpace().value(),\n                },\n            ]));\n            return {\n                ...res,\n                ...answers,\n            };\n        });\n        logger.debug(`input values : ${JSON.stringify(res)}}`);\n        const { resourceName, queueType, useDeadLetterQueue, contentBasedDeduplication, filePath, serverlessConfigPath } = res;\n        const resources = this.generateSqsCf(resourceName, {\n            queueType,\n            useDeadLetterQueue,\n            contentBasedDeduplication,\n        });\n        try {\n            const doc = (0, yaml_1.loadYaml)(filePath) ?? {};\n            logger.debug('readed yaml file');\n            logger.debug(doc);\n            if (lodash_1.default.hasIn(doc, `Resources.${resourceName}`)) {\n                logger.error(`${locale.error.alreadyExistResource}`);\n                logger.error(`ResourceName : ${resourceName}`);\n                logger.error(doc);\n                throw new index_2.DuplicatedPropertyError(locale.error.alreadyExistResource);\n            }\n            const yamlText = (0, yaml_1.writeYaml)(filePath, {\n                ...doc,\n                Resources: {\n                    ...doc.Resources,\n                    ...resources,\n                },\n            });\n            logger.info(filePath);\n            logger.info(`${locale.overrightFile} : ${filePath}`);\n            logger.info((0, yargonaut_1.chalk)().green(yamlText));\n        }\n        catch (e) {\n            if (e.name === 'DuplicatedPropertyError')\n                throw e;\n            logger.debug('create a new yaml file');\n            const yamlText = (0, yaml_1.writeYaml)(filePath, {\n                Resources: {\n                    ...resources,\n                },\n            });\n            logger.info(filePath);\n            logger.info(`${locale.outputFile} : ${filePath}`);\n            logger.info((0, yargonaut_1.chalk)().green(yamlText));\n        }\n        (0, yaml_1.writeServerlessConfig)({ serverlessConfigPath, resourceFilePath: filePath });\n    }\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sqs/handler.ts?"
        );

        /***/
      },

    /***/ './lib/features/add/features/sqs/index.ts':
      /*!************************************************!*\
  !*** ./lib/features/add/features/sqs/index.ts ***!
  \************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst builder_1 = __importDefault(__webpack_require__(/*! features/add/features/sqs/builder */ "./lib/features/add/features/sqs/builder.ts"));\nconst handler_1 = __importDefault(__webpack_require__(/*! features/add/features/sqs/handler */ "./lib/features/add/features/sqs/handler.ts"));\nexports["default"] = {\n    builder: builder_1.default,\n    handler: handler_1.default,\n};\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sqs/index.ts?'
        );

        /***/
      },

    /***/ './lib/features/add/features/sqs/locale/en.ts':
      /*!****************************************************!*\
  !*** ./lib/features/add/features/sqs/locale/en.ts ***!
  \****************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    error: {\n        mustByYamlFilePath: 'path is not yaml file',\n        alreadyExistResource: 'resource name is already exists',\n    },\n    overrightFile: 'overright yaml file',\n    outputFile: 'output yaml file',\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sqs/locale/en.ts?"
        );

        /***/
      },

    /***/ './lib/features/add/features/sqs/locale/ja.ts':
      /*!****************************************************!*\
  !*** ./lib/features/add/features/sqs/locale/ja.ts ***!
  \****************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    error: {\n        mustByYamlFilePath: 'Yamlファイルのパスを指定して下さい',\n        alreadyExistResource: '指定のリソース名は既に存在します',\n    },\n    overrightFile: 'Yamlファイルを上書き',\n    outputFile: 'Yamlファイルを出力',\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sqs/locale/ja.ts?"
        );

        /***/
      },

    /***/ './lib/features/add/features/sqs/utils/getLocale.ts':
      /*!**********************************************************!*\
  !*** ./lib/features/add/features/sqs/utils/getLocale.ts ***!
  \**********************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.getLocaleLang = void 0;\nconst ja_1 = __importDefault(__webpack_require__(/*! features/add/features/sqs/locale/ja */ "./lib/features/add/features/sqs/locale/ja.ts"));\nconst en_1 = __importDefault(__webpack_require__(/*! features/add/features/sqs/locale/en */ "./lib/features/add/features/sqs/locale/en.ts"));\nconst getLocaleLang = (locale) => {\n    switch (locale) {\n        case \'ja\':\n            return ja_1.default;\n        case \'en\':\n            return en_1.default;\n        default:\n            return en_1.default;\n    }\n};\nexports.getLocaleLang = getLocaleLang;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sqs/utils/getLocale.ts?'
        );

        /***/
      },

    /***/ './lib/features/add/index.ts':
      /*!***********************************!*\
  !*** ./lib/features/add/index.ts ***!
  \***********************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst builder_1 = __importDefault(__webpack_require__(/*! features/add/builder */ "./lib/features/add/builder.ts"));\nexports["default"] = {\n    builder: builder_1.default,\n};\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/index.ts?'
        );

        /***/
      },

    /***/ './lib/features/add/locale/en.ts':
      /*!***************************************!*\
  !*** ./lib/features/add/locale/en.ts ***!
  \***************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    command: {\n        description: {\n            sns: 'add AWS SQS',\n            sqs: 'add AWS SQS',\n            basicAuthLambda: 'add AWS Basic lambda auth in us-east-1',\n            api: 'add graphql api',\n        },\n    },\n    unProcessed: 'The command entered does not exist. Run \"ragate add help\" for a list of all available commands.',\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/locale/en.ts?"
        );

        /***/
      },

    /***/ './lib/features/add/locale/ja.ts':
      /*!***************************************!*\
  !*** ./lib/features/add/locale/ja.ts ***!
  \***************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    command: {\n        description: {\n            sns: 'AWS SQS を追加',\n            sqs: 'AWS SQS を追加',\n            basicAuthLambda: 'us-east-1 リージョンに Basic 認証用の Lambda を追加',\n            api: 'Graphql API を追加',\n        },\n    },\n    unProcessed: '入力されたコマンドは存在しません。「ragate add help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/locale/ja.ts?"
        );

        /***/
      },

    /***/ './lib/features/add/utils/getLocale.ts':
      /*!*********************************************!*\
  !*** ./lib/features/add/utils/getLocale.ts ***!
  \*********************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.getLocaleLang = void 0;\nconst ja_1 = __importDefault(__webpack_require__(/*! features/add/locale/ja */ "./lib/features/add/locale/ja.ts"));\nconst en_1 = __importDefault(__webpack_require__(/*! features/add/locale/en */ "./lib/features/add/locale/en.ts"));\nconst getLocaleLang = (locale) => {\n    switch (locale) {\n        case \'ja\':\n            return ja_1.default;\n        case \'en\':\n            return en_1.default;\n        default:\n            return en_1.default;\n    }\n};\nexports.getLocaleLang = getLocaleLang;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/utils/getLocale.ts?'
        );

        /***/
      },

    /***/ './lib/features/create/builder.ts':
      /*!****************************************!*\
  !*** ./lib/features/create/builder.ts ***!
  \****************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst index_1 = __webpack_require__(/*! types/index */ "./lib/types/index.ts");\nconst yargonaut_1 = __webpack_require__(/*! utils/yargonaut */ "./lib/utils/yargonaut.ts");\nconst index_2 = __importDefault(__webpack_require__(/*! features/create/index */ "./lib/features/create/index.ts"));\nclass default_1 extends index_1.FeatureBuilderAbstract {\n    constructor(args) {\n        super(args);\n    }\n    build(yargs) {\n        return yargs\n            .version(false)\n            .usage(\'Usage: create <options>\')\n            .command(\'*\', yargonaut_1.chalk.grey(\'<command> <options>\'), () => ({}), (argv) => {\n            if (argv._.length === 1)\n                return new index_2.default.handler(argv).run();\n            throw new Error(\'locale.error.unProcessed\');\n        });\n    }\n}\nexports["default"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/create/builder.ts?'
        );

        /***/
      },

    /***/ './lib/features/create/handler.ts':
      /*!****************************************!*\
  !*** ./lib/features/create/handler.ts ***!
  \****************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst inquirer_1 = __importDefault(__webpack_require__(/*! inquirer */ "inquirer"));\nconst config_1 = __importDefault(__webpack_require__(/*! config */ "./lib/config.ts"));\nconst getLocale_1 = __webpack_require__(/*! features/create/utils/getLocale */ "./lib/features/create/utils/getLocale.ts");\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));\nconst inquirer_autocomplete_prompt_1 = __importDefault(__webpack_require__(/*! inquirer-autocomplete-prompt */ "inquirer-autocomplete-prompt"));\nconst cli_1 = __webpack_require__(/*! utils/cli */ "./lib/utils/cli.ts");\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ "./lib/utils/logger.ts"));\nconst index_1 = __webpack_require__(/*! types/index */ "./lib/types/index.ts");\nconst path_1 = __importDefault(__webpack_require__(/*! path */ "path"));\nclass default_1 extends index_1.FeatureHandlerAbstract {\n    constructor(argv) {\n        super(argv);\n        inquirer_1.default.registerPrompt(\'autocomplete\', inquirer_autocomplete_prompt_1.default);\n    }\n    async run() {\n        const { argv } = this;\n        const logger = logger_1.default.getLogger();\n        logger.debug(\'create hander : \', argv);\n        const locale = (0, getLocale_1.getLocaleLang)(this.lang);\n        const res = (await inquirer_1.default\n            .prompt([\n            {\n                type: \'autocomplete\',\n                name: \'template\',\n                emptyText: locale.inquirer.template.autocomplete.emptyText,\n                message: locale.inquirer.template.choiceTemplate,\n                source: (answersSoFar, input) => (lodash_1.default.isEmpty(input) ? config_1.default.templates : config_1.default.templates.filter((item) => item.name.includes(input))),\n            },\n            {\n                type: \'input\',\n                name: \'projectName\',\n                message: \'input a project name\',\n                default: (answers) => answers.template,\n                validate: (value) => {\n                    if (lodash_1.default.isEmpty(value))\n                        return \'required input a project name\';\n                    return true;\n                },\n            },\n        ])\n            .then((answers) => {\n            return answers;\n        }));\n        logger.debug(`input values : ${JSON.stringify(res)}}`);\n        const { template, projectName } = res;\n        logger.info(`template : ${template}`);\n        logger.info(`projectName : ${projectName}`);\n        logger.debug(`check exists directory : ${path_1.default.join(config_1.default.currentPath, projectName)}`);\n        if ((0, cli_1.isExistsDirectory)(path_1.default.join(config_1.default.currentPath, projectName))) {\n            throw new Error(`${locale.error.alreadyExistsDirectory} : ${path_1.default.join(config_1.default.currentPath, projectName)}`);\n        }\n        await (0, cli_1.gitClone)(config_1.default.repositoyUrl, config_1.default.tmpPath);\n        (0, cli_1.moveDirectory)(path_1.default.join(config_1.default.tmpPath, template), path_1.default.join(config_1.default.currentPath, projectName));\n    }\n}\nexports["default"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/create/handler.ts?'
        );

        /***/
      },

    /***/ './lib/features/create/index.ts':
      /*!**************************************!*\
  !*** ./lib/features/create/index.ts ***!
  \**************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst builder_1 = __importDefault(__webpack_require__(/*! features/create/builder */ "./lib/features/create/builder.ts"));\nconst handler_1 = __importDefault(__webpack_require__(/*! features/create/handler */ "./lib/features/create/handler.ts"));\nexports["default"] = {\n    builder: builder_1.default,\n    handler: handler_1.default,\n};\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/create/index.ts?'
        );

        /***/
      },

    /***/ './lib/features/create/locale/en.ts':
      /*!******************************************!*\
  !*** ./lib/features/create/locale/en.ts ***!
  \******************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    error: {\n        alreadyExistsDirectory: 'already exists directory',\n        unProcessed: 'The command entered does not exist. Run \"ragate create help\" for a list of all available commands.',\n    },\n    inquirer: {\n        template: {\n            choiceTemplate: 'Choose a project template',\n            autocomplete: {\n                emptyText: 'No result',\n            },\n        },\n    },\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/create/locale/en.ts?"
        );

        /***/
      },

    /***/ './lib/features/create/locale/ja.ts':
      /*!******************************************!*\
  !*** ./lib/features/create/locale/ja.ts ***!
  \******************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    error: {\n        alreadyExistsDirectory: '既にディレクトリが存在します',\n        unProcessed: '入力されたコマンドは存在しません。「ragate create help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',\n    },\n    inquirer: {\n        template: {\n            choiceTemplate: 'プロジェクトの雛形を選択してください。',\n            autocomplete: {\n                emptyText: '該当するテンプレートが見つかりません',\n            },\n        },\n    },\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/create/locale/ja.ts?"
        );

        /***/
      },

    /***/ './lib/features/create/utils/getLocale.ts':
      /*!************************************************!*\
  !*** ./lib/features/create/utils/getLocale.ts ***!
  \************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.getLocaleLang = void 0;\nconst ja_1 = __importDefault(__webpack_require__(/*! features/create/locale/ja */ "./lib/features/create/locale/ja.ts"));\nconst en_1 = __importDefault(__webpack_require__(/*! features/create/locale/en */ "./lib/features/create/locale/en.ts"));\nconst getLocaleLang = (locale) => {\n    switch (locale) {\n        case \'ja\':\n            return ja_1.default;\n        case \'en\':\n            return en_1.default;\n        default:\n            return en_1.default;\n    }\n};\nexports.getLocaleLang = getLocaleLang;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/create/utils/getLocale.ts?'
        );

        /***/
      },

    /***/ './lib/types/index.ts':
      /*!****************************!*\
  !*** ./lib/types/index.ts ***!
  \****************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          "\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.awsRegions = exports.FeatureBuilderAbstract = exports.FeatureHandlerAbstract = void 0;\nconst config_1 = __importDefault(__webpack_require__(/*! config */ \"./lib/config.ts\"));\nconst yargonaut_1 = __webpack_require__(/*! utils/yargonaut */ \"./lib/utils/yargonaut.ts\");\nclass FeatureHandlerAbstract {\n    _argv;\n    _lang;\n    constructor(argv) {\n        this._argv = argv;\n        this._lang = argv.lang;\n    }\n    get argv() {\n        return this._argv;\n    }\n    get lang() {\n        return this._lang;\n    }\n}\nexports.FeatureHandlerAbstract = FeatureHandlerAbstract;\nclass FeatureBuilderAbstract {\n    _args;\n    _npmVersion;\n    _chalk;\n    constructor(args) {\n        this._chalk = yargonaut_1.chalk;\n        this._args = args;\n        this._npmVersion = config_1.default.npmVersion;\n    }\n    get args() {\n        return this._args;\n    }\n    get npmVersion() {\n        return this._npmVersion;\n    }\n    get chalk() {\n        return this._chalk;\n    }\n}\nexports.FeatureBuilderAbstract = FeatureBuilderAbstract;\nexports.awsRegions = [\n    'us-east-2',\n    'us-east-1',\n    'us-west-1',\n    'us-west-2',\n    'af-south-1',\n    'ap-east-1',\n    'ap-south-2',\n    'ap-southeast-3',\n    'ap-southeast-4',\n    'ap-south-1',\n    'ap-northeast-3',\n    'ap-northeast-2',\n    'ap-southeast-1',\n    'ap-southeast-2',\n    'ap-northeast-1',\n    'ca-central-1',\n    'eu-central-1',\n    'eu-west-1',\n    'eu-west-2',\n    'eu-south-1',\n    'eu-west-3',\n    'eu-south-2',\n    'eu-north-1',\n    'eu-central-2',\n    'me-south-1',\n    'me-central-1',\n    'sa-east-1',\n    'us-gov-east-1',\n    'us-gov-west-1',\n];\n\n\n//# sourceURL=webpack://ragate-cli/./lib/types/index.ts?"
        );

        /***/
      },

    /***/ './lib/utils/cli.ts':
      /*!**************************!*\
  !*** ./lib/utils/cli.ts ***!
  \**************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.asFullPath = exports.createDirectories = exports.isFileExists = exports.isExistsDirectory = exports.cleanUpTmpDirectory = exports.moveDirectory = exports.gitClone = void 0;\nconst index_1 = __webpack_require__(/*! exceptions/index */ "./lib/exceptions/index.ts");\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ "./lib/utils/logger.ts"));\nconst fs_extra_1 = __importDefault(__webpack_require__(/*! fs-extra */ "fs-extra"));\nconst config_1 = __importDefault(__webpack_require__(/*! config */ "./lib/config.ts"));\nconst isomorphic_git_1 = __importDefault(__webpack_require__(/*! isomorphic-git */ "isomorphic-git"));\nconst node_1 = __importDefault(__webpack_require__(/*! isomorphic-git/http/node */ "isomorphic-git/http/node"));\nconst path_1 = __importDefault(__webpack_require__(/*! path */ "path"));\nasync function gitClone(repositoryUrl, destinationPath) {\n    const logger = logger_1.default.getLogger();\n    try {\n        logger.debug(`git clone : ${repositoryUrl} -> ${destinationPath}`);\n        await fs_extra_1.default.promises.mkdir(destinationPath, { recursive: true });\n        await isomorphic_git_1.default.clone({\n            fs: fs_extra_1.default,\n            http: node_1.default,\n            dir: destinationPath,\n            url: repositoryUrl,\n            singleBranch: true,\n            depth: 1,\n        });\n    }\n    catch (error) {\n        const err = error;\n        throw new index_1.CLIError(err.message);\n    }\n}\nexports.gitClone = gitClone;\nfunction moveDirectory(sourcePath, destinationPath) {\n    const logger = logger_1.default.getLogger();\n    try {\n        logger.debug(`move : ${sourcePath} -> ${destinationPath}`);\n        fs_extra_1.default.renameSync(sourcePath, destinationPath);\n    }\n    catch (error) {\n        const err = error;\n        throw new index_1.CLIError(err.message);\n    }\n}\nexports.moveDirectory = moveDirectory;\nfunction cleanUpTmpDirectory() {\n    const logger = logger_1.default.getLogger();\n    try {\n        logger.debug(`clean up tmp directory : ${config_1.default.tmpPath}`);\n        fs_extra_1.default.removeSync(config_1.default.tmpPath);\n        logger.debug(`create tmp directory : ${config_1.default.tmpPath}`);\n        fs_extra_1.default.mkdirSync(config_1.default.tmpPath, { recursive: true });\n    }\n    catch (error) {\n        const err = error;\n        throw new index_1.CLIError(err.message);\n    }\n}\nexports.cleanUpTmpDirectory = cleanUpTmpDirectory;\nfunction isExistsDirectory(directoryPath) {\n    const logger = logger_1.default.getLogger();\n    try {\n        logger.debug(`check exists directory : ${directoryPath}`);\n        const stats = fs_extra_1.default.statSync(directoryPath);\n        return stats.isDirectory();\n    }\n    catch (error) {\n        if (error.code === \'ENOENT\') {\n            return false;\n        }\n        else {\n            throw error;\n        }\n    }\n}\nexports.isExistsDirectory = isExistsDirectory;\nfunction isFileExists(filePath) {\n    try {\n        fs_extra_1.default.accessSync(filePath);\n        return true;\n    }\n    catch (error) {\n        return false;\n    }\n}\nexports.isFileExists = isFileExists;\nconst createDirectories = (filePath) => {\n    const directories = filePath.split(path_1.default.sep).slice(0, -1);\n    directories.reduce((currentPath, directory) => {\n        currentPath = path_1.default.join(currentPath, directory);\n        if (!fs_extra_1.default.existsSync(currentPath)) {\n            fs_extra_1.default.mkdirSync(currentPath);\n        }\n        return currentPath;\n    }, \'\');\n};\nexports.createDirectories = createDirectories;\nconst asFullPath = (destinationPath) => path_1.default.join(config_1.default.currentPath, destinationPath);\nexports.asFullPath = asFullPath;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/cli.ts?'
        );

        /***/
      },

    /***/ './lib/utils/code/index.ts':
      /*!*********************************!*\
  !*** ./lib/utils/code/index.ts ***!
  \*********************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst parser_1 = __importDefault(__webpack_require__(/*! utils/parser */ "./lib/utils/parser.ts"));\nconst templates_1 = __importDefault(__webpack_require__(/*! lib/utils/code/templates */ "./lib/utils/code/templates/index.ts"));\nconst cli_1 = __webpack_require__(/*! utils/cli */ "./lib/utils/cli.ts");\nconst fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ "./lib/utils/logger.ts"));\nclass Code {\n    static get templates() {\n        return templates_1.default;\n    }\n    constructor(args) {\n        this.handlerPath = args.handlerPath;\n        const [directories, handlerName] = parser_1.default.parseLambdaHandlerPath(args.handlerPath);\n        this.destinationPath = directories.join(\'/\') + \'/\';\n        this.handlerName = parser_1.default.extractFilename(handlerName);\n        this.code = args.code;\n        this.logger = logger_1.default.getLogger();\n    }\n    handlerPath;\n    destinationPath;\n    handlerName;\n    code;\n    logger;\n    write() {\n        const destination = `${(0, cli_1.asFullPath)(this.destinationPath)}${this.handlerName}.ts`;\n        if ((0, cli_1.isFileExists)(destination)) {\n            this.logger.info(`already exists file, skip write : ${destination}`);\n            return;\n        }\n        (0, cli_1.createDirectories)(this.destinationPath);\n        this.logger.info(`create directories : ${this.handlerPath}`);\n        fs_1.default.writeFileSync(destination, this.code, \'utf8\');\n        this.logger.info(`write : ${destination}`);\n        this.logger.debug(this.code);\n    }\n}\nexports["default"] = Code;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/code/index.ts?'
        );

        /***/
      },

    /***/ './lib/utils/code/templates/basicauthlambda/index.ts':
      /*!***********************************************************!*\
  !*** ./lib/utils/code/templates/basicauthlambda/index.ts ***!
  \***********************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = `import { Context, CloudFrontRequest, Callback, CloudFrontRequestEvent, CloudFrontResultResponse } from 'aws-lambda';\n\nexport const handler = (event: CloudFrontRequestEvent, _context: Context, callback: Callback): void => {\n  const request: CloudFrontRequest = event.Records[0].cf.request;\n  const headers = request.headers;\n\n  const authUser = 'ragate'; // Basic認証のユーザー名\n  const authPass = '20210525'; // Basic認証のパスワード\n\n  const authString = 'Basic ' + Buffer.from(authUser + ':' + authPass).toString('base64');\n  if (typeof headers.authorization === 'undefined' || headers.authorization[0].value !== authString) {\n    const body = 'Unauthorized';\n    const response: CloudFrontResultResponse = {\n      status: '401',\n      statusDescription: 'Unauthorized',\n      body: body,\n      headers: {\n        'www-authenticate': [{ key: 'WWW-Authenticate', value: 'Basic' }],\n      },\n    };\n    callback(null, response);\n  }\n  callback(null, request);\n};\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/code/templates/basicauthlambda/index.ts?"
        );

        /***/
      },

    /***/ './lib/utils/code/templates/index.ts':
      /*!*******************************************!*\
  !*** ./lib/utils/code/templates/index.ts ***!
  \*******************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst basicauthlambda_1 = __importDefault(__webpack_require__(/*! lib/utils/code/templates/basicauthlambda */ "./lib/utils/code/templates/basicauthlambda/index.ts"));\nexports["default"] = {\n    basicauthlambda: basicauthlambda_1.default,\n};\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/code/templates/index.ts?'
        );

        /***/
      },

    /***/ './lib/utils/graphql/analyzer.ts':
      /*!***************************************!*\
  !*** ./lib/utils/graphql/analyzer.ts ***!
  \***************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst graphql_compose_1 = __webpack_require__(/*! graphql-compose */ "graphql-compose");\nconst schema_1 = __webpack_require__(/*! @graphql-tools/schema */ "@graphql-tools/schema");\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));\n/**\n * Parsing existing Graphql syntax\n */\nclass Graphql {\n    constructor(scheme) {\n        this._scheme = scheme;\n        this._schemaComposer = lodash_1.default.isEmpty(scheme) ? [new graphql_compose_1.SchemaComposer()] : scheme.map((s) => new graphql_compose_1.SchemaComposer(s));\n        this._mergedSchema = (0, schema_1.mergeSchemas)({ schemas: this._schemaComposer.map((s) => s.buildSchema()) });\n        this._mutations = this._schemaComposer.map((s) => s.getOTC(\'Mutation\').getFields());\n        this._queries = this._schemaComposer.map((s) => s.getOTC(\'Query\').getFields());\n        this._subscriptions = this._schemaComposer.map((s) => s.getOTC(\'Subscription\').getFields());\n    }\n    _mutations;\n    get mutations() {\n        return this._mutations;\n    }\n    _queries;\n    get queries() {\n        return this._queries;\n    }\n    _subscriptions;\n    get subscriptions() {\n        return this._subscriptions;\n    }\n    _scheme;\n    get scheme() {\n        return this._scheme;\n    }\n    _schemaComposer;\n    get schemaComposer() {\n        return this._schemaComposer;\n    }\n    _mergedSchema;\n    get mergedSchema() {\n        return this._mergedSchema;\n    }\n    isExistsMutationApi(apiName) {\n        return lodash_1.default.some(this.mutations, (s) => lodash_1.default.has(s, apiName));\n    }\n    isExistsQueryApi(apiName) {\n        return lodash_1.default.some(this.queries, (s) => lodash_1.default.has(s, apiName));\n    }\n    isExistsSubscriptionApi(apiName) {\n        return lodash_1.default.some(this.subscriptions, (s) => lodash_1.default.has(s, apiName));\n    }\n}\nexports["default"] = Graphql;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/graphql/analyzer.ts?'
        );

        /***/
      },

    /***/ './lib/utils/inquirer/filter.ts':
      /*!**************************************!*\
  !*** ./lib/utils/inquirer/filter.ts ***!
  \**************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));\nclass Filter {\n    constructor(input) {\n        this.input = input;\n    }\n    input;\n    filters = [];\n    filePath = () => {\n        if (lodash_1.default.isString(this.input)) {\n            this.filters.push((value) => {\n                return value.replace(/\\s+/g, \'\');\n            });\n        }\n        return this;\n    };\n    removeAllSpace = () => {\n        if (lodash_1.default.isString(this.input)) {\n            this.filters.push((value) => {\n                return value.replace(/\\s+/g, \'\');\n            });\n        }\n        return this;\n    };\n    value() {\n        if (lodash_1.default.isEmpty(this.filters))\n            return this.input;\n        return lodash_1.default.reduce(this.filters, (result, filter) => {\n            return filter(result);\n        }, this.input);\n    }\n}\nexports["default"] = Filter;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/inquirer/filter.ts?'
        );

        /***/
      },

    /***/ './lib/utils/inquirer/transformer.ts':
      /*!*******************************************!*\
  !*** ./lib/utils/inquirer/transformer.ts ***!
  \*******************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));\nclass Transformer {\n    constructor(input) {\n        this.input = input;\n    }\n    input;\n    transforms = [];\n    filePath = () => {\n        if (lodash_1.default.isString(this.input)) {\n            this.transforms.push((value) => {\n                return value.replace(/\\s+/g, \'\');\n            });\n        }\n        return this;\n    };\n    removeAllSpace = () => {\n        if (lodash_1.default.isString(this.input)) {\n            this.transforms.push((value) => {\n                return value.replace(/\\s+/g, \'\');\n            });\n        }\n        return this;\n    };\n    value() {\n        if (lodash_1.default.isEmpty(this.transforms))\n            return this.input;\n        return lodash_1.default.reduce(this.transforms, (result, filter) => {\n            return filter(result);\n        }, this.input);\n    }\n}\nexports["default"] = Transformer;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/inquirer/transformer.ts?'
        );

        /***/
      },

    /***/ './lib/utils/logger.ts':
      /*!*****************************!*\
  !*** ./lib/utils/logger.ts ***!
  \*****************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          "\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst pino_1 = __importDefault(__webpack_require__(/*! pino */ \"pino\"));\nconst pino_pretty_1 = __importDefault(__webpack_require__(/*! pino-pretty */ \"./node_modules/pino-pretty/index.js\"));\nconst yargonaut_1 = __webpack_require__(/*! utils/yargonaut */ \"./lib/utils/yargonaut.ts\");\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nconst stream = (0, pino_pretty_1.default)({\n    colorize: true,\n    messageFormat: (log, messageKey) => {\n        const adjust = (msg) => {\n            if (log.level === 30)\n                return yargonaut_1.chalk.white(msg);\n            if (log.level < 30)\n                return yargonaut_1.chalk.grey(msg);\n            if (log.level === 40)\n                return yargonaut_1.chalk.yellow(msg);\n            if (log.level >= 50)\n                return yargonaut_1.chalk.red(msg);\n            return msg;\n        };\n        const message = log[messageKey];\n        if (lodash_1.default.isEmpty(message)) {\n            return lodash_1.default.chain(log)\n                .omit(['level', 'time', 'pid', 'hostname'])\n                .thru((v) => JSON.stringify(v, null, 2))\n                .thru((v) => adjust(v))\n                .value();\n        }\n        if (log.requestId)\n            return `[${log.requestId}] ${adjust(message)}`;\n        return adjust(message);\n    },\n    timestampKey: 'time',\n    ignore: 'pid,hostname',\n    include: 'level,time',\n    singleLine: false,\n    translateTime: 'yyyy-mm-dd HH:MM:ss',\n    sync: true, // by default we write asynchronously\n});\nclass default_1 {\n    constructor() {\n        throw new Error('singleton cannot be instantiated');\n    }\n    static logger;\n    static getLogger(logLevel) {\n        if (logLevel) {\n            this.logger = (0, pino_1.default)({\n                level: logLevel ?? 'info',\n            }, stream);\n            return this.logger;\n        }\n        if (this.logger)\n            return this.logger;\n        this.logger = (0, pino_1.default)({\n            level: logLevel ?? 'info',\n        }, stream);\n        return this.logger;\n    }\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/logger.ts?"
        );

        /***/
      },

    /***/ './lib/utils/parser.ts':
      /*!*****************************!*\
  !*** ./lib/utils/parser.ts ***!
  \*****************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst yaml_1 = __webpack_require__(/*! utils/yaml */ "./lib/utils/yaml.ts");\nconst analyzer_1 = __importDefault(__webpack_require__(/*! utils/graphql/analyzer */ "./lib/utils/graphql/analyzer.ts"));\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));\nconst fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));\nconst path_1 = __importDefault(__webpack_require__(/*! path */ "path"));\nconst config_1 = __importDefault(__webpack_require__(/*! config */ "./lib/config.ts"));\nclass default_1 {\n    static parseLambdaHandlerPath(input) {\n        const parts = input.split(\'/\');\n        const path = parts.slice(0, -1);\n        const filename = parts[parts.length - 1];\n        return [path.length > 0 ? path : [], filename];\n    }\n    static parseSlsRecursivelyReference = (str) => {\n        if (lodash_1.default.isEmpty(str))\n            return undefined;\n        const regex = /\\${file\\((.*?)\\)}/;\n        const match = str.match(regex);\n        if (match) {\n            const pathInfo = match[1];\n            return pathInfo;\n        }\n    };\n    static extractFilename(input) {\n        const filename = input.split(\'.\')[0];\n        return filename;\n    }\n    static parseAppSyncStack(appSyncStackPath) {\n        const { schema, dataSources, mappingTemplates, mappingTemplatesLocation, functionConfigurationsLocation, functionConfigurations } = (0, yaml_1.loadYaml)(path_1.default.join(config_1.default.currentPath, appSyncStackPath));\n        return {\n            mappingTemplatesLocation,\n            functionConfigurationsLocation,\n            functionConfigurations: lodash_1.default.chain(functionConfigurations)\n                .map((p) => (0, yaml_1.loadYaml)(this.parseSlsRecursivelyReference(path_1.default.join(config_1.default.currentPath, p))))\n                .flatten()\n                .value(),\n            dataSources: lodash_1.default.chain(dataSources)\n                .map((p) => (0, yaml_1.loadYaml)(this.parseSlsRecursivelyReference(path_1.default.join(config_1.default.currentPath, p))))\n                .flatten()\n                .value(),\n            mappingTemplates: lodash_1.default.chain(mappingTemplates)\n                .map((p) => (0, yaml_1.loadYaml)(this.parseSlsRecursivelyReference(path_1.default.join(config_1.default.currentPath, p))))\n                .flatten()\n                .value(),\n            schema: lodash_1.default.chain(schema)\n                .thru((value) => {\n                if (lodash_1.default.isString(value) && !lodash_1.default.isEmpty(value)) {\n                    const _schemaPath = this.parseSlsRecursivelyReference(value);\n                    const _schema = fs_1.default.readFileSync(path_1.default.join(config_1.default.currentPath, _schemaPath), \'utf8\');\n                    if (lodash_1.default.isEmpty(_schema))\n                        return [];\n                    return [_schema];\n                }\n                if (lodash_1.default.isArray(value) && !lodash_1.default.isEmpty(value)) {\n                    return value\n                        .map((v) => {\n                        const _schemaPath = this.parseSlsRecursivelyReference(v);\n                        const _schema = fs_1.default.readFileSync(path_1.default.join(config_1.default.currentPath, _schemaPath), \'utf8\');\n                        if (lodash_1.default.isEmpty(_schema))\n                            return \'\';\n                        return _schema;\n                    })\n                        .filter((v) => !lodash_1.default.isEmpty(v));\n                }\n                return [];\n            })\n                .thru((schemas) => new analyzer_1.default(schemas))\n                .value(),\n        };\n    }\n}\nexports["default"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/parser.ts?'
        );

        /***/
      },

    /***/ './lib/utils/validator/index.ts':
      /*!**************************************!*\
  !*** ./lib/utils/validator/index.ts ***!
  \**************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));\nconst getLocale_1 = __webpack_require__(/*! utils/validator/utils/getLocale */ "./lib/utils/validator/utils/getLocale.ts");\nclass Validator {\n    constructor(input, lang) {\n        this._input = input;\n        this._lang = lang;\n        this._locale = (0, getLocale_1.getLocaleLang)(this._lang);\n    }\n    _input;\n    _lang;\n    _locale;\n    validations = [];\n    get locale() {\n        return this._locale;\n    }\n    get input() {\n        return this._input;\n    }\n    required = () => {\n        this.validations.push(() => {\n            if (lodash_1.default.isUndefined(this.input) || lodash_1.default.isNull(this.input))\n                return this.locale.required;\n            if (lodash_1.default.isString(this.input) && lodash_1.default.isEmpty(this.input))\n                return this.locale.required;\n            return true;\n        });\n        return this;\n    };\n    mustNoIncludeZenkaku = () => {\n        this.validations.push(() => {\n            if (!lodash_1.default.isString(this.input))\n                return true;\n            // eslint-disable-next-line no-control-regex\n            const containsFullWidthCharacter = /[^\\x01-\\x7E]/.test(this.input.toString());\n            if (containsFullWidthCharacter)\n                return this.locale.mustNoIncludeZenkaku;\n            return true;\n        });\n        return this;\n    };\n    mustBeYamlFilePath = () => {\n        this.validations.push(() => {\n            if (!lodash_1.default.isString(this.input))\n                return true;\n            if (!this.input.endsWith(\'.yml\') && !this.input.endsWith(\'.yaml\'))\n                return this.locale.mustBeYamlFilePath;\n            return true;\n        });\n        return this;\n    };\n    mustBeExtension = () => {\n        this.validations.push(() => {\n            const pattern = /\\.[^.]*$/;\n            if (!lodash_1.default.isString(this.input))\n                return true;\n            if (!pattern.test(this.input))\n                return this.locale.mustBeExtension;\n            return true;\n        });\n        return this;\n    };\n    value() {\n        for (let i = 0; i < this.validations.length; i++) {\n            const result = this.validations[i]();\n            if (lodash_1.default.isString(result))\n                return result;\n        }\n        return true;\n    }\n}\nexports["default"] = Validator;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/validator/index.ts?'
        );

        /***/
      },

    /***/ './lib/utils/validator/locale/en.ts':
      /*!******************************************!*\
  !*** ./lib/utils/validator/locale/en.ts ***!
  \******************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    mustBeYamlFilePath: 'input a yaml file path',\n    mustNoIncludeZenkaku: 'must no include zenkaku',\n    mustBeExtension: 'must be extension',\n    required: 'required input',\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/validator/locale/en.ts?"
        );

        /***/
      },

    /***/ './lib/utils/validator/locale/ja.ts':
      /*!******************************************!*\
  !*** ./lib/utils/validator/locale/ja.ts ***!
  \******************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    mustBeYamlFilePath: 'Yamlファイルを指定して下さい',\n    mustNoIncludeZenkaku: '全角を含めないでください',\n    mustBeExtension: '文字列の最後は「.＋文字列」を入力して下さい',\n    required: '入力必須',\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/validator/locale/ja.ts?"
        );

        /***/
      },

    /***/ './lib/utils/validator/utils/getLocale.ts':
      /*!************************************************!*\
  !*** ./lib/utils/validator/utils/getLocale.ts ***!
  \************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.getLocaleLang = void 0;\nconst ja_1 = __importDefault(__webpack_require__(/*! utils/validator/locale/ja */ "./lib/utils/validator/locale/ja.ts"));\nconst en_1 = __importDefault(__webpack_require__(/*! utils/validator/locale/en */ "./lib/utils/validator/locale/en.ts"));\nconst getLocaleLang = (locale) => {\n    switch (locale) {\n        case \'ja\':\n            return ja_1.default;\n        case \'en\':\n            return en_1.default;\n        default:\n            return en_1.default;\n    }\n};\nexports.getLocaleLang = getLocaleLang;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/validator/utils/getLocale.ts?'
        );

        /***/
      },

    /***/ './lib/utils/yaml.ts':
      /*!***************************!*\
  !*** ./lib/utils/yaml.ts ***!
  \***************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          "\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.generateFunctionYamlProperty = exports.generateServerlessConfig = exports.generateCloudFormation = exports.writeServerlessConfig = exports.loadYaml = exports.writeYaml = void 0;\nconst fs_1 = __importDefault(__webpack_require__(/*! fs */ \"fs\"));\nconst path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ \"./lib/utils/logger.ts\"));\nconst js_yaml_1 = __importDefault(__webpack_require__(/*! js-yaml */ \"js-yaml\"));\nconst yaml_cfn_1 = __webpack_require__(/*! yaml-cfn */ \"yaml-cfn\");\nconst yargonaut_1 = __webpack_require__(/*! yargonaut */ \"yargonaut\");\nconst core_1 = __webpack_require__(/*! @aws-cdk/core */ \"@aws-cdk/core\");\nconst assert_1 = __webpack_require__(/*! @aws-cdk/assert */ \"@aws-cdk/assert\");\nconst cli_1 = __webpack_require__(/*! utils/cli */ \"./lib/utils/cli.ts\");\nconst writeYaml = (destinationPath, data) => {\n    const yamlText = js_yaml_1.default.dump(data, { schema: yaml_cfn_1.schema, indent: 2, lineWidth: -1 });\n    (0, cli_1.createDirectories)(destinationPath);\n    fs_1.default.writeFileSync((0, cli_1.asFullPath)(destinationPath), yamlText, 'utf8');\n    return yamlText;\n};\nexports.writeYaml = writeYaml;\nconst loadYaml = (sourcePath) => {\n    return js_yaml_1.default.load(fs_1.default.readFileSync((0, cli_1.asFullPath)(sourcePath), 'utf8'), { schema: yaml_cfn_1.schema });\n};\nexports.loadYaml = loadYaml;\nconst writeServerlessConfig = (args) => {\n    const { serverlessConfigPath, resourceFilePath } = args;\n    const logger = logger_1.default.getLogger();\n    const destinationPath = path_1.default.join('./', resourceFilePath);\n    try {\n        const doc = (0, exports.loadYaml)(serverlessConfigPath) ?? {};\n        const resources = doc.resources ?? [];\n        if (resources.some((v) => v.includes(destinationPath))) {\n            logger.debug(`already exists resource file path : ${destinationPath}`);\n            return;\n        }\n        resources.push(`\\${file(./${destinationPath})}`);\n        const yamlText = (0, exports.writeYaml)(serverlessConfigPath, {\n            ...doc,\n            resources,\n        });\n        logger.info(destinationPath);\n        logger.info((0, yargonaut_1.chalk)().green(yamlText));\n    }\n    catch (e) {\n        logger.debug(e);\n        logger.warn('not found serverless config file, skip update');\n        logger.warn(`please check a input path : ${serverlessConfigPath}`);\n    }\n};\nexports.writeServerlessConfig = writeServerlessConfig;\nconst generateCloudFormation = (resourceName, resource) => {\n    class DevStack extends core_1.Stack {\n        constructor(scope, id, props) {\n            super(scope, id, props);\n            const res = resource(this);\n            const cfn = res.node.defaultChild;\n            cfn.overrideLogicalId(resourceName);\n        }\n    }\n    const logger = logger_1.default.getLogger();\n    const stack = new DevStack(new core_1.App(), 'ragate');\n    // Convert to CloudFormation template\n    // eslint-disable-next-line @typescript-eslint/ban-ts-comment\n    // @ts-ignore\n    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment\n    const cfn = assert_1.SynthUtils.toCloudFormation(stack);\n    logger.debug('generated cloudFormation template:');\n    logger.debug(cfn);\n    return cfn.Resources;\n};\nexports.generateCloudFormation = generateCloudFormation;\nconst generateServerlessConfig = (config) => {\n    return {\n        service: config?.service ?? 'starter',\n        useDotenv: config?.useDotenv ?? true,\n        provider: {\n            name: config?.provider?.name ?? 'aws',\n            runtime: config?.provider?.runtime ?? 'nodejs18.x',\n            stage: config?.provider?.stage ?? '${opt:stage}',\n            region: config?.provider?.region ?? 'ap-northeast-1',\n            iam: {\n                role: config?.provider?.iam?.role ?? 'DefaultLambdaRole',\n            },\n            environment: {\n                STAGE: config?.provider?.environment?.STAGE ?? '${self:provider.stage}',\n                REGION: config?.provider?.environment?.REGION ?? '${self:provider.region}',\n                AWS_RESOURCE_PRIFIX: config?.provider?.environment?.AWS_RESOURCE_PRIFIX ?? '${self:custom.awsResourcePrefix}',\n                LOG_LEVEL: config?.provider?.environment?.LOG_LEVEL ?? 'INFO',\n            },\n        },\n        plugins: config?.plugins ?? ['serverless-webpack', 'serverless-prune-plugin'],\n        functions: config?.functions ?? '${file(./serverless/ap-northeast-1/resources/functions.yml)}',\n        resources: config?.resources ?? [],\n        package: {\n            individually: config?.package?.individually ?? true,\n            includeModules: config?.package?.includeModules ?? true,\n            patterns: config?.package?.patterns ?? ['!appsync/*,*', '!node_modules/**', '!resources/**', '!__tests__/**', '!.git/**', '!tmp/**'],\n        },\n        custom: {\n            awsResourcePrefix: config?.custom?.awsResourcePrefix ?? '${self:service}-${self:provider.stage}-',\n            webpack: config?.custom?.webpack ?? {\n                includeModules: true,\n                packager: 'npm',\n            },\n            prune: config?.custom?.prune ?? {\n                automatic: true,\n                number: 3,\n            },\n        },\n    };\n};\nexports.generateServerlessConfig = generateServerlessConfig;\nconst generateFunctionYamlProperty = (resourceName, input) => {\n    return {\n        [resourceName]: {\n            handler: input?.handler ?? 'handler.handler',\n            name: input?.name ?? resourceName,\n            memorySize: input?.memorySize ?? 512,\n            timeout: input?.timeout ?? 10,\n        },\n    };\n};\nexports.generateFunctionYamlProperty = generateFunctionYamlProperty;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/yaml.ts?"
        );

        /***/
      },

    /***/ './lib/utils/yargonaut.ts':
      /*!********************************!*\
  !*** ./lib/utils/yargonaut.ts ***!
  \********************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.chalk = exports.init = void 0;\nconst yargonaut_1 = __importDefault(__webpack_require__(/*! yargonaut */ "yargonaut"));\nconst init = () => yargonaut_1.default.font(\'SansSerif\').helpStyle(\'grey\').errorsStyle(\'red\');\nexports.init = init;\nexports.chalk = yargonaut_1.default.chalk();\n// const listFonts = (): string[] => {\n//   return yargonaut.listFonts();\n// };\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/yargonaut.ts?'
        );

        /***/
      },

    /***/ '@aws-cdk/assert':
      /*!**********************************!*\
  !*** external "@aws-cdk/assert" ***!
  \**********************************/
      /***/ (module) => {
        module.exports = require('@aws-cdk/assert');

        /***/
      },

    /***/ '@aws-cdk/aws-iam':
      /*!***********************************!*\
  !*** external "@aws-cdk/aws-iam" ***!
  \***********************************/
      /***/ (module) => {
        module.exports = require('@aws-cdk/aws-iam');

        /***/
      },

    /***/ '@aws-cdk/aws-lambda':
      /*!**************************************!*\
  !*** external "@aws-cdk/aws-lambda" ***!
  \**************************************/
      /***/ (module) => {
        module.exports = require('@aws-cdk/aws-lambda');

        /***/
      },

    /***/ '@aws-cdk/aws-sns':
      /*!***********************************!*\
  !*** external "@aws-cdk/aws-sns" ***!
  \***********************************/
      /***/ (module) => {
        module.exports = require('@aws-cdk/aws-sns');

        /***/
      },

    /***/ '@aws-cdk/aws-sns-subscriptions':
      /*!*************************************************!*\
  !*** external "@aws-cdk/aws-sns-subscriptions" ***!
  \*************************************************/
      /***/ (module) => {
        module.exports = require('@aws-cdk/aws-sns-subscriptions');

        /***/
      },

    /***/ '@aws-cdk/aws-sqs':
      /*!***********************************!*\
  !*** external "@aws-cdk/aws-sqs" ***!
  \***********************************/
      /***/ (module) => {
        module.exports = require('@aws-cdk/aws-sqs');

        /***/
      },

    /***/ '@aws-cdk/core':
      /*!********************************!*\
  !*** external "@aws-cdk/core" ***!
  \********************************/
      /***/ (module) => {
        module.exports = require('@aws-cdk/core');

        /***/
      },

    /***/ '@graphql-tools/schema':
      /*!****************************************!*\
  !*** external "@graphql-tools/schema" ***!
  \****************************************/
      /***/ (module) => {
        module.exports = require('@graphql-tools/schema');

        /***/
      },

    /***/ 'aws-cdk-lib':
      /*!******************************!*\
  !*** external "aws-cdk-lib" ***!
  \******************************/
      /***/ (module) => {
        module.exports = require('aws-cdk-lib');

        /***/
      },

    /***/ colorette:
      /*!****************************!*\
  !*** external "colorette" ***!
  \****************************/
      /***/ (module) => {
        module.exports = require('colorette');

        /***/
      },

    /***/ dateformat:
      /*!*****************************!*\
  !*** external "dateformat" ***!
  \*****************************/
      /***/ (module) => {
        module.exports = require('dateformat');

        /***/
      },

    /***/ 'fast-copy':
      /*!****************************!*\
  !*** external "fast-copy" ***!
  \****************************/
      /***/ (module) => {
        module.exports = require('fast-copy');

        /***/
      },

    /***/ 'fast-safe-stringify':
      /*!**************************************!*\
  !*** external "fast-safe-stringify" ***!
  \**************************************/
      /***/ (module) => {
        module.exports = require('fast-safe-stringify');

        /***/
      },

    /***/ 'fs-extra':
      /*!***************************!*\
  !*** external "fs-extra" ***!
  \***************************/
      /***/ (module) => {
        module.exports = require('fs-extra');

        /***/
      },

    /***/ 'graphql-compose':
      /*!**********************************!*\
  !*** external "graphql-compose" ***!
  \**********************************/
      /***/ (module) => {
        module.exports = require('graphql-compose');

        /***/
      },

    /***/ inquirer:
      /*!***************************!*\
  !*** external "inquirer" ***!
  \***************************/
      /***/ (module) => {
        module.exports = require('inquirer');

        /***/
      },

    /***/ 'inquirer-autocomplete-prompt':
      /*!***********************************************!*\
  !*** external "inquirer-autocomplete-prompt" ***!
  \***********************************************/
      /***/ (module) => {
        module.exports = require('inquirer-autocomplete-prompt');

        /***/
      },

    /***/ 'isomorphic-git':
      /*!*********************************!*\
  !*** external "isomorphic-git" ***!
  \*********************************/
      /***/ (module) => {
        module.exports = require('isomorphic-git');

        /***/
      },

    /***/ 'isomorphic-git/http/node':
      /*!*******************************************!*\
  !*** external "isomorphic-git/http/node" ***!
  \*******************************************/
      /***/ (module) => {
        module.exports = require('isomorphic-git/http/node');

        /***/
      },

    /***/ 'js-yaml':
      /*!**************************!*\
  !*** external "js-yaml" ***!
  \**************************/
      /***/ (module) => {
        module.exports = require('js-yaml');

        /***/
      },

    /***/ lodash:
      /*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
      /***/ (module) => {
        module.exports = require('lodash');

        /***/
      },

    /***/ 'on-exit-leak-free':
      /*!************************************!*\
  !*** external "on-exit-leak-free" ***!
  \************************************/
      /***/ (module) => {
        module.exports = require('on-exit-leak-free');

        /***/
      },

    /***/ pino:
      /*!***********************!*\
  !*** external "pino" ***!
  \***********************/
      /***/ (module) => {
        module.exports = require('pino');

        /***/
      },

    /***/ 'pino-abstract-transport':
      /*!******************************************!*\
  !*** external "pino-abstract-transport" ***!
  \******************************************/
      /***/ (module) => {
        module.exports = require('pino-abstract-transport');

        /***/
      },

    /***/ pump:
      /*!***********************!*\
  !*** external "pump" ***!
  \***********************/
      /***/ (module) => {
        module.exports = require('pump');

        /***/
      },

    /***/ 'readable-stream':
      /*!**********************************!*\
  !*** external "readable-stream" ***!
  \**********************************/
      /***/ (module) => {
        module.exports = require('readable-stream');

        /***/
      },

    /***/ 'secure-json-parse':
      /*!************************************!*\
  !*** external "secure-json-parse" ***!
  \************************************/
      /***/ (module) => {
        module.exports = require('secure-json-parse');

        /***/
      },

    /***/ 'sonic-boom':
      /*!*****************************!*\
  !*** external "sonic-boom" ***!
  \*****************************/
      /***/ (module) => {
        module.exports = require('sonic-boom');

        /***/
      },

    /***/ 'yaml-cfn':
      /*!***************************!*\
  !*** external "yaml-cfn" ***!
  \***************************/
      /***/ (module) => {
        module.exports = require('yaml-cfn');

        /***/
      },

    /***/ yargonaut:
      /*!****************************!*\
  !*** external "yargonaut" ***!
  \****************************/
      /***/ (module) => {
        module.exports = require('yargonaut');

        /***/
      },

    /***/ 'yargs/yargs':
      /*!******************************!*\
  !*** external "yargs/yargs" ***!
  \******************************/
      /***/ (module) => {
        module.exports = require('yargs/yargs');

        /***/
      },

    /***/ fs:
      /*!*********************!*\
  !*** external "fs" ***!
  \*********************/
      /***/ (module) => {
        module.exports = require('fs');

        /***/
      },

    /***/ path:
      /*!***********************!*\
  !*** external "path" ***!
  \***********************/
      /***/ (module) => {
        module.exports = require('path');

        /***/
      },

    /***/ worker_threads:
      /*!*********************************!*\
  !*** external "worker_threads" ***!
  \*********************************/
      /***/ (module) => {
        module.exports = require('worker_threads');

        /***/
      },

    /***/ './node_modules/pino-pretty/index.js':
      /*!*******************************************!*\
  !*** ./node_modules/pino-pretty/index.js ***!
  \*******************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          "\n\nconst { isColorSupported } = __webpack_require__(/*! colorette */ \"colorette\")\nconst pump = __webpack_require__(/*! pump */ \"pump\")\nconst { Transform } = __webpack_require__(/*! readable-stream */ \"readable-stream\")\nconst abstractTransport = __webpack_require__(/*! pino-abstract-transport */ \"pino-abstract-transport\")\nconst sjs = __webpack_require__(/*! secure-json-parse */ \"secure-json-parse\")\nconst colors = __webpack_require__(/*! ./lib/colors */ \"./node_modules/pino-pretty/lib/colors.js\")\nconst { ERROR_LIKE_KEYS, MESSAGE_KEY, TIMESTAMP_KEY, LEVEL_KEY, LEVEL_NAMES } = __webpack_require__(/*! ./lib/constants */ \"./node_modules/pino-pretty/lib/constants.js\")\nconst {\n  isObject,\n  prettifyErrorLog,\n  prettifyLevel,\n  prettifyMessage,\n  prettifyMetadata,\n  prettifyObject,\n  prettifyTime,\n  buildSafeSonicBoom,\n  filterLog,\n  handleCustomlevelsOpts,\n  handleCustomlevelNamesOpts\n} = __webpack_require__(/*! ./lib/utils */ \"./node_modules/pino-pretty/lib/utils.js\")\n\nconst jsonParser = input => {\n  try {\n    return { value: sjs.parse(input, { protoAction: 'remove' }) }\n  } catch (err) {\n    return { err }\n  }\n}\n\nconst defaultOptions = {\n  colorize: isColorSupported,\n  colorizeObjects: true,\n  crlf: false,\n  errorLikeObjectKeys: ERROR_LIKE_KEYS,\n  errorProps: '',\n  customLevels: null,\n  customColors: null,\n  useOnlyCustomProps: true,\n  levelFirst: false,\n  messageKey: MESSAGE_KEY,\n  messageFormat: false,\n  timestampKey: TIMESTAMP_KEY,\n  translateTime: true,\n  useMetadata: false,\n  outputStream: process.stdout,\n  customPrettifiers: {},\n  hideObject: false,\n  ignore: 'hostname',\n  include: undefined,\n  singleLine: false\n}\n\nfunction prettyFactory (options) {\n  const opts = Object.assign({}, defaultOptions, options)\n  const EOL = opts.crlf ? '\\r\\n' : '\\n'\n  const IDENT = '    '\n  const messageKey = opts.messageKey\n  const levelKey = opts.levelKey\n  const levelLabel = opts.levelLabel\n  const minimumLevel = opts.minimumLevel\n  const messageFormat = opts.messageFormat\n  const timestampKey = opts.timestampKey\n  const errorLikeObjectKeys = opts.errorLikeObjectKeys\n  const errorProps = opts.errorProps.split(',')\n  const useOnlyCustomProps = typeof opts.useOnlyCustomProps === 'boolean' ? opts.useOnlyCustomProps : opts.useOnlyCustomProps === 'true'\n  const customLevels = handleCustomlevelsOpts(opts.customLevels)\n  const customLevelNames = handleCustomlevelNamesOpts(opts.customLevels)\n\n  const customColors = opts.customColors\n    ? opts.customColors\n      .split(',')\n      .reduce((agg, value) => {\n        const [level, color] = value.split(':')\n\n        const condition = useOnlyCustomProps ? opts.customLevels : customLevelNames[level] !== undefined\n        const levelNum = condition ? customLevelNames[level] : LEVEL_NAMES[level]\n        const colorIdx = levelNum !== undefined ? levelNum : level\n\n        agg.push([colorIdx, color])\n\n        return agg\n      }, [])\n    : undefined\n  const customProps = {\n    customLevels,\n    customLevelNames\n  }\n  if (useOnlyCustomProps && !opts.customLevels) {\n    customProps.customLevels = undefined\n    customProps.customLevelNames = undefined\n  }\n  const customPrettifiers = opts.customPrettifiers\n  const includeKeys = opts.include !== undefined ? new Set(opts.include.split(',')) : undefined\n  const ignoreKeys = (!includeKeys && opts.ignore) ? new Set(opts.ignore.split(',')) : undefined\n  const hideObject = opts.hideObject\n  const singleLine = opts.singleLine\n  const colorizer = colors(opts.colorize, customColors, useOnlyCustomProps)\n  const objectColorizer = opts.colorizeObjects ? colorizer : colors(false, [], false)\n\n  return pretty\n\n  function pretty (inputData) {\n    let log\n    if (!isObject(inputData)) {\n      const parsed = jsonParser(inputData)\n      if (parsed.err || !isObject(parsed.value)) {\n        // pass through\n        return inputData + EOL\n      }\n      log = parsed.value\n    } else {\n      log = inputData\n    }\n\n    if (minimumLevel) {\n      const condition = useOnlyCustomProps ? opts.customLevels : customLevelNames[minimumLevel] !== undefined\n      const minimum = (condition ? customLevelNames[minimumLevel] : LEVEL_NAMES[minimumLevel]) || Number(minimumLevel)\n      const level = log[levelKey === undefined ? LEVEL_KEY : levelKey]\n      if (level < minimum) return\n    }\n\n    const prettifiedMessage = prettifyMessage({ log, messageKey, colorizer, messageFormat, levelLabel, ...customProps, useOnlyCustomProps })\n\n    if (ignoreKeys || includeKeys) {\n      log = filterLog({ log, ignoreKeys, includeKeys })\n    }\n\n    const prettifiedLevel = prettifyLevel({ log, colorizer, levelKey, prettifier: customPrettifiers.level, ...customProps })\n    const prettifiedMetadata = prettifyMetadata({ log, prettifiers: customPrettifiers })\n    const prettifiedTime = prettifyTime({ log, translateFormat: opts.translateTime, timestampKey, prettifier: customPrettifiers.time })\n\n    let line = ''\n    if (opts.levelFirst && prettifiedLevel) {\n      line = `${prettifiedLevel}`\n    }\n\n    if (prettifiedTime && line === '') {\n      line = `${prettifiedTime}`\n    } else if (prettifiedTime) {\n      line = `${line} ${prettifiedTime}`\n    }\n\n    if (!opts.levelFirst && prettifiedLevel) {\n      if (line.length > 0) {\n        line = `${line} ${prettifiedLevel}`\n      } else {\n        line = prettifiedLevel\n      }\n    }\n\n    if (prettifiedMetadata) {\n      if (line.length > 0) {\n        line = `${line} ${prettifiedMetadata}:`\n      } else {\n        line = prettifiedMetadata\n      }\n    }\n\n    if (line.endsWith(':') === false && line !== '') {\n      line += ':'\n    }\n\n    if (prettifiedMessage) {\n      if (line.length > 0) {\n        line = `${line} ${prettifiedMessage}`\n      } else {\n        line = prettifiedMessage\n      }\n    }\n\n    if (line.length > 0 && !singleLine) {\n      line += EOL\n    }\n\n    // pino@7+ does not log this anymore\n    if (log.type === 'Error' && log.stack) {\n      const prettifiedErrorLog = prettifyErrorLog({\n        log,\n        errorLikeKeys: errorLikeObjectKeys,\n        errorProperties: errorProps,\n        ident: IDENT,\n        eol: EOL\n      })\n      if (singleLine) line += EOL\n      line += prettifiedErrorLog\n    } else if (!hideObject) {\n      const skipKeys = [messageKey, levelKey, timestampKey].filter(key => typeof log[key] === 'string' || typeof log[key] === 'number')\n      const prettifiedObject = prettifyObject({\n        input: log,\n        skipKeys,\n        customPrettifiers,\n        errorLikeKeys: errorLikeObjectKeys,\n        eol: EOL,\n        ident: IDENT,\n        singleLine,\n        colorizer: objectColorizer\n      })\n\n      // In single line mode, include a space only if prettified version isn't empty\n      if (singleLine && !/^\\s$/.test(prettifiedObject)) {\n        line += ' '\n      }\n      line += prettifiedObject\n    }\n\n    return line\n  }\n}\n\nfunction build (opts = {}) {\n  const pretty = prettyFactory(opts)\n  return abstractTransport(function (source) {\n    const stream = new Transform({\n      objectMode: true,\n      autoDestroy: true,\n      transform (chunk, enc, cb) {\n        const line = pretty(chunk)\n        cb(null, line)\n      }\n    })\n\n    let destination\n\n    if (typeof opts.destination === 'object' && typeof opts.destination.write === 'function') {\n      destination = opts.destination\n    } else {\n      destination = buildSafeSonicBoom({\n        dest: opts.destination || 1,\n        append: opts.append,\n        mkdir: opts.mkdir,\n        sync: opts.sync // by default sonic will be async\n      })\n    }\n\n    source.on('unknown', function (line) {\n      destination.write(line + '\\n')\n    })\n\n    pump(source, stream, destination)\n    return stream\n  }, { parse: 'lines' })\n}\n\nmodule.exports = build\nmodule.exports.prettyFactory = prettyFactory\nmodule.exports.colorizerFactory = colors\nmodule.exports[\"default\"] = build\n\n\n//# sourceURL=webpack://ragate-cli/./node_modules/pino-pretty/index.js?"
        );

        /***/
      },

    /***/ './node_modules/pino-pretty/lib/colors.js':
      /*!************************************************!*\
  !*** ./node_modules/pino-pretty/lib/colors.js ***!
  \************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          '\n\nconst { LEVELS, LEVEL_NAMES } = __webpack_require__(/*! ./constants */ "./node_modules/pino-pretty/lib/constants.js")\n\nconst nocolor = input => input\nconst plain = {\n  default: nocolor,\n  60: nocolor,\n  50: nocolor,\n  40: nocolor,\n  30: nocolor,\n  20: nocolor,\n  10: nocolor,\n  message: nocolor,\n  greyMessage: nocolor\n}\n\nconst { createColors } = __webpack_require__(/*! colorette */ "colorette")\nconst availableColors = createColors({ useColor: true })\nconst { white, bgRed, red, yellow, green, blue, gray, cyan } = availableColors\n\nconst colored = {\n  default: white,\n  60: bgRed,\n  50: red,\n  40: yellow,\n  30: green,\n  20: blue,\n  10: gray,\n  message: cyan,\n  greyMessage: gray\n}\n\nfunction resolveCustomColoredColorizer (customColors) {\n  return customColors.reduce(\n    function (agg, [level, color]) {\n      agg[level] = typeof availableColors[color] === \'function\' ? availableColors[color] : white\n\n      return agg\n    },\n    { default: white, message: cyan, greyMessage: gray }\n  )\n}\n\nfunction colorizeLevel (useOnlyCustomProps) {\n  return function (level, colorizer, { customLevels, customLevelNames } = {}) {\n    const levels = useOnlyCustomProps ? customLevels || LEVELS : Object.assign({}, LEVELS, customLevels)\n    const levelNames = useOnlyCustomProps ? customLevelNames || LEVEL_NAMES : Object.assign({}, LEVEL_NAMES, customLevelNames)\n\n    let levelNum = \'default\'\n    if (Number.isInteger(+level)) {\n      levelNum = Object.prototype.hasOwnProperty.call(levels, level) ? level : levelNum\n    } else {\n      levelNum = Object.prototype.hasOwnProperty.call(levelNames, level.toLowerCase()) ? levelNames[level.toLowerCase()] : levelNum\n    }\n\n    const levelStr = levels[levelNum]\n\n    return Object.prototype.hasOwnProperty.call(colorizer, levelNum) ? colorizer[levelNum](levelStr) : colorizer.default(levelStr)\n  }\n}\n\nfunction plainColorizer (useOnlyCustomProps) {\n  const newPlainColorizer = colorizeLevel(useOnlyCustomProps)\n  const customColoredColorizer = function (level, opts) {\n    return newPlainColorizer(level, plain, opts)\n  }\n  customColoredColorizer.message = plain.message\n  customColoredColorizer.greyMessage = plain.greyMessage\n  return customColoredColorizer\n}\n\nfunction coloredColorizer (useOnlyCustomProps) {\n  const newColoredColorizer = colorizeLevel(useOnlyCustomProps)\n  const customColoredColorizer = function (level, opts) {\n    return newColoredColorizer(level, colored, opts)\n  }\n  customColoredColorizer.message = colored.message\n  customColoredColorizer.greyMessage = colored.greyMessage\n  return customColoredColorizer\n}\n\nfunction customColoredColorizerFactory (customColors, useOnlyCustomProps) {\n  const onlyCustomColored = resolveCustomColoredColorizer(customColors)\n  const customColored = useOnlyCustomProps ? onlyCustomColored : Object.assign({}, colored, onlyCustomColored)\n  const colorizeLevelCustom = colorizeLevel(useOnlyCustomProps)\n\n  const customColoredColorizer = function (level, opts) {\n    return colorizeLevelCustom(level, customColored, opts)\n  }\n  customColoredColorizer.message = customColoredColorizer.message || customColored.message\n  customColoredColorizer.greyMessage = customColoredColorizer.greyMessage || customColored.greyMessage\n\n  return customColoredColorizer\n}\n\n/**\n * Factory function get a function to colorized levels. The returned function\n * also includes a `.message(str)` method to colorize strings.\n *\n * @param {boolean} [useColors=false] When `true` a function that applies standard\n * terminal colors is returned.\n * @param {array[]} [customColors] Touple where first item of each array is the level index and the second item is the color\n * @param {boolean} [useOnlyCustomProps] When `true`, only use the provided custom colors provided and not fallback to default\n *\n * @returns {function} `function (level) {}` has a `.message(str)` method to\n * apply colorization to a string. The core function accepts either an integer\n * `level` or a `string` level. The integer level will map to a known level\n * string or to `USERLVL` if not known.  The string `level` will map to the same\n * colors as the integer `level` and will also default to `USERLVL` if the given\n * string is not a recognized level name.\n */\nmodule.exports = function getColorizer (useColors = false, customColors, useOnlyCustomProps) {\n  if (useColors && customColors !== undefined) {\n    return customColoredColorizerFactory(customColors, useOnlyCustomProps)\n  } else if (useColors) {\n    return coloredColorizer(useOnlyCustomProps)\n  }\n\n  return plainColorizer(useOnlyCustomProps)\n}\n\n\n//# sourceURL=webpack://ragate-cli/./node_modules/pino-pretty/lib/colors.js?'
        );

        /***/
      },

    /***/ './node_modules/pino-pretty/lib/constants.js':
      /*!***************************************************!*\
  !*** ./node_modules/pino-pretty/lib/constants.js ***!
  \***************************************************/
      /***/ (module) => {
        eval(
          "\n\nmodule.exports = {\n  DATE_FORMAT: 'yyyy-mm-dd HH:MM:ss.l o',\n  DATE_FORMAT_SIMPLE: 'HH:MM:ss.l',\n\n  ERROR_LIKE_KEYS: ['err', 'error'],\n\n  MESSAGE_KEY: 'msg',\n\n  LEVEL_KEY: 'level',\n\n  LEVEL_LABEL: 'levelLabel',\n\n  TIMESTAMP_KEY: 'time',\n\n  LEVELS: {\n    default: 'USERLVL',\n    60: 'FATAL',\n    50: 'ERROR',\n    40: 'WARN',\n    30: 'INFO',\n    20: 'DEBUG',\n    10: 'TRACE'\n  },\n\n  LEVEL_NAMES: {\n    fatal: 60,\n    error: 50,\n    warn: 40,\n    info: 30,\n    debug: 20,\n    trace: 10\n  },\n\n  // Object keys that probably came from a logger like Pino or Bunyan.\n  LOGGER_KEYS: [\n    'pid',\n    'hostname',\n    'name',\n    'level',\n    'time',\n    'timestamp',\n    'caller'\n  ]\n}\n\n\n//# sourceURL=webpack://ragate-cli/./node_modules/pino-pretty/lib/constants.js?"
        );

        /***/
      },

    /***/ './node_modules/pino-pretty/lib/utils.js':
      /*!***********************************************!*\
  !*** ./node_modules/pino-pretty/lib/utils.js ***!
  \***********************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          "\n\nconst { createCopier } = __webpack_require__(/*! fast-copy */ \"fast-copy\")\nconst dateformat = __webpack_require__(/*! dateformat */ \"dateformat\")\nconst SonicBoom = __webpack_require__(/*! sonic-boom */ \"sonic-boom\")\nconst stringifySafe = __webpack_require__(/*! fast-safe-stringify */ \"fast-safe-stringify\")\nconst { isMainThread } = __webpack_require__(/*! worker_threads */ \"worker_threads\")\nconst defaultColorizer = __webpack_require__(/*! ./colors */ \"./node_modules/pino-pretty/lib/colors.js\")()\nconst {\n  DATE_FORMAT,\n  ERROR_LIKE_KEYS,\n  MESSAGE_KEY,\n  LEVEL_KEY,\n  LEVEL_LABEL,\n  TIMESTAMP_KEY,\n  LOGGER_KEYS,\n  LEVELS,\n  DATE_FORMAT_SIMPLE\n} = __webpack_require__(/*! ./constants */ \"./node_modules/pino-pretty/lib/constants.js\")\n\nconst fastCopy = createCopier({})\n\nmodule.exports = {\n  isObject,\n  prettifyErrorLog,\n  prettifyLevel,\n  prettifyMessage,\n  prettifyMetadata,\n  prettifyObject,\n  prettifyTime,\n  buildSafeSonicBoom,\n  filterLog,\n  handleCustomlevelsOpts,\n  handleCustomlevelNamesOpts\n}\n\nmodule.exports.internals = {\n  formatTime,\n  joinLinesWithIndentation,\n  prettifyError,\n  getPropertyValue,\n  deleteLogProperty,\n  splitPropertyKey,\n  createDate,\n  isValidDate\n}\n\n/**\n * Converts a given `epoch` to a desired display format.\n *\n * @param {number|string} epoch The time to convert. May be any value that is\n * valid for `new Date()`.\n * @param {boolean|string} [translateTime=false] When `false`, the given `epoch`\n * will simply be returned. When `true`, the given `epoch` will be converted\n * to a string at UTC using the `DATE_FORMAT` constant. If `translateTime` is\n * a string, the following rules are available:\n *\n * - `<format string>`: The string is a literal format string. This format\n * string will be used to interpret the `epoch` and return a display string\n * at UTC.\n * - `SYS:STANDARD`: The returned display string will follow the `DATE_FORMAT`\n * constant at the system's local timezone.\n * - `SYS:<format string>`: The returned display string will follow the given\n * `<format string>` at the system's local timezone.\n * - `UTC:<format string>`: The returned display string will follow the given\n * `<format string>` at UTC.\n *\n * @returns {number|string} The formatted time.\n */\nfunction formatTime (epoch, translateTime = false) {\n  if (translateTime === false) {\n    return epoch\n  }\n\n  const instant = createDate(epoch)\n\n  // If the Date is invalid, do not attempt to format\n  if (!isValidDate(instant)) {\n    return epoch\n  }\n\n  if (translateTime === true) {\n    return dateformat(instant, DATE_FORMAT_SIMPLE)\n  }\n\n  const upperFormat = translateTime.toUpperCase()\n  if (upperFormat === 'SYS:STANDARD') {\n    return dateformat(instant, DATE_FORMAT)\n  }\n\n  const prefix = upperFormat.substr(0, 4)\n  if (prefix === 'SYS:' || prefix === 'UTC:') {\n    if (prefix === 'UTC:') {\n      return dateformat(instant, translateTime)\n    }\n    return dateformat(instant, translateTime.slice(4))\n  }\n\n  return dateformat(instant, `UTC:${translateTime}`)\n}\n\n/**\n * Constructs a JS Date from a number or string. Accepts any single number\n * or single string argument that is valid for the Date() constructor,\n * or an epoch as a string.\n *\n * @param {string|number} epoch The representation of the Date.\n *\n * @returns {Date} The constructed Date.\n */\nfunction createDate (epoch) {\n  // If epoch is already a valid argument, return the valid Date\n  let date = new Date(epoch)\n  if (isValidDate(date)) {\n    return date\n  }\n\n  // Convert to a number to permit epoch as a string\n  date = new Date(+epoch)\n  return date\n}\n\n/**\n * Checks if the argument is a JS Date and not 'Invalid Date'.\n *\n * @param {Date} date The date to check.\n *\n * @returns {boolean} true if the argument is a JS Date and not 'Invalid Date'.\n */\nfunction isValidDate (date) {\n  return date instanceof Date && !Number.isNaN(date.getTime())\n}\n\nfunction isObject (input) {\n  return Object.prototype.toString.apply(input) === '[object Object]'\n}\n\n/**\n * Given a string with line separators, either `\\r\\n` or `\\n`, add indentation\n * to all lines subsequent to the first line and rejoin the lines using an\n * end of line sequence.\n *\n * @param {object} input\n * @param {string} input.input The string to split and reformat.\n * @param {string} [input.ident] The indentation string. Default: `    ` (4 spaces).\n * @param {string} [input.eol] The end of line sequence to use when rejoining\n * the lines. Default: `'\\n'`.\n *\n * @returns {string} A string with lines subsequent to the first indented\n * with the given indentation sequence.\n */\nfunction joinLinesWithIndentation ({ input, ident = '    ', eol = '\\n' }) {\n  const lines = input.split(/\\r?\\n/)\n  for (let i = 1; i < lines.length; i += 1) {\n    lines[i] = ident + lines[i]\n  }\n  return lines.join(eol)\n}\n\n/**\n * Given a log object that has a `type: 'Error'` key, prettify the object and\n * return the result. In other\n *\n * @param {object} input\n * @param {object} input.log The error log to prettify.\n * @param {string} [input.messageKey] The name of the key that contains a\n * general log message. This is not the error's message property but the logger\n * messsage property. Default: `MESSAGE_KEY` constant.\n * @param {string} [input.ident] The sequence to use for indentation. Default: `'    '`.\n * @param {string} [input.eol] The sequence to use for EOL. Default: `'\\n'`.\n * @param {string[]} [input.errorLikeKeys] A set of keys that should be considered\n * to have error objects as values. Default: `ERROR_LIKE_KEYS` constant.\n * @param {string[]} [input.errorProperties] A set of specific error object\n * properties, that are not the value of `messageKey`, `type`, or `stack`, to\n * include in the prettified result. The first entry in the list may be `'*'`\n * to indicate that all sibiling properties should be prettified. Default: `[]`.\n *\n * @returns {string} A sring that represents the prettified error log.\n */\nfunction prettifyErrorLog ({\n  log,\n  messageKey = MESSAGE_KEY,\n  ident = '    ',\n  eol = '\\n',\n  errorLikeKeys = ERROR_LIKE_KEYS,\n  errorProperties = []\n}) {\n  const stack = log.stack\n  const joinedLines = joinLinesWithIndentation({ input: stack, ident, eol })\n  let result = `${ident}${joinedLines}${eol}`\n\n  if (errorProperties.length > 0) {\n    const excludeProperties = LOGGER_KEYS.concat(messageKey, 'type', 'stack')\n    let propertiesToPrint\n    if (errorProperties[0] === '*') {\n      // Print all sibling properties except for the standard exclusions.\n      propertiesToPrint = Object.keys(log).filter(k => excludeProperties.includes(k) === false)\n    } else {\n      // Print only specified properties unless the property is a standard exclusion.\n      propertiesToPrint = errorProperties.filter(k => excludeProperties.includes(k) === false)\n    }\n\n    for (let i = 0; i < propertiesToPrint.length; i += 1) {\n      const key = propertiesToPrint[i]\n      if (key in log === false) continue\n      if (isObject(log[key])) {\n        // The nested object may have \"logger\" type keys but since they are not\n        // at the root level of the object being processed, we want to print them.\n        // Thus, we invoke with `excludeLoggerKeys: false`.\n        const prettifiedObject = prettifyObject({ input: log[key], errorLikeKeys, excludeLoggerKeys: false, eol, ident: ident + ident })\n        result = `${result}${ident}${key}: {${eol}${prettifiedObject}${ident}}${eol}`\n        continue\n      }\n      result = `${result}${ident}${key}: ${log[key]}${eol}`\n    }\n  }\n\n  return result\n}\n\n/**\n * Checks if the passed in log has a `level` value and returns a prettified\n * string for that level if so.\n *\n * @param {object} input\n * @param {object} input.log The log object.\n * @param {function} [input.colorizer] A colorizer function that accepts a level\n * value and returns a colorized string. Default: a no-op colorizer.\n * @param {string} [input.levelKey='level'] The key to find the level under.\n * @param {function} [input.prettifier] A user-supplied formatter to be called instead of colorizer.\n * @param {object} [input.customLevels] The custom levels where key as the level index and value as the level name.\n * @param {object} [input.customLevelNames] The custom level names where key is the level name and value is the level index.\n *\n * @returns {undefined|string} If `log` does not have a `level` property then\n * `undefined` will be returned. Otherwise, a string from the specified\n * `colorizer` is returned.\n */\nfunction prettifyLevel ({ log, colorizer = defaultColorizer, levelKey = LEVEL_KEY, prettifier, customLevels, customLevelNames }) {\n  const output = getPropertyValue(log, levelKey)\n  if (output === undefined) return undefined\n  return prettifier ? prettifier(output) : colorizer(output, { customLevels, customLevelNames })\n}\n\n/**\n * Prettifies a message string if the given `log` has a message property.\n *\n * @param {object} input\n * @param {object} input.log The log object with the message to colorize.\n * @param {string} [input.messageKey='msg'] The property of the `log` that is the\n * message to be prettified.\n * @param {string|function} [input.messageFormat=undefined] A format string or function that defines how the\n *  logged message should be formatted, e.g. `'{level} - {pid}'`.\n * @param {function} [input.colorizer] A colorizer function that has a\n * `.message(str)` method attached to it. This function should return a colorized\n * string which will be the \"prettified\" message. Default: a no-op colorizer.\n * @param {string} [input.levelLabel='levelLabel'] The label used to output the log level\n * @param {string} [input.levelKey='level'] The key to find the level under.\n * @param {object} [input.customLevels] The custom levels where key as the level index and value as the level name.\n *\n * @returns {undefined|string} If the message key is not found, or the message\n * key is not a string, then `undefined` will be returned. Otherwise, a string\n * that is the prettified message.\n */\nfunction prettifyMessage ({ log, messageFormat, messageKey = MESSAGE_KEY, colorizer = defaultColorizer, levelLabel = LEVEL_LABEL, levelKey = LEVEL_KEY, customLevels, useOnlyCustomProps }) {\n  if (messageFormat && typeof messageFormat === 'string') {\n    const message = String(messageFormat).replace(/{([^{}]+)}/g, function (match, p1) {\n      // return log level as string instead of int\n      let level\n      if (p1 === levelLabel && (level = getPropertyValue(log, levelKey)) !== undefined) {\n        const condition = useOnlyCustomProps ? customLevels === undefined : customLevels[level] === undefined\n        return condition ? LEVELS[level] : customLevels[level]\n      }\n      // Parse nested key access, e.g. `{keyA.subKeyB}`.\n      return getPropertyValue(log, p1) || ''\n    })\n    return colorizer.message(message)\n  }\n  if (messageFormat && typeof messageFormat === 'function') {\n    const msg = messageFormat(log, messageKey, levelLabel)\n    return colorizer.message(msg)\n  }\n  if (messageKey in log === false) return undefined\n  if (typeof log[messageKey] !== 'string') return undefined\n  return colorizer.message(log[messageKey])\n}\n\n/**\n * Prettifies metadata that is usually present in a Pino log line. It looks for\n * fields `name`, `pid`, `hostname`, and `caller` and returns a formatted string using\n * the fields it finds.\n *\n * @param {object} input\n * @param {object} input.log The log that may or may not contain metadata to\n * be prettified.\n * @param {object} input.prettifiers A set of functions used to prettify each\n * key of the input log's metadata. The keys are the keys of the metadata (like\n * `hostname`, `pid`, `name`, etc), and the values are functions which take the\n * metadata value and return a string. Each key is optional.\n *\n * @returns {undefined|string} If no metadata is found then `undefined` is\n * returned. Otherwise, a string of prettified metadata is returned.\n */\nfunction prettifyMetadata ({ log, prettifiers = {} }) {\n  let line = ''\n\n  if (log.name || log.pid || log.hostname) {\n    line += '('\n\n    if (log.name) {\n      line += prettifiers.name ? prettifiers.name(log.name) : log.name\n    }\n\n    if (log.pid) {\n      const prettyPid = prettifiers.pid ? prettifiers.pid(log.pid) : log.pid\n      if (log.name && log.pid) {\n        line += '/' + prettyPid\n      } else {\n        line += prettyPid\n      }\n    }\n\n    if (log.hostname) {\n      // If `pid` and `name` were in the ignore keys list then we don't need\n      // the leading space.\n      line += `${line === '(' ? 'on' : ' on'} ${prettifiers.hostname ? prettifiers.hostname(log.hostname) : log.hostname}`\n    }\n\n    line += ')'\n  }\n\n  if (log.caller) {\n    line += `${line === '' ? '' : ' '}<${prettifiers.caller ? prettifiers.caller(log.caller) : log.caller}>`\n  }\n\n  if (line === '') {\n    return undefined\n  } else {\n    return line\n  }\n}\n\n/**\n * Prettifies a standard object. Special care is taken when processing the object\n * to handle child objects that are attached to keys known to contain error\n * objects.\n *\n * @param {object} input\n * @param {object} input.input The object to prettify.\n * @param {string} [input.ident] The identation sequence to use. Default: `'    '`.\n * @param {string} [input.eol] The EOL sequence to use. Default: `'\\n'`.\n * @param {string[]} [input.skipKeys] A set of object keys to exclude from the\n * prettified result. Default: `[]`.\n * @param {Object<string, function>} [input.customPrettifiers] Dictionary of\n * custom prettifiers. Default: `{}`.\n * @param {string[]} [input.errorLikeKeys] A set of object keys that contain\n * error objects. Default: `ERROR_LIKE_KEYS` constant.\n * @param {boolean} [input.excludeLoggerKeys] Indicates if known logger specific\n * keys should be excluded from prettification. Default: `true`.\n * @param {boolean} [input.singleLine] Should non-error keys all be formatted\n * on a single line? This does NOT apply to errors, which will still be\n * multi-line. Default: `false`\n *\n * @returns {string} The prettified string. This can be as little as `''` if\n * there was nothing to prettify.\n */\nfunction prettifyObject ({\n  input,\n  ident = '    ',\n  eol = '\\n',\n  skipKeys = [],\n  customPrettifiers = {},\n  errorLikeKeys = ERROR_LIKE_KEYS,\n  excludeLoggerKeys = true,\n  singleLine = false,\n  colorizer = defaultColorizer\n}) {\n  const keysToIgnore = [].concat(skipKeys)\n\n  if (excludeLoggerKeys === true) Array.prototype.push.apply(keysToIgnore, LOGGER_KEYS)\n\n  let result = ''\n\n  // Split object keys into two categories: error and non-error\n  const { plain, errors } = Object.entries(input).reduce(({ plain, errors }, [k, v]) => {\n    if (keysToIgnore.includes(k) === false) {\n      // Pre-apply custom prettifiers, because all 3 cases below will need this\n      const pretty = typeof customPrettifiers[k] === 'function'\n        ? customPrettifiers[k](v, k, input)\n        : v\n      if (errorLikeKeys.includes(k)) {\n        errors[k] = pretty\n      } else {\n        plain[k] = pretty\n      }\n    }\n    return { plain, errors }\n  }, { plain: {}, errors: {} })\n\n  if (singleLine) {\n    // Stringify the entire object as a single JSON line\n    if (Object.keys(plain).length > 0) {\n      result += colorizer.greyMessage(stringifySafe(plain))\n    }\n    result += eol\n    // Avoid printing the escape character on escaped backslashes.\n    result = result.replace(/\\\\\\\\/gi, '\\\\')\n  } else {\n    // Put each object entry on its own line\n    Object.entries(plain).forEach(([keyName, keyValue]) => {\n      // custom prettifiers are already applied above, so we can skip it now\n      let lines = typeof customPrettifiers[keyName] === 'function'\n        ? keyValue\n        : stringifySafe(keyValue, null, 2)\n\n      if (lines === undefined) return\n\n      // Avoid printing the escape character on escaped backslashes.\n      lines = lines.replace(/\\\\\\\\/gi, '\\\\')\n\n      const joinedLines = joinLinesWithIndentation({ input: lines, ident, eol })\n      result += `${ident}${keyName}:${joinedLines.startsWith(eol) ? '' : ' '}${joinedLines}${eol}`\n    })\n  }\n\n  // Errors\n  Object.entries(errors).forEach(([keyName, keyValue]) => {\n    // custom prettifiers are already applied above, so we can skip it now\n    const lines = typeof customPrettifiers[keyName] === 'function'\n      ? keyValue\n      : stringifySafe(keyValue, null, 2)\n\n    if (lines === undefined) return\n\n    result += prettifyError({ keyName, lines, eol, ident })\n  })\n\n  return result\n}\n\n/**\n * Prettifies a timestamp if the given `log` has either `time`, `timestamp` or custom specified timestamp\n * property.\n *\n * @param {object} input\n * @param {object} input.log The log object with the timestamp to be prettified.\n * @param {string} [input.timestampKey='time'] The log property that should be used to resolve timestamp value\n * @param {boolean|string} [input.translateFormat=undefined] When `true` the\n * timestamp will be prettified into a string at UTC using the default\n * `DATE_FORMAT`. If a string, then `translateFormat` will be used as the format\n * string to determine the output; see the `formatTime` function for details.\n * @param {function} [input.prettifier] A user-supplied formatter for altering output.\n *\n * @returns {undefined|string} If a timestamp property cannot be found then\n * `undefined` is returned. Otherwise, the prettified time is returned as a\n * string.\n */\nfunction prettifyTime ({ log, timestampKey = TIMESTAMP_KEY, translateFormat = undefined, prettifier }) {\n  let time = null\n\n  if (timestampKey in log) {\n    time = log[timestampKey]\n  } else if ('timestamp' in log) {\n    time = log.timestamp\n  }\n\n  if (time === null) return undefined\n  const output = translateFormat ? formatTime(time, translateFormat) : time\n\n  return prettifier ? prettifier(output) : `[${output}]`\n}\n\n/**\n * Prettifies an error string into a multi-line format.\n * @param {object} input\n * @param {string} input.keyName The key assigned to this error in the log object\n * @param {string} input.lines The STRINGIFIED error. If the error field has a\n *  custom prettifier, that should be pre-applied as well\n * @param {string} input.ident The indentation sequence to use\n * @param {string} input.eol The EOL sequence to use\n */\nfunction prettifyError ({ keyName, lines, eol, ident }) {\n  let result = ''\n  const joinedLines = joinLinesWithIndentation({ input: lines, ident, eol })\n  const splitLines = `${ident}${keyName}: ${joinedLines}${eol}`.split(eol)\n\n  for (let j = 0; j < splitLines.length; j += 1) {\n    if (j !== 0) result += eol\n\n    const line = splitLines[j]\n    if (/^\\s*\"stack\"/.test(line)) {\n      const matches = /^(\\s*\"stack\":)\\s*(\".*\"),?$/.exec(line)\n      /* istanbul ignore else */\n      if (matches && matches.length === 3) {\n        const indentSize = /^\\s*/.exec(line)[0].length + 4\n        const indentation = ' '.repeat(indentSize)\n        const stackMessage = matches[2]\n        result += matches[1] + eol + indentation + JSON.parse(stackMessage).replace(/\\n/g, eol + indentation)\n      } else {\n        result += line\n      }\n    } else {\n      result += line\n    }\n  }\n\n  return result\n}\n\n/**\n * Splits the property key delimited by a dot character but not when it is preceded\n * by a backslash.\n *\n * @param {string} key A string identifying the property.\n *\n * @returns {string[]} Returns a list of string containing each delimited property.\n * e.g. `'prop2\\.domain\\.corp.prop2'` should return [ 'prop2.domain.com', 'prop2' ]\n */\nfunction splitPropertyKey (key) {\n  const result = []\n  let backslash = false\n  let segment = ''\n\n  for (let i = 0; i < key.length; i++) {\n    const c = key.charAt(i)\n\n    if (c === '\\\\') {\n      backslash = true\n      continue\n    }\n\n    if (backslash) {\n      backslash = false\n      segment += c\n      continue\n    }\n\n    /* Non-escaped dot, push to result */\n    if (c === '.') {\n      result.push(segment)\n      segment = ''\n      continue\n    }\n\n    segment += c\n  }\n\n  /* Push last entry to result */\n  if (segment.length) {\n    result.push(segment)\n  }\n\n  return result\n}\n\n/**\n * Gets a specified property from an object if it exists.\n *\n * @param {object} obj The object to be searched.\n * @param {string|string[]} property A string, or an array of strings, identifying\n  * the property to be retrieved from the object.\n * Accepts nested properties delimited by a `.`.\n * Delimiter can be escaped to preserve property names that contain the delimiter.\n * e.g. `'prop1.prop2'` or `'prop2\\.domain\\.corp.prop2'`.\n *\n * @returns {*}\n */\nfunction getPropertyValue (obj, property) {\n  const props = Array.isArray(property) ? property : splitPropertyKey(property)\n\n  for (const prop of props) {\n    if (!Object.prototype.hasOwnProperty.call(obj, prop)) {\n      return\n    }\n    obj = obj[prop]\n  }\n\n  return obj\n}\n\n/**\n * Deletes a specified property from a log object if it exists.\n * This function mutates the passed in `log` object.\n *\n * @param {object} log The log object to be modified.\n * @param {string} property A string identifying the property to be deleted from\n * the log object. Accepts nested properties delimited by a `.`\n * Delimiter can be escaped to preserve property names that contain the delimiter.\n * e.g. `'prop1.prop2'` or `'prop2\\.domain\\.corp.prop2'`\n */\nfunction deleteLogProperty (log, property) {\n  const props = splitPropertyKey(property)\n  const propToDelete = props.pop()\n\n  log = getPropertyValue(log, props)\n\n  if (log !== null && typeof log === 'object' && Object.prototype.hasOwnProperty.call(log, propToDelete)) {\n    delete log[propToDelete]\n  }\n}\n\n/**\n * Filter a log object by removing or including keys accordingly.\n * When `includeKeys` is passed, `ignoredKeys` will be ignored.\n * One of ignoreKeys or includeKeys must be pass in.\n *\n * @param {object} input\n * @param {object} input.log The log object to be modified.\n * @param {Set<string> | Array<string> | undefined} input.ignoreKeys\n *  An array of strings identifying the properties to be removed.\n * @param {Set<string> | Array<string> | undefined} input.includeKeys\n *  An array of strings identifying the properties to be included.\n *\n * @returns {object} A new `log` object instance that\n *  either only includes the keys in ignoreKeys\n *  or does not include those in ignoredKeys.\n */\nfunction filterLog ({ log, ignoreKeys, includeKeys }) {\n  const logCopy = fastCopy(log)\n\n  if (includeKeys) {\n    const logIncluded = {}\n\n    includeKeys.forEach((key) => {\n      logIncluded[key] = logCopy[key]\n    })\n    return logIncluded\n  }\n\n  ignoreKeys.forEach((ignoreKey) => {\n    deleteLogProperty(logCopy, ignoreKey)\n  })\n  return logCopy\n}\n\nfunction noop () {}\n\n/**\n * Creates a safe SonicBoom instance\n *\n * @param {object} opts Options for SonicBoom\n *\n * @returns {object} A new SonicBoom stream\n */\nfunction buildSafeSonicBoom (opts) {\n  const stream = new SonicBoom(opts)\n  stream.on('error', filterBrokenPipe)\n  // if we are sync: false, we must flush on exit\n  if (!opts.sync && isMainThread) {\n    setupOnExit(stream)\n  }\n  return stream\n\n  function filterBrokenPipe (err) {\n    if (err.code === 'EPIPE') {\n      stream.write = noop\n      stream.end = noop\n      stream.flushSync = noop\n      stream.destroy = noop\n      return\n    }\n    stream.removeListener('error', filterBrokenPipe)\n  }\n}\n\nfunction setupOnExit (stream) {\n  /* istanbul ignore next */\n  if (global.WeakRef && global.WeakMap && global.FinalizationRegistry) {\n    // This is leak free, it does not leave event handlers\n    const onExit = __webpack_require__(/*! on-exit-leak-free */ \"on-exit-leak-free\")\n\n    onExit.register(stream, autoEnd)\n\n    stream.on('close', function () {\n      onExit.unregister(stream)\n    })\n  }\n}\n\n/* istanbul ignore next */\nfunction autoEnd (stream, eventName) {\n  // This check is needed only on some platforms\n\n  if (stream.destroyed) {\n    return\n  }\n\n  if (eventName === 'beforeExit') {\n    // We still have an event loop, let's use it\n    stream.flush()\n    stream.on('drain', function () {\n      stream.end()\n    })\n  } else {\n    // We do not have an event loop, so flush synchronously\n    stream.flushSync()\n  }\n}\n\n/**\n * Parse a CSV string or options object that specifies\n * configuration for custom levels.\n *\n * @param {string|object} cLevels An object mapping level\n * names to values, e.g. `{ info: 30, debug: 65 }`, or a\n * CSV string in the format `level_name:level_value`, e.g.\n * `info:30,debug:65`.\n *\n * @returns {object} An object mapping levels to labels that\n * appear in logs, e.g. `{ '30': 'INFO', '65': 'DEBUG' }`.\n */\nfunction handleCustomlevelsOpts (cLevels) {\n  if (!cLevels) return {}\n\n  if (typeof cLevels === 'string') {\n    return cLevels\n      .split(',')\n      .reduce((agg, value, idx) => {\n        const [levelName, levelIdx = idx] = value.split(':')\n        agg[levelIdx] = levelName.toUpperCase()\n        return agg\n      },\n      { default: 'USERLVL' })\n  } else if (Object.prototype.toString.call(cLevels) === '[object Object]') {\n    return Object\n      .keys(cLevels)\n      .reduce((agg, levelName, idx) => {\n        agg[cLevels[levelName]] = levelName.toUpperCase()\n        return agg\n      }, { default: 'USERLVL' })\n  } else {\n    return {}\n  }\n}\n\n/**\n * Parse a CSV string or options object that maps level\n * labels to level values.\n *\n * @param {string|object} cLevels An object mapping level\n * names to level values, e.g. `{ info: 30, debug: 65 }`, or a\n * CSV string in the format `level_name:level_value`, e.g.\n * `info:30,debug:65`.\n *\n * @returns {object} An object mapping levels names to level values\n * e.g. `{ info: 30, debug: 65 }`.\n */\nfunction handleCustomlevelNamesOpts (cLevels) {\n  if (!cLevels) return {}\n\n  if (typeof cLevels === 'string') {\n    return cLevels\n      .split(',')\n      .reduce((agg, value, idx) => {\n        const [levelName, levelIdx = idx] = value.split(':')\n        agg[levelName.toLowerCase()] = levelIdx\n        return agg\n      }, {})\n  } else if (Object.prototype.toString.call(cLevels) === '[object Object]') {\n    return Object\n      .keys(cLevels)\n      .reduce((agg, levelName, idx) => {\n        agg[levelName.toLowerCase()] = cLevels[levelName]\n        return agg\n      }, {})\n  } else {\n    return {}\n  }\n}\n\n\n//# sourceURL=webpack://ragate-cli/./node_modules/pino-pretty/lib/utils.js?"
        );

        /***/
      },

    /***/ './package.json':
      /*!**********************!*\
  !*** ./package.json ***!
  \**********************/
      /***/ (module) => {
        eval(
          'module.exports = JSON.parse(\'{"name":"ragate-cli","version":"0.1.3","description":"Anyone can immediately start a serverless project using the CLI, automatically generate source code, and start an infinitely extensible and maintainable serverless development project.","engines":{"node":">=18.x"},"scripts":{"test":"echo \\\'Sorry, test code is in preparation.\\\\n\\\'","build:dev":"ENV=development webpack","build:prd":"ENV=production webpack","lint":"eslint . --fix","format":"prettier . --write","prepare":"husky install"},"eslintIgnore":["!/.github",".serverless","bin","tmp","webpack.config.js"],"main":"./lib/app.ts","bin":{"ragate":"./bin/app.js"},"repository":{"type":"git","url":"git+https://github.com/ragate-inc/ragate-cli.git"},"lint-staged":{"*.{ts,js}":["eslint"],"*.{css,html,js,json,md,yaml,yml,ts,js}":["prettier . --write"]},"keywords":["aws","serverless","ragate","cli","amplify","serverless","lambda","amazon"],"author":"Ragate inc.","license":"MIT","bugs":{"url":"https://github.com/ragate-inc/ragate-cli/issues"},"homepage":"https://github.com/ragate-inc/ragate-cli#readme","devDependencies":{"@tsconfig/node-lts":"^18.12.1","@types/figlet":"^1.5.6","@types/fs-extra":"^11.0.1","@types/inquirer":"^9.0.3","@types/inquirer-autocomplete-prompt":"^3.0.0","@types/js-yaml":"^4.0.5","@types/lodash":"^4.14.194","@types/node":"^18.16.3","@types/webpack":"^5.28.1","@types/webpack-node-externals":"^3.0.0","@types/yargs":"^17.0.24","@typescript-eslint/eslint-plugin":"^5.59.2","@typescript-eslint/parser":"^5.59.2","eslint":"^8.39.0","eslint-config-prettier":"^8.8.0","eslint-config-standard-with-typescript":"^34.0.1","husky":"^6.0.0","lint-staged":"^13.2.2","prettier":"2.8.8","ts-loader":"^9.4.2","ts-node":"^10.9.1","tsconfig-paths-webpack-plugin":"^4.0.1","typescript":"^5.0.4","webpack":"^5.81.0","webpack-cli":"^5.0.2","webpack-node-externals":"^3.0.0"},"dependencies":{"@aws-cdk/assert":"^2.68.0","@aws-cdk/aws-iam":"^1.201.0","@aws-cdk/aws-sns":"^1.201.0","@aws-cdk/aws-sns-subscriptions":"^1.201.0","@aws-cdk/aws-sqs":"^1.201.0","aws-cdk-lib":"^2.79.1","figlet":"^1.6.0","fs-extra":"^11.1.1","graphql":"^16.6.0","graphql-compose":"^9.0.10","graphql-tools":"^8.3.20","inquirer":"^8.0.0","inquirer-autocomplete-prompt":"^2.0.0","isomorphic-git":"^1.23.0","js-yaml":"^4.1.0","lodash":"^4.17.21","parent-require":"^1.0.0","pino":"^8.12.1","pino-pretty":"^10.0.0","yaml-cfn":"^0.3.2","yargonaut":"^1.1.4","yargs":"^17.1.1-candidate.0"}}\');\n\n//# sourceURL=webpack://ragate-cli/./package.json?'
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module is referenced by other modules so it can't be inlined
  /******/ var __webpack_exports__ = __webpack_require__('./lib/app.ts');
  /******/
  /******/
})();
