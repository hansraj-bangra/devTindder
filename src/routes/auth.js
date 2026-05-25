const express = require("express");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const validateSignUpData = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {

    try {
        validateSignUpData(req.body);

        const { password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            ...req.body,
            password: passwordHash

        });

        await user.save();
        res.status(201).send("User successfully created!!")
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }

});


authRouter.post("/login", async (req, res) => {

    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        if (!validator.isEmail(emailId)) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await user.validatePassword(password);

        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        //Create a JWT token
        const token = await jwt.sign({ _id: user._id }, "Dev@Tinder$777", { expiresIn: "1d" });

        //Add the token to cookie and send the response back to the user 
        res.cookie("token", token)

        res.send("Login successfully!!")
    } catch (error) {
        res.status(400).send("ERROR: " + err.message)
    }
})

module.exports = authRouter;