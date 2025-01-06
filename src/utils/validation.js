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

const validateEditProfileData = (req) => {
    const changesAllowed = ["firstName", "lastName", "photoUrl", "age", "about", "gender", "skills"];

    const isEditAllowed = Object.keys(req.body).every((field) => {
        return changesAllowed.includes(field);
    });

    return isEditAllowed;
};

module.exports={
    validateSignUpdata,
    validateEditProfileData,
}