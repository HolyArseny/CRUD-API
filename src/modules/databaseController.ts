import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { User } from '../declarations/database';
import { join } from 'path';
import { getData, setData } from '../helpers/fileOperation';

const databasePath = join(process.cwd(), 'src', 'database.json');
const requiredFields: string[] = [ 'username', 'age',  'hobbies' ];

const validNewUser = (user: User): boolean => {
  const keys: string[] = Object.keys(user);
  const isRequiredKeys: boolean = requiredFields.every(key => keys.includes(key));
  const isHobbiesArray: boolean = Array.isArray(user.hobbies);
  if (!isRequiredKeys) throw { code: 400, msg: 'Body does not contain required fields' };
  if (!isHobbiesArray) throw { code: 400, msg: `Field: 'Hobbies' should be an array` };
  return true;
};

const validateID = (userId: string, users: User[]): boolean => {
  if (!uuidValidate(userId)) throw ({ code: 400, msg: 'Invalid ID (not uuid)' });
  const isExistUser = users.find(({ id }) => id === userId);
  if (!isExistUser) throw ({ code: 404, msg: `User doesen't exist` });
  return true;
};

export default {
  async addUser(user: User): Promise<User> {
    const users: User[] = await getData(databasePath);
    validNewUser(user);
    const id: string = uuidv4();
    const newUser: User = { ...user, id };
    users.push(newUser);
    await setData(databasePath, users);
    return newUser;
  },

  async getUser(userId: string): Promise<any> {
    const users: User[] = await getData(databasePath);
    validateID(userId, users);
    const user = users.find(({ id }) => id === userId);
    return user;
  },

  async getUserList(): Promise<User[]> {
    const users: User[] = await getData(databasePath);
    return users;
  },

  async updateUser(userId: string, user: User): Promise<User> {
    const users: User[] = await getData(databasePath);
    validateID(userId, users);
    validNewUser(user);
    const updatedData: User = Object.entries(user).reduce((acc, [key, value]) => {
      const user: User = { ...acc, [key]: value, id: userId };
      return user;
    }, {});
    const userIndex = users.findIndex(({ id }) => id === userId);
    users[userIndex] = updatedData;
    await setData(databasePath, users);
    return users[userIndex];
  },

  async deleteUser(userId: string): Promise<void> {
    const users: User[] = await getData(databasePath);
    validateID(userId, users);
    const filteredUsers = users.filter(({ id }) => id !== userId);
    await setData(databasePath, filteredUsers);
  },
};
