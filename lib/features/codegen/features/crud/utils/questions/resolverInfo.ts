import { getLocaleLang } from 'features/codegen/features/crud/utils/getLocale';
import { SchemaGraphqlInfo } from 'features/codegen/features/crud/types/';
import Validator from 'utils/validator';
import { map, chain } from 'lodash';

export default (lang: string, schemaGraphqlInfo: SchemaGraphqlInfo) => ({
  type: 'table',
  name: 'resolverInfo',
  message: getLocaleLang(lang).inquirer.resolverInfo,
  columns: [
    { name: 'VTL(Get)', value: 'vtl,get' },
    { name: 'VTL(Query)', value: 'vtl,query' },
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
            { name: 'get', value: 'vtl,get' },
            { name: 'list', value: 'vtl,query' },
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
