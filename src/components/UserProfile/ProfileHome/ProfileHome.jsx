import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetchData from "../../../hooks/useFetchData";

const ProfileHome = () => {
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const {fetchData} = useFetchData();

  const { user, loading } = useSelector((state) => state.auth);

  const getBookings = async () => {
    const bookingsData = await fetchData(`https://paradise-view-server.onrender.com/bookings/${user.email}`)
    setBookings(bookingsData);
  }
  const getReviews = async () => {
    const reviewsData = await fetchData(`https://paradise-view-server.onrender.com/reviews/${user.email}`)
    setReviews(reviewsData);
  }

  useEffect(() => {
    getBookings();
    getReviews();
  },[])

  const handleEditProfile = () => {
    alert("Edit Profile functionality coming soon!");
  };

  const handleLogout = () => {
    alert("Logging out...");
  };



  if (loading) {
    return (
      <>
        <div className="min-h-screen flex justify-center items-center">
          <h2 className="text-3xl text-center">Loading...</h2>
        </div>
      </>
    ); // Show a loading spinner or any loading UI while checking the auth status
  }

  console.log('Error: ', user)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 max-md:p-0">
      <div className="w-[80%] mx-auto bg-white rounded-lg shadow-lg overflow-hidden max-md:w-full max-md:rounded">
        {/* Header with profile picture and cover image */}
        <div className="relative h-64 bg-gradient-to-r from-[#9da628] to-[#884d24]">
          <div className="absolute bottom-[-50px] left-4 sm:left-8">
            <img
              src={user.photoURL}
              alt="Profile"
              className="h-36 w-36 rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>

        {/* Profile Details */}
        <div className="pt-16 sm:pt-20 px-6 sm:px-8">
          <div className="sm:flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">
                {user.displayName}
              </h2>
              <p className="text-lg text-gray-500">
                {user.email}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-4">
              <button
                onClick={handleEditProfile}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Upcoming Bookings Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Upcoming Bookings
            </h3>
            <div className="space-y-4">
              {bookings
                .filter((booking) => booking.status === "Pending")
                .map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <p className="text-lg font-medium text-gray-700">
                        {booking.hotel}
                      </p>
                      <p className="text-sm text-gray-500">
                        Check-in: {booking.startDate}
                      </p>
                      <p className="text-sm text-gray-500">
                        Check-out: {booking.endDate}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-yellow-600">
                      {booking.status}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Booking History Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Booking History
            </h3>
            <div className="space-y-4">
            {bookings
                .filter((booking) => booking.status !== "Pending")
                .map((booking) => (
                <div
                  key={booking.id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      {booking.hotel}
                    </p>
                    <p className="text-sm text-gray-500">
                      Check-in: {booking.startDate}
                    </p>
                    <p className="text-sm text-gray-500">
                      Check-out: {booking.endDate}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      booking.status === "Confirmed"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Reviews
            </h3>
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <p className="text-lg font-medium text-gray-700">
                    {review.hotel}
                  </p>
                  <p className="text-sm text-gray-500">{review.review}</p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill={i < review.rating ? "green" : "gray"}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5 3 1-5-4-4 5-1L10 0l2 6 5 1-4 4 1 5-5-3z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHome;
