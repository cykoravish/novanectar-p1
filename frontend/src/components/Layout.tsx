// src/components/Layout.tsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Suspense, useState } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import logo from "../assets/logo.png";

const Layout = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="">
      <div className="bg-blue-300 w-full flex flex-col justify-center items-center gap-2">
        <nav className="flex justify-between items-center py-3 px-8 my-3 w-full max-w-6xl mx-auto bg-white rounded-md">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="logo" className="w-6 h-6" />
            <h1 className="text-lg font-bold">NOVANECTAR</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 font-semibold">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "text-blue-800" : "text-black"
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/courses"}
              className={({ isActive }) =>
                isActive ? "text-blue-800" : "text-black"
              }
            >
              Courses
            </NavLink>
            <NavLink
              to={"/internships"}
              className={({ isActive }) =>
                isActive ? "text-blue-800" : "text-black"
              }
            >
              Internships
            </NavLink>
            <NavLink
              to={"/contact-us"}
              className={({ isActive }) =>
                isActive ? "text-blue-800" : "text-black"
              }
            >
              Contact Us
            </NavLink>
            <NavLink
              to={"/session-book"}
              className={({ isActive }) =>
                isActive ? "text-blue-800" : "text-black"
              }
            >
             Book
            </NavLink>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="flex md:hidden">
            <button onClick={toggleMenu}>
              {isMenuOpen ? (
                <HiOutlineX size={24} />
              ) : (
                <HiOutlineMenuAlt3 size={24} />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="flex flex-col gap-4 w-full items-center md:hidden bg-blue-100 p-4">
            <button
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate("/courses");
                setIsMenuOpen(false);
              }}
            >
              Courses
            </button>
            <button
              onClick={() => {
                navigate("/contact-us");
                setIsMenuOpen(false);
              }}
            >
              Contact Us
            </button>
            <button
              onClick={() => {
                navigate("/session-book");
                setIsMenuOpen(false);
              }}
            >
              Book
            </button>
          </div>
        )}
      </div>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
