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
        const { pid } = req.params
        const { quantity } = req.body
        console.log(quantity)
        const newProduct = await service.addProductToCartService(cid, pid, quantity)
        res.json(newProduct)
    } catch (error) {
        next(error)
    }
}

export const deleteProductToCartController = async (req, res, next) => {
    try {
        const { cid, pid } = req.params
        const newCart = await service.deleteProductToCartService(cid, pid)
        console.log(newCart)
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
        // console.log(docrs)
        res.render('carts', { doc });
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
