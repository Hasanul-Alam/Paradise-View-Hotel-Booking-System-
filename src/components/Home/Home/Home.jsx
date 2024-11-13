import { useSelector } from "react-redux";
import Footer from "../../shared/Footer/Footer";
import Navbar from "../../shared/Navbar/Navbar";
import Facilities from "../Facilities/Facilities";
import HeroSection from "../HeroSection/HeroSection";
import LuxuriousRooms from "../LuxuriousRooms/LuxuriousRooms";
import Testimonials from "../Testimonials/Testimonials";

export default function Home() {
  const { loading } = useSelector((state) => state.auth);
  return (
    <div className="relative">
      <Navbar />
      <HeroSection />
      <Facilities />
      <LuxuriousRooms />
      <Testimonials />
      <Footer />
      {/* Loading Spinner Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
