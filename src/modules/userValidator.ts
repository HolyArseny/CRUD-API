import { validate as uuidValidate } from 'uuid';
import { User } from '../declarations/database';

const requiredFields: string[] = [ 'username', 'age',  'hobbies' ];

export const validNewUser = (user: User): boolean => {
  const keys: string[] = Object.keys(user);
  const isRequiredKeys: boolean = requiredFields.every(key => keys.includes(key));
  const isHobbiesArray: boolean = Array.isArray(user.hobbies);
  if (!isRequiredKeys) throw { code: 400, msg: 'Body does not contain required fields' };
  if (!isHobbiesArray) throw { code: 400, msg: `Field: 'Hobbies' should be an array` };
  return true;
};

export const validateID = (userId: string, users: User[]): boolean => {
  if (!uuidValidate(userId)) throw ({ code: 400, msg: 'Invalid ID (not uuid)' });
  const isExistUser = users.find(({ id }) => id === userId);
  if (!isExistUser) throw ({ code: 404, msg: `User doesen't exist` });
  return true;
};
