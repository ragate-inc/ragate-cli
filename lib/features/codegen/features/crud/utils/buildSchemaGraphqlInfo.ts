import * as _ from 'lodash';
import * as fs from 'fs';
import * as Type from 'features/codegen/features/crud/types/';
import { parse, visit, Kind } from 'graphql';

function getSchemaGraphql(schema: string | string[]): string {
  return _.chain(schema)
    .thru((schema) => {
      if (_.isString(schema)) {
        return [schema];
      }
      return schema;
    })
    .map((schema) => {
      return fs.readFileSync(schema).toString();
    })
    .join('\n')
    .value();
}

export const buildSchemaGraphqlInfo = (schema: string | string[]): Type.SchemaGraphqlInfo => {
  const schemaGraphql = getSchemaGraphql(schema);
  const schemaGraphqlInfo: Type.SchemaGraphqlInfo = [];
  const parsedData = parse(schemaGraphql);
  visit(parsedData, {
    enter(node) {
      if (node.kind === 'ObjectTypeDefinition' && (node.name.value === 'Query' || node.name.value === 'Mutation')) {
        _.each(node.fields, (field) => {
          schemaGraphqlInfo.push({
            type: node.name.value,
            name: field.name.value,
            arguments: _.map(field.arguments, (argument) => {
              return {
                name: argument.name.value,
                type: _.get(argument, 'type.type.name.value', _.get(argument, 'type.name.value', 'other')),
                nonnull: argument.type.kind === Kind.NON_NULL_TYPE,
              };
            }),
            returnValue: _.get(field, 'type.type.name.value', _.get(field, 'type.name.value', 'other')),
          });
        });
      }
    },
  });
  return schemaGraphqlInfo;
};
export default buildSchemaGraphqlInfo;
