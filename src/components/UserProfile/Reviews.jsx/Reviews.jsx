import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

import { loadingStart, loadingEnd } from "../../../features/auth/authSlice";

export default function Reviews() {
  const [rating, setRating] = useState(0);
  const [givenRating, setGivenRating] = useState(3);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [apartmentName, setApartmentName] = useState("");
  const [review, setReview] = useState("");

  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Handle when a star is clicked
  const handleClick = (value) => {
    setRating(value);
  };

  // Handle when mouse hovers over a star
  const handleMouseOver = (value) => {
    setHoverRating(value);
  };

  // Handle when mouse leaves the star
  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  // Clear form Function
  const clearForm = () => {
    setApartmentName("");
    setName("");
    setReview("");
    setRating(0);
  };

  // Handle review form submit
  const handleReviewSubmit = async (e) => {
    let defaultRating;
    rating === 0 ? (defaultRating = 5) : (defaultRating = rating);
    dispatch(loadingStart());
    e.preventDefault();
    const data = {
      apartmentName,
      name,
      review,
      rating: defaultRating,
      userImage: user.photoURL,
    };
    const response = await axios.post(`http://localhost:3000/reviews`, data);
    if (response.data.insertedId) {
      setTimeout(() => {
        dispatch(loadingEnd());
        Swal.fire({
          title: "Review Submitted",
          text: "Your constructive opinion has been submitted successfully.",
          icon: "success",
        });
        clearForm();
      }, 800);
    }
  };
  return (
    <div className="w-[80%] mx-auto max-md:w-[95%] py-10">
      {/* Review form */}
      <div className="w-[60%] mx-auto max-md:w-full px-8 py-5 bg-white shadow shadow-lg max-md:shadow-none max-md:bg-transparent rounded-lg max-md:px-3">
        <form action="" onSubmit={handleReviewSubmit}>
          {/* Apartment Name */}
          <div>
            <label
              htmlFor="apartment"
              className="ml-1 text-lg font-semibold block"
            >
              Apartment Name
            </label>
            <input
              type="text"
              id="apartment"
              value={apartmentName}
              onChange={(e) => setApartmentName(e.target.value)}
              placeholder="Apartment"
              className="px-5 py-2 border border-1 border-black rounded w-full my-2"
            />
          </div>
          {/* Name */}
          <div className="my-3">
            <label htmlFor="name" className="ml-1 text-lg font-semibold block">
              Your Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="px-5 py-2 border border-1 border-black rounded w-full my-2"
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="ml-1 text-lg font-semibold block">
              Email
            </label>
            <input
              readOnly
              value={user.email}
              type="text"
              id="email"
              placeholder="Apartment"
              className="px-5 py-2 border border-gray-500 rounded w-full my-2 text-slate-800 font-semibold focus:outline-none"
            />
          </div>
          {/* Review */}
          <div className="my-3">
            <label
              htmlFor="review"
              className="ml-1 text-lg font-semibold block"
            >
              Review
            </label>
            <textarea
              rows={5}
              type="text"
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Enter your constructive review."
              className="px-5 py-2 border border-1 border-black rounded w-full my-2"
            />
          </div>
          {/* Rating */}
          <div className="border border-1 border-black px-5 py-5 rounded">
            <label
              htmlFor="rating"
              className="text-lg font-semibold block mb-2"
            >
              Overall Experience
            </label>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;

                return (
                  <svg
                    key={index}
                    onClick={() => handleClick(starValue)}
                    onMouseOver={() => handleMouseOver(starValue)}
                    onMouseLeave={handleMouseLeave}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={
                      (hoverRating || rating) >= starValue ? "green" : "none"
                    }
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 cursor-pointer text-green-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.105 6.461a1 1 0 00.95.69h6.798c.969 0 1.371 1.24.588 1.81l-5.508 4.002a1 1 0 00-.364 1.118l2.106 6.462c.299.92-.755 1.688-1.54 1.118L12 18.384l-5.595 4.106c-.785.57-1.839-.198-1.54-1.118l2.105-6.462a1 1 0 00-.364-1.118L1.1 11.887c-.783-.57-.38-1.81.588-1.81h6.798a1 1 0 00.95-.69l2.105-6.461z"
                    />
                  </svg>
                );
              })}
            </div>
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

      {/* Past Reviews */}
      <div className="mt-20">
        {/* Heading */}
        <div className="flex justify-center mb-10">
          <span className="text-4xl font-semibold text-center py-3 border-b-2 border-black px-5 max-md:text-3xl max-md:px-2 max-md:border-b-1">
            Previous Reviews
          </span>
        </div>
        {/* Review Card */}
        <div className="bg-slate-200 px-8 py-4 rounded-lg my-5 max-md:py-3 max-md:px-3">
          <h2 className="text-xl font-semibold">Greeen Valy Resort</h2>
          <p className="text-sm my-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia sed
            aspernatur dicta exercitationem modi inventore, praesentium
            voluptatem quia earum nulla?
          </p>
          <div className="flex space-x-1">
            {Array.from({ length: 5 }, (star, index) => (
              <svg
                key={index}
                className={`w-6 h-6 ${
                  index < givenRating ? "text-yellow-500" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
        </div>
        {/* Review Card */}
        <div className="bg-slate-200 px-8 py-4 rounded-lg my-5">
          <h2 className="text-xl font-semibold">Greeen Valy Resort</h2>
          <p className="text-sm my-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia sed
            aspernatur dicta exercitationem modi inventore, praesentium
            voluptatem quia earum nulla?
          </p>
          <div className="flex space-x-1">
            {Array.from({ length: 5 }, (star, index) => (
              <svg
                key={index}
                className={`w-6 h-6 ${
                  index < givenRating ? "text-yellow-500" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
        </div>
        {/* Review Card */}
        <div className="bg-slate-200 px-8 py-4 rounded-lg my-5">
          <h2 className="text-xl font-semibold">Greeen Valy Resort</h2>
          <p className="text-sm my-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia sed
            aspernatur dicta exercitationem modi inventore, praesentium
            voluptatem quia earum nulla?
          </p>
          <div className="flex space-x-1">
            {Array.from({ length: 5 }, (star, index) => (
              <svg
                key={index}
                className={`w-6 h-6 ${
                  index < givenRating ? "text-yellow-500" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      {/* Spinner */}
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50 w-full h-[100%]">
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
