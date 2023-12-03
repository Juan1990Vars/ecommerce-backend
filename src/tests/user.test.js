const request = require('supertest');
const app  = require('../app');

let id;
let token;

test('POST /users crea usuario', async () => {
    const body = {
        firstName: 'carmen',
        lastName: 'méxico',
        email: 'car@gmail.com',
        password: 'car123',
        phone: '987654321'
    }
    const res = await request(app).post('/users').send(body)
    console.log(res.body);
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.id).toBeDefined()
});

//El test del post login
test('POST /users/login', async () => {
    const body = {
        email: 'car@gmail.com',
        password: '987654321',
    }
    const res = await request(app).post('/users/login').send(body)
    token = res.body.token;
    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()

});

test('GET /users  trae los usuarios', async() => {
    const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});

test('PUT /users/:id actualiza un usuario', async () => {
    const body = {firstName:'carmen update'};
    const res = await request(app)
        .put(`/users/${id}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test('POST /users/login debe retornar credenciales incorrectas', async () => {
    const body = {
        email: 'incorrecto@gmail.com',
        password: "incorecto123"
    }
    const res = await request(app).post('/users/login').send(body)
    expect(res.status).toBe(401)
})

test('DELETE /users/:id elimina un usuario', async () => { 
    const res =await request(app)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});

 