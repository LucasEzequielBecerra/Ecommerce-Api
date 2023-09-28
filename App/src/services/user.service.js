import UserRepository from "../persistence/daos/repository/user.repository.js";
const userDao = new UserRepository();

export const getUserByIdService = async (id) => {
    try {
        const user = await userDao.getUserById(id)
        return user
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getUserByEmailService = async (email) => {
    try {
        const user = await userDao.getUserByEmail(email)
        return user

    } catch (error) {
        throw new Error(error.message)
    }
}

export const createUserService = async (user) => {
    try {
        const newUser = await userManager.createUser(user)
        return newUser
    } catch (error) {
        throw new Error(error.message)
    }
}

export const logoutUserService = async (user) => {
    try {
        await userDao.logoutUser(user)
    } catch (error) {
        throw new Error(error.message)
    }
}
export const getUsersService = async () => {
    try {
        const users = await userDao.getUsers();
        return users
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteDisconnectedUsersService = async () => {
    try {
        const res = await userDao.deleteDisconnectedUsers()
        return res
    } catch (error) {
        throw new Error(error.message)
    }
}

export const restorePasswordService = async (email, password) => {
    try {
        const user = await userDao.restorePassword(email, password)
        return user
    } catch (error) {
        throw new Error(error.message)
    }
}

export const uploadDocumentsService = async (uid, file) => {
    try {
        const user = await userDao.uploadDocuments(uid, file)
        return user
    } catch (error) {
        throw new Error(error.message)
    }
}

export const changeRoleService = async (uid) => {
    try {
        const user = await userDao.changeRole(uid)
        return user
    } catch (error) {
        throw new Error(error.message)
    }
}