import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    code: { type: String, required: true },
    purchase_datetime: { type: Date, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true }
})

export const TicketModel = mongoose.model('tickets', ticketSchema);