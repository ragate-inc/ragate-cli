import p from 'package.json';
import { Lang } from './types';
import _ from 'lodash';

type Template = {
  name: string; // User-friendly template name
  value: string; // It must match the directory name in the repository !.
};

type Config = {
  npmVersion: string;
  repositoyUrl: string;
  templates: Template[];
  lang: Lang;
};

// Additional templates selectable via CLI
// Consider migrating to a separate file if template types become bloated
const templates: (Template & { category: string })[] = [
  {
    category: 'Node.js',
    name: 'Node.js - aws-node-appsync',
    value: 'aws-node-appsync',
  },
];

const config: Config = {
  // current npm package version in package.json
  npmVersion: (p as { version: string }).version,

  // repository of template
  repositoyUrl: 'https://github.com/ragate-inc/serverless-starter',

  // templates at repository
  templates: _.chain(templates)
    .sortBy('category')
    .map((item) => ({
      name: `${item.category} - ${item.name}`,
      value: item.value,
    }))
    .value(),
  lang: (process.env.LOCALE ?? 'en') as Lang,
};

export default config;
