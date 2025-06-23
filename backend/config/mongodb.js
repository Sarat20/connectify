import mongoose from 'mongoose'
const connectDb=async()=>{

    mongoose.connection.on('connected',()=>{
        console.log('connected to mongodb')
    })

       
   await mongoose.connect(`${process.env.MONGODB_URI}/farmly`)
}
export default connectDb