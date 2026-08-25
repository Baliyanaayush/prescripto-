import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getAllDoctors } from "../doctorSlice";
import { useEffect } from "react";
const TopDoctors = () => {

    const navigate  = useNavigate();
    const dispatch = useDispatch()
    const {doctors,loading} = useSelector((state)=>state.doctor)
 

    useEffect(()=>{
     dispatch(getAllDoctors())
    },[dispatch])

    if(!doctors)
    {
      return (
    <div className="text-center py-10">
      Loading Doctors...
    </div>
  );
    }
  return (
    <div className="bg-white py-16 px-6 md:px-12 lg:px-20">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Top Doctors to Book
        </h1>

        <p className="mt-3 text-gray-500 max-w-xl mx-auto">
          Simply browse through our extensive list of trusted doctors and book
          your appointment hassle-free.
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
       {doctors.slice(0, 10).map((item) => (
  <div
    key={item._id}
    onClick={() => navigate(`/appointment/${item._id}`)}
    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
  >
    <div className="bg-[#EEF4FF]">
      <img
        src={item.image}
        alt={item.firstname}
        className="w-full h-60 object-cover"
      />
    </div>

    <div className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
        <p className="text-green-600 text-sm font-medium">
          Available
        </p>
      </div>

      <h2 className="text-lg font-semibold text-gray-800">
        {item.firstname}
      </h2>

      <p className="text-gray-500 mt-1">
        {item.speciality}
      </p>
    </div>
  </div>
))}
      </div>

      {/* More Button */}
      <div className="flex justify-center mt-12">
        <button 
        onClick={()=>{navigate("/doctors"); scrollTo(0, 0);}}
        className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-[#4c5cff] transition duration-300">
          More
        </button>
      </div>
    </div>
  );
};

export default TopDoctors;