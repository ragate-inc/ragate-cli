import { FeatureBuilderAbstract } from 'types/index';
import yargs from 'yargs';

export default class extends FeatureBuilderAbstract {
  public static build(yargs: yargs.Argv): yargs.Argv {
    return yargs.version(false);
  }
}
