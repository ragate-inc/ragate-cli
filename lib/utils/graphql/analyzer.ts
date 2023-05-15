import { SchemaComposer } from 'graphql-compose';
import { mergeSchemas } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import _ from 'lodash';

/**
 * Parsing existing Graphql syntax
 */
export default class Graphql {
  constructor(scheme: string[]) {
    this._scheme = scheme;
    this._schemaComposer = _.isEmpty(scheme) ? [new SchemaComposer()] : scheme.map((s) => new SchemaComposer(s));
    this._mergedSchema = mergeSchemas({ schemas: this._schemaComposer.map((s) => s.buildSchema()) });
    this._mutations = this._schemaComposer.map((s) => s.getOTC('Mutation').getFields());
    this._queries = this._schemaComposer.map((s) => s.getOTC('Query').getFields());
    this._subscriptions = this._schemaComposer.map((s) => s.getOTC('Subscription').getFields());
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

  private readonly _scheme: string[];
  private get scheme(): string[] {
    return this._scheme;
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
