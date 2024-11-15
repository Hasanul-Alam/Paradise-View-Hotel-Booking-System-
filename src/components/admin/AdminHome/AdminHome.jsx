import { useEffect, useState } from "react";
import BookingsChart from "./BookingsChart";
import axios from "axios";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  // Get All Bookings
  const getBookings = async () => {
    const response = await axios.get(`http://localhost:3000/bookings`);
    await setBookings(response.data);
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div>
      <div className="p-6 max-md:px-2">
        <BookingsChart bookingData={bookings} />
      </div>
      <div className="w-[80%] mx-auto max-md:w[95%]">
        <div className="grid grid-cols-12 justify-between gap-8">
          {/* Total users */}
          <div className="bg-white shadow shadow-lg px-3 py-2 rounded-lg col-span-2">
            <h2 className="text-lg font-semibold">Total users: 185</h2>
            <p className="text-lg font-semibold">Total admins: 185</p>
          </div>
          {/* Total rooms */}
          <div className="bg-white shadow shadow-lg px-3 py-2 rounded-lg col-span-2">
            <p className="text-lg font-semibold">Total Rooms: 185</p>
            <p className="text-lg font-semibold">Suit: 10</p>
            <p className="text-lg font-semibold">Deluxe: 18</p>
            <p className="text-lg font-semibold">Standard: 21</p>
          </div>
          {/* Newsletter emails */}
          <div className="bg-white shadow shadow-lg px-3 py-2 rounded-lg col-span-7">
            <p className="text-xl font-semibold mb-5 inline-block border-b-2 border-black">
              Newsletter Emails (145)
            </p>
            <ol className="list-decimal pl-5 font-semibold">
              <li>gullu@gmail.com</li>
              <li>gullu@gmail.com</li>
              <li>gullu@gmail.com</li>
              <li className="list-none">..........</li>
            </ol>
            <div className="flex justify-center">
              <button className="bg-blue-600 px-3 py-1 rounded text-white hover:bg-blue-800">
                See More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
