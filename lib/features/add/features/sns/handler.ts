import Logger from 'utils/logger';
import { AWS_REGION, FeatureHandlerAbstract } from 'types/index';
import yargs from 'yargs';
import _ from 'lodash';
import { processCurrent } from 'utils/cli';
import { readYaml, writeYaml } from 'utils/yaml';
import { getLocaleLang } from 'features/add/features/sns/utils/getLocale';

type SnsType = {
  Type: 'AWS::SNS::Topic';
  Properties: {
    TopicName: string;
    Subscription: string;
  };
};

type Resource = {
  Resources?: Record<string, SnsType>;
};

const defaultSubscription = [
  {
    Endpoint: 'Your lambda Arn',
    Protocol: 'lambda',
  },
  {
    Endpoint: 'Your email address',
    Protocol: 'email',
  },
];

export default class extends FeatureHandlerAbstract {
  constructor(argv: yargs.ArgumentsCamelCase<{ region: AWS_REGION }>) {
    super(argv);
  }

  private get defaultResourcePath(): string {
    return `serverless/${this.argv.region}/resources/sns.yml`;
  }

  public async run(): Promise<void> {
    const logger = Logger.getLogger();
    const locale = getLocaleLang(this.lang);
    const argv = this.argv;

    const resourceName = argv._[2] as string;
    if (_.isEmpty(resourceName)) {
      logger.error(locale.error.reqiredResourceName);
      return;
    }

    const path: string = _.chain(argv.path)
      .thru((v) => {
        if (_.isEmpty(v)) return `${processCurrent}/${this.defaultResourcePath}`;
        if (_.startsWith(v as string, '/')) return `${processCurrent}${v as string}`;
        return `${processCurrent}/${v as string}`;
      })
      .value();

    if (!path.endsWith('.yml') && !path.endsWith('.yaml')) {
      logger.error(`${locale.error.mustByYamlFilePath} : ${path}`);
      return;
    }

    try {
      const doc: Resource = (readYaml(path) as Resource) ?? {};
      if (_.hasIn(doc, `Resources.${resourceName}`)) {
        logger.error(`${locale.error.alreadyExistResource} : ${resourceName}`);
        logger.error(doc);
        return;
      }
      const yamlText = writeYaml(path, {
        ...doc,
        Resources: {
          ...doc.Resources,
          [resourceName]: {
            Type: 'AWS::SNS::Topic',
            Properties: {
              TopicName: resourceName,
              Subscription: defaultSubscription,
            },
          },
        },
      });
      logger.info(path);
      logger.info(`${locale.overrightFile} : ${path}`);
      logger.info(yamlText);
      return;
    } catch (e) {
      const yamlText = writeYaml(path, {
        Resources: {
          ErrorNotifySnsTopic: {
            Type: 'AWS::SNS::Topic',
            Properties: {
              TopicName: resourceName,
              Subscription: defaultSubscription,
            },
          },
        },
      });
      logger.info(path);
      logger.info(`${locale.outputFile} : ${path}`);
      logger.info(yamlText);
    }
  }
}
