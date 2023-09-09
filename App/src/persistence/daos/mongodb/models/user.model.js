import mongoose, { Schema } from "mongoose";

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
        default: 0,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user'
    },
    isGithubUser: {
        type: Boolean,
        default: false,
        required: true
    },
    cartId: { type: Schema.Types.ObjectId, ref: 'carts' },
    documents: [
        {
            name: { type: String },
            reference: { type: String }
        }
    ],
    last_connection: { type: Date }
})

export const UserModel = mongoose.model('Users', usersSchema)