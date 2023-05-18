import pipelineAfter from 'services/codeService/templates/vtl/pipeline.after';
import pipelineBefore from 'services/codeService/templates/vtl/pipeline.before';
import localResolverRequest from 'services/codeService/templates/vtl/localResolver.request';
import localResolverResponse from 'services/codeService/templates/vtl/localResolver.response';
import dynamoQueryRequest from 'services/codeService/templates/vtl/dynamo.query.request';
import dynamoQueryResponse from 'services/codeService/templates/vtl/dynamo.query.response';
import dynamoScanRequest from 'services/codeService/templates/vtl/dynamo.scan.request';
import dynamoScanResponse from 'services/codeService/templates/vtl/dynamo.scan.response';
import dynamoGetItemRequest from 'services/codeService/templates/vtl/dynamo.getItem.request';
import dynamoGetItemResponse from 'services/codeService/templates/vtl/dynamo.getItem.response';
import openSearchQueryRequest from 'services/codeService/templates/vtl/opensearch.query.request';
import openSearchQueryResponse from 'services/codeService/templates/vtl/opensearch.query.response';
import httpQueryRequest from 'services/codeService/templates/vtl/http.query.request';
import httpQueryResponse from 'services/codeService/templates/vtl/http.query.response';
import rdbQueryRequest from 'services/codeService/templates/vtl/rdb.query.request';
import rdbQueryResponse from 'services/codeService/templates/vtl/rdb.query.response';

export type Template = {
  pipelineAfter: string;
  pipelineBefore: string;
  dynamoGetItemRequest: (args: { consistentRead: boolean; primaryKeyName: string; sortKeyName: string }) => string;
  dynamoGetItemResponse: string;
  localResolverRequest: string;
  localResolverResponse: string;
  dynamoQueryRequest: (args: { gsiName?: string; primaryKeyName: string; sortKeyName: string }) => string;
  dynamoQueryResponse: string;
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
  dynamoGetItemRequest,
  dynamoGetItemResponse,
  dynamoQueryRequest,
  dynamoQueryResponse,
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
