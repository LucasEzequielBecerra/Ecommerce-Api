import factory from "../persistence/factory.js"
const { userManager } = factory

export const isUser = async (req, res, next) => {
    const user = await userManager.getUserById(req.session.passport.user)
    if (user.role === 'user') next()
    else res.status(401).json({ msg: 'your role is not correct' });
}
export const isAdmin = async (req, res, next) => {
    const user = await userManager.getUserById(req.session.passport.user)
    if (user.role === 'admin') next()
    else res.status(401).json({ msg: 'your are not authorized ' });
}

export const isPremium = async (req, res, next) => {
    const user = await userManager.getUserById(req.session.passport.user)
    if (user.role === 'premium' || user.role === 'admin') next()
    else res.status(401).json({ msg: 'your are not authorized ' });
}

export const cartValidator = async (req, res, next) => {
    const { cid } = req.params
    const user = await userManager.getUserById(req.session.passport.user)
    const cartId = user.cartId && user.cartId.toHexString()

    if (cartId === cid || cartId === null) next()
    else res.status(401).json({ msg: `this cart is not your, your cart is ${user.cartId}` })
}