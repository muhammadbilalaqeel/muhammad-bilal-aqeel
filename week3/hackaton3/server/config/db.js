const mongoose = require('mongoose');

const connectDB = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI,{
            dbName:'Tea_Ecom'
        })
        console.log(`Mongo DB Connect successfully`)
    } catch (error) {
        console.log(error)
    }
}


module.exports = connectDB