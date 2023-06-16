import basicauthlambda from 'services/codeService/templates/typescript/basicauthlambda';
import skeleton from 'services/codeService/templates/typescript/skeleton';
import create from 'services/codeService/templates/typescript/create';
import update from 'services/codeService/templates/typescript/update';
import deleteTemplate from 'services/codeService/templates/typescript/delete';

export type Template = {
  basicauthlambda: string;
  skeleton: string;
  pipelineAfter: string;
  create: (mutationVariable: string, returnValue: string) => string;
  update: (mutationVariable: string, returnValue: string) => string;
  delete: (mutationVariable: string, returnValue: string) => string;
};

export default {
  basicauthlambda,
  skeleton,
  create,
  update,
  delete: deleteTemplate,
} as Template;
