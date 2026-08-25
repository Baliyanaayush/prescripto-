const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const DoctorModel = require("../models/doctormodel")

const allDoctor = async(req,res)=>{
    try {
        const doctors = await DoctorModel.find({}).select("-password -emailId")
        res.status(200).json({
            success:true,
            doctors
        })
    } catch (error) {
        res.status(500).json({
      success: false,
      message: error.message,
    });

    }
}

module.exports = {allDoctor}