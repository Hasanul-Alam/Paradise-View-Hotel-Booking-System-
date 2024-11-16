import { signOut } from "firebase/auth";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase/firebase.config";

export default function UserProfile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();

  //toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 font-raleway">
      {/* Sidebar for Desktop */}
      <aside className="bg-white w-full lg:w-64 shadow-lg hidden lg:block max-md:w-full">
        <Link to="/">
          <div className="p-6 bg-[#7C6A46] text-white">
            <h1 className="text-2xl font-semibold font-raleway">
              Paradise View
            </h1>
          </div>
        </Link>
        <nav className="mt-8">
          <ul>
            <li className="px-6 py-3 hover:bg-indigo-50" onClick={toggleMenu}>
              <Link to="/profile" className="text-[#7C6A46] font-medium block">
                Profile
              </Link>
            </li>
            <li className="px-6 py-3 hover:bg-indigo-50" onClick={toggleMenu}>
              <Link
                to="/profile/reviews"
                className="text-[#7C6A46] font-medium block"
              >
                Reviews
              </Link>
            </li>
            <li className="px-6 py-3 hover:bg-indigo-50" onClick={toggleMenu}>
              <Link
                to="/profile/bookings"
                className="text-[#7C6A46] font-medium block"
              >
                Bookings
              </Link>
            </li>
            {/* <li className="px-6 py-3 hover:bg-indigo-50" onClick={toggleMenu}>
              <Link
                to="/profile/paymentMethod"
                className="text-[#7C6A46] font-medium block"
              >
                Payment Methods
              </Link>
            </li> */}
            <li className="px-6 py-3 hover:bg-indigo-50" onClick={toggleMenu}>
              <Link to="/" className="text-[#7C6A46] font-medium block">
                Back to Home
              </Link>
            </li>
            <li className="px-6 py-3 hover:bg-indigo-50" onClick={toggleMenu}>
              <button
                onClick={handleLogout}
                className="text-[#7C6A46] font-medium block"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <div className="bg-white lg:hidden p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-[#7C6A46]">Paradise View</h1>
          <button
            className="text-[#7C6A46] focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <nav
          className={`absolute left-0 top-16 bg-white w-full z-50 transition-all duration-300 ease-in-out transform ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5 pointer-events-none"
          }`}
        >
          <ul className="py-2">
            <li className="py-2 px-4" onClick={toggleMenu}>
              <Link
                to="/profile"
                className="text-[#7C6A46] font-medium block text-center"
              >
                Profile
              </Link>
            </li>
            <li className="py-2 px-4" onClick={toggleMenu}>
              <Link
                to="/profile/reviews"
                className="text-[#7C6A46] font-medium block text-center"
              >
                Reviews
              </Link>
            </li>
            <li className="py-2 px-4" onClick={toggleMenu}>
              <Link
                to="/profile/bookings"
                className="text-[#7C6A46] font-medium block text-center"
              >
                Bookings
              </Link>
            </li>
            {/* <li className="py-2 px-4" onClick={toggleMenu}>
              <Link
                to="/profile/paymentMethod"
                className="text-[#7C6A46] font-medium block text-center"
              >
                Payment Methods
              </Link>
            </li> */}
            <li className="py-2 px-4" onClick={toggleMenu}>
              <Link
                to="/"
                className="text-[#7C6A46] font-medium block text-center"
              >
                Back to Home
              </Link>
            </li>
            <li className="py-2 px-4" onClick={toggleMenu}>
              <div className="flex justify-center">
                <button
                  onClick={handleLogout}
                  className="text-[#7C6A46] font-medium block"
                >
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 max-md:p-0">
        <Outlet />
      </main>
    </div>
  );
}
