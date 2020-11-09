// TODO: add VERIFY Function Test

const request = require('supertest');
const { app, db } = require('../src/server');

describe('AUTH Module Login', () => {
  test("Route it's works", async () => {
    const response = await request(app).post('/api/auth');
    expect(response.status).toBe(200);
  });

  test('Login as Admin', async () => {
    const username = 'admin';
    const password = 'kobe8bryantA';

    const response = await request(app)
      .post('/api/auth')
      .send({ username, password });

    expect(response.body.ok).toBe(true);
    expect(response.body.message).toBe(`Bienvenido "${username}"`);
  });

  test('Wrong password for Admin user', async () => {
    const username = 'admin';
    const password = 'wrongpassword';

    const response = await request(app)
      .post('/api/auth')
      .send({ username, password });

    expect(response.body.ok).toBe(false);
    expect(response.body.message).toBe(`Clave incorrecta`);
  });

  test('Wrong username', async () => {
    const username = 'fakeuser';
    const password = 'wrongpassword';

    const response = await request(app)
      .post('/api/auth')
      .send({ username, password });

    expect(response.body.ok).toBe(false);
    expect(response.body.message).toBe(`El usuario "${username} no existe."`);
  });
});
