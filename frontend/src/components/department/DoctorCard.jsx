import { Link } from "react-router-dom";
import { useState } from "react";

import AppointmentModal from "../../components/doctor/AppointmentModal";

import defaultMale from "../../assets/doctors/default-male.svg";
import defaultFemale from "../../assets/doctors/default-female.svg";
import { getDoctorPath } from "../../utils/doctorLinks";

export default function DoctorCard({ doctor = {} }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const doctorPath = getDoctorPath(doctor);

  const doctorImage =
    doctor.image ||
    (doctor.gender === "female"
      ? defaultFemale
      : defaultMale);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-slate-100">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">

            {/* Doctor Image */}
            <div className="flex justify-center">
              <img
                src={doctorImage}
                alt={doctor.name || "Doctor"}
                loading="lazy"
                className="w-40 h-40 rounded-xl object-cover border"
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#243B8F]">
                {doctor.name || "Unnamed Doctor"}
              </h3>

              <p className="text-[#C62828] font-medium mt-1">
                {doctor.designation || "Designation TBA"}
              </p>

              <p className="text-gray-600 mt-2">
                {doctor.qualifications ||
                  "Qualifications will be updated soon."}
              </p>

              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">
                    Department:
                  </span>{" "}
                  {doctor.department || "Department TBA"}
                </p>

                <p className="text-sm text-gray-700">
                  <span className="font-semibold">
                    Hospital:
                  </span>{" "}
                  {doctor.hospital || "Hospital TBA"}
                </p>

                <p className="text-sm text-gray-700">
                  <span className="font-semibold">
                    Experience:
                  </span>{" "}
                  {doctor.experience || "Experience TBA"}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={() => setSelectedDoctor(doctor)}
                  className="bg-[#243B8F] hover:bg-blue-900 text-white px-5 py-2 rounded-lg transition"
                >
                  Appointment
                </button>

                {doctorPath ? (
                  <Link
                    to={doctorPath}
                    className="border border-[#243B8F] text-[#243B8F] px-5 py-2 rounded-lg hover:bg-[#243B8F] hover:text-white transition"
                  >
                    Profile
                  </Link>
                ) : (
                  <span
                    className="cursor-not-allowed rounded-lg border border-gray-200 px-5 py-2 text-gray-400"
                    aria-disabled="true"
                    title="This doctor is missing an ID"
                  >
                    Profile
                  </span>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      {selectedDoctor && (
        <AppointmentModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </>
  );
}
