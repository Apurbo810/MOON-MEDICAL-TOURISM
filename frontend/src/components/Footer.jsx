import {
Phone,
Mail,
MapPin,
Share2,
CirclePlay,
} from "lucide-react";

export default function Footer() {
return ( <footer className="bg-[#0F172A] text-white"> <div className="max-w-[1400px] mx-auto px-6 py-14"> <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

      {/* About */}
      <div>
        <img
          src="/logo.svg"
          alt="Moon Medical Tourism"
          className="h-14 w-32 object-contain mb-4"
        />

        <p className="text-gray-300 leading-7">
          Moon Medical Tourism helps Bangladeshi patients
          access advanced medical treatment, specialist
          consultations and healthcare services in
          Thailand's leading hospitals.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Quick Links
        </h3>

        <ul className="space-y-3 text-gray-300">
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Departments</a></li>
          <li><a href="#">Hospitals</a></li>
          <li><a href="#">Gallery</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>

      {/* Treatments */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Departments
        </h3>

        <ul className="space-y-3 text-gray-300">
          <li>Cancer Departments</li>
          <li>Heart Departments</li>
          <li>Brain & Neurology</li>
          <li>Kidney Departments</li>
          <li>IVF Departments</li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Contact Us
        </h3>

        <div className="space-y-4 text-gray-300">

          <div className="flex gap-3">
            <Phone size={18} />
            <span>+8801323222266</span>
          </div>

          <div className="flex gap-3">
            <Phone size={18} />
            <span>+8801323771111</span>
          </div>

          <div className="flex gap-3">
            <Phone size={18} />
            <span>+01940181887</span>
          </div>

          <div className="flex gap-3">
            <Mail size={18} />
            <span>
              uttarabangkokhospital@gmail.com
            </span>
          </div>

          <div className="flex gap-3">
            <MapPin size={18} />
            <span>
              Mika Cornerstone, Plot-16 & 17,
              Road-12 (GF), Sector-6,
              Uttara, Dhaka
            </span>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Share2 />
          <CirclePlay />
        </div>
      </div>

    </div>
  </div>

  {/* Bottom Bar */}
  <div className="border-t border-slate-700">
    <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
      <p>
        © 2026 Moon Medical Tourism.
        All Rights Reserved.
      </p>

      <p>
        Developed by Apurbo
      </p>
    </div>
  </div>
</footer>


);
}
