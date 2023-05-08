import p from 'package.json';
import { Lang } from './types';

type Config = {
  npmVersion: string;
  templates: string[];
  lang: Lang;
};

const config: Config = {
  // current npm package version in package.json
  npmVersion: (p as { version: string }).version,

  // https://github.com/ragate-inc/serverless-starter
  templates: ['aws-node-appsync'],

  // locale
  lang: (process.env.LOCALE ?? 'en') as Lang,
};

export default config;
