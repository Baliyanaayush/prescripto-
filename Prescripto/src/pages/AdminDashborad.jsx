import React from "react";
import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  Users,
  CalendarDays,
  LayoutDashboard,
} from "lucide-react";
import AdminAppointments from "./AdminAppointments";

const Dashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Add Doctor",
      description: "Register a new doctor",
      icon: <UserPlus size={42} />,
      path: "/adddoctoradmin",
    },
    {
      title: "Doctors List",
      description: "View and manage doctors",
      icon: <Users size={42} />,
      path: "/admin/doctors",
    },
    {
      title: "Appointments",
      description: "Manage appointments",
      icon: <CalendarDays size={42} />,
      path: "/admin/appointments",
    },
    {
      title: "Dashboard",
      description: "View statistics",
      icon: <LayoutDashboard size={42} />,
      path: "/admin/dashboard",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">

      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Admin Dashboard
      </h1>

      <p className="text-gray-500 mb-10">
        Manage your Prescripto platform.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 hover:border-primary transition-all duration-300 p-8 flex flex-col items-center justify-center text-center"
          >
            <div className="text-primary mb-5">
              {card.icon}
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              {card.title}
            </h2>

            <p className="text-gray-500 mt-3">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;