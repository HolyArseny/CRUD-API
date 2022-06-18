import cluster from 'cluster';
import 'dotenv/config';
import getCpusCount from './helpers/getCpusCount';
import createServer from './server';
import { join } from 'path';
import { getData, setData } from './helpers/fileOperation';

const { APP_PORT } = process.env;
const cpusCount = getCpusCount();
const isMulti = process.argv.includes('--multi');
const databasePath = join(process.cwd(), 'src', 'database.json');

const prepareDatabase = async () => {
  try {
    await getData(databasePath);
  } catch(e) {
    setData(databasePath, []);
  }
};
prepareDatabase();
const startServer = (() => {
  if (cluster.isPrimary && isMulti) {
    for (let i = 0; i < cpusCount; i++) {
      cluster.fork();
    }
  } else {
    const server = createServer();
    server.listen(APP_PORT, () => {
      console.log(`Server started on port: ${APP_PORT}.`);
    });
    return server;
  };
})();

export default startServer;
