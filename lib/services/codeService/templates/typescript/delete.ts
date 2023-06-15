export default (mutationVariable: string, returnValue: string) => `
import { AppSyncResolverEvent } from 'aws-lambda';
import { ${mutationVariable}, ${returnValue} } from 'types/API';
import { DYNAMO_TABLES } from 'types/index';
import DynamoService from 'services/dynamoService';

export const handler = async (event: AppSyncResolverEvent<${mutationVariable}>): Promise<${returnValue}> => {
  const dynamoService = new DynamoService();
  const item = await dynamoService
    .deleteItem({
      deleteItemCommandInput: {
        TableName: DYNAMO_TABLES.TableName,
        Key: {
          Id: event.arguments.input.Id,
          Sk: \`${returnValue}#\${event.arguments.input.ItemId}\`,
        },
        ReturnValues: 'ALL_OLD',
      },
    })
    .then(({ Attributes }) => Attributes as ${returnValue});

  return item;
};
`;
