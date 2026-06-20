
import { doctors } from "../data/doctors";
import DoctorCard from "../components/doctor/DoctorCard";

export default function Doctors() {
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {doctors.map((doctor) => (
            <DoctorCard
            key={doctor.id}
            doctor={doctor}
            />
        ))}
        </div>
    </section>
  );
}