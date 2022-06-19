import request from 'supertest';
import app from './index';
import { User } from './declarations/database';

const user: User = {
  username: 'test_username',
  age: 54,
  hobbies: ["test_hobbie"]
};

const wrongUser: User = {
  username: 'test_username',
  age: 54,
};

const userWithChangedFields: User = {
  username: 'test_username',
  age: 55,
  hobbies: ["new_test_hobbie", "new_test_hobbie2"],
};

describe('POST /api/users', () => {
  describe('given user object with required fields', () => {
    test("should respond with a 201 status code", async () => {
      const response = await request(app).post('/api/users').send(user);
      expect(response.statusCode).toBe(201);
    });
    test("should respond with created user", async () => {
      const response = await request(app).post('/api/users').send(user);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('when user without required fields', () => {
    test("should respond with a 400 status code", async () => {
      const response = await request(app).post('/api/users').send(wrongUser);
      expect(response.statusCode).toBe(400);
    });
  });
});

describe('GET /api/users', () => {
  describe('when user without required fields', () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get('/api/users');
      expect(response.statusCode).toBe(200);
    });
    test("should respond with data", async () => {
      const response = await request(app).get('/api/users');
      expect(response.body.data).toBeDefined();
    });
  });
});

describe('GET /api/users/{userID}', () => {
  describe('getting user by id', () => {
    test("should respond with a 200 status code", async () => {
      const createResponse = await request(app).post('/api/users').send(user);
      const id = createResponse.body.data.id;
      const response = await request(app).get(`/api/users/${id}`);
      expect(response.statusCode).toBe(200);
    });
    test("should respond with user data", async () => {
      const createResponse = await request(app).post('/api/users').send(user);
      const id = createResponse.body.data.id;
      const response = await request(app).get(`/api/users/${id}`);
      expect(response.body.data).toStrictEqual(createResponse.body.data);
    });
  });
});

describe('PUT /api/users/{userID}', () => {
  describe('given user object with required fields', () => {
    test("should respond with a 200 status code", async () => {
      const createResponse = await request(app).post('/api/users').send(user);
      const id = createResponse.body.data.id;
      const response = await request(app)
        .put(`/api/users/${id}`)
        .send(userWithChangedFields);
      expect(response.statusCode).toBe(200);
    });
    test("should respond with updated data", async () => {
      const createResponse = await request(app).post('/api/users').send(user);
      const id = createResponse.body.data.id;
      const response = await request(app)
        .put(`/api/users/${id}`)
        .send(userWithChangedFields);
        userWithChangedFields.id = id;
      expect(response.body.data).toStrictEqual(userWithChangedFields);
    });
  });

  describe('when user without required fields', () => {
    test("should respond with a 400 status code", async () => {
      const createResponse = await request(app).post('/api/users').send(user);
      const id = createResponse.body.data.id;
      const response = await request(app)
        .put(`/api/users/${id}`)
        .send(wrongUser);
      expect(response.statusCode).toBe(400);
    });
  });
});

describe('DELETE /api/users/{userID}', () => {
  describe('delete user by id', () => {
    test("should respond with a 204 status code", async () => {
      const createResponse = await request(app).post('/api/users').send(user);
      const id = createResponse.body.data.id;
      const response = await request(app).delete(`/api/users/${id}`);
      expect(response.statusCode).toBe(204);
    });
  });
});