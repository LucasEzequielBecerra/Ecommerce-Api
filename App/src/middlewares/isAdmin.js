import factory from "../persistence/factory.js"
const { userManager } = factory

export const isAdmin = async (req, res, next) => {
    const user = await userManager.getUserById(req.session.passport.user)
    if (user.role == 'admin') next()
    else res.status(401).json({ msg: 'your are not authorized ' });
}