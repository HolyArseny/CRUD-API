import { IncomingMessage, ServerResponse } from 'http';
import urlParser from '../helpers/urlParser';
import router from '../modules/router';
import { ResponseData } from '../declarations/server';


const prepareResponse = async (data: ResponseData, res: any): Promise<string> => {
  const { code = 500, ...rest } = data;
  res.writeHead(code, { 'Content-Type': 'application/json' });
  const response = JSON.stringify({ code, ...rest });
  return response;
};

const errorMap = {
  500: { code: 500, msg: `Server doesen't support current method` },
  404: { code: 404, msg: `Route doesen't exist` },
};

const validateRequest = (method: string, routerPath: string, res: any): object => {
  const routerMethod: any = router[method];
  if (!routerMethod) {
    const error = prepareResponse(errorMap[500], res);
    return res.end(error);
  }
  const route = routerMethod[routerPath];
  if (!route) {
    const error = prepareResponse(errorMap[404], res);
    return res.end(error);
  }
  return route;
};

export default async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  const { url, method = 'GET' } = req;
  const [ prefix, path, ...params ] = urlParser(url);
  const routerPath = `${ prefix }/${ path }`;
  const routeHandler: any = validateRequest(method, routerPath, res);

  const body: Buffer[] = [];
  req.on('data', (chunk) => body.push(chunk));

  new Promise((resolve) => req.on('end', () => {
    const concatedBody: string = body ? body.join('') : '';
    const parsedBody: object = concatedBody ? JSON.parse(concatedBody) : {};
    resolve(parsedBody);
  }))
  .then(async (data) => {
    const ResponseData = await routeHandler({ params, data });
    const response = await prepareResponse(ResponseData, res);
    res.end(response);
  })
  .catch(async (error) => {
    const response = await prepareResponse(error, res);
    res.end(response);
  });
};