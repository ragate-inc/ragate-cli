export default (args: { indexName: string }) => `
## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-elasticsearch.html

## [START] 共通設定
#set( $args = $ctx.args )
#set( $indexName = "${args.indexName}" )
#set( $allowedAggFields = ["ALLOWED_ALL_FIELDS"] ) ## アグリゲーション指定許可するフィールド名(ALLOWED_ALL_FIELDSを指定時は全フィールド許可)
## [END] 共通設定

## [START] ソート条件生成
#set( $sortValues = [] )
#set( $sortFields = [] )
#if( !$util.isNullOrEmpty($args.sort) )
  #foreach( $sortItem in $args.sort )
    #set( $temp = {
      $sortItem.field : $sortItem.direction
    } )
    $util.qr($sortValues.add($temp))
  #end
#end
## [END] ソート条件生成

## [START] Aggregates適用(分析対象フィールド)
#set( $aggregateValues = {} )
#foreach( $aggItem in $args.aggregates )
  #if( $allowedAggFields[0] == "ALLOWED_ALL_FIELDS" )
    #set( $aggFilter = { "match_all": {} } )
  #elseif( $allowedAggFields.contains($aggItem.field) )
    #set( $aggFilter = { "match_all": {} } )
  #else
    $util.error("Unauthorized to run aggregation on field: \${aggItem.field}", "Unauthorized")
  #end
  $util.qr($aggregateValues.put("$aggItem.name", { "filter": $aggFilter, "aggs": { "$aggItem.name": { "$aggItem.type": { "field": "$aggItem.field" }}} }))
#end
## [END] Aggregates適用(分析対象フィールド)

## [START] フィルター適用
#if( $util.isNullOrEmpty($args.filter) )
  #set( $filter = {
    "match_all": {}
  } )
#else
  #set( $filter = $util.parseJson($util.transform.toElasticsearchQueryDSL($args.filter)) )
#end
## [END] フィルター適用

{
  "version": "2018-05-29",
  "operation": "GET",
  "path": "/$indexName/_doc/_search",
  "params": {
      "body": {
                #if( !$util.isNullOrEmpty($args.nextToken) )"search_after": $util.base64Decode($args.nextToken), #end
                #if( $args.from )"from": $args.from, #end
                "size": #if( $args.limit ) $args.limit #else 100 #end,
                "sort": $util.toJson($sortValues),
                "version": false,
                "query": $util.toJson($filter),
                "aggs": $util.toJson($aggregateValues)
              }
  }
}
`;
