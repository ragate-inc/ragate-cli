import { getLocaleLang } from 'features/codegen/features/crud/utils/getLocale';

export default (lang: string, apiName: string) => ({
  type: 'list',
  name: 'selectResolverType',
  message: `${apiName}: ${getLocaleLang(lang).inquirer.selectResolverType}`,
  default: () => 'GetItem',
  choices: [
    { title: 'LocalResolver', value: 'LocalResolver' },
    { title: 'GetItem', value: 'GetItem' },
  ],
});
[];
