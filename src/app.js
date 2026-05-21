const express = require("express");

const app = express();

app.use(express.json());


app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong..!!!")
    }
})

app.get("/user",(req,res,next) =>{
    console.log("Handling the route user!")
    // res.send("Response!!")
    next();
},(req,res)=>{
    console.log("Handling the route user 2!!")
    res.send("2nd Response!!")
})


// app.post("/user",(req,res) =>{
//    console.log(req.body)
//    res.send("Data successfully saved to Database!")
// })
// app.use("/",(req,res)=>{
//     res.send("Hello test!!!!!!!")
// })





app.listen(3000,()=>console.log("server is running...!!!"))
