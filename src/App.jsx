import "./App.css";
import Body from "./components/Body/Body";
import Banner from "./components/shared/Banner/Banner";
import Footer from "./components/shared/Footer/Footer";
import Navbar from "./components/shared/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Banner imageUrl={'https://i.ibb.co.com/zZV6D4S/video-2.png'} bannerHeading={'Rooms And Suites'} bannerText1={'The elegant luxury bedrooms in this gallery showcase custom interior'} bannerText2={'designs & decorating ideas. View pictures and find your'} bannerText3={'perfect luxury bedroom design.'} arrowIcon={true}/>
      <Body />
      <Footer />
    </>
  );
}

export default App;
