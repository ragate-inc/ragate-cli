import pipelineAfter from 'services/codeService/templates/vtl/pipeline.after';
import pipelineBefore from 'services/codeService/templates/vtl/pipeline.before';

export type Template = {
  pipelineAfter: string;
  pipelineBefore: string;
};

export default {
  pipelineAfter,
  pipelineBefore,
} as Template;
