const mongoose=require("mongoose")

const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://ali:KlszuRURScn3OH4i@cluster0.vsnoq.mongodb.net/devTinder")
}

module.exports=connectDB;
