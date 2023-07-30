import CartRepository from "../persistence/daos/repository/cart.repository.js";
const cartDaoMongo = new CartRepository()

export const createCartService = async () => {
    try {
        const newCart = await cartDaoMongo.createCart()
        if (!newCart) throw new Error('Cart already exists')
        else return newCart
    } catch (error) {
        console.log(error)
    }
}

export const addProductToCartService = async (cid, pid, quantity) => {
    try {
        const newCart = await cartDaoMongo.addProductToCart(cid, pid, quantity);
        return newCart
    } catch (error) {
        console.log(error)
    }
}

export const deleteProductToCartService = async (cid, pid) => {
    try {
        const newCart = await cartDaoMongo.deleteProductToCart(cid, pid)
        return newCart
    } catch (error) {
        console.log(error)
    }
}

export const deleteAllProductsToCartService = async (cid) => {
    try {
        const newCart = await cartDaoMongo.deleteAllProductsToCart(cid)
        return newCart
    } catch (error) {
        console.log(error)
    }
}

export const getCartByIdService = async (cartId) => {
    try {
        const doc = await cartDaoMongo.getCartById(cartId)
        if (!doc) throw new Error('Cart not found')
        return doc
    } catch (error) {
        console.log(error)
    }
}

export const getAllCarts = async () => {
    try {
        const docs = await cartDaoMongo.getCarts()
        if (!docs) throw new Error('carts not found')
        else return docs
    } catch (error) {
        console.log(error)
    }
}

export const deleteCartService = async (id) => {
    try {
        const cartDeleted = await cartDaoMongo.deleteCart(id)
        return cartDeleted
    } catch (error) {
        console.log(error);
    }
}

export const purchaseProductsService = async (cid) => {
    try {
        const products = await cartDaoMongo.purchaseProducts(cid)
        return products
    } catch (error) {

    }
}
