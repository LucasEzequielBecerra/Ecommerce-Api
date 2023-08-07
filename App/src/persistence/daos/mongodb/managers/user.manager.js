import * as utils from '../../../../utils.js'
import { UserModel } from '../models/user.model.js';
import { CartModel } from '../models/cart.model.js';

export default class UserManagerMongo {

    async createUser(user) {
        try {
            const { email, password } = user;
            const existUser = await UserModel.find({ email });
            if (existUser.length === 0) {
                const newCart = email === 'lucas@gmail.com' ? null : await CartModel.create({})
                const newUser = await UserModel.create({ ...user, password: utils.createHash(password), role: email === 'lucas@gmail.com' ? 'admin' : 'user', cartId: email === 'lucas@gmail.com' ? null : newCart });
                return newUser
            } else {
                console.log('nashe')
                return null;
            }
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async loginUser(user) {
        try {
            const { email, password } = user;
            const userExist = await UserModel.findOne({ email });
            const userIsValidPassword = userExist && utils.isValidPassword(userExist, password)
            if (userIsValidPassword) {
                return userExist
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await UserModel.findOne({ email })
            // console.log('mng', user)
            if (user) return user
            else return false
        } catch (error) {
            console.log(error)
        }
    }

    async getUserById(id) {
        try {
            const userExist = await UserModel.findById(id)
            if (userExist) return userExist
            else return false
        } catch (error) {
            console.log(error)
        }
    }
}