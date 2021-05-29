import app from '../src/app';
import { db } from '../src/database';
import supertest from 'supertest';

beforeAll(() => {
  global.testRequest = supertest(app);
});

afterAll(async () => await db.close());
