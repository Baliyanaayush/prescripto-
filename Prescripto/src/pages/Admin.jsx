import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../adminAuthSlice";



// Zod Schema
const loginSchema = z.object({
  emailId: z.string().min(1, "Email is required").email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),});

const Admin = () => {
const [state, setState] = useState("Admin");

const dispatch = useDispatch()
const navigate = useNavigate()
const { isAdminAuthenticated, loading, error } = useSelector(
  (state) => state.adminAuth
);
  const {register,handleSubmit,formState: { errors, isSubmitting },} = useForm({resolver: zodResolver(loginSchema),defaultValues: {emailId: "",password: "",},});
  
  useEffect(()=>{
    if(isAdminAuthenticated){
        navigate("/admindashboard")
    }
  },[isAdminAuthenticated,navigate])



  const onSubmit = async (data) => {
    try {
      if(state ==="Admin"){
        dispatch(adminLogin(data))
      }
      else{
        // doctor login api 
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FD] px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
      >
        <h1 className="text-3xl font-bold text-gray-800">
          <span className="text-[#5F6FFF]">{state}</span> Login
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Please login to access your dashboard.
        </p>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            {...register("emailId")}
            className={`w-full rounded-lg border px-4 py-3 outline-none transition-all focus:ring-2
              ${
                errors.emailId
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-[#5F6FFF] focus:ring-[#5F6FFF]/20"
              }`}
          />

          {errors.emailId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.emailId.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            className={`w-full rounded-lg border px-4 py-3 outline-none transition-all focus:ring-2
              ${
                errors.password
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-[#5F6FFF] focus:ring-[#5F6FFF]/20"
              }`}
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
  {error && (
  <p className="text-red-500 text-sm mb-3">{error}</p>
)}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#5F6FFF] hover:bg-[#4E5DF5] text-white font-semibold py-3 rounded-lg transition duration-300 cursor-pointer disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <div className="mt-6 text-center text-gray-600">
          {state === "Admin" ? (
            <p>
              Login as Doctor?{" "}
              <span
                onClick={() => setState("Doctor")}
                className="text-[#5F6FFF] font-semibold cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Login as Admin?{" "}
              <span
                onClick={() => setState("Admin")}
                className="text-[#5F6FFF] font-semibold cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Admin;