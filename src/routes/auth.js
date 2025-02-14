const express = require("express");
const { userAuth } = require("../middlewares/auth");
const authRouter = express.Router();
const { validateSignUpdata } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    //validations

    validateSignUpdata(req);

    //encrypted password

    const { firstName, lastName, password, emailId, skills } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      password: passwordHash,
      emailId,
      skills,
    });
    const savedUser = await user.save();
    const token = await user.getJWT();

    // console.log(token);

    // add the token to the cookie and then send the respons to the user
    res.cookie("token", token, { expires: new Date(Date.now() + 900000) });
    res.json({
      message: "user added to the database successfuly",
      data: savedUser,
    });
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { password, emailId } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //create jwt token
      const token = await user.getJWT();

      // console.log(token);

      // add the token to the cookie and then send the respons to the user
      res.cookie("token", token, { expires: new Date(Date.now() + 900000) });

      res.send(user);
    } else {
      throw new Error("invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

authRouter.post("/signout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });

  res.send("logout successfull..");
});
module.exports = authRouter;
