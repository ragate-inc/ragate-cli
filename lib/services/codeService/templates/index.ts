import basicauthlambda from 'services/codeService/templates/typescript/basicauthlambda';
import skeleton from 'services/codeService/templates/typescript/skeleton';

export type Template = {
  basicauthlambda: string;
  skeleton: string;
};

export default {
  basicauthlambda,
  skeleton,
} as Template;
