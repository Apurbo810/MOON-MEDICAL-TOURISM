import { Link } from "react-router-dom";

export default function DepartmentCard({ department }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <img
        src={department.icon}
        alt={department.title}
        className="w-16 h-16 mb-4"
      />

      <h3 className="text-xl font-semibold mb-2">
        {department.title}
      </h3>

      <p className="text-gray-600 mb-4">
        {department.description}
      </p>

      <Link
        to={`/departments/${department.slug}`}
        className="text-[#243B8F] font-semibold"
      >
        Learn More →
      </Link>
    </div>
  );
}