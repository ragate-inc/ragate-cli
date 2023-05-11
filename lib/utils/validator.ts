import _ from 'lodash';

//TODO: 多言語化すること : Must be Multilingualization

export default class {
  static resourceName = (str: string, lang: string): string | boolean => {
    // TODO: サーバーレスフレームワーク及びCloudFormationの規約を調査しバリデーションを実装
    // Investigate serverless framework and CloudFormation rules and implement validation
    return true;
  };

  static filePath = (str: string, lang: string): string | boolean => {
    if (_.isEmpty(str)) return 'required input a cloudformation file path';
    if (!str.endsWith('.yml') && !str.endsWith('.yaml')) return 'input a yaml file path';
    return true;
  };

  static serverlessConfigPath = (str: string, lang: string): string | boolean => {
    if (_.isEmpty(str)) return 'required input a serverless config file path';
    if (!str.endsWith('.yml') && !str.endsWith('.yaml')) return 'input a yaml file path';
    return true;
  };
}
