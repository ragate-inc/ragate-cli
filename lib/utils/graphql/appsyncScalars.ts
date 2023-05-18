const scalrsString = `
  scalar ID
  scalar String
  scalar Int
  scalar Float
  scalar Boolean
  scalar AWSDate
  scalar AWSTime
  scalar AWSDateTime
  scalar AWSTimestamp
  scalar AWSEmail
  scalar AWSJSON
  scalar AWSPhone
  scalar AWSURL
  scalar AWSIPAddress
`;

export const addScalrs = (schema: string) => {
  return `${scalrsString}
  ${schema}`;
};

export const removeScalars = (schema: string) => {
  return schema.replace(scalrsString, '');
};
