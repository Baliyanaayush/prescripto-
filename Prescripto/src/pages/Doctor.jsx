import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const Doctor = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="px-6 md:px-10 lg:px-20 py-10">

      <h2 className="text-3xl font-bold text-gray-800">
        Browse Doctors
      </h2>

      <p className="text-gray-500 mt-2">
        Browse through our experienced doctors and book your appointment.
      </p>

      <div className="flex flex-col md:flex-row gap-10 mt-10">

        {/* Left Sidebar */}
        <div className="md:w-64 flex flex-col gap-4">

          {specialities.map((item) => (
            <button
              key={item}
              onClick={() =>
                speciality === item
                  ? navigate("/doctors")
                  : navigate(`/doctors/${item}`)
              }
              className={`text-left px-5 py-3 rounded-xl border transition duration-300
              ${
                speciality === item
                  ? "bg-[#5F6FFF] text-white border-[#5F6FFF]"
                  : "bg-white border-gray-300 hover:border-[#5F6FFF] hover:text-[#5F6FFF]"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

        {/* Doctors Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {filterDoc.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <div className="bg-[#EEF4FF]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
              </div>

              <div className="p-5">

                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>

                  <span className="text-green-600 text-sm font-medium">
                    Available
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h3>

                <p className="text-gray-500 mt-1">
                  {item.speciality}
                </p>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Doctor;