import os from 'os';

export const getCpus = (): object[] => os.cpus();
