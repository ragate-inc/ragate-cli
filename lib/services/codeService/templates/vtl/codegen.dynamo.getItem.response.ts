export default `## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html

#if( $ctx.error )
  $util.error($ctx.error.message, $ctx.error.type)
#else
  $util.toJson($ctx.result)
#end
`;
