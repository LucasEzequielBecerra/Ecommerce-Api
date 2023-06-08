import * as service from '../services/carts.service.js'

export const createCartController = async (req, res, next) => {
    try {
        const cart = { ...req.body }
        const newCart = await service.createCart(cart)
        if (!newCart) throw new Error('validation error')
        else res.json(newCart)
    } catch (error) {
        next(error)
    }
}

export const getAllCartsController = async (req, res, next) => {
    try {
        const docs = await service.getAllCarts()
        res.json(docs);
    } catch (error) {
        next(error);
    }
}

export const getCartByIdController = async (req, res, next) => {
    try {
        const { cartid } = req.params
        const doc = await service.getCartByIdService(cartid)
        res.json(doc);
    } catch (error) {
        next(error);
    }
}

export const deleteController = async (req, res, next) => {
    try {
        const { id } = req.params
        await service.deleteCartService(id)
        res.json({ msg: 'cart deleted successfully' })
    } catch (error) {
        next(error)
    }
}
