import { Locale } from 'features/add/features/sqs/types/index';

const locale: Locale = {
  error: {
    reqiredResourceName: 'リソース名を指定して下さい',
    mustByYamlFilePath: 'Yamlファイルのパスを指定して下さい',
    alreadyExistResource: '指定のリソース名は既に存在します',
  },
  overrightFile: 'Yamlファイルを上書き',
  outputFile: 'Yamlファイルを出力',
};

export default locale;
