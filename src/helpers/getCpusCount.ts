import os from 'os';

export default (): number => os.cpus().length;
