import request from 'supertest';
import app from '../../app';

test('returns status code 200 and my details on hitting base route', async () => {
  const response = await request(app)
    .get('/')
    .expect('Content-Type', /json/)
    .expect(200);

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

test('returns status code 400 and appropriate response data if rule field is not provided', async () => {
  const response = await request(app)
    .post('/validate-rule')
    .send({
      data: {
        name: 'James Holden',
        crew: 'Rocinante',
        age: 34,
        position: 'Captain',
        missions: 45
      }
    })
    .expect('Content-Type', /json/)
    .expect(400);

  expect(response.body).toHaveProperty('message', 'rule is required.');
  expect(response.body).toHaveProperty('status', 'error');
  expect(response.body.data).toBeNull();
});

test('returns status code 400 and appropriate response data if data field is not provided', async () => {
  const response = await request(app)
    .post('/validate-rule')
    .send({
      rule: {
        field: 'missions',
        condition: 'gte',
        condition_value: 30
      }
    })
    .expect('Content-Type', /json/)
    .expect(400);

  expect(response.body).toHaveProperty('message', 'data is required.');
  expect(response.body).toHaveProperty('status', 'error');
  expect(response.body.data).toBeNull();
});

test('returns status code 400 and appropriate response data if rule.field field is not provided', async () => {
  const response = await request(app)
    .post('/validate-rule')
    .send({
      rule: {
        condition: 'gte',
        condition_value: 30
      },
      data: {
        name: 'James Holden',
        crew: 'Rocinante',
        age: 34,
        position: 'Captain',
        missions: 45
      }
    })
    .expect('Content-Type', /json/)
    .expect(400);

  expect(response.body).toHaveProperty('message', 'rule.field is required.');
  expect(response.body).toHaveProperty('status', 'error');
  expect(response.body.data).toBeNull();
});

test('returns status code 400 and appropriate response data if rule.condition field is not provided', async () => {
  const response = await request(app)
    .post('/validate-rule')
    .send({
      rule: {
        field: 'missions',
        condition_value: 30
      },
      data: {
        name: 'James Holden',
        crew: 'Rocinante',
        age: 34,
        position: 'Captain',
        missions: 45
      }
    })
    .expect('Content-Type', /json/)
    .expect(400);

  expect(response.body).toHaveProperty(
    'message',
    'rule.condition is required.'
  );
  expect(response.body).toHaveProperty('status', 'error');
  expect(response.body.data).toBeNull();
});

test('returns status code 400 and appropriate response data if rule.condition_value field is not provided', async () => {
  const response = await request(app)
    .post('/validate-rule')
    .send({
      rule: {
        field: 'missions',
        condition: 'gte'
      },
      data: {
        name: 'James Holden',
        crew: 'Rocinante',
        age: 34,
        position: 'Captain',
        missions: 45
      }
    })
    .expect('Content-Type', /json/)
    .expect(400);

  expect(response.body).toHaveProperty(
    'message',
    'rule.condition_value is required.'
  );
  expect(response.body).toHaveProperty('status', 'error');
  expect(response.body.data).toBeNull();
});

test('returns status code 400 and appropriate response data if rule field is of a wrong type', async () => {
  const response = await request(app)
    .post('/validate-rule')
    .send({
      rule: 22,
      data: {
        name: 'James Holden',
        crew: 'Rocinante',
        age: 34,
        position: 'Captain',
        missions: 45
      }
    })
    .expect('Content-Type', /json/)
    .expect(400);

  expect(response.body).toHaveProperty('message', 'rule should be an object.');
  expect(response.body).toHaveProperty('status', 'error');
  expect(response.body.data).toBeNull();
});

test('returns status code 400 and appropriate response data if data field is of a wrong type', async () => {
  const response = await request(app)
    .post('/validate-rule')
    .send({
      rule: {
        field: 'missions',
        condition: 'gte',
        condition_value: 30
      },
      data: true
    })
    .expect('Content-Type', /json/)
    .expect(400);

  expect(response.body).toHaveProperty(
    'message',
    'data should be an object, array or string.'
  );
  expect(response.body).toHaveProperty('status', 'error');
  expect(response.body.data).toBeNull();
});

test('returns status code 400 and appropriate response data if rule.field field is of a wrong type', async () => {
  const response = await request(app)
    .post('/validate-rule')
    .send({
      rule: {
        field: 23,
        condition: 'gte',
        condition_value: 30
      },
      data: {
        name: 'James Holden',
        crew: 'Rocinante',
        age: 34,
        position: 'Captain',
        missions: 45
      }
    })
    .expect('Content-Type', /json/)
    .expect(400);

  expect(response.body).toHaveProperty(
    'message',
    'rule.field should be a string.'
  );
  expect(response.body).toHaveProperty('status', 'error');
  expect(response.body.data).toBeNull();
});

test('returns status code 400 and appropriate response data if rule.condition field is of a wrong type', async () => {
  const response = await request(app)
    .post('/validate-rule')
    .send({
      rule: {
        field: 'missions',
        condition: 22,
        condition_value: 30
      },
      data: {
        name: 'James Holden',
        crew: 'Rocinante',
        age: 34,
        position: 'Captain',
        missions: 45
      }
    })
    .expect('Content-Type', /json/)
    .expect(400);

  expect(response.body).toHaveProperty(
    'message',
    'rule.condition should be a string.'
  );
  expect(response.body).toHaveProperty('status', 'error');
  expect(response.body.data).toBeNull();
});

test('returns status code 400 and appropriate response data if rule.condition_value field is of a wrong type', async () => {
  const response = await request(app)
    .post('/validate-rule')
    .send({
      rule: {
        field: 'missions',
        condition: 'gte',
        condition_value: false
      },
      data: {
        name: 'James Holden',
        crew: 'Rocinante',
        age: 34,
        position: 'Captain',
        missions: 45
      }
    })
    .expect('Content-Type', /json/)
    .expect(400);

  expect(response.body).toHaveProperty(
    'message',
    'rule.condition_value should be a string or number.'
  );
  expect(response.body).toHaveProperty('status', 'error');
  expect(response.body.data).toBeNull();
});
