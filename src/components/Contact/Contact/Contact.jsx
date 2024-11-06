import Banner from "../../shared/Banner/Banner";
import Footer from "../../shared/Footer/Footer";
import Navbar from "../../shared/Navbar/Navbar";
import ContactForm from "../ContactForm/ContactForm";
import Map from "../Map/Map";


export default function Contact() {
  return (
    <>
      <Navbar />
      <Banner imageUrl={'https://i.ibb.co.com/zZV6D4S/video-2.png'} bannerHeading={'Contact Us'} bannerText1={'The elegant luxury bedrooms in this gallery showcase custom interior'} bannerText2={'designs & decorating ideas. View pictures and find your'} bannerText3={'perfect luxury bedroom design.'} arrowIcon={false} />
      <ContactForm />
      <Map />
      <Footer />
    </>
  )
}
