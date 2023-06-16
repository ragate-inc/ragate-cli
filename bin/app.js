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
          "\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ \"./lib/utils/logger.ts\"));\nconst yargs_1 = __importDefault(__webpack_require__(/*! yargs/yargs */ \"yargs/yargs\"));\nconst yargonaut_1 = __webpack_require__(/*! utils/yargonaut */ \"./lib/utils/yargonaut.ts\");\nconst config_1 = __importDefault(__webpack_require__(/*! config */ \"./lib/config.ts\"));\nconst getLocale_1 = __webpack_require__(/*! entry/utils/getLocale */ \"./lib/entry/utils/getLocale.ts\");\nconst index_1 = __importDefault(__webpack_require__(/*! features/create/index */ \"./lib/features/create/index.ts\"));\nconst index_2 = __importDefault(__webpack_require__(/*! features/add/index */ \"./lib/features/add/index.ts\"));\nconst index_3 = __importDefault(__webpack_require__(/*! features/codegen/index */ \"./lib/features/codegen/index.ts\"));\nconst index_4 = __webpack_require__(/*! types/index */ \"./lib/types/index.ts\");\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nconst cli_1 = __webpack_require__(/*! utils/cli */ \"./lib/utils/cli.ts\");\n/**\n * yargs typescript : https://github.com/yargs/yargs/blob/main/docs/typescript.md\n * yargs api reference : https://yargs.js.org/docs/\n * Inquirer : https://github.com/SBoudrias/Inquirer.js/tree/master\n */\nclass default_1 {\n    constructor() {\n        try {\n            (0, yargonaut_1.init)();\n            this.chalk = yargonaut_1.chalk;\n            const argv = (0, yargs_1.default)(process.argv.slice(2))\n                .options({\n                lang: {\n                    default: this.langRef.default,\n                    type: this.langRef.type,\n                },\n                verbose: {\n                    type: this.verboseRef.type,\n                },\n                region: {\n                    default: this.regionRef.default,\n                    type: this.regionRef.type,\n                },\n            })\n                .check((argv) => {\n                argv.verbose = lodash_1.default.hasIn(argv, 'verbose');\n                return true;\n            })\n                .help(false)\n                .version(false)\n                .parseSync();\n            this.lang = argv.lang;\n            this.verbose = argv.verbose;\n            this.region = argv.region;\n            this.locale = (0, getLocale_1.getLocaleLang)(argv.lang);\n            this.logger = logger_1.default.getLogger(this.verbose ? 'debug' : 'info');\n            this.npmVersion = config_1.default.npmVersion;\n        }\n        finally {\n            (0, cli_1.cleanUpTmpDirectory)();\n        }\n    }\n    chalk;\n    logger;\n    locale;\n    lang;\n    langRef = {\n        default: process.env.LANG ?? 'en',\n        type: 'string',\n    };\n    verbose;\n    verboseRef = {\n        type: 'flag',\n    };\n    npmVersion;\n    get version() {\n        return `ragate-cli v${this.npmVersion}`;\n    }\n    region;\n    regionRef = {\n        default: 'ap-northeast-1',\n        type: 'string',\n    };\n    handleError(err) {\n        const logger = logger_1.default.getLogger();\n        if (err.name)\n            logger.debug(err.name);\n        if (err.stack)\n            logger.debug(err.stack);\n        console.error('\\n', yargonaut_1.chalk.red(err.message));\n        process.exit(1);\n    }\n    cli() {\n        const { version, chalk, locale, lang } = this;\n        return (0, yargs_1.default)(process.argv.slice(2))\n            .scriptName('')\n            .options({\n            verbose: {\n                describe: chalk.grey(locale.options.describe.verbose),\n                type: this.verboseRef.type,\n            },\n            lang: {\n                describe: chalk.grey(locale.options.describe.lang),\n                default: this.langRef.default,\n                type: this.langRef.type,\n            },\n            region: {\n                alias: 'r',\n                describe: chalk.grey(locale.options.describe.region),\n                default: this.regionRef.default,\n                type: this.regionRef.type,\n                choices: index_4.awsRegions,\n            },\n        })\n            .usage(version)\n            .help('help', chalk.grey(locale.help))\n            .alias('h', 'help')\n            .version('version', chalk.grey(locale.version), version)\n            .alias('v', 'version')\n            .check((argv) => {\n            if (argv._.length === 0)\n                throw new Error(this.locale.unProcessed.required);\n            return true;\n        })\n            .command('create', chalk.grey(locale.command.description.create), (_yargs) => {\n            const args = { lang: this.lang, region: this.region };\n            return new index_1.default.builder(args).build(_yargs);\n        }, (argv) => new index_1.default.handler(argv).run())\n            .command('add', chalk.grey(locale.command.description.add), (_yargs) => {\n            const args = { lang: this.lang, region: this.region };\n            return new index_2.default.builder(args).build(_yargs);\n        })\n            .command('codegen', chalk.grey(locale.command.description.codegen), (_yargs) => {\n            const args = { lang: this.lang, region: this.region };\n            return new index_3.default.builder(args).build(_yargs);\n        })\n            .command('*', '', () => ({}), () => {\n            throw new Error(this.locale.unProcessed.notFound);\n        })\n            .wrap(Math.max((0, yargs_1.default)().terminalWidth() - 5, 60))\n            .locale(lang)\n            .fail((msg, err) => this.handleError(err));\n    }\n    async run() {\n        try {\n            await this.cli().parseAsync();\n        }\n        catch (e) {\n            this.handleError(e);\n        }\n    }\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/entry/builder.ts?"
        );

        /***/
      },

    /***/ './lib/entry/locale/en.ts':
      /*!********************************!*\
  !*** ./lib/entry/locale/en.ts ***!
  \********************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    help: 'Show help',\n    version: 'Show version',\n    yourInput: 'your input',\n    command: {\n        description: {\n            create: 'Create a new project',\n            add: 'Add aws resouces',\n            codegen: 'Auto generate source code',\n        },\n    },\n    options: {\n        describe: {\n            verbose: 'Show verbose logs',\n            region: 'Aws region',\n            lang: 'Display language',\n        },\n    },\n    unProcessed: {\n        required: 'please input a command. Run \"ragate help\" for a list of all available commands.',\n        notFound: 'The command entered does not exist. Run \"ragate help\" for a list of all available commands.',\n    },\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/entry/locale/en.ts?"
        );

        /***/
      },

    /***/ './lib/entry/locale/ja.ts':
      /*!********************************!*\
  !*** ./lib/entry/locale/ja.ts ***!
  \********************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    help: 'ヘルプを表示',\n    version: 'バージョンを表示',\n    yourInput: '入力されたコマンド',\n    command: {\n        description: {\n            create: 'プロジェクトを作成',\n            add: 'AWSリソースの追加',\n            codegen: 'ソースコード自動生成',\n        },\n    },\n    options: {\n        describe: {\n            verbose: '詳細なログを出力',\n            region: 'AWSリージョン',\n            lang: '表示言語',\n        },\n    },\n    unProcessed: {\n        required: '指定のコマンドは存在しません。「ragate help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',\n        notFound: '入力されたコマンドは存在しません。「ragate help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',\n    },\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/entry/locale/ja.ts?"
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
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.CLIError = exports.EnvironmentError = exports.BaseClass = void 0;\nclass BaseClass extends Error {\n    constructor(message) {\n        super(message);\n        this.name = new.target.name;\n        if (Error.captureStackTrace)\n            Error.captureStackTrace(this, this.constructor);\n        Object.setPrototypeOf(this, new.target.prototype);\n    }\n}\nexports.BaseClass = BaseClass;\nclass EnvironmentError extends BaseClass {\n    constructor(message) {\n        super(message);\n        this.name = 'EnvironmentError';\n    }\n}\nexports.EnvironmentError = EnvironmentError;\nclass CLIError extends BaseClass {\n    constructor(message) {\n        super(message);\n        this.name = 'CLIError';\n    }\n}\nexports.CLIError = CLIError;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/exceptions/index.ts?"
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
          "\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ \"./lib/utils/logger.ts\"));\nconst index_1 = __webpack_require__(/*! types/index */ \"./lib/types/index.ts\");\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nconst serverlessConfigService_1 = __importDefault(__webpack_require__(/*! services/serverlessConfigService */ \"./lib/services/serverlessConfigService.ts\"));\nconst inquirer_1 = __importDefault(__webpack_require__(/*! inquirer */ \"inquirer\"));\nconst validator_1 = __importDefault(__webpack_require__(/*! utils/validator */ \"./lib/utils/validator/index.ts\"));\nconst filter_1 = __importDefault(__webpack_require__(/*! utils/inquirer/filter */ \"./lib/utils/inquirer/filter.ts\"));\nconst transformer_1 = __importDefault(__webpack_require__(/*! utils/inquirer/transformer */ \"./lib/utils/inquirer/transformer.ts\"));\nconst parser_1 = __importDefault(__webpack_require__(/*! utils/parser */ \"./lib/utils/parser.ts\"));\nconst generateMutationService_1 = __importDefault(__webpack_require__(/*! features/add/features/api/services/generateMutationService */ \"./lib/features/add/features/api/services/generateMutationService.ts\"));\nconst generateQueryService_1 = __importDefault(__webpack_require__(/*! features/add/features/api/services/generateQueryService */ \"./lib/features/add/features/api/services/generateQueryService.ts\"));\nconst generateGetItemService_1 = __importDefault(__webpack_require__(/*! features/add/features/api/services/generateGetItemService */ \"./lib/features/add/features/api/services/generateGetItemService.ts\"));\nconst appSyncStackService_1 = __importDefault(__webpack_require__(/*! services/appSyncStackService */ \"./lib/services/appSyncStackService.ts\"));\nconst getLocale_1 = __webpack_require__(/*! features/add/features/api/utils/getLocale */ \"./lib/features/add/features/api/utils/getLocale.ts\");\nclass default_1 extends index_1.FeatureHandlerAbstract {\n    constructor(argv) {\n        super(argv);\n    }\n    get defaultSchemaGrapqlFilePath() {\n        return `appsync/schema.graphql`;\n    }\n    get defaultServerlessConfigPath() {\n        return `serverless/${this.argv.region}/serverless.yml`;\n    }\n    async run() {\n        const logger = logger_1.default.getLogger();\n        const locale = (0, getLocale_1.getLocaleLang)(this.lang);\n        const info = (await inquirer_1.default.prompt([\n            {\n                type: 'input',\n                name: 'apiName',\n                message: locale.inquirer.apiName,\n                filter: (input) => input.replace(/\\s+/g, ''),\n                transformer: (input) => input.replace(/\\s+/g, ''),\n                validate: (value) => new validator_1.default(value, this.lang).required().mustNoIncludeZenkaku().value(),\n            },\n            {\n                type: 'list',\n                name: 'apiType',\n                choices: ['Mutation', 'Query'],\n                message: locale.inquirer.apiType,\n                validate: (value) => new validator_1.default(value, this.lang).required().value(),\n            },\n            {\n                type: 'list',\n                name: 'resolverType',\n                choices: ['UNIT', 'PIPELINE'],\n                message: locale.inquirer.resolverType,\n                validate: (value) => new validator_1.default(value, this.lang).required().value(),\n            },\n            {\n                type: 'input',\n                name: 'serverlessConfigPath',\n                message: locale.inquirer.serverlessConfigPath,\n                default: () => this.defaultServerlessConfigPath,\n                validate: (value) => new validator_1.default(value, this.lang).required().mustBeYamlFilePath().value(),\n                transformer: (input) => new transformer_1.default(input).removeAllSpace().value(),\n                filter: (input) => new filter_1.default(input).removeAllSpace().value(),\n            },\n        ]));\n        logger.debug(`input info values : ${JSON.stringify(info)}}`);\n        const sls = new serverlessConfigService_1.default({ region: this.argv.region, serverlessConfigPath: info.serverlessConfigPath, lang: this.lang });\n        if (!sls.isExistsServelessConfig) {\n            throw new Error(locale.error.notFoundServerlessConfig);\n        }\n        const slsConfig = sls.serverlessConfig;\n        if (!(slsConfig.plugins ?? []).includes('serverless-appsync-plugin')) {\n            throw new Error(locale.error.notInstalledAppSyncPlugin);\n        }\n        const appSyncStackPath = parser_1.default.parseSlsRecursivelyReference(slsConfig.custom?.appSync);\n        if (lodash_1.default.isEmpty(appSyncStackPath)) {\n            throw new Error(`${locale.error.invalidServerlessCustomAppSync} : \\${file(./appsync/stack.yml)}`);\n        }\n        const appSyncStackService = new appSyncStackService_1.default({ stackFilePath: appSyncStackPath, lang: this.lang, region: this.argv.region });\n        const appSyncStack = appSyncStackService.appSyncStack;\n        if (appSyncStack?.mappingTemplates.some((m) => m.type === info.apiType && m.field === info.apiName)) {\n            throw new Error(locale.error.alreadyExistsMappingTemplate);\n        }\n        if (info.resolverType === 'PIPELINE' && appSyncStack?.functionConfigurations.some((m) => m.name === `Mutation${info.apiName}`)) {\n            throw new Error(locale.error.alreadyExistsResolver);\n        }\n        if (info.apiType === 'Mutation') {\n            if (appSyncStack?.schema.isExistsMutationApi(info.apiName))\n                throw new Error(locale.error.alreadyExistsAPI);\n            return (0, generateMutationService_1.default)({ appSyncStackService: appSyncStackService, lang: this.lang, slsConfig: sls, info });\n        }\n        if (info.apiType === 'Query') {\n            if (appSyncStack?.schema.isExistsQueryApi(info.apiName))\n                throw new Error(locale.error.alreadyExistsAPI);\n            const { queryOperation } = (await inquirer_1.default.prompt([\n                {\n                    type: 'list',\n                    name: 'queryOperation',\n                    choices: ['Query', 'GetItem'],\n                    message: locale.inquirer.queryOperation,\n                    validate: (value) => new validator_1.default(value, this.lang).required().value(),\n                },\n            ]));\n            if (queryOperation === 'Query')\n                return (0, generateQueryService_1.default)({ appSyncStackService: appSyncStackService, lang: this.lang, slsConfig: sls, info });\n            if (queryOperation === 'GetItem')\n                return (0, generateGetItemService_1.default)({ appSyncStackService: appSyncStackService, lang: this.lang, slsConfig: sls, info });\n        }\n    }\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/api/handler.ts?"
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
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    error: {\n        notFoundServerlessConfig: 'Serverless.yml does not exist',\n        notInstalledAppSyncPlugin: 'serverless-appsync-plugin is not installed',\n        invalidServerlessCustomAppSync: 'The custom.appsync in serverless.yml is incorrect, custom.appsync must have the following string set',\n        alreadyExistsMappingTemplate: 'A definition already exists in the mapping template',\n        alreadyExistsResolver: 'A definition already exists in the resolver',\n        alreadyExistsAPI: 'A definition already exists in the API',\n    },\n    inquirer: {\n        apiName: 'Enter API name',\n        apiType: 'Select API Type',\n        resolverType: 'Select Resolver Type',\n        serverlessConfigPath: 'Enter the path to serverless.yml',\n        queryOperation: 'Select Query Type',\n    },\n    services: {\n        common: {\n            inquirer: {\n                createDataSource: 'Do you want to create a new data source?',\n                lambdaFunctionName: 'Enter Lambda function name',\n                lambdaHandler: 'Enter the path to the Lambda handler',\n                dataSource: 'Select Data Source',\n                template: 'Select a template',\n                primaryKeyName: 'Enter primary key name',\n                sortKeyName: 'Enter sort key name',\n                indexName: 'Enter index name',\n            },\n            error: {\n                notFoundDataSource: 'Data source does not exist, data source must be created',\n            },\n        },\n        generateQueryService: {\n            inquirer: {\n                gsiName: 'Enter GSI name',\n            },\n        },\n    },\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/api/locale/en.ts?"
        );

        /***/
      },

    /***/ './lib/features/add/features/api/locale/ja.ts':
      /*!****************************************************!*\
  !*** ./lib/features/add/features/api/locale/ja.ts ***!
  \****************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    error: {\n        notFoundServerlessConfig: 'serverless.ymlが存在しません',\n        notInstalledAppSyncPlugin: 'serverless-appsync-pluginがインストールされていません',\n        invalidServerlessCustomAppSync: 'serverless.ymlのcustom.appsyncが不正です、custom.appsyncには、以下のような文字列が設定されている必要があります',\n        alreadyExistsMappingTemplate: '既にマッピングテンプレートに定義が存在します',\n        alreadyExistsResolver: '既にリゾルバーに定義が存在します',\n        alreadyExistsAPI: '既にAPIに定義が存在します',\n    },\n    inquirer: {\n        apiName: 'API名を入力',\n        apiType: 'APIタイプを選択',\n        resolverType: 'リゾルバータイプを選択',\n        serverlessConfigPath: 'serverless.ymlのパスを入力',\n        queryOperation: 'Queryのタイプを選択',\n    },\n    services: {\n        common: {\n            inquirer: {\n                createDataSource: 'データソースを新しく作成しますか？',\n                lambdaFunctionName: 'Lambda関数名を入力',\n                lambdaHandler: 'Lambdaハンドラーのパスを入力',\n                dataSource: 'データソースを選択',\n                template: 'テンプレートを選択',\n                primaryKeyName: 'プライマリーキー名を入力',\n                sortKeyName: 'ソートキー名を入力',\n                indexName: 'インデックス名を入力',\n            },\n            error: {\n                notFoundDataSource: 'データソースが存在しません、データソースを作成する必要があります',\n            },\n        },\n        generateQueryService: {\n            inquirer: {\n                gsiName: 'GSI名を入力',\n            },\n        },\n    },\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/api/locale/ja.ts?"
        );

        /***/
      },

    /***/ './lib/features/add/features/api/services/generateGetItemService.ts':
      /*!**************************************************************************!*\
  !*** ./lib/features/add/features/api/services/generateGetItemService.ts ***!
  \**************************************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          "\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ \"./lib/utils/logger.ts\"));\nconst inquirer_1 = __importDefault(__webpack_require__(/*! inquirer */ \"inquirer\"));\nconst validator_1 = __importDefault(__webpack_require__(/*! utils/validator */ \"./lib/utils/validator/index.ts\"));\nconst codeService_1 = __importDefault(__webpack_require__(/*! services/codeService */ \"./lib/services/codeService/index.ts\"));\nconst path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nconst graphql_1 = __webpack_require__(/*! graphql */ \"graphql\");\nconst getLocale_1 = __webpack_require__(/*! features/add/features/api/utils/getLocale */ \"./lib/features/add/features/api/utils/getLocale.ts\");\nconst inquirer_2 = __webpack_require__(/*! features/add/features/api/utils/inquirer */ \"./lib/features/add/features/api/utils/inquirer.ts\");\nexports[\"default\"] = async (args) => {\n    const { appSyncStackService, lang, slsConfig, info } = args;\n    const logger = logger_1.default.getLogger();\n    const locale = (0, getLocale_1.getLocaleLang)(lang);\n    logger.debug(`appsyncStack : ${JSON.stringify(appSyncStackService.appSyncStack)}`);\n    const createDataSource = await (0, inquirer_2.isCreateDataSource)({\n        lang,\n        dataSource: appSyncStackService.appSyncStack?.dataSources ?? [],\n    });\n    const dataSourceProcess = async () => {\n        if (createDataSource) {\n            return await (0, inquirer_2.addLambda)({\n                appSyncStackService,\n                lang,\n                slsConfig,\n                info,\n            });\n        }\n        return await (0, inquirer_2.selectDataSource)({\n            lang,\n            appSyncStackService,\n            slsConfig,\n        });\n    };\n    const getTemplate = async (dataSource) => {\n        if (dataSource.type === 'AMAZON_DYNAMODB') {\n            const { template, primaryKeyName, sortKeyName } = (await inquirer_1.default.prompt([\n                {\n                    type: 'list',\n                    name: 'template',\n                    choices: ['getItem', 'getItemConsistentRead', 'localResolver'],\n                    message: locale.services.common.inquirer.template,\n                    validate: (value) => new validator_1.default(value, lang).required().value(),\n                },\n                {\n                    type: 'input',\n                    name: 'primaryKeyName',\n                    message: locale.services.common.inquirer.primaryKeyName,\n                    default: () => 'Id',\n                    filter: (input) => input.replace(/\\s+/g, ''),\n                    transformer: (input) => input.replace(/\\s+/g, ''),\n                    validate: (value) => new validator_1.default(value, lang).required().mustNoIncludeZenkaku().value(),\n                },\n                {\n                    type: 'input',\n                    name: 'sortKeyName',\n                    message: locale.services.common.inquirer.sortKeyName,\n                    default: () => 'Sk',\n                    filter: (input) => input.replace(/\\s+/g, ''),\n                    transformer: (input) => input.replace(/\\s+/g, ''),\n                    validate: (value) => new validator_1.default(value, lang).required().mustNoIncludeZenkaku().value(),\n                },\n            ]));\n            if (template === 'getItem') {\n                return {\n                    before: codeService_1.default.templates.vtl.addDynamoGetItemRequest({ consistentRead: false, primaryKeyName, sortKeyName }),\n                    after: codeService_1.default.templates.vtl.addDynamoGetItemResponse,\n                };\n            }\n            if (template === 'getItemConsistentRead') {\n                return {\n                    before: codeService_1.default.templates.vtl.addDynamoGetItemRequest({ consistentRead: true, primaryKeyName, sortKeyName }),\n                    after: codeService_1.default.templates.vtl.addDynamoGetItemResponse,\n                };\n            }\n            if (template === 'localResolver') {\n                return {\n                    before: codeService_1.default.templates.vtl.localResolverRequest,\n                    after: codeService_1.default.templates.vtl.localResolverResponse,\n                };\n            }\n        }\n        else if (dataSource.type === 'AMAZON_ELASTICSEARCH') {\n            const { indexName } = (await inquirer_1.default.prompt([\n                {\n                    type: 'input',\n                    name: 'indexName',\n                    message: locale.services.common.inquirer.indexName,\n                    default: () => info.apiName,\n                    filter: (input) => input.replace(/\\s+/g, ''),\n                    transformer: (input) => input.replace(/\\s+/g, ''),\n                    validate: (value) => new validator_1.default(value, lang).required().mustNoIncludeZenkaku().value(),\n                },\n            ]));\n            return {\n                before: codeService_1.default.templates.vtl.openSearchQueryRequest({ indexName }),\n                after: codeService_1.default.templates.vtl.openSearchQueryResponse,\n            };\n        }\n        else if (dataSource.type === 'RELATIONAL_DATABASE') {\n            return {\n                before: codeService_1.default.templates.vtl.rdbQueryRequest,\n                after: codeService_1.default.templates.vtl.rdbQueryResponse,\n            };\n        }\n        else if (dataSource.type === 'HTTP') {\n            return {\n                before: codeService_1.default.templates.vtl.httpQueryRequest,\n                after: codeService_1.default.templates.vtl.httpQueryResponse,\n            };\n        }\n        return {\n            before: '{}',\n            after: '{}',\n        };\n    };\n    const functionConfigurationsProcess = async (args) => {\n        const { dataSource } = args;\n        if (info.resolverType === 'UNIT')\n            return Promise.resolve(undefined);\n        // pipeline resolver\n        const basePath = appSyncStackService.appSyncStack?.functionConfigurationsLocation ?? './';\n        const functionConfiguration = {\n            dataSource: dataSource.name,\n            name: `${info.apiType}${lodash_1.default.upperFirst(info.apiName)}`,\n            request: dataSource.type === 'AWS_LAMBDA' ? false : `functions/${info.apiType}.${info.apiName}.request.vtl`,\n            response: dataSource.type === 'AWS_LAMBDA' ? false : `functions/${info.apiType}.${info.apiName}.response.vtl`,\n        };\n        if (dataSource.type !== 'AWS_LAMBDA') {\n            const { before, after } = await getTemplate(dataSource);\n            if (lodash_1.default.isString(functionConfiguration.request)) {\n                new codeService_1.default({\n                    filePath: path_1.default.join(basePath, functionConfiguration.request),\n                    code: before,\n                    type: 'vtl',\n                }).write();\n            }\n            if (lodash_1.default.isString(functionConfiguration.response)) {\n                new codeService_1.default({\n                    filePath: path_1.default.join(basePath, functionConfiguration.response),\n                    code: after,\n                    type: 'vtl',\n                }).write();\n            }\n        }\n        appSyncStackService.addFunctionConfiguration({\n            functionConfiguration,\n        });\n        logger.debug('finished functionConfigurationsProcess');\n        return Promise.resolve(functionConfiguration);\n    };\n    const mappingTemplateProcess = async (args) => {\n        const { dataSource, functionConfigurations } = args;\n        const generateDataSource = async () => {\n            if (info.resolverType === 'PIPELINE') {\n                const basePath = appSyncStackService.appSyncStack?.mappingTemplatesLocation ?? './';\n                const res = {\n                    type: info.apiType,\n                    request: `queries/${info.apiType}.${info.apiName}.request.vtl`,\n                    response: `queries/${info.apiType}.${info.apiName}.response.vtl`,\n                    field: info.apiName,\n                    kind: info.resolverType,\n                    functions: [functionConfigurations?.name],\n                };\n                new codeService_1.default({ filePath: path_1.default.join(basePath, res.request), code: codeService_1.default.templates.vtl.pipelineBefore, type: 'vtl' }).write();\n                new codeService_1.default({ filePath: path_1.default.join(basePath, res.response), code: codeService_1.default.templates.vtl.pipelineAfter, type: 'vtl' }).write();\n                return res;\n            }\n            // unit resolver\n            const mappingTemplate = {\n                dataSource: dataSource.name,\n                type: info.apiType,\n                field: info.apiName,\n                kind: info.resolverType,\n                request: dataSource.type === 'AWS_LAMBDA' ? false : `queries/${info.apiType}.${info.apiName}.request.vtl`,\n                response: dataSource.type === 'AWS_LAMBDA' ? false : `queries/${info.apiType}.${info.apiName}.response.vtl`,\n            };\n            if (dataSource.type !== 'AWS_LAMBDA') {\n                const basePath = appSyncStackService.appSyncStack?.mappingTemplatesLocation ?? './';\n                const { before, after } = await getTemplate(dataSource);\n                if (lodash_1.default.isString(mappingTemplate.request)) {\n                    new codeService_1.default({\n                        filePath: path_1.default.join(basePath, mappingTemplate.request),\n                        code: before,\n                        type: 'vtl',\n                    }).write();\n                }\n                if (lodash_1.default.isString(mappingTemplate.response)) {\n                    new codeService_1.default({\n                        filePath: path_1.default.join(basePath, mappingTemplate.response),\n                        code: after,\n                        type: 'vtl',\n                    }).write();\n                }\n            }\n            return mappingTemplate;\n        };\n        const mappingTemplate = await generateDataSource();\n        appSyncStackService.addMappingTemplate({\n            mappingTemplate,\n        });\n        logger.debug('finished mappingTemplateProcess');\n        return mappingTemplate;\n    };\n    const schemaGraphqlProcess = async () => {\n        const graphqlEditor = appSyncStackService.graphqlEditor;\n        const type = appSyncStackService.graphqlEditor.addExampleType(info.apiName);\n        appSyncStackService.updateCustomSchemaGraphl({\n            query: {\n                apiName: info.apiName,\n                type: type.getType(),\n                args: {\n                    example: {\n                        type: graphql_1.GraphQLString,\n                    },\n                },\n            },\n        });\n        logger.debug('finished scheneGraphqlProcess');\n        return Promise.resolve(graphqlEditor.customSchema);\n    };\n    const resDataSource = await dataSourceProcess();\n    const resFunctionConfigurations = await functionConfigurationsProcess({ dataSource: resDataSource });\n    const resMappingTemplate = await mappingTemplateProcess({ dataSource: resDataSource, functionConfigurations: resFunctionConfigurations });\n    const resSchemaGraphql = await schemaGraphqlProcess();\n    logger.debug({\n        dataSource: resDataSource,\n        functionConfigurations: resFunctionConfigurations,\n        mappingTemplate: resMappingTemplate,\n        schemaGraphql: resSchemaGraphql,\n    });\n};\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/api/services/generateGetItemService.ts?"
        );

        /***/
      },

    /***/ './lib/features/add/features/api/services/generateMutationService.ts':
      /*!***************************************************************************!*\
  !*** ./lib/features/add/features/api/services/generateMutationService.ts ***!
  \***************************************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ "./lib/utils/logger.ts"));\nconst codeService_1 = __importDefault(__webpack_require__(/*! services/codeService */ "./lib/services/codeService/index.ts"));\nconst path_1 = __importDefault(__webpack_require__(/*! path */ "path"));\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));\nconst inquirer_1 = __webpack_require__(/*! features/add/features/api/utils/inquirer */ "./lib/features/add/features/api/utils/inquirer.ts");\nexports["default"] = async (args) => {\n    const { appSyncStackService, lang, slsConfig, info } = args;\n    const logger = logger_1.default.getLogger();\n    logger.debug(`appsyncStack : ${JSON.stringify(appSyncStackService.appSyncStack)}`);\n    const createDataSource = await (0, inquirer_1.isCreateDataSource)({\n        lang,\n        dataSource: appSyncStackService.appSyncStack?.dataSources ?? [],\n    });\n    const dataSourceProcess = async () => {\n        if (createDataSource) {\n            return await (0, inquirer_1.addLambda)({\n                appSyncStackService,\n                lang,\n                slsConfig,\n                info,\n            });\n        }\n        return await (0, inquirer_1.selectDataSource)({\n            lang,\n            appSyncStackService,\n            slsConfig,\n        });\n    };\n    const functionConfigurationsProcess = (args) => {\n        const { dataSource } = args;\n        if (info.resolverType === \'UNIT\')\n            return Promise.resolve(undefined);\n        // pipeline resolver\n        const functionConfiguration = {\n            dataSource: dataSource.name,\n            name: `${info.apiType}${lodash_1.default.upperFirst(info.apiName)}`,\n            request: false,\n            response: false,\n        };\n        appSyncStackService.addFunctionConfiguration({\n            functionConfiguration,\n        });\n        logger.debug(\'finished functionConfigurationsProcess\');\n        return Promise.resolve(functionConfiguration);\n    };\n    const mappingTemplateProcess = async (args) => {\n        const { dataSource, functionConfigurations } = args;\n        const generateDataSource = () => {\n            if (info.resolverType === \'PIPELINE\') {\n                const basePath = appSyncStackService.appSyncStack?.mappingTemplatesLocation ?? \'./\';\n                const res = {\n                    type: info.apiType,\n                    request: `mutations/${info.apiType}.${info.apiName}.request.vtl`,\n                    response: `mutations/${info.apiType}.${info.apiName}.response.vtl`,\n                    field: info.apiName,\n                    kind: info.resolverType,\n                    functions: [functionConfigurations?.name],\n                };\n                new codeService_1.default({ filePath: path_1.default.join(basePath, res.request), code: codeService_1.default.templates.vtl.pipelineBefore, type: \'vtl\' }).write();\n                new codeService_1.default({ filePath: path_1.default.join(basePath, res.response), code: codeService_1.default.templates.vtl.pipelineAfter, type: \'vtl\' }).write();\n                return res;\n            }\n            // unit resolver\n            return {\n                dataSource: dataSource.name,\n                type: info.apiType,\n                field: info.apiName,\n                kind: info.resolverType,\n                request: false,\n                response: false,\n            };\n        };\n        const mappingTemplate = generateDataSource();\n        appSyncStackService.addMappingTemplate({\n            mappingTemplate,\n        });\n        logger.debug(\'finished mappingTemplateProcess\');\n        return mappingTemplate;\n    };\n    const schemaGraphqlProcess = async () => {\n        const graphqlEditor = appSyncStackService.graphqlEditor;\n        const type = appSyncStackService.graphqlEditor.addExampleType(info.apiName);\n        const input = appSyncStackService.graphqlEditor.addExampleInput(info.apiName);\n        appSyncStackService.updateCustomSchemaGraphl({\n            mutation: {\n                apiName: info.apiName,\n                type: type.getType(),\n                input: input.getType(),\n            },\n        });\n        logger.debug(\'finished scheneGraphqlProcess\');\n        return Promise.resolve(graphqlEditor.customSchema);\n    };\n    const resDataSource = await dataSourceProcess();\n    const resFunctionConfigurations = await functionConfigurationsProcess({ dataSource: resDataSource });\n    const resMappingTemplate = await mappingTemplateProcess({ dataSource: resDataSource, functionConfigurations: resFunctionConfigurations });\n    const resSchemaGraphql = await schemaGraphqlProcess();\n    logger.debug({\n        dataSource: resDataSource,\n        functionConfigurations: resFunctionConfigurations,\n        mappingTemplate: resMappingTemplate,\n        schemaGraphql: resSchemaGraphql,\n    });\n};\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/api/services/generateMutationService.ts?'
        );

        /***/
      },

    /***/ './lib/features/add/features/api/services/generateQueryService.ts':
      /*!************************************************************************!*\
  !*** ./lib/features/add/features/api/services/generateQueryService.ts ***!
  \************************************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          "\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ \"./lib/utils/logger.ts\"));\nconst inquirer_1 = __importDefault(__webpack_require__(/*! inquirer */ \"inquirer\"));\nconst validator_1 = __importDefault(__webpack_require__(/*! utils/validator */ \"./lib/utils/validator/index.ts\"));\nconst codeService_1 = __importDefault(__webpack_require__(/*! services/codeService */ \"./lib/services/codeService/index.ts\"));\nconst path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nconst graphql_1 = __webpack_require__(/*! graphql */ \"graphql\");\nconst getLocale_1 = __webpack_require__(/*! features/add/features/api/utils/getLocale */ \"./lib/features/add/features/api/utils/getLocale.ts\");\nconst inquirer_2 = __webpack_require__(/*! features/add/features/api/utils/inquirer */ \"./lib/features/add/features/api/utils/inquirer.ts\");\nexports[\"default\"] = async (args) => {\n    const { appSyncStackService, lang, slsConfig, info } = args;\n    const logger = logger_1.default.getLogger();\n    logger.debug(`appsyncStack : ${JSON.stringify(appSyncStackService.appSyncStack)}`);\n    const locale = (0, getLocale_1.getLocaleLang)(lang);\n    const createDataSource = await (0, inquirer_2.isCreateDataSource)({\n        lang,\n        dataSource: appSyncStackService.appSyncStack?.dataSources ?? [],\n    });\n    const dataSourceProcess = async () => {\n        if (createDataSource) {\n            return await (0, inquirer_2.addLambda)({\n                appSyncStackService,\n                lang,\n                slsConfig,\n                info,\n            });\n        }\n        return await (0, inquirer_2.selectDataSource)({\n            lang,\n            appSyncStackService,\n            slsConfig,\n        });\n    };\n    const getTemplate = async (dataSource) => {\n        if (dataSource.type === 'AMAZON_DYNAMODB') {\n            const { template, primaryKeyName, sortKeyName } = (await inquirer_1.default.prompt([\n                {\n                    type: 'list',\n                    name: 'template',\n                    choices: ['query', 'queryWithGsi', 'scan'],\n                    message: locale.services.common.inquirer.template,\n                    validate: (value) => new validator_1.default(value, lang).required().value(),\n                },\n                {\n                    type: 'input',\n                    name: 'primaryKeyName',\n                    message: locale.services.common.inquirer.primaryKeyName,\n                    default: () => 'Id',\n                    filter: (input) => input.replace(/\\s+/g, ''),\n                    transformer: (input) => input.replace(/\\s+/g, ''),\n                    validate: (value) => new validator_1.default(value, lang).required().mustNoIncludeZenkaku().value(),\n                },\n                {\n                    type: 'input',\n                    name: 'sortKeyName',\n                    message: locale.services.common.inquirer.sortKeyName,\n                    default: () => 'Sk',\n                    filter: (input) => input.replace(/\\s+/g, ''),\n                    transformer: (input) => input.replace(/\\s+/g, ''),\n                    validate: (value) => new validator_1.default(value, lang).required().mustNoIncludeZenkaku().value(),\n                },\n            ]));\n            if (template === 'query') {\n                return {\n                    before: codeService_1.default.templates.vtl.addDynamoQueryRequest({ primaryKeyName, sortKeyName }),\n                    after: codeService_1.default.templates.vtl.addDynamoGetItemResponse,\n                };\n            }\n            if (template === 'queryWithGsi') {\n                const { gsiName } = (await inquirer_1.default.prompt([\n                    {\n                        type: 'input',\n                        name: 'gsiName',\n                        message: locale.services.generateQueryService.inquirer.gsiName,\n                        default: () => 'ExampleIndex',\n                        filter: (input) => input.replace(/\\s+/g, ''),\n                        transformer: (input) => input.replace(/\\s+/g, ''),\n                        validate: (value) => new validator_1.default(value, lang).required().mustNoIncludeZenkaku().value(),\n                    },\n                ]));\n                return {\n                    before: codeService_1.default.templates.vtl.addDynamoQueryRequest({ gsiName, primaryKeyName, sortKeyName }),\n                    after: codeService_1.default.templates.vtl.addDynamoGetItemResponse,\n                };\n            }\n            if (template === 'scan') {\n                return {\n                    before: codeService_1.default.templates.vtl.dynamoScanRequest,\n                    after: codeService_1.default.templates.vtl.dynamoScanResponse,\n                };\n            }\n        }\n        else if (dataSource.type === 'AMAZON_ELASTICSEARCH') {\n            const { indexName } = (await inquirer_1.default.prompt([\n                {\n                    type: 'input',\n                    name: 'indexName',\n                    message: locale.services.common.inquirer.indexName,\n                    default: () => info.apiName,\n                    filter: (input) => input.replace(/\\s+/g, ''),\n                    transformer: (input) => input.replace(/\\s+/g, ''),\n                    validate: (value) => new validator_1.default(value, lang).required().mustNoIncludeZenkaku().value(),\n                },\n            ]));\n            return {\n                before: codeService_1.default.templates.vtl.openSearchQueryRequest({ indexName }),\n                after: codeService_1.default.templates.vtl.openSearchQueryResponse,\n            };\n        }\n        else if (dataSource.type === 'RELATIONAL_DATABASE') {\n            return {\n                before: codeService_1.default.templates.vtl.rdbQueryRequest,\n                after: codeService_1.default.templates.vtl.rdbQueryResponse,\n            };\n        }\n        else if (dataSource.type === 'HTTP') {\n            return {\n                before: codeService_1.default.templates.vtl.httpQueryRequest,\n                after: codeService_1.default.templates.vtl.httpQueryResponse,\n            };\n        }\n        return {\n            before: '{}',\n            after: '{}',\n        };\n    };\n    const functionConfigurationsProcess = async (args) => {\n        const { dataSource } = args;\n        if (info.resolverType === 'UNIT')\n            return Promise.resolve(undefined);\n        // pipeline resolver\n        const basePath = appSyncStackService.appSyncStack?.functionConfigurationsLocation ?? './';\n        const functionConfiguration = {\n            dataSource: dataSource.name,\n            name: `${info.apiType}${lodash_1.default.upperFirst(info.apiName)}`,\n            request: dataSource.type === 'AWS_LAMBDA' ? false : `functions/${info.apiType}.${info.apiName}.request.vtl`,\n            response: dataSource.type === 'AWS_LAMBDA' ? false : `functions/${info.apiType}.${info.apiName}.response.vtl`,\n        };\n        if (dataSource.type !== 'AWS_LAMBDA') {\n            const { before, after } = await getTemplate(dataSource);\n            if (lodash_1.default.isString(functionConfiguration.request)) {\n                new codeService_1.default({\n                    filePath: path_1.default.join(basePath, functionConfiguration.request),\n                    code: before,\n                    type: 'vtl',\n                }).write();\n            }\n            if (lodash_1.default.isString(functionConfiguration.response)) {\n                new codeService_1.default({\n                    filePath: path_1.default.join(basePath, functionConfiguration.response),\n                    code: after,\n                    type: 'vtl',\n                }).write();\n            }\n        }\n        appSyncStackService.addFunctionConfiguration({\n            functionConfiguration,\n        });\n        logger.debug('finished functionConfigurationsProcess');\n        return Promise.resolve(functionConfiguration);\n    };\n    const mappingTemplateProcess = async (args) => {\n        const { dataSource, functionConfigurations } = args;\n        const generateDataSource = async () => {\n            if (info.resolverType === 'PIPELINE') {\n                const basePath = appSyncStackService.appSyncStack?.mappingTemplatesLocation ?? './';\n                const res = {\n                    type: info.apiType,\n                    request: `queries/${info.apiType}.${info.apiName}.request.vtl`,\n                    response: `queries/${info.apiType}.${info.apiName}.response.vtl`,\n                    field: info.apiName,\n                    kind: info.resolverType,\n                    functions: [functionConfigurations?.name],\n                };\n                new codeService_1.default({ filePath: path_1.default.join(basePath, res.request), code: codeService_1.default.templates.vtl.pipelineBefore, type: 'vtl' }).write();\n                new codeService_1.default({ filePath: path_1.default.join(basePath, res.response), code: codeService_1.default.templates.vtl.pipelineAfter, type: 'vtl' }).write();\n                return res;\n            }\n            // unit resolver\n            const mappingTemplate = {\n                dataSource: dataSource.name,\n                type: info.apiType,\n                field: info.apiName,\n                kind: info.resolverType,\n                request: dataSource.type === 'AWS_LAMBDA' ? false : `queries/${info.apiType}.${info.apiName}.request.vtl`,\n                response: dataSource.type === 'AWS_LAMBDA' ? false : `queries/${info.apiType}.${info.apiName}.response.vtl`,\n            };\n            if (dataSource.type !== 'AWS_LAMBDA') {\n                const basePath = appSyncStackService.appSyncStack?.mappingTemplatesLocation ?? './';\n                const { before, after } = await getTemplate(dataSource);\n                if (lodash_1.default.isString(mappingTemplate.request)) {\n                    new codeService_1.default({\n                        filePath: path_1.default.join(basePath, mappingTemplate.request),\n                        code: before,\n                        type: 'vtl',\n                    }).write();\n                }\n                if (lodash_1.default.isString(mappingTemplate.response)) {\n                    new codeService_1.default({\n                        filePath: path_1.default.join(basePath, mappingTemplate.response),\n                        code: after,\n                        type: 'vtl',\n                    }).write();\n                }\n            }\n            return mappingTemplate;\n        };\n        const mappingTemplate = await generateDataSource();\n        appSyncStackService.addMappingTemplate({\n            mappingTemplate,\n        });\n        logger.debug('finished mappingTemplateProcess');\n        return mappingTemplate;\n    };\n    const schemaGraphqlProcess = async () => {\n        const graphqlEditor = appSyncStackService.graphqlEditor;\n        const type = appSyncStackService.graphqlEditor.addExampleType(info.apiName);\n        appSyncStackService.updateCustomSchemaGraphl({\n            query: {\n                apiName: info.apiName,\n                type: type.getType(),\n                args: {\n                    example: {\n                        type: graphql_1.GraphQLString,\n                    },\n                },\n            },\n        });\n        logger.debug('finished scheneGraphqlProcess');\n        return Promise.resolve(graphqlEditor.customSchema);\n    };\n    const resDataSource = await dataSourceProcess();\n    const resFunctionConfigurations = await functionConfigurationsProcess({ dataSource: resDataSource });\n    const resMappingTemplate = await mappingTemplateProcess({ dataSource: resDataSource, functionConfigurations: resFunctionConfigurations });\n    const resSchemaGraphql = await schemaGraphqlProcess();\n    logger.debug({\n        dataSource: resDataSource,\n        functionConfigurations: resFunctionConfigurations,\n        mappingTemplate: resMappingTemplate,\n        schemaGraphql: resSchemaGraphql,\n    });\n};\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/api/services/generateQueryService.ts?"
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

    /***/ './lib/features/add/features/api/utils/inquirer.ts':
      /*!*********************************************************!*\
  !*** ./lib/features/add/features/api/utils/inquirer.ts ***!
  \*********************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          "\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.selectDataSource = exports.addLambda = exports.isCreateDataSource = void 0;\nconst inquirer_1 = __importDefault(__webpack_require__(/*! inquirer */ \"inquirer\"));\nconst validator_1 = __importDefault(__webpack_require__(/*! utils/validator */ \"./lib/utils/validator/index.ts\"));\nconst transformer_1 = __importDefault(__webpack_require__(/*! utils/inquirer/transformer */ \"./lib/utils/inquirer/transformer.ts\"));\nconst filter_1 = __importDefault(__webpack_require__(/*! utils/inquirer/filter */ \"./lib/utils/inquirer/filter.ts\"));\nconst codeService_1 = __importDefault(__webpack_require__(/*! services/codeService */ \"./lib/services/codeService/index.ts\"));\nconst yargonaut_1 = __webpack_require__(/*! utils/yargonaut */ \"./lib/utils/yargonaut.ts\");\nconst getLocale_1 = __webpack_require__(/*! features/add/features/api/utils/getLocale */ \"./lib/features/add/features/api/utils/getLocale.ts\");\nconst isCreateDataSource = async (args) => {\n    const { lang, dataSource } = args;\n    const locale = (0, getLocale_1.getLocaleLang)(lang);\n    const { createDataSource } = (await inquirer_1.default.prompt([\n        {\n            type: 'expand',\n            name: 'createDataSource',\n            message: locale.services.common.inquirer.createDataSource,\n            choices: [\n                {\n                    key: 'y',\n                    name: 'yes',\n                    value: true,\n                },\n                {\n                    key: 'n',\n                    name: 'no',\n                    value: false,\n                },\n            ],\n            validate: (value) => new validator_1.default(value, lang).required().value(),\n        },\n    ]));\n    if (createDataSource) {\n        return createDataSource;\n    }\n    else if (dataSource.length === 0) {\n        console.log(yargonaut_1.chalk.red(locale.services.common.error.notFoundDataSource));\n        return (0, exports.isCreateDataSource)(args);\n    }\n    else {\n        return false;\n    }\n};\nexports.isCreateDataSource = isCreateDataSource;\nconst addLambda = async (args) => {\n    const { lang, slsConfig, info, appSyncStackService } = args;\n    const { apiName, apiType } = info;\n    const locale = (0, getLocale_1.getLocaleLang)(lang);\n    const { lambdaFunctionName, lambdaHandler } = (await inquirer_1.default.prompt([\n        {\n            type: 'input',\n            name: 'lambdaFunctionName',\n            message: locale.services.common.inquirer.lambdaFunctionName,\n            default: () => apiName,\n            filter: (input) => input.replace(/\\s+/g, ''),\n            transformer: (input) => input.replace(/\\s+/g, ''),\n            validate: (value) => new validator_1.default(value, lang).required().mustNoIncludeZenkaku().value(),\n        },\n        {\n            type: 'input',\n            name: 'lambdaHandler',\n            message: locale.services.common.inquirer.lambdaHandler,\n            default: () => `src/functions/appsync/${apiName}.handler`,\n            validate: (value) => new validator_1.default(value, lang).required().mustBeExtension().value(),\n            transformer: (input) => new transformer_1.default(input).removeAllSpace().value(),\n            filter: (input) => new filter_1.default(input).removeAllSpace().value(),\n        },\n    ]));\n    slsConfig.addFunction({\n        lambdaFunctionName,\n        lambdaHandler,\n        code: codeService_1.default.templates.typescript.skeleton,\n    });\n    const dataSource = {\n        type: 'AWS_LAMBDA',\n        name: lambdaFunctionName,\n        description: `It is for ${apiType}.${apiName}`,\n        config: {\n            functionName: { Ref: `${lambdaFunctionName}LambdaFunction` },\n            lambdaFunctionArn: { 'Fn::GetAtt': [`${lambdaFunctionName}LambdaFunction`, 'Arn'] },\n            serviceRoleArn: { 'Fn::GetAtt': [appSyncStackService.appSyncLambdaRoleName, 'Arn'] },\n        },\n    };\n    appSyncStackService.addIamRoleByDataSource({\n        dataSource: 'AWS_LAMBDA',\n        sls: slsConfig,\n    });\n    appSyncStackService.addDataSource(dataSource);\n    return dataSource;\n};\nexports.addLambda = addLambda;\nconst selectDataSource = async (args) => {\n    const { appSyncStackService, lang, slsConfig } = args;\n    const locale = (0, getLocale_1.getLocaleLang)(lang);\n    const { dataSource } = (await inquirer_1.default.prompt([\n        {\n            type: 'list',\n            name: 'dataSource',\n            choices: appSyncStackService.appSyncStack?.dataSources.map((d) => d.name),\n            message: locale.services.common.inquirer.dataSource,\n            validate: (value) => new validator_1.default(value, lang).required().value(),\n        },\n    ]));\n    const selectedDataSource = appSyncStackService.appSyncStack?.dataSources.find((d) => d.name === dataSource);\n    appSyncStackService.addIamRoleByDataSource({\n        dataSource: selectedDataSource.type,\n        sls: slsConfig,\n    });\n    return selectedDataSource;\n};\nexports.selectDataSource = selectDataSource;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/api/utils/inquirer.ts?"
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
          "\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ \"./lib/utils/logger.ts\"));\nconst index_1 = __webpack_require__(/*! types/index */ \"./lib/types/index.ts\");\nconst inquirer_1 = __importDefault(__webpack_require__(/*! inquirer */ \"inquirer\"));\nconst validator_1 = __importDefault(__webpack_require__(/*! utils/validator */ \"./lib/utils/validator/index.ts\"));\nconst transformer_1 = __importDefault(__webpack_require__(/*! utils/inquirer/transformer */ \"./lib/utils/inquirer/transformer.ts\"));\nconst filter_1 = __importDefault(__webpack_require__(/*! utils/inquirer/filter */ \"./lib/utils/inquirer/filter.ts\"));\nconst iam = __importStar(__webpack_require__(/*! @aws-cdk/aws-iam */ \"@aws-cdk/aws-iam\"));\nconst cdk = __importStar(__webpack_require__(/*! aws-cdk-lib */ \"aws-cdk-lib\"));\nconst codeService_1 = __importDefault(__webpack_require__(/*! services/codeService */ \"./lib/services/codeService/index.ts\"));\nconst serverlessConfigService_1 = __importDefault(__webpack_require__(/*! services/serverlessConfigService */ \"./lib/services/serverlessConfigService.ts\"));\nconst cloudformationService_1 = __importDefault(__webpack_require__(/*! services/cloudformationService */ \"./lib/services/cloudformationService.ts\"));\nconst serverlessConfigService_2 = __importDefault(__webpack_require__(/*! services/serverlessConfigService */ \"./lib/services/serverlessConfigService.ts\"));\nclass default_1 extends index_1.FeatureHandlerAbstract {\n    constructor(argv) {\n        super(argv);\n    }\n    // lambda edge must be in us-east-1\n    defaultServerlessConfigPath = `serverless/us-east-1/serverless.yml`;\n    defaultFunctionYamlPath = `serverless/us-east-1/resources/functions.yml`;\n    defaultIamRolePath = `serverless/us-east-1/resources/iamrole/defaultLambdarole.yml`;\n    defaultBasicLambdaPath = `src/functions/lambdaedge/basicAuth.handler`;\n    defaultLambdaRoleName = 'DefaultLambdaRole';\n    lambdaEdgeTimeout = 5;\n    lambdaEdgeMemorySize = 128;\n    generateLambdaIamRoleCf() {\n        return cloudformationService_1.default.generateCloudFormation(this.defaultLambdaRoleName, (c) => {\n            const role = new iam.Role(c, this.defaultLambdaRoleName, {\n                assumedBy: new iam.ServicePrincipal('edgelambda.amazonaws.com'),\n            });\n            role.addToPolicy(new iam.PolicyStatement({\n                effect: iam.Effect.ALLOW,\n                resources: [cdk.Fn.join(':', ['arn:aws:logs', cdk.Fn.ref('AWS::Region'), cdk.Fn.ref('AWS::AccountId'), 'log-group:/aws/lambda/*:*:*'])],\n                actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],\n            }));\n            role.addToPolicy(new iam.PolicyStatement({\n                effect: iam.Effect.ALLOW,\n                resources: [cdk.Fn.join(':', ['arn:aws:logs', this.argv.region, cdk.Fn.ref('AWS::AccountId'), 'log-group:/aws/lambda/*:*:*'])],\n                actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],\n            }));\n            return role;\n        });\n    }\n    get defaultServerlessConfig() {\n        return serverlessConfigService_1.default.generateServerlessConfig({\n            service: 'basic-lambda-auth',\n            provider: {\n                region: 'us-east-1',\n                environment: {\n                    LOG_LEVEL: 'WARN',\n                },\n                iam: { role: this.defaultLambdaRoleName },\n            },\n            custom: {\n                awsResourcePrefix: '${self:service}-${self:provider.region}-${self:provider.stage}-',\n            },\n            functions: `\\${file(./${this.defaultFunctionYamlPath})}`,\n            resources: [`\\${file(./${this.defaultIamRolePath})}`],\n        });\n    }\n    async prompt() {\n        const res = (await inquirer_1.default\n            .prompt([\n            {\n                type: 'input',\n                name: 'functionName',\n                message: 'input a functions name',\n                default: 'BasicAuth',\n                validate: (value) => new validator_1.default(value, this.lang).required().mustNoIncludeZenkaku().value(),\n                transformer: (input) => new transformer_1.default(input).removeAllSpace().value(),\n                filter: (input) => new filter_1.default(input).removeAllSpace().value(),\n            },\n            {\n                type: 'input',\n                name: 'lamndaRoleCfPath',\n                message: 'input a lambda iam role cloudformation path',\n                default: () => this.defaultIamRolePath,\n                validate: (value) => new validator_1.default(value, this.lang).required().mustBeYamlFilePath().value(),\n                transformer: (input) => new transformer_1.default(input).removeAllSpace().value(),\n                filter: (input) => new filter_1.default(input).removeAllSpace().value(),\n            },\n            {\n                type: 'input',\n                name: 'lambdaHandler',\n                message: 'input a lambda handler path',\n                default: () => this.defaultBasicLambdaPath,\n                validate: (value) => new validator_1.default(value, this.lang).required().mustBeExtension().value(),\n                transformer: (input) => new transformer_1.default(input).removeAllSpace().value(),\n                filter: (input) => new filter_1.default(input).removeAllSpace().value(),\n            },\n            {\n                type: 'input',\n                name: 'lamndaRoleName',\n                message: 'input a lambda iam role name',\n                default: () => this.defaultLambdaRoleName,\n                validate: (value) => new validator_1.default(value, this.lang).required().value(),\n                transformer: (input) => new transformer_1.default(input).removeAllSpace().value(),\n                filter: (input) => new filter_1.default(input).removeAllSpace().value(),\n            },\n            {\n                type: 'input',\n                name: 'serverlessConfigPath',\n                message: 'input a serverless config file path',\n                default: () => this.defaultServerlessConfigPath,\n                validate: (value) => new validator_1.default(value, this.lang).required().mustBeYamlFilePath().value(),\n                transformer: (input) => new transformer_1.default(input).removeAllSpace().value(),\n                filter: (input) => new filter_1.default(input).removeAllSpace().value(),\n            },\n        ])\n            .then((answers) => {\n            return answers;\n        }));\n        return res;\n    }\n    async run() {\n        const logger = logger_1.default.getLogger();\n        const res = await this.prompt();\n        logger.debug(`input values : ${JSON.stringify(res)}}`);\n        const { functionName, serverlessConfigPath, lamndaRoleCfPath, lamndaRoleName, lambdaHandler } = res;\n        const sls = new serverlessConfigService_2.default({ region: this.argv.region, serverlessConfigPath, lang: this.lang });\n        if (sls.region !== 'us-east-1')\n            throw new Error('lambda edge must be in us-east-1');\n        sls.addFunction({\n            lambdaFunctionName: functionName,\n            lambdaHandler: lambdaHandler,\n            memorySize: this.lambdaEdgeMemorySize,\n            timeout: this.lambdaEdgeTimeout,\n            code: codeService_1.default.templates.typescript.basicauthlambda,\n        });\n        sls.addResource({\n            filePath: lamndaRoleCfPath,\n            resourceName: lamndaRoleName,\n            cf: this.generateLambdaIamRoleCf(),\n        });\n    }\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/basicauthlambda/handler.ts?"
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
          "\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ \"./lib/utils/logger.ts\"));\nconst index_1 = __webpack_require__(/*! types/index */ \"./lib/types/index.ts\");\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nconst getLocale_1 = __webpack_require__(/*! features/add/features/sns/utils/getLocale */ \"./lib/features/add/features/sns/utils/getLocale.ts\");\nconst inquirer_1 = __importDefault(__webpack_require__(/*! inquirer */ \"inquirer\"));\nconst validator_1 = __importDefault(__webpack_require__(/*! utils/validator */ \"./lib/utils/validator/index.ts\"));\nconst filter_1 = __importDefault(__webpack_require__(/*! utils/inquirer/filter */ \"./lib/utils/inquirer/filter.ts\"));\nconst transformer_1 = __importDefault(__webpack_require__(/*! utils/inquirer/transformer */ \"./lib/utils/inquirer/transformer.ts\"));\nconst cloudformationService_1 = __importDefault(__webpack_require__(/*! services/cloudformationService */ \"./lib/services/cloudformationService.ts\"));\nconst sns = __importStar(__webpack_require__(/*! @aws-cdk/aws-sns */ \"@aws-cdk/aws-sns\"));\nconst sqs = __importStar(__webpack_require__(/*! @aws-cdk/aws-sqs */ \"@aws-cdk/aws-sqs\"));\nconst subs = __importStar(__webpack_require__(/*! @aws-cdk/aws-sns-subscriptions */ \"@aws-cdk/aws-sns-subscriptions\"));\nconst lambda = __importStar(__webpack_require__(/*! @aws-cdk/aws-lambda */ \"@aws-cdk/aws-lambda\"));\nconst cdk = __importStar(__webpack_require__(/*! aws-cdk-lib */ \"aws-cdk-lib\"));\nconst serverlessConfigService_1 = __importDefault(__webpack_require__(/*! services/serverlessConfigService */ \"./lib/services/serverlessConfigService.ts\"));\nclass default_1 extends index_1.FeatureHandlerAbstract {\n    constructor(argv) {\n        super(argv);\n    }\n    defaultResourcePath(resourceName) {\n        return `serverless/${this.argv.region}/resources/sns/${resourceName}.yml`;\n    }\n    get defaultServerlessConfigPath() {\n        return `serverless/${this.argv.region}/serverless.yml`;\n    }\n    generateSnsCf(topicName, subscriptions) {\n        return cloudformationService_1.default.generateCloudFormation(topicName, (c) => {\n            const topic = new sns.Topic(c, topicName, {\n                topicName: topicName,\n            });\n            subscriptions.forEach((s) => {\n                if (s === 'email')\n                    topic.addSubscription(new subs.EmailSubscription('****@****.com'));\n                else if (s === 'lambda')\n                    topic.addSubscription(new subs.LambdaSubscription(lambda.Function.fromFunctionArn(c, `${topicName}Lambda`, `arn:aws:lambda:${this.argv.region}:${cdk.Fn.ref('AWS::AccountId')}:function:*****`)));\n                else if (s === 'sms')\n                    topic.addSubscription(new subs.SmsSubscription(`0000000000`));\n                else if (s === 'url')\n                    topic.addSubscription(new subs.UrlSubscription('https://*****.com'));\n                else if (s === 'sqs')\n                    topic.addSubscription(new subs.SqsSubscription(new sqs.Queue(c, `${topicName}SubscribeQueue`)));\n            });\n            return topic;\n        });\n    }\n    async run() {\n        const logger = logger_1.default.getLogger();\n        const locale = (0, getLocale_1.getLocaleLang)(this.lang);\n        const res = await inquirer_1.default\n            .prompt([\n            {\n                type: 'input',\n                name: 'resourceName',\n                message: 'input a sns resource name',\n                filter: (input) => input.replace(/\\s+/g, ''),\n                transformer: (input) => input.replace(/\\s+/g, ''),\n                validate: (value) => new validator_1.default(value, this.lang).required().mustNoIncludeZenkaku().value(),\n            },\n        ])\n            .then(async (answers) => {\n            const res = (await inquirer_1.default.prompt([\n                {\n                    type: 'checkbox',\n                    name: 'subscriptions',\n                    message: 'select a sns subscriptions',\n                    choices: ['email', 'lambda', 'sms', 'url', 'sqs'],\n                    validate: (value) => {\n                        if (lodash_1.default.isEmpty(value))\n                            return locale.error.reqiredSubscriptions;\n                        return true;\n                    },\n                },\n                {\n                    type: 'input',\n                    name: 'filePath',\n                    message: 'input a cloudformation file path',\n                    default: () => this.defaultResourcePath(answers.resourceName),\n                    validate: (value) => new validator_1.default(value, this.lang).required().mustBeYamlFilePath().value(),\n                    transformer: (input) => new transformer_1.default(input).filePath().value(),\n                    filter: (input) => new filter_1.default(input).filePath().value(),\n                },\n                {\n                    type: 'input',\n                    name: 'serverlessConfigPath',\n                    message: 'input a serverless config file path',\n                    default: () => this.defaultServerlessConfigPath,\n                    validate: (value) => new validator_1.default(value, this.lang).required().mustBeYamlFilePath().value(),\n                    transformer: (input) => new transformer_1.default(input).removeAllSpace().value(),\n                    filter: (input) => new filter_1.default(input).removeAllSpace().value(),\n                },\n            ]));\n            return {\n                ...res,\n                ...answers,\n            };\n        });\n        logger.debug(`input values : ${JSON.stringify(res)}}`);\n        const { resourceName, filePath, subscriptions, serverlessConfigPath } = res;\n        const sls = new serverlessConfigService_1.default({ region: this.argv.region, serverlessConfigPath, lang: this.lang });\n        const resource = this.generateSnsCf(resourceName, subscriptions);\n        sls.addResource({ filePath, resourceName, cf: resource });\n    }\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sns/handler.ts?"
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
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst locale = {\n    error: {\n        reqiredSubscriptions: \'required select a subscriptions\',\n    },\n};\nexports["default"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sns/locale/en.ts?'
        );

        /***/
      },

    /***/ './lib/features/add/features/sns/locale/ja.ts':
      /*!****************************************************!*\
  !*** ./lib/features/add/features/sns/locale/ja.ts ***!
  \****************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst locale = {\n    error: {\n        reqiredSubscriptions: \'サブスクリプションを選択して下さい\',\n    },\n};\nexports["default"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sns/locale/ja.ts?'
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
          "\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ \"./lib/utils/logger.ts\"));\nconst index_1 = __webpack_require__(/*! types/index */ \"./lib/types/index.ts\");\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nconst inquirer_1 = __importDefault(__webpack_require__(/*! inquirer */ \"inquirer\"));\nconst validator_1 = __importDefault(__webpack_require__(/*! utils/validator */ \"./lib/utils/validator/index.ts\"));\nconst filter_1 = __importDefault(__webpack_require__(/*! utils/inquirer/filter */ \"./lib/utils/inquirer/filter.ts\"));\nconst transformer_1 = __importDefault(__webpack_require__(/*! utils/inquirer/transformer */ \"./lib/utils/inquirer/transformer.ts\"));\nconst sqs = __importStar(__webpack_require__(/*! @aws-cdk/aws-sqs */ \"@aws-cdk/aws-sqs\"));\nconst cloudformationService_1 = __importDefault(__webpack_require__(/*! services/cloudformationService */ \"./lib/services/cloudformationService.ts\"));\nconst serverlessConfigService_1 = __importDefault(__webpack_require__(/*! services/serverlessConfigService */ \"./lib/services/serverlessConfigService.ts\"));\nclass default_1 extends index_1.FeatureHandlerAbstract {\n    constructor(argv) {\n        super(argv);\n    }\n    defaultResourcePath(resourceName) {\n        return `serverless/${this.argv.region}/resources/sqs/${resourceName}.yml`;\n    }\n    get defaultServerlessConfigPath() {\n        return `serverless/${this.argv.region}/serverless.yml`;\n    }\n    defaultMaxMessageSizeBytes = 262144;\n    defaultMaxReceiveCount = 3;\n    generateSqsCf(queueName, input) {\n        return cloudformationService_1.default.generateCloudFormation(queueName, (c) => {\n            const isFifo = input.queueType === 'Fifo';\n            if (input.useDeadLetterQueue) {\n                const dlqParams = {\n                    queueName: `${queueName}DeadLetter`,\n                };\n                if (isFifo) {\n                    lodash_1.default.assign(dlqParams, {\n                        queueName: `${queueName}DeadLetter.fifo`,\n                        fifo: true,\n                    });\n                }\n                const dlq = new sqs.Queue(c, `${queueName}DeadLetter`, dlqParams);\n                const params = {\n                    queueName: queueName,\n                    fifo: isFifo,\n                    maxMessageSizeBytes: this.defaultMaxMessageSizeBytes,\n                    deadLetterQueue: {\n                        maxReceiveCount: this.defaultMaxReceiveCount,\n                        queue: dlq,\n                    },\n                };\n                if (isFifo) {\n                    lodash_1.default.assign(params, {\n                        queueName: `${queueName}.fifo`,\n                        contentBasedDeduplication: input.contentBasedDeduplication,\n                    });\n                }\n                const queue = new sqs.Queue(c, queueName, params);\n                return queue;\n            }\n            const params = {\n                queueName: queueName,\n                fifo: isFifo,\n                maxMessageSizeBytes: this.defaultMaxMessageSizeBytes,\n            };\n            if (isFifo) {\n                lodash_1.default.assign(params, {\n                    queueName: `${queueName}.fifo`,\n                    contentBasedDeduplication: input.contentBasedDeduplication,\n                });\n            }\n            const queue = new sqs.Queue(c, queueName, params);\n            return queue;\n        });\n    }\n    async run() {\n        const logger = logger_1.default.getLogger();\n        const res = await inquirer_1.default\n            .prompt([\n            {\n                type: 'input',\n                name: 'resourceName',\n                message: 'input a sqs resource name',\n                filter: (input) => input.replace(/\\s+/g, ''),\n                transformer: (input) => input.replace(/\\s+/g, ''),\n                validate: (value) => new validator_1.default(value, this.lang).required().mustNoIncludeZenkaku().value(),\n            },\n        ])\n            .then(async (answers) => {\n            const res = (await inquirer_1.default.prompt([\n                {\n                    type: 'list',\n                    name: 'queueType',\n                    default: 'Standard',\n                    choices: ['Standard', 'Fifo'],\n                    message: 'Is it a FIFO queue?',\n                },\n                {\n                    type: 'expand',\n                    name: 'useDeadLetterQueue',\n                    message: 'Do you use dead letter queue?',\n                    choices: [\n                        {\n                            key: 'y',\n                            name: 'yes',\n                            value: true,\n                        },\n                        {\n                            key: 'n',\n                            name: 'no',\n                            value: false,\n                        },\n                    ],\n                },\n                {\n                    type: 'expand',\n                    name: 'contentBasedDeduplication',\n                    message: 'Do you use content-based deduplication?',\n                    choices: [\n                        {\n                            key: 'y',\n                            name: 'yes',\n                            value: true,\n                        },\n                        {\n                            key: 'n',\n                            name: 'no',\n                            value: false,\n                        },\n                    ],\n                },\n                {\n                    type: 'input',\n                    name: 'filePath',\n                    message: 'input a cloudformation file path',\n                    default: () => this.defaultResourcePath(answers.resourceName),\n                    validate: (value) => new validator_1.default(value, this.lang).required().mustBeYamlFilePath().value(),\n                    transformer: (input) => new transformer_1.default(input).filePath().value(),\n                    filter: (input) => new filter_1.default(input).filePath().value(),\n                },\n                {\n                    type: 'input',\n                    name: 'serverlessConfigPath',\n                    message: 'input a serverless config file path',\n                    default: () => this.defaultServerlessConfigPath,\n                    validate: (value) => new validator_1.default(value, this.lang).required().mustBeYamlFilePath().value(),\n                    transformer: (input) => new transformer_1.default(input).removeAllSpace().value(),\n                    filter: (input) => new filter_1.default(input).removeAllSpace().value(),\n                },\n            ]));\n            return {\n                ...res,\n                ...answers,\n            };\n        });\n        logger.debug(`input values : ${JSON.stringify(res)}}`);\n        const { resourceName, queueType, useDeadLetterQueue, contentBasedDeduplication, filePath, serverlessConfigPath } = res;\n        const sls = new serverlessConfigService_1.default({ region: this.argv.region, serverlessConfigPath, lang: this.lang });\n        const resources = this.generateSqsCf(resourceName, {\n            queueType,\n            useDeadLetterQueue,\n            contentBasedDeduplication,\n        });\n        sls.addResource({ filePath, resourceName, cf: resources });\n    }\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sqs/handler.ts?"
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

    /***/ './lib/features/codegen/builder.ts':
      /*!*****************************************!*\
  !*** ./lib/features/codegen/builder.ts ***!
  \*****************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst index_1 = __webpack_require__(/*! types/index */ "./lib/types/index.ts");\nconst yargonaut_1 = __webpack_require__(/*! utils/yargonaut */ "./lib/utils/yargonaut.ts");\nconst index_2 = __importDefault(__webpack_require__(/*! features/create/index */ "./lib/features/create/index.ts"));\nconst getLocale_1 = __webpack_require__(/*! features/codegen/utils/getLocale */ "./lib/features/codegen/utils/getLocale.ts");\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ "./lib/utils/logger.ts"));\nconst crud_1 = __importDefault(__webpack_require__(/*! features/codegen/features/crud */ "./lib/features/codegen/features/crud/index.ts"));\nclass default_1 extends index_1.FeatureBuilderAbstract {\n    constructor(args) {\n        super(args);\n    }\n    build(yargs) {\n        const lang = this.args.lang;\n        const locale = (0, getLocale_1.getLocaleLang)(lang);\n        const logger = logger_1.default.getLogger();\n        return yargs\n            .version(false)\n            .usage(\'Usage: codegen <command> <options>\')\n            .command(\'crud\', yargonaut_1.chalk.grey(locale.command.description.crud), (_yargs) => new crud_1.default.builder(this.args).build(_yargs), (argv) => new crud_1.default.handler(argv).run())\n            .command(\'*\', yargonaut_1.chalk.grey(\'<command> <options>\'), () => ({}), (argv) => {\n            if (argv._.length === 1)\n                return new index_2.default.handler(argv).run();\n            throw new Error(\'locale.error.unProcessed\');\n        });\n    }\n}\nexports["default"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/codegen/builder.ts?'
        );

        /***/
      },

    /***/ './lib/features/codegen/features/crud/builder.ts':
      /*!*******************************************************!*\
  !*** ./lib/features/codegen/features/crud/builder.ts ***!
  \*******************************************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst index_1 = __webpack_require__(/*! types/index */ "./lib/types/index.ts");\nclass default_1 extends index_1.FeatureBuilderAbstract {\n    constructor(args) {\n        super(args);\n    }\n    build(_yargs) {\n        return _yargs.version(false).usage(\'Usage: $0 crud\');\n    }\n}\nexports["default"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/codegen/features/crud/builder.ts?'
        );

        /***/
      },

    /***/ './lib/features/codegen/features/crud/handler.ts':
      /*!*******************************************************!*\
  !*** ./lib/features/codegen/features/crud/handler.ts ***!
  \*******************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          "\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst index_1 = __webpack_require__(/*! types/index */ \"./lib/types/index.ts\");\nconst inquirer_1 = __importDefault(__webpack_require__(/*! inquirer */ \"inquirer\"));\nconst getLocale_1 = __webpack_require__(/*! features/codegen/features/crud/utils/getLocale */ \"./lib/features/codegen/features/crud/utils/getLocale.ts\");\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nconst serverlessConfigService_1 = __importDefault(__webpack_require__(/*! services/serverlessConfigService */ \"./lib/services/serverlessConfigService.ts\"));\nconst parser_1 = __importDefault(__webpack_require__(/*! utils/parser */ \"./lib/utils/parser.ts\"));\nconst yaml_1 = __webpack_require__(/*! utils/yaml */ \"./lib/utils/yaml.ts\");\nconst tablePrompt_1 = __importDefault(__webpack_require__(/*! utils/inquirer/tablePrompt */ \"./lib/utils/inquirer/tablePrompt.ts\"));\nconst codeService_1 = __importDefault(__webpack_require__(/*! services/codeService */ \"./lib/services/codeService/index.ts\"));\nconst questions_1 = __importDefault(__webpack_require__(/*! features/codegen/features/crud/utils/questions/ */ \"./lib/features/codegen/features/crud/utils/questions/index.ts\"));\nconst buildSchemaGraphqlInfo_1 = __importDefault(__webpack_require__(/*! ./utils/buildSchemaGraphqlInfo */ \"./lib/features/codegen/features/crud/utils/buildSchemaGraphqlInfo.ts\"));\nclass default_1 extends index_1.FeatureHandlerAbstract {\n    constructor(argv) {\n        super(argv);\n        inquirer_1.default.registerPrompt('table', tablePrompt_1.default);\n    }\n    get defaultServerlessConfigPath() {\n        return `serverless/${this.argv.region}/serverless.yml`;\n    }\n    async run() {\n        const locale = (0, getLocale_1.getLocaleLang)(this.lang);\n        const serverlessConfigPath = await inquirer_1.default\n            .prompt([questions_1.default.serverlessConfigPath(this.lang, this.defaultServerlessConfigPath)])\n            .then(({ serverlessConfigPath }) => serverlessConfigPath);\n        const sls = new serverlessConfigService_1.default({\n            region: this.argv.region,\n            serverlessConfigPath: serverlessConfigPath,\n            lang: this.lang,\n        });\n        if (!sls.isExistsServelessConfig) {\n            throw new Error(locale.error.notFoundServerlessConfig);\n        }\n        const slsConfig = sls.serverlessConfig;\n        if (!(slsConfig.plugins ?? []).includes('serverless-appsync-plugin')) {\n            throw new Error(locale.error.notInstalledAppSyncPlugin);\n        }\n        const appSyncStackPath = parser_1.default.parseSlsRecursivelyReference(slsConfig.appSync);\n        if (lodash_1.default.isEmpty(appSyncStackPath)) {\n            throw new Error(`${locale.error.invalidServerlessCustomAppSync} : \\${file(./appsync/stack.yml)}`);\n        }\n        const appSyncStackConfig = (0, yaml_1.loadYaml)(appSyncStackPath);\n        if (lodash_1.default.isEmpty(appSyncStackConfig)) {\n            throw new Error(`${locale.error.invalidServerlessCustomAppSync} : ${appSyncStackPath}`);\n        }\n        const schemaGraphqlInfo = (0, buildSchemaGraphqlInfo_1.default)(appSyncStackConfig.schema);\n        const resolverMappings = await inquirer_1.default\n            .prompt([questions_1.default.resolverInfo(this.lang, schemaGraphqlInfo)])\n            .then((tablePromptAnswer) => {\n            return lodash_1.default.reduce(tablePromptAnswer.resolverInfo, (acc, cur, idx) => {\n                const [resolver, type] = lodash_1.default.split(cur, ',');\n                acc[resolver].push({\n                    resolver,\n                    type,\n                    name: schemaGraphqlInfo[idx].name,\n                    returnValue: schemaGraphqlInfo[idx].returnValue,\n                });\n                return acc;\n            }, { vtl: [], lambda: [] });\n        })\n            .then(async (resolverMappings) => {\n            const vtlGetters = lodash_1.default.filter(resolverMappings.vtl, (vtl) => vtl.type === 'get');\n            // 一つずつ質問するのでfor文を使う\n            for (let i = 0; i < vtlGetters.length; i++) {\n                const answer = (await inquirer_1.default.prompt([questions_1.default.selectResolverType(this.lang)]));\n                vtlGetters[i].type = answer.selectResolverType;\n            }\n            return resolverMappings;\n        });\n        if (lodash_1.default.isArray(appSyncStackConfig.dataSources))\n            lodash_1.default.each(appSyncStackConfig.dataSources, (dataSource) => {\n                if (!lodash_1.default.includes(dataSource, 'datasources.yml'))\n                    return;\n                const filePath = parser_1.default.parseSlsRecursivelyReference(dataSource);\n                const yml = (0, yaml_1.loadYaml)(filePath);\n                lodash_1.default.each(resolverMappings.lambda, (api) => {\n                    const functionName = lodash_1.default.upperFirst(api.name);\n                    const lambdaFunctionName = `${functionName}LambdaFunction`;\n                    yml[lambdaFunctionName] = {\n                        ...yml[lambdaFunctionName],\n                        type: 'AWS_LAMBDA',\n                        description: lambdaFunctionName,\n                        config: {\n                            functionName: functionName,\n                            lambdaFunctionArn: {\n                                'Fn::GetAtt': ['UpdatePostLambdaFunction', 'Arn'],\n                            },\n                            serviceRoleArn: {\n                                'Fn::GetAtt': ['AppSyncLambdaServiceRole', 'Arn'],\n                            },\n                        },\n                    };\n                });\n                (0, yaml_1.writeYaml)(filePath, yml);\n            });\n        if (lodash_1.default.isArray(appSyncStackConfig.pipelineFunctions))\n            lodash_1.default.each(appSyncStackConfig.pipelineFunctions, (pipelineFunction) => {\n                if (!lodash_1.default.includes(pipelineFunction, 'pipelineFunctions.yml'))\n                    return;\n                const filePath = parser_1.default.parseSlsRecursivelyReference(pipelineFunction);\n                const yml = (0, yaml_1.loadYaml)(filePath);\n                // vtl\n                lodash_1.default.each(resolverMappings.vtl, (vtl) => {\n                    const functionName = lodash_1.default.upperFirst(vtl.name);\n                    const dataSourceName = yml[functionName]?.dataSource || 'YourDataSourceName';\n                    const filePath = `appsync/resolvers/functions/Query.${functionName}.request`;\n                    const code = (() => {\n                        switch (vtl.type) {\n                            case 'get':\n                                return codeService_1.default.templates.vtl.codegenDynamoGetItemRequest;\n                            case 'none':\n                                return codeService_1.default.templates.vtl.localResolverRequest;\n                            case 'query':\n                                return codeService_1.default.templates.vtl.codegenDynamoQueryRequest;\n                            default:\n                                return '';\n                        }\n                    })();\n                    new codeService_1.default({ filePath, code, type: 'vtl' }).write();\n                    yml[functionName] = {\n                        ...yml[functionName],\n                        dataSource: dataSourceName,\n                        request: `${filePath}.vtl`,\n                        response: `appsync/resolvers/common/resolver.response.vtl`,\n                    };\n                });\n                // lambda\n                lodash_1.default.each(resolverMappings.lambda, (lambda) => {\n                    const functionName = lodash_1.default.upperFirst(lambda.name);\n                    const lambdaFunctionName = `${functionName}LambdaFunction`;\n                    yml[functionName] = {\n                        ...yml[functionName],\n                        dataSource: lambdaFunctionName,\n                    };\n                });\n                (0, yaml_1.writeYaml)(filePath, yml);\n            });\n        if (lodash_1.default.isArray(appSyncStackConfig.resolvers))\n            lodash_1.default.each(appSyncStackConfig.resolvers, (resolver) => {\n                if (!lodash_1.default.includes(resolver, 'resolvers.yml'))\n                    return;\n                const filePath = parser_1.default.parseSlsRecursivelyReference(resolver);\n                const yml = (0, yaml_1.loadYaml)(filePath);\n                // vtl\n                lodash_1.default.each(resolverMappings.vtl, (vtl) => {\n                    const keyName = `Query.${vtl.name}`;\n                    const filePath = `appsync/resolvers/queries/${vtl.name}.request`;\n                    const responseVtlFilename = `appsync/resolvers/common/pipeline.after.vtl`;\n                    const functionName = lodash_1.default.upperFirst(vtl.name);\n                    new codeService_1.default({ filePath, code: codeService_1.default.templates.vtl.pipelineBefore, type: 'vtl' }).write();\n                    yml[keyName] = {\n                        ...yml[keyName],\n                        request: `${filePath}.vtl`,\n                        response: responseVtlFilename,\n                        functions: [functionName],\n                    };\n                });\n                // lambda\n                lodash_1.default.each(resolverMappings.lambda, (lambda) => {\n                    const keyName = `Mutation.${lambda.name}`;\n                    const functionName = lodash_1.default.upperFirst(lambda.name);\n                    yml[keyName] = {\n                        ...yml[keyName],\n                        functions: [functionName],\n                    };\n                });\n                (0, yaml_1.writeYaml)(filePath, yml);\n            });\n        // Lambda Functions\n        if (!lodash_1.default.isString(slsConfig.functions)) {\n            throw new Error(locale.error.notFoundFunctionsConfig);\n        }\n        const functionsPath = parser_1.default.parseSlsRecursivelyReference(slsConfig.functions);\n        if (lodash_1.default.isEmpty(functionsPath)) {\n            throw new Error(`${locale.error.notFoundFunctionsConfig} : \\${file(./serverless/ap-northeast-1/resources/functions.yml)}`);\n        }\n        const functionsConfig = (0, yaml_1.loadYaml)(functionsPath);\n        lodash_1.default.each(resolverMappings.lambda, (lambda) => {\n            const functionName = lodash_1.default.upperFirst(lambda.name);\n            const filePath = `src/functions/appsync/${lambda.name}`;\n            const handler = `${filePath}.handler`;\n            const name = `\\${self:custom.awsResourcePrefix}${functionName}`;\n            const code = (() => {\n                if (!lodash_1.default.includes(['create', 'update', 'delete'], lambda.type))\n                    return codeService_1.default.templates.typescript.skeleton;\n                else\n                    return codeService_1.default.templates.typescript[lambda.type](`${functionName}MutationVariables`, lambda.returnValue);\n            })();\n            new codeService_1.default({ filePath, code, type: 'typescript' }).write();\n            functionsConfig[functionName] = {\n                ...functionsConfig[functionName],\n                handler,\n                name,\n            };\n        });\n        (0, yaml_1.writeYaml)(functionsPath, functionsConfig);\n    }\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/codegen/features/crud/handler.ts?"
        );

        /***/
      },

    /***/ './lib/features/codegen/features/crud/index.ts':
      /*!*****************************************************!*\
  !*** ./lib/features/codegen/features/crud/index.ts ***!
  \*****************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst builder_1 = __importDefault(__webpack_require__(/*! features/codegen/features/crud/builder */ "./lib/features/codegen/features/crud/builder.ts"));\nconst handler_1 = __importDefault(__webpack_require__(/*! features/codegen/features/crud/handler */ "./lib/features/codegen/features/crud/handler.ts"));\nexports["default"] = {\n    builder: builder_1.default,\n    handler: handler_1.default,\n};\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/codegen/features/crud/index.ts?'
        );

        /***/
      },

    /***/ './lib/features/codegen/features/crud/locale/en.ts':
      /*!*********************************************************!*\
  !*** ./lib/features/codegen/features/crud/locale/en.ts ***!
  \*********************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    error: {\n        notFoundServerlessConfig: 'Serverless.yml does not exist',\n        notInstalledAppSyncPlugin: 'serverless-appsync-plugin is not installed',\n        notFoundFunctionsConfig: 'No functions configuration exists',\n        invalidServerlessCustomAppSync: 'The custom.appsync in serverless.yml is incorrect, custom.appsync must have the following string set',\n        alreadyExistsMappingTemplate: 'A definition already exists in the mapping template',\n        alreadyExistsResolver: 'A definition already exists in the resolver',\n        alreadyExistsAPI: 'A definition already exists in the API',\n        required: 'Please enter all items',\n    },\n    inquirer: {\n        apiName: 'Enter API name',\n        apiType: 'Select API Type',\n        resolverInfo: 'Enter Resolver Info',\n        resolverType: 'Select Resolver Type',\n        serverlessConfigPath: 'Enter the path to serverless.yml',\n        schemaGraphqlFilePath: 'Enter the path to schema.graphql',\n        queryOperation: 'Select Query Type',\n        dataSource: 'Select Data Source',\n        selectResolverType: 'Select Resolver Type',\n    },\n    services: {\n        common: {\n            inquirer: {\n                createDataSource: 'Do you want to create a new data source?',\n                lambdaFunctionName: 'Enter Lambda function name',\n                lambdaHandler: 'Enter the path to the Lambda handler',\n                dataSource: 'Select Data Source',\n                template: 'Select a template',\n                primaryKeyName: 'Enter primary key name',\n                sortKeyName: 'Enter sort key name',\n                indexName: 'Enter index name',\n            },\n            error: {\n                notFoundDataSource: 'Data source does not exist, data source must be created',\n            },\n        },\n        generateQueryService: {\n            inquirer: {\n                gsiName: 'Enter GSI name',\n            },\n        },\n    },\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/codegen/features/crud/locale/en.ts?"
        );

        /***/
      },

    /***/ './lib/features/codegen/features/crud/locale/ja.ts':
      /*!*********************************************************!*\
  !*** ./lib/features/codegen/features/crud/locale/ja.ts ***!
  \*********************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    error: {\n        notFoundServerlessConfig: 'serverless.ymlが存在しません',\n        notInstalledAppSyncPlugin: 'serverless-appsync-pluginがインストールされていません',\n        notFoundFunctionsConfig: 'functionsの設定が存在しません',\n        invalidServerlessCustomAppSync: 'serverless.ymlのcustom.appsyncが不正です、custom.appsyncには、以下のような文字列が設定されている必要があります',\n        alreadyExistsMappingTemplate: '既にマッピングテンプレートに定義が存在します',\n        alreadyExistsResolver: '既にリゾルバーに定義が存在します',\n        alreadyExistsAPI: '既にAPIに定義が存在します',\n        required: '全ての項目を入力してください',\n    },\n    inquirer: {\n        apiName: 'API名を入力',\n        apiType: 'APIタイプを選択',\n        resolverInfo: 'リゾルバー情報を入力',\n        resolverType: 'リゾルバータイプを選択',\n        serverlessConfigPath: 'serverless.ymlのパスを入力',\n        schemaGraphqlFilePath: 'schema.graphqlのパスを入力',\n        queryOperation: 'Queryのタイプを選択',\n        dataSource: 'データソースを選択',\n        selectResolverType: 'リゾルバータイプを選択',\n    },\n    services: {\n        common: {\n            inquirer: {\n                createDataSource: 'データソースを新しく作成しますか？',\n                lambdaFunctionName: 'Lambda関数名を入力',\n                lambdaHandler: 'Lambdaハンドラーのパスを入力',\n                dataSource: 'データソースを選択',\n                template: 'テンプレートを選択',\n                primaryKeyName: 'プライマリーキー名を入力',\n                sortKeyName: 'ソートキー名を入力',\n                indexName: 'インデックス名を入力',\n            },\n            error: {\n                notFoundDataSource: 'データソースが存在しません、データソースを作成する必要があります',\n            },\n        },\n        generateQueryService: {\n            inquirer: {\n                gsiName: 'GSI名を入力',\n            },\n        },\n    },\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/codegen/features/crud/locale/ja.ts?"
        );

        /***/
      },

    /***/ './lib/features/codegen/features/crud/utils/buildSchemaGraphqlInfo.ts':
      /*!****************************************************************************!*\
  !*** ./lib/features/codegen/features/crud/utils/buildSchemaGraphqlInfo.ts ***!
  \****************************************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          "\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.buildSchemaGraphqlInfo = void 0;\nconst _ = __importStar(__webpack_require__(/*! lodash */ \"lodash\"));\nconst fs = __importStar(__webpack_require__(/*! fs */ \"fs\"));\nconst graphql_1 = __webpack_require__(/*! graphql */ \"graphql\");\nfunction getSchemaGraphql(schema) {\n    return _.chain(schema)\n        .thru((schema) => {\n        if (_.isString(schema)) {\n            return [schema];\n        }\n        return schema;\n    })\n        .map((schema) => {\n        return fs.readFileSync(schema).toString();\n    })\n        .join('\\n')\n        .value();\n}\nconst buildSchemaGraphqlInfo = (schema) => {\n    const schemaGraphql = getSchemaGraphql(schema);\n    const schemaGraphqlInfo = [];\n    const parsedData = (0, graphql_1.parse)(schemaGraphql);\n    (0, graphql_1.visit)(parsedData, {\n        enter(node) {\n            if (node.kind === 'ObjectTypeDefinition' && (node.name.value === 'Query' || node.name.value === 'Mutation')) {\n                _.each(node.fields, (field) => {\n                    schemaGraphqlInfo.push({\n                        type: node.name.value,\n                        name: field.name.value,\n                        arguments: _.map(field.arguments, (argument) => {\n                            return {\n                                name: argument.name.value,\n                                type: _.get(argument, 'type.type.name.value', _.get(argument, 'type.name.value', 'other')),\n                                nonnull: argument.type.kind === graphql_1.Kind.NON_NULL_TYPE,\n                            };\n                        }),\n                        returnValue: _.get(field, 'type.type.name.value', _.get(field, 'type.name.value', 'other')),\n                    });\n                });\n            }\n        },\n    });\n    return schemaGraphqlInfo;\n};\nexports.buildSchemaGraphqlInfo = buildSchemaGraphqlInfo;\nexports[\"default\"] = exports.buildSchemaGraphqlInfo;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/codegen/features/crud/utils/buildSchemaGraphqlInfo.ts?"
        );

        /***/
      },

    /***/ './lib/features/codegen/features/crud/utils/getLocale.ts':
      /*!***************************************************************!*\
  !*** ./lib/features/codegen/features/crud/utils/getLocale.ts ***!
  \***************************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.getLocaleLang = void 0;\nconst ja_1 = __importDefault(__webpack_require__(/*! features/codegen/features/crud/locale/ja */ "./lib/features/codegen/features/crud/locale/ja.ts"));\nconst en_1 = __importDefault(__webpack_require__(/*! features/codegen/features/crud/locale/en */ "./lib/features/codegen/features/crud/locale/en.ts"));\nconst getLocaleLang = (locale) => {\n    switch (locale) {\n        case \'ja\':\n            return ja_1.default;\n        case \'en\':\n            return en_1.default;\n        default:\n            return en_1.default;\n    }\n};\nexports.getLocaleLang = getLocaleLang;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/codegen/features/crud/utils/getLocale.ts?'
        );

        /***/
      },

    /***/ './lib/features/codegen/features/crud/utils/questions/index.ts':
      /*!*********************************************************************!*\
  !*** ./lib/features/codegen/features/crud/utils/questions/index.ts ***!
  \*********************************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst serverlessConfigPath_1 = __importDefault(__webpack_require__(/*! ./serverlessConfigPath */ "./lib/features/codegen/features/crud/utils/questions/serverlessConfigPath.ts"));\nconst resolverInfo_1 = __importDefault(__webpack_require__(/*! ./resolverInfo */ "./lib/features/codegen/features/crud/utils/questions/resolverInfo.ts"));\nconst selectResolverType_1 = __importDefault(__webpack_require__(/*! ./selectResolverType */ "./lib/features/codegen/features/crud/utils/questions/selectResolverType.ts"));\nexports["default"] = {\n    serverlessConfigPath: serverlessConfigPath_1.default,\n    resolverInfo: resolverInfo_1.default,\n    selectResolverType: selectResolverType_1.default,\n};\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/codegen/features/crud/utils/questions/index.ts?'
        );

        /***/
      },

    /***/ './lib/features/codegen/features/crud/utils/questions/resolverInfo.ts':
      /*!****************************************************************************!*\
  !*** ./lib/features/codegen/features/crud/utils/questions/resolverInfo.ts ***!
  \****************************************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          "\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst getLocale_1 = __webpack_require__(/*! features/codegen/features/crud/utils/getLocale */ \"./lib/features/codegen/features/crud/utils/getLocale.ts\");\nconst validator_1 = __importDefault(__webpack_require__(/*! utils/validator */ \"./lib/utils/validator/index.ts\"));\nconst lodash_1 = __webpack_require__(/*! lodash */ \"lodash\");\nexports[\"default\"] = (lang, schemaGraphqlInfo) => ({\n    type: 'table',\n    name: 'resolverInfo',\n    message: (0, getLocale_1.getLocaleLang)(lang).inquirer.resolverInfo,\n    columns: [\n        { name: 'VTL(Get)', value: 'vtl,get' },\n        { name: 'VTL(Query)', value: 'vtl,query' },\n        { name: 'Lambda(Create)', value: 'lambda,create' },\n        { name: 'Lambda(Update)', value: 'lambda,update' },\n        { name: 'Lambda(Delete)', value: 'lambda,delete' },\n    ],\n    rows: (0, lodash_1.map)(schemaGraphqlInfo, (api) => {\n        return {\n            name: api.name,\n            value: (0, lodash_1.chain)(api.name)\n                .thru((name) => {\n                const type = [\n                    { name: 'get', value: 'vtl,get' },\n                    { name: 'list', value: 'vtl,query' },\n                    { name: 'create', value: 'lambda,create' },\n                    { name: 'update', value: 'lambda,update' },\n                    { name: 'delete', value: 'lambda,delete' },\n                ].find((type) => name.startsWith(type.name));\n                return type?.value;\n            })\n                .value(),\n        };\n    }),\n    validate: (values) => new validator_1.default(values, lang).required().value(),\n});\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/codegen/features/crud/utils/questions/resolverInfo.ts?"
        );

        /***/
      },

    /***/ './lib/features/codegen/features/crud/utils/questions/selectResolverType.ts':
      /*!**********************************************************************************!*\
  !*** ./lib/features/codegen/features/crud/utils/questions/selectResolverType.ts ***!
  \**********************************************************************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst getLocale_1 = __webpack_require__(/*! features/codegen/features/crud/utils/getLocale */ \"./lib/features/codegen/features/crud/utils/getLocale.ts\");\nexports[\"default\"] = (lang) => ({\n    type: 'list',\n    name: 'selectResolverType',\n    message: (0, getLocale_1.getLocaleLang)(lang).inquirer.selectResolverType,\n    default: () => 'get',\n    choices: [\n        { title: 'LocalResolver', value: 'none' },\n        { title: 'GetItem', value: 'get' },\n    ],\n});\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/codegen/features/crud/utils/questions/selectResolverType.ts?"
        );

        /***/
      },

    /***/ './lib/features/codegen/features/crud/utils/questions/serverlessConfigPath.ts':
      /*!************************************************************************************!*\
  !*** ./lib/features/codegen/features/crud/utils/questions/serverlessConfigPath.ts ***!
  \************************************************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst getLocale_1 = __webpack_require__(/*! features/codegen/features/crud/utils/getLocale */ "./lib/features/codegen/features/crud/utils/getLocale.ts");\nconst validator_1 = __importDefault(__webpack_require__(/*! utils/validator */ "./lib/utils/validator/index.ts"));\nconst filter_1 = __importDefault(__webpack_require__(/*! utils/inquirer/filter */ "./lib/utils/inquirer/filter.ts"));\nconst transformer_1 = __importDefault(__webpack_require__(/*! utils/inquirer/transformer */ "./lib/utils/inquirer/transformer.ts"));\nexports["default"] = (lang, defaultServerlessConfigPath) => ({\n    type: \'input\',\n    name: \'serverlessConfigPath\',\n    message: (0, getLocale_1.getLocaleLang)(lang).inquirer.serverlessConfigPath,\n    default: () => defaultServerlessConfigPath,\n    validate: (value) => {\n        return new validator_1.default(value, lang).required().mustBeYamlFilePath().value();\n    },\n    transformer: (input) => new transformer_1.default(input).removeAllSpace().value(),\n    filter: (input) => new filter_1.default(input).removeAllSpace().value(),\n});\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/codegen/features/crud/utils/questions/serverlessConfigPath.ts?'
        );

        /***/
      },

    /***/ './lib/features/codegen/index.ts':
      /*!***************************************!*\
  !*** ./lib/features/codegen/index.ts ***!
  \***************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst builder_1 = __importDefault(__webpack_require__(/*! features/codegen/builder */ "./lib/features/codegen/builder.ts"));\nexports["default"] = {\n    builder: builder_1.default,\n};\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/codegen/index.ts?'
        );

        /***/
      },

    /***/ './lib/features/codegen/locale/en.ts':
      /*!*******************************************!*\
  !*** ./lib/features/codegen/locale/en.ts ***!
  \*******************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst locale = {\n    command: {\n        description: {\n            crud: \'Generate CRUD code based on schema.graphql\',\n        },\n    },\n};\nexports["default"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/codegen/locale/en.ts?'
        );

        /***/
      },

    /***/ './lib/features/codegen/locale/ja.ts':
      /*!*******************************************!*\
  !*** ./lib/features/codegen/locale/ja.ts ***!
  \*******************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst locale = {\n    command: {\n        description: {\n            crud: \'schema.graphql を元に CRUD のコードを生成\',\n        },\n    },\n};\nexports["default"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/codegen/locale/ja.ts?'
        );

        /***/
      },

    /***/ './lib/features/codegen/utils/getLocale.ts':
      /*!*************************************************!*\
  !*** ./lib/features/codegen/utils/getLocale.ts ***!
  \*************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.getLocaleLang = void 0;\nconst ja_1 = __importDefault(__webpack_require__(/*! features/codegen/locale/ja */ "./lib/features/codegen/locale/ja.ts"));\nconst en_1 = __importDefault(__webpack_require__(/*! features/codegen/locale/en */ "./lib/features/codegen/locale/en.ts"));\nconst getLocaleLang = (locale) => {\n    switch (locale) {\n        case \'ja\':\n            return ja_1.default;\n        case \'en\':\n            return en_1.default;\n        default:\n            return en_1.default;\n    }\n};\nexports.getLocaleLang = getLocaleLang;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/codegen/utils/getLocale.ts?'
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

    /***/ './lib/services/appSyncStackService.ts':
      /*!*********************************************!*\
  !*** ./lib/services/appSyncStackService.ts ***!
  \*********************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          "\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ \"./lib/utils/logger.ts\"));\nconst yaml_1 = __webpack_require__(/*! utils/yaml */ \"./lib/utils/yaml.ts\");\nconst analyzer_1 = __importDefault(__webpack_require__(/*! utils/graphql/analyzer */ \"./lib/utils/graphql/analyzer.ts\"));\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nconst fs_1 = __importDefault(__webpack_require__(/*! fs */ \"fs\"));\nconst config_1 = __importDefault(__webpack_require__(/*! config */ \"./lib/config.ts\"));\nconst parser_1 = __importDefault(__webpack_require__(/*! utils/parser */ \"./lib/utils/parser.ts\"));\nconst cloudformationService_1 = __importDefault(__webpack_require__(/*! services/cloudformationService */ \"./lib/services/cloudformationService.ts\"));\nconst iam = __importStar(__webpack_require__(/*! @aws-cdk/aws-iam */ \"@aws-cdk/aws-iam\"));\nconst cdk = __importStar(__webpack_require__(/*! aws-cdk-lib */ \"aws-cdk-lib\"));\nconst yargonaut_1 = __webpack_require__(/*! yargonaut */ \"yargonaut\");\nconst editor_1 = __importDefault(__webpack_require__(/*! utils/graphql/editor */ \"./lib/utils/graphql/editor.ts\"));\nclass default_1 {\n    constructor(args) {\n        this.logger = logger_1.default.getLogger();\n        this._stackFilePath = args.stackFilePath;\n        this._lang = args.lang;\n        this._region = args.region;\n        this._defaultIamRolePath = `serverless/${args.region}/resources/iamrole/appsync.yml`;\n        this._graphqlEditor = new editor_1.default();\n        this.setAppSyncStackObject();\n    }\n    _graphqlEditor;\n    get graphqlEditor() {\n        return this._graphqlEditor;\n    }\n    appSyncDynamoDBRoleName = 'AppSyncDynamoDBRole';\n    appSyncRDSRoleName = 'AppSyncRDSRole';\n    appSyncOpenSearchRoleName = 'AppSyncOpenSearchRole';\n    appSyncLambdaRoleName = 'AppSyncLambdaRole';\n    defaultCustomDataSourcePath = 'appsync/custom_datasources.yml';\n    defaultCustomMappingtemplatePath = 'appsync/custom_mappingtemplate.yml';\n    defaultCustomFunctionConfigurationsPath = 'appsync/custom_functionConfigurations.yml';\n    defaultAppSyncStackIndex = 0;\n    logger;\n    _defaultIamRolePath;\n    get defaultIamRolePath() {\n        return this._defaultIamRolePath;\n    }\n    _appSyncStack;\n    get appSyncStack() {\n        return this._appSyncStack;\n    }\n    _stackFilePath;\n    get stackFilePath() {\n        return this._stackFilePath;\n    }\n    _lang;\n    get lang() {\n        return this._lang;\n    }\n    _region;\n    get region() {\n        return this._region;\n    }\n    getAppSyncStackConfig() {\n        const stackDoc = (0, yaml_1.loadYaml)(this.stackFilePath);\n        const index = this.defaultAppSyncStackIndex;\n        return {\n            ...stackDoc[index],\n            functionConfigurations: stackDoc[index].functionConfigurations ?? [],\n            dataSources: stackDoc[index].dataSources ?? [],\n            mappingTemplates: stackDoc[index].mappingTemplates ?? [],\n            schema: stackDoc[index].schema ?? [],\n        };\n    }\n    writeAppSyncStackConfig(config) {\n        const stackDoc = (0, yaml_1.loadYaml)(this.stackFilePath);\n        const index = this.defaultAppSyncStackIndex;\n        stackDoc[index] = config;\n        const yamlText = (0, yaml_1.writeYaml)(this.stackFilePath, stackDoc);\n        this.logger.info((0, yargonaut_1.chalk)().green(yamlText));\n    }\n    setAppSyncStackObject() {\n        const res = this.getAppSyncStackConfig();\n        const { schema, dataSources, mappingTemplates, mappingTemplatesLocation, functionConfigurationsLocation, functionConfigurations } = res;\n        this._appSyncStack = {\n            mappingTemplatesLocation,\n            functionConfigurationsLocation,\n            functionConfigurations: lodash_1.default.chain(functionConfigurations)\n                .map((p) => (0, yaml_1.loadYaml)(parser_1.default.parseSlsRecursivelyReference(p)))\n                .flatten()\n                .filter((p) => p && !lodash_1.default.isEmpty(p))\n                .value() ?? [],\n            dataSources: lodash_1.default.chain(dataSources)\n                .map((p) => (0, yaml_1.loadYaml)(parser_1.default.parseSlsRecursivelyReference(p)))\n                .flatten()\n                .filter((p) => p && !lodash_1.default.isEmpty(p))\n                .value() ?? [],\n            mappingTemplates: lodash_1.default.chain(mappingTemplates)\n                .map((p) => (0, yaml_1.loadYaml)(parser_1.default.parseSlsRecursivelyReference(p)))\n                .flatten()\n                .filter((p) => p && !lodash_1.default.isEmpty(p))\n                .value() ?? [],\n            schema: lodash_1.default.chain(schema)\n                .thru((value) => {\n                if (lodash_1.default.isString(value) && !lodash_1.default.isEmpty(value)) {\n                    const _schema = fs_1.default.readFileSync(path_1.default.join(config_1.default.currentPath, value), 'utf8');\n                    if (lodash_1.default.isEmpty(_schema))\n                        return [];\n                    return [_schema];\n                }\n                if (lodash_1.default.isArray(value) && !lodash_1.default.isEmpty(value)) {\n                    return value\n                        .map((v) => {\n                        const _schema = fs_1.default.readFileSync(path_1.default.join(config_1.default.currentPath, v), 'utf8');\n                        if (lodash_1.default.isEmpty(_schema))\n                            return '';\n                        return _schema;\n                    })\n                        .filter((v) => !lodash_1.default.isEmpty(v));\n                }\n                return [];\n            })\n                .thru((schemas) => new analyzer_1.default(schemas))\n                .value(),\n        };\n    }\n    addDataSource(dataSource) {\n        // update custom_datasources.yml\n        let isWrite = false;\n        if (this.appSyncStack?.dataSources.some((p) => p.name === dataSource.name)) {\n            this.logger.warn(`DataSource ${dataSource.name} is already exists.`);\n            isWrite = false;\n        }\n        else {\n            try {\n                const dataSourceDoc = (0, yaml_1.loadYaml)(this.defaultCustomDataSourcePath);\n                const newDataSources = [...dataSourceDoc, dataSource];\n                const yamlText = (0, yaml_1.writeYaml)(this.defaultCustomDataSourcePath, newDataSources);\n                this.logger.info((0, yargonaut_1.chalk)().green(yamlText));\n            }\n            catch (e) {\n                const yamlText = (0, yaml_1.writeYaml)(this.defaultCustomDataSourcePath, [dataSource]);\n                this.logger.info((0, yargonaut_1.chalk)().green(yamlText));\n            }\n            isWrite = true;\n        }\n        // update appsync stack yml\n        if (isWrite) {\n            const stackDoc = this.getAppSyncStackConfig();\n            if (stackDoc.dataSources.every((str) => !str.includes(this.defaultCustomDataSourcePath))) {\n                this.writeAppSyncStackConfig({\n                    ...stackDoc,\n                    dataSources: [...stackDoc.dataSources, `\\${file(./${this.defaultCustomDataSourcePath})}`],\n                });\n            }\n        }\n        this.setAppSyncStackObject();\n    }\n    addMappingTemplate(args) {\n        const { mappingTemplate } = args;\n        // update custom_datasources.yml\n        let isWrite = false;\n        if (this.appSyncStack?.mappingTemplates.some((p) => p.type === mappingTemplate.type && p.field === mappingTemplate.field)) {\n            this.logger.warn(`MappingTemplate ${mappingTemplate.type}.${mappingTemplate.field} is already exists.`);\n            isWrite = false;\n        }\n        else {\n            try {\n                const mappingTemplateDoc = (0, yaml_1.loadYaml)(this.defaultCustomMappingtemplatePath);\n                const newMappingTemplates = [...mappingTemplateDoc, mappingTemplate];\n                const yamlText = (0, yaml_1.writeYaml)(this.defaultCustomMappingtemplatePath, newMappingTemplates);\n                this.logger.info((0, yargonaut_1.chalk)().green(yamlText));\n            }\n            catch (e) {\n                const yamlText = (0, yaml_1.writeYaml)(this.defaultCustomMappingtemplatePath, [mappingTemplate]);\n                this.logger.info((0, yargonaut_1.chalk)().green(yamlText));\n            }\n            isWrite = true;\n        }\n        // update appsync stack yml\n        if (isWrite) {\n            const stackDoc = this.getAppSyncStackConfig();\n            if (stackDoc.mappingTemplates.every((str) => !str.includes(this.defaultCustomMappingtemplatePath))) {\n                this.writeAppSyncStackConfig({\n                    ...stackDoc,\n                    mappingTemplates: [...stackDoc.mappingTemplates, `\\${file(./${this.defaultCustomMappingtemplatePath})}`],\n                });\n            }\n        }\n        this.setAppSyncStackObject();\n    }\n    addFunctionConfiguration(args) {\n        const { functionConfiguration } = args;\n        // update custom_datasources.yml\n        let isWrite = false;\n        if (this.appSyncStack?.functionConfigurations.some((p) => p.name === functionConfiguration.name)) {\n            this.logger.warn(`FunctionConfiguration ${functionConfiguration.name} is already exists.`);\n            isWrite = false;\n        }\n        else {\n            try {\n                const functionConfigurationDoc = (0, yaml_1.loadYaml)(this.defaultCustomFunctionConfigurationsPath);\n                const newFunctionConfigurationDoc = [...functionConfigurationDoc, functionConfiguration];\n                const yamlText = (0, yaml_1.writeYaml)(this.defaultCustomFunctionConfigurationsPath, newFunctionConfigurationDoc);\n                this.logger.info((0, yargonaut_1.chalk)().green(yamlText));\n            }\n            catch (e) {\n                const yamlText = (0, yaml_1.writeYaml)(this.defaultCustomFunctionConfigurationsPath, [functionConfiguration]);\n                this.logger.info((0, yargonaut_1.chalk)().green(yamlText));\n            }\n            isWrite = true;\n        }\n        // update appsync stack yml\n        if (isWrite) {\n            const stackDoc = this.getAppSyncStackConfig();\n            if (stackDoc.functionConfigurations.every((str) => !str.includes(this.defaultCustomFunctionConfigurationsPath))) {\n                this.writeAppSyncStackConfig({\n                    ...stackDoc,\n                    functionConfigurations: [...stackDoc.functionConfigurations, `\\${file(./${this.defaultCustomFunctionConfigurationsPath})}`],\n                });\n            }\n        }\n        this.setAppSyncStackObject();\n    }\n    updateCustomSchemaGraphl(args) {\n        // update custom_schema.graphql\n        const callback = (updated, opt) => {\n            if (updated) {\n                // update appsync stack yml\n                const { schemaPath } = opt;\n                const stackDoc = this.getAppSyncStackConfig();\n                if (lodash_1.default.isString(stackDoc.schema) && !stackDoc.schema.includes(schemaPath)) {\n                    this.writeAppSyncStackConfig({\n                        ...stackDoc,\n                        schema: [stackDoc.schema, schemaPath],\n                    });\n                }\n                else if (lodash_1.default.isArray(stackDoc.schema) && !stackDoc.schema.includes(schemaPath)) {\n                    this.writeAppSyncStackConfig({\n                        ...stackDoc,\n                        schema: [...stackDoc.schema, schemaPath],\n                    });\n                }\n                this.setAppSyncStackObject();\n            }\n            else {\n                this.logger.warn('skip update custom_schema.graphql.');\n            }\n        };\n        this.graphqlEditor.updateCustomSchemaGraphl({ ...args, callback });\n    }\n    addIamRoleByDataSource(args) {\n        const { dataSource, sls } = args;\n        switch (dataSource) {\n            case 'AMAZON_DYNAMODB':\n                sls.addResource({\n                    resourceName: this.appSyncDynamoDBRoleName,\n                    filePath: this.defaultIamRolePath,\n                    cf: cloudformationService_1.default.generateCloudFormation(this.appSyncDynamoDBRoleName, (c) => {\n                        const role = new iam.Role(c, this.appSyncDynamoDBRoleName, {\n                            assumedBy: new iam.ServicePrincipal('appsync.amazonaws.com'),\n                        });\n                        role.addToPolicy(new iam.PolicyStatement({\n                            effect: iam.Effect.ALLOW,\n                            resources: [cdk.Fn.join(':', ['arn:aws:dynamodb', this.region, cdk.Fn.ref('AWS::AccountId'), 'table/*'])],\n                            actions: ['dynamodb:*'],\n                        }));\n                        return role;\n                    }),\n                });\n                break;\n            case 'RELATIONAL_DATABASE':\n                sls.addResource({\n                    resourceName: this.appSyncRDSRoleName,\n                    filePath: this.defaultIamRolePath,\n                    cf: cloudformationService_1.default.generateCloudFormation(this.appSyncRDSRoleName, (c) => {\n                        const role = new iam.Role(c, this.appSyncRDSRoleName, {\n                            assumedBy: new iam.ServicePrincipal('appsync.amazonaws.com'),\n                        });\n                        role.addToPolicy(new iam.PolicyStatement({\n                            effect: iam.Effect.ALLOW,\n                            resources: [cdk.Fn.join(':', ['arn:aws:rds', this.region, cdk.Fn.ref('AWS::AccountId'), 'secret:*'])],\n                            actions: ['rds-data:DeleteItems', 'rds-data:ExecuteSql', 'rds-data:ExecuteStatement', 'rds-data:GetItems', 'rds-data:InsertItems', 'rds-data:UpdateItems'],\n                        }));\n                        role.addToPolicy(new iam.PolicyStatement({\n                            effect: iam.Effect.ALLOW,\n                            resources: [cdk.Fn.join(':', ['arn:aws:secretsmanager', this.region, cdk.Fn.ref('AWS::AccountId'), 'table/*'])],\n                            actions: ['secretsmanager:GetSecretValue'],\n                        }));\n                        return role;\n                    }),\n                });\n                break;\n            case 'AMAZON_ELASTICSEARCH':\n                sls.addResource({\n                    resourceName: this.appSyncOpenSearchRoleName,\n                    filePath: this.defaultIamRolePath,\n                    cf: cloudformationService_1.default.generateCloudFormation(this.appSyncOpenSearchRoleName, (c) => {\n                        const role = new iam.Role(c, this.appSyncOpenSearchRoleName, {\n                            assumedBy: new iam.ServicePrincipal('appsync.amazonaws.com'),\n                        });\n                        return role;\n                    }),\n                });\n                break;\n            case 'AWS_LAMBDA':\n                sls.addResource({\n                    resourceName: this.appSyncLambdaRoleName,\n                    filePath: this.defaultIamRolePath,\n                    cf: cloudformationService_1.default.generateCloudFormation(this.appSyncLambdaRoleName, (c) => {\n                        const role = new iam.Role(c, this.appSyncLambdaRoleName, {\n                            assumedBy: new iam.ServicePrincipal('appsync.amazonaws.com'),\n                        });\n                        role.addToPolicy(new iam.PolicyStatement({\n                            effect: iam.Effect.ALLOW,\n                            resources: [cdk.Fn.join(':', ['arn:aws:lambda', this.region, cdk.Fn.ref('AWS::AccountId'), 'function:*'])],\n                            actions: ['lambda:invokeFunction'],\n                        }));\n                        return role;\n                    }),\n                });\n                break;\n            case 'HTTP':\n                sls.addResource({\n                    resourceName: 'AppSyncHttpRole',\n                    filePath: this.defaultIamRolePath,\n                    cf: cloudformationService_1.default.generateCloudFormation('AppSyncHttpRole', (c) => {\n                        const role = new iam.Role(c, 'AppSyncHttpRole', {\n                            assumedBy: new iam.ServicePrincipal('appsync.amazonaws.com'),\n                        });\n                        return role;\n                    }),\n                });\n                break;\n            default:\n                break;\n        }\n    }\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/appSyncStackService.ts?"
        );

        /***/
      },

    /***/ './lib/services/cloudformationService.ts':
      /*!***********************************************!*\
  !*** ./lib/services/cloudformationService.ts ***!
  \***********************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ "./lib/utils/logger.ts"));\nconst core_1 = __webpack_require__(/*! @aws-cdk/core */ "@aws-cdk/core");\nconst assert_1 = __webpack_require__(/*! @aws-cdk/assert */ "@aws-cdk/assert");\nclass default_1 {\n    static generateCloudFormation = (resourceName, resource) => {\n        class DevStack extends core_1.Stack {\n            constructor(scope, id, props) {\n                super(scope, id, props);\n                const res = resource(this);\n                const cfn = res.node.defaultChild;\n                cfn.overrideLogicalId(resourceName);\n            }\n        }\n        const logger = logger_1.default.getLogger();\n        const stack = new DevStack(new core_1.App(), \'ragate\');\n        // Convert to CloudFormation template\n        // eslint-disable-next-line @typescript-eslint/ban-ts-comment\n        // @ts-ignore\n        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment\n        const cfn = assert_1.SynthUtils.toCloudFormation(stack);\n        logger.debug(\'generated cloudFormation template:\');\n        logger.debug(cfn);\n        return cfn.Resources;\n    };\n}\nexports["default"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/cloudformationService.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/index.ts':
      /*!*******************************************!*\
  !*** ./lib/services/codeService/index.ts ***!
  \*******************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst parser_1 = __importDefault(__webpack_require__(/*! utils/parser */ "./lib/utils/parser.ts"));\nconst typescript_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/typescript */ "./lib/services/codeService/templates/typescript/index.ts"));\nconst vtl_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/vtl */ "./lib/services/codeService/templates/vtl/index.ts"));\nconst cli_1 = __webpack_require__(/*! utils/cli */ "./lib/utils/cli.ts");\nconst fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ "./lib/utils/logger.ts"));\nconst yargonaut_1 = __webpack_require__(/*! yargonaut */ "yargonaut");\nclass CodeService {\n    static get templates() {\n        return {\n            typescript: typescript_1.default,\n            vtl: vtl_1.default,\n        };\n    }\n    constructor(args) {\n        const { filePath, code, type } = args;\n        const [directories, fileName] = parser_1.default.parseFilePath(filePath);\n        this.type = type;\n        this.filePath = filePath;\n        this.code = code;\n        this.destinationPath = directories.join(\'/\') + \'/\';\n        if (type === \'typescript\') {\n            this.fileName = parser_1.default.extractFilename(fileName);\n        }\n        else {\n            this.fileName = fileName;\n        }\n        this.logger = logger_1.default.getLogger();\n    }\n    filePath;\n    type;\n    destinationPath;\n    fileName;\n    code;\n    logger;\n    get extension() {\n        switch (this.type) {\n            case \'typescript\':\n                return \'ts\';\n            case \'vtl\':\n                return \'vtl\';\n            default:\n                this.logger.error(`An unsupported file type was specified. : ${this.filePath}`);\n                throw Error(\'An unsupported file type was specified.\');\n        }\n    }\n    write() {\n        const destination = `${(0, cli_1.asFullPath)(this.destinationPath)}${this.fileName}.${this.extension}`;\n        if ((0, cli_1.isFileExists)(destination)) {\n            this.logger.info(`already exists file, skip write : ${destination}`);\n            return;\n        }\n        (0, cli_1.createDirectories)(this.destinationPath);\n        this.logger.info(`create directories : ${this.destinationPath}`);\n        fs_1.default.writeFileSync(destination, this.code, \'utf8\');\n        this.logger.info(`write : ${destination}`);\n        this.logger.info((0, yargonaut_1.chalk)().green(this.code));\n    }\n}\nexports["default"] = CodeService;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/index.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/typescript/basicauthlambda.ts':
      /*!**************************************************************************!*\
  !*** ./lib/services/codeService/templates/typescript/basicauthlambda.ts ***!
  \**************************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = `import { Context, CloudFrontRequest, Callback, CloudFrontRequestEvent, CloudFrontResultResponse } from 'aws-lambda';\n\nexport const handler = (event: CloudFrontRequestEvent, _context: Context, callback: Callback): void => {\n  const request: CloudFrontRequest = event.Records[0].cf.request;\n  const headers = request.headers;\n\n  const authUser = 'ragate'; // Basic認証のユーザー名\n  const authPass = '20210525'; // Basic認証のパスワード\n\n  const authString = 'Basic ' + Buffer.from(authUser + ':' + authPass).toString('base64');\n  if (typeof headers.authorization === 'undefined' || headers.authorization[0].value !== authString) {\n    const body = 'Unauthorized';\n    const response: CloudFrontResultResponse = {\n      status: '401',\n      statusDescription: 'Unauthorized',\n      body: body,\n      headers: {\n        'www-authenticate': [{ key: 'WWW-Authenticate', value: 'Basic' }],\n      },\n    };\n    callback(null, response);\n  }\n  callback(null, request);\n};\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/typescript/basicauthlambda.ts?"
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/typescript/create.ts':
      /*!*****************************************************************!*\
  !*** ./lib/services/codeService/templates/typescript/create.ts ***!
  \*****************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = (mutationVariable, returnValue) => `import { AppSyncResolverEvent } from 'aws-lambda';\nimport moment from 'moment';\nimport DynamoService from 'services/dynamoService';\nimport { ${mutationVariable}, ${returnValue} } from 'types/API';\nimport { DYNAMO_TABLES } from 'types/index';\nimport { v4 as uuid } from 'uuid';\nimport middy from 'utils/middy';\n\nexport const handler = middy.handler(async (event: AppSyncResolverEvent<${mutationVariable}>): Promise<${returnValue}> => {\n  const input = event.arguments.input;\n  const now = moment.tz('Asia/Tokyo').format();\n  const dynamoService = new DynamoService();\n  const Id = uuid();\n  const itemId = uuid();\n  const item: ${returnValue} = {\n    Id: Id,\n    Sk: \\`${returnValue}#\\${itemId}\\`,\n    ItemId: itemId,\n    ...input,\n    CreatedAt: now,\n    UpdatedAt: now,\n  };\n  await dynamoService.putItem({\n    putItemCommandInput: {\n      TableName: DYNAMO_TABLES.TableName,\n      Item: item,\n      ConditionExpression: 'attribute_not_exists(Id) and attribute_not_exists(Sk)',\n    },\n  });\n\n  return item;\n});\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/typescript/create.ts?"
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/typescript/delete.ts':
      /*!*****************************************************************!*\
  !*** ./lib/services/codeService/templates/typescript/delete.ts ***!
  \*****************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = (mutationVariable, returnValue) => `import { AppSyncResolverEvent } from 'aws-lambda';\nimport { ${mutationVariable}, ${returnValue} } from 'types/API';\nimport { DYNAMO_TABLES } from 'types/index';\nimport DynamoService from 'services/dynamoService';\nimport middy from 'utils/middy';\n\nexport const handler = middy.handler(async (event: AppSyncResolverEvent<${mutationVariable}>): Promise<${returnValue}> => {\n  const dynamoService = new DynamoService();\n  const item = await dynamoService\n    .deleteItem({\n      deleteItemCommandInput: {\n        TableName: DYNAMO_TABLES.TableName,\n        Key: {\n          Id: event.arguments.input.Id,\n          Sk: \\`${returnValue}#\\${event.arguments.input.ItemId}\\`,\n        },\n        ReturnValues: 'ALL_OLD',\n      },\n    })\n    .then(({ Attributes }) => Attributes as ${returnValue});\n\n  return item;\n});\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/typescript/delete.ts?"
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/typescript/index.ts':
      /*!****************************************************************!*\
  !*** ./lib/services/codeService/templates/typescript/index.ts ***!
  \****************************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst basicauthlambda_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/typescript/basicauthlambda */ "./lib/services/codeService/templates/typescript/basicauthlambda.ts"));\nconst skeleton_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/typescript/skeleton */ "./lib/services/codeService/templates/typescript/skeleton.ts"));\nconst create_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/typescript/create */ "./lib/services/codeService/templates/typescript/create.ts"));\nconst update_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/typescript/update */ "./lib/services/codeService/templates/typescript/update.ts"));\nconst delete_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/typescript/delete */ "./lib/services/codeService/templates/typescript/delete.ts"));\nexports["default"] = {\n    basicauthlambda: basicauthlambda_1.default,\n    skeleton: skeleton_1.default,\n    create: create_1.default,\n    update: update_1.default,\n    delete: delete_1.default,\n};\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/typescript/index.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/typescript/skeleton.ts':
      /*!*******************************************************************!*\
  !*** ./lib/services/codeService/templates/typescript/skeleton.ts ***!
  \*******************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = `import { asyncHandlerWrapper } from 'functions/wrapper';\nimport { AppSyncResolverEvent, Context } from 'aws-lambda';\nimport middy from 'utils/middy';\n\ntype Input = {\n  example: string;\n};\n\ntype Response = {\n  example: string;\n};\n\nexport const handler = middy.handler((async (event: AppSyncResolverEvent<Input>): Promise<Response> => {\n  console.log('It is skeleton 👻');\n});\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/typescript/skeleton.ts?"
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/typescript/update.ts':
      /*!*****************************************************************!*\
  !*** ./lib/services/codeService/templates/typescript/update.ts ***!
  \*****************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = (mutationVariable, returnValue) => `import { AppSyncResolverEvent } from 'aws-lambda';\nimport moment from 'moment';\nimport DynamoService from 'services/dynamoService';\nimport { ${mutationVariable}, ${returnValue} } from 'types/API';\nimport { DYNAMO_TABLES } from 'types/index';\nimport { NotFoundError } from 'exceptions/index';\nimport middy from 'utils/middy';\n\nexport const handler = middy.handler(async (event: AppSyncResolverEvent<${mutationVariable}>): Promise<${returnValue}> => {\n  const input = event.arguments.input;\n  const now = moment.tz('Asia/Tokyo').format();\n  const dynamoService = new DynamoService();\n  const beforeItem = await dynamoService\n    .getItem({\n      getItemCommandInput: {\n        TableName: DYNAMO_TABLES.TableName,\n        Key: {\n          Id: input.Id,\n          Sk: \\`${returnValue}#\\${input.ItemId}\\`,\n        },\n      },\n    })\n    .then(({ Item }) => Item as ${returnValue});\n  if (!beforeItem) {\n    throw new NotFoundError('Item is not found');\n  }\n  const item: ${returnValue} = {\n    Id: input.Id,\n    Sk: \\`${returnValue}#\\${input.ItemId}\\`,\n    ItemId: input.ItemId,\n    ...input,\n    CreatedAt: beforeItem.CreatedAt,\n    UpdatedAt: now,\n  };\n\n  await dynamoService.updateAttributes({\n    tableName: DYNAMO_TABLES.TableName,\n    keyNames: ['Id', 'Sk'],\n    attributes: item,\n    returnValues: 'NONE',\n  });\n\n  return item;\n});\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/typescript/update.ts?"
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/vtl/add.dynamo.getItem.request.ts':
      /*!******************************************************************************!*\
  !*** ./lib/services/codeService/templates/vtl/add.dynamo.getItem.request.ts ***!
  \******************************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports["default"] = (args) => `\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n## [Start] 共通設定\n#set( $primaryValue = "your primary key value" )\n#set( $sortKeyValue = "your sort key value" )\n## [End] 共通設定\n\n## [Start] 自動設定\n#set( $consistentRead = ${args.consistentRead.toString()} )\n#set( $primaryKey = "${args.primaryKeyName}" )\n#set( $sortKeyName = "${args.sortKeyName}" )\n## [End] 自動設定\n\n## [Start] バリデーション\n#set( $modelExpression = {\n    "version" : "2017-02-28",\n    "operation" : "GetItem",\n    "key" : {},\n    "consistentRead" : $consistentRead\n} )\n#if( $util.isNullOrEmpty($primaryValue) )\n  $util.error("PrimaryValue is null.", "InvalidIndexValueError")\n#else\n  $util.qr($modelExpression.key.put($primaryKey, $util.dynamodb.toDynamoDB($primaryValue)))\n#end\n#if( !$util.isNullOrEmpty($sortKeyName) && $util.isNullOrEmpty($sortKeyValue) )\n  $util.error("sortKeyValue is null.", "InvalidIndexValueError")\n#elseif( !$util.isNullOrEmpty($sortKeyName) && !$util.isNullOrEmpty($sortKeyValue) )\n  $util.qr($modelExpression.key.put($sortKeyName, $util.dynamodb.toDynamoDB($sortKeyValue)))\n#end\n## [End] バリデーション\n\n$util.toJson($modelExpression)\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/vtl/add.dynamo.getItem.request.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/vtl/add.dynamo.getItem.response.ts':
      /*!*******************************************************************************!*\
  !*** ./lib/services/codeService/templates/vtl/add.dynamo.getItem.response.ts ***!
  \*******************************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports["default"] = `\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n#if( $ctx.error )\n  $util.error($ctx.error.message, $ctx.error.type)\n#else\n  $util.toJson($ctx.result)\n#end\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/vtl/add.dynamo.getItem.response.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/vtl/add.dynamo.query.request.ts':
      /*!****************************************************************************!*\
  !*** ./lib/services/codeService/templates/vtl/add.dynamo.query.request.ts ***!
  \****************************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports["default"] = (args) => `\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n## [Start] 手動設定\n#set( $primaryValue = "your primary key value" )\n#set( $sortKeyValue = "your sort key value" )\n## [End] 手動設定\n\n## [Start] 自動設定\n${args?.gsiName ? `#set( $indexName = "${args?.gsiName}" )` : \'\'}\n#set( $args = $ctx.args )\n#set( $primaryKey = "${args.primaryKeyName}" )\n#set( $sortKeyName = "${args.sortKeyName}" )\n## [End] 自動設定\n\n## [Start] バリデーション\n#set( $modelQueryExpression = {} )\n#if( $util.isNullOrEmpty($primaryValue) )\n  $util.error("PrimaryValue is null.", "InvalidIndexValueError")\n#else\n  #set( $modelQueryExpression.expression = "#$primaryKey = :$primaryKey" )\n  #set( $modelQueryExpression.expressionNames = {\n    "#$primaryKey": $primaryKey\n  })\n  #set( $modelQueryExpression.expressionValues = {\n    ":$primaryKey": $util.dynamodb.toDynamoDB($primaryValue)\n  })\n#end\n## [End] バリデーション\n\n## [Start] ソートキー用クエリー生成\n#if( !$util.isNullOrEmpty($sortKeyName) && !$util.isNullOrEmpty($sortKeyValue) )\n  #if( !$util.isNull($sortKeyValue.beginsWith) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND begins_with(#sortKey, :sortKey)" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey",  $util.dynamodb.toDynamoDB("$sortKeyValue.beginsWith") ))\n  #elseif( !$util.isNull($sortKeyValue.between) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey BETWEEN :sortKey0 AND :sortKey1" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey0", $util.dynamodb.toDynamoDB("$sortKeyValue.between[0]") ))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey1", $util.dynamodb.toDynamoDB("$sortKeyValue.between[1]") ))\n  #elseif( !$util.isNull($sortKeyValue.eq) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey = :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.eq") ))\n  #elseif( !$util.isNull($sortKeyValue.lt) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey < :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.lt") ))\n  #elseif( !$util.isNull($sortKeyValue.le) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey <= :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.le") ))\n  #elseif( !$util.isNull($sortKeyValue.gt) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey > :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.gt") ))\n  #elseif( !$util.isNull($sortKeyValue.ge) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey >= :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.ge") ))\n  #elseif( !$util.isNull($sortKeyValue.contains) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND contains(#sortKey, :sortKey)" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.contains") ))\n  #elseif( !$util.isNull($sortKeyValue.notContains) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND notContains(#sortKey, :sortKey)" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.notContains") ))\n  #else\n  #end\n#end\n## [End] ソートキー用クエリー生成\n\n## [Start] VTL文字列出力\n#set( $limit = $util.defaultIfNull($args.limit, 100) )\n#set( $request = {\n  "version": "2018-05-29",\n  "limit": $limit\n} )\n#if( $args.nextToken && !$util.isNullOrEmpty($args.nextToken) )\n  #set( $request.nextToken = $args.nextToken )\n#end\n#if( $args.filter )\n  #set( $request.filter = $util.parseJson("$util.transform.toDynamoDBFilterExpression($args.filter)") )\n#end\n#if( !$util.isNull($modelQueryExpression) && !$util.isNullOrEmpty($modelQueryExpression.expression) )\n  $util.qr($request.put("operation", "Query"))\n  $util.qr($request.put("query", $modelQueryExpression))\n  #if( $util.isNullOrEmpty($args.sortDirection) )\n    #set( $request.scanIndexForward = false )\n  #elseif( $args.sortDirection == "ASC" )\n    #set( $request.scanIndexForward = true )\n  #elseif( $args.sortDirection == "DESC" )\n    #set( $request.scanIndexForward = false )\n  #end\n#else\n  $util.qr($request.put("operation", "Scan"))\n#end\n#if(!$util.isNull($indexName))\n    $util.qr($request.put("index", $indexName))\n#end\n$util.toJson($request)\n## [End] VTL文字列出力`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/vtl/add.dynamo.query.request.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/vtl/add.dynamo.query.response.ts':
      /*!*****************************************************************************!*\
  !*** ./lib/services/codeService/templates/vtl/add.dynamo.query.response.ts ***!
  \*****************************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports["default"] = `\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n#if( $ctx.error )\n  $util.error($ctx.error.message, $ctx.error.type)\n#else\n  $util.toJson($ctx.result)\n#end\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/vtl/add.dynamo.query.response.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/vtl/codegen.dynamo.getItem.request.ts':
      /*!**********************************************************************************!*\
  !*** ./lib/services/codeService/templates/vtl/codegen.dynamo.getItem.request.ts ***!
  \**********************************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports["default"] = `## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n## [Start] 共通設定\n#set( $primaryKey = "primary key name" )\n#set( $sortKeyName = "sort key name" )\n#set( $primaryValue = "your primary key value" )\n#set( $sortKeyValue = "your sort key value" )\n#set( $consistentRead = false )\n## [End] 共通設定\n\n## [Start] 自動設定\n## [End] 自動設定\n\n## [Start] バリデーション\n#set( $modelExpression = {\n    "version" : "2017-02-28",\n    "operation" : "GetItem",\n    "key" : {},\n    "consistentRead" : $consistentRead\n} )\n#if( $util.isNullOrEmpty($primaryValue) )\n  $util.error("PrimaryValue is null.", "InvalidIndexValueError")\n#else\n  $util.qr($modelExpression.key.put($primaryKey, $util.dynamodb.toDynamoDB($primaryValue)))\n#end\n#if( !$util.isNullOrEmpty($sortKeyName) && $util.isNullOrEmpty($sortKeyValue) )\n  $util.error("sortKeyValue is null.", "InvalidIndexValueError")\n#elseif( !$util.isNullOrEmpty($sortKeyName) && !$util.isNullOrEmpty($sortKeyValue) )\n  $util.qr($modelExpression.key.put($sortKeyName, $util.dynamodb.toDynamoDB($sortKeyValue)))\n#end\n## [End] バリデーション\n\n$util.toJson($modelExpression)\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/vtl/codegen.dynamo.getItem.request.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/vtl/codegen.dynamo.getItem.response.ts':
      /*!***********************************************************************************!*\
  !*** ./lib/services/codeService/templates/vtl/codegen.dynamo.getItem.response.ts ***!
  \***********************************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports["default"] = `## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n#if( $ctx.error )\n  $util.error($ctx.error.message, $ctx.error.type)\n#else\n  $util.toJson($ctx.result)\n#end\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/vtl/codegen.dynamo.getItem.response.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/vtl/codegen.dynamo.query.request.ts':
      /*!********************************************************************************!*\
  !*** ./lib/services/codeService/templates/vtl/codegen.dynamo.query.request.ts ***!
  \********************************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports["default"] = `## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n## [Start] 手動設定\n##set( $indexName = "gsi index name" )\n#set( $primaryKey = "primary key name" )\n#set( $sortKeyName = "sort key name" )\n#set( $primaryValue = "your primary key value" )\n#set( $sortKeyValue = "your sort key value" )\n#if( $util.isNullOrEmpty($sortKeyValue) )\n    #set( $sortKeyValue = {\n    "beginsWith" : "FacetsName#"\n  } )\n#end\n## [End] 手動設定\n\n## [Start] 自動設定\n#set( $args = $ctx.args )\n## [End] 自動設定\n\n## [Start] バリデーション\n#set( $modelQueryExpression = {} )\n#if( $util.isNullOrEmpty($primaryValue) )\n  $util.error("PrimaryValue is null.", "InvalidIndexValueError")\n#else\n  #set( $modelQueryExpression.expression = "#$primaryKey = :$primaryKey" )\n  #set( $modelQueryExpression.expressionNames = {\n    "#$primaryKey": $primaryKey\n  })\n  #set( $modelQueryExpression.expressionValues = {\n    ":$primaryKey": $util.dynamodb.toDynamoDB($primaryValue)\n  })\n#end\n## [End] バリデーション\n\n## [Start] ソートキー用クエリー生成\n#if( !$util.isNullOrEmpty($sortKeyName) && !$util.isNullOrEmpty($sortKeyValue) )\n  #if( !$util.isNull($sortKeyValue.beginsWith) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND begins_with(#sortKey, :sortKey)" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey",  $util.dynamodb.toDynamoDB("$sortKeyValue.beginsWith") ))\n  #elseif( !$util.isNull($sortKeyValue.between) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey BETWEEN :sortKey0 AND :sortKey1" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey0", $util.dynamodb.toDynamoDB("$sortKeyValue.between[0]") ))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey1", $util.dynamodb.toDynamoDB("$sortKeyValue.between[1]") ))\n  #elseif( !$util.isNull($sortKeyValue.eq) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey = :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.eq") ))\n  #elseif( !$util.isNull($sortKeyValue.lt) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey < :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.lt") ))\n  #elseif( !$util.isNull($sortKeyValue.le) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey <= :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.le") ))\n  #elseif( !$util.isNull($sortKeyValue.gt) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey > :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.gt") ))\n  #elseif( !$util.isNull($sortKeyValue.ge) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey >= :sortKey" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.ge") ))\n  #elseif( !$util.isNull($sortKeyValue.contains) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND contains(#sortKey, :sortKey)" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.contains") ))\n  #elseif( !$util.isNull($sortKeyValue.notContains) )\n    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND notContains(#sortKey, :sortKey)" )\n    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))\n    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.notContains") ))\n  #else\n  #end\n#end\n## [End] ソートキー用クエリー生成\n\n## [Start] VTL文字列出力\n#set( $limit = $util.defaultIfNull($args.limit, 100) )\n#set( $request = {\n  "version": "2018-05-29",\n  "limit": $limit\n} )\n#if( $args.nextToken && !$util.isNullOrEmpty($args.nextToken) )\n  #set( $request.nextToken = $args.nextToken )\n#end\n#if( $args.filter )\n  #set( $request.filter = $util.parseJson("$util.transform.toDynamoDBFilterExpression($args.filter)") )\n#end\n#if( !$util.isNull($modelQueryExpression) && !$util.isNullOrEmpty($modelQueryExpression.expression) )\n  $util.qr($request.put("operation", "Query"))\n  $util.qr($request.put("query", $modelQueryExpression))\n  #if( $util.isNullOrEmpty($args.sortDirection) )\n    #set( $request.scanIndexForward = false )\n  #elseif( $args.sortDirection == "ASC" )\n    #set( $request.scanIndexForward = true )\n  #elseif( $args.sortDirection == "DESC" )\n    #set( $request.scanIndexForward = false )\n  #end\n#else\n  $util.qr($request.put("operation", "Scan"))\n#end\n#if(!$util.isNull($indexName))\n    $util.qr($request.put("index", $indexName))\n#end\n$util.toJson($request)\n## [End] VTL文字列出力`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/vtl/codegen.dynamo.query.request.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/vtl/codegen.dynamo.query.response.ts':
      /*!*********************************************************************************!*\
  !*** ./lib/services/codeService/templates/vtl/codegen.dynamo.query.response.ts ***!
  \*********************************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports["default"] = `## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n#if( $ctx.error )\n  $util.error($ctx.error.message, $ctx.error.type)\n#else\n  $util.toJson($ctx.result)\n#end\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/vtl/codegen.dynamo.query.response.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/vtl/dynamo.scan.request.ts':
      /*!***********************************************************************!*\
  !*** ./lib/services/codeService/templates/vtl/dynamo.scan.request.ts ***!
  \***********************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports["default"] = `\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n#set( $args = $ctx.args )\n\n## [Start] VTL文字列出力\n#set( $limit = $util.defaultIfNull($args.limit, 100) )\n#set( $request = {\n  "version": "2018-05-29",\n  "limit": $limit\n} )\n#if( $args.nextToken && !$util.isNullOrEmpty($args.nextToken) )\n  #set( $request.nextToken = $args.nextToken )\n#end\n#if( $args.filter )\n  #set( $request.filter = $util.parseJson("$util.transform.toDynamoDBFilterExpression($args.filter)") )\n#end\n$util.qr($request.put("operation", "Scan"))\n$util.toJson($request)\n## [End] VTL文字列出力\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/vtl/dynamo.scan.request.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/vtl/dynamo.scan.response.ts':
      /*!************************************************************************!*\
  !*** ./lib/services/codeService/templates/vtl/dynamo.scan.response.ts ***!
  \************************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports["default"] = `\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html\n\n#if( $ctx.error )\n  $util.error($ctx.error.message, $ctx.error.type)\n#else\n  $util.toJson($ctx.result)\n#end\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/vtl/dynamo.scan.response.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/vtl/http.query.request.ts':
      /*!**********************************************************************!*\
  !*** ./lib/services/codeService/templates/vtl/http.query.request.ts ***!
  \**********************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports["default"] = `\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-http.html\n\n{\n    "version": "2018-05-29",\n    "method": "PUT|POST|GET|DELETE|PATCH",\n    "params": {\n        "query": Map,\n        "headers": Map,\n        "body": string\n    },\n    "resourcePath": string\n}\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/vtl/http.query.request.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/vtl/http.query.response.ts':
      /*!***********************************************************************!*\
  !*** ./lib/services/codeService/templates/vtl/http.query.response.ts ***!
  \***********************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports["default"] = `\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-http.html\n\n#if( $ctx.error )\n  $util.error($ctx.error.message, $ctx.error.type)\n#else\n  $util.toJson($ctx.result)\n#end\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/vtl/http.query.response.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/vtl/index.ts':
      /*!*********************************************************!*\
  !*** ./lib/services/codeService/templates/vtl/index.ts ***!
  \*********************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst pipeline_after_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/vtl/pipeline.after */ "./lib/services/codeService/templates/vtl/pipeline.after.ts"));\nconst pipeline_before_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/vtl/pipeline.before */ "./lib/services/codeService/templates/vtl/pipeline.before.ts"));\nconst localResolver_request_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/vtl/localResolver.request */ "./lib/services/codeService/templates/vtl/localResolver.request.ts"));\nconst localResolver_response_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/vtl/localResolver.response */ "./lib/services/codeService/templates/vtl/localResolver.response.ts"));\nconst add_dynamo_query_request_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/vtl/add.dynamo.query.request */ "./lib/services/codeService/templates/vtl/add.dynamo.query.request.ts"));\nconst add_dynamo_query_response_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/vtl/add.dynamo.query.response */ "./lib/services/codeService/templates/vtl/add.dynamo.query.response.ts"));\nconst codegen_dynamo_query_request_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/vtl/codegen.dynamo.query.request */ "./lib/services/codeService/templates/vtl/codegen.dynamo.query.request.ts"));\nconst codegen_dynamo_query_response_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/vtl/codegen.dynamo.query.response */ "./lib/services/codeService/templates/vtl/codegen.dynamo.query.response.ts"));\nconst dynamo_scan_request_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/vtl/dynamo.scan.request */ "./lib/services/codeService/templates/vtl/dynamo.scan.request.ts"));\nconst dynamo_scan_response_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/vtl/dynamo.scan.response */ "./lib/services/codeService/templates/vtl/dynamo.scan.response.ts"));\nconst add_dynamo_getItem_request_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/vtl/add.dynamo.getItem.request */ "./lib/services/codeService/templates/vtl/add.dynamo.getItem.request.ts"));\nconst add_dynamo_getItem_response_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/vtl/add.dynamo.getItem.response */ "./lib/services/codeService/templates/vtl/add.dynamo.getItem.response.ts"));\nconst codegen_dynamo_getItem_request_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/vtl/codegen.dynamo.getItem.request */ "./lib/services/codeService/templates/vtl/codegen.dynamo.getItem.request.ts"));\nconst codegen_dynamo_getItem_response_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/vtl/codegen.dynamo.getItem.response */ "./lib/services/codeService/templates/vtl/codegen.dynamo.getItem.response.ts"));\nconst opensearch_query_request_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/vtl/opensearch.query.request */ "./lib/services/codeService/templates/vtl/opensearch.query.request.ts"));\nconst opensearch_query_response_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/vtl/opensearch.query.response */ "./lib/services/codeService/templates/vtl/opensearch.query.response.ts"));\nconst http_query_request_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/vtl/http.query.request */ "./lib/services/codeService/templates/vtl/http.query.request.ts"));\nconst http_query_response_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/vtl/http.query.response */ "./lib/services/codeService/templates/vtl/http.query.response.ts"));\nconst rdb_query_request_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/vtl/rdb.query.request */ "./lib/services/codeService/templates/vtl/rdb.query.request.ts"));\nconst rdb_query_response_1 = __importDefault(__webpack_require__(/*! services/codeService/templates/vtl/rdb.query.response */ "./lib/services/codeService/templates/vtl/rdb.query.response.ts"));\nexports["default"] = {\n    pipelineAfter: pipeline_after_1.default,\n    pipelineBefore: pipeline_before_1.default,\n    addDynamoGetItemRequest: add_dynamo_getItem_request_1.default,\n    addDynamoGetItemResponse: add_dynamo_getItem_response_1.default,\n    addDynamoQueryRequest: add_dynamo_query_request_1.default,\n    addDynamoQueryResponse: add_dynamo_query_response_1.default,\n    codegenDynamoGetItemRequest: codegen_dynamo_getItem_request_1.default,\n    codegenDynamoGetItemResponse: codegen_dynamo_getItem_response_1.default,\n    codegenDynamoQueryRequest: codegen_dynamo_query_request_1.default,\n    codegenDynamoQueryResponse: codegen_dynamo_query_response_1.default,\n    localResolverRequest: localResolver_request_1.default,\n    localResolverResponse: localResolver_response_1.default,\n    dynamoScanRequest: dynamo_scan_request_1.default,\n    dynamoScanResponse: dynamo_scan_response_1.default,\n    openSearchQueryRequest: opensearch_query_request_1.default,\n    openSearchQueryResponse: opensearch_query_response_1.default,\n    httpQueryRequest: http_query_request_1.default,\n    httpQueryResponse: http_query_response_1.default,\n    rdbQueryRequest: rdb_query_request_1.default,\n    rdbQueryResponse: rdb_query_response_1.default,\n};\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/vtl/index.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/vtl/localResolver.request.ts':
      /*!*************************************************************************!*\
  !*** ./lib/services/codeService/templates/vtl/localResolver.request.ts ***!
  \*************************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports["default"] = `\n## [Start] 共通設定\n#set($payload = $ctx.args )\n#set($primaryValue = "your primary key value" )\n## [End] 共通設定\n\n#if( $util.isNullOrEmpty($primaryValue) )\n  #return\n#end\n\n{\n  "version": "2017-02-28",\n  "payload": $util.toJson($payload)\n}\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/vtl/localResolver.request.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/vtl/localResolver.response.ts':
      /*!**************************************************************************!*\
  !*** ./lib/services/codeService/templates/vtl/localResolver.response.ts ***!
  \**************************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports["default"] = `\n#if( $ctx.error )\n  $util.error($ctx.error.message, $ctx.error.type)\n#else\n  $util.toJson($ctx.result)\n#end\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/vtl/localResolver.response.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/vtl/opensearch.query.request.ts':
      /*!****************************************************************************!*\
  !*** ./lib/services/codeService/templates/vtl/opensearch.query.request.ts ***!
  \****************************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports["default"] = (args) => `\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-elasticsearch.html\n\n## [START] 共通設定\n#set( $args = $ctx.args )\n#set( $indexName = "${args.indexName}" )\n#set( $allowedAggFields = ["ALLOWED_ALL_FIELDS"] ) ## アグリゲーション指定許可するフィールド名(ALLOWED_ALL_FIELDSを指定時は全フィールド許可)\n## [END] 共通設定\n\n## [START] ソート条件生成\n#set( $sortValues = [] )\n#set( $sortFields = [] )\n#if( !$util.isNullOrEmpty($args.sort) )\n  #foreach( $sortItem in $args.sort )\n    #set( $temp = {\n      $sortItem.field : $sortItem.direction\n    } )\n    $util.qr($sortValues.add($temp))\n  #end\n#end\n## [END] ソート条件生成\n\n## [START] Aggregates適用(分析対象フィールド)\n#set( $aggregateValues = {} )\n#foreach( $aggItem in $args.aggregates )\n  #if( $allowedAggFields[0] == "ALLOWED_ALL_FIELDS" )\n    #set( $aggFilter = { "match_all": {} } )\n  #elseif( $allowedAggFields.contains($aggItem.field) )\n    #set( $aggFilter = { "match_all": {} } )\n  #else\n    $util.error("Unauthorized to run aggregation on field: \\${aggItem.field}", "Unauthorized")\n  #end\n  $util.qr($aggregateValues.put("$aggItem.name", { "filter": $aggFilter, "aggs": { "$aggItem.name": { "$aggItem.type": { "field": "$aggItem.field" }}} }))\n#end\n## [END] Aggregates適用(分析対象フィールド)\n\n## [START] フィルター適用\n#if( $util.isNullOrEmpty($args.filter) )\n  #set( $filter = {\n    "match_all": {}\n  } )\n#else\n  #set( $filter = $util.parseJson($util.transform.toElasticsearchQueryDSL($args.filter)) )\n#end\n## [END] フィルター適用\n\n{\n  "version": "2018-05-29",\n  "operation": "GET",\n  "path": "/$indexName/_doc/_search",\n  "params": {\n      "body": {\n                #if( !$util.isNullOrEmpty($args.nextToken) )"search_after": $util.base64Decode($args.nextToken), #end\n                #if( $args.from )"from": $args.from, #end\n                "size": #if( $args.limit ) $args.limit #else 100 #end,\n                "sort": $util.toJson($sortValues),\n                "version": false,\n                "query": $util.toJson($filter),\n                "aggs": $util.toJson($aggregateValues)\n              }\n  }\n}\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/vtl/opensearch.query.request.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/vtl/opensearch.query.response.ts':
      /*!*****************************************************************************!*\
  !*** ./lib/services/codeService/templates/vtl/opensearch.query.response.ts ***!
  \*****************************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports["default"] = `\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-elasticsearch.html\n\n#if( $ctx.error )\n  $util.error($ctx.error.message, $ctx.error.type)\n#end\n\n#set( $es_items = [] )\n#set( $aggregateValues = [] )\n#foreach( $entry in $context.result.hits.hits )\n  #if( !$foreach.hasNext )\n    #set( $nextToken = $util.base64Encode($util.toJson($entry.sort)) )\n  #end\n  $util.qr($es_items.add($entry.get("_source")))\n#end\n#foreach( $aggItem in $context.result.aggregations.keySet() )\n  #set( $aggResult = {} )\n  #set( $aggResultValue = {} )\n  #set( $currentAggItem = $ctx.result.aggregations.get($aggItem) )\n  $util.qr($aggResult.put("name", $aggItem))\n  #if( !$util.isNullOrEmpty($currentAggItem) )\n    #if( !$util.isNullOrEmpty($currentAggItem.get($aggItem).buckets) )\n      ## $util.qr($aggResultValue.put("__typename", "SearchableAggregateBucketResult"))\n      $util.qr($aggResultValue.put("buckets", $currentAggItem.get($aggItem).buckets))\n    #end\n    #if( !$util.isNullOrEmpty($currentAggItem.get($aggItem).value) )\n      ## $util.qr($aggResultValue.put("__typename", "SearchableAggregateScalarResult"))\n      $util.qr($aggResultValue.put("value", $currentAggItem.get($aggItem).value))\n    #end\n  #end\n  $util.qr($aggResult.put("result", $aggResultValue))\n  $util.qr($aggregateValues.add($aggResult))\n#end\n$util.toJson({\n  "items": $es_items,\n  "total": $ctx.result.hits.total.value,\n  "nextToken": $nextToken,\n  "aggregateItems": $aggregateValues\n})\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/vtl/opensearch.query.response.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/vtl/pipeline.after.ts':
      /*!******************************************************************!*\
  !*** ./lib/services/codeService/templates/vtl/pipeline.after.ts ***!
  \******************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports["default"] = `$util.toJson($ctx.prev.result)`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/vtl/pipeline.after.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/vtl/pipeline.before.ts':
      /*!*******************************************************************!*\
  !*** ./lib/services/codeService/templates/vtl/pipeline.before.ts ***!
  \*******************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports["default"] = `{}`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/vtl/pipeline.before.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/vtl/rdb.query.request.ts':
      /*!*********************************************************************!*\
  !*** ./lib/services/codeService/templates/vtl/rdb.query.request.ts ***!
  \*********************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports["default"] = `\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-rds.html\n\n{\n    "version": "2018-05-29",\n    "statements": [],\n    "variableMap": {}\n}\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/vtl/rdb.query.request.ts?'
        );

        /***/
      },

    /***/ './lib/services/codeService/templates/vtl/rdb.query.response.ts':
      /*!**********************************************************************!*\
  !*** ./lib/services/codeService/templates/vtl/rdb.query.response.ts ***!
  \**********************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports["default"] = `\n## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-rds.html\n\n#if( $ctx.error )\n  $util.error($ctx.error.message, $ctx.error.type)\n#else\n  $util.toJson($ctx.result)\n#end\n`;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/codeService/templates/vtl/rdb.query.response.ts?'
        );

        /***/
      },

    /***/ './lib/services/serverlessConfigService.ts':
      /*!*************************************************!*\
  !*** ./lib/services/serverlessConfigService.ts ***!
  \*************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          "\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ \"./lib/utils/logger.ts\"));\nconst yargonaut_1 = __webpack_require__(/*! yargonaut */ \"yargonaut\");\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nconst yaml_1 = __webpack_require__(/*! utils/yaml */ \"./lib/utils/yaml.ts\");\nconst parser_1 = __importDefault(__webpack_require__(/*! utils/parser */ \"./lib/utils/parser.ts\"));\nconst codeService_1 = __importDefault(__webpack_require__(/*! services/codeService */ \"./lib/services/codeService/index.ts\"));\nconst cloudformationService_1 = __importDefault(__webpack_require__(/*! services/cloudformationService */ \"./lib/services/cloudformationService.ts\"));\nconst iam = __importStar(__webpack_require__(/*! @aws-cdk/aws-iam */ \"@aws-cdk/aws-iam\"));\nconst cdk = __importStar(__webpack_require__(/*! aws-cdk-lib */ \"aws-cdk-lib\"));\nclass default_1 {\n    constructor(args) {\n        this.logger = logger_1.default.getLogger();\n        this._serverlessConfigPath = args.serverlessConfigPath;\n        this._lang = args.lang;\n        this._defaultFunctionYamlPath = `serverless/${args.region}/resources/functions.yml`;\n        try {\n            const doc = (0, yaml_1.loadYaml)(this.serverlessConfigPath);\n            this._serverlessConfig = doc;\n            if (lodash_1.default.isString(doc.functions)) {\n                const functionsFilePath = parser_1.default.parseSlsRecursivelyReference(doc.functions);\n                this._functionsYamlPath = functionsFilePath;\n            }\n            this._region = doc.provider.region ?? args.region;\n        }\n        catch (e) {\n            this._region = args.region;\n        }\n        this._isExistsServelessConfig = this.getIsExistsServelessConfig(this.serverlessConfigPath);\n    }\n    defaultLambdaTimeOut = 30;\n    defaultMemorySize = 1024;\n    logger;\n    _isExistsServelessConfig;\n    get isExistsServelessConfig() {\n        return this._isExistsServelessConfig;\n    }\n    _lang;\n    get lang() {\n        return this._lang;\n    }\n    _defaultFunctionYamlPath;\n    get defaultFunctionYamlPath() {\n        return this._defaultFunctionYamlPath;\n    }\n    _region;\n    get region() {\n        return this._region;\n    }\n    _serverlessConfigPath;\n    get serverlessConfigPath() {\n        return this._serverlessConfigPath;\n    }\n    _functionsYamlPath;\n    get functionsYamlPath() {\n        return this._functionsYamlPath;\n    }\n    _serverlessConfig;\n    get serverlessConfig() {\n        return this._serverlessConfig;\n    }\n    /**\n     * Whether or not the serverlessConfigService process can be executed\n     * @returns boolean\n     */\n    cannotProces() {\n        const logger = this.logger;\n        if (!this.isExistsServelessConfig) {\n            logger.warn('not found serverless config file, skip update');\n            logger.warn(`please check a input path : ${this.serverlessConfigPath}`);\n            return true;\n        }\n        if (lodash_1.default.isEmpty(this.region)) {\n            logger.warn('not found region property, skip update');\n            logger.warn(`please check a input path : ${this.serverlessConfigPath}`);\n            return true;\n        }\n        return false;\n    }\n    /**\n     * Adding Cloudformation Resources\n     * @param args\n     * @returns\n     */\n    addResource = (args) => {\n        if (this.cannotProces())\n            return;\n        const logger = this.logger;\n        const { filePath, resourceName, cf } = args;\n        // update serverless.yml\n        const updateServerlessYaml = () => {\n            const doc = this.serverlessConfig;\n            const destinationPath = path_1.default.join('./', filePath);\n            const resources = doc.resources ?? [];\n            if (resources.some((v) => v.includes(destinationPath))) {\n                logger.warn(`already exists resource file path : ${destinationPath}`);\n            }\n            else {\n                resources.push(`\\${file(./${destinationPath})}`);\n                const yamlText = (0, yaml_1.writeYaml)(this.serverlessConfigPath, {\n                    ...doc,\n                    resources,\n                });\n                logger.info(destinationPath);\n                logger.info((0, yargonaut_1.chalk)().green(yamlText));\n            }\n        };\n        // update cloudformation yaml\n        const updateCloudFormationYaml = () => {\n            try {\n                const doc = (0, yaml_1.loadYaml)(filePath) ?? {};\n                if (lodash_1.default.has(doc, `Resources.${resourceName}`)) {\n                    logger.warn(`resource name : ${resourceName}`);\n                    logger.warn(`already exists resource file path : ${filePath}`);\n                }\n                else {\n                    const yamlText = (0, yaml_1.writeYaml)(filePath, {\n                        ...doc,\n                        Resources: {\n                            ...doc.Resources,\n                            ...cf,\n                        },\n                    });\n                    logger.info(filePath);\n                    logger.info(`over right : ${filePath}`);\n                    logger.info((0, yargonaut_1.chalk)().green(yamlText));\n                }\n            }\n            catch (e) {\n                const yamlText = (0, yaml_1.writeYaml)(filePath, {\n                    Resources: {\n                        ...cf,\n                    },\n                });\n                logger.info(`created yaml file : ${filePath}`);\n                logger.info((0, yargonaut_1.chalk)().green(yamlText));\n            }\n        };\n        updateServerlessYaml();\n        updateCloudFormationYaml();\n    };\n    /**\n     * Adding Lambda Functions\n     * @param input\n     * @returns\n     */\n    addFunction = (input) => {\n        if (this.cannotProces())\n            return;\n        const { lambdaFunctionName, lambdaHandler, memorySize, timeout, code } = input;\n        const logger = this.logger;\n        logger.debug(`functionsYamlPath', functionsYamlPath`);\n        // update serverless.yml\n        const updateServerlessYaml = () => {\n            const serverlessConfig = this.serverlessConfig;\n            if (lodash_1.default.isEmpty(serverlessConfig.functions)) {\n                const yamlText = (0, yaml_1.writeYaml)(this.serverlessConfigPath, {\n                    ...serverlessConfig,\n                    functions: `\\${file(./${this.defaultFunctionYamlPath})}`,\n                });\n                logger.info('write functions property');\n                logger.info((0, yargonaut_1.chalk)().green(yamlText));\n            }\n        };\n        // update functions.yml\n        const updateCloudFormationYaml = () => {\n            const functionsYamlPath = this.functionsYamlPath ?? this.defaultFunctionYamlPath;\n            try {\n                const doc = (0, yaml_1.loadYaml)(functionsYamlPath) ?? {};\n                if (lodash_1.default.has(doc, lambdaFunctionName)) {\n                    logger.warn(`already exists lambda function at, skip update : ${lambdaFunctionName}`);\n                }\n                else {\n                    const yamlText = (0, yaml_1.writeYaml)(functionsYamlPath, {\n                        ...doc,\n                        ...this.generateFunctionYamlProperty(lambdaFunctionName, {\n                            handler: lambdaHandler,\n                            memorySize: memorySize ?? this.defaultMemorySize,\n                            timeout: timeout ?? this.defaultLambdaTimeOut,\n                        }),\n                    });\n                    logger.info('write functions property');\n                    logger.info((0, yargonaut_1.chalk)().green(yamlText));\n                }\n            }\n            catch (e) {\n                const yamlText = (0, yaml_1.writeYaml)(functionsYamlPath, {\n                    ...this.generateFunctionYamlProperty(lambdaFunctionName, {\n                        handler: lambdaHandler,\n                        memorySize: memorySize ?? this.defaultMemorySize,\n                        timeout: timeout ?? this.defaultLambdaTimeOut,\n                    }),\n                });\n                logger.info('write functions property');\n                logger.info((0, yargonaut_1.chalk)().green(yamlText));\n            }\n        };\n        // write a function handler file (typescript)\n        const createHandlerFile = () => {\n            new codeService_1.default({ filePath: lambdaHandler, code, type: 'typescript' }).write();\n        };\n        // write iam role\n        const updateIamRole = () => {\n            this.addResource({\n                filePath: `serverless/${this.region}/resources/iam-role.yml`,\n                resourceName: 'DefaultLambdaRole',\n                cf: this.generateDefaultLambdaRoleCf(lambdaFunctionName),\n            });\n        };\n        updateServerlessYaml();\n        updateCloudFormationYaml();\n        createHandlerFile();\n        updateIamRole();\n    };\n    generateFunctionYamlProperty = (resourceName, input) => {\n        return {\n            [resourceName]: {\n                handler: input?.handler ?? 'index.handler',\n                name: input?.name ?? resourceName,\n                memorySize: input?.memorySize ?? this.defaultMemorySize,\n                timeout: input?.timeout ?? this.defaultLambdaTimeOut,\n            },\n        };\n    };\n    getIsExistsServelessConfig(filePath) {\n        if (lodash_1.default.isEmpty(filePath)) {\n            this.logger.warn('not found serverless config file, skip update');\n            this.logger.warn(`please check a input path : ${filePath}`);\n            return false;\n        }\n        try {\n            (0, yaml_1.loadYaml)(filePath) ?? {};\n            return true;\n        }\n        catch (e) {\n            this.logger.warn('not found serverless config file, skip update');\n            this.logger.warn(`please check a input path : ${filePath}`);\n            return false;\n        }\n    }\n    generateDefaultLambdaRoleCf(roleName) {\n        return cloudformationService_1.default.generateCloudFormation(roleName, (c) => {\n            const role = new iam.Role(c, roleName, {\n                assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),\n            });\n            role.addToPolicy(new iam.PolicyStatement({\n                effect: iam.Effect.ALLOW,\n                resources: [cdk.Fn.join(':', ['arn:aws:logs', cdk.Fn.ref('AWS::Region'), cdk.Fn.ref('AWS::AccountId'), 'log-group:/aws/lambda/*:*:*'])],\n                actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],\n            }));\n            role.addToPolicy(new iam.PolicyStatement({\n                effect: iam.Effect.ALLOW,\n                resources: [cdk.Fn.join(':', ['arn:aws:logs', this.region, cdk.Fn.ref('AWS::AccountId'), 'log-group:/aws/lambda/*:*:*'])],\n                actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],\n            }));\n            return role;\n        });\n    }\n    static generateServerlessConfig = (config) => {\n        return {\n            service: config?.service ?? 'starter',\n            useDotenv: config?.useDotenv ?? true,\n            provider: {\n                name: config?.provider?.name ?? 'aws',\n                runtime: config?.provider?.runtime ?? 'nodejs18.x',\n                stage: config?.provider?.stage ?? '${opt:stage}',\n                region: config?.provider?.region ?? 'ap-northeast-1',\n                iam: {\n                    role: config?.provider?.iam?.role ?? 'DefaultLambdaRole',\n                },\n                environment: {\n                    STAGE: config?.provider?.environment?.STAGE ?? '${self:provider.stage}',\n                    REGION: config?.provider?.environment?.REGION ?? '${self:provider.region}',\n                    AWS_RESOURCE_PRIFIX: config?.provider?.environment?.AWS_RESOURCE_PRIFIX ?? '${self:custom.awsResourcePrefix}',\n                    LOG_LEVEL: config?.provider?.environment?.LOG_LEVEL ?? 'INFO',\n                },\n            },\n            plugins: config?.plugins ?? ['serverless-webpack', 'serverless-prune-plugin'],\n            functions: config?.functions ?? '${file(./serverless/ap-northeast-1/resources/functions.yml)}',\n            resources: config?.resources ?? [],\n            package: {\n                individually: config?.package?.individually ?? true,\n                includeModules: config?.package?.includeModules ?? true,\n                patterns: config?.package?.patterns ?? ['!appsync/*,*', '!node_modules/**', '!resources/**', '!__tests__/**', '!.git/**', '!tmp/**'],\n            },\n            custom: {\n                awsResourcePrefix: config?.custom?.awsResourcePrefix ?? '${self:service}-${self:provider.stage}-',\n                webpack: config?.custom?.webpack ?? {\n                    includeModules: true,\n                    packager: 'npm',\n                },\n                prune: config?.custom?.prune ?? {\n                    automatic: true,\n                    number: 3,\n                },\n            },\n        };\n    };\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/services/serverlessConfigService.ts?"
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
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.asFullPath = exports.createDirectories = exports.isFileExists = exports.isExistsDirectory = exports.cleanUpTmpDirectory = exports.moveDirectory = exports.gitClone = void 0;\nconst index_1 = __webpack_require__(/*! exceptions/index */ "./lib/exceptions/index.ts");\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ "./lib/utils/logger.ts"));\nconst fs_extra_1 = __importDefault(__webpack_require__(/*! fs-extra */ "fs-extra"));\nconst config_1 = __importDefault(__webpack_require__(/*! config */ "./lib/config.ts"));\nconst isomorphic_git_1 = __importDefault(__webpack_require__(/*! isomorphic-git */ "isomorphic-git"));\nconst node_1 = __importDefault(__webpack_require__(/*! isomorphic-git/http/node */ "isomorphic-git/http/node"));\nconst path_1 = __importDefault(__webpack_require__(/*! path */ "path"));\nasync function gitClone(repositoryUrl, destinationPath) {\n    const logger = logger_1.default.getLogger();\n    try {\n        logger.debug(`git clone : ${repositoryUrl} -> ${destinationPath}`);\n        await fs_extra_1.default.promises.mkdir(destinationPath, { recursive: true });\n        await isomorphic_git_1.default.clone({\n            fs: fs_extra_1.default,\n            http: node_1.default,\n            dir: destinationPath,\n            url: repositoryUrl,\n            singleBranch: true,\n            depth: 1,\n        });\n    }\n    catch (error) {\n        const err = error;\n        throw new index_1.CLIError(err.message);\n    }\n}\nexports.gitClone = gitClone;\nfunction moveDirectory(sourcePath, destinationPath) {\n    const logger = logger_1.default.getLogger();\n    try {\n        logger.debug(`move : ${sourcePath} -> ${destinationPath}`);\n        fs_extra_1.default.renameSync(sourcePath, destinationPath);\n    }\n    catch (error) {\n        const err = error;\n        throw new index_1.CLIError(err.message);\n    }\n}\nexports.moveDirectory = moveDirectory;\nfunction cleanUpTmpDirectory() {\n    const logger = logger_1.default.getLogger();\n    try {\n        logger.debug(`clean up tmp directory : ${config_1.default.tmpPath}`);\n        fs_extra_1.default.removeSync(config_1.default.tmpPath);\n        logger.debug(`create tmp directory : ${config_1.default.tmpPath}`);\n        fs_extra_1.default.mkdirSync(config_1.default.tmpPath, { recursive: true });\n    }\n    catch (error) {\n        const err = error;\n        throw new index_1.CLIError(err.message);\n    }\n}\nexports.cleanUpTmpDirectory = cleanUpTmpDirectory;\nfunction isExistsDirectory(directoryPath) {\n    const logger = logger_1.default.getLogger();\n    try {\n        logger.debug(`check exists directory : ${directoryPath}`);\n        const stats = fs_extra_1.default.statSync(directoryPath);\n        return stats.isDirectory();\n    }\n    catch (error) {\n        if (error.code === \'ENOENT\') {\n            return false;\n        }\n        else {\n            throw error;\n        }\n    }\n}\nexports.isExistsDirectory = isExistsDirectory;\nfunction isFileExists(filePath) {\n    try {\n        fs_extra_1.default.accessSync(filePath);\n        return true;\n    }\n    catch (error) {\n        return false;\n    }\n}\nexports.isFileExists = isFileExists;\nconst createDirectories = (filePath) => {\n    const directories = filePath.split(path_1.default.sep).slice(0, -1);\n    directories.reduce((currentPath, directory) => {\n        currentPath = path_1.default.join(currentPath, directory);\n        if (!fs_extra_1.default.existsSync(currentPath)) {\n            fs_extra_1.default.mkdirSync(currentPath);\n        }\n        return currentPath;\n    }, \'\');\n};\nexports.createDirectories = createDirectories;\nconst asFullPath = (destinationPath) => {\n    return path_1.default.join(config_1.default.currentPath, destinationPath);\n};\nexports.asFullPath = asFullPath;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/cli.ts?'
        );

        /***/
      },

    /***/ './lib/utils/graphql/analyzer.ts':
      /*!***************************************!*\
  !*** ./lib/utils/graphql/analyzer.ts ***!
  \***************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst graphql_compose_1 = __webpack_require__(/*! graphql-compose */ "graphql-compose");\nconst schema_1 = __webpack_require__(/*! @graphql-tools/schema */ "@graphql-tools/schema");\nconst appsyncScalars_1 = __webpack_require__(/*! utils/graphql/appsyncScalars */ "./lib/utils/graphql/appsyncScalars.ts");\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));\n/**\n * Parsing existing Graphql syntax\n */\nclass GraphqlAnalyzer {\n    constructor(schema) {\n        this._schema = schema;\n        this._schemaComposer = lodash_1.default.isEmpty(schema) ? [new graphql_compose_1.SchemaComposer()] : schema.map((s) => new graphql_compose_1.SchemaComposer((0, appsyncScalars_1.addScalrs)(s)));\n        this._mergedSchema = (0, schema_1.mergeSchemas)({ schemas: this._schemaComposer.map((s) => s.buildSchema()) });\n        this._mutations = this._schemaComposer.map((s) => {\n            try {\n                const res = s.getOTC(\'Mutation\').getFields();\n                return res;\n            }\n            catch (e) {\n                return {};\n            }\n        });\n        this._queries = this._schemaComposer.map((s) => {\n            try {\n                const res = s.getOTC(\'Query\').getFields();\n                return res;\n            }\n            catch (e) {\n                return {};\n            }\n        });\n        this._subscriptions = this._schemaComposer.map((s) => {\n            try {\n                const res = s.getOTC(\'Subscription\').getFields();\n                return res;\n            }\n            catch (e) {\n                return {};\n            }\n        });\n    }\n    _mutations;\n    get mutations() {\n        return this._mutations;\n    }\n    _queries;\n    get queries() {\n        return this._queries;\n    }\n    _subscriptions;\n    get subscriptions() {\n        return this._subscriptions;\n    }\n    _schema;\n    get schema() {\n        return this._schema;\n    }\n    _schemaComposer;\n    get schemaComposer() {\n        return this._schemaComposer;\n    }\n    _mergedSchema;\n    get mergedSchema() {\n        return this._mergedSchema;\n    }\n    isExistsMutationApi(apiName) {\n        return lodash_1.default.some(this.mutations, (s) => lodash_1.default.has(s, apiName));\n    }\n    isExistsQueryApi(apiName) {\n        return lodash_1.default.some(this.queries, (s) => lodash_1.default.has(s, apiName));\n    }\n    isExistsSubscriptionApi(apiName) {\n        return lodash_1.default.some(this.subscriptions, (s) => lodash_1.default.has(s, apiName));\n    }\n}\nexports["default"] = GraphqlAnalyzer;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/graphql/analyzer.ts?'
        );

        /***/
      },

    /***/ './lib/utils/graphql/appsyncScalars.ts':
      /*!*********************************************!*\
  !*** ./lib/utils/graphql/appsyncScalars.ts ***!
  \*********************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.removeScalars = exports.addScalrs = void 0;\nconst scalrsString = `\n  scalar ID\n  scalar String\n  scalar Int\n  scalar Float\n  scalar Boolean\n  scalar AWSDate\n  scalar AWSTime\n  scalar AWSDateTime\n  scalar AWSTimestamp\n  scalar AWSEmail\n  scalar AWSJSON\n  scalar AWSPhone\n  scalar AWSURL\n  scalar AWSIPAddress\n`;\nconst addScalrs = (schema) => {\n    return `${scalrsString}\n  ${schema}`;\n};\nexports.addScalrs = addScalrs;\nconst removeScalars = (schema) => {\n    return schema.replace(scalrsString, \'\');\n};\nexports.removeScalars = removeScalars;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/graphql/appsyncScalars.ts?'
        );

        /***/
      },

    /***/ './lib/utils/graphql/editor.ts':
      /*!*************************************!*\
  !*** ./lib/utils/graphql/editor.ts ***!
  \*************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst graphql_compose_1 = __webpack_require__(/*! graphql-compose */ "graphql-compose");\nconst graphql_1 = __webpack_require__(/*! graphql */ "graphql");\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ "./lib/utils/logger.ts"));\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));\nconst cli_1 = __webpack_require__(/*! utils/cli */ "./lib/utils/cli.ts");\nconst fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));\nconst yargonaut_1 = __webpack_require__(/*! yargonaut */ "yargonaut");\nconst appsyncScalars_1 = __webpack_require__(/*! utils/graphql/appsyncScalars */ "./lib/utils/graphql/appsyncScalars.ts");\nclass GraphqlEditor {\n    constructor(opt) {\n        const initAllSchemaComposer = () => {\n            if (this.customSchema) {\n                this.allSchemaComposer.merge((0, graphql_1.buildSchema)(this.customSchema));\n            }\n            if (this.defaultSchema) {\n                this.allSchemaComposer.merge((0, graphql_1.buildSchema)(this.defaultSchema));\n            }\n        };\n        const initCustomSchemaComposer = () => {\n            if (this.customSchema) {\n                this.customSchemaComposer.merge((0, graphql_1.buildSchema)(this.customSchema));\n            }\n        };\n        this.logger = logger_1.default.getLogger();\n        this._customSchemaPath = opt?.customSchemaPath ?? this.defaultCustomSchemaPath;\n        this._defaultSchemaPath = opt?.defaultSchemaPath ?? this.defaultDefaultSchemaPath;\n        this.readOrSetCustomSchema();\n        this.readOrSetDefaultSchema();\n        initAllSchemaComposer();\n        initCustomSchemaComposer();\n    }\n    logger;\n    defaultCustomSchemaPath = \'appsync/custom_schema.graphql\';\n    defaultDefaultSchemaPath = \'appsync/schema.graphql\';\n    _customSchemaPath;\n    _defaultSchemaPath;\n    _customSchemaComposer = new graphql_compose_1.SchemaComposer();\n    _allSchemaComposer = new graphql_compose_1.SchemaComposer();\n    _defaultSchema;\n    _customSchema;\n    get defaultSchemaPath() {\n        return this._defaultSchemaPath;\n    }\n    get customSchemaPath() {\n        return this._customSchemaPath;\n    }\n    get defaultSchema() {\n        if (!this._defaultSchema)\n            return;\n        return (0, appsyncScalars_1.addScalrs)(this._defaultSchema);\n    }\n    get customSchema() {\n        if (!this._customSchema)\n            return;\n        return (0, appsyncScalars_1.addScalrs)(this._customSchema);\n    }\n    get customSchemaComposer() {\n        return this._customSchemaComposer;\n    }\n    get allSchemaComposer() {\n        return this._allSchemaComposer;\n    }\n    readOrSetCustomSchema() {\n        try {\n            this._customSchema = fs_1.default.readFileSync((0, cli_1.asFullPath)(this.customSchemaPath), \'utf8\');\n        }\n        catch (e) {\n            this.logger.debug(e);\n            this.logger.warn(`custom_schema.graphql is not found.`);\n        }\n    }\n    readOrSetDefaultSchema() {\n        try {\n            this._defaultSchema = fs_1.default.readFileSync((0, cli_1.asFullPath)(this.defaultSchemaPath), \'utf8\');\n        }\n        catch (e) {\n            this.logger.debug(e);\n            this.logger.warn(`schema.graphql is not found.`);\n        }\n    }\n    listQueies() {\n        return this.allSchemaComposer.getOTC(\'Query\').getFields();\n    }\n    listMutation() {\n        return this.allSchemaComposer.getOTC(\'Mutation\').getFields();\n    }\n    listSubscription() {\n        return this.allSchemaComposer.getOTC(\'Subscription\').getFields();\n    }\n    addExampleInput(apiName) {\n        return graphql_compose_1.InputTypeComposer.create(`\n      input ${apiName}Input {\n        example: String!\n      },\n    `, this.customSchemaComposer);\n    }\n    addExampleType(apiName) {\n        return graphql_compose_1.ObjectTypeComposer.create(`\n      type ${apiName}Response {\n        example: String!\n      }\n    `, this.customSchemaComposer);\n    }\n    addMutationField(_args) {\n        const { apiName, input, type } = _args;\n        this.customSchemaComposer.Mutation.addFields({\n            [apiName]: {\n                type,\n                args: {\n                    input: new graphql_1.GraphQLNonNull(input),\n                },\n            },\n        });\n        return this;\n    }\n    addQueryField(_args) {\n        const { apiName, args, type } = _args;\n        this.customSchemaComposer.Query.addFields({\n            [apiName]: {\n                type,\n                args,\n            },\n        });\n        return this;\n    }\n    updateCustomSchemaGraphl(args) {\n        const { query, mutation, callback } = args;\n        // update custom_schema.graphql\n        let updated = false;\n        if (query || mutation) {\n            if (query) {\n                if (lodash_1.default.has(this.listQueies(), query.apiName)) {\n                    this.logger.warn(`Query ${query.apiName} is already exists.`);\n                    updated = false;\n                }\n                else {\n                    this.addQueryField(query);\n                    updated = true;\n                }\n            }\n            if (mutation) {\n                if (lodash_1.default.has(this.listMutation(), mutation.apiName)) {\n                    this.logger.warn(`Mutation ${mutation.apiName} is already exists.`);\n                    updated = false;\n                }\n                else {\n                    this.addMutationField(mutation);\n                    updated = true;\n                }\n            }\n        }\n        else {\n            this.logger.warn(\'query or mutation is empty.\');\n        }\n        if (updated) {\n            const schema = this.printSchema();\n            fs_1.default.writeFileSync((0, cli_1.asFullPath)(this.defaultCustomSchemaPath), schema, \'utf8\');\n            this.logger.info((0, yargonaut_1.chalk)().green(schema));\n            this.readOrSetCustomSchema();\n        }\n        if (callback) {\n            callback(updated, {\n                schemaPath: this.defaultCustomSchemaPath,\n            });\n        }\n    }\n    removeEmptyLines(schemaString) {\n        const lines = schemaString.split(\'\\n\');\n        const filteredLines = lines.filter((line) => !line.includes(\'""""""\'));\n        return filteredLines.join(\'\\n\');\n    }\n    printSchema() {\n        const res = (0, graphql_compose_1.printSchema)(this.customSchemaComposer.buildSchema());\n        const trimmedSchema = this.removeEmptyLines(res);\n        return (0, appsyncScalars_1.removeScalars)(trimmedSchema);\n    }\n}\nexports["default"] = GraphqlEditor;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/graphql/editor.ts?'
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

    /***/ './lib/utils/inquirer/tablePrompt.ts':
      /*!*******************************************!*\
  !*** ./lib/utils/inquirer/tablePrompt.ts ***!
  \*******************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst inquirer_table_prompt_1 = __importDefault(__webpack_require__(/*! inquirer-table-prompt */ "inquirer-table-prompt"));\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));\nclass TablePrompt extends inquirer_table_prompt_1.default {\n    constructor(questions, rl, answers) {\n        // eslint-disable-next-line @typescript-eslint/no-unsafe-call\n        super(questions, rl, answers);\n        this.values = lodash_1.default.map(questions.rows, (row) => {\n            return row.value;\n        });\n    }\n}\nexports["default"] = TablePrompt;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/inquirer/tablePrompt.ts?'
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
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));\nclass default_1 {\n    static parseFilePath(input) {\n        const parts = input.split(\'/\');\n        const path = parts.slice(0, -1);\n        const filename = parts[parts.length - 1];\n        return [path.length > 0 ? path : [], filename];\n    }\n    static parseSlsRecursivelyReference = (str) => {\n        if (lodash_1.default.isEmpty(str))\n            return undefined;\n        const regex = /\\${file\\((.*?)\\)}/;\n        const match = str.match(regex);\n        if (match) {\n            const pathInfo = match[1];\n            return pathInfo;\n        }\n    };\n    static extractFilename(input) {\n        const array = input.split(\'.\');\n        if (array.length === 1)\n            return input;\n        else if (array.length === 2)\n            return array[0];\n        array.pop();\n        return array.join(\'.\');\n    }\n}\nexports["default"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/parser.ts?'
        );

        /***/
      },

    /***/ './lib/utils/validator/index.ts':
      /*!**************************************!*\
  !*** ./lib/utils/validator/index.ts ***!
  \**************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));\nconst getLocale_1 = __webpack_require__(/*! utils/validator/utils/getLocale */ "./lib/utils/validator/utils/getLocale.ts");\nclass Validator {\n    constructor(input, lang) {\n        this._input = input;\n        this._lang = lang;\n        this._locale = (0, getLocale_1.getLocaleLang)(this._lang);\n    }\n    _input;\n    _lang;\n    _locale;\n    validations = [];\n    get locale() {\n        return this._locale;\n    }\n    get input() {\n        return this._input;\n    }\n    required = () => {\n        this.validations.push(() => {\n            if (lodash_1.default.isUndefined(this.input) || lodash_1.default.isNull(this.input))\n                return this.locale.required;\n            if (lodash_1.default.isString(this.input) && lodash_1.default.isEmpty(this.input))\n                return this.locale.required;\n            if (lodash_1.default.isArray(this.input) && !lodash_1.default.every(this.input))\n                return this.locale.required;\n            return true;\n        });\n        return this;\n    };\n    mustNoIncludeZenkaku = () => {\n        this.validations.push(() => {\n            if (!lodash_1.default.isString(this.input))\n                return true;\n            // eslint-disable-next-line no-control-regex\n            const containsFullWidthCharacter = /[^\\x01-\\x7E]/.test(this.input.toString());\n            if (containsFullWidthCharacter)\n                return this.locale.mustNoIncludeZenkaku;\n            return true;\n        });\n        return this;\n    };\n    mustBeYamlFilePath = () => {\n        this.validations.push(() => {\n            if (!lodash_1.default.isString(this.input))\n                return true;\n            if (!this.input.endsWith(\'.yml\') && !this.input.endsWith(\'.yaml\'))\n                return this.locale.mustBeYamlFilePath;\n            return true;\n        });\n        return this;\n    };\n    mustBeExtension = () => {\n        this.validations.push(() => {\n            const pattern = /\\.[^.]*$/;\n            if (!lodash_1.default.isString(this.input))\n                return true;\n            if (!pattern.test(this.input))\n                return this.locale.mustBeExtension;\n            return true;\n        });\n        return this;\n    };\n    value() {\n        for (let i = 0; i < this.validations.length; i++) {\n            const result = this.validations[i]();\n            if (lodash_1.default.isString(result))\n                return result;\n        }\n        return true;\n    }\n}\nexports["default"] = Validator;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/validator/index.ts?'
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
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.loadYaml = exports.writeYaml = void 0;\nconst fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));\nconst js_yaml_1 = __importDefault(__webpack_require__(/*! js-yaml */ "js-yaml"));\nconst yaml_cfn_1 = __webpack_require__(/*! yaml-cfn */ "yaml-cfn");\nconst cli_1 = __webpack_require__(/*! utils/cli */ "./lib/utils/cli.ts");\nconst writeYaml = (destinationPath, data) => {\n    const yamlText = js_yaml_1.default.dump(data, { schema: yaml_cfn_1.schema, indent: 2, lineWidth: -1 });\n    (0, cli_1.createDirectories)(destinationPath);\n    fs_1.default.writeFileSync((0, cli_1.asFullPath)(destinationPath), yamlText, \'utf8\');\n    return yamlText;\n};\nexports.writeYaml = writeYaml;\nconst loadYaml = (sourcePath) => {\n    return js_yaml_1.default.load(fs_1.default.readFileSync((0, cli_1.asFullPath)(sourcePath), \'utf8\'), { schema: yaml_cfn_1.schema });\n};\nexports.loadYaml = loadYaml;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/yaml.ts?'
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

    /***/ graphql:
      /*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
      /***/ (module) => {
        module.exports = require('graphql');

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

    /***/ 'inquirer-table-prompt':
      /*!****************************************!*\
  !*** external "inquirer-table-prompt" ***!
  \****************************************/
      /***/ (module) => {
        module.exports = require('inquirer-table-prompt');

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
          'module.exports = JSON.parse(\'{"name":"ragate-cli","version":"0.2.0","description":"Anyone can immediately start a serverless project using the CLI, automatically generate source code, and start an infinitely extensible and maintainable serverless development project.","engines":{"node":">=18.x"},"scripts":{"test":"echo \\\'Sorry, test code is in preparation.\\\\n\\\'","build:dev":"ENV=development webpack","build:prd":"ENV=production webpack","lint":"eslint . --fix","format":"prettier . --write","prepare":"husky install"},"eslintIgnore":["!/.github",".serverless","bin","tmp","webpack.config.js"],"main":"./lib/app.ts","bin":{"ragate":"./bin/app.js"},"repository":{"type":"git","url":"git+https://github.com/ragate-inc/ragate-cli.git"},"lint-staged":{"*.{ts,js}":["eslint"],"*.{css,html,js,json,md,yaml,yml,ts,js}":["prettier . --write"]},"keywords":["aws","serverless","ragate","cli","amplify","serverless","lambda","amazon"],"author":"Ragate inc.","license":"MIT","bugs":{"url":"https://github.com/ragate-inc/ragate-cli/issues"},"homepage":"https://github.com/ragate-inc/ragate-cli#readme","devDependencies":{"@tsconfig/node-lts":"^18.12.1","@types/figlet":"^1.5.6","@types/fs-extra":"^11.0.1","@types/inquirer":"^9.0.3","@types/inquirer-autocomplete-prompt":"^3.0.0","@types/js-yaml":"^4.0.5","@types/lodash":"^4.14.194","@types/node":"^18.16.3","@types/webpack":"^5.28.1","@types/webpack-node-externals":"^3.0.0","@types/yargs":"^17.0.24","@typescript-eslint/eslint-plugin":"^5.59.2","@typescript-eslint/parser":"^5.59.2","eslint":"^8.39.0","eslint-config-prettier":"^8.8.0","eslint-config-standard-with-typescript":"^34.0.1","husky":"^6.0.0","lint-staged":"^13.2.2","prettier":"2.8.8","ts-loader":"^9.4.2","ts-node":"^10.9.1","tsconfig-paths-webpack-plugin":"^4.0.1","typescript":"^5.0.4","webpack":"^5.81.0","webpack-cli":"^5.0.2","webpack-node-externals":"^3.0.0"},"dependencies":{"@aws-cdk/assert":"^2.68.0","@aws-cdk/aws-iam":"^1.201.0","@aws-cdk/aws-sns":"^1.201.0","@aws-cdk/aws-sns-subscriptions":"^1.201.0","@aws-cdk/aws-sqs":"^1.201.0","aws-cdk-lib":"^2.79.1","figlet":"^1.6.0","fs-extra":"^11.1.1","graphql":"^16.6.0","graphql-compose":"^9.0.10","graphql-tools":"^8.3.20","inquirer":"^8.0.0","inquirer-autocomplete-prompt":"^2.0.0","inquirer-table-prompt":"^0.2.1","isomorphic-git":"^1.23.0","js-yaml":"^4.1.0","lodash":"^4.17.21","parent-require":"^1.0.0","pino":"^8.12.1","pino-pretty":"^10.0.0","yaml-cfn":"^0.3.2","yargonaut":"^1.1.4","yargs":"^17.1.1-candidate.0"}}\');\n\n//# sourceURL=webpack://ragate-cli/./package.json?'
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
