import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ManageRooms() {
  const [rooms, setRooms] = useState([]);
  const [roomType, setRoomType] = useState('');
  const [totalRooms, setTotalRooms] = useState('');
  const [tariff, setTariff] = useState('');
  const [capacity, setCapacity] = useState('');

  const getAllRooms = async () => {
    const response = await axios.get(`http://localhost:3000/rooms`);
    setRooms(response.data);
  };
  // clear form
  const clearForm = () => {
    setRoomType('');
    setTotalRooms('');
    setTariff('');
    setCapacity('');
  }
  // Handle Add room
  const handleAddRoom = async(e) => {
    e.preventDefault();
    const data = {
      typeId: roomType,
      type: roomType,
      totalRooms,
      capacity,
      tariff
    }
    const response = await axios.post("http://localhost:3000/rooms", data)
    if(response.data.insertedId){
      Swal.fire({
        title: "Inserted!",
        text: "Room info has been successfully uploaded.",
        icon: "success"
      });
      clearForm();
      getAllRooms();
    }
  }
  useEffect(() => {
    getAllRooms();
  }, []);
  return (
    <div className="w-full mx-auto font-raleway">
      <h1 className="text-2xl font-semibold max-md:w-[95%] mx-auto max-md:mt-5">All Rooms</h1>
      <div className="my-5 max-md:w-[95%] mx-auto">
        {rooms.map((item) => (
          <div
            key={item._id}
            className="bg-white p-3 shadow-lg rounded-lg inline-block max-md:block mr-5 max-md:mr-0 hover:cursor-pointer transition-shadow transform hover:scale-105 transition-transform duration-300 ease-in-out hover:bg-blue-500 transition-colors hover:text-white max-md:mt-5"
          >
            <h3 className="text-xl font-semibold capitalize">{item.type}</h3>
            <p className="text-sm mt-1">Total rooms: {item.totalRooms}</p>
            <p className="text-sm mb-1">
              Capacity (Each room): {item.capacity} person
            </p>
            <p className="text-sm font-semibold">Tariff: ${item.tariff}</p>
            {/* Update & Delete button */}
            <div className="flex gap-2 mt-2">
              <button className="bg-green-700 px-2 py-1 text-white rounded hover:bg-green-600">
                Update
              </button>
              <button className="bg-red-700 px-2 py-1 text-white rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <h1 className="text-3xl font-semibold text-center mt-20 inline-block py-2 px-5 border-b-2 border-purple-600">
          Add More Rooms
        </h1>
      </div>
      {/* Add Rooms Form */}
      <div className="w-[40%] mx-auto max-md:w-full px-8 py-5 bg-white shadow shadow-lg max-md:shadow-none max-md:bg-transparent rounded-lg max-md:px-3 my-5">
        <form action="" onSubmit={handleAddRoom}>
          {/* Room Type */}
          <div>
            <label
              htmlFor="roomType"
              className="ml-1 text-lg font-semibold block"
            >
              Room Type
            </label>
            <input
              type="text"
              id="roomType"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              placeholder="Room Type"
              className="px-5 py-2 border border-1 border-black rounded w-full my-2"
            />
          </div>
          {/* Room count */}
          <div className="my-3">
            <label htmlFor="totalRooms" className="ml-1 text-lg font-semibold block">
              Total Rooms
            </label>
            <input
              type="number"
              id="totalRooms"
              value={totalRooms}
              onChange={(e) => setTotalRooms(e.target.value)}
              placeholder="Total rooms of this category"
              className="px-5 py-2 border border-1 border-black rounded w-full my-2"
            />
          </div>
          {/* Tariff */}
          <div>
            <label htmlFor="tariff" className="ml-1 text-lg font-semibold block">
              Tariff
            </label>
            <input
              value={tariff}
              onChange={(e) => setTariff(e.target.value)}
              type="number"
              id="tariff"
              placeholder="Tariff"
              className="px-5 py-2 border border-gray-500 rounded w-full my-2 text-slate-800 font-semibold focus:outline-none"
            />
          </div>
          {/* Capacity */}
          <div className="mt-2">
            <label htmlFor="capacity" className="ml-1 text-lg font-semibold block">
              Capacity
            </label>
            <input
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              type="number"
              id="capacity"
              placeholder="How many person can stay in each room?"
              className="px-5 py-2 border border-gray-500 rounded w-full my-2 text-slate-800 font-semibold focus:outline-none"
            />
          </div>
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-[#7C6A46] text-white text-lg rounded-lg px-5 py-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
