import { useEffect, useState } from "react";

export default function LuxuriousRooms() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width as per your mobile breakpoint (768px for 'md')
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Add listener for resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup listener on component unmount
  }, []);
  return (
    <div
      className="relative bg-cover bg-center h-auto py-16 font-raleway bg-none"
      style={{
        backgroundImage: !isMobile
          ? `url('https://i.ibb.co.com/WxPN3fF/Hotel-rooms-bg.png')`
          : "none",
      }}
    >
      {/* Overlay with opacity */}
      <div
        className={`absolute inset-0 bg-[#7C6A46] opacity-80 ${
          isMobile ? "hidden" : "block"
        }`}
      ></div>

      {/* Centered content */}
      <div className="relative z-10 flex justify-center h-full">
        <div>
          {/* Heading and texts */}
          <div className={`${isMobile ? "text-black" : "text-white"}`}>
            <h2 className=" text-5xl font-semibold text-center max-md:text-3xl">
              Luxurious Rooms
            </h2>
            {/* Horizontal Line */}
            <div className="flex justify-center my-5">
              <div className="w-[150px] items-center h-[2px] bg-white max-md:bg-black"></div>
            </div>
            <p className="text-center">
              All rooms are designed for your comfort
            </p>
          </div>
          {/* Cards */}
          <div
            className={` justify-between gap-16 mt-10 ${
              isMobile ? "flex-none" : "flex"
            }`}
          >
            <div className="px-5 py-5 shadow bg-white rounded-lg">
              <img src="https://i.ibb.co.com/mhyQvZq/Rectangle-10.png" alt="" />
              <p className="mt-3">Television set, Extra sheets and Breakfast</p>
            </div>
            <div className="px-5 py-5 shadow bg-white rounded-lg">
              <img src="https://i.ibb.co.com/ZBNL7yr/Rectangle-10-2.png" alt="" />
              <p className="mt-3">Television set, Extra sheets and Breakfast</p>
            </div>
            <div className="px-5 py-5 shadow bg-white rounded-lg">
              <img src="https://i.ibb.co.com/dQnGzFm/Rectangle-10-1.png" alt="" />
              <p className="mt-3">Television set, Extra sheets and Breakfast</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
