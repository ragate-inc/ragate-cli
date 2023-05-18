import Logger from 'utils/logger';
import { Stack, Construct, StackProps, App, CfnResource } from '@aws-cdk/core';
import { Resource } from '@aws-cdk/core';
import { SynthUtils } from '@aws-cdk/assert';

export default class {
  public static generateCloudFormation = (resourceName: string, resource: (c: Construct) => Resource): Record<string, unknown> => {
    class DevStack extends Stack {
      constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        const res = resource(this);
        const cfn = res.node.defaultChild as CfnResource;
        cfn.overrideLogicalId(resourceName);
      }
    }
    const logger = Logger.getLogger();
    const stack = new DevStack(new App(), 'ragate');
    // Convert to CloudFormation template
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const cfn = SynthUtils.toCloudFormation(stack) as Record<string, unknown>;
    logger.debug('generated cloudFormation template:');
    logger.debug(cfn);
    return cfn.Resources as Record<string, unknown>;
  };
}
