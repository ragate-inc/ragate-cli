import basicauthlambda from 'services/codeService/templates/code/basicauthlambda';
import skeleton from 'services/codeService/templates/code/skeleton';

export type Template = {
  basicauthlambda: string;
  skeleton: string;
};

export default {
  basicauthlambda,
  skeleton,
} as Template;
