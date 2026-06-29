import { Link } from "react-router-dom";
import { useState } from "react";
import AppointmentModal from "../../components/doctor/AppointmentModal";
import defaultMale from "../../assets/doctors/default-male.svg";
import defaultFemale from "../../assets/doctors/default-female.svg";
import { getDoctorPath } from "../../utils/doctorLinks";

export default function DoctorCard({ doctor = {} }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const doctorPath = getDoctorPath(doctor);

  const image =
    doctor.image ||
    (doctor.gender === "female"
      ? defaultFemale
      : defaultMale);

  return (
    <article className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-slate-200">
      {/* Image */}
      {doctorPath ? (
        <Link to={doctorPath}>
          <div className="overflow-hidden">
            <img
              src={image}
              alt={doctor.name || "Doctor"}
              className="w-full h-[320px] object-cover hover:scale-105 transition duration-500"
            />
          </div>
        </Link>
      ) : (
        <div className="overflow-hidden">
          <img
            src={image}
            alt={doctor.name || "Doctor"}
            className="w-full h-[320px] object-cover hover:scale-105 transition duration-500"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {doctorPath ? (
          <Link to={doctorPath}>
            <h3 className="text-xl font-bold text-slate-900 hover:text-[#243B8F] transition">
              {doctor.name || "Unnamed Doctor"}
            </h3>
          </Link>
        ) : (
          <h3 className="text-xl font-bold text-slate-900">
            {doctor.name || "Unnamed Doctor"}
          </h3>
        )}

        <p className="mt-3 text-gray-600">
          {doctor.designation || "Designation TBA"}
        </p>

        <p className="text-sm text-gray-500">
          {doctor.hospital || "Hospital TBA"}
        </p>

        <div className="mt-4">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-700">
            {doctor.department || "Department TBA"}
          </span>
        </div>

        <div className="mt-auto pt-6 flex gap-3">
          {doctorPath ? (
            <Link
              to={doctorPath}
              className="flex-1 text-center border border-[#243B8F] text-[#243B8F] py-2 rounded-lg font-medium hover:bg-blue-50"
            >
              Profile
            </Link>
          ) : (
            <span
              className="flex-1 cursor-not-allowed rounded-lg border border-gray-200 py-2 text-center font-medium text-gray-400"
              aria-disabled="true"
              title="This doctor is missing an ID"
            >
              Profile
            </span>
          )}

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
