import { userModel } from "./models/user.model.js";
import * as utils from '../../utils.js'

export default class UserDao {
    async createUser(user) {
        try {
            const { email, password } = user;
            const existUser = await userModel.find({ email });
            if (existUser.length === 0) {
                const newUser = await userModel.create({ ...user, password: utils.createHash(password) });
                return newUser
            } else {
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
            const userExist = await userModel.findOne({ email });
            const userIsValidPassword = utils.isValidPassword(userExist, password)
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
            const user = await userModel.findOne({ email })
            if (user) return user
            else return false
        } catch (error) {
            console.log(error)
        }
    }

    async getUserById(id) {
        try {
            const userExist = await userModel.findById(id)
            if (userExist) {
                return userExist
            } return false
        } catch (error) {
            console.log(error)
        }
    }
}