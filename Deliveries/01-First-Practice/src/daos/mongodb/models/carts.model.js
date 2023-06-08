import mongoose from 'mongoose';

const cartProductsSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    quantity: { type: Number, default: 1 }
})
const cartsSchema = new mongoose.Schema({
    products: [cartProductsSchema]
})

cartsSchema.pre('find', function () {
    this.populate('products.product')
})

export const CartsModel = mongoose.model('carts', cartsSchema)