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
  loadingStart,
  loadingEnd,
} from "../../../features/auth/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import { auth } from "../../../firebase/firebase.config";
import {
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import Swal from "sweetalert2";

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
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = listenToAuthChanges(dispatch);

    return () => {
      // Cleanup the listener when the component unmounts or on auth state change
      unsubscribe();
    };
  }, [dispatch]); // We should only be adding `dispatch` as a dependency, not the state itself

  const getUserDataFromDatabase = async (email) => {
    const response = await axios.get(`https://paradise-view-server.onrender.com/users/${email}`);
    if (response.data) {
      const user = response.data[0];
      dispatch(loginSuccess(user));
      
    }
    else{
      dispatch(loadingEnd());
    }
  };

  const listenToAuthChanges = (dispatch) => {
    dispatch(loadingStart());
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserDataFromDatabase(user.email);
      } else {
        dispatch(loadingEnd());
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
        getUserDataFromDatabase(userCredential.user.email);
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
      const imageUrl = await uploadImageToImgbb(image);
      if (imageUrl) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (userCredential) {
          // Update user profile with displayName
          await updateProfile(userCredential.user, {
            displayName: name,
            photoURL: imageUrl,
          });

          const userData = {
            uid: userCredential.user.uid,
            displayName: userCredential.user.displayName,
            email: userCredential.user.email,
            photoURL: userCredential.user.photoURL,
            role: "User",
          };
          await uploadUserData(userData);
          // After updating the profile, dispatch registration success
          dispatch(registrationSuccess(userData));
        }
      }
    } catch (error) {
      dispatch(registrationFailure(error.message)); // Dispatch registration failure
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
  };

  // Handle image selection
  const handleImageSelect = (e) => {
    setImage(e.target.files[0]);
  };

  // Upload image to imgbb
  const uploadImageToImgbb = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=a034eb9194a3961792dc743224e30bd2`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return data.data.url;
    } catch (error) {
      console.error("Error uploading image to imgbb:", error);
      throw new Error("Image upload failed");
    }
  };

  // Upload user data to database
  const uploadUserData = async (user) => {
    const response = await axios.post(`https://paradise-view-server.onrender.com/users`, user);
    if (response.data.insertedId) {
      Swal.fire({
        title: "Success!",
        text: "You have been successfully registered!",
        icon: "success",
        confirmButtonText: "Awesome!",
        confirmButtonColor: "#4CAF50",
        backdrop: `
      rgba(0,0,123,0.4)
    `,
        customClass: {
          popup: "animated-sparkle", // Applying custom animation class
        },
      });
    }
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
          <Link to="/admin">
            <button className="w-full bg-[#7C6A46] hover:bg-[#8C6B27] px-4 py-2 mt-2 rounded-md transition text-white">
              Admin
            </button>
          </Link>
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
            className={`relative bg-white p-8 rounded-xl shadow-2xl ${
              !isLoginForm ? "w-1/3" : "w-1/4"
            } max-md:w-[90%] mx-auto transform transition-transform duration-300 ease-out ${
              isClosing ? "scale-90 opacity-0" : "scale-100 opacity-100"
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Close button in the top-right corner */}
            <button
              className="absolute top-4 right-4 text-blue-500 hover:text-red-500 transition-colors"
              onClick={closeModal}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-2xl font-extrabold mb-6 text-center text-gray-800">
              {isLoginForm ? "Login" : "Sign Up"}
            </h2>

            {/* Login/Registration Form */}
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {!isLoginForm && (
                <div>
                  <label className="block text-left text-gray-600 font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-300 hover:ring-2 hover:ring-blue-200"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-left text-gray-600 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-300 hover:ring-2 hover:ring-blue-200"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-left text-gray-600 font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-300 hover:ring-2 hover:ring-blue-200"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {!isLoginForm && (
                <div>
                  <label className="block text-left text-gray-600 font-semibold mb-2">
                    Image
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300 hover:ring-2 hover:ring-blue-200"
                      placeholder="Upload an image"
                      onChange={(e) => handleImageSelect(e)}
                      required
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg
                        className="h-5 w-5 text-blue-500 group-hover:text-blue-700 transition duration-300 ease-in-out"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 12v.01M6.938 4.938l-.866.866a2 2 0 000 2.828l7.07 7.07a2 2 0 002.829 0l.865-.865a2 2 0 000-2.828l-7.07-7.07a2 2 0 00-2.828 0z"
                        />
                      </svg>
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Choose an image to upload
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
              >
                {isLoginForm ? "Login" : "Sign Up"}
              </button>
            </form>

            <button
              className="mt-6 w-full px-4 py-3 text-blue-600 font-semibold hover:underline transition-colors"
              onClick={() => setIsLoginForm(!isLoginForm)} // Toggle between forms
            >
              {isLoginForm
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
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
