import { getLocaleLang } from 'features/codegen/features/crud/utils/getLocale';
import Validator from 'utils/validator';
import Filter from 'utils/inquirer/filter';
import Transformer from 'utils/inquirer/transformer';

export default (lang: string, defaultServerlessConfigPath: string) => ({
  type: 'input',
  name: 'serverlessConfigPath',
  message: getLocaleLang(lang).inquirer.serverlessConfigPath,
  default: () => defaultServerlessConfigPath,
  validate: (value: string) => {
    return new Validator(value, lang).required().mustBeYamlFilePath().value();
  },
  transformer: (input: string) => new Transformer(input).removeAllSpace().value(),
  filter: (input: string) => new Filter(input).removeAllSpace().value(),
});
