import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "./utils/axiosClient";

export const bookAppointment = createAsyncThunk(
  "/appointment/book",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post(
        "/user/bookappointment",
        appointmentData
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to book appointment",
        }
      );
    }
  }
);

export const myappointment = createAsyncThunk(
  "myappointment",
  async(_,{rejectWithValue})=>{
    try {
      const {data} = await axiosClient.get("/user/myappointment")
      return data
    } catch (error) {
       return rejectWithValue(
        error.response?.data || {
          message: "Failed to book appointment",
        }
      );
    }
  }
)

export const cancelAppointment = createAsyncThunk(
  "/appointment/cancel",

  async (appointmentId, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post(
        "/user/cancelappointment",
        { appointmentId }
      );

      return {
        data,
        appointmentId,
      };

    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to cancel appointment",
        }
      );
    }
  }
);
export const paymentRazorPay = createAsyncThunk(
  "appointment/paymentRazorPay",
  async (appointmentId, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post(
        "/user/payment-razorpay",
        {
          appointmentId,
        }
      );

      return data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Failed to create payment",
        }
      );
    }
  }
);

export const verifyRazorPayPayment =
  createAsyncThunk(
    "appointment/verifyRazorPayPayment",
    async (paymentData, { rejectWithValue }) => {
      try {
        const { data } = await axiosClient.post(
          "/user/verify-razorpay",
          paymentData
        );

        return data;

      } catch (error) {
        return rejectWithValue(
          error.response?.data || {
            message: "Payment verification failed",
          }
        );
      }
    }
  );

const initialState = {
  loading: false,
  success: false,
  error: null,
  appointments: [],

  cancelLoading: false,
  cancelSuccess: false,
  cancelError: null,


 paymentLoading: false,
paymentLoadingId: null,
  paymentSuccess: false,
  paymentError: null,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,

  reducers: {
    resetAppointment: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(bookAppointment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Something went wrong";
      })

      // for my appointment

      .addCase(myappointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(myappointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload.appointments;
      })

      .addCase(myappointment.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Something went wrong";
      })

      //for appointment cancel
      .addCase(cancelAppointment.pending, (state) => {
  state.cancelLoading = true;
  state.cancelSuccess = false;
  state.cancelError = null;
})

.addCase(cancelAppointment.fulfilled, (state, action) => {
  state.cancelLoading = false;
  state.cancelSuccess = true;

  state.appointments = state.appointments.filter(
    (appointment) =>
      appointment._id !== action.payload.appointmentId
  );
})

.addCase(cancelAppointment.rejected, (state, action) => {
  state.cancelLoading = false;
  state.cancelError =
    action.payload?.message || "Failed to cancel appointment";
})

.addCase(paymentRazorPay.pending, (state, action) => {
  state.paymentLoading = true;
  state.paymentLoadingId = action.meta.arg;
  state.paymentError = null;
  state.paymentSuccess = false;
})
.addCase(paymentRazorPay.fulfilled, (state) => {
  state.paymentLoading = false;
})

.addCase(paymentRazorPay.rejected, (state, action) => {
  state.paymentLoading = false;
  state.paymentError =
    action.payload?.message ||
    "Failed to create payment";
})
.addCase(
  verifyRazorPayPayment.pending,
  (state) => {
    state.paymentLoading = true;
    state.paymentError = null;
  }
)

.addCase(
  verifyRazorPayPayment.fulfilled,
  (state) => {
    state.paymentLoading = false;
    state.paymentSuccess = true;
  }
)

.addCase(
  verifyRazorPayPayment.rejected,
  (state, action) => {
    state.paymentLoading = false;
    state.paymentError =
      action.payload?.message ||
      "Payment verification failed";
  }
)
  },
});



export default appointmentSlice.reducer;