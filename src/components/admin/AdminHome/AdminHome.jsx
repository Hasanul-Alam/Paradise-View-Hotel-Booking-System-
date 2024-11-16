import { useEffect, useState } from "react";
import BookingsChart from "./BookingsChart";
import useFetchData from "../../../hooks/useFetchData";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [standard, setStandard] = useState([]);
  const [deluxe, setDeluxe] = useState([]);
  const [suit, setSuit] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsletters, setNewsLetters] = useState([]);
  const { fetchData } = useFetchData();

  const getBookings = async () => {
    const bookingsData = await fetchData(`https://paradise-view-server.onrender.com/bookings`);
    setBookings(bookingsData);
    getAllData();
  };

  const getUsers = async () => {
    const usersData = await fetchData(`https://paradise-view-server.onrender.com/users`);
    setUsers(usersData);
    separateUserAndAdmin(usersData);
  };
  const getRooms = async () => {
    const roomsData = await fetchData(`https://paradise-view-server.onrender.com/rooms`);
    setRooms(roomsData);
    separateRoomType(roomsData);
  };

  const getNewsLetters = async () => {
    const newsLettersData = await fetchData(
      `https://paradise-view-server.onrender.com/newsletters`
    );
    setNewsLetters(newsLettersData);
  };

  const separateUserAndAdmin = async (users) => {
    let user = [];
    let admin = [];
    await users.map((item) => {
      if (item.role === "User") {
        user.push(item);
      } else {
        admin.push(item);
      }
    });
    setUsers(user);
    setAdmin(admin);
  };

  const separateRoomType = async (rooms) => {
    const standard = [];
    const deluxe = [];
    const suit = [];

    await rooms.map((item) => {
      if (item.type === "standard") {
        standard.push(item);
      } else if (item.type === "deluxe") {
        deluxe.push(item);
      } else {
        suit.push(item);
      }
    });
    setStandard(standard);
    setDeluxe(deluxe);
    setSuit(suit);
  };

  const getAllData = () => {
    getUsers();
    getRooms();
    getNewsLetters();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div>
      <div className="p-6 max-md:px-2">
        <BookingsChart bookingData={bookings} />
      </div>
      <div className="w-[80%] mx-auto max-md:w[95%] py-10">
        <div className="grid grid-cols-12 justify-between gap-8 max-md:grid-cols-none">
          {/* Total users */}
          <div className="bg-white shadow shadow-lg px-3 py-2 rounded-lg col-span-2 max-md:col-span-8">
            <h2 className="text-lg font-semibold">
              Total users: {users.length}
            </h2>
            <p className="text-lg font-semibold">
              Total admins: {admin.length}
            </p>
          </div>
          {/* Total rooms */}
          <div className="bg-white shadow shadow-lg px-3 py-2 rounded-lg col-span-2 max-md:col-span-8">
            <p className="text-lg font-semibold">Room Types: {rooms.length}</p>
            <p className="text-lg font-semibold">Suit: {suit.length}</p>
            <p className="text-lg font-semibold">Deluxe: {deluxe.length}</p>
            <p className="text-lg font-semibold">Standard: {standard.length}</p>
          </div>
          {/* Newsletter emails */}
          <div className="bg-white shadow shadow-lg px-3 py-2 rounded-lg col-span-8">
            <p className="text-xl font-semibold mb-5 inline-block border-b-2 border-black">
              Newsletter Emails ({newsletters.length})
            </p>
            <ol className="list-decimal pl-5 font-semibold">
              {newsletters.map((item) => (
                <li key={item._id}>{item.email}</li>
              ))}
              <li
                className={`list-none ${
                  newsletters.length > 2 ? "block" : "hidden"
                }`}
              >
                ..........
              </li>
            </ol>
            <div className="flex justify-center max-md:mt-5">
              <button
                onClick={toggleModal}
                className="bg-blue-600 px-3 py-1 rounded text-white hover:bg-blue-800"
              >
                See More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay and Content */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 opacity-0 animate-fadeIn"
            onClick={toggleModal}
          ></div>

          {/* Modal Content with Animation */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto relative z-10 transform transition-transform duration-500 ease-out scale-95 animate-slideInUp max-md:w-[95%] mx-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Newsletter Emails</h2>
              <button
                onClick={toggleModal}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                &#10005; {/* Close button (X icon) */}
              </button>
            </div>

            {/* Main Content */}
            <ol className="list-decimal pl-5 font-semibold">
              {newsletters.map((item) => (
                <li key={item._id}>{item.email}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
