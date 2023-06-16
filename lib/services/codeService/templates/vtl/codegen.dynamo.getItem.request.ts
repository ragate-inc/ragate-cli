export default `## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html

## [Start] 共通設定
#set( $primaryKey = "primary key name" )
#set( $sortKeyName = "sort key name" )
#set( $primaryValue = "your primary key value" )
#set( $sortKeyValue = "your sort key value" )
#set( $consistentRead = false )
## [End] 共通設定

## [Start] 自動設定
## [End] 自動設定

## [Start] バリデーション
#set( $modelExpression = {
    "version" : "2017-02-28",
    "operation" : "GetItem",
    "key" : {},
    "consistentRead" : $consistentRead
} )
#if( $util.isNullOrEmpty($primaryValue) )
  $util.error("PrimaryValue is null.", "InvalidIndexValueError")
#else
  $util.qr($modelExpression.key.put($primaryKey, $util.dynamodb.toDynamoDB($primaryValue)))
#end
#if( !$util.isNullOrEmpty($sortKeyName) && $util.isNullOrEmpty($sortKeyValue) )
  $util.error("sortKeyValue is null.", "InvalidIndexValueError")
#elseif( !$util.isNullOrEmpty($sortKeyName) && !$util.isNullOrEmpty($sortKeyValue) )
  $util.qr($modelExpression.key.put($sortKeyName, $util.dynamodb.toDynamoDB($sortKeyValue)))
#end
## [End] バリデーション

$util.toJson($modelExpression)
`;