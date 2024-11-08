import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle opening the modal
  const openModal = () => {
    setIsModalOpen(true);
    setIsClosing(false); // Reset closing state when opening
  };

  // Function to handle closing the modal with animation
  const closeModal = () => {
    setIsClosing(true); // Trigger closing animation
    setTimeout(() => {
      setIsModalOpen(false);
      setIsLoginForm(true); // Reset to login form when modal is closed
      setName(""); // Clear the name field when closing the modal
    }, 1000); // Delay for animation duration
  };

  // const toggleModal = () => {
  //   setTimeout(() => {
  //     setIsModalOpen(!isModalOpen);
  //     setIsLoginForm(true);
  //     setName("");
  //   }, 300);
    
  // };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isLoginForm) {
      // Handle login logic here
      console.log("Login form submitted");
      console.log("Email:", email);
      console.log("Password:", password);
    } else {
      // Handle registration logic here
      console.log("Registration form submitted");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Password:", password);
    }
    closeModal(); // Close modal after submission (optional)
  };

  return (
    <div className="sticky top-0 z-20">
      <nav className="bg-white text-black p-4 font-poppins">
        <div className="w-[80%] mx-auto flex items-center justify-between max-md:w-[95%]">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link to="#/">
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
            <button
              onClick={openModal}
              className="hover:text-gray-900 transition"
            >
              Login
            </button>
          </div>

          {/* Right: Button */}
          <div className="hidden md:block">
            <button className="bg-[#7C6A46] hover:bg-[#8C6B27] px-4 py-2 rounded-md transition text-white">
              Book Now
            </button>
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
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
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
          <button 
            onClick={openModal}
            className="block px-2 py-2 hover:bg-gray-700 transition w-full text-center"
          >
            Login
          </button >
          <button className="w-full bg-[#7C6A46] hover:bg-[#8C6B27] px-4 py-2 mt-2 rounded-md transition text-white">
            Book Now
          </button>
        </div>
      </nav>
      {/* Conditionally rendering modal */}
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
              {/* Name Field (Only for Registration) */}
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

            {/* Toggle between login and registration */}
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
    </div>
  );
}
