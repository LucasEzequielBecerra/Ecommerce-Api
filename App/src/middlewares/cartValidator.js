export const cartValidator = (req, res, next) => {
    const { cid } = req.params
    if (req.session.passport.user.cartId === cid) next()
    else throw new Error('this cart is not your')
}