import React from 'react'
import { assets } from '../assets/assets'
import { LuArrowBigRight } from "react-icons/lu";
import { FaPeopleGroup } from "react-icons/fa6";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-primary rounded-2xl px-6 md:px-10 lg:px-20 overflow-hidden">
  {/* Left Side */}
  <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 md:py-20">
    <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
      Book Appointment <br />
      With Trusted Doctors
    </h1>

    <div className="flex items-center gap-3 text-white text-sm md:text-base">
      <FaPeopleGroup className="text-3xl" />
      <p>
        Simply browse through our extensive list of trusted doctors,
        <br className="hidden md:block" />
        schedule your appointment hassle-free.
      </p>
    </div>

    <a
      href="#speciality"
      className="flex items-center gap-2 bg-white text-gray-700 px-8 py-3 rounded-full font-medium hover:scale-105 transition-all duration-300"
    >
      Book Appointment
      <LuArrowBigRight className="text-lg" />
    </a>
  </div>

  {/* Right Side */}
  <div className="md:w-1/2 flex justify-center">
    <img
      src={assets.header_img}
      alt="Doctors"
      className="w-full max-w-md md:max-w-lg"
    />
  </div>
</div>
  )
}

export default Header