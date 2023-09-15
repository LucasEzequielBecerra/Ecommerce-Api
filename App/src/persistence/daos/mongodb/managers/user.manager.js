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

    async restorePassword(email, password) {
        try {
            const user = await UserModel.findOne({ email })
            if (user.password === password) throw new Error('the password has already been')
            user.password = utils.createHash(password)
            user.save()
            return user
        } catch (error) {
            console.log(error)
        }
    }


    async loginUser(user) {
        try {
            const { email, password } = user;
            const userExist = await UserModel.findOne({ email });
            const userIsValidPassword = userExist && utils.isValidPassword(userExist, password)
            if (userIsValidPassword) {
                const actualTime = new Date()
                const connectionTime = actualTime.getHours() + ':' + actualTime.getMinutes() + ':' + actualTime.getSeconds()
                userExist.last_connection = connectionTime
                userExist.save()
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
            if (!user) return false
            else return user
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

    async changeRole(uid) {
        try {
            const user = await UserModel.findById(uid)
            if (!user) throw new Error(`User ${uid} does not exist`)
            const documents = user.documents.map((doc) => doc.reference)
            console.log(documents)
            const docOk = documents.includes('identificacion')
                && documents.includes('comprobante de domicilio')
                && documents.includes('comprobante de estado de cuenta')
            if (user.role === 'user' && docOk) {
                user.role = 'premium'
            }
            else if (!docOk) throw new Error('the all files are not charged ')
            else if (user.role === 'premium') user.role = 'user'
            user.save()
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async uploadDocuments(uid, file) {
        try {
            const user = await UserModel.findById(uid)
            if (!user) throw new Error(`User ${uid} does not exist`)
            console.log(file)
            user.documents.push(...file)
            user.save()
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async logoutUser(user) {
        try {
            const userExist = await UserModel.findById(user)
            const actualTime = new Date()
            const connectionTime = actualTime.getHours() + ':' + actualTime.getMinutes() + ':' + actualTime.getSeconds()
            userExist.last_connection = connectionTime
            userExist.save()
        } catch (error) {
            console.log(error)
        }
    }
}