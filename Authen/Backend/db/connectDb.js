import mongoose from 'mongoose'

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("Error connection to MongoDb:  ", error.message)
        process.exit(1) // 1 is failure, 0 status code is sucess

        
    }
}