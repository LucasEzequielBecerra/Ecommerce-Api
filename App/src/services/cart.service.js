import CartRepository from "../persistence/daos/repository/cart.repository.js";
const cartDaoMongo = new CartRepository()

export const createCartService = async () => {
    try {
        const newCart = await cartDaoMongo.createCart()
        return newCart
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getCartByIdService = async (cartId) => {
    try {
        const doc = await cartDaoMongo.getCartById(cartId)
        return doc
    } catch (error) {
        throw new Error(error.message)
    }
}

export const addProductToCartService = async (cid, pid, quantity, uid) => {
    try {
        const newCart = await cartDaoMongo.addProductToCart(cid, pid, quantity, uid);
        return newCart
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteProductToCartService = async (cid, pid, quantity) => {
    try {
        const newCart = await cartDaoMongo.deleteProductToCart(cid, pid, quantity)
        return newCart
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteAllProductsToCartService = async (cid) => {
    try {
        const newCart = await cartDaoMongo.deleteAllProductsToCart(cid)
        return newCart
    } catch (error) {
        throw new Error(error.message)
    }
}

export const purchaseProductsService = async (cid) => {
    try {
        const products = await cartDaoMongo.purchaseProducts(cid)
        return products
    } catch (error) {
        throw new Error(error.message)
    }
}
