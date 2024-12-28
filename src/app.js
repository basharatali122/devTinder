const express = require("express");

const app = express();


app.use('/user',(req,res,next)=>{
    // res.send("this is the first response")
    next();
},
[(req,res,next)=>{
    console.log("response 2");

    next();
},
(req, res,next)=>{
    console.log("response3");
    next();
},
(req,res,next)=>{
    console.log("response4")
    next();
}]
, 
(req,res,)=>{
    console.log("response 5");
    res.send("this is the last response and it is call through the next function from top to bottom and at the last it is called")
}
)

app.listen(3000,()=>{
    console.log("server is listning on 3000 port")
});


