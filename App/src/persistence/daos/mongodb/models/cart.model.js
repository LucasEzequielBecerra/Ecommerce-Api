import mongoose from 'mongoose';

const cartsSchema = new mongoose.Schema({
    products: [
        { type: mongoose.Schema.Types.Mixed, required: true, ref: 'products', default: {}, quantity: { type: Number, default: 1 } }
    ],
})

// cartsSchema.pre('find', function () {
//     this.populate('products')
// })

export const CartModel = mongoose.model('carts', cartsSchema)