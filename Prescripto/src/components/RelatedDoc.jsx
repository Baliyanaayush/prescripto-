import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoc = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorData = doctors.filter(
        (doc) =>
          doc.speciality === speciality &&
          doc._id !== docId
      );

      setRelDoc(doctorData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Related Doctors
      </h2>

      <p className="text-center text-gray-500 mt-2">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {relDoc.map((item) => (
          <div
            key={item._id}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
          >
            <div className="bg-[#EEF4FF]">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-60 object-cover"
              />
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <span className="text-green-600 text-sm font-medium">
                  Available
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
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
  );
};

export default RelatedDoc;