import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../userAuthSlice";
import { useEffect } from "react";

const LoginSchema = z.object({
  emailId: z.string().email("Invalid Email"),
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {isUserAuthenticated,loading,error} = useSelector((state)=>state.userAuth)

  const {register,handleSubmit,formState: { errors },} = useForm({resolver: zodResolver(LoginSchema),});
   useEffect(() => {
    if (isUserAuthenticated) {
      navigate('/')
    }
  }, [isUserAuthenticated, navigate])
  const onSubmit = (data) => {
    
    dispatch(loginUser(data))
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4">

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Login to book your appointments
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >
          {/* Email */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
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
            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#5F6FFF]"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#5F6FFF] text-white py-3 rounded-xl font-semibold hover:bg-[#4d5eff] transition"
          >
            Login
          </button>
          <div className="text-center mt-6">
  <p className="text-gray-600">
    Don't have an account?{" "}
    <span
      onClick={() => navigate("/signup")}
      className="text-[#5F6FFF] font-semibold cursor-pointer hover:underline"
    >
      Sign Up
    </span>
  </p>
</div>
        </form>

      </div>

    </div>
  );
};

export default Login;