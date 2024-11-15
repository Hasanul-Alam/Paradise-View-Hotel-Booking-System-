import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);

  // Get all bookings
  const getAllBookings = async () => {
    const response = await axios.get(`http://localhost:3000/bookings`);
    setBookings(response.data);
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  const handleConfirmBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        Swal.fire({
          title: "Confirmed!",
          text: "Booking has been confirmed.",
          icon: "success",
        });
      }
    });
  };

  const handleCancelBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        Swal.fire({
          title: "Cancelled!",
          text: "Booking has been cancelled.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-3xl font-bold text-center mb-6">User List</h1> */}

        {/* Responsive table wrapper */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-left table-auto">
            <thead className="bg-indigo-600 text-white">
              <tr className="text-center">
                <th className="py-3 px-6">#</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Room Type</th>
                <th className="py-3 px-6">Num of Rooms</th>
                <th className="py-3 px-6">Persons</th>
                <th className="py-3 px-6">Check-In</th>
                <th className="py-3 px-6">Check-Out</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking, index) => (
                <tr key={booking._id} className="hover:bg-gray-100 text-center">
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{booking.email}</td>
                  <td className="py-3 px-6">{booking.roomType}</td>
                  <td className="py-3 px-6">{booking.roomsBooked}</td>
                  <td className="py-3 px-6">{booking.numOfPersons}</td>
                  <td className="py-3 px-6">{booking.startDate}</td>
                  <td className="py-3 px-6">{booking.endDate}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                        booking.status === "Confirmed"
                          ? "bg-green-200 text-green-800"
                          : booking.status === "Cancelled"
                          ? "bg-red-200 text-black"
                          : "bg-blue-200 text-blue-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 flex justify-center items-center gap-x-3">
                    <button
                      onClick={() => handleConfirmBooking(booking._id)}
                      className={`${
                        booking.status === "Confirmed" || booking.status ==="Cancelled"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600"
                      } p-3 text-white rounded-lg`}
                      disabled={booking.status === "Confirmed" || booking.status ==="Cancelled"}
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className={`${
                        booking.status === "Confirmed" || booking.status ==="Cancelled"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600"
                      } p-3 text-white rounded-lg`}
                      disabled={booking.status === "Confirmed" || booking.status ==="Cancelled"}
                    >
                      <ImCross />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fallback for very small screens with fancy cards */}
        <div className="block lg:hidden mt-6 space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-4 overflow-y-auto"
            >
              {/* Avatar + Name + Role */}
              <div className="flex items-center justify-between items-center">
                <div>
                  <p className="text-lg font-bold capitalize">
                    {booking.roomType}
                  </p>
                  <p className="text-sm text-gray-500">{booking.email}</p>
                  <p className="text-sm font-bold my-1">
                    Rooms: {booking.roomsBooked}
                  </p>
                  <p className="text-sm font-bold">
                    Person: {booking.numOfPersons}
                  </p>
                </div>
                <div>
                  <p className=" font-bold">{booking.startDate}</p>
                  <p className="text-center">to</p>
                  <p className=" font-bold mb-2">{booking.endDate}</p>
                  <span
                    className={`px-3 py-[3px] text-sm font-semibold rounded-full ${
                      booking.status === "Confirmed"
                        ? "bg-green-200 text-green-800"
                        : booking.status === "Cancelled"
                        ? "bg-red-200 text-red-800"
                        : "bg-blue-200 text-blue-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => handleConfirmBooking(booking._id)}
                  className={`${
                    booking.status === "Confirmed" || booking.status ==="Cancelled"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600"
                  } p-3 text-white rounded-lg`}
                  disabled={booking.status === "Confirmed" || booking.status ==="Cancelled"}
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className={`${
                    booking.status === "Confirmed" || booking.status ==="Cancelled"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600"
                  } p-3 text-white rounded-lg`}
                  disabled={booking.status === "Confirmed" || booking.status ==="Cancelled"}
                >
                  <ImCross />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
