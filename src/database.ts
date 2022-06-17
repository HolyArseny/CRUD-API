import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { User } from './declarations/database';

const requiredFields: string[] = [ 'username', 'age',  'hobbies' ];

const validNewUser = (user: User): boolean => {
  const keys: string[] = Object.keys(user);
  const isRequiredKeys: boolean = requiredFields.every(key => keys.includes(key));
  const isHobbiesArray: boolean = Array.isArray(user.hobbies);
  if (!isRequiredKeys) throw { code: 400, msg: 'Body does not contain required fields' };
  if (!isHobbiesArray) throw { code: 400, msg: `Field: 'Hobbies' should be an array` };
  return true;
};

class DB {
  users: User[];

  constructor() {
    this.users = [];
  }

  validateID(userId: string): boolean {
    if (!uuidValidate(userId)) throw ({ code: 400, msg: 'Invalid ID (not uuid)' });
    const isExistUser = this.users.find(({ id }) => id === userId);
    if (!isExistUser) throw ({ code: 404, msg: `User doesen't exist` });
    return true;
  };

  addUser(user: User) {
    validNewUser(user);
    const id: string = uuidv4();
    const newUser: User = { ...user, id };
    this.users.push(newUser);
    return newUser;
  };

  getUser(userId: string) {
    this.validateID(userId);
    const user = this.users.find(({ id }) => id === userId);
    return user;
  };

  getUserList() {
    return this.users;
  };

  updateUser(userId: string, user: User) {
    this.validateID(userId);
    const updatedData: User = Object.entries(user).reduce((acc, [key, value]) => {
      if (key !== 'id') {
        const user: User = { ...acc, [key]: value };
        return user;
      };
      return { ...acc, id: userId };
    }, {});
    const userIndex = this.users.findIndex(({ id }) => id === userId);
    this.users[userIndex] = updatedData;
    return this.users[userIndex];
  };

  deleteUser(userId: string) {
    this.validateID(userId);
    const filteredUsers = this.users.filter(({ id }) => id !== userId);
    this.users = filteredUsers;
  };

}

const db = new DB();
export default db;
