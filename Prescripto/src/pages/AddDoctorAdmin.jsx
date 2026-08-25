import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../utils/axiosClient";

const AddDoctorAdmin = () => {
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const imageRegister = register("image", {
  required: "Doctor image is required",
});
  const submitData = async (data) => {
    try {



      const formData = new FormData();
      formData.append("image", data.image[0]);
      formData.append("firstname", data.firstname);
      formData.append("emailId", data.emailId);
      formData.append("password", data.password);
      formData.append("speciality", data.speciality);
      formData.append("degree", data.degree);
      formData.append("experience", data.experience);
      formData.append("about", data.about);
      formData.append("fees", data.fees);

      formData.append(
        "address",
        JSON.stringify({
          line1: data.address1,
          line2: data.address2,
        })
      );

   

      const response = await axiosClient.post(
        "/admin/add-doctor",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);
      reset();
      setPreview(null);
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8 flex justify-center items-start">
      <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl w-full max-w-5xl p-6 md:p-8 border border-gray-100 animate-fadeIn">
        
        {/* Header */}
        <div className="mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Add Doctor
          </h1>
          <p className="text-sm text-gray-500 mt-1">Register a new physician to the system</p>
        </div>

        <form
          onSubmit={handleSubmit(submitData)}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Image Upload */}
          
<div className="md:col-span-2 flex flex-col items-center bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-300">

  <img
    src={preview || "https://via.placeholder.com/120?text=Doctor"}
    alt="Doctor"
    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
  />

  <label className="mt-5 cursor-pointer bg-primary text-white px-5 py-2 rounded-lg">
    Upload Photo

    <input
      type="file"
      accept="image/*"
      className="hidden"
      {...imageRegister}
      onChange={(e) => {
        imageRegister.onChange(e);

        if (e.target.files && e.target.files[0]) {
          setPreview(URL.createObjectURL(e.target.files[0]));
        }
      }}
    />
  </label>

  {errors.image && (
    <p className="text-red-500 text-sm mt-2">
      {errors.image.message}
    </p>
  )}
</div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              Full Name <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              className={`w-full px-4 py-2.5 border-2 rounded-xl transition-all duration-200 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none ${
                errors.firstname 
                  ? "border-red-400 ring-4 ring-red-500/20" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
              {...register("firstname", {
                required: "Doctor name is required",
              })}
            />
            {errors.firstname && (
              <p className="text-red-500 text-xs font-medium">
                {errors.firstname.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              Email Address <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              className={`w-full px-4 py-2.5 border-2 rounded-xl transition-all duration-200 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none ${
                errors.emailId 
                  ? "border-red-400 ring-4 ring-red-500/20" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
              {...register("emailId", {
                required: "Email is required",
              })}
            />
            {errors.emailId && (
              <p className="text-red-500 text-xs font-medium">
                {errors.emailId.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              Password <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-gray-50/50 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-200"
              {...register("password", {
                required: "Password is required",
              })}
            />
          </div>

          {/* Speciality */}
          <div className="space-y-1.5">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              Speciality
            </label>
            <select
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-gray-50/50 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-200 cursor-pointer"
              {...register("speciality")}
            >
              {[
                "General physician",
                "Gynecologist",
                "Dermatologist",
                "Pediatricians",
                "Neurologist",
                "Gastroenterologist",
                "Cardiologist",
                "Orthopedic",
              ].map((spec) => (
                <option key={spec}>{spec}</option>
              ))}
            </select>
          </div>

          {/* Degree */}
          <div className="space-y-1.5">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              Medical Degree
            </label>
            <input
              type="text"
              placeholder="e.g., MD, MBBS"
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-gray-50/50 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-200"
              {...register("degree")}
            />
          </div>

          {/* Experience */}
          <div className="space-y-1.5">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              Experience
            </label>
            <select
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-gray-50/50 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-200 cursor-pointer"
              {...register("experience")}
            >
              {["1 Year", "2 Years", "3 Years", "5 Years", "10 Years", "15 Years", "20+ Years"].map((years) => (
                <option key={years}>{years}</option>
              ))}
            </select>
          </div>

          {/* Fees */}
          <div className="space-y-1.5">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              Consultation Fee (₹)
            </label>
            <input
              type="number"
              placeholder="e.g., 500"
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-gray-50/50 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-200"
              {...register("fees")}
            />
          </div>

          {/* Address Line 1 */}
          <div className="space-y-1.5">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              Address Line 1
            </label>
            <input
              placeholder="Street, locality"
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-gray-50/50 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-200"
              {...register("address1")}
            />
          </div>

          {/* Address Line 2 */}
          <div className="space-y-1.5">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              Address Line 2
            </label>
            <input
              placeholder="City, State, PIN"
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-gray-50/50 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-200"
              {...register("address2")}
            />
          </div>

          {/* About */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              About Doctor
            </label>
            <textarea
              rows={4}
              placeholder="Describe the doctor's expertise, achievements, and experience..."
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-gray-50/50 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-200 resize-y"
              {...register("about")}
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:shadow-xl hover:scale-[1.02] hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Adding Doctor...
                </>
              ) : (
                "Add Doctor"
              )}
            </button>
            
            <button
              type="button"
              onClick={() => {
                reset();
                setPreview(null);
              }}
              className="px-8 py-3.5 rounded-xl border-2 border-gray-300 text-gray-600 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              Clear All
            </button>
          </div>
        </form>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AddDoctorAdmin;