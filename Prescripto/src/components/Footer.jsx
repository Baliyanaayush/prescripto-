import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo & About */}
          <div>
            <img
              src={assets.logo}
              alt="Logo"
              className="w-40 mb-5"
            />

            <p className="text-gray-600 leading-7">
              We make it simple to connect with trusted doctors and book
              appointments online. Our mission is to provide fast, reliable,
              and hassle-free healthcare services for everyone.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-5">
              COMPANY
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li className="hover:text-[#5F6FFF] cursor-pointer transition">
                Home
              </li>
              <li className="hover:text-[#5F6FFF] cursor-pointer transition">
                About Us
              </li>
              <li className="hover:text-[#5F6FFF] cursor-pointer transition">
                Contact Us
              </li>
              <li className="hover:text-[#5F6FFF] cursor-pointer transition">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-5">
              GET IN TOUCH
            </h3>

            <div className="space-y-3 text-gray-600">
              <p>+91 98765 43210</p>
              <p>support@prescripto.com</p>
              <p>New Delhi, India</p>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Prescripto. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;