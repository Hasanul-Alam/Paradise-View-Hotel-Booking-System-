import Swal from "sweetalert2";

export default function Bookings() {
  const handleCancelation = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Cancelled!",
          text: "Your booking has been cancelled.",
          icon: "success"
        });
      }
    });
  }
  return (
    <div className="max-md:py-10 max-md:w-[95%] mx-auto">
      {/* Upcoming Booking */}
      <div>
        {/* Heading */}
        <h2 className="text-3xl font-semibold ml-2 max-md:text-2xl">Upcoming Booking</h2>
        {/* Cards */}
        <div className="bg-slate-200 px-8 py-5 rounded-lg my-5 max-md:my-3 flex items-center justify-between max-md:px-3 max-md:py-2">
          <div>
            <h2 className="text-xl font-semibold max-md:text-lg">Ocean Breeze Hotel</h2>
            <p className="text-gray-600 text-sm mt-2 max-md:mt-1">
              Check-in: 12 March 2024
            </p>
            <p className="text-gray-600 text-sm ">Check-out: 18 March 2024</p>
          </div>
          <div>
            {/* Cancellation Button */}
            <button onClick={handleCancelation} className="bg-red-600 px-5 py-2 rounded-lg text-white max-md:text-sm max-md:px-2 max-md:py-1 max-md:rounded">
              Cancle
            </button>
          </div>
        </div>
      </div>
      {/* Booking History */}
      <div className="my-20">
        {/* Heading */}
        <h2 className="text-3xl font-semibold ml-2">Booking History</h2>
        {/* Cards */}
        <div className="bg-slate-200 px-8 py-5 rounded-lg my-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Ocean Breeze Hotel</h2>
            <p className="text-gray-600 text-sm mt-2">
              Check-in: 12 March 2024
            </p>
            <p className="text-gray-600 text-sm ">Check-out: 18 March 2024</p>
          </div>
          <div>
            {/* Booking Status */}
            <p className="text-sm text-red-600 font-semibold">Canceled</p>
          </div>
        </div>
        {/* Cards */}
        <div className="bg-slate-200 px-8 py-5 rounded-lg my-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Ocean Breeze Hotel</h2>
            <p className="text-gray-600 text-sm mt-2">
              Check-in: 12 March 2024
            </p>
            <p className="text-gray-600 text-sm ">Check-out: 18 March 2024</p>
          </div>
          <div>
            {/* Booking Status */}
            <p className="text-sm text-green-600 font-semibold">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
