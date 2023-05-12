import { Locale } from 'utils/validator/types/index';

const locale: Locale = {
  mustBeYaml: 'input a yaml file path',
  resourceName: {
    invalidFormat: 'invalid format',
  },
  filePath: {
    required: 'required input a cloudformation file path',
  },
  serverlessConfigPath: {
    required: 'required input a serverless config file path',
  },
};

export default locale;
