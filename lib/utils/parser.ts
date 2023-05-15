import { loadYaml } from 'utils/yaml';
import GraphqlAnalyzer from 'utils/graphql/analyzer';
import _ from 'lodash';
import * as Type from 'types/index';
import fs from 'fs';
import path from 'path';
import config from 'config';
import { asFullPath } from './cli';

export default class {
  public static parseLambdaHandlerPath(input: string): [string[], string] {
    const parts = input.split('/');
    const path = parts.slice(0, -1);
    const filename = parts[parts.length - 1];
    return [path.length > 0 ? path : [], filename];
  }

  public static parseSlsRecursivelyReference = (str: string): string | undefined => {
    if (_.isEmpty(str)) return undefined;
    const regex = /\${file\((.*?)\)}/;
    const match = str.match(regex);
    if (match) {
      const pathInfo = match[1];
      return pathInfo;
    }
  };

  public static extractFilename(input: string): string {
    const filename = input.split('.')[0];
    return filename;
  }

  public static parseAppSyncStack(appSyncStackPath: string): Type.AppSyncStack {
    const res = loadYaml<Type.AppSyncStackConfig[]>(appSyncStackPath);
    const { schema, dataSources, mappingTemplates, mappingTemplatesLocation, functionConfigurationsLocation, functionConfigurations } = res[0];
    return {
      mappingTemplatesLocation,
      functionConfigurationsLocation,
      functionConfigurations:
        _.chain(functionConfigurations)
          .map((p) => loadYaml<Type.AppSyncFunctionConfiguration>(this.parseSlsRecursivelyReference(p) as string))
          .flatten()
          .filter((p) => p && !_.isEmpty(p))
          .value() ?? [],
      dataSources:
        _.chain(dataSources)
          .map((p) => loadYaml<Type.AppSyncDataSource>(this.parseSlsRecursivelyReference(p) as string))
          .flatten()
          .filter((p) => p && !_.isEmpty(p))
          .value() ?? [],
      mappingTemplates:
        _.chain(mappingTemplates)
          .map((p) => loadYaml<Type.AppSyncMappingTemplate>(this.parseSlsRecursivelyReference(p) as string))
          .flatten()
          .filter((p) => p && !_.isEmpty(p))
          .value() ?? [],
      schema: _.chain(schema)
        .thru((value): string[] => {
          if (_.isString(value) && !_.isEmpty(value)) {
            const _schema: string = fs.readFileSync(path.join(config.currentPath, value), 'utf8');
            if (_.isEmpty(_schema)) return [];
            return [_schema];
          }
          if (_.isArray(value) && !_.isEmpty(value)) {
            return value
              .map((v): string => {
                const _schema: string = fs.readFileSync(path.join(config.currentPath, v), 'utf8');
                if (_.isEmpty(_schema)) return '';
                return _schema;
              })
              .filter((v) => !_.isEmpty(v));
          }
          return [];
        })
        .thru((schemas: string[]) => new GraphqlAnalyzer(schemas))
        .value(),
    };
  }
}
