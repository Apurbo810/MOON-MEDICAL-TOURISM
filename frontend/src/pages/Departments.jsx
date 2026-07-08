import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../services/axios";
import {
  getDepartmentPath,
  logDepartmentsForDebugging,
} from "../utils/departmentLinks";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(8);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get("/departments");

        logDepartmentsForDebugging(
          "Departments Page",
          res.data
        );

        setDepartments(
          Array.isArray(res.data) ? res.data : []
        );
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const filteredDepartments = useMemo(() => {
    return departments.filter((department) =>
      department.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [departments, search]);

  const displayedDepartments = filteredDepartments.slice(
    0,
    visible
  );

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16">
      {/* Heading */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-[#243B8F]">
          Our Departments
        </h1>

        <p className="mt-3 text-gray-600">
          Explore our specialized medical treatment
          departments.
        </p>
      </div>

      {/* Search */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search department..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisible(8);
          }}
          className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-[#243B8F]"
        />
      </div>

      {/* Loading */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-2xl bg-gray-200"
            />
          ))}
        </div>
      ) : displayedDepartments.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          No departments found.
        </div>
      ) : (
        <>
          {/* Department Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedDepartments.map((department) => {
              const departmentPath =
                getDepartmentPath(department);

              if (departmentPath) {
                return (
                  <Link
                    key={department._id}
                    to={departmentPath}
                    className="group flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#243B8F] hover:shadow-xl"
                  >
                    {department.icon && (
                      <img
                        src={department.icon}
                        alt={department.title}
                        loading="lazy"
                        className="mb-5 h-14 w-14 object-contain"
                      />
                    )}

                    <h3 className="mb-4 text-xl font-semibold text-slate-900 transition-colors group-hover:text-[#243B8F]">
                      {department.title}
                    </h3>

                    <span className="mt-auto font-semibold text-[#243B8F] transition-all group-hover:text-[#00A99D]">
                      Learn More →
                    </span>
                  </Link>
                );
              }

              return (
                <div
                  key={department._id}
                  className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm"
                >
                  {department.icon && (
                    <img
                      src={department.icon}
                      alt={department.title}
                      loading="lazy"
                      className="mb-5 h-14 w-14 object-contain"
                    />
                  )}

                  <h3 className="mb-4 text-xl font-semibold text-slate-900">
                    {department.title}
                  </h3>

                  <span className="mt-auto text-gray-400">
                    Details unavailable
                  </span>
                </div>
              );
            })}
          </div>

          {/* Show More */}
          {visible < filteredDepartments.length && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() =>
                  setVisible((prev) => prev + 8)
                }
                className="rounded-xl bg-[#243B8F] px-8 py-3 font-semibold text-white transition hover:bg-[#1B2E70]"
              >
                Show More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}