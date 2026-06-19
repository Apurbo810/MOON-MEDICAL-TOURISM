import { useParams, Link } from "react-router-dom";
import { departments } from "../data/departments";
import { doctors } from "../data/doctors";
import DoctorCard from "../components/department/DoctorCard";

export default function DepartmentDetails() {
  const { slug } = useParams();

  const department = departments.find(
    (d) => d.slug === slug
  );

  if (!department) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold">
          Department Not Found
        </h1>
      </div>
    );
  }

  const departmentDoctors = doctors.filter(
    (doctor) => doctor.departmentSlug === slug
  );

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
          src={department.banner}
          alt={department.title}
          className="w-full h-[350px] object-cover rounded-2xl"
        />
      </div>

      <div className="grid lg:grid-cols-[1fr_450px] gap-10">
        {/* Left */}
        <div>
          <h1 className="text-4xl font-bold text-[#243B8F] mb-6">
            {department.title}
          </h1>

          <p className="text-gray-700 leading-8">
            {department.description}
          </p>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">
              Services
            </h2>

            <ul className="space-y-3">
              <li>✓ Specialist Consultation</li>
              <li>✓ Advanced Diagnosis</li>
              <li>✓ Treatment Planning</li>
              <li>✓ Follow-up Care</li>
              <li>✓ International Patient Support</li>
            </ul>
          </div>
        </div>

        {/* Right */}
        <div>
          <h2 className="text-3xl font-bold text-[#243B8F] mb-6">
            Specialists
          </h2>

          <div className="space-y-6">
            {departmentDoctors.length > 0 ? (
              departmentDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                />
              ))
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                <img
                  src="/doctors/no-doctor.webp"
                  alt="No Doctor"
                  className="w-28 mx-auto mb-5"
                />

                <h3 className="text-2xl font-semibold">
                  No Specialist Currently Available
                </h3>

                <p className="text-gray-600 mt-3">
                  Please contact Moon Medical Tourism
                  for assistance and specialist referral.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}