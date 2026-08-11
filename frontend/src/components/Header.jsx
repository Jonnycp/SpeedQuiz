import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import ConfirmButton from "./ConfirmButton";

const Header = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const isProfilePage = location.pathname === "/profile";

  const { user, logout } = useAuth();

  async function handleLogout(){
    try{
      await logout();
      navigate("/login");
    }catch(err){
      console.log("Logout non riuscito.");
    }
  }

  
  return (
    <header className="font-primary bg-white px-5 md:px-10 py-3 flex items-center border-b-3 border-neroNonNero shadow-buttons select-none relative z-10">

      <Link className="flex-1" to="/">
        <h1 className="text-terziary inline-block font-primary font-extrabold text-3xl uppercase -rotate-1 hover:scale-110 transition-all duration-300">
          SPEEDQUIZ
        </h1>
      </Link>
      
      {isProfilePage ? (

        <ConfirmButton
          bgColor="[#E53935]"
          textColor="white"
          content="Logout"
          onClick={handleLogout}
          customClasses="bg-red-600 hover:bg-red-700"
        />

      ) : (

        <ConfirmButton
          bgColor="gray-300"
          textColor="black"
          onClick={() => navigate("/profile")}
          content={
            <div className="flex items-center">
              <img
                className="w-6 h-6 rounded-full mr-2 border-3 border-neroNonNero bg-white"
                src={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=${user.id}`}
                alt={`Avatar di ${user.username}`}
              />
              <span>{user.username}</span>
            </div>
          }
          customClasses="!px-4 !font-semibold hover:bg-primary hover:text-white"
        />
      )}
      
    </header>
  );
};

export default Header;