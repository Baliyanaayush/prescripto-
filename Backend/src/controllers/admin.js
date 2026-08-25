const DoctorModel = require("../models/doctormodel")
const validate = require("../utils/validator")
const bcrypt = require("bcrypt")
const cloudinary = require("cloudinary").v2
const connectCloudinary = require("../config/cloudinary")
const jwt = require("jsonwebtoken")
const AppointmentModel = require("../models/appointmentModel")


const addDoctor = async (req, res) => {
    try {
        const { firstname, emailId, password, speciality, degree, experience, about, fees, address } = req.body
        validate(req.body)

        const hashPassword = await bcrypt.hash(password, 10)


        // upload image to cloudinary
        const imageFile = req.file;

        const imageUpload = await cloudinary.uploader.upload(
            imageFile.path,
            {
                resource_type: "image",
            }
        );
        console.log(imageUpload);
        const imageurl = imageUpload.secure_url

        const doctorData = {
            firstname,
            emailId,
            image: imageurl,
            password: hashPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }
        console.log(doctorData);
        const newDoctor = new DoctorModel(doctorData)
        await newDoctor.save()
        res.json({
            message: "Doctor Added Successfully"
        })

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

// API for admin Login
const adminLogin = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        if (
            emailId === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {
            const token = jwt.sign(
                { emailId },
                process.env.SECRET_KEY,
                { expiresIn: "1h" }
            );

            res.cookie("token", token, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.status(200).json({
                success: true,
                message: "Login Successfully",
                token,
            });
        }

        return res.status(401).json({
            success: false,
            message: "Invalid Credentials",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const checkAdmin = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            admin: {
                emailId: req.admin.emailId,
            },
            message: "Admin authenticated",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllDoctors = async(req, res)=>{
    try {
const doctors = await DoctorModel.find({}).select("-password");         
        res.status(200).json({
            success:true,
            doctors,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
const DeleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is missing",
      });
    }

    const doctor = await DoctorModel.findById(id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    await DoctorModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// show the appointments in admin panel
const showAppointments = async (req, res) => {
try {
    const appointments  = await AppointmentModel.find({})
    res.json({
       ssuccess:true,
       appointments
    })
} catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
}

}

module.exports = { addDoctor, adminLogin, checkAdmin, getAllDoctors,DeleteDoctor,showAppointments }