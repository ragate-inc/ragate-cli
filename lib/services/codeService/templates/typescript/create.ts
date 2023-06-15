export default (mutationVariable: string, returnValue: string) => `
import { AppSyncResolverEvent } from 'aws-lambda';
import moment from 'moment';
import DynamoService from 'services/dynamoService';
import { ${mutationVariable}, ${returnValue} } from 'types/API';
import { DYNAMO_TABLES } from 'types/index';
import { v4 as uuid } from 'uuid';

export const handler = async (event: AppSyncResolverEvent<${mutationVariable}>): Promise<${returnValue}> => {
  const input = event.arguments.input;
  const now = moment.tz('Asia/Tokyo').format();
  const dynamoService = new DynamoService();
  const Id = uuid();
  const itemId = uuid();
  const item: ${returnValue} = {
    Id: Id,
    Sk: \`${returnValue}#\${itemId}\`,
    ItemId: itemId,
    ...input,
    CreatedAt: now,
    UpdatedAt: now,
  };
  await dynamoService.putItem({
    putItemCommandInput: {
      TableName: DYNAMO_TABLES.TableName,
      Item: item,
      ConditionExpression: 'attribute_not_exists(Id) and attribute_not_exists(Sk)',
    },
  });

  return item;
};
`;
