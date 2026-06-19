import { useSearchParams } from "react-router-dom";
import { aboutContent } from "../data/aboutContent";

export default function About() {
const [searchParams, setSearchParams] = useSearchParams();

const tab = searchParams.get("tab") || "about";

const active = aboutContent[tab] ? tab : "about";

const currentContent = aboutContent[active];

return ( <section className="max-w-[1400px] mx-auto px-6 py-16"> <div className="grid lg:grid-cols-[280px_1fr] gap-10">
{/* Sidebar */} <aside> <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
{Object.entries(aboutContent).map(([key, item]) => (
<button
key={key}
onClick={() => setSearchParams({ tab: key })}
className={`w-full text-left px-6 py-4 border-b border-slate-200 transition-all duration-200 ${
                  active === key
                    ? "bg-[#243B8F] text-white font-semibold border-l-4 border-[#E63946]"
                    : "bg-white text-slate-700 hover:bg-blue-50"
                }`}
>
{item.title} </button>
))} </div> </aside>

    {/* Content Area */}
    <div className="bg-white">
      <h2 className="text-3xl font-bold text-slate-900 mb-8 uppercase">
        {currentContent?.title}
      </h2>

      {/* Managing Partners */}
      {active === "Managing_Partners" ? (
        <div className="space-y-16">
          {currentContent?.partners?.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row gap-8 items-start"
            >
              <img
                src={partner.image}
                alt={partner.name}
                className="w-[270px] h-[270px] object-cover rounded-lg border border-slate-200 shadow-sm flex-shrink-0"
              />

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#243B8F]">
                  {partner.name}
                </h3>

                <p className="text-gray-500 mb-4">
                  {partner.designation}
                </p>

                <div className="text-gray-700 leading-8 text-justify whitespace-pre-line">
                  {partner.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : currentContent?.image ? (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <img
            src={currentContent.image}
            alt={currentContent.title}
            className="w-[270px] h-[270px] object-cover rounded-lg border border-slate-200 shadow-sm flex-shrink-0"
          />

          <div className="flex-1">
            <div className="text-gray-700 leading-8 text-justify whitespace-pre-line">
              {currentContent.content}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-gray-700 leading-8 text-justify whitespace-pre-line">
          {currentContent?.content}
        </div>
      )}
    </div>
  </div>
</section>

);
}
