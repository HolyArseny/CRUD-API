import request from 'supertest';
import app from './index';

const user = {
  username: 'test_username',
  age: 54,
  hobbies: ["test_hobbie"]
};

const wrongUser = {
  username: 'test_username',
  age: 54,
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