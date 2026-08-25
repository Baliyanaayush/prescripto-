import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useDispatch,useSelector } from "react-redux";
import { getProfile, updateProfile } from "../userAuthSlice";

const Myprofile = () => {
  const [userData, setUserData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.userAuth)

 
  useEffect(()=>{
    dispatch(getProfile())
  },[dispatch])

  useEffect(()=>{
    if(user){
      setUserData(user)
    }
  },[user])
const updateUserProfile = async()=>{
  const formData = new FormData()
  
  formData.append("firstname",userData.firstname)
  formData.append("phone",userData.phone)
  formData.append("dob",userData.dob)
  formData.append("gender",userData.gender)

  formData.append("address",JSON.stringify(userData.address))

  if(image){
    formData.append("image",image)
  }

  dispatch(updateProfile(formData))
  setIsEdit(false)
}

  if (!userData) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      No profile found
    </div>
  );
}

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl border border-gray-200 p-8">

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <label htmlFor="image">
  <img
    src={
      image
        ? URL.createObjectURL(image)
        : userData.image || assets.profile_pic
    }
    alt=""
    className="w-36 h-36 rounded-full object-cover border-4 border-[#5F6FFF] cursor-pointer"
  />
</label>

<input
  type="file"
  id="image"
  hidden
  onChange={(e) => setImage(e.target.files[0])}
/>

          <div className="mt-5">
            {isEdit ? (
              <input
                type="text"
                value={userData.firstname}
                onChange={(e) =>setUserData((prev) => ({...prev,firstname: e.target.value,}))
                }
                className="border rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-[#5F6FFF]"
              />
            ) : (
              <h2 className="text-3xl font-bold text-gray-800">
                {userData.firstname}
              </h2>
            )}
          </div>
        </div>

        <hr className="my-8" />

        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-semibold text-[#5F6FFF] mb-5">
            Contact Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <p className="font-medium">Email</p>
            <p>{userData.emailId}</p>

            <p className="font-medium">Phone</p>

            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#5F6FFF] outline-none"
              />
            ) : (
              <p>{userData.phone}</p>
            )}

            <p className="font-medium">Address</p>

            {isEdit ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={userData.address?.line1 || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line1: e.target.value,
                      },
                    }))
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />

                <input
                  type="text"
                  value={userData.address?.line2 || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line2: e.target.value,
                      },
                    }))
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            ) : (
              <div>
                <p>{userData?.address?.line1}</p>
                <p>{userData?.address?.line2}</p>
              </div>
            )}
          </div>
        </div>

        <hr className="my-8" />

        {/* Basic Information */}
        <div>
          <h3 className="text-xl font-semibold text-[#5F6FFF] mb-5">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <p className="font-medium">Gender</p>

            {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    gender: e.target.value,
                  }))
                }
                className="border rounded-lg px-3 py-2"
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}

            <p className="font-medium">Birthday</p>

            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    dob: e.target.value,
                  }))
                }
                className="border rounded-lg px-3 py-2"
              />
            ) : (
              <p>{userData.dob}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex justify-end gap-4">
          {isEdit ? (
            <button
              onClick={updateUserProfile}
              
              className="bg-[#5F6FFF] hover:bg-[#4d5df7] text-white px-8 py-2 rounded-lg transition"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="border border-[#5F6FFF] text-[#5F6FFF] hover:bg-[#5F6FFF] hover:text-white px-8 py-2 rounded-lg transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Myprofile;