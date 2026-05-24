const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.patch("/user/:userId",async(req,res)=>{
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
    console.log(req.body );
    const user = new User(req.body)
    try{
        await user.save();
    res.status(201).send(req.body)
    }catch(err){
        res.status(400).send("Something went wrong in user detail!!")
    }

});

app.get("/user",async (req,res)=>{
    const email = req.boby.emailId;
    const user = await User.findOne({emailId:emailId});
    try {
        if(!user){
            res.status(400).send("Something went wrong in user detail!!")
        }
        res.send(user)
    } catch (error) {
        res.status(400).send("Something went wrong in user detail!!")
    }
    
})

app.get("/feed", async(req,res)=>{
    try {
        const users = await User.find({});
        res.send(users)
    } catch (error) {
        res.status(400).send("Something went wrong in user detail!!")
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

