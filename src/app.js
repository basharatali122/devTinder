const express = require("express");
const connectDB = require("./config/database");
const app = express();

app.use(express.json())
const User = require("./models/user")
app.post("/signup", async (req,res)=>{
    console.log(req.body)

const user = new User(req.body)

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


