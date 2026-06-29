import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../services/axios";
import {
  getDepartmentPath,
  logDepartmentsForDebugging,
} from "../../utils/departmentLinks";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get("/departments");

        logDepartmentsForDebugging("Home", res.data);

        setDepartments(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error(
          "Failed to fetch departments:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return (
      <section className="py-12 text-center">
        <p className="text-gray-500">
          Loading departments...
        </p>
      </section>
    );
  }

  return (
    <section
      id="departments"
      className="bg-slate-50 overflow-hidden scroll-mt-24 py-12 md:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="text-3xl font-bold text-[#243B8F] md:text-4xl">
            Our Departments
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Explore our specialized medical treatment
            departments.
          </p>
        </div>

        {departments.length === 0 ? (
          <div className="text-center text-gray-500">
            No departments found.
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div className="animate-scroll flex gap-4 md:gap-6">
              {[...departments, ...departments].map(
                (department, index) => {
                  const departmentPath =
                    getDepartmentPath(department);

                  return (
                    <div
                      key={`${department._id}-${index}`}
                      className="
                        group
                        min-w-[260px]
                        sm:min-w-[300px]
                        md:min-w-[320px]
                        bg-white
                        rounded-2xl
                        p-5
                        md:p-6
                        shadow-sm
                        border
                        border-slate-100
                        hover:shadow-xl
                        hover:-translate-y-2
                        transition-all
                        duration-300
                        flex
                        flex-col
                        items-center
                        text-center
                      "
                    >
                      {department.icon && (
                        <img
                          src={department.icon}
                          alt={department.title}
                          className="mb-4 h-12 w-12 object-contain md:h-14 md:w-14"
                        />
                      )}

                      <h3 className="mb-3 text-lg font-semibold text-slate-900 md:text-xl">
                        {department.title ||
                          "Untitled Department"}
                      </h3>

                      {departmentPath ? (
                        <Link
                          to={departmentPath}
                          className="mt-5 flex items-center gap-2 font-semibold text-[#243B8F] md:mt-6"
                        >
                          Learn More

                          <span className="transition-transform duration-300 group-hover:translate-x-2">
                            -&gt;
                          </span>
                        </Link>
                      ) : (
                        <span
                          className="mt-5 font-semibold text-gray-400 md:mt-6"
                          aria-disabled="true"
                          title="This department is missing a slug"
                        >
                          Details unavailable
                        </span>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
