import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "../adminAuthSlice"
import userAuthReducer from "../userAuthSlice"
import doctorReducer from "../doctorSlice"
import appointmentReducer from "../appointmentSlice"
import Appointment from "../pages/Appointment";
export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    userAuth: userAuthReducer,
    doctor:doctorReducer,
    appointment:appointmentReducer
    
  },
});