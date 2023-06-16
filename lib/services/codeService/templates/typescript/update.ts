export default (mutationVariable: string, returnValue: string) => `import { AppSyncResolverEvent } from 'aws-lambda';
import moment from 'moment';
import DynamoService from 'services/dynamoService';
import { ${mutationVariable}, ${returnValue} } from 'types/API';
import { DYNAMO_TABLES } from 'types/index';
import { NotFoundError } from 'exceptions/index';
import middy from 'utils/middy';

export const handler = middy.handler(async (event: AppSyncResolverEvent<${mutationVariable}>): Promise<${returnValue}> => {
  const input = event.arguments.input;
  const now = moment.tz('Asia/Tokyo').format();
  const dynamoService = new DynamoService();
  const beforeItem = await dynamoService
    .getItem({
      getItemCommandInput: {
        TableName: DYNAMO_TABLES.TableName,
        Key: {
          Id: input.Id,
          Sk: \`${returnValue}#\${input.ItemId}\`,
        },
      },
    })
    .then(({ Item }) => Item as ${returnValue});
  if (!beforeItem) {
    throw new NotFoundError('Item is not found');
  }
  const item: ${returnValue} = {
    Id: input.Id,
    Sk: \`${returnValue}#\${input.ItemId}\`,
    ItemId: input.ItemId,
    ...input,
    CreatedAt: beforeItem.CreatedAt,
    UpdatedAt: now,
  };

  await dynamoService.updateAttributes({
    tableName: DYNAMO_TABLES.TableName,
    keyNames: ['Id', 'Sk'],
    attributes: item,
    returnValues: 'NONE',
  });

  return item;
});
`;
