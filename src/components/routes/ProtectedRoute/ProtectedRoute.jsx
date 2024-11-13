import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loading = useSelector((state) => state.auth.loading);

  // Show a loading spinner or any loading UI while loading is true
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-solid border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Once loading is done, if the user is not logged in, redirect
  if (!isLoggedIn) {
    window.alert("You need to be logged in to access this page!");
    return <Navigate to="/" />;
  }

  // If logged in, render the protected content
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
