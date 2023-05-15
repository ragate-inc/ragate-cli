export type Locale = {
  error: {
    reqiredSubscriptions: string;
    mustByYamlFilePath: string;
    alreadyExistResource: string;
  };
  overrightFile: string;
  outputFile: string;
};

export type SnsType = {
  Type: 'AWS::SNS::Topic';
  Properties: {
    TopicName: string;
    Subscription: {
      Endpoint: string;
      Protocol: string;
    }[];
  };
};
