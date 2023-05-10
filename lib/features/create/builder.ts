import { FeatureBuilderAbstract } from 'types/index';
import yargs from 'yargs';
import Logger from 'utils/logger';

export default class extends FeatureBuilderAbstract {
  constructor(args?: { lang: string }) {
    super(args);
  }
  public build(yargs: yargs.Argv): yargs.Argv {
    return yargs
      .version(false)
      .usage('Usage: create')
      .fail((msg, err) => Logger.handleFaildLog({ msg, err }));
  }
}
