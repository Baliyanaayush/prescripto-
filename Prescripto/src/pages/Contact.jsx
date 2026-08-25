import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="py-12">

      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-800">
          CONTACT <span className="text-[#5F6FFF]">US</span>
        </h1>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col md:flex-row items-center gap-12">

        {/* Left Side - Image Placeholder */}
        <div className="flex-1 flex justify-center">
  <div className="w-full max-w-md h-[420px] overflow-hidden rounded-2xl shadow-lg">
    <img
      src={assets.contact_image}
      alt="Contact"
      className="w-full h-full object-cover"
    />
  </div>
</div>

        {/* Right Side - Contact Details */}
        <div className="flex-1">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            OUR OFFICE
          </h2>

          <div className="space-y-4 text-gray-600 leading-7">

            <p>
              54709 Willms Station
              <br />
              Suite 350, Washington, USA
            </p>

            <p>
              <span className="font-semibold text-gray-800">
                Tel:
              </span>{" "}
              (415) 555-0132
            </p>

            <p>
              <span className="font-semibold text-gray-800">
                Email:
              </span>{" "}
              support@prescripto.com
            </p>

          </div>

          <div className="mt-10">

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              CAREERS AT PRESCRIPTO
            </h3>

            <p className="text-gray-600 leading-7 mb-6">
              Learn more about our teams, company culture, and current
              openings. We'd love to hear from passionate people who want
              to make healthcare more accessible.
            </p>

            <button className="border border-[#5F6FFF] text-[#5F6FFF] px-8 py-3 rounded-full font-medium hover:bg-[#5F6FFF] hover:text-white transition duration-300">
              Explore Jobs
            </button>

          </div>

        </div>

      </div>

      {/* Contact Form */}
      

    </div>
  );
};

export default Contact;