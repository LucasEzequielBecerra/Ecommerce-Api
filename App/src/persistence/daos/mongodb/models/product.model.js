import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const ProductsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
})

ProductsSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model('products', ProductsSchema)