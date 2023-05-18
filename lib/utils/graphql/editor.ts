import { InputTypeComposer, ObjectTypeComposer, ObjectTypeComposerArgumentConfigMapDefinition, printSchema, SchemaComposer } from 'graphql-compose';
import { buildSchema, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import Logger from 'utils/logger';
import { pino } from 'pino';
import _ from 'lodash';
import { asFullPath } from 'utils/cli';
import fs from 'fs';
import { chalk } from 'yargonaut';
import { addScalrs, removeScalars } from 'utils/graphql/appsyncScalars';

export type AddQueryFiledInput = {
  apiName: string;
  args: ObjectTypeComposerArgumentConfigMapDefinition;
  type: GraphQLObjectType;
};

export type AddMutationFieldInput = {
  apiName: string;
  input: GraphQLInputObjectType;
  type: GraphQLObjectType;
};

export default class GraphqlEditor {
  constructor(opt?: { customSchemaPath?: string; defaultSchemaPath?: string }) {
    const initAllSchemaComposer = () => {
      if (this.customSchema) {
        this.allSchemaComposer.merge(buildSchema(this.customSchema));
      }
      if (this.defaultSchema) {
        this.allSchemaComposer.merge(buildSchema(this.defaultSchema));
      }
    };
    const initCustomSchemaComposer = () => {
      if (this.customSchema) {
        this.customSchemaComposer.merge(buildSchema(this.customSchema));
      }
    };
    this.logger = Logger.getLogger();
    this._customSchemaPath = opt?.customSchemaPath ?? this.defaultCustomSchemaPath;
    this._defaultSchemaPath = opt?.defaultSchemaPath ?? this.defaultDefaultSchemaPath;
    this.readOrSetCustomSchema();
    this.readOrSetDefaultSchema();
    initAllSchemaComposer();
    initCustomSchemaComposer();
  }

  private readonly logger: pino.Logger;
  private readonly defaultCustomSchemaPath: string = 'appsync/custom_schema.graphql';
  private readonly defaultDefaultSchemaPath: string = 'appsync/schema.graphql';
  private readonly _customSchemaPath: string;
  private readonly _defaultSchemaPath: string;
  private readonly _customSchemaComposer: SchemaComposer = new SchemaComposer();
  private readonly _allSchemaComposer: SchemaComposer = new SchemaComposer();
  private _defaultSchema?: string;
  private _customSchema?: string;

  private get defaultSchemaPath(): string {
    return this._defaultSchemaPath;
  }
  private get customSchemaPath(): string {
    return this._customSchemaPath;
  }
  public get defaultSchema(): string | undefined {
    if (!this._defaultSchema) return;
    return addScalrs(this._defaultSchema);
  }
  public get customSchema(): string | undefined {
    if (!this._customSchema) return;
    return addScalrs(this._customSchema);
  }
  public get customSchemaComposer(): SchemaComposer {
    return this._customSchemaComposer;
  }
  public get allSchemaComposer(): SchemaComposer {
    return this._allSchemaComposer;
  }

  private readOrSetCustomSchema() {
    try {
      this._customSchema = fs.readFileSync(asFullPath(this.customSchemaPath), 'utf8');
    } catch (e) {
      this.logger.debug(e);
      this.logger.warn(`custom_schema.graphql is not found.`);
    }
  }

  private readOrSetDefaultSchema() {
    try {
      this._defaultSchema = fs.readFileSync(asFullPath(this.defaultSchemaPath), 'utf8');
    } catch (e) {
      this.logger.debug(e);
      this.logger.warn(`schema.graphql is not found.`);
    }
  }

  public listQueies() {
    return this.allSchemaComposer.getOTC('Query').getFields();
  }

  public listMutation() {
    return this.allSchemaComposer.getOTC('Mutation').getFields();
  }

  public listSubscription() {
    return this.allSchemaComposer.getOTC('Subscription').getFields();
  }

  public addExampleInput(apiName: string): InputTypeComposer {
    return InputTypeComposer.create(
      `
      input ${apiName}Input {
        example: String!
      },
    `,
      this.customSchemaComposer
    );
  }

  public addExampleType(apiName: string): ObjectTypeComposer {
    return ObjectTypeComposer.create(
      `
      type ${apiName}Response {
        example: String!
      }
    `,
      this.customSchemaComposer
    );
  }

  public addMutationField(_args: AddMutationFieldInput): GraphqlEditor {
    const { apiName, input, type } = _args;
    this.customSchemaComposer.Mutation.addFields({
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
    this.customSchemaComposer.Query.addFields({
      [apiName]: {
        type,
        args,
      },
    });
    return this;
  }

  public updateCustomSchemaGraphl(args: {
    query?: AddQueryFiledInput;
    mutation?: AddMutationFieldInput;
    callback?: (
      updated: boolean,
      opt: {
        schemaPath: string;
      }
    ) => void;
  }): void {
    const { query, mutation, callback } = args;
    // update custom_schema.graphql
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
      const schema = this.printSchema();
      fs.writeFileSync(asFullPath(this.defaultCustomSchemaPath), schema, 'utf8');
      this.logger.info(chalk().green(schema));
      this.readOrSetCustomSchema();
    }
    if (callback) {
      callback(updated, {
        schemaPath: this.defaultCustomSchemaPath,
      });
    }
  }

  private removeEmptyLines(schemaString: string) {
    const lines = schemaString.split('\n');
    const filteredLines = lines.filter((line) => !line.includes('""""""'));
    return filteredLines.join('\n');
  }

  public printSchema(): string {
    const res = printSchema(this.customSchemaComposer.buildSchema());
    const trimmedSchema = this.removeEmptyLines(res);
    return removeScalars(trimmedSchema);
  }
}
