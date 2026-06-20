import { Link } from "react-router-dom";
import { useState } from "react";
import AppointmentModal from "../../components/doctor/AppointmentModal";
import defaultMale from "../../assets/doctors/default-male.svg";
import defaultFemale from "../../assets/doctors/default-female.svg";

export default function DoctorCard({ doctor }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const image =
    doctor.image ||
    (doctor.gender === "female"
      ? defaultFemale
      : defaultMale);

  return (
    <article className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-slate-200">
      {/* Image */}
      <Link to={`/doctors/${doctor.id}`}>
        <div className="overflow-hidden">
          <img
            src={image}
            alt={doctor.name}
            className="w-full h-[320px] object-cover hover:scale-105 transition duration-500"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/doctors/${doctor.id}`}>
          <h3 className="text-xl font-bold text-slate-900 hover:text-[#243B8F] transition">
            {doctor.name}
          </h3>
        </Link>

        <p className="mt-3 text-gray-600">
          {doctor.designation}
        </p>

        <p className="text-sm text-gray-500">
          {doctor.hospital}
        </p>

        <div className="mt-4">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-700">
            {doctor.department}
          </span>
        </div>

        <div className="mt-auto pt-6 flex gap-3">
          <Link
            to={`/doctors/${doctor.id}`}
            className="flex-1 text-center border border-[#243B8F] text-[#243B8F] py-2 rounded-lg font-medium hover:bg-blue-50"
          >
            Profile
          </Link>

          <button
            onClick={() => setSelectedDoctor(doctor)}
            className="bg-[#243B8F] text-white px-4 py-2 rounded-lg"
          >
            Appointment
          </button>
        </div>

        {selectedDoctor && (
          <AppointmentModal
            doctor={selectedDoctor}
            onClose={() => setSelectedDoctor(null)}
          />
        )}
      </div>
    </article>
  );
}