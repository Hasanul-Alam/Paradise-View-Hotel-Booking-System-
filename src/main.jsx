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
import Reviews from "./components/UserProfile/ProfileSettings/Reviews";
import { PersistGate } from "redux-persist/integration/react";

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
