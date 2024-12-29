const adminAuth = (req, res, next) => {
    const admin = "xyz";
    const authorized = admin === "xyz";
    if (!authorized) {
        console.log("adminAuth: Unauthorized access.");
        return res.status(404).send("Admin is not authorized");
    }
    else{
        next();
    }
};

const userAuth = (req, res, next) => {
    const user = "xyz";
    const authorized = user === "xyz";
    if (!authorized) {
        console.log("userAuth: Unauthorized access.");
        return res.status(404).send("User is not authorized");
    }
    next();
};

module.exports = {
    adminAuth,
    userAuth,
};
