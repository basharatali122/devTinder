const mongoose = require("mongoose");

const userSchema=new mongoose.Schema(
    {
        firstName:{
            type:String,
        },
        lastName:{
            type:String,
        },
        emailId:{
            type:String,
        },
        passwrod:{
            type:String,
        },
        age:{
            type:Number,
        },
        gender:{
            type:String,
        }
    }
   
);

module.exports=mongoose.model("User",userSchema);