const express = require("express");
const connectDB = require("./config/database");
const http = require("http")
const initialaizedSocketio = require("./utils/socket")
const app = express();

const { SchemaTypeOptions } = require("mongoose");





const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors")

app.use(cors({
  origin: 'http://localhost:5173',
  credentials:true,
}))

app.use(express.json());
app.use(cookieParser());


const authRouter = require('./routes/auth');
const profileRouter=require("./routes/profile");
const requestAuth=require("./routes/request");
const userRouter = require("./routes/user")


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestAuth);
app.use("/",userRouter)


const server = http.createServer(app)

initialaizedSocketio(server);



connectDB()
  .then(() => {
    console.log("mongoose connection established");
    // Start Server
    server.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("connection  is not established");
  });
