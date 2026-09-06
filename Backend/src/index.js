const express  = require('express');
const main = require("./config/db")
const app = express()
require('dotenv').config()
const connectCloudinary = require("./config/cloudinary")
const adminRouter = require("./routes/adminroute")
const cookieParser = require("cookie-parser");
const cors = require("cors")
const userRouter = require("./routes/userroutes");
const doctorRouter = require('./routes/doctorroute');


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://doc-prescripto.netlify.app"
  ],
  credentials: true
}));

app.use(express.json())
app.use(cookieParser());
// app.use(cookieParser())

// end Point
app.get("/", (req,res)=>{
  res.send("Hello from backend")
})
app.use("/admin",adminRouter)
app.use("/user",userRouter)
app.use("/doctor",doctorRouter)
// localhost:4000/api/admin/add-doctor 

const iniatilizeConnection = async()=>{
   
  try {
    await main()
    connectCloudinary()
  console.log("MongoDB and Cloudinary is connected")

  // app.listen(process.env.PORT_NUMBER, ()=>{
  //   console.log(`Listening at port Number ${process.env.PORT_NUMBER}`)
// })
  } catch (error) {
    console.log("the Error occured",error)
  }
}

iniatilizeConnection()


module.exports = app