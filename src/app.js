const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { SchemaTypeOptions } = require("mongoose");
const user = require("./models/user");

app.use(express.json())
app.post("/signup", async (req,res)=>{
    console.log(req.body)

const user = new User(req.body)




try{
    await user.save();
res.send("user added to the database successfuly")
}
catch (err){
    res.status(400).send(`Error saving the user: ${err.message}`);

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

app.patch("/update",async(req,res)=>{
    const userId = req.body.userId;
    const data=req.body;


    try{
       const user = await User.findOneAndUpdate({_id:userId},data,{returnDocument:'before',
        runValidators:true,
         });
         console.log(user)
        
        res.send("data updated succcessfully");
    }
    catch (err){
        res.status(400).send("something went wrong");
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


