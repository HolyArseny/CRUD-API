import cluster from 'cluster';
import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../declarations/database';
import { validNewUser, validateID } from './userValidator';

export let users: User[] = [];
export const synchronizeUsers = (usersFromWorker: User[]) => {
  users = usersFromWorker;
};

const dbEmitter: EventEmitter = new EventEmitter();
dbEmitter.on('db_update', (): void => {
  if (cluster.isPrimary) return;
  const worker = cluster.worker!;
  worker.send(users);
});

export default {
  async addUser(user: User): Promise<User> {
    validNewUser(user);
    const id: string = uuidv4();
    const newUser: User = { ...user, id };
    users.push(newUser);
    dbEmitter.emit('db_update');
    return newUser;
  },

  async getUser(userId: string): Promise<any> {
    validateID(userId, users);
    const user = users.find(({ id }) => id === userId);
    return user;
  },

  async getUserList(): Promise<User[]> {
    return users;
  },

  async updateUser(userId: string, user: User): Promise<User> {
    validateID(userId, users);
    validNewUser(user);
    const updatedData: User = Object.entries(user).reduce((acc, [key, value]) => {
      const user: User = { ...acc, [key]: value, id: userId };
      return user;
    }, {});
    const userIndex = users.findIndex(({ id }) => id === userId);
    users[userIndex] = updatedData;
    dbEmitter.emit('db_update');
    return users[userIndex];
  },

  async deleteUser(userId: string): Promise<void> {
    validateID(userId, users);
    const filteredUsers = users.filter(({ id }) => id !== userId);
    users = filteredUsers;
    dbEmitter.emit('db_update');
  },

};
