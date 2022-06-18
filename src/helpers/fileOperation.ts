import { createReadStream, createWriteStream } from 'fs';

export const getData = (path: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const readable = createReadStream(path);
    const data: string[] = [];
    readable.on('data', (chunk: string) => {
      data.push(chunk);
    });
    readable.on('end', () => {
      const stringifiedBuffer: string = data.join('');
      try {
        const parsedData: [] = JSON.parse(stringifiedBuffer);
        resolve(parsedData);
      } catch(e) {
        reject(null);
      }
    });
    readable.on('error', () => {
      reject({ code: 500, msg: `Canno't read database file` });
    });
  });
};

export const setData = (path: string, data: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    const writable = createWriteStream(path);
    const stringifiedData = JSON.stringify(data);
    writable.write(stringifiedData);
    writable.end(() => {
      resolve();
    });
    writable.on('error', () => {
      reject({ code: 500, msg: `Canno't write into database file` });
    });
  });
};
