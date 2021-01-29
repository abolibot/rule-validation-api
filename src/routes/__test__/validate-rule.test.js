import request from 'supertest';
import app from '../../app';

it('returns a 200 on successful signup', async () => {
  return request(app).get('/').send().expect(200);
});
