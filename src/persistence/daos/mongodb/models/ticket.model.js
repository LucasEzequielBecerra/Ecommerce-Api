import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
    code: { type: String, required: true },
    purchase_datetime: { type: Date, required: true },
    cart: { type: Schema.Types.ObjectId, ref: 'carts' },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true }
})

export const TicketModel = model('tickets', ticketSchema);