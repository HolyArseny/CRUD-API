import cluster from 'cluster';
import 'dotenv/config';
import { getCpus } from './helpers/getOsInfo';
import createServer from './server';
import { synchronizeUsers } from './modules/database';

const defaultPort = 3000;
const { APP_PORT } = process.env || defaultPort;
const cpus = getCpus();
const isMulti = process.argv.includes('--multi');


const startApp = () => {
  const server = createServer();
  server.listen(APP_PORT, () => {
    console.log(`Server started on port: ${APP_PORT} with pid ${process.pid}.`);
  });
  return server;
};

const createWorkers = () => {
  cpus.forEach(() => cluster.fork());
  const workers = Object.values(cluster.workers!);
  cluster.on("message", (_, users) => {
    workers.forEach((worker) => worker?.send(users));
  });
};

const addWorkerListener = () => {
  const worker = cluster.worker!;
  worker.on("message", (users) => synchronizeUsers(users));
};

const startMultiProcessApp = () => {
  if (cluster.isPrimary) return createWorkers();
  addWorkerListener();
  return startApp();
};

export default isMulti ? startMultiProcessApp() : startApp();
