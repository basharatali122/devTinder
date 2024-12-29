const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

// Admin Middleware and Routes
app.use("/admin", adminAuth);
app.get("/admin/allData", (req, res) => {
    res.send("Admin data retrieved successfully");
});

// User Middleware and Routes
app.use("/user", userAuth);
app.get("/user/getData", (req, res) => {
    res.send("User data retrieved successfully");
});

// Start Server
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
