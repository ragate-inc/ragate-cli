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
          "\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst logger_1 = __webpack_require__(/*! utils/logger */ \"./lib/utils/logger.ts\");\nconst yargs_1 = __importDefault(__webpack_require__(/*! yargs/yargs */ \"yargs/yargs\"));\nconst index_1 = __webpack_require__(/*! locale/index */ \"./lib/locale/index.ts\");\n/**\n * yargs typescript : https://github.com/yargs/yargs/blob/main/docs/typescript.md\n * yargs api reference : https://yargs.js.org/docs/\n */\nvoid (() => {\n    const locale = (process.env.LOCALE ?? 'en');\n    const lang = (0, index_1.getLocaleLang)(locale);\n    const argv = (0, yargs_1.default)(process.argv.slice(2))\n        .scriptName('ragate')\n        .usage([`${lang.usage}:`, '  ragate-cli <command> <options>', '  ragate <command> <options>'].join('\\n'))\n        .options('log', {\n        describe: lang.describe.logLevel,\n        choices: ['fatal', 'error', 'warn', 'info', 'debug', 'trace'],\n        default: 'debug',\n        type: 'string',\n    })\n        .help()\n        .alias('h', 'help')\n        .version()\n        .alias('v', 'version')\n        .command('$0', 'create project', (yargs) => {\n        return yargs\n            .option('template', {\n            alias: 't',\n            type: 'string',\n            choices: ['aws-node-appsync'],\n            default: 'aws-node-appsync',\n            describe: lang.describe.template,\n        })\n            .version(false);\n    })\n        .command('add', 'Add file contents to the index', (yargs) => {\n        return yargs\n            .usage(`${lang.usage}: $0 add <options>`)\n            .option('A', {\n            alias: 'all',\n            type: 'boolean',\n            describe: 'Update the index not only where the working tree',\n        })\n            .version(false);\n    })\n        .locale(locale)\n        .parseSync();\n    const logger = (0, logger_1.getLogger)({ logLevel: argv.log });\n    logger.debug(argv);\n    switch (argv._[0]) {\n        case 'add':\n            logger.debug('command: add!');\n            break;\n        case 'commit':\n            logger.debug('command: commit!');\n            break;\n        default:\n            logger.debug('command: default!');\n    }\n})();\n\n\n//# sourceURL=webpack://ragate-cli/./lib/app.ts?"
        );

        /***/
      },

    /***/ './lib/exceptions/index.ts':
      /*!*********************************!*\
  !*** ./lib/exceptions/index.ts ***!
  \*********************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.EnvironmentError = exports.BaseClass = void 0;\nclass BaseClass extends Error {\n    constructor(message) {\n        super(message);\n        this.name = new.target.name;\n        if (Error.captureStackTrace)\n            Error.captureStackTrace(this, this.constructor);\n        Object.setPrototypeOf(this, new.target.prototype);\n    }\n}\nexports.BaseClass = BaseClass;\nclass EnvironmentError extends BaseClass {\n    constructor(message) {\n        super(message);\n        this.name = \'EnvironmentError\';\n    }\n}\nexports.EnvironmentError = EnvironmentError;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/exceptions/index.ts?'
        );

        /***/
      },

    /***/ './lib/locale/en.ts':
      /*!**************************!*\
  !*** ./lib/locale/en.ts ***!
  \**************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    usage: 'Usage',\n    describe: {\n        logLevel: 'choose a log level',\n        template: 'choose a project template',\n    },\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/locale/en.ts?"
        );

        /***/
      },

    /***/ './lib/locale/index.ts':
      /*!*****************************!*\
  !*** ./lib/locale/index.ts ***!
  \*****************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.getLocaleLang = void 0;\nconst ja_1 = __importDefault(__webpack_require__(/*! locale/ja */ "./lib/locale/ja.ts"));\nconst en_1 = __importDefault(__webpack_require__(/*! locale/en */ "./lib/locale/en.ts"));\nconst index_1 = __webpack_require__(/*! exceptions/index */ "./lib/exceptions/index.ts");\nconst getLocaleLang = (locale) => {\n    switch (locale) {\n        case \'ja\':\n            return ja_1.default;\n        case \'en\':\n            return en_1.default;\n        default:\n            throw new index_1.EnvironmentError(\'An invalid environment variable is specified. : LOCALE\');\n    }\n};\nexports.getLocaleLang = getLocaleLang;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/locale/index.ts?'
        );

        /***/
      },

    /***/ './lib/locale/ja.ts':
      /*!**************************!*\
  !*** ./lib/locale/ja.ts ***!
  \**************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst locale = {\n    usage: '使い方',\n    describe: {\n        logLevel: 'ログのレベルを選択',\n        template: 'プロジェクトの雛形',\n    },\n};\nexports[\"default\"] = locale;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/locale/ja.ts?"
        );

        /***/
      },

    /***/ './lib/utils/logger.ts':
      /*!*****************************!*\
  !*** ./lib/utils/logger.ts ***!
  \*****************************/
      /***/ function (__unused_webpack_module, exports, __webpack_require__) {
        eval(
          '\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { "default": mod };\n};\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.getLogger = void 0;\nconst pino_1 = __importDefault(__webpack_require__(/*! pino */ "pino"));\nconst getLogger = (args) => {\n    return (0, pino_1.default)({\n        level: args.logLevel,\n        transport: {\n            target: \'pino-pretty\',\n            options: {\n                colorize: true,\n            },\n        },\n    });\n};\nexports.getLogger = getLogger;\n\n\n//# sourceURL=webpack://ragate-cli/./lib/utils/logger.ts?'
        );

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

    /***/ 'yargs/yargs':
      /*!******************************!*\
  !*** external "yargs/yargs" ***!
  \******************************/
      /***/ (module) => {
        module.exports = require('yargs/yargs');

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
