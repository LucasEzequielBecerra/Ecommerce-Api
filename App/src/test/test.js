import { describe, test } from 'node:test';
import assert from 'node:assert';

const doc = {
    name: "rosamonte",
    description: "yerba",
    price: 300,
    stock: 30
}
const user = {
    email: "lucas@gmail.com",
    password: "1234"
}

const createUsersMock = async () => {
    let cant = 50
    let usersArray = []
    for (let i = 0; i < cant; i++) {
        const user = generateUser();
        usersArray.push(user);
    }
    return usersArray
};


const apiURL = 'http://localhost:8080/api/';
// console.log(apiURL + 'products')

describe('Tests API products', () => {
    test('[GET] /products', async () => {
        const responseLogin = await fetch(`${apiURL}users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        const responsePost = await responseLogin.json();
        console.log(responsePost); /* -----> Mensaje de bienvenida y loggeo con exito */
        const response = await fetch(`${apiURL}products`);
        const responseGet = await response.json();
        console.log(responseGet) /* ---> Dice que la sesion esta expirada */
        // assert.strictEqual(Array.isArray(responseGet.payload), true);
        // assert.equal(responseGet.payload.length === 0, true);

        // const response2 = await fetch(apiURL, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(doc)
        // });
        // const responsePost = await response2.json();
        // assert.ok(responsePost, '_id');
        // const statusCode = response2.status;
        // assert.equal(statusCode, 200);

        // const response3 = await fetch(apiURL);
        // const responseGet2 = await response3.json();
        // assert.equal(responseGet2.length, 1);
    })

    // test('[POST] /news', async () => {
    //     await fetch(apiURL, { method: 'DELETE' });
    //     const response = await fetch(apiURL, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(doc)
    //     });
    //     const responsePost = await response.json();
    //     assert.ok(responsePost, '_id');
    //     const statusCode = response.status;
    //     assert.equal(statusCode, 200);
    //     const id = responsePost._id;
    //     assert.equal(typeof id, 'string');


    // })

    // // await fetch(`${apiURL}/${id}`, {method: 'DELETE'});

})
