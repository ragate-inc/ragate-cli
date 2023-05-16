export default `import { Context, CloudFrontRequest, Callback, CloudFrontRequestEvent, CloudFrontResultResponse } from 'aws-lambda';

export const handler = (event: CloudFrontRequestEvent, _context: Context, callback: Callback): void => {
  const request: CloudFrontRequest = event.Records[0].cf.request;
  const headers = request.headers;

  const authUser = 'ragate'; // Basic認証のユーザー名
  const authPass = '20210525'; // Basic認証のパスワード

  const authString = 'Basic ' + Buffer.from(authUser + ':' + authPass).toString('base64');
  if (typeof headers.authorization === 'undefined' || headers.authorization[0].value !== authString) {
    const body = 'Unauthorized';
    const response: CloudFrontResultResponse = {
      status: '401',
      statusDescription: 'Unauthorized',
      body: body,
      headers: {
        'www-authenticate': [{ key: 'WWW-Authenticate', value: 'Basic' }],
      },
    };
    callback(null, response);
  }
  callback(null, request);
};
`;
