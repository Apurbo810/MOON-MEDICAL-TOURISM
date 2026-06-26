import { useEffect, useState } from "react";

const images = [
  "/hero/1.webp",
  "/hero/2.webp",
  "/hero/3.webp",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="max-w-[1400px] mx-auto overflow-hidden scroll-mt-24"
    >
      <div className="relative">
        {/* Slider */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="min-w-full"
            >
              <img
                src={img}
                alt={`Hero ${index + 1}`}
                className="
                  w-full
                  h-[220px]
                  sm:h-[320px]
                  md:h-[450px]
                  lg:h-[550px]
                  object-contain
                "
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 w-3 rounded-full transition ${
                current === index
                  ? "bg-white"
                  : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}