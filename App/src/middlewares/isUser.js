import factory from "../persistence/factory.js"
const { userManager } = factory

export const isUser = async (req, res, next) => {
    const user = await userManager.getUserById(req.session.passport.user)
    if (user.role == 'user') next()
    else res.status(401).json({ msg: 'your role is not correct' });
}