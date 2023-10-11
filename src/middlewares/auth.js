import factory from "../persistence/factory.js"
import { HttpResponse } from "../utils/http.response.util.js"
const httpResponse = new HttpResponse()
const { userManager } = factory


export const isUser = async (req, res, next) => {
    const user = await userManager.getUserById(req.session.passport?.user)
    if (user.role === 'user') next()
    else httpResponse.Unauthorized(res, 'your role is not correct')
}
export const isAdmin = async (req, res, next) => {
    const user = await userManager.getUserById(req.session.passport?.user)
    if (user.role === 'admin') next()
    else httpResponse.Unauthorized(res, 'your role is not correct')
}

export const isPremium = async (req, res, next) => {
    const user = await userManager.getUserById(req.session.passport?.user)
    if (user.role === 'premium' || user.role === 'admin') next()
    else httpResponse.Unauthorized(res, 'your role is not correct')
}

export const cartValidator = async (req, res, next) => {
    const { cid } = req.params
    const user = await userManager.getUserById(req.session.passport?.user)
    const cartId = user.cartId && user.cartId.toHexString()

    if (cartId === cid) next()
    else httpResponse.Unauthorized(res, `this cart is not your, your cart is ${user.cartId}`)
}