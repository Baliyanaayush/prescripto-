const mongoose = require("mongoose");

const { Schema } = mongoose;

const appointmentSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },

  docId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DoctorModel",
    required: true,
  },

  slotData: {
    type: String,
    required: true,
  },

  slotTime: {
    type: String,
    required: true,
  },

  userData: {
    type: Object,
    required: true,
  },

  docData: {
    type: Object,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  date: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["booked", "cancelled", "completed"],
    default: "booked",
  },

  payment: {
    type: Boolean,
    default: false,
  },

  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const AppointmentModel = mongoose.model(
  "AppointmentModel",
  appointmentSchema
);

module.exports = AppointmentModel;