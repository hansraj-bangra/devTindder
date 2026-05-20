const express = require("express");

const app = express();

app.use(express.json());

app.get("/user",(req,res) =>{
    res.send({name:"hansraj",age:20})
})


app.post("/user",(req,res) =>{
   console.log(req.body)
   res.send("Data successfully saved to Database!")
})
app.use("/",(req,res)=>{
    res.send("Hello test!!!!!!!")
})




app.listen(3000,()=>console.log("server is running...!!!"))
