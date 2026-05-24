const express = require("express");
const validator = require("validator");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken");
const connectDB = require("./config/database");
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const user = require("./models/user");
const {userAuth} = require("./middlewares/auth")


const app = express();

app.use(express.json());
app.use(cookieParser())

app.patch("/user/:userId",userAuth,async(req,res)=>{
    const userId =req.params.userId;
    const data = req.body;
    try {
        const ALLOWED_UPDATES = ["photoUrl","about","gender","age","skills"];
        const  isUpdateAllowed = Object.keys(data).every((k) =>ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }

        if(data.skills.length >10){
            throw new Error("Skills not allowed more than 10")
        }
        const user = await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"after",runValidator:true});
        console.log(user);
        res.send("User updated successfully!!")
    } catch (error) {
        res.status(400).send("UPDATED FAILED "+ err.message)
    }
})

app.post("/signup",async (req,res)=>{
    
    try{
        validateSignUpData(req.body);

        const {password} = req.body;
        const passwordHash = await bcrypt.hash(password,10);

        const user = new User({password: passwordHash,
  ...req.body
});
        await user.save();
    res.status(201).send(req.body)
    }catch(err){
        res.status(400).send("ERROR: "+err.message)
    }

});

app.post("/login",async (req,res)=>{

    try {
        const {emailId,password} =req.body;
        const user = await User.findOne({emailId:emailId});

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
        const token = await jwt.sign({_id:user._id},"Dev@Tinder$777",{expiresIn:"1d"});

        //Add the token to cookie and send the response back to the user 
        res.cookie("token",token)

        res.send("Login successfully!!")
    } catch (error) {
        res.status(400).send("ERROR: "+err.message)
    }
})

app.get("/user",userAuth,async (req,res)=>{
    const email = req.body?.emailId;
    
    try {
        if(!validator.isEmail(email)){
            throw new Error("Invalid Email address!!")
        }
        const user = await User.findOne({emailId:email});
        if(!user){
            res.status(400).send("Something went wrong in user detail!!")
        }
        res.send(user)
    } catch (error) {
        res.status(400).send("Something went wrong in user detail!!")
    }
    
})

app.get("/feed", userAuth, async(req,res)=>{
    try {
        const users = await User.find({});
        res.send(users)
    } catch (error) {
        res.status(400).send("Something went wrong in user detail!!")
    }
});


app.get("/profile",async(req,res)=>{

    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(404).send("Invalid Credentials")
    }
})

connectDB().then(()=>{
    console.log("Database connection established!!!");
    app.listen(3000,()=>console.log("server is running...!!!"))
}).catch(err =>{
    console.error("Database connection failed!!!")
})









// app.use("/",(err,req,res,next)=>{
//     if(err){
//         res.status(500).send("Something went wrong..!!!")
//     }
// })

// app.get("/user",(req,res,next) =>{
//     console.log("Handling the route user!")
//     // res.send("Response!!")
//     next();
// },(req,res)=>{
//     console.log("Handling the route user 2!!")
//     res.send("2nd Response!!")
// })


// app.post("/user",(req,res) =>{
//    console.log(req.body)
//    res.send("Data successfully saved to Database!")
// })
// app.use("/",(req,res)=>{
//     res.send("Hello test!!!!!!!")
// })

