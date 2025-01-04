const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { SchemaTypeOptions } = require("mongoose");
const user = require("./models/user");

const {validateSignUpdata}=require("./utils/validation")
const bcrypt =require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt =require("jsonwebtoken")
app.use(express.json())
app.use(cookieParser())
app.post("/signup", async (req,res)=>{
try{
    
    //validations

    validateSignUpdata(req)

    //encrypted password

    const {firstName,lastName,password,emailId,skills}=req.body;

    const passwordHash = await bcrypt.hash(password,10)
    console.log(passwordHash)

const user = new User(
    {
        firstName,lastName,password:passwordHash,emailId,skills
    }
)
    await user.save();
res.send("user added to the database successfuly")
}
catch (err){
    res.status(400).send("Error:"+ err.message);
}
})

app.post("/login",async(req,res)=>{
try{
    
const {password,emailId}=req.body;

const user = await User.findOne({emailId:emailId});
if(!user){
    throw new Error("invalid credentials")
}

const isPasswordValid = await bcrypt.compare(password,user.password)
if(isPasswordValid){

    //create jwt token
    const token = await jwt.sign({_id:user._id},"DEV@Tinder790")

    console.log(token)

    // add the token to the cookie and then send the respons to the user
    res.cookie("token",token)
    
    res.send("login successfull")
}
else{
    throw new Error("invalid credentials")
}

}
catch (err){
    res.status(400).send("Error:"+ err.message)
}
})

//profile api
app.get("/profile",async(req,res)=>{
   try{
    const cookies = req.cookies;

    const {token} = cookies;
    //velidate my token
    if(!token){
        throw new Error("Invalid Token")
    }
    const decodeMessage = await jwt.verify(token,"DEV@Tinder790");
    const {_id}=decodeMessage;
    console.log("Logged In user :"+_id);
    const user = await User.findById(_id);
    if(!user){
        throw new Error ("user does not exist")
    }
    console.log(cookies)
    res.send(user)
   }
   catch (err){
    res.status(400).send("Error: "+ err.message)
   }
})

//Get only one user by email
app.get("/oneUser",async(req,res)=>{
    const userEmail =req.body.emailId;
   
    try{
        const oneUser = await User.findOne({emailId:userEmail})
        res.send(oneUser);
    }
    catch(err){
        res.status(400).send("someThing went wrong")
    }
})
//get all users with the same mail
app.get("/getUser", async(req,res)=>{

    const userEmail = req.body.emailId;

    try{
        const user = await User.find({emailId:userEmail})
        if(user.length===0){
            res.status(404).send("user not find")

        }
        else{

            res.send(user)
        }
    }
    catch (err){

        res.status(400).send("Something went wrong")
    }
})

//get all users in the feed
app.get("/feed",async(req,res)=>{
    try{

        const users = await User.find({});
        res.send(users);
    }
    catch(err){

        res.status(404).send("All users are not available")
    }
})

// user delete api by id
app.delete("/user",async(req,res)=>{
    const userId = req.body.userId;

   try{

    const user = await User.findByIdAndDelete(userId )
       //we can also do this in this way
       // const user = await User.findByIdAndDelete({_id:userId})

       res.send("user deleted successfully")
    }
    catch (err){
        res.status(400).send("user is not found")
    }

})

//find one and update model 

app.patch("/update/:userId",async(req,res)=>{
    const userId = req.params?.userId;
    const data=req.body;


    try{
        const ALLOWED_UPDATES =[
          
            "photoUrl",
            "about",
            "gender",
            "age",
            "skills",
        ];
        const isUpdateAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
        );
        if(!isUpdateAllowed){
            throw new Error("update not allowed");
        }
        if(data?.skills.length>10){
            throw new Error("Skills length is greater than 10 it is not allowed")
        }
       const user = await User.findOneAndUpdate({_id:userId},data,{returnDocument:'before',
        runValidators:true,
         });
         console.log(user)
        
        res.send("data updated succcessfully");
    }
    catch (err){
        res.status(400).send("something went wrong:"+err.message);
    }
})


connectDB()
.then(()=>{
    console.log("mongoose connection established")
    // Start Server
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
})
.catch(
    (err)=>{
        console.error("connection  is not established")
    }
)


