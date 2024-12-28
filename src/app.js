const express = require("express");

const app = express();


app.get("/ab*c",(req,res)=>{
    console.log("active")
    res.send("this is ab*c routes")
})
app.get("/ab?cd",(req,res)=>{
    res.send("this is ab?cd routes")
})
app.get("/ab+cd",(req,res)=>{
    res.send("this is ab+cd routes")
})

app.get("/ab(cd)?ef",(req,res)=>{
    res.send("this is ab(cd)?ef routes")
})
app.get(/a/,(req,res)=>{
    res.send("this is the regix part of routes")
})
app.get(/.*fly$/,(req,res)=>{
    res.send(
        "this will search everthing which end with the fly."
    )

})

app.listen(3000,()=>{
    console.log("server is listning on 3000 port")
});


