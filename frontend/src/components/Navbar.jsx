import { Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { departments } from "../data/departments";

const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "About",
    submenu: [
      { name: "About Moon Medical", href: "/about?tab=about" },
      { name: "Mission & Vision", href: "/about?tab=mission" },
      { name: "Managing Partners", href: "/about?tab=Managing_Partners" },
      { name: "Advisor's Message", href: "/about?tab=advisor" },
    ],
  },
  {
    name: "Departments",
    isDepartmentMenu: true,
  },
  { name: "Doctors", href: "/doctors" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
];

const desktopLinkClass = ({ isActive }) =>
  `px-4 xl:px-5 h-16 flex items-center font-medium transition ${
    isActive ? "bg-[#1B2E73] text-white" : "hover:bg-[#1B2E73]"
  }`;

const desktopAnchorClass =
  "px-4 xl:px-5 h-16 flex items-center font-medium transition hover:bg-[#1B2E73]";

const mobileLinkClass =
  "block border-b border-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(null);

  const closeMobileMenu = () => {
    setIsOpen(false);
    setOpenMobileMenu(null);
  };

  const toggleMobileMenu = (name) => {
    setOpenMobileMenu((current) => (current === name ? null : name));
  };

  return (
    <>
      <div className="bg-[#243B8F] text-white">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-4 py-2 text-sm md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>+8801323222266</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>moonmedicaltourism@gmail.com</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>Uttara, Dhaka</span>
            </div>
          </div>

          <span className="text-center font-medium">
            Trusted Medical Tourism Partner
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img
              src="/logo.svg"
              alt="Moon Medical Logo"
              className="h-14 w-28 flex-shrink-0 object-contain sm:h-16 sm:w-36"
            />

            <div className="hidden min-w-0 sm:block">
              <h2 className="truncate text-xl font-bold text-[#243B8F] lg:text-2xl">
                MOON MEDICAL TOURISM
              </h2>

              <p className="truncate text-sm text-gray-500">
                Bangkok Hospital Thailand Partner
              </p>
            </div>
          </Link>

          <a
            href="tel:+8801323222266"
            className="hidden rounded-md bg-[#C62828] px-5 py-3 font-medium text-white transition hover:bg-red-700 lg:inline-flex"
          >
            Call Now
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#243B8F] text-white transition hover:bg-[#1B2E73] lg:hidden"
            onClick={() => setIsOpen((current) => !current)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        <nav className="bg-[#243B8F] text-white shadow-md">
          <div className="mx-auto max-w-[1400px] px-4">
            <div className="hidden h-16 items-center lg:flex">
              {navLinks.map((link) => (
                <div key={link.name} className="group relative">
                  {link.isDepartmentMenu ? (
                    <>
                      <button
                        type="button"
                        className="flex h-16 items-center gap-1 px-4 font-medium transition hover:bg-[#1B2E73] group-focus-within:bg-[#1B2E73] xl:px-5"
                      >
                        Departments
                        <ChevronDown size={16} />
                      </button>

                      <div className="absolute left-0 top-full z-50 w-[640px] rounded-b-lg bg-white text-gray-700 shadow-xl opacity-0 pointer-events-none transition-opacity duration-75 group-hover:opacity-100 group-hover:pointer-events-auto">
                        <div className="grid grid-cols-2">
                          {departments.map((department) => (
                            <Link
                              key={department.id}
                              to={`/departments/${department.slug}`}
                              className="border-b border-r border-gray-100 px-6 py-4 transition hover:bg-blue-50 hover:text-[#243B8F]"
                            >
                              {department.title}
                            </Link>
                          ))}
                        </div>

                        <Link
                          to="/departments"
                          className="block bg-[#243B8F] py-3 text-center font-medium text-white transition hover:bg-[#1B2E73]"
                        >
                          View All Departments
                        </Link>
                      </div>
                    </>
                  ) : link.submenu ? (
                    <>
                      <button
                        type="button"
                        className="flex h-16 items-center gap-1 px-4 font-medium transition hover:bg-[#1B2E73] group-focus-within:bg-[#1B2E73] xl:px-5"
                      >
                        {link.name}
                        <ChevronDown size={16} />
                      </button>

                      <div className="absolute left-0 top-full z-50 w-72 rounded-b-lg bg-white text-gray-700 shadow-xl opacity-0 pointer-events-none transition-opacity duration-75 group-hover:opacity-100 group-hover:pointer-events-auto">
                        {link.submenu.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block border-b border-gray-100 px-6 py-4 transition hover:bg-blue-50 hover:text-[#243B8F]"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : link.href?.startsWith("#") ? (
                    <a href={link.href} className={desktopAnchorClass}>
                      {link.name}
                    </a>
                  ) : (
                    <NavLink to={link.href} className={desktopLinkClass}>
                      {link.name}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>

            {isOpen && (
              <div className="border-t border-white/10 pb-4 lg:hidden">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.submenu || link.isDepartmentMenu ? (
                      <>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between border-b border-white/10 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-white/10"
                          onClick={() => toggleMobileMenu(link.name)}
                          aria-expanded={openMobileMenu === link.name}
                        >
                          <span>{link.name}</span>
                          <ChevronDown
                            size={16}
                            className={`transition ${
                              openMobileMenu === link.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {openMobileMenu === link.name && (
                          <div className="bg-[#1B2E73]">
                            {link.isDepartmentMenu ? (
                              <>
                                {departments.map((department) => (
                                  <Link
                                    key={department.id}
                                    to={`/departments/${department.slug}`}
                                    onClick={closeMobileMenu}
                                    className="block border-b border-white/10 px-8 py-3 text-sm text-gray-100 transition hover:bg-white/10"
                                  >
                                    {department.title}
                                  </Link>
                                ))}

                                <Link
                                  to="/departments"
                                  onClick={closeMobileMenu}
                                  className="block px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                                >
                                  View All Departments
                                </Link>
                              </>
                            ) : (
                              link.submenu.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.href}
                                  onClick={closeMobileMenu}
                                  className="block border-b border-white/10 px-8 py-3 text-sm text-gray-100 transition hover:bg-white/10"
                                >
                                  {item.name}
                                </Link>
                              ))
                            )}
                          </div>
                        )}
                      </>
                    ) : link.href?.startsWith("#") ? (
                      <a
                        href={link.href}
                        onClick={closeMobileMenu}
                        className={mobileLinkClass}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <NavLink
                        to={link.href}
                        onClick={closeMobileMenu}
                        className={mobileLinkClass}
                      >
                        {link.name}
                      </NavLink>
                    )}
                  </div>
                ))}

                <a
                  href="tel:+8801323222266"
                  className="mt-4 block rounded-md bg-[#C62828] py-3 text-center font-medium text-white transition hover:bg-red-700"
                >
                  Call Now
                </a>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}