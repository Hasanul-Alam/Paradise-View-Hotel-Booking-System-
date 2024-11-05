import { FaStar } from "react-icons/fa";
export default function Testimonials() {
  return (
    <div className="w-[75%] mx-auto py-20 max-md:w-[95%] font-raleway">
      <h2 className="text-center text-5xl mb-10 max-md:mb-0 max-md:text-3xl">
        Testimonials
      </h2>
      <div className="grid grid-cols-3 gap-4 justify-between items-center max-md:grid-cols-1">
        {/* Card */}
        <div className="bg-[#f5f0f0] shadow shadow-lg px-6 py-9 rounded-lg max-md:mt-10">
          <div className="flex justify-between items-center">
            <p>02 March 2024</p>
            <div className="flex items-center gap-1 text-yellow-600">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
          <div className="my-10">
            <span className="font-raleway text-sm">
              {`${'""'}The service at the Hotel Monteleone was exceptional. There was
              absolutely no issue that was not addressed timely and with
              satisfactory results. We were particulary impressed with how the
              hotel staff anticipated our needs (periodically coming by the
              Board Room to check with us). Numerous conference attendees
              commented on the quality of the food, the quality of the service
              and overall positive attitude toward the conference site.
              Particular noteworthy is the longevity of the staff and that sense
              of investment in the success of every event. I usually offer
              suggestions for improvements (part of being a marketing
              professor), but there is absolutely nothing that could be improved
              - you have set the bar very high.${'""'}`}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <img
              className="w-[42px] h-[42px] rounded-full"
              src="https://i.ibb.co.com/phj4T4f/header-Image1.png"
              alt=""
            />
            <p className="text-sm">Hasanul Alam</p>
          </div>
        </div>
        {/* Card */}
        <div className="bg-[#f5f0f0] shadow shadow-lg px-6 py-9 rounded-lg max-md:mt-10">
          <div className="flex justify-between items-center">
            <p>02 March 2024</p>
            <div className="flex items-center gap-1 text-yellow-600">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
          <div className="my-10">
            <span className="font-raleway text-sm">
              {`${'""'}The service at the Hotel Monteleone was exceptional. There was
              absolutely no issue that was not addressed timely and with
              satisfactory results. We were particulary impressed with how the
              hotel staff anticipated our needs (periodically coming by the
              Board Room to check with us). Numerous conference attendees
              commented on the quality of the food, the quality of the service
              and overall positive attitude toward the conference site.
              Particular noteworthy is the longevity of the staff and that sense
              of investment in the success of every event. I usually offer
              suggestions for improvements (part of being a marketing
              professor), but there is absolutely nothing that could be improved
              - you have set the bar very high.${'""'}`}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <img
              className="w-[42px] h-[42px] rounded-full"
              src="https://i.ibb.co.com/phj4T4f/header-Image1.png"
              alt=""
            />
            <p className="text-sm">Hasanul Alam</p>
          </div>
        </div>
        {/* Card */}
        <div className="bg-[#f5f0f0] shadow shadow-lg px-6 py-9 rounded-lg max-md:mt-10">
          <div className="flex justify-between items-center">
            <p>02 March 2024</p>
            <div className="flex items-center gap-1 text-yellow-600">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
          <div className="my-10">
            <span className="font-raleway text-sm">
              {`${'""'}The service at the Hotel Monteleone was exceptional. There was
              absolutely no issue that was not addressed timely and with
              satisfactory results. We were particulary impressed with how the
              hotel staff anticipated our needs (periodically coming by the
              Board Room to check with us). Numerous conference attendees
              commented on the quality of the food, the quality of the service
              and overall positive attitude toward the conference site.
              Particular noteworthy is the longevity of the staff and that sense
              of investment in the success of every event. I usually offer
              suggestions for improvements (part of being a marketing
              professor), but there is absolutely nothing that could be improved
              - you have set the bar very high.${'""'}`}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <img
              className="w-[42px] h-[42px] rounded-full"
              src="https://i.ibb.co.com/phj4T4f/header-Image1.png"
              alt=""
            />
            <p className="text-sm">Hasanul Alam</p>
          </div>
        </div>
      </div>
    </div>
  );
}
