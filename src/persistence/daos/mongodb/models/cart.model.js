import mongoose from 'mongoose';

const cartsSchema = new mongoose.Schema({
    products: [
        {
            _id: false,
            pid: { type: mongoose.Schema.Types.Mixed, required: true, ref: 'products' },
            quantity: { type: Number },
            price: { type: Number }
        }
    ],
    total: { type: Number, required: true, default: 0 }
})

// cartsSchema.pre('find', function () {
//     this.populate('products')
// })

export const CartModel = mongoose.model('carts', cartsSchema)