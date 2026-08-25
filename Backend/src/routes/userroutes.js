const express = require("express");
const {registerUser,loginUser,checkUser,logoutUser,getProfile, updateProfile,bookAppointment,myappointment, cancelAppointment, paymentRazorPay, verifyRazorPayPayment} = require("../controllers/userAuthentication");
const userMiddleWare = require("../middleware/usermiddleware");
const upload = require("../middleware/multer")

const userRoutes = express.Router()


userRoutes.post("/register",registerUser)
userRoutes.post("/login",loginUser)
userRoutes.get("/check",userMiddleWare,checkUser)
userRoutes.post("/login",loginUser)
userRoutes.post("/logout",userMiddleWare,logoutUser)
userRoutes.get("/getprofile",userMiddleWare,getProfile)
userRoutes.post("/updateprofile",upload.single("image"),userMiddleWare,updateProfile)
userRoutes.post("/bookappointment",userMiddleWare,bookAppointment)
userRoutes.get("/myappointment",userMiddleWare,myappointment)
userRoutes.post("/cancelappointment",userMiddleWare,cancelAppointment)
userRoutes.post("/payment-razorpay",userMiddleWare,paymentRazorPay)
userRoutes.post("/verifyRazorPay",userMiddleWare,verifyRazorPayPayment)
module.exports = userRoutes