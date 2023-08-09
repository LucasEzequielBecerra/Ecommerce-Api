import { fakerES as faker } from "@faker-js/faker";

export const generateUser = () => {
    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        password: 1234,
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 80 }),
        image: faker.image.url(),
        role: 'user'
    };
}