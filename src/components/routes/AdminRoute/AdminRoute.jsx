import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);

  // Show a loading spinner or any loading UI while loading is true
  if (loading) {
    return children
  }

  // Once loading is done, if the user is not logged in, redirect
  if (!isLoggedIn) {
    Swal.fire({
      icon: "error",
      title: "Access Denied",
      text: "Need to login with an admin account to access this page.",
    });
    return <Navigate to="/" />;
  }

  if(user.role === 'Admin'){
    return children;
  }

  // If logged in, render the protected content
  else{
    Swal.fire({
      icon: "error",
      title: "Access Denied",
      text: "Need to login with an admin account to access this page.",
    });
    return <Navigate to="/" />;
  }
}

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
