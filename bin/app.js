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
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst package_json_1 = __importDefault(__webpack_require__(/*! package.json */ "./package.json"));\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));\n// Additional templates selectable via CLI\n// Consider migrating to a separate file if template types become bloated\nconst templates = [\n    {\n        category: \'Node.js\',\n        name: \'Node.js - aws-node-appsync\',\n        value: \'aws-node-appsync\',\n    },\n];\nconst config = {\n    // current npm package version in package.json\n    npmVersion: package_json_1.default.version,\n    // repository of template\n    repositoyUrl: \'https://github.com/ragate-inc/serverless-starter\',\n    // templates at repository\n    templates: lodash_1.default.chain(templates)\n        .sortBy(\'category\')\n        .map((item) => ({\n        name: `${item.category} - ${item.name}`,\n        value: item.value,\n    }))\n        .value(),\n};\nexports["default"] = config;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/config.ts?'
        );

        /***/
      },

    /***/ './lib/entry/builder.ts':
      /*!******************************!*\
  !*** ./lib/entry/builder.ts ***!
  \******************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          "\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ \"./lib/utils/logger.ts\"));\nconst yargs_1 = __importDefault(__webpack_require__(/*! yargs/yargs */ \"yargs/yargs\"));\nconst yargonaut_1 = __webpack_require__(/*! utils/yargonaut */ \"./lib/utils/yargonaut.ts\");\nconst config_1 = __importDefault(__webpack_require__(/*! config */ \"./lib/config.ts\"));\nconst getLocale_1 = __webpack_require__(/*! entry/utils/getLocale */ \"./lib/entry/utils/getLocale.ts\");\nconst index_1 = __importDefault(__webpack_require__(/*! features/create/index */ \"./lib/features/create/index.ts\"));\nconst index_2 = __importDefault(__webpack_require__(/*! features/add/index */ \"./lib/features/add/index.ts\"));\nconst index_3 = __webpack_require__(/*! types/index */ \"./lib/types/index.ts\");\n/**\n * yargs typescript : https://github.com/yargs/yargs/blob/main/docs/typescript.md\n * yargs api reference : https://yargs.js.org/docs/\n * Inquirer : https://github.com/SBoudrias/Inquirer.js/tree/master\n */\nclass default_1 {\n    constructor() {\n        (0, yargonaut_1.init)();\n        this.chalk = yargonaut_1.chalk;\n        const argv = (0, yargs_1.default)(process.argv.slice(2))\n            .options({\n            lang: {\n                default: this.langRef.default,\n                type: this.langRef.type,\n            },\n            verbose: {\n                default: this.verboseRef.default,\n                type: this.verboseRef.type,\n            },\n            region: {\n                default: this.regionRef.default,\n                type: this.regionRef.type,\n            },\n        })\n            .help(false)\n            .version(false)\n            .parseSync();\n        this.lang = argv.lang;\n        this.verbose = argv.verbose;\n        this.region = argv.region;\n        this.locale = (0, getLocale_1.getLocaleLang)(argv.lang);\n        this.logger = logger_1.default.getLogger(this.verbose ? 'debug' : 'info');\n        this.npmVersion = config_1.default.npmVersion;\n    }\n    chalk;\n    logger;\n    locale;\n    lang;\n    langRef = {\n        default: process.env.LANG ?? 'en',\n        type: 'string',\n    };\n    verbose;\n    verboseRef = {\n        default: false,\n        type: 'string',\n    };\n    npmVersion;\n    get version() {\n        return `ragate-cli v${this.npmVersion}`;\n    }\n    region;\n    regionRef = {\n        default: 'ap-northeast-1',\n        type: 'string',\n    };\n    handleError(err) {\n        const res = [];\n        if (err) {\n            if (err.stack)\n                res.push(err.stack);\n            else\n                res.push(err.message);\n        }\n        console.error('\\n', yargonaut_1.chalk.red(res.join('\\n\\n')));\n        process.exit(1);\n    }\n    cli() {\n        const { version, chalk, locale, lang } = this;\n        return (0, yargs_1.default)(process.argv.slice(2))\n            .scriptName('')\n            .options({\n            verbose: {\n                describe: chalk.grey(locale.options.describe.verbose),\n                default: this.verboseRef.default,\n                type: this.verboseRef.type,\n            },\n            lang: {\n                describe: chalk.grey(locale.options.describe.lang),\n                default: this.langRef.default,\n                type: this.langRef.type,\n            },\n            region: {\n                alias: 'r',\n                describe: chalk.grey(locale.options.describe.region),\n                default: this.regionRef.default,\n                type: this.regionRef.type,\n                choices: index_3.awsRegions,\n            },\n        })\n            .usage(version)\n            .help('help', chalk.grey(locale.help))\n            .alias('h', 'help')\n            .version('version', chalk.grey(locale.version), version)\n            .alias('v', 'version')\n            .check((argv) => {\n            if (argv._.length === 0)\n                throw new Error(this.locale.unProcessed.required);\n            return true;\n        })\n            .command('create', chalk.grey(locale.command.description.create), (_yargs) => {\n            const args = { lang: this.lang, region: this.region };\n            return new index_1.default.builder(args).build(_yargs);\n        }, (argv) => new index_1.default.handler(argv).run())\n            .command('add', chalk.grey(locale.command.description.add), (_yargs) => {\n            const args = { lang: this.lang, region: this.region };\n            return new index_2.default.builder(args).build(_yargs);\n        })\n            .command('*', '', () => ({}), () => {\n            throw new Error(this.locale.unProcessed.notFound);\n        })\n            .wrap(Math.max((0, yargs_1.default)().terminalWidth() - 5, 60))\n            .locale(lang)\n            .fail((msg, err) => this.handleError(err));\n    }\n    async run() {\n        try {\n            await this.cli().parseAsync();\n        }\n        catch (e) {\n            this.handleError(e);\n        }\n    }\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/entry/builder.ts?"
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
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst index_1 = __webpack_require__(/*! types/index */ "./lib/types/index.ts");\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ "./lib/utils/logger.ts"));\nconst sns_1 = __importDefault(__webpack_require__(/*! features/add/features/sns */ "./lib/features/add/features/sns/index.ts"));\nconst sqs_1 = __importDefault(__webpack_require__(/*! features/add/features/sqs */ "./lib/features/add/features/sqs/index.ts"));\nconst yargonaut_1 = __webpack_require__(/*! utils/yargonaut */ "./lib/utils/yargonaut.ts");\nconst getLocale_1 = __webpack_require__(/*! features/add/utils/getLocale */ "./lib/features/add/utils/getLocale.ts");\nclass default_1 extends index_1.FeatureBuilderAbstract {\n    constructor(args) {\n        super(args);\n    }\n    build(yargs) {\n        const lang = this.args.lang;\n        const locale = (0, getLocale_1.getLocaleLang)(lang);\n        const logger = logger_1.default.getLogger();\n        return yargs\n            .version(false)\n            .usage(\'Usage: add <command> <options>\')\n            .command(\'sns\', yargonaut_1.chalk.grey(locale.command.description.sns), (_yargs) => new sns_1.default.builder(this.args).build(_yargs), (argv) => new sns_1.default.handler(argv).run())\n            .command(\'sqs\', yargonaut_1.chalk.grey(locale.command.description.sns), (_yargs) => new sqs_1.default.builder(this.args).build(_yargs), (argv) => new sqs_1.default.handler(argv).run())\n            .command(\'*\', yargonaut_1.chalk.grey(\'<command> <options>\'), () => ({}), () => {\n            logger.error(yargonaut_1.chalk.red(locale.unProcessed));\n        });\n    }\n}\nexports["default"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/builder.ts?'
        );

        /***/
      },

    /***/ './lib/features/add/features/sns/builder.ts':
      /*!**************************************************!*\
  !*** ./lib/features/add/features/sns/builder.ts ***!
  \**************************************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst index_1 = __webpack_require__(/*! types/index */ "./lib/types/index.ts");\nclass default_1 extends index_1.FeatureBuilderAbstract {\n    constructor(args) {\n        super(args);\n    }\n    build(_yargs) {\n        return _yargs.version(false).usage(\'Usage: $0 sns \');\n    }\n}\nexports["default"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sns/builder.ts?'
        );

        /***/
      },

    /***/ './lib/features/add/features/sns/handler.ts':
      /*!**************************************************!*\
  !*** ./lib/features/add/features/sns/handler.ts ***!
  \**************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          "\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ \"./lib/utils/logger.ts\"));\nconst index_1 = __webpack_require__(/*! types/index */ \"./lib/types/index.ts\");\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nconst cli_1 = __webpack_require__(/*! utils/cli */ \"./lib/utils/cli.ts\");\nconst yaml_1 = __webpack_require__(/*! utils/yaml */ \"./lib/utils/yaml.ts\");\nconst getLocale_1 = __webpack_require__(/*! features/add/features/sns/utils/getLocale */ \"./lib/features/add/features/sns/utils/getLocale.ts\");\nconst index_2 = __webpack_require__(/*! exceptions/index */ \"./lib/exceptions/index.ts\");\nconst inquirer_1 = __importDefault(__webpack_require__(/*! inquirer */ \"inquirer\"));\nconst validator_1 = __importDefault(__webpack_require__(/*! utils/validator */ \"./lib/utils/validator.ts\"));\nconst transformer_1 = __importDefault(__webpack_require__(/*! utils/transformer */ \"./lib/utils/transformer.ts\"));\nclass default_1 extends index_1.FeatureHandlerAbstract {\n    constructor(argv) {\n        super(argv);\n    }\n    get defaultResourcePath() {\n        return `serverless/${this.argv.region}/resources/sns.yml`;\n    }\n    get defaultServerlessConfigPath() {\n        return `serverless/${this.argv.region}/serverless.yml`;\n    }\n    async run() {\n        const logger = logger_1.default.getLogger();\n        const locale = (0, getLocale_1.getLocaleLang)(this.lang);\n        const res = (await inquirer_1.default\n            .prompt([\n            {\n                type: 'input',\n                name: 'resourceName',\n                message: 'input a sns resource name]',\n                validate: (value) => {\n                    if (lodash_1.default.isEmpty(value))\n                        return locale.error.reqiredResourceName;\n                    return validator_1.default.resourceName(value, this.lang);\n                },\n            },\n            {\n                type: 'checkbox',\n                name: 'subscriptions',\n                message: 'select a sns subscriptions]',\n                choices: ['email', 'lambda'],\n                validate: (value) => {\n                    if (lodash_1.default.isEmpty(value))\n                        return locale.error.reqiredSubscriptions;\n                    return true;\n                },\n            },\n            {\n                type: 'input',\n                name: 'filePath',\n                message: 'input a cloudformation file path]',\n                default: () => this.defaultResourcePath,\n                validate: (value) => validator_1.default.filePath(value, this.lang),\n                transformer: (input) => transformer_1.default.filePath(input),\n            },\n            {\n                type: 'input',\n                name: 'serverlessConfigPath',\n                message: 'input a serverless config file path]',\n                default: () => this.defaultServerlessConfigPath,\n                validate: (value) => validator_1.default.serverlessConfigPath(value, this.lang),\n                transformer: (input) => transformer_1.default.serverlessConfigPath(input),\n            },\n        ])\n            .then((answers) => {\n            return answers;\n        }));\n        logger.debug(`input values : ${JSON.stringify(res)}}`);\n        const { resourceName, filePath, subscriptions, serverlessConfigPath } = res;\n        const path = `${cli_1.processCurrent}/${filePath}`;\n        const subscription = subscriptions.map((sub) => ({\n            Endpoint: sub === 'email' ? 'Your email address' : 'Your lambda Arn',\n            Protocol: sub,\n        }));\n        try {\n            const doc = (0, yaml_1.readYaml)(path) ?? {};\n            if (lodash_1.default.hasIn(doc, `Resources.${resourceName}`)) {\n                logger.error(`${locale.error.alreadyExistResource}`);\n                logger.error(`ResourceName : ${resourceName}`);\n                logger.error(doc);\n                throw new index_2.DuplicatedPropertyError(locale.error.alreadyExistResource);\n            }\n            const yamlText = (0, yaml_1.writeYaml)(path, {\n                ...doc,\n                Resources: {\n                    ...doc.Resources,\n                    [resourceName]: {\n                        Type: 'AWS::SNS::Topic',\n                        Properties: {\n                            TopicName: resourceName,\n                            Subscription: subscription,\n                        },\n                    },\n                },\n            });\n            logger.info(path);\n            logger.info(`${locale.overrightFile} : ${path}`);\n            logger.info(yamlText);\n        }\n        catch (e) {\n            if (e.name === 'DuplicatedPropertyError')\n                throw e;\n            const yamlText = (0, yaml_1.writeYaml)(path, {\n                Resources: {\n                    [resourceName]: {\n                        Type: 'AWS::SNS::Topic',\n                        Properties: {\n                            TopicName: resourceName,\n                            Subscription: subscription,\n                        },\n                    },\n                },\n            });\n            logger.info(path);\n            logger.info(`${locale.outputFile} : ${path}`);\n            logger.info(yamlText);\n        }\n        (0, yaml_1.writeServerlessConfig)({ serverlessConfigPath, resourceFilePath: filePath });\n    }\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sns/handler.ts?"
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
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    error: {\n        reqiredResourceName: 'resource name is required',\n        reqiredSubscriptions: 'required select a subscriptions',\n        mustByYamlFilePath: 'path is not yaml file',\n        alreadyExistResource: 'resource name is already exists',\n    },\n    overrightFile: 'overright yaml file',\n    outputFile: 'output yaml file',\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sns/locale/en.ts?"
        );

        /***/
      },

    /***/ './lib/features/add/features/sns/locale/ja.ts':
      /*!****************************************************!*\
  !*** ./lib/features/add/features/sns/locale/ja.ts ***!
  \****************************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    error: {\n        reqiredResourceName: 'リソース名を指定して下さい',\n        reqiredSubscriptions: 'サブスクリプションを選択して下さい',\n        mustByYamlFilePath: 'Yamlファイルのパスを指定して下さい',\n        alreadyExistResource: '指定のリソース名は既に存在します',\n    },\n    overrightFile: 'Yamlファイルを上書き',\n    outputFile: 'Yamlファイルを出力',\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sns/locale/ja.ts?"
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
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst index_1 = __webpack_require__(/*! types/index */ "./lib/types/index.ts");\nclass default_1 extends index_1.FeatureBuilderAbstract {\n    constructor(args) {\n        super(args);\n    }\n    build(_yargs) {\n        return _yargs.version(false).usage(\'Usage: $0 sqs <options>\');\n    }\n}\nexports["default"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sqs/builder.ts?'
        );

        /***/
      },

    /***/ './lib/features/add/features/sqs/handler.ts':
      /*!**************************************************!*\
  !*** ./lib/features/add/features/sqs/handler.ts ***!
  \**************************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ "./lib/utils/logger.ts"));\nconst index_1 = __webpack_require__(/*! types/index */ "./lib/types/index.ts");\nclass default_1 extends index_1.FeatureHandlerAbstract {\n    constructor(argv) {\n        super(argv);\n    }\n    async run() {\n        const logger = logger_1.default.getLogger();\n        logger.info(\'Coming soon\');\n        await new Promise((resolve) => setTimeout(resolve, 0));\n    }\n}\nexports["default"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/features/sqs/handler.ts?'
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
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst locale = {\n    command: {\n        description: {\n            sns: \'add AWS SQS\',\n            sqs: \'add AWS SQS\',\n        },\n    },\n    unProcessed: \'The command entered does not exist. Run "ragate add help" for a list of all available commands.\',\n};\nexports["default"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/locale/en.ts?'
        );

        /***/
      },

    /***/ './lib/features/add/locale/ja.ts':
      /*!***************************************!*\
  !*** ./lib/features/add/locale/ja.ts ***!
  \***************************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    command: {\n        description: {\n            sns: 'AWS SQSを追加',\n            sqs: 'AWS SQSを追加',\n        },\n    },\n    unProcessed: '入力されたコマンドは存在しません。「ragate add help」を実行すると、利用可能なすべてのコマンドのリストが表示されます。',\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/add/locale/ja.ts?"
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
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst index_1 = __webpack_require__(/*! types/index */ "./lib/types/index.ts");\nconst yargonaut_1 = __webpack_require__(/*! utils/yargonaut */ "./lib/utils/yargonaut.ts");\nconst index_2 = __importDefault(__webpack_require__(/*! features/create/index */ "./lib/features/create/index.ts"));\nclass default_1 extends index_1.FeatureBuilderAbstract {\n    constructor(args) {\n        super(args);\n    }\n    build(yargs) {\n        const lang = this.args.lang;\n        return yargs\n            .version(false)\n            .usage(\'Usage: create <options>\')\n            .command(\'*\', yargonaut_1.chalk.grey(\'<command> <options>\'), () => ({}), (argv) => {\n            if (argv._.length === 1)\n                return new index_2.default.handler(argv).run();\n            throw new Error(\'locale.error.unProcessed\');\n        });\n    }\n}\nexports["default"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/create/builder.ts?'
        );

        /***/
      },

    /***/ './lib/features/create/handler.ts':
      /*!****************************************!*\
  !*** ./lib/features/create/handler.ts ***!
  \****************************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst inquirer_1 = __importDefault(__webpack_require__(/*! inquirer */ "inquirer"));\nconst config_1 = __importDefault(__webpack_require__(/*! config */ "./lib/config.ts"));\nconst getLocale_1 = __webpack_require__(/*! features/create/utils/getLocale */ "./lib/features/create/utils/getLocale.ts");\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));\nconst inquirer_autocomplete_prompt_1 = __importDefault(__webpack_require__(/*! inquirer-autocomplete-prompt */ "inquirer-autocomplete-prompt"));\nconst cli_1 = __webpack_require__(/*! utils/cli */ "./lib/utils/cli.ts");\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ "./lib/utils/logger.ts"));\nconst index_1 = __webpack_require__(/*! types/index */ "./lib/types/index.ts");\nclass default_1 extends index_1.FeatureHandlerAbstract {\n    constructor(argv) {\n        super(argv);\n        inquirer_1.default.registerPrompt(\'autocomplete\', inquirer_autocomplete_prompt_1.default);\n    }\n    async run() {\n        const { argv } = this;\n        const logger = logger_1.default.getLogger();\n        logger.debug(\'create hander : \', argv);\n        const locale = (0, getLocale_1.getLocaleLang)(this.lang);\n        const res = (await inquirer_1.default\n            .prompt([\n            {\n                type: \'autocomplete\',\n                name: \'template\',\n                emptyText: locale.inquirer.template.autocomplete.emptyText,\n                message: locale.inquirer.template.choiceTemplate,\n                source: (answersSoFar, input) => (lodash_1.default.isEmpty(input) ? config_1.default.templates : config_1.default.templates.filter((item) => item.name.includes(input))),\n            },\n            {\n                type: \'input\',\n                name: \'projectName\',\n                message: \'input a project name\',\n                default: (answers) => answers.template,\n                validate: (value) => {\n                    if (lodash_1.default.isEmpty(value))\n                        return \'required input a project name\';\n                    return true;\n                },\n            },\n        ])\n            .then((answers) => {\n            return answers;\n        }));\n        logger.debug(`input values : ${JSON.stringify(res)}}`);\n        const { template, projectName } = res;\n        logger.info(`template : ${template}`);\n        logger.info(`projectName : ${projectName}`);\n        if ((0, cli_1.isExistsDirectory)(`${cli_1.processCurrent}/${projectName}`)) {\n            throw new Error(`${locale.error.alreadyExistsDirectory} : ${cli_1.processCurrent}/${projectName}`);\n        }\n        if ((0, cli_1.isExistsDirectory)(cli_1.tmpPath)) {\n            (0, cli_1.cleanUpTmpDirectory)();\n        }\n        (0, cli_1.gitClone)(config_1.default.repositoyUrl, cli_1.tmpPath);\n        (0, cli_1.copyDirectory)(`${cli_1.tmpPath}/${template}`, `${cli_1.processCurrent}/${projectName}`);\n    }\n}\nexports["default"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/features/create/handler.ts?'
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
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.isExistsDirectory = exports.cleanUpTmpDirectory = exports.copyDirectory = exports.gitClone = exports.tmpPath = exports.processCurrent = void 0;\nconst child_process_1 = __webpack_require__(/*! child_process */ "child_process");\nconst index_1 = __webpack_require__(/*! exceptions/index */ "./lib/exceptions/index.ts");\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ "./lib/utils/logger.ts"));\nconst path_1 = __importDefault(__webpack_require__(/*! path */ "path"));\nexports.processCurrent = path_1.default.resolve();\nconst execFilePath = path_1.default.dirname(process.argv[1]);\nexports.tmpPath = `${execFilePath}/../tmp`;\nfunction gitClone(repositoryUrl, destinationPath) {\n    const logger = logger_1.default.getLogger();\n    try {\n        logger.debug((0, child_process_1.execSync)(`git clone ${repositoryUrl} ${destinationPath}`).toString());\n    }\n    catch (error) {\n        const err = error;\n        throw new index_1.CLIError(err.message);\n    }\n}\nexports.gitClone = gitClone;\nfunction copyDirectory(from, to) {\n    const logger = logger_1.default.getLogger();\n    try {\n        logger.debug((0, child_process_1.execSync)(`cp -r ${from} ${to}`).toString());\n    }\n    catch (error) {\n        const err = error;\n        throw new index_1.CLIError(err.message);\n    }\n}\nexports.copyDirectory = copyDirectory;\nfunction cleanUpTmpDirectory() {\n    const logger = logger_1.default.getLogger();\n    try {\n        logger.debug((0, child_process_1.execSync)(`rm -rf ${exports.tmpPath}`).toString());\n        logger.debug((0, child_process_1.execSync)(`mkdir ${exports.tmpPath}`).toString());\n    }\n    catch (error) {\n        const err = error;\n        throw new index_1.CLIError(err.message);\n    }\n}\nexports.cleanUpTmpDirectory = cleanUpTmpDirectory;\nfunction isExistsDirectory(path) {\n    const logger = logger_1.default.getLogger();\n    try {\n        logger.debug((0, child_process_1.execSync)(`test -d ${path}`).toString());\n        return true;\n    }\n    catch (error) {\n        return false;\n    }\n}\nexports.isExistsDirectory = isExistsDirectory;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/cli.ts?'
        );

        /***/
      },

    /***/ './lib/utils/logger.ts':
      /*!*****************************!*\
  !*** ./lib/utils/logger.ts ***!
  \*****************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          "\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst pino_1 = __importDefault(__webpack_require__(/*! pino */ \"pino\"));\nconst pino_pretty_1 = __importDefault(__webpack_require__(/*! pino-pretty */ \"./node_modules/pino-pretty/index.js\"));\nconst yargonaut_1 = __webpack_require__(/*! utils/yargonaut */ \"./lib/utils/yargonaut.ts\");\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nconst stream = (0, pino_pretty_1.default)({\n    colorize: true,\n    messageFormat: (log, messageKey) => {\n        const adjust = (msg) => {\n            if (log.level === 30)\n                return yargonaut_1.chalk.white(msg);\n            if (log.level < 30)\n                return yargonaut_1.chalk.grey(msg);\n            if (log.level === 40)\n                return yargonaut_1.chalk.yellow(msg);\n            if (log.level >= 50)\n                return yargonaut_1.chalk.red(msg);\n            return msg;\n        };\n        const message = log[messageKey];\n        if (lodash_1.default.isEmpty(message)) {\n            return lodash_1.default.chain(log)\n                .omit(['level', 'time', 'pid', 'hostname'])\n                .thru((v) => JSON.stringify(v, null, 2))\n                .thru((v) => adjust(v))\n                .value();\n        }\n        if (log.requestId)\n            return `[${log.requestId}] ${adjust(message)}`;\n        return adjust(message);\n    },\n    timestampKey: 'time',\n    ignore: 'pid,hostname',\n    include: 'level,time',\n    singleLine: false,\n    translateTime: 'yyyy-mm-dd HH:MM:ss',\n    sync: true, // by default we write asynchronously\n});\nclass default_1 {\n    constructor() {\n        throw new Error('singleton cannot be instantiated');\n    }\n    static logger;\n    static getLogger(logLevel = 'info') {\n        if (logLevel) {\n            this.logger = (0, pino_1.default)({\n                level: logLevel,\n            }, stream);\n            return this.logger;\n        }\n        if (this.logger) {\n            return this.logger;\n        }\n        this.logger = (0, pino_1.default)({\n            level: logLevel,\n        }, stream);\n        return this.logger;\n    }\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/logger.ts?"
        );

        /***/
      },

    /***/ './lib/utils/transformer.ts':
      /*!**********************************!*\
  !*** ./lib/utils/transformer.ts ***!
  \**********************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nclass default_1 {\n    static filePath = (str) => {\n        if (str.startsWith(\'/\'))\n            return str.slice(1);\n        return str;\n    };\n    static serverlessConfigPath = (str) => {\n        if (str.startsWith(\'/\'))\n            return str.slice(1);\n        return str;\n    };\n}\nexports["default"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/transformer.ts?'
        );

        /***/
      },

    /***/ './lib/utils/validator.ts':
      /*!********************************!*\
  !*** ./lib/utils/validator.ts ***!
  \********************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          "\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\n//TODO: 多言語化すること : Must be Multilingualization\nclass default_1 {\n    static resourceName = (str, lang) => {\n        // TODO: サーバーレスフレームワーク及びCloudFormationの規約を調査しバリデーションを実装\n        // Investigate serverless framework and CloudFormation rules and implement validation\n        return true;\n    };\n    static filePath = (str, lang) => {\n        if (lodash_1.default.isEmpty(str))\n            return 'required input a cloudformation file path';\n        if (!str.endsWith('.yml') && !str.endsWith('.yaml'))\n            return 'input a yaml file path';\n        return true;\n    };\n    static serverlessConfigPath = (str, lang) => {\n        if (lodash_1.default.isEmpty(str))\n            return 'required input a serverless config file path';\n        if (!str.endsWith('.yml') && !str.endsWith('.yaml'))\n            return 'input a yaml file path';\n        return true;\n    };\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/validator.ts?"
        );

        /***/
      },

    /***/ './lib/utils/yaml.ts':
      /*!***************************!*\
  !*** ./lib/utils/yaml.ts ***!
  \***************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.writeServerlessConfig = exports.readYaml = exports.writeYaml = void 0;\nconst js_yaml_1 = __importDefault(__webpack_require__(/*! js-yaml */ "js-yaml"));\nconst fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));\nconst logger_1 = __importDefault(__webpack_require__(/*! utils/logger */ "./lib/utils/logger.ts"));\nconst cli_1 = __webpack_require__(/*! utils/cli */ "./lib/utils/cli.ts");\nconst writeYaml = (path, data) => {\n    const yamlText = js_yaml_1.default.dump(data);\n    // TODO: ディレクトリを再帰的に作成すること\n    fs_1.default.writeFileSync(path, yamlText, \'utf8\');\n    return yamlText;\n};\nexports.writeYaml = writeYaml;\nconst readYaml = (path) => {\n    return js_yaml_1.default.load(fs_1.default.readFileSync(path, \'utf8\'));\n};\nexports.readYaml = readYaml;\nconst writeServerlessConfig = (args) => {\n    const { serverlessConfigPath, resourceFilePath } = args;\n    const logger = logger_1.default.getLogger();\n    const path = `${cli_1.processCurrent}/${serverlessConfigPath}`;\n    try {\n        const doc = (0, exports.readYaml)(path) ?? {};\n        const resources = doc.resources ?? [];\n        if (resources.includes(resourceFilePath))\n            return;\n        resources.push(`\\${file(./${resourceFilePath})}`);\n        const yamlText = (0, exports.writeYaml)(path, {\n            ...doc,\n            resources,\n        });\n        logger.info(path);\n        logger.info(yamlText);\n    }\n    catch (e) {\n        logger.warn(\'not found serverless config file, skip update\');\n        logger.warn(`please check a input path : ${path}`);\n    }\n};\nexports.writeServerlessConfig = writeServerlessConfig;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/yaml.ts?'
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

    /***/ child_process:
      /*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
      /***/ (module) => {
        module.exports = require('child_process');

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
          'module.exports = JSON.parse(\'{"name":"ragate-cli","version":"0.1.0","description":"Anyone can immediately start a serverless project using the CLI, automatically generate source code, and start an infinitely extensible and maintainable serverless development project.","engines":{"node":">=18.x"},"scripts":{"test":"echo \\\'Sorry, test code is in preparation.\\\\n\\\'","build:dev":"ENV=development webpack","build:prd":"ENV=production webpack","lint":"eslint . --fix","format":"prettier . --write","prepare":"husky install"},"eslintIgnore":["!/.github",".serverless","bin","tmp","webpack.config.js"],"main":"./lib/app.ts","bin":{"ragate":"./bin/app.js"},"repository":{"type":"git","url":"git+https://github.com/ragate-inc/ragate-cli.git"},"lint-staged":{"*.{ts,js}":["eslint"],"*.{css,html,js,json,md,yaml,yml,ts,js}":["prettier . --write"]},"keywords":["aws","serverless","ragate","cli","amplify","serverless","lambda","amazon"],"author":"Ragate inc.","license":"MIT","bugs":{"url":"https://github.com/ragate-inc/ragate-cli/issues"},"homepage":"https://github.com/ragate-inc/ragate-cli#readme","devDependencies":{"@tsconfig/node-lts":"^18.12.1","@types/figlet":"^1.5.6","@types/inquirer":"^9.0.3","@types/inquirer-autocomplete-prompt":"^3.0.0","@types/lodash":"^4.14.194","@types/node":"^18.16.3","@types/webpack":"^5.28.1","@types/webpack-node-externals":"^3.0.0","@types/yargs":"^17.0.24","@typescript-eslint/eslint-plugin":"^5.59.2","@typescript-eslint/parser":"^5.59.2","eslint":"^8.39.0","eslint-config-prettier":"^8.8.0","eslint-config-standard-with-typescript":"^34.0.1","husky":"^6.0.0","lint-staged":"^13.2.2","prettier":"2.8.8","ts-loader":"^9.4.2","ts-node":"^10.9.1","tsconfig-paths-webpack-plugin":"^4.0.1","typescript":"^5.0.4","webpack":"^5.81.0","webpack-cli":"^5.0.2","webpack-node-externals":"^3.0.0"},"dependencies":{"@types/js-yaml":"^4.0.5","figlet":"^1.6.0","inquirer":"^8.0.0","inquirer-autocomplete-prompt":"^2.0.0","js-yaml":"^4.1.0","lodash":"^4.17.21","parent-require":"^1.0.0","pino":"^8.12.1","pino-pretty":"^10.0.0","yargonaut":"^1.1.4","yargs":"^17.1.1-candidate.0"}}\');\n\n//# sourceURL=webpack://ragate-cli/./package.json?'
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
