import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="py-12">

      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-800">
          ABOUT <span className="text-[#5F6FFF]">US</span>
        </h1>
      </div>

      {/* About Section */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-12">

        {/* Left Content */}
        <div className="flex-1">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Welcome to Prescripto
          </h2>

          <p className="text-gray-600 leading-8 mb-6">
            Welcome to <span className="font-semibold">Prescripto</span>,
            your trusted partner in managing your healthcare needs
            conveniently and efficiently. We understand the challenges
            individuals face when it comes to scheduling doctor
            appointments and managing their health records.
          </p>

          <p className="text-gray-600 leading-8 mb-6">
            Prescripto is committed to delivering an exceptional healthcare
            experience by connecting patients with experienced and verified
            doctors. Our platform provides a seamless appointment booking
            process while ensuring transparency, convenience, and trust.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Our Vision
          </h3>

          <p className="text-gray-600 leading-8">
            Our vision is to create a healthcare ecosystem where accessing
            quality medical care is effortless for everyone. We strive to
            bridge the gap between patients and healthcare professionals
            through innovative technology and exceptional service.
          </p>

        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">

          <img
            src={assets.about_image}
            alt="About"
            className="rounded-2xl shadow-lg w-full max-w-md"
          />

        </div>

      </div>

      {/* Why Choose Us */}
      <div className="mt-20">

        <h2 className="text-3xl font-bold text-center text-gray-800">
          WHY <span className="text-[#5F6FFF]">CHOOSE US</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

          {/* Card 1 */}
          <div className="border rounded-2xl p-8 hover:bg-[#5F6FFF] hover:text-white transition-all duration-300 group">

            <h3 className="text-xl font-semibold mb-4">
              Efficiency
            </h3>

            <p className="text-gray-600 group-hover:text-white leading-7">
              Book appointments in just a few clicks with our simple,
              fast, and user-friendly platform.
            </p>

          </div>

          {/* Card 2 */}
          <div className="border rounded-2xl p-8 hover:bg-[#5F6FFF] hover:text-white transition-all duration-300 group">

            <h3 className="text-xl font-semibold mb-4">
              Convenience
            </h3>

            <p className="text-gray-600 group-hover:text-white leading-7">
              Access trusted doctors anytime, anywhere, without waiting
              in long queues or making multiple phone calls.
            </p>

          </div>

          {/* Card 3 */}
          <div className="border rounded-2xl p-8 hover:bg-[#5F6FFF] hover:text-white transition-all duration-300 group">

            <h3 className="text-xl font-semibold mb-4">
              Personalization
            </h3>

            <p className="text-gray-600 group-hover:text-white leading-7">
              Get healthcare recommendations tailored to your needs and
              maintain all your appointments in one place.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default About;