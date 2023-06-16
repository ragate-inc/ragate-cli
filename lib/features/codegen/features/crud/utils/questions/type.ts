import { getLocaleLang } from 'features/codegen/features/crud/utils/getLocale';

export default (lang: string) => ({
  type: 'list',
  name: 'type',
  message: getLocaleLang(lang).inquirer.selectResolverType,
  default: () => 'get',
  choices: [
    { title: 'LocalResolver', value: 'none' },
    { title: 'GetItem', value: 'get' },
  ],
});
