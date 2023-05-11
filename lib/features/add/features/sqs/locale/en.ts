import { Locale } from 'features/add/features/sqs/types/index';

const locale: Locale = {
  error: {
    reqiredResourceName: 'resource name is required',
    mustByYamlFilePath: 'path is not yaml file',
    alreadyExistResource: 'resource name is already exists',
  },
  overrightFile: 'overright yaml file',
  outputFile: 'output yaml file',
};

export default locale;
