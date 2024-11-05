import { FaCirclePlay } from "react-icons/fa6";

export default function Banner() {
  return (
    <div
      className="relative bg-cover bg-center h-[70vh] max-md:h-[30vh] py-10 max-md:py-5"
      style={{
        backgroundImage: `url('https://i.ibb.co.com/zRKGTBb/video-1.png')`,
      }}
    >
        {/* Centered content */}
      <div
        className={`relative z-10 flex items-center justify-center h-full`}
      >
        {/* Play button */}
        <div className="h-[100px] w-[100px] max-md:h-[50px] max-md:w-[50px] rounded-full bg-white flex items-center justify-center">
        <FaCirclePlay className="text-[#7C6A46] text-7xl max-md:text-3xl hover:cursor-pointer hover:text-[#8C6B27]" />
        </div>
      </div>
    </div>
  )
}
