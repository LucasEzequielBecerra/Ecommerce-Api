import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { fakerES as faker } from "@faker-js/faker";

const requester = supertest('localhost:8080')

const user = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 80 }),
    password: 1234,
};

const userReal = {
    email: 'lucas@gmail.com',
    password: '1234'
}

console.log('nice')

describe('Tests integrales de app E-commerce', () => {

    it('[POST] /api/users/register', async () => {
        const response = await requester.post('/api/users/register').send(user)

        console.log(response)
        //     const id = response.body._id;
        //     const statusCode = response.statusCode

        //     expect(id).toBeDefined();
        //     // expect(response.body).toHaveProperty('_id');
        //     expect(statusCode).not.toBe(404);
        //     expect(statusCode).toBe(200);
        // })

        // test('[POST] /api/users/login', async () => {
        //     const response = (await request(app).post('/api/users/login')).send(userReal)
        //     console.log(response)
    })
})
