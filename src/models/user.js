const mongoose = require("mongoose");

const userSchema=new mongoose.Schema(
    {
        firstName:{
            type:String,
            required: true,
        },
        lastName:{
            type:String,
        },
        emailId:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        password:{
            type:String,
            required:true,
           minlength:5,
           maxlength:8,
        },
        age:{
            type:Number,
            min:18,
        },
        gender:{
            type:String,
            validate(value){
                if(!["male","female","others"].includes(value)){
                    throw new Error ("gender data is not valid")
                }
            }
        }
        , 
        photoUrl:{
            type:String,
            default:"url is not provided",
        },
        about:{
            type:String,
            default:"this about is empty not provided",  
        },
        skills:{
           type: [String],
        }
    },
    {
        timestamps:true,
    }
   
);

module.exports=mongoose.model("User",userSchema);