import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/axios";

import AppointmentModal from "../components/doctor/AppointmentModal";
import defaultMale from "../assets/doctors/default-male.svg";
import defaultFemale from "../assets/doctors/default-female.svg";

function isValidDoctorId(id) {
  if (typeof id !== "string") {
    return false;
  }

  const normalizedId = id.trim().toLowerCase();

  return (
    normalizedId !== "" &&
    normalizedId !== "undefined" &&
    normalizedId !== "null" &&
    /^[a-f\d]{24}$/i.test(normalizedId)
  );
}

function formatScheduleTime(timeItem) {
  if (timeItem.time) {
    return timeItem.time;
  }

  if (timeItem.startTime && timeItem.endTime) {
    return `${timeItem.startTime} - ${timeItem.endTime}`;
  }

  return "Time TBA";
}

export default function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [selectedDoctor, setSelectedDoctor] =
    useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      if (!isValidDoctorId(id)) {
        setDoctor(null);
        setError("");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `/doctors/${encodeURIComponent(id.trim())}`
        );

        console.log("Doctors API:", response.data);

        setDoctor(response.data);
      } catch (fetchError) {
        console.error(
          "Failed to fetch doctor:",
          fetchError
        );

        if (fetchError.response?.status === 404) {
          setDoctor(null);
        } else {
          setError(
            "Unable to load this doctor right now. Please try again later."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center text-gray-500">
          Loading doctor profile...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-center text-red-600">
          {error}
        </div>
      </section>
    );
  }

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

  const groupedSchedule = (
    Array.isArray(doctor.schedule)
      ? doctor.schedule
      : []
  ).reduce((acc, item) => {
    const day = item.day || "Day TBA";
    const existingDay = acc.find(
      (dayGroup) => dayGroup.day === day
    );

    if (existingDay) {
      existingDay.times.push(item);
    } else {
      acc.push({
        day,
        times: [item],
      });
    }

    return acc;
  }, []);

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">

      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-gray-500">
        Home / Doctors / {doctor.name || "Doctor"}
      </div>

      {/* Doctor Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid lg:grid-cols-[320px_1fr]">

          {/* Image */}
          <div className="bg-slate-50">
            <img
              src={image}
              alt={doctor.name || "Doctor"}
              className="w-full h-full object-cover min-h-[400px]"
            />
          </div>

          {/* Content */}
          <div className="p-8">

            <h1 className="text-3xl font-bold text-[#243B8F]">
              {doctor.name || "Unnamed Doctor"}
            </h1>

            <p className="mt-3 text-xl text-gray-700">
              {doctor.designation || "Designation TBA"}
            </p>

            <p className="mt-3 text-gray-600">
              {doctor.qualifications ||
                "Qualifications will be updated soon."}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">

              <div>
                <h4 className="font-semibold text-slate-800">
                  Department
                </h4>

                <p className="text-gray-600">
                  {doctor.department || "Department TBA"}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800">
                  Hospital
                </h4>

                <p className="text-gray-600">
                  {doctor.hospital || "Hospital TBA"}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800">
                  Experience
                </h4>

                <p className="text-gray-600">
                  {doctor.experience || "Experience TBA"}
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
              {groupedSchedule.length > 0 ? (
                groupedSchedule.map(
                  (dayGroup, index) => (
                    <tr
                      key={index}
                      className="border-b"
                    >
                      <td className="p-4">
                        {dayGroup.day}
                      </td>

                      <td className="p-4">
                        <div className="flex flex-col gap-2">
                          {dayGroup.times.map(
                            (
                              timeItem,
                              timeIndex
                            ) => (
                              <span
                                key={timeIndex}
                              >
                                {formatScheduleTime(timeItem)}
                              </span>
                            )
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="p-6 text-center text-gray-500"
                  >
                    No schedule available
                  </td>
                </tr>
              )}
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
          {doctor.qualifications ||
            "Qualifications will be updated soon."}
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
