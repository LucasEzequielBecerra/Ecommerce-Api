import CartsDaoMongoDB from "../daos/mongodb/cart.dao.js";
const cartDaoMongo = new CartsDaoMongoDB()

export const getAllCartsService = async () => {
    try {
        const doc = await cartDaoMongo.createCart()
        const docs = await cartDaoMongo.getCarts()
        return docs
    } catch (error) {
        console.log(error)
    }
}

export const getCartByIdService = async (cartId) => {
    try {
        const doc = await cartDaoMongo.getCartById(cartId)
        return doc
    } catch (error) {
        console.log(error)
    }
}

export const addProductsToCartService = async (cartId, productId) => {
    try {
        const doc = await cartDaoMongo.addProductsToCart(cartId, productId)
        return doc
    } catch (error) {
        console.log(error)
    }
}