import { FeatureBuilderAbstract, FeatureBuilderAbstractArgs } from 'types/index';
import yargs from 'yargs';
import Logger from 'utils/logger';

export default class extends FeatureBuilderAbstract {
  constructor(args: FeatureBuilderAbstractArgs) {
    super(args);
  }
  public build(_yargs: yargs.Argv): yargs.Argv {
    return _yargs
      .version(false)
      .usage('Usage: $0 sns <options>')
      .fail((msg, err) => Logger.handleFaildLog({ msg, err }));
  }
}
