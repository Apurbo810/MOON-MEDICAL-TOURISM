import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="bg-white py-12 md:py-16 lg:py-20 scroll-mt-24"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">

          {/* Call Us */}
          <div className="bg-white border border-blue-100 rounded-2xl p-6 md:p-8 text-center shadow-sm hover:shadow-lg transition">
            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-5 rounded-full bg-[#243B8F] flex items-center justify-center">
              <Phone size={26} className="text-white" />
            </div>

            <h3 className="text-lg md:text-xl font-bold text-[#243B8F] mb-2">
              Call Us
            </h3>

            <p className="text-base md:text-lg font-semibold text-gray-800">
              +8801323222266
            </p>

            <p className="text-sm text-gray-500 mt-2">
              24/7 Customer Support
            </p>

            <a
              href="tel:+8801323222266"
              className="block w-full mt-5 bg-[#243B8F] text-white px-5 py-3 rounded-lg hover:bg-blue-800 transition"
            >
              Call Now
            </a>
          </div>

          {/* Email */}
          <div className="bg-white border border-blue-100 rounded-2xl p-6 md:p-8 text-center shadow-sm hover:shadow-lg transition">
            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-5 rounded-full bg-[#243B8F] flex items-center justify-center">
              <Mail size={26} className="text-white" />
            </div>

            <h3 className="text-lg md:text-xl font-bold text-[#243B8F] mb-2">
              Email Us
            </h3>

            <p className="text-gray-800 break-words text-sm md:text-base">
              moonmedicaltourism@gmail.com
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Quick Response Guaranteed
            </p>

            <a
              href="mailto:moonmedicaltourism@gmail.com"
              className="block w-full mt-5 bg-[#243B8F] text-white px-5 py-3 rounded-lg hover:bg-blue-800 transition"
            >
              Send Email
            </a>
          </div>

          {/* Visit Us */}
          <div className="bg-white border border-blue-100 rounded-2xl p-6 md:p-8 text-center shadow-sm hover:shadow-lg transition">
            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-5 rounded-full bg-[#243B8F] flex items-center justify-center">
              <MapPin size={26} className="text-white" />
            </div>

            <h3 className="text-lg md:text-xl font-bold text-[#243B8F] mb-2">
              Visit Us
            </h3>

            <p className="text-gray-800 text-sm md:text-base">
              Uttara, Dhaka,
              <br />
              Bangladesh
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Office Consultation Available
            </p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Mika+Cornerstone+Plot-16+17+Road-12+Sector-6+Uttara+Dhaka+Bangladesh"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full mt-5 bg-[#243B8F] text-white px-5 py-3 rounded-lg hover:bg-blue-800 transition"
            >
              Open Map
            </a>
          </div>

          {/* WhatsApp */}
          <div className="bg-[#243B8F] rounded-2xl p-6 md:p-8 text-center shadow-lg">
            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-5 rounded-full bg-white flex items-center justify-center">
              <FaWhatsapp
                size={30}
                className="text-[#25D366]"
              />
            </div>

            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
              WhatsApp Support
            </h3>

            <p className="text-blue-100 text-sm md:text-base mb-5">
              Chat directly with our medical team.
            </p>

            <a
              href="https://wa.me/8801323222266"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-white text-[#243B8F] px-5 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              WhatsApp Us
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}