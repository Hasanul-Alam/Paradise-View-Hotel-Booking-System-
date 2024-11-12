import axios from "axios";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import Swal from "sweetalert2";

export default function HeroSection() {
  const [roomType, setRoomType] = useState("standard");
  const [person, setPerson] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const today = new Date().toISOString().split("T")[0];

  // API Base URL
  const apiUrl = "http://localhost:3000"; // Use your actual backend URL

  // Check room availability
  const checkRoomAvailability = async () => {
    try {
      const response = await axios.post(`${apiUrl}/check-availability`, {
        roomType,
        checkInDate,
        checkOutDate,
        rooms,
      });
      console.log(response)
      return response.data.available;
    } catch (error) {
      console.error("Error checking availability:", error);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!checkInDate || !checkOutDate) {
      Swal.fire({
        title: "Missing Dates!",
        text: "Please select both check-in and check-out dates.",
        icon: "warning",
      });
      return;
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkIn >= checkOut) {
      Swal.fire({
        title: "Invalid Dates!",
        text: "Check-in date should be earlier than check-out date.",
        icon: "error",
      });
      return;
    }

    // Check room availability
    const isAvailable = await checkRoomAvailability();

    if (isAvailable) {
      // Show summary and ask for confirmation
      Swal.fire({
        title: "Confirm Your Booking",
        html: `
          <strong>Room Type:</strong> ${roomType} <br/>
          <strong>Person(s):</strong> ${person} <br/>
          <strong>Room(s):</strong> ${rooms} <br/>
          <strong>Check-in:</strong> ${checkInDate} <br/>
          <strong>Check-out:</strong> ${checkOutDate} <br/>
        `,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Confirm Booking",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Make a booking request
          try {
            const bookingResponse = await axios.post(`${apiUrl}/book-room`, {
              email: "hasanulalam420@gmail.com", // Can use user email dynamically
              roomType,
              roomsBooked: rooms,
              numOfPersons: person,
              startDate: checkInDate,
              endDate: checkOutDate,
            });

            if (bookingResponse.data.success) {
              Swal.fire(
                "Booking Confirmed!",
                "Your booking has been processed.",
                "success"
              );
            }
          } catch (error) {
            console.error("Booking failed:", error);
            Swal.fire(
              "Error!",
              "Booking failed. Please try again later.",
              "error"
            );
          }
        }
      });
    } else {
      Swal.fire({
        title: "Room Unavailable!",
        text: "The selected room is unavailable for the given dates.",
        icon: "error",
      });
    }
  };

  return (
    <div className="w-[75%] mx-auto py-10 max-md:w-[95%]">
      <div className="grid grid-cols-2 gap-4 justify-between items-center max-md:grid-cols-1">
        <div>
          <h2 className="font-dancing text-5xl font-semibold text-[#7C6A46] max-md:text-center max-md:text-3xl">
            Paradise view
          </h2>
          <h2 className="font-raleway font-semibold text-6xl mt-10 mb-6 max-md:text-center max-md:text-4xl max-md:mt-5">
            Hotel for every <br /> moment rich in <br /> emotion
          </h2>
          <p className="font-raleway text-sm max-md:text-center max-md:text-lg">
            Every moment feels like the first time <br /> in paradise view
          </p>
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
        <div>
          <img
            className="w-full"
            src="https://assets.milestoneinternet.com/cdn-cgi/image/f=auto/hollywood-roosevelt/the-hollywood-roosevelt-hotel-388523/thehollywoodroosevelt/home-hero-slider/tropicana-pool.jpg?width=1500&height=852"
            alt=""
          />
        </div>
      </div>

      <div className="container mx-auto p-4 mt-10">
        <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-6 max-md:grid-cols-2 items-center space-y-4 md:space-y-0">
          {/* Room Type */}
          <div className="flex items-center space-x-2 justify-self-center max-md:justify-self-end">
            <span className="text-xl">
              <i className="fas fa-hotel"></i>
            </span>
            <div>
              <p className="text-sm font-semibold">Room type</p>
              <select
                className="text-sm text-gray-500 -ml-[4px]"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option value={"standard"}>{"Standard (2 Bed)"}</option>
                <option value={"deluxe"}>{"Deluxe (3 Bed)"}</option>
                <option value={"suit"}>{"Suite (4 Bed)"}</option>
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
              <select
                className="text-sm text-gray-500 -ml-[2px]"
                value={person}
                onChange={(e) => setPerson(e.target.value)}
              >
                <option value={1}>01</option>
                <option value={2}>02</option>
                <option value={3}>03</option>
                <option value={4}>04</option>
                <option value={5}>05</option>
                <option value={6}>06</option>
              </select>
            </div>
          </div>

          {/* Recommended Rooms */}
          <div className="flex items-center space-x-2 justify-self-center max-md:justify-self-start">
            <span className="text-xl">
              <i className="fas fa-user"></i>
            </span>
            <div>
              <p className="text-sm font-semibold">Rooms</p>
              <select
                className="text-sm text-gray-500 -ml-[2px]"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
              >
                <option value={1}>01 Room</option>
                <option value={2}>02 Rooms</option>
                <option value={3}>03 Rooms</option>
                <option value={4}>04 Rooms</option>
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
                min={today}
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
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
                min={today}
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </div>
          </div>

          {/* Book Now Button */}
          <div className="justify-self-center max-md:justify-self-end">
            <button
              className="bg-[#7C6A46] text-white px-3 py-2 rounded hover:bg-[#8C6B27]"
              onClick={handleSubmit}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
