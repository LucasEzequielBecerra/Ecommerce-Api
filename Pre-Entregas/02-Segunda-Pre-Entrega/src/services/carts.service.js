import CartsDaoMongoDB from "../daos/mongodb/cart.dao.js";
const cartDaoMongo = new CartsDaoMongoDB()

export const createCart = async (obj) => {
    try {
        const newCart = await cartDaoMongo.createCart(obj);
        console.log('created new cart!!')
        if (!newCart) throw new Error('Cart already exists')
        else return { message: 'cart created successfully' }
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
