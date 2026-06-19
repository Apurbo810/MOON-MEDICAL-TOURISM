    import { departments } from "../data/departments";
    import DepartmentCard from "../components/department/DepartmentCard";

    export default function Departments() {
    return (
        <section className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-[#243B8F]">
            Our Departments
            </h1>

            <p className="mt-4 text-gray-600">
            Explore our specialized treatment departments.
            </p>
        </div>

        {departments?.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((department) => (
                <DepartmentCard
                key={department.id}
                department={department}
                />
            ))}
            </div>
        ) : (
            <div className="text-center text-gray-500">
            No departments available.
            </div>
        )}
        </section>
    );
    }