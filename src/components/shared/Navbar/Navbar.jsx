import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white text-black p-4 font-poppins">
      <div className="w-[80%] mx-auto flex items-center justify-between max-md:w-[95%]">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <a href="#">
          <img
            src="https://i.ibb.co.com/ygyHMQQ/logo-2.png" // Replace with your logo
            alt="Logo"
            className=""
          />
          </a>
        </div>

        {/* Center: Menu (hidden on mobile) */}
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="hover:text-gray-900 transition">Home</a>
          <a href="#about" className="hover:text-gray-900 transition">About</a>
          <a href="#services" className="hover:text-gray-900 transition">Services</a>
          <a href="#contact" className="hover:text-gray-900 transition">Contact</a>
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
                d={!isOpen ? "M4 6h16M4 12h16m-7 6h7" : "M6 18L18 6M6 6l12 12"}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <a href="#home" className="block px-2 py-2 hover:bg-gray-700 transition w-full text-center">Home</a>
        <a href="#about" className="block px-2 py-2 hover:bg-gray-700 transition w-full text-center">About</a>
        <a href="#services" className="block px-2 py-2 hover:bg-gray-700 transition w-full text-center">Services</a>
        <a href="#contact" className="block px-2 py-2 hover:bg-gray-700 transition w-full text-center">Contact</a>
        <button className="w-full bg-[#7C6A46] hover:bg-[#8C6B27] px-4 py-2 mt-2 rounded-md transition text-white">
          Book Now
        </button>
      </div>
    </nav>
  );
}
