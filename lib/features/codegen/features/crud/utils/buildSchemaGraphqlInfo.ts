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
  const schemaGraphqlInfo: Type.SchemaGraphqlInfo = { apiInfo: [], relationInfo: [] };
  const parsedData = parse(schemaGraphql);
  const objectTypes: { name: string; attributes: { name: string; type: string; nonnull: boolean; list: boolean }[] }[] = [];
  visit(parsedData, {
    enter(node) {
      if (node.kind === 'ObjectTypeDefinition') {
        if (node.name.value === 'Query' || node.name.value === 'Mutation') {
          _.each(node.fields, (field) => {
            schemaGraphqlInfo.apiInfo.push({
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
        } else {
          const objectType = {
            name: node.name.value,
            attributes: _.map(node.fields, (field) => {
              const isNonnull = field.type.kind === Kind.NON_NULL_TYPE;
              const isList = field.type.kind === Kind.LIST_TYPE;
              const type = isNonnull ? _.get(field, 'type.type.name.value', 'other') : _.get(field, 'type.name.value', 'other');
              return {
                name: field.name.value,
                type: type,
                nonnull: isNonnull,
                list: isList,
              };
            }),
          };
          objectTypes.push(objectType);
        }
      }
    },
  });
  _.each(objectTypes, (objectType) => {
    _.each(objectType.attributes, (attribute) => {
      const relation = _.find(objectTypes, (objectType) => {
        return objectType.name === attribute.type;
      });
      if (relation) {
        schemaGraphqlInfo.relationInfo.push({
          type: objectType.name,
          field: attribute.name,
          resolver: _.includes(relation.name, 'Connection') ? 'list' : 'get',
        });
      }
    });
  });

  return schemaGraphqlInfo;
};
export default buildSchemaGraphqlInfo;
