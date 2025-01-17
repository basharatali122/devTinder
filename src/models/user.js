const mongoose = require("mongoose");
const validator= require("validator");
const jwt = require("jsonwebtoken")
const bcrypt =require("bcrypt")
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

            enum:{
                values:["male","female","other"],
                message:`{VALUE} is not supported`
            }

            // validate(value){
            //     if(!["male","female","others"].includes(value)){
            //         throw new Error ("gender data is not valid")
            //     }
            // }
        }
        , 
        photoUrl:{
            type:String,
            default:"https://akshaysaini.in/img/akshay.jpg",
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

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await  jwt.sign({ _id: user._id }, "DEV@Tinder790", {
        expiresIn: "1d",
      });
      return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){

    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;
}
module.exports=mongoose.model("User",userSchema);