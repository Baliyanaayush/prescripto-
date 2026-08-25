import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
    >
      <h1 className="text-3xl font-semibold">
        Find by Speciality
      </h1>

      <p className="sm:w-1/2 text-center text-gray-600 text-sm">
        Simply browse through our extensive list of trusted doctors,
        schedule your appointment hassle-free.
      </p>

      <div className="w-full flex gap-6 pt-8 overflow-x-auto justify-start md:justify-center scrollbar-hide">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            onClick={()=>scrollTo(0,0)}
            className="flex flex-col items-center min-w-[120px] hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center shadow-sm">
              <img
                src={item.image}
                alt={item.speciality}
                className="w-16 h-16 object-contain"
              />
            </div>

            <p className="mt-4 text-sm font-medium text-center">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;