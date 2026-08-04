import { Link } from "react-router";

const Header = ({ username }) => {
  return (
    <header className="font-primary bg-white px-5 md:px-10 py-3 flex items-center border-b-3 border-neroNonNero shadow-buttons select-none">
      <Link className="flex-1" to="/">
        <h1 className="text-terziary inline-block font-primary font-extrabold text-3xl uppercase -rotate-1 hover:scale-110 transition-all duration-300">
          SPEEDQUIZ
        </h1>
      </Link>
      <Link
        to="/profile"
        className="flex items-center bg-gray-300 font-semibold px-4 py-2 uppercase border-3 border-neroNonNero shadow-buttons cursor-pointer hover:bg-primary hover:text-white hover:scale-90 hover:rotate-1 transition-all duration-300"
      >
        <img
          className="w-8 h-8 rounded-full mr-2 border-3 border-neroNonNero"
          src={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=${username}`}
          alt={`Avatar di ${username}`}
        />
        {username}
      </Link>
    </header>
  );
};

export default Header;
