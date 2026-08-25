import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "./utils/axiosClient";

export const registerUser = createAsyncThunk(
    "/user/register",
    async (userData,{rejectWithValue})=>{
        try {
         const response =  await axiosClient.post("/user/register",userData)
        return response.data;  
        console.log(user);
        } catch (error) {
        return rejectWithValue(error.response?.data || error.message);

        }
    }
)


export const checkUserAuth = createAsyncThunk(
    "/user/check",
    async(_, {rejectWithValue})=>{
        try {
            const {data} = await axiosClient.get("/user/check")
            return data.user
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
export const loginUser = createAsyncThunk(
    "/user/login",
    async(userdata,{rejectWithValue})=>{
        try {
           const response =  await axiosClient.post("/user/login",userdata)
            return response.data
        } catch (error) {
                     return rejectWithValue(error.response?.data || error.message);   
        }
    }
)

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/user/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getProfile = createAsyncThunk(
    "/user/getprofile",
    async(_,{rejectWithValue})=>{
        try {
        const {data} = await axiosClient.get("/user/getprofile")
        return data.user
        } catch (error) {
            return rejectWithValue(
        error.response?.data || { message: "Failed to fetch profile" }
      );
        }
    }
)

export const updateProfile = createAsyncThunk(
    "/user/updateprofile",
    async(userdata,{rejectWithValue})=>{
        try {
            const response = await axiosClient.post("/user/updateprofile",userdata)
            return response.data.user
        } catch (error) {
            return rejectWithValue(
        error.response?.data || { message: "Failed to fetch profile" }
            )
        }
    }
)


export const bookAppointment = createAsyncThunk(
    "/bookappointment",
    async(appointmentData,{rejectWithValue})=>{
        try {
            const {data} = axiosClient.post("/user/bookappointment",appointmentData) 
            return appointmentData
        } catch (error) {
            return rejectWithValue(
        error.response?.data || {
          message: "Failed to book appointment",
        }
      );
        }
    }
)


const authUserSlice = createSlice({
    name:"userauth",
    initialState:{
        user: null,
        isUserAuthenticated: false,
        loading: false,
        error: null
    },

    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.isUserAuthenticated = true
            state.error = null;
            state.user = action.payload
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload?.message || "something went wrong"
            state.isUserAuthenticated = false
            state.user = null;
        })

        // usercheckthunk

        .addCase(checkUserAuth.pending, (state) => {
    state.loading = true;
})

.addCase(checkUserAuth.fulfilled, (state, action) => {
    state.loading = false;
    state.isUserAuthenticated = true;
    state.user = action.payload;
})

.addCase(checkUserAuth.rejected, (state, action) => {
    state.loading = false;
    state.isUserAuthenticated = false;
    state.user = null;
    state.error = action.payload?.message;
})

// for login
.addCase(loginUser.pending,(state)=>{
    state.loading = true
})
.addCase(loginUser.fulfilled,(state,action)=>{
    state.loading = false
    state.isUserAuthenticated = true
    state.user = action.payload
})
.addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || 'Something went wrong'
                state.isUserAuthenticated = false
                state.user = null
            })

// for logout
            .addCase(logoutUser.fulfilled, (state) => {
  state.user = null;
  state.isUserAuthenticated = false;
  state.error = null;
})

// getprofile 
.addCase(getProfile.pending,(state)=>{
    state.loading = true
    state.error = null
})
.addCase(getProfile.fulfilled,(state,action)=>{
    state.loading = false
    state.user = action.payload
    state.isUserAuthenticated = true
})
.addCase(getProfile.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload?.message;
})

//for update profile
.addCase(updateProfile.pending,(state)=>{
    state.loading = true
})
.addCase(updateProfile.fulfilled,(state,action)=>{
    state.loading = false
    state.user = action.payload
})
.addCase(updateProfile.rejected,(state,action)=>{
    state.loading = false
    state.error = action.payload?.message
})

// for appopintment

    }
}

)

export default authUserSlice.reducer