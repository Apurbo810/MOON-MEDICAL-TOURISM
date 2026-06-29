import { useEffect, useMemo, useState } from "react";
import axios from "../services/axios";
import DoctorCard from "../components/doctor/DoctorCard";
import { getDoctorId } from "../utils/doctorLinks";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get("/doctors");

        console.log("Doctors API:", response.data);

        setDoctors(
          Array.isArray(response.data)
            ? response.data
            : []
        );
      } catch (fetchError) {
        console.error(
          "Failed to fetch doctors:",
          fetchError
        );
        setError(
          "Unable to load doctors right now. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const departments = useMemo(() => {
    return [
      ...new Set(
        doctors
          .map((doctor) => doctor.department)
          .filter(Boolean)
      ),
    ];
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    const normalizedSearchTerm =
      searchTerm.trim().toLowerCase();

    return doctors.filter((doctor) => {
      const matchesSearch =
        normalizedSearchTerm === "" ||
        [
          doctor.name,
          doctor.designation,
          doctor.department,
          doctor.hospital,
          doctor.qualifications,
        ]
          .filter(Boolean)
          .some((value) =>
            value
              .toLowerCase()
              .includes(normalizedSearchTerm)
          );

      const matchesDepartment =
        selectedDepartment === "" ||
        doctor.department === selectedDepartment;

      return matchesSearch && matchesDepartment;
    });
  }, [doctors, searchTerm, selectedDepartment]);

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-[#243B8F]">
          Our Doctors
        </h1>

        <p className="mt-4 text-gray-600">
          Meet our experienced specialists and consultants.
        </p>
      </div>

      <div className="mb-10 grid gap-4 md:grid-cols-[1fr_260px]">
        <input
          type="search"
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
          placeholder="Search doctors"
          className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-[#243B8F] focus:ring-2 focus:ring-blue-100"
        />

        <select
          value={selectedDepartment}
          onChange={(event) =>
            setSelectedDepartment(event.target.value)
          }
          className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-[#243B8F] focus:ring-2 focus:ring-blue-100"
        >
          <option value="">All Departments</option>

          {departments.map((department) => (
            <option
              key={department}
              value={department}
            >
              {department}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="py-16 text-center text-gray-500">
          Loading doctors...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-center text-red-600">
          {error}
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          No doctors found.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredDoctors.map((doctor, index) => (
            <DoctorCard
              key={getDoctorId(doctor) || index}
              doctor={doctor}
            />
          ))}
        </div>
      )}
    </section>
  );
}
