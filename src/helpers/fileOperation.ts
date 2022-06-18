import { createReadStream, createWriteStream } from 'fs';

export const getData = (path: string): Promise<any> => {
  const readable = createReadStream(path);
  const data: string[] = [];
  return new Promise((resolve, reject) => {
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
  });
};

export const setData = (path: string, data: any): void => {
  const writable = createWriteStream(path);
  const stringifiedData = JSON.stringify(data);
  writable.write(stringifiedData);
};
