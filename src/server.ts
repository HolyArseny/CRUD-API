import { createServer} from 'http';
import requestHandler from './modules/requestHandler';

const server = () => createServer(requestHandler);

export default server;
