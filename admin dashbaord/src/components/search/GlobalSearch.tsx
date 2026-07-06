import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { searchData } from "./searchData";

const GlobalSearch: React.FC = () => {
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];

    return searchData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }

      if (!isOpen) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prev) =>
          Math.min(prev + 1, results.length - 1)
        );
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }

      if (event.key === "Enter") {
        if (results[selectedIndex]) {
          navigate(results[selectedIndex].path);
          setIsOpen(false);
          setQuery("");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () =>
      document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, navigate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative xl:w-[430px]"
    >
      <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        🔍
      </span>

      <input
        ref={inputRef}
        type="text"
        value={query}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        placeholder="Search pages..."
        className="h-11 w-full rounded-lg border border-gray-200 bg-transparent pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs outline-none focus:border-brand-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white"
      />

      <button
        type="button"
        className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-800"
      >
        Ctrl K
      </button>

      {isOpen && query && (
        <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
          {results.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">
              No results found.
            </div>
          ) : (
            results.map((item, index) => (
                <button
                key={item.path}
                onClick={() => {
                    navigate(item.path);
                    setQuery("");
                    setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-3 transition-all duration-150 ${
                    index === selectedIndex
                    ? "bg-brand-50 dark:bg-gray-800"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                >
                <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {item.title}
                    </span>

                    <span className="text-xs text-gray-500 dark:text-gray-400">
                    {item.category}
                    </span>
                </div>

                <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                    />
                </svg>
                </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;