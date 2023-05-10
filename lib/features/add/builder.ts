import { FeatureBuilderAbstract } from 'types/index';
import yargs from 'yargs';
import pino from 'pino';
import Logger from 'utils/logger';

export default class extends FeatureBuilderAbstract {
  public static build(yargs: yargs.Argv, logger: pino.Logger): yargs.Argv {
    return yargs.version(false).fail((msg, err) => Logger.handleFaildLog({ msg, err }));
  }
}
