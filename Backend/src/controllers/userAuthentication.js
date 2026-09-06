const express = require("express")
const UserModel = require("../models/usermodel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const validator = require("validator")
const DoctorModel = require("../models/doctormodel")
const AppointmentModel = require("../models/appointmentModel")
const cloudinary = require("cloudinary").v2
const razorpay = require("razorpay")
const crypto = require("crypto");
// to resister user
const registerUser = async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const { firstname, emailId, password } = req.body;

    if (!firstname || !emailId || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    if (!validator.isEmail(emailId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Weak Password",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      firstname,
      emailId,
      password: hashedPassword,
      role: "user",
    });

    const token = jwt.sign(
      {
        _id: user._id,
        emailId: user.emailId,
        role: user.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User Register Successfully",
      user: {
        _id: user._id,
        firstname: user.firstname,
        emailId: user.emailId,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
      error: error.stack,
    });
  }
};

const loginUser = async (req, res) => {
  const { emailId, password } = req.body
  if (!emailId) {
    return res.status(400).json({
      success: false,
      message: "User not Found"
    });
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Please enter password"
    });
  }

  const user = await UserModel.findOne({ emailId })
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid emailId or Password"
    });
  }
  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    return res.status(401).json({
      success: false,
      message: "Invalid emailId or Password"
    });
  }

  const token = jwt.sign({ _id: user._id, emailId: user.emailId, role: user.role }, process.env.SECRET_KEY)
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 1000,
  });
  res.status(200).json({
    success: true,
    message: "Login Successfully",
    user: {
      _id: user._id,
      firstname: user.firstname,
      emailId: user.emailId,
      role: user.role,
    },
  });

}
const checkUser = async (req, res) => {
  try {
    const user = req.user;
    console.log(req.user);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// to get user details
const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const updateProfile = async (req, res) => {
  try {
    const { firstname, phone, address, dob, gender } = req.body
    const imgFile = req.file


    if (!firstname || !phone || !dob || !gender) {
      return res.json({
        success: false,
        message: "Data missing"
      })
    }
    await UserModel.findByIdAndUpdate(req.user._id, { firstname, phone, address: JSON.parse(address), dob, gender })
    if (imgFile) {
      //upload image to cloudinary
      const imgUpload = await cloudinary.uploader.upload(imgFile.path, { resource_type: "image" })
      const imgUrl = imgUpload.secure_url

      await UserModel.findByIdAndUpdate(req.user._id, { image: imgUrl })
    }

    // the latest updated user
    const updatedUser = await UserModel.findById(req.body._id).select("-password")

    res.status(200).json({
      success: true,
      message: "Profile Updated",
      user: updatedUser
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

//API to book the appointment

const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;

    // Logged-in user's ID
    const userId = req.user._id;

    // Find doctor
    const docData = await DoctorModel
      .findById(docId)
      .select("-password");

    if (!docData) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Find user
    const userData = await UserModel
      .findById(userId)
      .select("-password");

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Existing booked slots
    let slots_booked = docData.slots_booked || {};

    // Check slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.status(400).json({
          success: false,
          message: "Slot not available",
        });
      }

      slots_booked[slotDate].push(slotTime);
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    // Appointment data
    const appointmentData = {
      userID: userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotData: slotDate,
      slotTime,
      date: Date.now(),
    };
    // Create appointment
    const newAppointment = new AppointmentModel(appointmentData);

    await newAppointment.save();

    // Update doctor's booked slots
    await DoctorModel.findByIdAndUpdate(
      docId,
      { slots_booked },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Appointment Booked",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//to get user Appoointment
const myappointment = async (req, res) => {
  try {
    const userId = req.user._id
    const appointments = await AppointmentModel.find({ userID: userId })

    res.json({
      success: true,
      appointments
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// api to cancel the appointment

const cancelAppointment = async (req, res) => {
  try {

    const { appointmentId } = req.body
    const appointment = await AppointmentModel.findById(appointmentId)

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not Found"
      })
    }

    if (appointment.userID.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to cancel this appointment"
      })
    }

    if (appointment.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Appointment already canceled"
      })
    }

    appointment.status = "cancelled"
    await appointment.save()

    res.json({
      success: true,
      message: "Appointment cancelled successfully",
    });


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const razorPayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET 
})

// APi to make payment for the appointment
const paymentRazorPay = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID is required",
      });
    }

    const appointmentData = await AppointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Make sure this appointment belongs to logged-in user
    if (
      appointmentData.userID.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }

    // Don't allow payment for cancelled appointment
    if (appointmentData.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cancelled appointment cannot be paid",
      });
    }

    // Already paid
    if (appointmentData.payment === true) {
      return res.status(400).json({
        success: false,
        message: "Appointment is already paid",
      });
    }

    const options = {
      amount: appointmentData.amount * 100,
      currency: "INR",
      receipt: `appointment_${appointmentId}`,
    };

    const order = await razorPayInstance.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.log("RAZORPAY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const verifyRazorPayPayment = async (req, res) => {
  try {
    const {
      appointmentId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    console.log("VERIFY BODY:", req.body);
    console.log("VERIFY USER:", req.user);

    if (
      !appointmentId ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment details are missing",
      });
    }

    const appointment = await AppointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Check ownership
    if (
      appointment.userID.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }

    // Generate signature
    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        razorpay_order_id + "|" + razorpay_payment_id
      )
      .digest("hex");

    console.log("GENERATED:", generatedSignature);
    console.log("RECEIVED:", razorpay_signature);

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // ⭐ UPDATE PAYMENT
    appointment.payment = true;

    await appointment.save();

    console.log(
      "PAYMENT AFTER SAVE:",
      appointment.payment
    );

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      appointment,
    });

  } catch (error) {
    console.log("VERIFY PAYMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// showing the appointments in admin panel


module.exports = { registerUser, loginUser, checkUser, logoutUser, getProfile, updateProfile, bookAppointment, myappointment, cancelAppointment, paymentRazorPay, verifyRazorPayPayment }