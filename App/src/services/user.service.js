import UserRepository from "../persistence/daos/repository/user.repository.js";
const userDao = new UserRepository();

export const getUserByIdService = async (id) => {
    const user = await userDao.getUserById(id)
    return user
}
export const getUserByEmailService = async (email) => {
    const user = await userDao.getUserByEmail(email)
    return user
}

export const restorePasswordService = async (email, password) => {
    const user = await userDao.restorePassword(email, password)
    return user
}

export const changeRoleService = async (uid) => {
    const user = await userDao.changeRole(uid)
    return user
}