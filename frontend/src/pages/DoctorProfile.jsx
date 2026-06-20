import { useParams } from "react-router-dom";
import { doctors } from "../data/doctors";
import { useState } from "react";

import AppointmentModal from "../components/doctor/AppointmentModal";
import defaultMale from "../assets/doctors/default-male.svg";
import defaultFemale from "../assets/doctors/default-female.svg";

export default function DoctorProfile() {
  const { id } = useParams();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const doctor = doctors.find(
    (d) => d.id === Number(id)
  );

  if (!doctor) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500">
            Doctor Not Found
          </h1>
        </div>
      </section>
    );
  }

  const image =
    doctor.image ||
    (doctor.gender === "female"
      ? defaultFemale
      : defaultMale);

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">

      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-gray-500">
        Home / Doctors / {doctor.name}
      </div>

      {/* Doctor Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid lg:grid-cols-[320px_1fr]">

          {/* Image */}
          <div className="bg-slate-50">
            <img
              src={image}
              alt={doctor.name}
              className="w-full h-full object-cover min-h-[400px]"
            />
          </div>

          {/* Content */}
          <div className="p-8">

            <h1 className="text-3xl font-bold text-[#243B8F]">
              {doctor.name}
            </h1>

            <p className="mt-3 text-xl text-gray-700">
              {doctor.designation}
            </p>

            <p className="mt-3 text-gray-600">
              {doctor.qualifications}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">

              <div>
                <h4 className="font-semibold text-slate-800">
                  Department
                </h4>

                <p className="text-gray-600">
                  {doctor.department}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800">
                  Hospital
                </h4>

                <p className="text-gray-600">
                  {doctor.hospital}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800">
                  Experience
                </h4>

                <p className="text-gray-600">
                  {doctor.experience}
                </p>
              </div>

            </div>

            <div className="flex flex-wrap gap-4 mt-10">
            <button
              onClick={() => setSelectedDoctor(doctor)}
              className="bg-[#243B8F] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1c3a72] transition"
            >
              Book Appointment
            </button>

              <a
                href="https://wa.me/8801323222266"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#243B8F] text-[#243B8F] px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
              >
                WhatsApp
              </a>
            </div>
            {selectedDoctor && (
              <AppointmentModal
                doctor={selectedDoctor}
                onClose={() => setSelectedDoctor(null)}
              />
            )}
          </div>
        </div>
      </div>
      {/* Schedule */}
      <div className="mt-10 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

        <h2 className="text-2xl font-bold text-[#243B8F] mb-6">
          Chamber Schedule
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-[#243B8F] text-white">
                <th className="p-4 text-left">
                  Day
                </th>

                <th className="p-4 text-left">
                  Consultation Time
                </th>
              </tr>
            </thead>

            <tbody>
              {doctor.schedule.map((item, index) => (
                <tr
                  key={index}
                  className="border-b"
                >
                  <td className="p-4">
                    {item.day}
                  </td>

                  <td className="p-4">
                    {item.time}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
      {/* Qualifications */}
      <div className="mt-10 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

        <h2 className="text-2xl font-bold text-[#243B8F] mb-6">
          Qualifications
        </h2>

        <p className="text-gray-700 leading-8">
          {doctor.qualifications}
        </p>

      </div>

      {/* About Doctor */}
      <div className="mt-10 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

        <h2 className="text-2xl font-bold text-[#243B8F] mb-6">
          About Doctor
        </h2>

        <p className="text-gray-700 leading-8">
          {doctor.about ||
            "Detailed doctor biography will be updated soon."}
        </p>

      </div>



    </section>
  );
}