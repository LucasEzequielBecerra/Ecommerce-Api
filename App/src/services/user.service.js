import UserRepository from "../persistence/daos/repository/user.repository.js";
const userDao = new UserRepository();

export const getUserByIdService = async (id) => {
    const user = await userDao.getUserById(id)
    return user
}