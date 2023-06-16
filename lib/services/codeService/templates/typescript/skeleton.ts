export default `import { asyncHandlerWrapper } from 'functions/wrapper';
import { AppSyncResolverEvent, Context } from 'aws-lambda';
import middy from 'utils/middy';

type Input = {
  example: string;
};

type Response = {
  example: string;
};

export const handler = middy.handler((async (event: AppSyncResolverEvent<Input>): Promise<Response> => {
  console.log('It is skeleton 👻');
});
`;
