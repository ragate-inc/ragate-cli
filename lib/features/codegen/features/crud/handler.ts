import { AWS_REGION, FeatureHandlerAbstract } from 'types/index';
import yargs from 'yargs';

export default class extends FeatureHandlerAbstract {
  constructor(argv: yargs.ArgumentsCamelCase<{ region: AWS_REGION }>) {
    super(argv);
  }

  public async run(): Promise<void> {
    // TODO: serverless.ymlのパスを入力
    // TODO: CRUDのコードを生成するディレクトリを入力
    // TODO: 自動生成処理を実装
    console.log('coming soon...');
  }
}
