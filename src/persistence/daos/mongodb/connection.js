import mongoose from "mongoose";
import config from "../../../../config.js"

const connectionString = config.MONGODB_URL_STRING_CONNECTION
// const connectionStringTest = config.MONGODB_TEST_URL_STRING_CONNECTION
export const initMongoDb = async () => {
    try {
        await mongoose.connect(connectionString)
        console.log('connection established on Mongoose')
    } catch (error) {
        console.log(error)
    }
}
// export const initMongoDbTest = async () => {
//     try {
//         await mongoose.connect(connectionStringTest)
//         console.log('connection established on Mongoose TEST')
//     } catch (error) {
//         console.log(error)
//     }
// }