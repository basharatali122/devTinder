const express = require("express");

const app = express();


//request handler function
app.get("/user",(req,res)=>{
    res.send("this is user get request to the server")
})
app.post("/user",(req,res)=>{
    res.send("this is post request to the server")
})
app.delete("/user",(req,res)=>{
    res.send("user is deleted")
})
app.put("/user",(req,res)=>{
    res.send("request is updated")
})
app.use("/work/work2",(req,res)=>{
    res.send("this is work 2")
})

app.use("/work",(req,res)=>{
    res.send("welcome to the work ")
})

app.use("/morning",(req,res)=>{
    res.send("happy good morning")
})
app.use("/special",(req,res)=>{
    res.send("you are very special for me")
})
app.use((req,res)=>{
    res.send("hello from the server")
})
app.listen(3000,()=>{
    console.log("server is listning on 3000 port")
});

