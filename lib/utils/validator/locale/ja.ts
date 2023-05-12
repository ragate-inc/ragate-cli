import { Locale } from 'utils/validator/types/index';

const locale: Locale = {
  mustBeYaml: 'Yamlファイルを指定して下さい',
  resourceName: {
    invalidFormat: '正しいフォーマットで入力して下さい',
  },
  filePath: {
    required: 'クラウドフォーメーションのパスは必須です',
  },
  serverlessConfigPath: {
    required: 'サーバーレスフレームワークの設定ファイル(serverless.yml)のパスは必須です',
  },
};

export default locale;
