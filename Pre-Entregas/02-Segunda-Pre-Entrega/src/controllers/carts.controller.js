import * as service from '../services/carts.service.js'

export const createCartController = async (req, res, next) => {
    try {
        const newCart = await service.createCartService()
        if (!newCart) throw new Error('validation error')
        else res.json(newCart)
    } catch (error) {
        next(error)
    }
}

export const addProductToCartController = async (req, res, next) => {
    try {
        const { cid } = req.params
        // console.log(cid)
        const { pid } = req.params
        // console.log(pid)
        const { quantity } = req.body
        console.log(quantity)
        const newProduct = await service.addProductToCartService(cid, pid, quantity)
        // if (!newProduct) throw new Error('validation error')
        // console.log('ok en controller', newProduct)
        res.json(newProduct)
    } catch (error) {
        next(error)
    }
}

export const deleteProductToCartController = async (req, res, next) => {
    try {
        const { cid, pid } = req.params
        const newCart = await service.deleteProductToCartService(cid, pid)
        res.json(newCart)
    } catch (error) {
        next(error)
    }
}

export const deleteAllProductsToCartController = async (req, res, next) => {
    try {
        const { cid } = req.params
        const newCart = await service.deleteAllProductsToCartService(cid)
        res.json(newCart)
    } catch (error) {
        next(error)
    }
}

export const getCartByIdController = async (req, res, next) => {
    try {
        const { cid } = req.params
        const doc = await service.getCartByIdService(cid)
        // console.log(doc)
        res.json(doc);
    } catch (error) {
        next(error);
    }
}

// export const getAllCartsController = async (req, res, next) => {
//     try {
//         const docs = await service.getAllCarts()
//         res.json(docs);
//     } catch (error) {
//         next(error);
//     }
// }



// export const deleteController = async (req, res, next) => {
//     try {
//         const { id } = req.params
//         await service.deleteCartService(id)
//         res.json({ msg: 'cart deleted successfully' })
//     } catch (error) {
//         next(error)
//     }
// }
