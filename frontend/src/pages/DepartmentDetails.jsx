import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../services/axios";

import DoctorCard from "../components/department/DoctorCard";
import departmentBanner from "../assets/banners/department_banner.webp";
export default function DepartmentDetails() {
  const { slug } = useParams();
  const isValidSlug =
    typeof slug === "string" &&
    slug.trim() !== "" &&
    slug.trim().toLowerCase() !== "undefined" &&
    slug.trim().toLowerCase() !== "null";
  const normalizedSlug = isValidSlug
    ? slug.trim()
    : "";

  const [department, setDepartment] =
    useState(null);

  const [departmentDoctors, setDepartmentDoctors] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!isValidSlug) {
        setDepartment(null);
        setDepartmentDoctors([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // Fetch department
        const departmentRes =
          await axios.get(
            `/departments/${encodeURIComponent(
              normalizedSlug
            )}`
          );

        setDepartment(departmentRes.data);

        // Fetch doctors
        const doctorsRes =
          await axios.get(
            `/doctors?department=${encodeURIComponent(
              normalizedSlug
            )}`
          );

        console.log("Doctors API:", doctorsRes.data);

        setDepartmentDoctors(
          Array.isArray(doctorsRes.data)
            ? doctorsRes.data
            : []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isValidSlug, normalizedSlug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold">
          Department Not Found
        </h1>
      </div>
    );
  }

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm">
        <Link
          to="/"
          className="text-[#243B8F] font-medium"
        >
          Home
        </Link>

        <span className="mx-2">/</span>

        <span className="text-gray-500">
          {department.title}
        </span>
      </div>

      {/* Banner */}
      <div className="mb-10">
          <img
            src={departmentBanner}
            alt={department.title}
            className="w-full h-[250px] object-cover rounded-2xl"
          />
      </div>

      <div className="grid lg:grid-cols-[1fr_450px] gap-10">
        {/* Left */}
        <div>
          <h1 className="text-4xl font-bold text-[#243B8F] mb-6">
            {department.title}
          </h1>

          {department.icon && (
            <img
              src={department.icon}
              alt={department.title}
              className="w-20 h-20 object-contain mb-6"
            />
          )}

          <div className="text-gray-700 leading-8 whitespace-pre-wrap">
            {department.content || department.shortDescription}
          </div>
        </div>

        {/* Right */}
        <div>
          <h2 className="text-3xl font-bold text-[#243B8F] mb-6">
            Specialists
          </h2>

          <div className="space-y-6">
            {departmentDoctors.length >
            0 ? (
              departmentDoctors.map(
                (doctor) => (
                  <DoctorCard
                    key={doctor._id}
                    doctor={doctor}
                  />
                )
              )
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                <img
                  src="/doctors/no-doctor.webp"
                  alt="No Doctor"
                  className="w-28 mx-auto mb-5"
                />

                <h3 className="text-2xl font-semibold">
                  No Specialist Currently
                  Available
                </h3>

                <p className="text-gray-600 mt-3">
                  Please contact Moon
                  Medical Tourism for
                  assistance and specialist
                  referral.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
