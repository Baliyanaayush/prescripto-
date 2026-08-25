import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
const Banner = () => {
    const navigate = useNavigate()
  return (
    <div className="mx-6 md:mx-10 lg:mx-20 my-20">
<div className="bg-[#5F6FFF] rounded-3xl relative overflow-visible flex flex-col md:flex-row items-center justify-between px-8 md:px-12 lg:px-16">
        {/* Left Side */}
        <div className="text-white py-12 md:py-16 max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Book Appointment
            <br />
            With 100+ Trusted Doctors
          </h1>

          <button 
          onClick={()=>navigate("/login")}
          className="mt-8 bg-white text-[#5F6FFF] px-8 py-3 rounded-full font-semibold hover:scale-105 transition duration-300 shadow-md">
            Create Account
          </button>
        </div>

        {/* Right Side */}
        <div className="relative w-full md:w-1/2 flex justify-center">
  <img
    src={assets.appointment_img}
    alt="Appointment"
    className="w-[320px] md:w-[430px] lg:w-[500px] -mt-10 md:-mt-20"
  />
</div>
      </div>
    </div>
  );
};

export default Banner;