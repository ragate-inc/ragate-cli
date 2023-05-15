import p from 'package.json';
import _ from 'lodash';
import path from 'path';

type Template = {
  name: string; // User-friendly template name
  value: string; // It must match the directory name in the repository !.
};

type Config = {
  npmVersion: string;
  repositoyUrl: string;
  tmpPath: string;
  currentPath: string;
  templates: Template[];
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

  // working directory
  tmpPath: `${path.dirname(process.argv[1])}/../tmp`,

  // current directory
  currentPath: path.resolve(),

  // templates at repository
  templates: _.chain(templates)
    .sortBy('category')
    .map((item) => ({
      name: `${item.category} - ${item.name}`,
      value: item.value,
    }))
    .value(),
};

export default config;
