import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home/Home";
import Explore from "./components/Explore/Explore/Explore";
import Rooms from "./components/Rooms/Rooms/Rooms";
import About from "./components/About/About/About";
import Contact from "./components/Contact/Contact/Contact";
import NotFound from "./components/NotFound/NotFound";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import UserProfile from "./components/UserProfile/UserProfile";
import ProtectedRoute from "./components/routes/ProtectedRoute/ProtectedRoute";
import Bookings from "./components/UserProfile/Bookings/Bookings";
import PaymentMethod from "./components/UserProfile/PaymentMethod/PaymentMethod";
import ProfileHome from "./components/UserProfile/ProfileHome/ProfileHome";
import Reviews from "./components/UserProfile/Reviews.jsx/Reviews";
import { PersistGate } from "redux-persist/integration/react";
import Admin from "./components/admin/Admin/Admin";
import AdminHome from "./components/admin/AdminHome/AdminHome";
import Users from "./components/admin/Users/Users";
import ManageRooms from "./components/admin/ManageRooms/ManageRooms";
import ManageBookings from "./components/admin/ManageBookings/ManageBookings";
import Newsletters from "./components/admin/Newsletters/Newsletters";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/explore",
    element: <Explore />,
  },
  {
    path: "/rooms",
    element: <Rooms />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  // Admin Routes Starts Here....
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "/admin",
        element: <AdminHome />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "manage-rooms",
        element: <ManageRooms />,
      },
      {
        path: "manage-bookings",
        element: <ManageBookings />,
      },
      {
        path: "newsletters",
        element: <Newsletters />,
      },
    ]
  },
  // Admin Routes Ends Here....
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/profile",
        element: <ProfileHome />,
      },
      {
        path: "reviews",
        element: <Reviews />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "paymentMethod",
        element: <PaymentMethod />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
