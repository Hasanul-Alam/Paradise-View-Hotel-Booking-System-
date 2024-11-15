import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./ManageRooms.css";
import useFetchData from "../../../hooks/useFetchData";

export default function ManageRooms() {
  // const [rooms, setRooms] = useState([]);
  const [roomType, setRoomType] = useState("");
  const [totalRooms, setTotalRooms] = useState("");
  const [tariff, setTariff] = useState("");
  const [capacity, setCapacity] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [roomId, setRoomId] = useState("");
  const { data: rooms, fetchData } = useFetchData(
    `http://localhost:3000/rooms`
  );

  const [updateFormData, setUpdateFormData] = useState({
    type: "",
    totalRooms: "",
    tariff: "",
    capacity: "",
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data submitted:", updateFormData);
    const response = await axios.patch(
      `http://localhost:3000/rooms/${roomId}`,
      updateFormData
    );
    if (response) {
      Swal.fire({
        title: "Updated!",
        text: "Room info has been successfully updated.",
        icon: "success",
      });
      toggleModal();
      fetchData();
    }
  };
  // clear form
  const clearForm = () => {
    setRoomType("");
    setTotalRooms("");
    setTariff("");
    setCapacity("");
  };
  // Handle Add room
  const handleAddRoom = async (e) => {
    e.preventDefault();
    const data = {
      typeId: roomType,
      type: roomType,
      totalRooms,
      capacity,
      tariff,
    };
    const response = await axios.post("http://localhost:3000/rooms", data);
    if (response.data.insertedId) {
      Swal.fire({
        title: "Inserted!",
        text: "Room info has been successfully uploaded.",
        icon: "success",
      });
      clearForm();
      fetchData();
    }
  };

  // Room details update function
  const handleRoomUpdate = async (id) => {
    setRoomId(id);
    const response = await axios.get(`http://localhost:3000/rooms/${id}`);
    const data = response.data[0];
    setUpdateFormData({
      type: data.type,
      totalRooms: data.totalRooms,
      tariff: data.tariff,
      capacity: data.capacity,
    });
    toggleModal();
    console.log(response.data[0]);
  };

  // Delete Room
  const handleDeleteRoom = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/rooms/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your room data has been deleted.",
              icon: "success",
            });
            fetchData();
          }
        });
      }
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full mx-auto font-raleway">
      <h1 className="text-2xl font-semibold max-md:w-[95%] mx-auto max-md:mt-5">
        All Rooms
      </h1>
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
              <button
                onClick={() => handleRoomUpdate(item._id)}
                className="bg-green-700 px-2 py-1 text-white rounded hover:bg-green-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteRoom(item._id)}
                className="bg-red-700 px-2 py-1 text-white rounded hover:bg-red-600"
              >
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
            <label
              htmlFor="totalRooms"
              className="ml-1 text-lg font-semibold block"
            >
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
            <label
              htmlFor="tariff"
              className="ml-1 text-lg font-semibold block"
            >
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
            <label
              htmlFor="capacity"
              className="ml-1 text-lg font-semibold block"
            >
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
      {/* Modal Overlay and Content */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 opacity-0 animate-fadeIn"
            onClick={toggleModal}
          ></div>

          {/* Modal Content with Animation */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto relative z-10 transform transition-transform duration-500 ease-out scale-95 animate-slideInUp">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Update Room</h2>
              <button
                onClick={toggleModal}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                &#10005; {/* Close button (X icon) */}
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUpdateSubmit}>
              {/* Room Type */}
              <div className="mb-4">
                <label
                  htmlFor="roomType"
                  className="block text-gray-700 font-semibold"
                >
                  Room Type
                </label>
                <input
                  type="text"
                  name="roomType"
                  value={updateFormData.type}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none transition-colors"
                  placeholder="Enter Room Type"
                />
              </div>

              {/* total rooms */}
              <div className="mb-4">
                <label
                  htmlFor="totalRooms"
                  className="block text-gray-700 font-semibold"
                >
                  Total Rooms
                </label>
                <input
                  type="number"
                  name="totalRooms"
                  value={updateFormData.totalRooms}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none transition-colors"
                  placeholder="Total Rooms"
                />
              </div>
              {/* Tariff */}
              <div className="mb-4">
                <label
                  htmlFor="tariff"
                  className="block text-gray-700 font-semibold"
                >
                  Tariff
                </label>
                <input
                  type="number"
                  name="tariff"
                  value={updateFormData.tariff}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none transition-colors"
                  placeholder="Tariff"
                />
              </div>
              {/* Capacity */}
              <div className="mb-4">
                <label
                  htmlFor="capacity"
                  className="block text-gray-700 font-semibold"
                >
                  Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={updateFormData.capacity}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none transition-colors"
                  placeholder="Capacity of each room."
                />
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
