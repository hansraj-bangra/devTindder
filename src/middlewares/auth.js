const User = require("../models/user");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");


const userAuth = async(req,res,next) =>{

    try {
        //Read the token from the req cookies
        const {token} = req.cookies;

        //Validate the token
        if(!token){
            throw new Error("Token is not valid or not found!")
        }
        
        const decoded = await jwt.verify(token, "Dev@Tinder$777")

        const {_id} = decoded;

        //Find the user is exist or not?
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not exists")
        }
        req.user= user;
        next();
    } catch (error) {
        res.status(404).send("ERROR: "+ err.message);
    }
}


module.exports ={
    userAuth
}