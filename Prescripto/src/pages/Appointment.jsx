import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../assets/assets";
import { bookAppointment } from "../appointmentSlice";
import { getAllDoctors } from "../doctorSlice";
// import RelatedDoc from "../components/RelatedDoc";

const Appointment = () => {
  console.log("renderes")
  const { docId } = useParams();
  const dispatch = useDispatch();

  // Get doctors from Redux
const { doctors } = useSelector((state) => state.doctor);
  // Appointment state
  const {
    success,
    error,
  } = useSelector((state) => state.appointment);

  // Doctor information
  const [docinfo, setDocinfo] = useState(null);

 useEffect(() => {
    if (!doctors.length) {
      dispatch(getAllDoctors());
    }
  }, [dispatch, doctors.length]);


  
  // Slots
  const [docslot, setDocSlot] = useState([]);
  const [docslotIndex, setDocSlotIndex] = useState(0);
  const [docslotTime, setDocSlotTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // --------------------------------
  // Find doctor using docId
  // --------------------------------
 const fetchDocInfo = () => {
  console.log("URL docId:", docId);
  console.log("Doctors:", doctors);

  const doctor = doctors.find(
    (doc) => doc._id === docId
  );

  console.log("Found doctor:", doctor);

  setDocinfo(doctor);
};

  // --------------------------------
  // Generate available slots
  // --------------------------------
  const getAvailableSlot = () => {
    const slots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);

      currentDate.setDate(
        today.getDate() + i
      );

      let endTime = new Date(currentDate);

      endTime.setHours(21, 0, 0, 0);

      // Today's slots
      if (
        today.getDate() ===
        currentDate.getDate()
      ) {
        currentDate.setHours(
          currentDate.getHours() > 10
            ? currentDate.getHours() + 1
            : 10
        );

        currentDate.setMinutes(
          currentDate.getMinutes() > 30
            ? 30
            : 0
        );
      }

      // Future days
      else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const timeSlots = [];

      while (currentDate < endTime) {
        timeSlots.push({
          datetime: new Date(currentDate),

          time: currentDate.toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
        });

        currentDate.setMinutes(
          currentDate.getMinutes() + 30
        );
      }

      slots.push(timeSlots);
    }

    setDocSlot(slots);

    // Select today's date by default
    if (slots[0]?.length) {
      setSelectedDate(
        slots[0][0].datetime
          .toISOString()
          .split("T")[0]
      );
    }
  };

  // --------------------------------
  // Find doctor when doctors/docId changes
  // --------------------------------
  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  // --------------------------------
  // Generate slots
  // --------------------------------
  useEffect(() => {
    if (docinfo) {
      getAvailableSlot();
    }
  }, [docinfo]);

  // --------------------------------
  // Book appointment
  // --------------------------------
  const handleBookAppointment = () => {
    if (!selectedDate) {
      alert("Please select a date");
      return;
    }

    if (!docslotTime) {
      alert("Please select a time");
      return;
    }

    dispatch(
      bookAppointment({
        docId,
        slotDate: selectedDate,
        slotTime: docslotTime,
      })
    );
  };

  // --------------------------------
  // Success message
  // --------------------------------
  useEffect(() => {
    if (success) {
      setDocSlotTime("");
      alert("Appointment booked successfully!");
    }
  }, [success]);

  // --------------------------------
  // Doctor not found
  // --------------------------------
  if (!docinfo) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-500">
          Doctor not found
        </p>
      </div>
    );
  }
  return (
    <div className="py-10">

      {/* =========================
          Doctor Details
      ========================== */}
      <div className="flex flex-col md:flex-row gap-8">

        {/* Doctor Image */}
        <div className="md:w-1/3">
          <div className="bg-[#5F6FFF] rounded-2xl overflow-hidden">
            <img
              src={docinfo.image}
              alt={docinfo.firstname}
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* Doctor Info */}
        <div className="flex-1 border border-gray-200 rounded-2xl p-8 bg-white shadow-sm">

          {/* Name */}
          <h1 className="inline-flex items-center gap-2 text-3xl font-bold text-gray-800">
            {docinfo.firstname}

            <img
              src={assets.verified_icon}
              alt="Verified"
              className="w-5 h-5"
            />
          </h1>

          {/* Degree & Speciality */}
          <div className="flex flex-wrap items-center gap-3 mt-3">

            <p className="text-gray-600">
              {docinfo.degree}
            </p>

            <span className="px-3 py-1 text-sm border border-[#5F6FFF] text-[#5F6FFF] rounded-full">
              {docinfo.speciality}
            </span>

          </div>

          {/* Experience */}
          <div className="mt-6">

            <span className="font-semibold text-gray-800">
              Experience:
            </span>

            <span className="ml-2 text-gray-600">
              {docinfo.experience}
            </span>

          </div>

          {/* About */}
          <div className="mt-6">

            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              About
            </h2>

            <p className="text-gray-600 leading-7">
              {docinfo.about}
            </p>

          </div>

          {/* Fees */}
          <div className="mt-6">

            <span className="font-semibold text-gray-800">
              Appointment Fee:
            </span>

            <span className="text-[#5F6FFF] font-bold text-xl ml-2">
              ₹{docinfo.fees}
            </span>

          </div>

        </div>
      </div>

      {/* =========================
          Available Days
      ========================== */}
      <div className="mt-10">

        <h2 className="text-xl font-semibold mb-5">
          Available Days
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-3">

          {docslot.map((item, index) => {

            const date = item[0]?.datetime;

            return (
              <button
                key={index}
                onClick={() => {

                  setDocSlotIndex(index);

                  if (date) {
                    setSelectedDate(
                      date
                        .toISOString()
                        .split("T")[0]
                    );
                  }

                  // Reset time when date changes
                  setDocSlotTime("");
                }}
                className={`min-w-[70px] rounded-full border py-3 transition ${
                  docslotIndex === index
                    ? "bg-[#5F6FFF] text-white"
                    : "border-gray-300 text-gray-600"
                }`}
              >

                <p>
                  {date &&
                    date.toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                      }
                    )}
                </p>

                <p className="font-semibold">
                  {date?.getDate()}
                </p>

              </button>
            );
          })}

        </div>
      </div>

      {/* =========================
          Available Time
      ========================== */}
      <div className="mt-8">

        <h2 className="text-xl font-semibold mb-4">
          Available Time
        </h2>

        <div className="flex gap-3 overflow-x-auto pb-2">

          {docslot.length > 0 &&
            docslot[docslotIndex]?.map(
              (item, index) => (

                <button
                  key={index}
                  onClick={() =>
                    setDocSlotTime(item.time)
                  }
                  className={`px-5 py-2 rounded-full border whitespace-nowrap transition ${
                    docslotTime === item.time
                      ? "bg-[#5F6FFF] text-white"
                      : "border-gray-300"
                  }`}
                >
                  {item.time}
                </button>

              )
            )}

        </div>
      </div>

      {/* =========================
          Book Appointment
      ========================== */}
      <div className="mt-8">

      <button
  onClick={handleBookAppointment}
  className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-[#4c5cff] transition duration-300"
>
  Book Appointment
</button>

      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 mt-4">
          {error}
        </p>
      )}

      {/* Success */}
      {success && (
        <p className="text-green-500 mt-4">
          Appointment booked successfully!
        </p>
      )}

      {/* =========================
          Related Doctors
      ========================== */}

      {/* 
      <RelatedDoc
        docId={docId}
        speciality={docinfo.speciality}
      />
      */}

    </div>
  );
};

export default Appointment;