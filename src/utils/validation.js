const validator = require("validator");

const validateSignUpdata =(req)=>{
const {firstName,lastName,emailId,password}=req.body;

if(!firstName || !lastName){
    throw new Error('Name is not correct');
}
else if(!validator.isEmail(emailId)){
    throw new Error("Email is not valid")
}
else if(!validator.isStrongPassword(password)){
    throw new Error("plz Enter a strong password")
}
}

module.exports={
    validateSignUpdata,
}