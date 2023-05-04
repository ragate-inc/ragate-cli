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
          "\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst logger_1 = __webpack_require__(/*! utils/logger */ \"./lib/utils/logger.ts\");\nconst yargs_1 = __importDefault(__webpack_require__(/*! yargs/yargs */ \"yargs/yargs\"));\n/**\n * yargs typescript : https://github.com/yargs/yargs/blob/main/docs/typescript.md\n * yargs api reference : https://yargs.js.org/docs/\n */\nvoid (() => {\n    const argv = (0, yargs_1.default)(process.argv.slice(2))\n        .scriptName('ragate')\n        .options({\n        loglevel: {\n            alias: 'l',\n            describe: 'choose a log level',\n            choices: ['fatal', 'error', 'warn', 'info', 'debug', 'trace'],\n            default: 'debug',\n            type: 'string',\n        },\n    })\n        .command('sing', 'a classic yargs command without prompting', () => {\n        console.log('🎵 Oy oy oy');\n    })\n        .example('sing', 'count the lines in the given file')\n        .version()\n        .alias('v', 'version')\n        .help()\n        .alias('h', 'help')\n        .parseSync();\n    const logger = (0, logger_1.getLogger)({ logLevel: argv.loglevel });\n    logger.info(argv);\n    // TODO: process here\n})();\n\n\n//# sourceURL=webpack://ragate-cli/./lib/app.ts?"
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
