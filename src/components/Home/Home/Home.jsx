import Footer from "../../shared/Footer/Footer";
import Navbar from "../../shared/Navbar/Navbar";
import Facilities from "../Facilities/Facilities";
import HeroSection from "../HeroSection/HeroSection";
import LuxuriousRooms from "../LuxuriousRooms/LuxuriousRooms";
import Testimonials from "../Testimonials/Testimonials";


export default function Home() {
  return (
    <>
        <Navbar />
        <HeroSection />
        <Facilities />
        <LuxuriousRooms />
        <Testimonials />
        <Footer />
    </>
  )
}
