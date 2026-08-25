import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "./utils/axiosClient";

export const adminLogin = createAsyncThunk(
  "admin/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/admin/login", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addDoctor = createAsyncThunk(
  "/admin/add-doctor",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/admin/add-doctor", formData, { headers: { "Content-Type": "multipart/form-data" } })
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
)

export const checkAdminAuth = createAsyncThunk(
  "admin/check",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/admin/check");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getDoctors = createAsyncThunk(
  "admin/doctor-list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/admin/doctor-list")
      return response.data.doctors

    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteDoctor = createAsyncThunk(
  "admin/delete-doctor",
  async(id,{rejectWithValue})=>{
    try {
      const response = await axiosClient.delete(`/admin/delete/${id}`)
      return {id, message:response.data.message}
    } catch (error) {
     return rejectWithValue(error.response?.data); 
    }
  }
)
export const getAllAppointments = createAsyncThunk(
    "admin/getAllAppointments",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosClient.get(
                "/admin/allappointments"
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || {
                    message: "Failed to fetch appointments"
                }
            );
        }
    }
);


const authAdminSlice = createSlice({
  name: "adminAuth",

  initialState: {
    admin: null,
    doctors: [],
    loading: false,
    error: null,
    isAdminAuthenticated: false,
     appointments: [],
    appointmentLoading: false,
    appointmentError: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAdminAuthenticated = true;
        state.admin = action.payload;
      })

      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
        state.isAdminAuthenticated = false;
        state.admin = null;
      })

      //add doctor
      .addCase(addDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message; // "Doctor Added Successfully"
      })

      .addCase(addDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to add doctor";
      })

      // get all doctors
      .addCase(getDoctors.pending, (state) => {
        state.loading = true;
      })

      .addCase(getDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })

      .addCase(getDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      //delete doctor

      .addCase(deleteDoctor.fulfilled, (state, action) => {
  state.doctors = state.doctors.filter(
    (doctor) => doctor._id !== action.payload.id
  );
})

.addCase(getAllAppointments.pending, (state) => {
    state.appointmentLoading = true;
    state.appointmentError = null;
})

.addCase(getAllAppointments.fulfilled, (state, action) => {
    state.appointmentLoading = false;
    state.appointments = action.payload.appointments;
})

.addCase(getAllAppointments.rejected, (state, action) => {
    state.appointmentLoading = false;
    state.appointmentError =
        action.payload?.message ||
        "Failed to fetch appointments";
})
  },
});

export default authAdminSlice.reducer;