import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { GiChiliPepper } from "react-icons/gi";
import { useState } from "react";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-orange-100 via-red-100 to-yellow-100 text-gray-800 px-6 py-4 shadow-md font-semibold">

      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold flex items-center gap-2 text-rose-600">
          <GiChiliPepper size={30} />
          <Link to="/" onClick={closeMenu}>
            SpiceSphere
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-rose-600">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-lg">
          <Link to="/" className="hover:text-red-500 transition">
            Home
          </Link>

          {token && (
            <>
              <Link to="/recipes" className="hover:text-red-500 transition">
                Recipes
              </Link>
              <Link to="/add-dish" className="hover:text-red-500 transition">
                Add Dish
              </Link>
              <Link to="/my-dishes" className="hover:text-red-500 transition">
                My Dishes
              </Link>
            </>
          )}

          {!token ? (
            <>
              <Link
                to="/login"
                className="bg-red-400 hover:bg-red-500 text-white px-4 py-1.5 rounded-full transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-red-400 hover:bg-red-400 hover:text-white text-red-500 px-4 py-1.5 rounded-full transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <FaUserCircle size={24} className="text-red-500" />
              <button
                onClick={handleLogout}
                className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-1.5 rounded-full transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 px-4 text-lg">
          <Link to="/" onClick={closeMenu} className="hover:text-red-500 transition">
            Home
          </Link>

          {token && (
            <>
              <Link to="/recipes" onClick={closeMenu} className="hover:text-red-500 transition">
                Recipes
              </Link>
              <Link to="/add-dish" onClick={closeMenu} className="hover:text-red-500 transition">
                Add Dish
              </Link>
              <Link to="/my-dishes" onClick={closeMenu} className="hover:text-red-500 transition">
                My Dishes
              </Link>
            </>
          )}

          {!token ? (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="bg-red-400 hover:bg-red-500 text-white px-4 py-1.5 rounded-full transition text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="border border-red-400 hover:bg-red-400 hover:text-white text-red-500 px-4 py-1.5 rounded-full transition text-center"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2">
                <FaUserCircle size={22} className="text-red-500" />
                <span className="text-sm">Logged In</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-1.5 rounded-full transition text-center"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
