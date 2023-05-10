import { FeatureBuilderAbstract } from 'types/index';
import yargs from 'yargs';
import Logger from 'utils/logger';

export default class extends FeatureBuilderAbstract {
  constructor() {
    super();
  }
  public build(args: { yargs: yargs.Argv; logger: Logger }): yargs.Argv {
    return args.yargs.version(false).fail((msg, err) => Logger.handleFaildLog({ msg, err }));
  }
}
