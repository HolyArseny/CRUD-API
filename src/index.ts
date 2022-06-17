import cluster from 'cluster';
import 'dotenv/config';
import getCpusCount from './helpers/getCpusCount';
import createServer from './server';

const { APP_PORT } = process.env;
const cpusCount = getCpusCount();
const isMulti = process.argv.includes('--multi');

if (cluster.isPrimary && isMulti) {
  for (let i = 0; i < cpusCount; i++) {
    cluster.fork();
    cluster.on('exit', ({ process: { pid }}) => {
      console.log(`EXIT: worker ${ pid }`);
    });
  }
} else {
  const server = createServer();
  server.listen(APP_PORT, () => {
    console.log(`Server started on port: ${APP_PORT}.`);
  });
};
