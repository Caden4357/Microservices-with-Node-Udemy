import request from 'supertest';
import { app } from '../../app';

it('retruns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            "email": "test@aol.com",
            "password": "password"
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            "email": "sdsfs",
            "password": "password"
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            "email": "sdsfs",
            "password": "asd"
        })
        .expect(400);
});

// when writing tests you could either await or return your requests, it doesnt matter. If your doing multiple tests in one it() like below you must await all but last or you can just await all doesnt matter
it('returns a 400 with missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            "email": "test@aol.com"
        })
        .expect(400);
    return request(app)
        .post('/api/users/signup')
        .send({
            "password": "password"
        })
        .expect(400);
});

it('dissallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            "email": "test@aol.com",
            "password": "password"
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            "email": "test@aol.com",
            "password": "password"
        })
        .expect(400);
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app) // same response object we get inside a normal request 
        .post('/api/users/signup')
        .send({
            email: "test@aol.com",
            password: "password"
        })
        .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();
})