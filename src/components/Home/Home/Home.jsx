import Footer from "../../shared/Footer/Footer";
import Navbar from "../../shared/Navbar/Navbar";
import Facilities from "../Facilities/Facilities";
import HeroSection from "../HeroSection/HeroSection";


export default function Home() {
  return (
    <>
        <Navbar />
        <HeroSection />
        <Facilities />
        <Footer />
    </>
  )
}
