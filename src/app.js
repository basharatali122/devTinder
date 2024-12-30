const express = require("express");
const connectDB = require("./config/database");
const app = express();

const User = require("./models/user")
app.post("/signup", async (req,res)=>{

const user = new User({
    firstName:"Basharat",
    lastName:"Ali",
    emailId:"basharat62200150@gmail.com",
    password:"ali2443",

})

try{
    await user.save();
res.send("user added to the database successfuly")
}
catch (err){
res.status(400).send("Error saving the user",err.message)
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


