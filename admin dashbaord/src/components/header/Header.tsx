import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ThemeToggleButton } from "../common/ThemeToggleButton";
import UserDropdown from "./UserDropdown";

interface HeaderProps {
  onClick?: () => void;
  onToggle: () => void;
}

const commands = [
  { name: "Dashboard", path: "/" },

  { name: "Add Doctor", path: "/doctors/add" },
  { name: "All Doctors", path: "/doctors" },

  { name: "Add Department", path: "/departments/add" },
  { name: "All Departments", path: "/departments" },

  { name: "Add News", path: "/news/add" },
  { name: "All News", path: "/news" },

  { name: "Archive Photos", path: "/gallery/archive" },

  { name: "Profile", path: "/profile" },
];

const Header: React.FC<HeaderProps> = ({
  onClick,
  onToggle,
}) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filteredCommands = commands.filter(
    (item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-50 flex w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex w-full items-center justify-between px-4 py-3 lg:px-6">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar Toggle */}
          <button
            className="lg:hidden"
            onClick={onToggle}
          >
            <svg
              width="24"
              height="24"
              fill="none"
            >
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Desktop Sidebar Toggle */}
          <button
            onClick={onClick}
            className="hidden h-10 w-10 items-center justify-center rounded-lg border border-gray-200 lg:flex dark:border-gray-700"
          >
            <svg
              width="20"
              height="20"
              fill="none"
            >
              <path
                d="M3 10H17M3 5H17M3 15H10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Mobile Logo */}
          <Link
            to="/"
            className="lg:hidden"
          >
            <img
              src="/images/logo/logo.svg"
              alt="Logo"
              className="h-10"
            />
          </Link>
        </div>

        {/* Search */}
        <div className="relative hidden lg:block">
          <input
            type="text"
            placeholder="Search pages..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="h-11 w-[420px] rounded-xl border border-gray-200 px-4 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />

          {search.length > 0 && (
            <div className="absolute left-0 top-14 z-50 max-h-80 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setSearch("");
                    }}
                    className="block w-full border-b border-gray-100 px-4 py-3 text-left text-sm hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    {item.name}
                  </button>
                ))
              ) : (
                <div className="p-4 text-sm text-gray-500">
                  No page found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <ThemeToggleButton />

          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;