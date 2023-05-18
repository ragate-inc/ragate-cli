export default `
## [Start] 共通設定
#set($payload = $ctx.args )
#set($primaryValue = "your primary key value" )
## [End] 共通設定

#if( $util.isNullOrEmpty($primaryValue) )
  #return
#end

{
  "version": "2017-02-28",
  "payload": $util.toJson($payload)
}
`;
