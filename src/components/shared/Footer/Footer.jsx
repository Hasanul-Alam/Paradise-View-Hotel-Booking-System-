export default function Footer() {
  return (
    <div className="bg-[#7C6A46] pt-20 pb-10">
      <div className="mx-auto w-[80%] text-white max-md:w-[95%]">
        <div className="grid grid-cols-7 gap-32 max-md:grid-cols-1 max-md:gap-0 max-md:block">
          <div className="col-span-2 max-md:mb-5">
            <h2 className="font-dancing text-3xl">Paradise view</h2>
            <p className="font-raleway text-xs text-justify mt-5">
              The service at the Hotel Monteleone was exceptional. There was
              absolutely no issue that was not addressed timely and with
              satisfactory results. We were particulary impressed with how the
              hotel staff anticipated our needs (periodically coming by the
              Board Room to check with us)
            </p>
          </div>
          <div className="max-md:flex justify-center">
            <div className="font-raleway">
              <h4 className="text-lg max-md:text-xl max-md:text-center">
                Quick Links
              </h4>
              <span className="block text-xs mt-3 max-md:text-center">
                <a href="#">Room Booking</a>
              </span>
              <span className="block text-xs mt-3 max-md:text-center">
                <a href="#">Rooms</a>
              </span>
              <span className="block text-xs mt-3 max-md:text-center">
                <a href="#">Contact</a>
              </span>
              <span className="block text-xs mt-3 max-md:text-center">
                <a href="#">Explore</a>
              </span>
            </div>
          </div>
          {/* Horizontal line for mobile view */}
          <div className="bg-white w-1/2 mx-auto h-[1px] my-5 hidden max-md:block"></div>

          <div className="max-md:flex justify-center">
            <div className="font-raleway">
              <h4 className="text-lg max-md:text-xl max-md:text-center">
                Company
              </h4>
              <span className="block text-xs mt-3 max-md:text-center">
                <a href="#">Privacy Policy</a>
              </span>
              <span className="block text-xs mt-3 max-md:text-center">
                <a href="#">Refund Policy</a>
              </span>
              <span className="block text-xs mt-3 max-md:text-center">
                <a href="#">F.A.Q</a>
              </span>
              <span className="block text-xs mt-3 max-md:text-center">
                <a href="#">About</a>
              </span>
            </div>
          </div>
          {/* Horizontal line for mobile view */}
          <div className="bg-white w-1/2 mx-auto h-[1px] my-5 hidden max-md:block"></div>

          
          <div className="max-md:flex justify-center">
            <div className="font-raleway">
              <h4 className="text-lg max-md:text-xl max-md:text-center">
                Social Media
              </h4>
              <span className="block text-xs mt-3 max-md:text-center">
                <a href="#">Facebook</a>
              </span>
              <span className="block text-xs mt-3 max-md:text-center">
                <a href="#">Twitter</a>
              </span>
              <span className="block text-xs mt-3 max-md:text-center">
                <a href="#">Instagram</a>
              </span>
              <span className="block text-xs mt-3 max-md:text-center">
                <a href="#">Linkedin</a>
              </span>
            </div>
          </div>

          <div className="font-raleway col-span-2 max-md:mt-10">
            <h4 className="text-lg">Newsletter</h4>
            <p className="text-xs my-5 max-md:my-3">
              Kindly subscribe to our newsletter to get latest deals on our
              rooms and vacation discount.
            </p>
            <div className="flex items-center border border-gray-300 overflow-hidden px-1 bg-white py-1 rounded">
              <input
                type="email"
                className="px-4 py-2 w-full outline-none text-black"
                placeholder="Enter your email"
              />
              <button className="bg-[#7C6A46] hover:bg-[#8C6B27] text-white px-4 py-2 rounded">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Horizontal line */}
      <div className="h-[1px] bg-[#D9D9D9] my-10"></div>
      <p className="text-center font-raleway text-white text-sm">
        Paradise View 2024
      </p>
    </div>
  );
}
