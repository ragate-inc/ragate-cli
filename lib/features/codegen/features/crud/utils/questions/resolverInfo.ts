import { getLocaleLang } from 'features/codegen/features/crud/utils/getLocale';
import { ApiInfo } from 'features/codegen/features/crud/types/';
import Validator from 'utils/validator';
import { map, chain } from 'lodash';

export default (lang: string, schemaGraphqlInfo: ApiInfo[]) => ({
  type: 'table',
  name: 'resolverInfo',
  message: getLocaleLang(lang).inquirer.resolverInfo,
  columns: [
    { name: 'VTL(Local)', value: 'vtl,LocalResolver' },
    { name: 'VTL(Get)', value: 'vtl,GetItem' },
    { name: 'VTL(Query)', value: 'vtl,Query' },
    { name: 'Lambda(Create)', value: 'lambda,create' },
    { name: 'Lambda(Update)', value: 'lambda,update' },
    { name: 'Lambda(Delete)', value: 'lambda,delete' },
  ],
  rows: map(schemaGraphqlInfo, (api) => {
    return {
      name: api.name,
      value: chain(api.name)
        .thru((name) => {
          const type = [
            { name: 'local', value: 'vtl,LocalResolver' },
            { name: 'get', value: 'vtl,GetItem' },
            { name: 'list', value: 'vtl,Query' },
            { name: 'create', value: 'lambda,create' },
            { name: 'update', value: 'lambda,update' },
            { name: 'delete', value: 'lambda,delete' },
          ].find((type) => name.startsWith(type.name));
          return type?.value;
        })
        .value(),
    };
  }),
  validate: (values: string[]) => new Validator(values, lang).required().value(),
});
