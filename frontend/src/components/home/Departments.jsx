import { Link } from "react-router-dom";
import { departments } from "../../data/departments";

export default function Departments() {
  return (
    <section
      id="departments"
      className="py-12 md:py-16 lg:py-20 bg-slate-50 overflow-hidden scroll-mt-24"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#243B8F]">
            Our Departments
          </h2>

          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Explore our specialized medical treatment departments.
          </p>
        </div>

        {/* Scrolling Cards */}
        <div className="relative overflow-hidden">
          <div className="flex gap-4 md:gap-6 animate-scroll">
            {[...departments, ...departments].map((department, index) => (
              <div
                key={index}
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
                <img
                  src={department.icon}
                  alt={department.title}
                  className="mb-4 h-12 w-12 md:h-14 md:w-14 object-contain"
                />

                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">
                  {department.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  {department.description}
                </p>

                <Link
                  to={`/departments/${department.slug}`}
                  className="mt-5 md:mt-6 flex items-center gap-2 text-[#243B8F] font-semibold"
                >
                  Learn More

                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}