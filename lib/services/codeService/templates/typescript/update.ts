export default (mutationVariable: string, returnValue: string) => `import { AppSyncResolverEvent } from 'aws-lambda';
import moment from 'moment';
import DynamoService from 'services/dynamoService';
import { ${mutationVariable}, ${returnValue} } from 'types/API';
import { DYNAMO_TABLES } from 'types/index';
import middy from 'utils/middy';

export const handler = middy.handler(async (event: AppSyncResolverEvent<${mutationVariable}>): Promise<${returnValue}> => {
  const input = event.arguments.input;
  const now = moment.tz('Asia/Tokyo').format();
  const dynamoService = new DynamoService();
  const item = {
    ...input,
    Id: input.Id,
    Sk: \`${returnValue}#\${input.ItemId}\`,
    UpdatedAt: now,
  } as ${returnValue};

  await dynamoService.updateAttributes({
    tableName: DYNAMO_TABLES.TableName,
    keyNames: ['Id', 'Sk'],
    attributes: item,
    returnValues: 'NONE',
  });

  return item;
});
`;
