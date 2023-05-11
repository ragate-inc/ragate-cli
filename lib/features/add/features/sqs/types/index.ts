export type Locale = {
  error: {
    reqiredResourceName: string;
    mustByYamlFilePath: string;
    alreadyExistResource: string;
  };
  overrightFile: string;
  outputFile: string;
};

export type StandardQueueType = {
  Type: 'AWS::SQS::Queue';
  Properties: {
    ContentBasedDeduplication: boolean;
    DelaySeconds: number;
    MaximumMessageSize: number;
    MessageRetentionPeriod: number;
    QueueName: string;
    RedrivePolicy?: { deadLetterTargetArn: string; maxReceiveCount: number };
    VisibilityTimeout: number;
  };
};

export type StandardDeadLetterQueueType = {
  Type: 'AWS::SQS::Queue';
  Properties: {
    DelaySeconds: number;
    MaximumMessageSize: number;
    MessageRetentionPeriod: number;
    QueueName: string;
    VisibilityTimeout: number;
  };
};

export type FifoQueueType = {
  Type: 'AWS::SQS::Queue';
  Properties: {
    ContentBasedDeduplication: boolean;
    DelaySeconds: number;
    FifoQueue: boolean;
    MaximumMessageSize: number;
    MessageRetentionPeriod: number;
    QueueName: string;
    RedrivePolicy?: { deadLetterTargetArn: string; maxReceiveCount: number };
    VisibilityTimeout: number;
  };
};

export type FifoDeadLetterQueueType = {
  Type: 'AWS::SQS::Queue';
  Properties: {
    DelaySeconds: number;
    FifoQueue: boolean;
    MaximumMessageSize: number;
    MessageRetentionPeriod: number;
    QueueName: string;
    VisibilityTimeout: number;
  };
};
