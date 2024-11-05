export default function ExploreBody() {
  return (
    <div className="w-[80%] mx-auto max-md:w-[95%] py-16 max-md:py-10 font-raleway">
        <h2 className="text-5xl text-center font-semibold max-md:text-3xl">Take a tour</h2>
      {/* Card */}
      <div className="w-[1272px] mx-auto max-md:w-full max-md:my-5 mt-16 animate-popup">
        <div
          className="w-full bg-cover bg-center h-[570px] rounded-3xl max-md:h-[200px] max-md:rounded-xl"
          style={{
            backgroundImage: `url('https://i.ibb.co/zZV6D4S/video-2.png')`, // Corrected this line
          }}
        ></div>
        <div className="bg-white p-8 max-md:p-3 shadow shadow-lg rounded-3xl max-md:rounded-lg -mt-32 max-md:mt-0 z-1 w-[70%] max-md:w-full mx-auto border-t-[14px] max-md:border-0 border-[#7C6A46]">
          <h2 className="text-center text-2xl mb-5 text-[#7C6A46] font-semibold max-md:mb-3">
            Luxurious Rooms
          </h2>
          <p className="text-center text-sm">
            The elegant luxury bedrooms in this gallery showcase custom interior
            designs & decorating ideas. View pictures and find your perfect
            luxury bedroom design.Luxurious bedrooms that will make you never
            want to leave your room again. See more ideas about luxurious
            bedrooms, bedroom design
          </p>
        </div>
      </div>
      {/* Card */}
      <div className="w-[1272px] mx-auto max-md:w-full max-md:my-5 mt-16 animate-popup">
        <div
          className="w-full bg-cover bg-center h-[570px] rounded-3xl max-md:h-[200px] max-md:rounded-xl"
          style={{
            backgroundImage: `url('https://i.ibb.co.com/WyVmHrG/Rectangle-22-1.png')`, // Corrected this line
          }}
        ></div>
        <div className="bg-white p-8 max-md:p-3 shadow shadow-lg rounded-3xl max-md:rounded-lg -mt-32 max-md:mt-0 z-1 w-[70%] max-md:w-full mx-auto border-t-[14px] max-md:border-0 border-[#7C6A46]">
          <h2 className="text-center text-2xl mb-5 text-[#7C6A46] font-semibold max-md:mb-3">
            Gym
          </h2>
          <p className="text-center text-sm">
          The elegant luxury bedrooms in this gallery showcase custom interior designs & decorating ideas. View pictures and find your perfect luxury bedroom design.Luxurious bedrooms that will make you never want to leave your room again. See more ideas about luxurious bedrooms, bedroom design
          </p>
        </div>
      </div>
      {/* Card */}
      <div className="w-[1272px] mx-auto max-md:w-full max-md:my-5 mt-16 animate-popup">
        <div
          className="w-full bg-cover bg-center h-[570px] rounded-3xl max-md:h-[200px] max-md:rounded-xl"
          style={{
            backgroundImage: `url('https://i.ibb.co.com/8PRggR4/Rectangle-22-2.png')`, // Corrected this line
          }}
        ></div>
        <div className="bg-white p-8 max-md:p-3 shadow shadow-lg rounded-3xl max-md:rounded-lg -mt-32 max-md:mt-0 z-1 w-[70%] max-md:w-full mx-auto border-t-[14px] max-md:border-0 border-[#7C6A46]">
          <h2 className="text-center text-2xl mb-5 text-[#7C6A46] font-semibold max-md:mb-3">
            Restaurent
          </h2>
          <p className="text-center text-sm">
            The elegant luxury bedrooms in this gallery showcase custom interior
            designs & decorating ideas. View pictures and find your perfect
            luxury bedroom design.Luxurious bedrooms that will make you never
            want to leave your room again. See more ideas about luxurious
            bedrooms, bedroom design
          </p>
        </div>
      </div>
    </div>
  );
}
