const express = require("express");
const connectDB = require("./config/database");
const app = express();

const { SchemaTypeOptions } = require("mongoose");




const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());


const authRouter = require('./routes/auth');
const profileRouter=require("./routes/profile");
const requestAuth=require("./routes/request")


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestAuth);



connectDB()
  .then(() => {
    console.log("mongoose connection established");
    // Start Server
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("connection  is not established");
  });
