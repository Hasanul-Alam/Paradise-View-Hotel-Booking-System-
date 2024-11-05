import { FaPlay } from "react-icons/fa";

export default function HeroSection() {
  // Get today's date in 'YYYY-MM-DD' format
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="w-[75%] mx-auto py-10 max-md:w-[95%]">
      <div className="grid grid-cols-2 gap-4 justify-between items-center max-md:grid-cols-1">
        <div className="col-span">
          <h2 className="font-dancing text-5xl font-semibold text-[#7C6A46] max-md:text-center max-md:text-3xl">
            Paradise view
          </h2>
          <h2 className="font-raleway font-semibold text-6xl mt-10 mb-6 max-md:text-center max-md:text-4xl max-md:mt-5">
            Hotel for every <br /> moment rich in <br /> emotion
          </h2>
          <p className="font-raleway text-sm max-md:text-center max-md:text-lg">
            Every moment feels like the first time <br /> in paradise view
          </p>
          {/* Buttons */}
          <div className="flex gap-4 items-center mt-6 max-md:justify-center">
            <button className="bg-[#7C6A46] text-white px-3 py-2 rounded hover:bg-[#8C6B27]">
              Book Now
            </button>
            <button className="bg-[#00A699] p-4 rounded-full text-white">
              <FaPlay />
            </button>
            <p className="font-raleway text-lg">Take a tour</p>
          </div>
        </div>
        <div className="">
          <img
            className="w-full"
            src="https://assets.milestoneinternet.com/cdn-cgi/image/f=auto/hollywood-roosevelt/the-hollywood-roosevelt-hotel-388523/thehollywoodroosevelt/home-hero-slider/tropicana-pool.jpg?width=1500&height=852"
            alt=""
          />
        </div>
      </div>

      {/* Booking Form */}
      <div className="container mx-auto p-4 mt-10">
        <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-6 max-md:grid-cols-2 items-center space-y-4 md:space-y-0">
          {/* Location */}
          <div className="flex items-center space-x-2 justify-self-center max-md:mt-4 max-md:justify-self-start">
            <span className="text-xl">
              <i className="fas fa-map-marker-alt"></i>
            </span>
            <div>
              <p className="text-sm font-semibold">Location</p>
              <select className="text-sm text-gray-500">
                <option>Abuja</option>
                <option>Lagos</option>
                <option>Kano</option>
              </select>
            </div>
          </div>

          {/* Room Type */}
          <div className="flex items-center space-x-2 justify-self-center max-md:justify-self-end">
            <span className="text-xl">
              <i className="fas fa-hotel"></i>
            </span>
            <div>
              <p className="text-sm font-semibold">Room type</p>
              <select className="text-sm text-gray-500">
                <option>Standard</option>
                <option>Deluxe</option>
                <option>Suite</option>
              </select>
            </div>
          </div>

          {/* Person */}
          <div className="flex items-center space-x-2 justify-self-center max-md:justify-self-start">
            <span className="text-xl">
              <i className="fas fa-user"></i>
            </span>
            <div>
              <p className="text-sm font-semibold">Person</p>
              <select className="text-sm text-gray-500">
                <option>01</option>
                <option>02</option>
                <option>03</option>
              </select>
            </div>
          </div>

          {/* Check-in */}
          <div className="flex items-center space-x-2 justify-self-center max-md:justify-self-end">
            <span className="text-xl">
              <i className="fas fa-calendar-alt"></i>
            </span>
            <div>
              <p className="text-sm font-semibold">Check in</p>
              <input
                type="date"
                className="text-sm text-gray-500"
                min={today} // Disable past dates
                defaultValue={today}
              />
            </div>
          </div>

          {/* Check-out */}
          <div className="flex items-center space-x-2 justify-self-center max-md:justify-self-start">
            <span className="text-xl">
              <i className="fas fa-calendar-alt"></i>
            </span>
            <div>
              <p className="text-sm font-semibold">Check out</p>
              <input
                type="date"
                className="text-sm text-gray-500"
                min={today} // Disable past dates
                defaultValue="2023-03-13"
              />
            </div>
          </div>

          {/* Book Now Button */}
          <div className="justify-self-center max-md:justify-self-end">
            <button className="bg-[#7C6A46] text-white px-3 py-2 rounded hover:bg-[#8C6B27]">
              Book Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
