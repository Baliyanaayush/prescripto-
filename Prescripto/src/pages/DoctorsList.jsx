import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getDoctors,deleteDoctor } from "../adminAuthSlice";

const DoctorsList = () => {
    
    const dispatch = useDispatch();
  const {doctors, loading, error } = useSelector((state) => state.adminAuth); 

 useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);


const handleDeleteDoctor = (doctorId) => {
  if (window.confirm('Are you sure you want to delete this doctor?')) {
    dispatch(deleteDoctor(doctorId));
  }
  
}


  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }


  if (error) {
    return (
      <div className="text-center mt-10 text-red-500 font-semibold ">
        {error}
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen ">
      {/* Heading */}
      <div className="flex justify-between items-center mb-8  ">
        <h1 className="text-3xl font-bold text-gray-800">
          Doctors List
        </h1>

        <p className="text-gray-500">
          Total Doctors :{" "}
          <span className="font-semibold">{doctors?.length || 0}</span>
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#5F6FFF] text-white">
            <tr>
              <th className="p-4 text-left">Doctor</th>
              <th className="p-4 text-left">Speciality</th>
              <th className="p-4 text-left">Experience</th>
              <th className="p-4 text-left">Fees</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {doctors?.map((doctor) => (
              <tr
                key={doctor._id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* Doctor */}
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={doctor.image}
                      alt={doctor.firstname}
                      className="w-14 h-14 rounded-full object-cover border"
                    />

                    <div>
                      <h2 className="font-semibold">
                        Dr. {doctor.firstname}
                      </h2>

                      <p className="text-gray-500 text-sm">
                        {doctor.emailId}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Speciality */}
                <td className="p-4">{doctor.speciality}</td>

                {/* Experience */}
                <td className="p-4">{doctor.experience}</td>

                {/* Fees */}
                <td className="p-4">₹{doctor.fees}</td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      doctor.available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {doctor.available ? "Available" : "Unavailable"}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                      Edit
                    </button>

                    <button 
                    onClick={()=>handleDeleteDoctor(doctor._id)}
                    className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-4 py-2 rounded-lg">
                      Delete
                    </button>

                    <button
                      className={`px-4 py-2 rounded-lg text-white ${
                        doctor.available
                          ? "bg-orange-500 hover:bg-orange-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {doctor.available ? "Disable" : "Enable"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {doctors?.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  No doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorsList;