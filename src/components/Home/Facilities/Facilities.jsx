import { TbSwimming } from "react-icons/tb";
import { FaWifi } from "react-icons/fa";
import { GiChickenOven } from "react-icons/gi";
import { CgGym } from "react-icons/cg";
import { IoLogoGameControllerB } from "react-icons/io";
import { TbBulbFilled } from "react-icons/tb";
import { MdLocalLaundryService } from "react-icons/md";
import { MdOutlineLocalParking } from "react-icons/md";

export default function Facilities() {
  return (
    <div className="w-[70%] mx-auto font-poppins max-md:w-[95%] py-20 max-md:py-5">
      <h2 className="text-center text-5xl mb-20 max-md:mb-5 max-md:text-3xl">Our Facilities</h2>
      <div className="grid grid-cols-4 gap-8 max-md:grid-cols-2 max-md:gap-2 ">
        <div className="text-[#7C6A46] text-center py-14 bg-[#f2eceb] rounded-lg max-md:py-7">
          <span className="flex justify-center text-6xl">
            <TbSwimming />
          </span>
          <p className="text-lg">Swimming Pool</p>
        </div>
        <div className="text-[#7C6A46] text-center py-14 bg-[#f2eceb] rounded-lg max-md:py-7">
          <span className="flex justify-center text-6xl">
            <FaWifi />
          </span>
          <p className="text-lg">Wifi</p>
        </div>
        <div className="text-[#7C6A46] text-center py-14 bg-[#f2eceb] rounded-lg max-md:py-7">
          <span className="flex justify-center text-6xl">
            <GiChickenOven />
          </span>
          <p className="text-lg">Breakfast</p>
        </div>
        <div className="text-[#7C6A46] text-center py-14 bg-[#f2eceb] rounded-lg max-md:py-7">
          <span className="flex justify-center text-6xl">
            <CgGym />
          </span>
          <p className="text-lg">Gym</p>
        </div>
        <div className="text-[#7C6A46] text-center py-14 bg-[#f2eceb] rounded-lg max-md:py-7">
          <span className="flex justify-center text-6xl">
            <IoLogoGameControllerB />
          </span>
          <p className="text-lg">Game Center</p>
        </div>
        <div className="text-[#7C6A46] text-center py-14 bg-[#f2eceb] rounded-lg max-md:py-7">
          <span className="flex justify-center text-6xl">
            <TbBulbFilled />
          </span>
          <p className="text-lg">24/7 Light</p>
        </div>
        <div className="text-[#7C6A46] text-center py-14 bg-[#f2eceb] rounded-lg max-md:py-7">
          <span className="flex justify-center text-6xl">
            <MdLocalLaundryService />
          </span>
          <p className="text-lg">Laundry</p>
        </div>
        <div className="text-[#7C6A46] text-center py-14 bg-[#f2eceb] rounded-lg max-md:py-7">
          <span className="flex justify-center text-6xl items-center">
            <MdOutlineLocalParking />
          </span>
          <p className="text-lg">Parking Space</p>
        </div>
      </div>
    </div>
  );
}
