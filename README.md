## Info
 * Used 16 LTS version of Node.js;
 * Task implemented with Typescript usage;
 * App implemented with in-memory-database and memory sharing between workers;
 * Package used: nodemon, dotenv, typescript, ts-node, uuid, @types/* (all packages are allowed);
 * Testing packages: Jest, supertest, @types/jest, @types/supertest, ts-jest (all packages are allowed);
 * Project includes 11 tests.

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
    > npm run start:multi

    3.4 Run test
    > npm run test

### Usage guid
  **Database is empty from start. You should create user for first.**
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
* If application port already in use, you can change it in **.env** file.
* If you have any questions feel free to ask me.
**Discord**: holyarseny#6229.
