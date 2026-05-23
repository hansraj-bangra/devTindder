const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup",async (req,res)=>{
    console.log(req.body );
    const user = new User(req.body)
    try{
        await user.save()
    res.status(201).send(req.body)
    }catch(err){
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

