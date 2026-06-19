import {
  CheckCircle2,
  HeartPulse,
  ShieldCheck,
  Users,
} from "lucide-react";

const highlights = [
  {
    id: "mission",
    icon: HeartPulse,
    title: "Mission & Vision",
    text: "We guide patients from Bangladesh to trusted hospitals in Thailand with clear coordination, honest communication, and caring support.",
  },
  {
    id: "whyus",
    icon: ShieldCheck,
    title: "Why Choose Us",
    text: "Our team helps with appointments, treatment planning, hospital communication, travel support, and follow-up guidance.",
  },
  {
    id: "director",
    icon: Users,
    title: "Managing Director Message",
    text: "Every patient deserves confidence before traveling for treatment. We work to make the journey simpler, safer, and more personal.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="bg-white py-12 md:py-16 lg:py-20 scroll-mt-24"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center">

          {/* Left Content */}
          <div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#C62828]">
              About Moon Medical
            </span>

            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-[#243B8F] leading-tight">
              Trusted medical tourism support for Thailand treatment.
            </h2>

            <p className="mt-5 text-base md:text-lg leading-7 md:leading-8 text-gray-600">
              Moon Medical Tourism supports Bangladeshi patients who need
              specialist consultation, treatment planning, hospital access,
              and travel coordination for advanced healthcare in Thailand.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Hospital appointment support",
                "Treatment guidance",
                "Visa and travel assistance",
                "Patient follow-up coordination",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <CheckCircle2
                    size={20}
                    className="text-[#243B8F] shrink-0 mt-0.5"
                  />

                  <span className="text-sm md:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Cards */}
          <div className="grid gap-4 md:gap-5">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.id}
                  id={item.id}
                  className="rounded-xl border border-blue-100 bg-slate-50 p-5 md:p-6 hover:shadow-md transition duration-300 scroll-mt-24"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-xl bg-[#243B8F] text-white">
                      <Icon size={24} />
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm md:text-base leading-6 md:leading-7 text-gray-600">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}