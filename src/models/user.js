const mongoose = require("mongoose");
const validator= require("validator");
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
           validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email address"+value)
            }
           }
        },
        password:{
            type:String,
            required:true,
        //    minlength:5,
        //    maxlength:8,
        //    validate(value){
        //     if(!validator.isStrongPassword(value)){
        //         throw new Error("Enter a strong : "+value)
        //     }
        //    }
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
            default:"https://www.imgworlds.com/",
            validate(value){
                if(!validator.isURL(value)){
                    throw new Error("url is not well")
                }
            }
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