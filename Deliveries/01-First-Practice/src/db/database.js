import mongoose from "mongoose";

const connectionString = 'mongodb+srv://Becerra:Lucasbecerra.1@cluster0.2eff3zo.mongodb.net/Backend?retryWrites=true&w=majority'

try {
    await mongoose.connect(connectionString)
    console.log('connection established on Mongoose')
} catch (error) {
    console.log(error)
}