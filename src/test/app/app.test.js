import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../server'
import { fakerES as faker } from "@faker-js/faker";





const user = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 80 }),
    password: '1234',
};
console.log('este es el mail de faker ---->', user.email)

const userReal = {
    email: "lucas132@gmail.com",
    password: "1234"
}


describe('Tests de app E-commerce', () => {

    beforeEach(async () => {
        mongoose.connection.collections['users']
    })

    test('[POST] /api/users/register', async () => {
        let response = await request(app).post('/api/users/register').send(user)
        response = response.body
        expect(response).to.be.property('status')
        console.log(response)
    })
    //     const id = response.body._id;
    //     const statusCode = response.statusCode

    //     expect(id).toBeDefined();
    //     // expect(response.body).toHaveProperty('_id');
    //     expect(statusCode).not.toBe(404);
    //     expect(statusCode).toBe(200);
    // })

    test('[POST] /api/users/login', async () => {
        const response = await request(app).post('/api/users/login').send(userReal)
        console.log(response)
    })
})
