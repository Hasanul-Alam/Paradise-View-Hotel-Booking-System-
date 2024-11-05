import "./App.css";
import Banner from "./components/Banner/Banner";
import Body from "./components/Body/Body";
import Footer from "./components/shared/Footer/Footer";
import Navbar from "./components/shared/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Banner />
      <Body />
      <Footer />
    </>
  );
}

export default App;
