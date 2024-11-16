import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function Bookings() {
  const { user } = useSelector((state) => state.auth);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [checkedBookings, setCheckedBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCancelation = (id) => {
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
        setLoading(true);
        axios.delete(`https://paradise-view-server.onrender.com/bookings/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            setTimeout(() => {
              Swal.fire({
                title: "Cancelled!",
                text: "Your booking has been cancelled.",
                icon: "success",
              });
              loadBookings();
              setLoading(false);
            }, 500);
          }
        });
      }
    });
  };
  const getBookings = () => {
    const response = axios.get(`https://paradise-view-server.onrender.com/bookings/${user.email}`);
    return response;
  };
  const loadBookings = async () => {
    setLoading(true)
    const pendingBookings = [];
    const confirmedBookings = [];
    const bookings = await getBookings();
    // console.log(bookings)
    if (bookings) {
      bookings.data.map((item) => {
        if (item.status === "Pending") {
          pendingBookings.push(item);
        } else {
          confirmedBookings.push(item);
        }
      });
      setPendingBookings(pendingBookings);
      setCheckedBookings(confirmedBookings);
      setLoading(false)
    }
  };
  useEffect(() => {
    loadBookings();
  }, []);
  return (
    <div className="max-md:py-10 max-md:w-[95%] mx-auto relative z-20">
      {/* Upcoming Booking */}
      <div>
        {/* Heading */}
        <h2
          className={`text-3xl font-semibold ml-2 ${
            pendingBookings.length ? "block" : "hidden"
          }`}
        >
          Pending Bookings
        </h2>
        {pendingBookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-slate-200 px-8 py-5 rounded-lg my-5 max-md:my-3 flex items-center justify-between max-md:px-3 max-md:py-2"
          >
            <div>
              <h2 className="text-xl font-semibold max-md:text-lg">
                Paradise View
              </h2>
              <p className="text-gray-600 text-sm mt-2 max-md:mt-1">
                Check-in: {booking.startDate}
              </p>
              <p className="text-gray-600 text-sm ">
                Check-out: {booking.endDate}
              </p>
            </div>
            <div>
              {/* Cancellation Button */}
              <button
                onClick={() => handleCancelation(booking._id)}
                className="bg-red-600 px-5 py-2 rounded-lg text-white max-md:text-sm max-md:px-2 max-md:py-1 max-md:rounded"
              >
                Cancle
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking History */}
      <div className={`${pendingBookings.length ? 'my-20' : 'my-5' }`}>
        {/* Heading */}
        <h2
          className={`text-3xl font-semibold ml-2 ${
            checkedBookings.length ? "block" : "hidden"
          }`}
        >
          Booking History
        </h2>
        {/* Cards */}
        {checkedBookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-slate-200 px-8 py-5 rounded-lg my-5 flex items-center justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">Paradise View</h2>
              <p className="text-gray-600 text-sm mt-2">
                Check-in: {booking.startDate}
              </p>
              <p className="text-gray-600 text-sm ">
                Check-out: {booking.endDate}
              </p>
            </div>
            <div>
              {/* Booking Status */}
              <p
                className={`text-sm ${
                  booking.status === "Cancelled"
                    ? "text-red-600"
                    : "text-green-600"
                } font-semibold`}
              >
                {booking.status}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Loading Spinner Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin">
            
          </div>
        </div>
      )}
    </div>
  );
}
