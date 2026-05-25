const express = require("express");
const cookieParser = require("cookie-parser")
const connectDB = require("./config/database");

const app = express();

app.use(express.json());
app.use(cookieParser())

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/requests")

app.use("/",authRouter)
app.use("/profile",profileRouter)
app.use("/request",requestRouter)

connectDB().then(()=>{
    console.log("Database connection established!!!");
    app.listen(3000,()=>console.log("server is running...!!!"))
}).catch(err =>{
    console.error("Database connection failed!!!")
})


