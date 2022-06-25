import db from './database';
import { Router } from '../declarations/router';
import { User } from '../declarations/database';

const GET: Router = {
  'api/users': async ({ params: [ id ] }: { params: [ id: string] }): Promise<object> =>{
    if (id) {
      const user = await db.getUser(id);
      return { code: 200, data: user };
    };
    const userList = await db.getUserList();
    return { code: 200, data: userList };
  },
};

const POST: Router = {
  'api/users': async ({ data }: { data: User}): Promise<object> => {
    const newUser = await db.addUser(data);
    return {code: 201, data: newUser };
  },
};

const PUT: Router = {
  'api/users': async ({ params: [id], data}: { params: [ id: string ], data: User }): Promise<object> => {
    const updatedUser = await db.updateUser(id, data);
    return { code: 200, data: updatedUser};
  }
};

const DELETE: Router = {
  'api/users': async ({ params: [id]}: { params: [ id: string ] }): Promise<object> => {
    await db.deleteUser(id);
    return { code: 204 };
  }
};

const router: Router = { GET, POST, PUT, DELETE };

export default router;
