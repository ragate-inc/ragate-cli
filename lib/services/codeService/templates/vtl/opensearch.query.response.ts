export default `
## Reference : https://docs.aws.amazon.com/ja_jp/appsync/latest/devguide/resolver-mapping-template-reference-elasticsearch.html

#if( $ctx.error )
  $util.error($ctx.error.message, $ctx.error.type)
#end

#set( $es_items = [] )
#set( $aggregateValues = [] )
#foreach( $entry in $context.result.hits.hits )
  #if( !$foreach.hasNext )
    #set( $nextToken = $util.base64Encode($util.toJson($entry.sort)) )
  #end
  $util.qr($es_items.add($entry.get("_source")))
#end
#foreach( $aggItem in $context.result.aggregations.keySet() )
  #set( $aggResult = {} )
  #set( $aggResultValue = {} )
  #set( $currentAggItem = $ctx.result.aggregations.get($aggItem) )
  $util.qr($aggResult.put("name", $aggItem))
  #if( !$util.isNullOrEmpty($currentAggItem) )
    #if( !$util.isNullOrEmpty($currentAggItem.get($aggItem).buckets) )
      ## $util.qr($aggResultValue.put("__typename", "SearchableAggregateBucketResult"))
      $util.qr($aggResultValue.put("buckets", $currentAggItem.get($aggItem).buckets))
    #end
    #if( !$util.isNullOrEmpty($currentAggItem.get($aggItem).value) )
      ## $util.qr($aggResultValue.put("__typename", "SearchableAggregateScalarResult"))
      $util.qr($aggResultValue.put("value", $currentAggItem.get($aggItem).value))
    #end
  #end
  $util.qr($aggResult.put("result", $aggResultValue))
  $util.qr($aggregateValues.add($aggResult))
#end
$util.toJson({
  "items": $es_items,
  "total": $ctx.result.hits.total.value,
  "nextToken": $nextToken,
  "aggregateItems": $aggregateValues
})
`;
