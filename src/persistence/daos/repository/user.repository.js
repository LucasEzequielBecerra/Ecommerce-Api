import factory from "../../factory.js";
const { userManager } = factory
import UserResponseDTO from "../../dtos/user/user.response.dto.js";

export default class UserRepository {

    async getUserById(id) {
        try {
            const user = await userManager.getUserById(id)
            if (!user) return false
            const userDTO = new UserResponseDTO(user)
            return userDTO
        } catch (error) {
            throw new Error(error.message)
        }
    }
    async getUserByEmail(email) {
        try {
            const user = await userManager.getUserByEmail(email)
            if (!user) return false
            const userDTO = new UserResponseDTO(user)
            return userDTO
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createUser(user) {
        try {
            const newUser = await userManager.createUser(user)
            return newUser
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async loginUser(user) {
        try {
            const userExist = await userManager.loginUser(user)
            console.log(userExist)
            if (!userExist) return false
            else return userExist
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async logoutUser(user) {
        try {
            await userManager.logoutUser(user)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getUsers() {
        try {
            const users = await userManager.getUsers()
            return users
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteDisconnectedUsers() {
        try {
            const res = await userManager.deleteDisconnectedUsers()
            return res
        } catch (error) {
            throw new Error(error.message)
        }
    }


    async restorePassword(email, password) {
        try {
            const user = await userManager.restorePassword(email, password)
            return user
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async uploadDocuments(uid, file) {
        try {
            const user = await userManager.uploadDocuments(uid, file)
            return user
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async changeRole(uid) {
        try {
            const user = await userManager.changeRole(uid)
            return user
        } catch (error) {
            throw new Error(error.message)
        }
    }
}