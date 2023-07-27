import mongoose from "mongoose";
import config from "../../../../config.js"

const connectionString = config.MONGODB_URL_STRING_CONNECTION
export const initMongoDb = async () => {
    try {
        await mongoose.connect(connectionString)
        console.log('connection established on Mongoose')
    } catch (error) {
        console.log(error)
    }
}