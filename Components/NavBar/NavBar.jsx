"use client";
import { useState, useEffect, useCallback, memo, useRef } from "react";
import { usePathname } from "next/navigation";
import { FaCaretDown, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import "./NavBar.css";

const adminEmails = [
  "print5onlinestore@gmail.com",
  "manoj@gmail.com",
  "azar@magizhdigitalmarketing.com",
];

const fetchProducts = async () => {
  try {
    const { data } = await axios.get(`/api/products`);
    return data.reduce((acc, product) => {
      if (!acc.some((p) => p.category === product.category)) {
        acc.push(product);
      }
      return acc;
    }, []);
  } catch (err) {
    console.error("Failed to fetch products:", err.message);
    return [];
  }
};

const UserDropdown = memo(
  ({
    session,
    handleLogout,
    dropOpenMenu,
    setDropOpenMenu,
    mobile = false,
  }) => (
    <div
      className={`relative ${
        mobile ? "block mt-3 user-dropdown" : "ml-4"
      } flex-shrink-0 z-50`}
    >
      <img
        src={session.user.image || "/user/user.jpg"}
        width={25}
        height={25}
        alt="user image"
        className="cursor-pointer rounded-full border border-gray-300"
        onClick={() => setDropOpenMenu(!dropOpenMenu)}
        aria-haspopup="true"
        aria-expanded={dropOpenMenu}
      />
      {dropOpenMenu && (
        <div
          className={`absolute right-0 mt-2 min-w-max bg-white rounded-md shadow-lg border border-gray-200 transition-opacity duration-300 ${
            dropOpenMenu ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } transform origin-top-right`}
        >
          <div className="flex items-center p-3 border-b border-gray-200">
            <img
              src={session.user.image || "/user/user.jpg"}
              width={40}
              height={40}
              alt="user image"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-900">
                {session.user.name}
              </div>
              <div className="text-sm text-gray-600">{session.user.email}</div>
            </div>
          </div>
          <button
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
);

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [products, setProducts] = useState([]);
  const [dropOpenMenu, setDropOpenMenu] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const navbarRef = useRef(null);

  const isAdmin =
    session?.user?.email && adminEmails.includes(session.user.email);

  const fetchProductsCallback = useCallback(async () => {
    const uniqueProducts = await fetchProducts();
    setProducts(uniqueProducts);
  }, []);

  useEffect(() => {
    fetchProductsCallback();
  }, [fetchProductsCallback]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setDropOpenMenu(false);
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      await signOut({ redirect: false });
      window.location.href = "/"; // Redirect to home after logout
    }
  };

  const formatString = (str) =>
    str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const productLinks = products.map((product) => ({
    href: `/products/${product.category}`,
    label: formatString(product.category),
  }));

  return (
    <header className="antialiased nav-bg  text-white" ref={navbarRef}>
      <nav className="my-3">
        <div className="container-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/assets/logo/auxlogo.png"
                width={180}
                height={150}
                alt="Astronix Logo"
              />
            </Link>
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              <NavLink href="/" label="Home" pathname={pathname} />
              <NavLink href="/about" label="About" pathname={pathname} />
              <Dropdown
                label="Vu Tvs"
                links={productLinks}
                pathname={pathname}
                setDropOpenMenu={setDropOpenMenu}
              />
              <NavLink
                href="/hometheatre"
                label="Home Theatre"
                pathname={pathname}
              />
              <NavLink href="/brand" label="Brand" pathname={pathname} />
              <NavLink href="/services" label="Services" pathname={pathname} />
              <NavLink
                href="/contactus"
                label="Contact Us"
                pathname={pathname}
              />
              {isAdmin && (
                <NavLink href="/admin" label="Admin" pathname={pathname} />
              )}
              {
                session?.user ? (
                  <UserDropdown
                    session={session}
                    handleLogout={handleLogout}
                    dropOpenMenu={userDropdownOpen}
                    setDropOpenMenu={setUserDropdownOpen}
                  />
                ) : null
                // <NavLink href="/login" label="Login" pathname={pathname} />
              }
            </div>
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex lg:hidden p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-label="Toggle Menu"
            >
              {openMenu ? (
                <FaTimes className="w-6 h-6" aria-hidden="true" />
              ) : (
                <FaBars className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        {openMenu && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink href="/" label="Home" pathname={pathname} />
              <NavLink href="/about" label="About" pathname={pathname} />
              <Dropdown
                label="Vu Tvs"
                links={productLinks}
                pathname={pathname}
                setDropOpenMenu={setDropOpenMenu}
                mobile
              />
              <NavLink
                href="/hometheatre"
                label="Home Theatre"
                pathname={pathname}
              />
              <NavLink href="/brand" label="Brand" pathname={pathname} />
              <NavLink href="/services" label="Services" pathname={pathname} />
              <NavLink
                href="/contactus"
                label="Contact Us"
                pathname={pathname}
              />
              {isAdmin && (
                <NavLink href="/admin" label="Admin" pathname={pathname} />
              )}
              {
                session?.user ? (
                  <UserDropdown
                    session={session}
                    handleLogout={handleLogout}
                    dropOpenMenu={userDropdownOpen}
                    setDropOpenMenu={setUserDropdownOpen}
                    mobile
                  />
                ) : null
                // <NavLink href="/login" label="Login" pathname={pathname} />
              }
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

const NavLink = memo(({ href, label, pathname, className = "" }) => {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      } ${className}`}
    >
      {label}
    </Link>
  );
});

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
            className={`block pl-3 pr-1  py-2 rounded-md text-base font-medium ${
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
            className="p-1  rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <FaCaretDown aria-hidden="true" />
            <span className="sr-only">Toggle Dropdown</span>
          </button>
        </div>
        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute left-0 mt-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
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

export default memo(NavBar);
