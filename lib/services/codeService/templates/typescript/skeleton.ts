export default `import { asyncHandlerWrapper } from 'functions/wrapper';
import { AppSyncResolverEvent, Context } from 'aws-lambda';

type Input = {
  example: string;
};

type Response = {
  example: string;
};

export const handler = asyncHandlerWrapper<AppSyncResolverEvent<Input>, Context, Response>(async (event) => {
  console.log('It is skeleton 👻');
});
`;
