import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myappointment, cancelAppointment, paymentRazorPay,verifyRazorPayPayment } from "../appointmentSlice";

const MyAppointment = () => {
  const dispatch = useDispatch();

  const {
    appointments,
    loading,
    error,
    paymentLoading,
    paymentLoadingId,
    paymentError,
  } = useSelector((state) => state.appointment);

  // Get user's appointments when page loads
  useEffect(() => {
    dispatch(myappointment());
  }, [dispatch]);

  // Cancel appointment
  const handleCancelAppointment = (appointmentId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    )

    if (!confirmCancel) {
      return;
    }

    dispatch(cancelAppointment(appointmentId));
  };

  //handle payment
  const handlePayment = async (appointmentId) => {
    try {
      // 1. Create Razorpay order
      const result = await dispatch(
        paymentRazorPay(appointmentId)
      ).unwrap();

      console.log("RAZORPAY ORDER:", result);

      const order = result.order;

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "Prescripto",

        description: "Doctor Appointment",

        order_id: order.id,

        handler: async function (response) {

          console.log(
            "RAZORPAY RESPONSE:",
            response
          );

          // 3. Verify payment on backend
          await dispatch(
            verifyRazorPayPayment({
              appointmentId,

              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature,
            })
          ).unwrap();

          alert(
            "Payment successful!"
          );

          // 4. Refresh appointments
          dispatch(myappointment());
        },

        prefill: {
          name: "Your Name",
          email: "your@email.com",
          contact: "9999999999",
        },

        theme: {
          color: "#5F6FFF",
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();

    } catch (error) {
      console.log("PAYMENT ERROR:", error);

      alert(
        error?.message ||
        "Payment failed"
      );
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
          My Appointments
        </h2>

        <p className="mt-6 text-gray-500">
          Loading appointments...
        </p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
          My Appointments
        </h2>

        <p className="mt-6 text-red-500">
          {error}
        </p>
      </div>
    );
  }

  // No appointments
  if (!appointments?.length) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
          My Appointments
        </h2>

        <p className="mt-6 text-gray-500">
          You don't have any appointments.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
        My Appointments
      </h2>

      <div className="mt-6 space-y-6">

        {appointments.map((item) => (

          <div
            key={item._id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col md:flex-row gap-6"
          >

            {/* Doctor Image */}
            <div className="flex justify-center md:block">

              <img
                src={item.docData?.image}
                alt={item.docData?.name}
                className="w-36 h-36 object-cover rounded-lg bg-[#EEF2FF]"
              />

            </div>

            {/* Doctor Details */}
            <div className="flex-1">

              <h3 className="text-xl font-semibold text-gray-800">
                {item.docData?.name}
              </h3>

              <p className="text-[#5F6FFF] font-medium mt-1">
                {item.docData?.speciality}
              </p>

              {/* Address */}
              <div className="mt-4">

                <p className="font-semibold text-gray-700">
                  Address
                </p>

                <p className="text-gray-500">
                  {item.docData?.address?.line1}
                </p>

                <p className="text-gray-500">
                  {item.docData?.address?.line2}
                </p>

              </div>

              {/* Date & Time */}
              <div className="mt-4">

                <span className="font-semibold text-gray-700">
                  Date & Time:
                </span>

                <span className="ml-2 text-gray-600">
                  {item.slotData} | {item.slotTime}
                </span>

              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-col justify-center gap-3 md:w-52">

              {/* Pay */}
              <button
                onClick={() => handlePayment(item._id)}
                disabled={
                  (paymentLoading && paymentLoadingId === item._id) ||
                  item.payment
                }
                className={`w-full py-2 rounded-lg transition duration-200 text-white ${item.payment
                    ? "bg-green-500 cursor-not-allowed"
                    : paymentLoadingId === item._id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#5F6FFF] hover:bg-[#4D5DF7]"
                  }`}
              >
                {item.payment
                  ? "Paid"
                  : paymentLoadingId === item._id
                    ? "Processing..."
                    : "Pay Online"}
              </button>

              {/* Cancel */}
              <button
                onClick={() =>
                  handleCancelAppointment(item._id)
                }
                className="w-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-2 rounded-lg transition duration-200"
              >
                Cancel Appointment
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default MyAppointment;