import pipelineAfter from 'services/codeService/templates/vtl/pipeline.after';
import pipelineBefore from 'services/codeService/templates/vtl/pipeline.before';
import localResolverRequest from 'services/codeService/templates/vtl/localResolver.request';
import localResolverResponse from 'services/codeService/templates/vtl/localResolver.response';
import addDynamoQueryRequest from 'services/codeService/templates/vtl/add.dynamo.query.request';
import addDynamoQueryResponse from 'services/codeService/templates/vtl/add.dynamo.query.response';
import codegenDynamoQueryRequest from 'services/codeService/templates/vtl/codegen.dynamo.query.request';
import codegenDynamoQueryResponse from 'services/codeService/templates/vtl/codegen.dynamo.query.response';
import dynamoScanRequest from 'services/codeService/templates/vtl/dynamo.scan.request';
import dynamoScanResponse from 'services/codeService/templates/vtl/dynamo.scan.response';
import addDynamoGetItemRequest from 'services/codeService/templates/vtl/add.dynamo.getItem.request';
import addDynamoGetItemResponse from 'services/codeService/templates/vtl/add.dynamo.getItem.response';
import codegenDynamoGetItemRequest from 'services/codeService/templates/vtl/codegen.dynamo.getItem.request';
import codegenDynamoGetItemResponse from 'services/codeService/templates/vtl/codegen.dynamo.getItem.response';
import openSearchQueryRequest from 'services/codeService/templates/vtl/opensearch.query.request';
import openSearchQueryResponse from 'services/codeService/templates/vtl/opensearch.query.response';
import httpQueryRequest from 'services/codeService/templates/vtl/http.query.request';
import httpQueryResponse from 'services/codeService/templates/vtl/http.query.response';
import rdbQueryRequest from 'services/codeService/templates/vtl/rdb.query.request';
import rdbQueryResponse from 'services/codeService/templates/vtl/rdb.query.response';

export type Template = {
  pipelineAfter: string;
  pipelineBefore: string;
  addDynamoGetItemRequest: (args: { consistentRead: boolean; primaryKeyName: string; sortKeyName: string }) => string;
  addDynamoGetItemResponse: string;
  codegenDynamoGetItemRequest: string;
  codegenDynamoGetItemResponse: string;
  localResolverRequest: string;
  localResolverResponse: string;
  addDynamoQueryRequest: (args: { gsiName?: string; primaryKeyName: string; sortKeyName: string }) => string;
  addDynamoQueryResponse: string;
  codegenDynamoQueryRequest: string;
  codegenDynamoQueryResponse: string;
  dynamoScanRequest: string;
  dynamoScanResponse: string;
  openSearchQueryRequest: (args: { indexName?: string }) => string;
  openSearchQueryResponse: string;
  httpQueryRequest: string;
  httpQueryResponse: string;
  rdbQueryRequest: string;
  rdbQueryResponse: string;
};

export default {
  pipelineAfter,
  pipelineBefore,
  addDynamoGetItemRequest,
  addDynamoGetItemResponse,
  addDynamoQueryRequest,
  addDynamoQueryResponse,
  codegenDynamoGetItemRequest,
  codegenDynamoGetItemResponse,
  codegenDynamoQueryRequest,
  codegenDynamoQueryResponse,
  localResolverRequest,
  localResolverResponse,
  dynamoScanRequest,
  dynamoScanResponse,
  openSearchQueryRequest,
  openSearchQueryResponse,
  httpQueryRequest,
  httpQueryResponse,
  rdbQueryRequest,
  rdbQueryResponse,
} as Template;
