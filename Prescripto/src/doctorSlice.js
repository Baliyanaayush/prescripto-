import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "./utils/axiosClient";



export const getAllDoctors = createAsyncThunk(
  "/doctor/alldoctors",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get("/doctor/alldoctors");

      if (!data.success) {
        return rejectWithValue({
          message: data.message || "Failed to fetch doctors",
        });
      }

      return data.doctors;
    } catch (error) {
      console.error(
        "getAllDoctors error:",
        error.response?.data || error.message
      );

      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch doctors",
      });
    }
  }
);


const initialState = {
  doctors: [],
  loading: false,
  error: null,
};
const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Pending
      .addCase(getAllDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Success
      .addCase(getAllDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })

      // Failed
      .addCase(getAllDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Something went wrong";
      });
  },
});

export default doctorSlice.reducer;