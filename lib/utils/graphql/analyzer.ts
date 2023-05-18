import { SchemaComposer } from 'graphql-compose';
import { mergeSchemas } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { addScalrs } from 'utils/graphql/appsyncScalars';
import _ from 'lodash';

/**
 * Parsing existing Graphql syntax
 */
export default class GraphqlAnalyzer {
  constructor(schema: string[]) {
    this._schema = schema;
    this._schemaComposer = _.isEmpty(schema) ? [new SchemaComposer()] : schema.map((s) => new SchemaComposer(addScalrs(s)));
    this._mergedSchema = mergeSchemas({ schemas: this._schemaComposer.map((s) => s.buildSchema()) });
    this._mutations = this._schemaComposer.map((s) => {
      try {
        const res = s.getOTC('Mutation').getFields();
        return res;
      } catch (e) {
        return {};
      }
    });
    this._queries = this._schemaComposer.map((s) => {
      try {
        const res = s.getOTC('Query').getFields();
        return res;
      } catch (e) {
        return {};
      }
    });
    this._subscriptions = this._schemaComposer.map((s) => {
      try {
        const res = s.getOTC('Subscription').getFields();
        return res;
      } catch (e) {
        return {};
      }
    });
  }
  private readonly _mutations;
  private get mutations() {
    return this._mutations;
  }

  private readonly _queries;
  private get queries() {
    return this._queries;
  }

  private readonly _subscriptions;
  private get subscriptions() {
    return this._subscriptions;
  }

  private readonly _schema: string[];
  private get schema(): string[] {
    return this._schema;
  }

  private readonly _schemaComposer: SchemaComposer[];
  public get schemaComposer(): SchemaComposer[] {
    return this._schemaComposer;
  }

  private _mergedSchema: GraphQLSchema;
  public get mergedSchema(): GraphQLSchema {
    return this._mergedSchema;
  }

  public isExistsMutationApi(apiName: string) {
    return _.some(this.mutations, (s) => _.has(s, apiName));
  }

  public isExistsQueryApi(apiName: string) {
    return _.some(this.queries, (s) => _.has(s, apiName));
  }

  public isExistsSubscriptionApi(apiName: string) {
    return _.some(this.subscriptions, (s) => _.has(s, apiName));
  }
}
