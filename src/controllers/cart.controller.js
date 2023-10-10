import * as services from '../services/cart.service.js'
import { HttpResponse } from '../utils/http.response.util.js'
import { logger } from '../utils/logger.util.js'
const httpResponse = new HttpResponse()

export const createCartController = async (req, res, next) => {
    try {
        const newCart = await services.createCartService()
        if (newCart) httpResponse.Ok(res, 'Cart created successfully')
    } catch (error) {
        next(error.message)

    }
}

export const getCartByIdController = async (req, res, next) => {
    try {
        const { cid } = req.params
        const doc = await services.getCartByIdService(cid)
        if (doc) return httpResponse.Ok(res, doc, "Cart found")
        else return httpResponse.NotFound(res, "Cart not found")
    } catch (error) {
        next(error.message);
    }
}

export const addProductToCartController = async (req, res, next) => {
    try {
        const { cid, pid } = req.params
        const uid = req.session.passport.user
        const { quantity = 1 } = req.query
        const newCart = await services.addProductToCartService(cid, pid, Number(quantity), uid)
        if (newCart) return httpResponse.Ok(res, newCart, "Products added to cart")
        else return httpResponse.NotFound(res, 'Product not found')
    } catch (error) {
        next(error.message)
    }
}

export const deleteProductToCartController = async (req, res, next) => {
    try {
        const { cid, pid } = req.params
        const { quantity } = req.query
        const newCart = await services.deleteProductToCartService(cid, pid, Number(quantity))
        if (newCart) return httpResponse.Ok(res, newCart, "Product deleted from cart")
        else return httpResponse.NotFound(res, 'Product not found')
    } catch (error) {
        next(error.message)
    }
}

export const deleteAllProductsToCartController = async (req, res, next) => {
    try {
        const { cid } = req.params
        const newCart = await services.deleteAllProductsToCartService(cid)
        if (newCart) return httpResponse.Ok(res, newCart, 'All products has been deleted to cart')
        else return httpResponse.NotFound(res, "Products ")
    } catch (error) {
        next(error.message)
    }
}
