import * as utils from '../../../../utils.js'
import { UserModel } from '../models/user.model.js';
import { CartModel } from '../models/cart.model.js';
import { transporter } from '../../../../services/email.service.js';
import config from '../../../../../config.js';

export default class UserManagerMongo {

    async getUserById(id) {
        try {
            const userExist = await UserModel.findById(id)
            if (userExist) return userExist
            else return false
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await UserModel.findOne({ email })
            if (user) return user
            else return false
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createUser(user) {
        try {
            const { email, password } = user;
            const existUser = await UserModel.find({ email });
            if (existUser.length === 0) {
                const newCart = email === 'lucas@gmail.com' ? null : await CartModel.create({})
                const newUser = await UserModel.create({ ...user, password: utils.createHash(password), role: email === 'lucas@gmail.com' ? 'admin' : 'user', cartId: email === 'lucas@gmail.com' ? null : newCart });
                return newUser
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async loginUser(user) {
        try {
            const { email, password } = user;
            const userExist = await UserModel.findOne({ email });
            const userIsValidPassword = userExist && utils.isValidPassword(userExist, password)
            if (userIsValidPassword) {
                userExist.last_connection = new Date().toLocaleString()
                userExist.save()
                return userExist
            } else {
                return false
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async logoutUser(user) {
        try {
            const userExist = await UserModel.findById(user)
            if (userExist) {
                const actualTime = new Date()
                const connectionTime = actualTime.getHours() + ':' + actualTime.getMinutes() + ':' + actualTime.getSeconds()
                userExist.last_connection = connectionTime
                userExist.save()
            } else return false
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getUsers() {
        try {
            const users = await UserModel.find({})
            if (users.length > 0) return false
            else return false
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteDisconnectedUsers() {
        try {
            const actualTime = new Date().getTime()
            const users = await this.getUsers()
            const usersToDelete = users.map((u) => {
                const date_connection = u.last_connection
                const partes = date_connection.split(/[\s,\/:]+/)
                const [dia, mes, anio, hora, minutos, segundos] = partes;
                const fecha = new Date(anio, mes - 1, dia, hora, minutos, segundos);
                const milisegundos = fecha.getTime();
                if (milisegundos + 172800000 < actualTime) {
                    return u._id
                }
            })
            const deletedUsers = users.filter((u) => usersToDelete.includes(u._id))
            if (deletedUsers.length > 0) {
                deletedUsers.forEach(async (u) => {
                    const gmailOptions = {
                        from: config.EMAIL_HOST,
                        to: 'lucaseramos13@gmail.com',
                        subject: 'Cambio de contraseña',
                        html: `<h1>Hola ${u.first_name}, su cuenta ha sido eliminado por inactividad</h1>`
                    }
                    await transporter.sendMail(gmailOptions)
                })
                const usersDeleted = await UserModel.deleteMany({ $or: deletedUsers })
                return `${usersDeleted.deletedCount} users has been deleted`
            }
            else return false
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async restorePassword(email, password) {
        try {
            const user = await UserModel.findOne({ email })
            if (user) {
                if (user.password === password) return 'That password has been used'
                else {
                    user.password = utils.createHash(password)
                    user.save()
                }
                return 'password has been updated'
            } else return false
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async uploadDocuments(uid, file) {
        try {
            const user = await UserModel.findById(uid)
            if (user) {
                user.documents.push(...file)
                user.save()
                return user
            } else return false
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async changeRole(uid) {
        try {
            const user = await UserModel.findById(uid)
            if (user) {
                const documents = user.documents.map((doc) => doc.reference)
                const docOk = documents.includes('identificacion')
                    && documents.includes('comprobante de domicilio')
                    && documents.includes('comprobante de estado de cuenta')
                if (user.role === 'user' && docOk) {
                    user.role = 'premium'
                }
                else if (!docOk) return 'the all files are not charged'
                else if (user.role === 'premium') user.role = 'user'
                user.save()
                return 'your role has been changed'
            } else return false
        } catch (error) {
            throw new Error(error.message)
        }
    }
}