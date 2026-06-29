import { Link } from "react-router-dom";
import { getDepartmentPath } from "../../utils/departmentLinks";

export default function DepartmentCard({ department }) {
  const departmentPath =
    getDepartmentPath(department);

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

      {departmentPath ? (
        <Link
          to={departmentPath}
          className="text-[#243B8F] font-semibold"
        >
          Learn More -&gt;
        </Link>
      ) : (
        <span
          className="font-semibold text-gray-400"
          aria-disabled="true"
          title="This department is missing a slug"
        >
          Details unavailable
        </span>
      )}
    </div>
  );
}
