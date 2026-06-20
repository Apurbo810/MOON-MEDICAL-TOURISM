import { Link } from "react-router-dom";
import { useState } from "react";

import AppointmentModal from "../../components/doctor/AppointmentModal";

import defaultMale from "../../assets/doctors/default-male.svg";
import defaultFemale from "../../assets/doctors/default-female.svg";

export default function DoctorCard({ doctor }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

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
                alt={doctor.name}
                loading="lazy"
                className="w-40 h-40 rounded-xl object-cover border"
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#243B8F]">
                {doctor.name}
              </h3>

              <p className="text-[#C62828] font-medium mt-1">
                {doctor.designation}
              </p>

              <p className="text-gray-600 mt-2">
                {doctor.qualifications}
              </p>

              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">
                    Department:
                  </span>{" "}
                  {doctor.department}
                </p>

                <p className="text-sm text-gray-700">
                  <span className="font-semibold">
                    Hospital:
                  </span>{" "}
                  {doctor.hospital}
                </p>

                <p className="text-sm text-gray-700">
                  <span className="font-semibold">
                    Experience:
                  </span>{" "}
                  {doctor.experience}
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

                <Link
                  to={`/doctors/${doctor.id}`}
                  className="border border-[#243B8F] text-[#243B8F] px-5 py-2 rounded-lg hover:bg-[#243B8F] hover:text-white transition"
                >
                  Profile
                </Link>
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