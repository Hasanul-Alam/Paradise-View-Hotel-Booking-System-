import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  registrationFailure,
  registrationStart,
  registrationSuccess,
} from "../../../features/auth/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import { auth } from "../../../firebase/firebase.config";
import {
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const { isLoggedIn, user, loading } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = listenToAuthChanges(dispatch);

    return () => {
      // Cleanup the listener when the component unmounts or on auth state change
      unsubscribe();
    };
  }, [dispatch]); // We should only be adding `dispatch` as a dependency, not the state itself

  const listenToAuthChanges = (dispatch) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        dispatch(loginSuccess(userData)); // Only dispatch the user data
      }
    });
    return unsubscribe;
  };
  // Handle login
  const handleLogin = async () => {
    dispatch(loginStart());
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        const userData = {
          uid: userCredential.user.uid,
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
          photoURL: userCredential.user.photoURL,
        };
        // Dispatch login success with the user object
        dispatch(loginSuccess(userData));
      }
    } catch (error) {
      // Dispatch login failure if error occurs
      dispatch(loginFailure(error.message));
    }
  };

  // Handle registration
  const handleRegistration = async () => {
    dispatch(registrationStart()); // Start registration process
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        // Update user profile with displayName
        await updateProfile(userCredential.user, {
          displayName: name, // Assuming 'name' is the user's chosen name
        });
        console.log("User profile updated with displayName");

        // After updating the profile, dispatch registration success
        dispatch(registrationSuccess(userCredential.user)); // Pass the user to Redux state
      }
    } catch (error) {
      dispatch(registrationFailure(error.message)); // Dispatch registration failure
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle opening the modal
  const openModal = () => {
    setIsModalOpen(true);
    setIsClosing(false);
  };

  // Function to handle closing the modal with animation
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsLoginForm(true);
      setName("");
    }, 500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isLoginForm) {
      handleLogin();
    } else {
      handleRegistration();
    }
    closeModal();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <div className="sticky top-0 z-20 relative">
      <nav className="bg-white text-black p-4 font-poppins">
        <div className="w-[80%] mx-auto flex items-center justify-between max-md:w-[95%]">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src="https://i.ibb.co.com/ygyHMQQ/logo-2.png" // Replace with your logo
                alt="Logo"
                className="max-md:w-[40px]"
              />
            </Link>
          </div>

          {/* Center: Menu (hidden on mobile) */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-gray-900 transition">
              Home
            </Link>
            <Link to="/explore" className="hover:text-gray-900 transition">
              Explore
            </Link>
            <Link to="/rooms" className="hover:text-gray-900 transition">
              Rooms
            </Link>
            <Link to="/about" className="hover:text-gray-900 transition">
              About
            </Link>
            <Link to="/contact" className="hover:text-gray-900 transition">
              Contact
            </Link>

            {/* User Dropdown */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="hover:text-gray-900 transition flex items-center font-semibold text-[#00403a]"
                >
                  {user?.displayName}
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="#00403a"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                    <ul className="py-2 text-left">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-100 text-gray-700 transition"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 transition"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openModal}
                className="hover:text-gray-900 transition"
              >
                Login
              </button>
            )}
          </div>

          {/* Right: Button */}
          <div className="hidden md:block">
            <Link to="/admin">
              <button
                onClick={() => console.log("Book Now clicked")}
                className="bg-[#7C6A46] hover:bg-[#8C6B27] px-4 py-2 rounded-md transition text-white"
              >
                Admin
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg
                className="h-6 w-6 text-[#7C6A46]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    !isOpen ? "M4 6h16M4 12h16m-7 6h7" : "M6 18L18 6M6 6l12 12"
                  }
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "h-[315px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <Link
            to="/"
            className="block px-2 py-2 hover:bg-gray-700 transition w-full text-center"
          >
            Home
          </Link>
          <Link
            to="/explore"
            className="block px-2 py-2 hover:bg-gray-700 transition w-full text-center"
          >
            Explore
          </Link>
          <Link
            to="/rooms"
            className="block px-2 py-2 hover:bg-gray-700 transition w-full text-center"
          >
            Rooms
          </Link>
          <Link
            to="/about"
            className="block px-2 py-2 hover:bg-gray-700 transition w-full text-center"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block px-2 py-2 hover:bg-gray-700 transition w-full text-center"
          >
            Contact
          </Link>
          {/* User Dropdown */}
          {isLoggedIn ? (
            <div className="flex justify-center my-3">
              <button
                onClick={toggleDropdown}
                className="hover:text-gray-900 transition flex items-center justify-center"
              >
                {user?.displayName}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                  <ul className="py-2 text-left">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-700 transition"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 transition"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openModal}
              className="hover:text-gray-900 transition"
            >
              Login
            </button>
          )}
          {/* <button
            onClick={openModal}
            className="block px-2 py-2 hover:bg-gray-700 transition w-full text-center"
          >
            Login
          </button> */}
          <button className="w-full bg-[#7C6A46] hover:bg-[#8C6B27] px-4 py-2 mt-2 rounded-md transition text-white">
            Book Now
          </button>
        </div>
      </nav>
      {isModalOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-out ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
          onClick={closeModal}
        >
          <div
            className={`bg-white p-6 rounded-lg shadow-lg w-1/4 max-md:w-[90%] mx-auto transform transition-transform duration-300 ease-out ${
              isClosing ? "scale-90 opacity-0" : "scale-100 opacity-100"
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <h2 className="text-xl font-bold mb-4 text-center">
              {isLoginForm ? "Login" : "Sign Up"}
            </h2>

            {/* Login/Registration Form */}
            <form onSubmit={handleFormSubmit}>
              {!isLoginForm && (
                <div className="mb-4">
                  <label className="block text-left text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Update name state
                    required
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-left text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-left text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {isLoginForm ? "Login" : "Sign Up"}
              </button>
            </form>

            <button
              className="mt-4 w-full px-4 py-2 text-blue-500 hover:underline"
              onClick={() => setIsLoginForm(!isLoginForm)} // Toggle between forms
            >
              {isLoginForm
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </button>

            <button
              className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Loading Spinner Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
