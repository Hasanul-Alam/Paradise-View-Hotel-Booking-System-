import Navbar from "../../shared/Navbar/Navbar";
import Banner from "../../shared/Banner/Banner";
import Footer from "../../shared/Footer/Footer";
import Body from "../Body/Body";


export default function Rooms() {
  return (
    <>
    <Navbar />
      <Banner imageUrl={'https://i.ibb.co.com/zZV6D4S/video-2.png'} bannerHeading={'Rooms And Suites'} bannerText1={'The elegant luxury bedrooms in this gallery showcase custom interior'} bannerText2={'designs & decorating ideas. View pictures and find your'} bannerText3={'perfect luxury bedroom design.'} arrowIcon={true}/>
      <Body />
      <Footer />
    </>
  )
}
