import { GoArrowDown } from "react-icons/go";
const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[85vh] max-md:h-[70%] py-10"
      style={{
        backgroundImage: "url('https://i.ibb.co.com/zZV6D4S/video-2.png')",
      }}
    >
      {/* Overlay with opacity */}
      <div className="absolute inset-0 bg-[#7C6A46] opacity-50"></div>

      {/* Centered content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          {/* Banner Heading */}
          <h1 className="text-white text-5xl font-bold mb-4 max-md:text-xl max-md:mt-5 animate-slideIn">
            Rooms And Suites
          </h1>
          {/* Banner Text */}
          <div className="mt-8 font-mulish max-md:mt-2">
            <p className="text-white text-lg max-md:text-xs animate-slideIn">
              The elegant luxury bedrooms in this gallery showcase custom
              interior
            </p>
            <p className="text-white text-lg max-md:text-xs animate-slideIn">
              designs & decorating ideas. View pictures and find your
            </p>
            <p className="text-white text-lg max-md:text-xs animate-slideIn">
              perfect luxury bedroom design.
            </p>
          </div>
          <div className="flex justify-center mt-32 max-md:mt-8">
            <span className=" border border-white border-2 px-2 py-6 rounded-full max-md:px-1 max-md:py-4 animate-slideIn">
              <GoArrowDown className="text-white text-2xl font-semibold max-md:text-lg" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
