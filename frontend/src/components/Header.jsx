import { Link, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext"

const Header =() => {
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";

  const { user } = useAuth();
  
  return (
    <header className="font-primary bg-white px-5 md:px-10 py-3 flex items-center border-b-3 border-neroNonNero shadow-buttons select-none relative z-10">
      <Link className="flex-1" to="/">
        <h1 className="text-terziary inline-block font-primary font-extrabold text-3xl uppercase -rotate-1 hover:scale-110 transition-all duration-300">
          SPEEDQUIZ
        </h1>
      </Link>
      {isProfilePage ? (
        <button 
          onClick={() => console.log("funziono!")} 
          className="bg-[#E53935] text-white font-black px-6 py-2 uppercase border-3 border-neroNonNero shadow-buttons cursor-pointer hover:bg-red-700 hover:scale-95 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all duration-300"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/profile"
          className="flex items-center bg-gray-300 font-semibold px-4 py-2 uppercase border-3 border-neroNonNero shadow-buttons cursor-pointer hover:bg-primary hover:text-white hover:scale-95 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all duration-300"
        >
          <img
            className="w-6 h-6 rounded-full mr-2 border-3 border-neroNonNero bg-white"
            src={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=${user.id}`}
            alt={`Avatar di ${user.username}`}
          />
          {user.username}
        </Link>
      )}
      </header>
  );
};

export default Header;
