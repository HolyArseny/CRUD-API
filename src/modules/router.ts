import db from '../database';

import { Router } from '../declarations/router';
import { User } from '../declarations/database';

const GET: Router = {
  'api/users': ({ params: [ id ] }: { params: [ id: string] }) =>{
    if (id) {
      const user = db.getUser(id);
      return { code: 200, data: user };
    };
    const userList = db.getUserList();
    return { code: 200, data: userList };
  },
};
const POST: Router = {
  'api/users': ({ data }: { data: User}) => {
    const newUser = db.addUser(data);
    return {code: 201, data: newUser };
  },
};
const PUT: Router = {
  'api/users': ({ params: [id], data}: { params: [ id: string ], data: User }) => {
    const updatedUser = db.updateUser(id, data);
    return { code: 200, data: updatedUser};
  }
};
const DELETE: Router = {
  'api/users': ({ params: [id]}: { params: [ id: string ] }) => {
    db.deleteUser(id);
    return { code: 204 };
  }
};

const router: Router = { GET, POST, PUT, DELETE };

export default router;
