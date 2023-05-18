import pipelineAfter from 'services/codeService/templates/vtl/pipeline.after';
import pipelineBefore from 'services/codeService/templates/vtl/pipeline.before';
import getItemRequest from 'services/codeService/templates/vtl/getItem.request';
import getItemResponse from 'services/codeService/templates/vtl/getItem.response';
import localResolverRequest from 'services/codeService/templates/vtl/localResolver.request';
import localResolverResponse from 'services/codeService/templates/vtl/localResolver.response';

export type Template = {
  pipelineAfter: string;
  pipelineBefore: string;
  getItemRequest: (value: boolean) => string;
  getItemResponse: string;
  localResolverRequest: string;
  localResolverResponse: string;
};

export default {
  pipelineAfter,
  pipelineBefore,
  getItemRequest,
  getItemResponse,
  localResolverRequest,
  localResolverResponse,
} as Template;
