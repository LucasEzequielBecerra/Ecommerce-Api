import factory from "../../factory.js";
const { userManager } = factory
import UserResponseDTO from "../../dtos/user/user.response.dto.js";

export default class UserRepository {

    async getUserById(id) {
        try {
            const user = await userManager.getUserById(id)
            const userDTO = new UserResponseDTO(user)
            return userDTO
        } catch (error) {
            console.log(error)
        }
    }
    async getUserByEmail(email) {
        try {
            const user = await userManager.getUserByEmail(email)
            // const userDTO = new UserResponseDTO(user)
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async loginUser(user) {
        try {
            const userExist = await userManager.loginUser(user)
            return userExist
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async createUser(user) {
        try {
            const newUser = await userManager.createUser(user)
            return newUser
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

}