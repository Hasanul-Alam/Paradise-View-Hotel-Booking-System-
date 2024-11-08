import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <img
          src="https://i.ibb.co.com/CMJr1Ms/404.gif"
          alt="Not Found"
        />
        <div className="flex justify-center items-center">
          <Link to="/">
            <button className="bg-[#024176] hover:bg-[#10355f] px-4 py-2 rounded-md transition text-white">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
