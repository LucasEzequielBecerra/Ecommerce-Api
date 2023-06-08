import ProductsDaoMongoDB from "../daos/mongodb/products.dao.js"
const productDaoMongo = new ProductsDaoMongoDB();

export const addProductService = async (obj) => {
    try {
        const newProd = await productDaoMongo.addProduct(obj)
        if (!newProd) throw new Error('validation Error');
        else return { message: 'Product saved successfully' }
    } catch (error) {
        console.log(error)
    }
}

export const getAllProductsService = async (page, limit) => {
    try {
        const docs = await productDaoMongo.getAllProducts(page, limit)
        return docs
    } catch (error) {
        console.log(error)
    }
}


// export const addProductsToCart = async (cartId, productId) => {
//     try {
//         const exists = await productDaoMongo.getProductById(productId)
//         const newProduct = await productDaoMongo.addProductsToCart(cartId, productId)
//         if (!exists)
//             throw new Error('product not found')
//         else return newProduct
//     } catch (error) {
//         console.log(error)
//     }
// }


// export const getByIdService = async (id) => {
//     try {
//         const doc = await productDaoMongo.getProductById(id)
//         if (!doc) throw new Error('Product not found');
//         else return doc
//     } catch (error) {
//         console.log(error)
//     }
// }

// export const updateService = async (id, obj) => {
//     try {
//         const doc = await productDaoMongo.getProductById(id)
//         if (!doc) {
//             throw new Error('Product not found');
//         } else {
//             const prodUpd = await productDaoMongo.updateProduct(id, obj)
//             return prodUpd
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
// export const deleteByIdService = async (id) => {
//     try {
//         const prodDel = await productDaoMongo.deleteProductById(id)
//         return prodDel
//     } catch (error) {
//         console.log(error)
//     }
// }
// export const deleteAllService = async () => {
//     try {
//         await productDaoMongo.deleteAllProducts()
//     } catch (error) {
//         console.log(error)
//     }
// }