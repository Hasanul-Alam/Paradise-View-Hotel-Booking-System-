import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function Admin() {
  const menuData = [
    {
      name: "Dashboard",
      link: "/admin",
    },
    {
      name: "Users",
      link: "/admin/users",
    },
    {
      name: "Manage Rooms",
      link: "/admin/manage-rooms",
    },
    {
      name: "Manage Bookings",
      link: "/admin/manage-bookings",
    },
    {
      name: "Newsletters",
      link: "/admin/newsletters",
    },
    {
      name: "Back to Home",
      link: "/",
    },
  ];
  // State to control sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle the sidebar and animate the button
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-auto max-md:block">
      {/* Sidebar */}
      <div
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:shadow-none`}
      >
        <div className="h-16 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
          <h1 className="text-white font-bold text-xl tracking-wide">
            Admin Dashboard
          </h1>
        </div>
        <nav className="mt-10 space-y-4">
          {menuData.map((item) => (
            <Link
              key={item.link}
              onClick={toggleSidebar}
              to={item.link}
              className="block px-4 py-2 w-[95%] mx-auto text-gray-700 hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white transition-all duration-300 ease-in-out rounded-lg transform hover:w-full"
            >
              {item.name}
            </Link>
          ))}
          <button className="block px-4 py-2 w-[95%] mx-auto text-gray-700 hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white transition-all duration-300 ease-in-out rounded-lg transform hover:w-full text-left">
            Logout
          </button>
        </nav>
      </div>

      {/* Overlay for mobile view */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 lg:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header with a button to toggle the sidebar */}
        <header className="flex items-center justify-between bg-white shadow-md p-4">
          <button
            className="lg:hidden focus:outline-none text-gray-700"
            onClick={toggleSidebar}
          >
            {/* Hamburger and Close (X) Icon */}
            <svg
              className={`w-6 h-6 transform transition-transform duration-500 ease-in-out ${
                isSidebarOpen ? "rotate-45 transform translate-y-1" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
                className={`${isSidebarOpen ? "hidden" : "block"}`} // Hide on open
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 6l12 12M6 18L18 6"
                className={`${isSidebarOpen ? "block" : "hidden"}`} // Show on open
              />
            </svg>
          </button>
          <h1 className="text-2xl font-semibold">Fancy Dashboard</h1>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 p-6 bg-gray-100 max-md:block max-md:p-0">
          <Outlet />
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <h2 className="text-lg font-semibold">Card 1</h2>
              <p>Some content for card 1.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <h2 className="text-lg font-semibold">Card 2</h2>
              <p>Some content for card 2.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <h2 className="text-lg font-semibold">Card 3</h2>
              <p>Some content for card 3.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <h2 className="text-lg font-semibold">Card 4</h2>
              <p>Some content for card 4.</p>
            </div>
          </div> */}
        </main>
      </div>
    </div>
  );
}

export default Admin;
