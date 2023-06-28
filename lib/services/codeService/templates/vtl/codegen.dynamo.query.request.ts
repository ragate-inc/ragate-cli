export default `## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html

## [Start] User Input
##set( $indexName = "gsi index name" )
#set( $primaryKey = "primary key name" )
#set( $sortKeyName = "sort key name" )
#set( $primaryValue = "your primary key value" )
#set( $sortKeyValue = "your sort key value" )
#if( $util.isNullOrEmpty($sortKeyValue) )
    #set( $sortKeyValue = {
    "beginsWith" : "FacetsName#"
  } )
#end
## [End] UserInput

## [Start] Auto Set
#set( $args = $ctx.args )
## [End] Auto Set

## [Start] validation
#set( $modelQueryExpression = {} )
#if( $util.isNullOrEmpty($primaryValue) )
  $util.error("PrimaryValue is null.", "InvalidIndexValueError")
#else
  #set( $modelQueryExpression.expression = "#$primaryKey = :$primaryKey" )
  #set( $modelQueryExpression.expressionNames = {
    "#$primaryKey": $primaryKey
  })
  #set( $modelQueryExpression.expressionValues = {
    ":$primaryKey": $util.dynamodb.toDynamoDB($primaryValue)
  })
#end
## [End] validation

## [Start] Query generation for sort key
#if( !$util.isNullOrEmpty($sortKeyName) && !$util.isNullOrEmpty($sortKeyValue) )
  #if( !$util.isNull($sortKeyValue.beginsWith) )
    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND begins_with(#sortKey, :sortKey)" )
    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))
    $util.qr($modelQueryExpression.expressionValues.put(":sortKey",  $util.dynamodb.toDynamoDB("$sortKeyValue.beginsWith") ))
  #elseif( !$util.isNull($sortKeyValue.between) )
    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey BETWEEN :sortKey0 AND :sortKey1" )
    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))
    $util.qr($modelQueryExpression.expressionValues.put(":sortKey0", $util.dynamodb.toDynamoDB("$sortKeyValue.between[0]") ))
    $util.qr($modelQueryExpression.expressionValues.put(":sortKey1", $util.dynamodb.toDynamoDB("$sortKeyValue.between[1]") ))
  #elseif( !$util.isNull($sortKeyValue.eq) )
    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey = :sortKey" )
    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))
    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.eq") ))
  #elseif( !$util.isNull($sortKeyValue.lt) )
    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey < :sortKey" )
    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))
    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.lt") ))
  #elseif( !$util.isNull($sortKeyValue.le) )
    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey <= :sortKey" )
    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))
    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.le") ))
  #elseif( !$util.isNull($sortKeyValue.gt) )
    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey > :sortKey" )
    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))
    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.gt") ))
  #elseif( !$util.isNull($sortKeyValue.ge) )
    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND #sortKey >= :sortKey" )
    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))
    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.ge") ))
  #elseif( !$util.isNull($sortKeyValue.contains) )
    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND contains(#sortKey, :sortKey)" )
    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))
    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.contains") ))
  #elseif( !$util.isNull($sortKeyValue.notContains) )
    #set( $modelQueryExpression.expression = "$modelQueryExpression.expression AND notContains(#sortKey, :sortKey)" )
    $util.qr($modelQueryExpression.expressionNames.put("#sortKey", "$sortKeyName"))
    $util.qr($modelQueryExpression.expressionValues.put(":sortKey", $util.dynamodb.toDynamoDB("$sortKeyValue.notContains") ))
  #else
  #end
#end
## [End] Query generation for sort key

## [Start] VTL string output
#set( $limit = $util.defaultIfNull($args.limit, 100) )
#set( $request = {
  "version": "2018-05-29",
  "limit": $limit
} )
#if( $args.nextToken && !$util.isNullOrEmpty($args.nextToken) )
  #set( $request.nextToken = $args.nextToken )
#end
#if( $args.filter )
  #set( $request.filter = $util.parseJson("$util.transform.toDynamoDBFilterExpression($args.filter)") )
#end
#if( !$util.isNull($modelQueryExpression) && !$util.isNullOrEmpty($modelQueryExpression.expression) )
  $util.qr($request.put("operation", "Query"))
  $util.qr($request.put("query", $modelQueryExpression))
  #if( $util.isNullOrEmpty($args.sortDirection) )
    #set( $request.scanIndexForward = false )
  #elseif( $args.sortDirection == "ASC" )
    #set( $request.scanIndexForward = true )
  #elseif( $args.sortDirection == "DESC" )
    #set( $request.scanIndexForward = false )
  #end
#else
  $util.qr($request.put("operation", "Scan"))
#end
#if(!$util.isNull($indexName))
    $util.qr($request.put("index", $indexName))
#end
$util.toJson($request)
## [End] VTL string output`;
