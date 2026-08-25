import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppointments } from "../adminAuthSlice";

const AdminAppointments = () => {
  const dispatch = useDispatch();

  const {
    appointments,
    appointmentLoading,
    appointmentError,
  } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    dispatch(getAllAppointments());
  }, [dispatch]);

  if (appointmentLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            All Appointments
          </h1>

          <div className="bg-white rounded-2xl shadow-sm border p-10 text-center">
            <p className="text-gray-500">
              Loading appointments...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (appointmentError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            All Appointments
          </h1>

          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <p className="text-red-600">
              {appointmentError}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            All Appointments
          </h1>

          <p className="text-gray-500 mt-2">
            Manage and monitor all patient appointments
          </p>
        </div>

        {/* Appointment count */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6">
          <p className="text-sm text-gray-500">
            Total Appointments
          </p>

          <p className="text-3xl font-bold text-[#5F6FFF] mt-1">
            {appointments.length}
          </p>
        </div>

        {/* No appointments */}
        {appointments.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-lg">
              No appointments found.
            </p>
          </div>
        ) : (

          /* Appointments */
          <div className="space-y-5">

            {appointments.map((appointment) => (

              <div
                key={appointment._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition duration-200 overflow-hidden"
              >

                {/* Top section */}
                <div className="p-6">

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

                    {/* Doctor */}
                    <div className="lg:col-span-4 flex items-center gap-4">

                      <img
                        src={appointment.docData?.image}
                        alt={appointment.docData?.firstname || "Doctor"}
                        className="w-20 h-20 rounded-xl object-cover border border-gray-200 bg-gray-100"
                      />

                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-400">
                          Doctor
                        </p>

                        <h2 className="text-lg font-semibold text-gray-800">
                          Dr. {appointment.docData?.firstname}
                        </h2>

                        <p className="text-sm text-[#5F6FFF] mt-1">
                          {appointment.docData?.speciality}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          {appointment.docData?.degree}
                        </p>
                      </div>

                    </div>


                    {/* Patient */}
                    <div className="lg:col-span-3">

                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Patient
                      </p>

                      <h3 className="font-semibold text-gray-800 mt-1">
                        {appointment.userData?.firstname}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {appointment.userData?.emailId}
                      </p>

                      {appointment.userData?.phone && (
                        <p className="text-sm text-gray-500 mt-1">
                          {appointment.userData.phone}
                        </p>
                      )}

                    </div>


                    {/* Date & Time */}
                    <div className="lg:col-span-2">

                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Appointment
                      </p>

                      <p className="font-semibold text-gray-800 mt-1">
                        {appointment.slotData}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {appointment.slotTime}
                      </p>

                    </div>


                    {/* Amount */}
                    <div className="lg:col-span-1">

                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Amount
                      </p>

                      <p className="font-bold text-gray-800 mt-1">
                        ₹{appointment.amount}
                      </p>

                    </div>


                    {/* Status */}
                    <div className="lg:col-span-2">

                      <div className="flex flex-col gap-2">

                        {/* Payment */}
                        {appointment.payment ? (
                          <span className="w-fit px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                            Payment Paid
                          </span>
                        ) : (
                          <span className="w-fit px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                            Payment Pending
                          </span>
                        )}

                        {/* Appointment status */}
                        {appointment.status === "cancelled" ? (
                          <span className="w-fit px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                            Cancelled
                          </span>
                        ) : appointment.status === "completed" ? (
                          <span className="w-fit px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                            Completed
                          </span>
                        ) : (
                          <span className="w-fit px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700">
                            Booked
                          </span>
                        )}

                      </div>

                    </div>

                  </div>

                </div>


                {/* Bottom section */}
                <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex flex-col md:flex-row justify-between gap-2">

                  <p className="text-xs text-gray-400 break-all">
                    Appointment ID: {appointment._id}
                  </p>

                  <p className="text-xs text-gray-400">
                    Booked on:{" "}
                    {appointment.date
                      ? new Date(
                          appointment.date
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default AdminAppointments;