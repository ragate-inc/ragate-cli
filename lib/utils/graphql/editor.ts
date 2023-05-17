import { ObjectTypeComposerArgumentConfigMapDefinition, SchemaComposer, printSchema } from 'graphql-compose';
import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import Logger from 'utils/logger';
import { pino } from 'pino';
import _ from 'lodash';
import { asFullPath } from 'utils/cli';
import fs from 'fs';
import { chalk } from 'yargonaut';

export type AddQueryFiledInput = {
  apiName: string;
  args: ObjectTypeComposerArgumentConfigMapDefinition<unknown>;
  type: GraphQLObjectType;
};

export type AddMutationFieldInput = {
  apiName: string;
  input: GraphQLInputObjectType;
  type: GraphQLObjectType;
};

export default class GraphqlEditor {
  constructor(schemePath?: string) {
    this.logger = Logger.getLogger();
    this._schemePath = schemePath ?? this.defaultCustomSchemePath;
    this.setScheme();
    this._schemaComposer = new SchemaComposer(this.scheme);
  }

  private setScheme() {
    try {
      this._scheme = fs.readFileSync(asFullPath(this.schemePath), 'utf8');
    } catch (e) {
      this.logger.debug(e);
      this.logger.warn(`custom_scheme.graphql is not found.`);
    }
  }

  private readonly _schemePath: string;
  private get schemePath(): string {
    return this._schemePath;
  }

  private readonly logger: pino.Logger;
  private readonly defaultCustomSchemePath: string = 'appsync/custom_scheme.graphql';

  private _scheme?: string;
  public get scheme(): string | undefined {
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

  public getTypeMap() {
    return this.schemaComposer.buildSchema().getTypeMap();
  }

  public addMutationField(_args: AddMutationFieldInput): GraphqlEditor {
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

  public addQueryField(_args: AddQueryFiledInput): GraphqlEditor {
    const { apiName, args, type } = _args;
    this.schemaComposer.Mutation.addFields({
      [apiName]: {
        type,
        args,
      },
    });
    return this;
  }

  public updateCustomSchemeGraphl(args: {
    query?: AddQueryFiledInput;
    mutation?: AddMutationFieldInput;
    callback?: (
      updated: boolean,
      opt: {
        schemePath: string;
      }
    ) => void;
  }): void {
    const { query, mutation, callback } = args;
    // update custom_scheme.graphql
    let updated = false;
    if (query || mutation) {
      if (query) {
        if (_.has(this.listQueies(), query.apiName)) {
          this.logger.warn(`Query ${query.apiName} is already exists.`);
          updated = false;
        } else {
          this.addQueryField(query);
          updated = true;
        }
      }
      if (mutation) {
        if (_.has(this.listMutation(), mutation.apiName)) {
          this.logger.warn(`Mutation ${mutation.apiName} is already exists.`);
          updated = false;
        } else {
          this.addMutationField(mutation);
          updated = true;
        }
      }
    } else {
      this.logger.warn('query or mutation is empty.');
    }
    if (updated) {
      const scheme = this.printSchema();
      fs.writeFileSync(asFullPath(this.schemePath), scheme, 'utf8');
      this.logger.info(chalk().green(scheme));
      this.setScheme();
    }
    if (callback) {
      callback(updated, {
        schemePath: this.schemePath,
      });
    }
  }

  public printSchema(): string {
    return printSchema(this.schemaComposer.buildSchema());
  }
}
