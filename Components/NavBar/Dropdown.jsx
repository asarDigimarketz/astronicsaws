import { useState, memo } from "react";
import Link from "next/link";
import { FaCaretDown } from "react-icons/fa";

const Dropdown = memo(
  ({ label, links, pathname, setDropOpenMenu, mobile = false }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const isActive = pathname.startsWith("/products");

    const toggleDropdown = (e) => {
      e.stopPropagation(); // Prevent event bubbling
      setDropdownOpen((prev) => !prev);
      setDropOpenMenu && setDropOpenMenu((prev) => !prev);
    };

    return (
      <div
        className={`relative ${mobile ? "block" : ""} dropdown`}
        onMouseEnter={() => !mobile && setDropdownOpen(true)}
        onMouseLeave={() => !mobile && setDropdownOpen(false)}
      >
        <div className="flex items-center">
          {/* "Vu Tvs" Label as a Link */}
          <Link
            href="/products"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {label}
          </Link>
          {/* Dropdown Arrow as a Button */}
          <button
            onClick={toggleDropdown}
            className="ml-2 p-1 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <FaCaretDown aria-hidden="true" />
            <span className="sr-only">Toggle Dropdown</span>
          </button>
        </div>
        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            {links.map((link, index) => (
              <Link
                href={link.href}
                key={index}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default Dropdown;
