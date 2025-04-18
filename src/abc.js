
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
