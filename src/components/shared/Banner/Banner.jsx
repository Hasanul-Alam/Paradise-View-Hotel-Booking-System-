import { GoArrowDown } from "react-icons/go";
import PropTypes from "prop-types";
const Banner = ({
  imageUrl,
  bannerHeading,
  bannerText1,
  bannerText2,
  bannerText3,
  arrowIcon,
}) => {
  return (
    <div
      className="relative bg-cover bg-center h-[95vh] max-md:h-[70%] py-10"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      {/* Overlay with opacity */}
      <div className="absolute inset-0 bg-[#7C6A46] opacity-50"></div>

      {/* Centered content */}
      <div
        className={`z-10 flex items-center justify-center h-full ${
          arrowIcon ? "relative" : ""
        }`}
      >
        <div className="text-center">
          {/* Banner Heading */}
          <h1 className="text-white text-5xl font-bold mb-4 max-md:text-xl max-md:mt-5 animate-slideIn">
            {bannerHeading}
          </h1>
          {/* Banner Text */}
          <div className="mt-8 font-mulish max-md:mt-2">
            <p className="text-white text-lg max-md:text-xs animate-slideIn">
              {bannerText1}
            </p>
            <p className="text-white text-lg max-md:text-xs animate-slideIn">
              {bannerText2}
            </p>
            <p className="text-white text-lg max-md:text-xs animate-slideIn">
              {bannerText3}
            </p>
          </div>
          <div
            className={`flex justify-center mt-32 max-md:mt-8 ${
              arrowIcon ? "block" : "hidden"
            }`}
          >
            <span className=" border border-white border-2 px-2 py-6 rounded-full max-md:px-1 max-md:py-4 animate-slideIn">
              <GoArrowDown className="text-white text-2xl font-semibold max-md:text-lg" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define prop types for the Banner component
Banner.propTypes = {
  imageUrl: PropTypes.string,
  bannerHeading: PropTypes.string,
  bannerText1: PropTypes.string,
  bannerText2: PropTypes.string,
  bannerText3: PropTypes.string,
  arrowIcon: PropTypes.bool,
};

export default Banner;
