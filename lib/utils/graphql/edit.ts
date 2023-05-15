import { ObjectTypeComposerArgumentConfigMapDefinition, SchemaComposer, printSchema } from 'graphql-compose';
import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';
import _ from 'lodash';

export default class Edit {
  constructor(scheme?: string) {
    this._scheme = scheme;
    this._schemaComposer = new SchemaComposer(this.scheme);
  }
  private readonly _scheme?: string;
  private get scheme(): string | undefined {
    return this._scheme;
  }

  private _schemaComposer: SchemaComposer;
  public get schemaComposer(): SchemaComposer {
    return this._schemaComposer;
  }

  public listQueies() {
    return this.schemaComposer.getOTC('Query').getFields();
  }

  public listMutation() {
    return this.schemaComposer.getOTC('Mutation').getFields();
  }

  public listSubscription() {
    return this.schemaComposer.getOTC('Subscription').getFields();
  }

  public addMutationField(_args: { apiName: string; input: GraphQLInputObjectType; type: GraphQLObjectType }): Edit {
    const { apiName, input, type } = _args;
    this.schemaComposer.Mutation.addFields({
      [apiName]: {
        type,
        args: {
          input: new GraphQLNonNull(input),
        },
      },
    });
    return this;
  }

  public addQueryField(_args: { apiName: string; args: ObjectTypeComposerArgumentConfigMapDefinition<any>; type: GraphQLObjectType }): Edit {
    const { apiName, args, type } = _args;
    this.schemaComposer.Mutation.addFields({
      [apiName]: {
        type,
        args,
      },
    });
    return this;
  }

  public build(): GraphQLSchema {
    return this.schemaComposer.buildSchema();
  }

  public printSchema(): string {
    return printSchema(this.schemaComposer.buildSchema());
  }
}
