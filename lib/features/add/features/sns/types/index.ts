export type Locale = {
  error: {
    reqiredSubscriptions: string;
  };
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
