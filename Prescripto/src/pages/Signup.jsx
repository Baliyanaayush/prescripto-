import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { email, z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../userAuthSlice";

const SignupSchema = z
  .object({
    firstname: z.string().min(3, "Name must be at least 3 characters"),
    emailId: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),  })

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {isUserAuthenticated,loading,error} = useSelector((state)=>state.userAuth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  useEffect(()=>{
    if(isUserAuthenticated){
      navigate("/")
    }
  },[isUserAuthenticated, navigate])

  const onSubmit = (data) => {
   dispatch(registerUser(data))
    
  };

  

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4">

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Join Prescripto and book appointments easily
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 mt-8"
        >
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              {...register("firstname")}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#5F6FFF]"
            />

            {errors.firstname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstname.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("emailId")}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#5F6FFF]"
            />

            {errors.emailId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emailId.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              {...register("password")}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#5F6FFF]"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-[#5F6FFF] text-white py-3 rounded-xl font-semibold hover:bg-[#4d5eff] transition duration-300"
          >
            Create Account
          </button>

          {/* Login Redirect */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-[#5F6FFF] font-semibold cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </div>
        </form>

      </div>

    </div>
  );
};

export default Signup;