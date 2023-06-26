import { getLocaleLang } from 'features/codegen/features/crud/utils/getLocale';
import { RelationInfo } from 'features/codegen/features/crud/types/';
import Validator from 'utils/validator';
import { map, chain } from 'lodash';

export default (lang: string, relationInfo: RelationInfo[]) => ({
  type: 'table',
  name: 'relationInfo',
  message: getLocaleLang(lang).inquirer.resolverInfo,
  columns: [
    { name: 'VTL(Local)', value: 'LocalResolver' },
    { name: 'VTL(Get)', value: 'GetItem' },
    { name: 'VTL(Query)', value: 'Query' },
  ],
  rows: map(relationInfo, (relation) => {
    return {
      name: `${relation.type}.${relation.field}`,
      value: chain(relation)
        .thru((relation) => {
          const type = [
            { name: 'local', value: 'LocalResolver' },
            { name: 'get', value: 'GetItem' },
            { name: 'list', value: 'Query' },
          ].find((type) => relation.resolver === type.name);
          return type?.value;
        })
        .value(),
    };
  }),
  validate: (values: string[]) => new Validator(values, lang).required().value(),
});
