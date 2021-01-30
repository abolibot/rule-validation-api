import request from 'supertest';
import app from '../../app';

it('returns status code 200 and my details on hitting base route', async () => {
  const response = await request(app).get('/').expect(200);

  expect(response.body).toHaveProperty('message', 'My Rule-Validation API');
  expect(response.body).toHaveProperty('status', 'success');
  expect(response.body).toHaveProperty('data.name', 'Oluwatobi Alaran');
  expect(response.body).toHaveProperty('data.github', '@abolibot');
  expect(response.body).toHaveProperty(
    'data.email',
    'alarantobiloba@gmail.com'
  );
  expect(response.body).toHaveProperty('data.mobile', '08175520794');
  expect(response.body).toHaveProperty('data.twitter', '@__tobiMac');
});
