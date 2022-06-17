## Info
 * Used 16 LTS version of Node.js;
 * Task implemented with Typescript usage;
 * Package used: nodemon, dotenv, typescript, ts-node, uuid, @types/* (all packages is allowed);

## Installment guid

### Install

1. Clone the project to your computer;
2. Install the project with following command:
    >  npm i
3. Start the project with following commands:
    3.1 Development mode;
    > npm run start:dev

    3.2 Build and start production mode;
    > npm run start:prod

    3.3 Build and start in multicluster mode.
    > mpm run start:multi

### Usage guid
  * **GET** api/users (get all persons);
  * **GET** api/users/${userId} (get person by ID);
  * **POST** api/users (create new user and store it in database);
  * **PUT** api/users/{userId} (update existing user);
  * **DELETE** api/users/${userId} (delete existing user from database).

**Required fields**
  * **username** — user's name (**type:** string);
  * **age** — user's age (**type:** number);
  * **hobbies** — user's hobbies (**type:** array of strings / empty array).

**Note**
If application port already in use, you can change it in **.env** file.
