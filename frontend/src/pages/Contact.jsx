import {
  FiMapPin,
  FiPhone,
  FiMail,
} from "react-icons/fi";

import {
  FaWhatsapp,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

export default function Contact() {
  return (
    <section className="bg-slate-50 py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#243B8F]">
            Contact Moon Medical Tourism
          </h1>

          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Contact our medical tourism team for appointments,
            treatment planning, hospital coordination, and
            travel assistance for Thailand healthcare services.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[#243B8F] mb-8">
              Get In Touch
            </h2>

            <div className="space-y-8">
              {/* Address */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#243B8F] rounded-full flex items-center justify-center text-white shrink-0">
                  <FiMapPin size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Office Address
                  </h3>

                  <p className="text-gray-600 mt-2">
                    Mika Cornerstone
                    <br />
                    Plot-16 & 17, Road-12 (GF)
                    <br />
                    Sector-6, Uttara, Dhaka
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#243B8F] rounded-full flex items-center justify-center text-white shrink-0">
                  <FiPhone size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Call Us
                  </h3>

                  <div className="flex flex-col mt-2 text-gray-600">
                    <a
                      href="tel:01323222266"
                      className="hover:text-[#243B8F]"
                    >
                      01323222266
                    </a>

                    <a
                      href="tel:01323771111"
                      className="hover:text-[#243B8F]"
                    >
                      01323771111
                    </a>

                    <a
                      href="tel:01940181887"
                      className="hover:text-[#243B8F]"
                    >
                      01940181887
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#243B8F] rounded-full flex items-center justify-center text-white shrink-0">
                  <FiMail size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Email Address
                  </h3>

                  <a
                    href="mailto:moonmedicaltourism@gmail.com"
                    className="text-gray-600 hover:text-[#243B8F] mt-2 block break-all"
                  >
                    moonmedicaltourism@gmail.com
                  </a>
                </div>
              </div>

              {/* Partner Box */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <h3 className="font-semibold text-[#243B8F]">
                  Bangkok Hospital Thailand Partner
                </h3>

                <p className="text-gray-600 mt-2">
                  We help patients connect with leading
                  hospitals, specialist doctors, and
                  healthcare services in Thailand with
                  complete travel and treatment support.
                </p>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[#243B8F] mb-6">
              Connect With Us
            </h2>

            <p className="text-gray-600 mb-8">
              Follow us on social media and contact our team
              directly for appointments, treatment planning,
              and travel support.
            </p>

            <div className="space-y-4">
              {/* WhatsApp */}
              <a
                href="https://wa.me/8801323222266"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border hover:bg-green-50 transition"
              >
                <FaWhatsapp
                  size={30}
                  className="text-[#25D366]"
                />

                <div>
                  <h3 className="font-semibold">
                    WhatsApp
                  </h3>

                  <p className="text-sm text-gray-500">
                    Chat with our medical team
                  </p>
                </div>
              </a>

              {/* Facebook */}
              <a
                href="#"
                className="flex items-center gap-4 p-4 rounded-xl border hover:bg-blue-50 transition"
              >
                <FaFacebookF
                  size={26}
                  className="text-[#1877F2]"
                />

                <div>
                  <h3 className="font-semibold">
                    Facebook
                  </h3>

                  <p className="text-sm text-gray-500">
                    Follow our latest updates
                  </p>
                </div>
              </a>

              {/* YouTube */}
              <a
                href="#"
                className="flex items-center gap-4 p-4 rounded-xl border hover:bg-red-50 transition"
              >
                <FaYoutube
                  size={28}
                  className="text-[#FF0000]"
                />

                <div>
                  <h3 className="font-semibold">
                    YouTube
                  </h3>

                  <p className="text-sm text-gray-500">
                    Watch medical tourism videos
                  </p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="flex items-center gap-4 p-4 rounded-xl border hover:bg-pink-50 transition"
              >
                <FaInstagram
                  size={28}
                  className="text-pink-500"
                />

                <div>
                  <h3 className="font-semibold">
                    Instagram
                  </h3>

                  <p className="text-sm text-gray-500">
                    Follow our journey
                  </p>
                </div>
              </a>
            </div>

            {/* Help Box */}
            <div className="mt-8 bg-[#243B8F] text-white rounded-xl p-5">
              <h3 className="font-semibold mb-2">
                Need Immediate Assistance?
              </h3>

              <p className="text-blue-100 text-sm">
                Our medical tourism team is available to
                help you find the right hospital,
                specialist, and treatment options in
                Thailand.
              </p>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-12 rounded-2xl overflow-hidden shadow-md">
          <iframe
            title="Moon Medical Tourism Location"
            src="https://www.google.com/maps?q=Mika+Cornerstone+Plot-16+17+Road-12+Sector-6+Uttara+Dhaka&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}