import { Link } from "react-router";
import ConfirmButton from "./ConfirmButton";

const AuthCard = ({ isLogin, children, onSubmit, isLoading }) => {
  return (
    <div className="font-primary w-full flex flex-col my-10 md:my-20">
      
      <div className="relative w-full max-w-xl mx-auto mt-15">
        <div className="absolute -top-6 left-4 z-10 bg-white border-3 border-neroNonNero shadow-buttons px-4 py-2 -rotate-2 ">
          <h2 className="text-terziary font-extrabold text-2xl uppercase select-none ">
            SPEEDQUIZ
          </h2>
        </div>

        <form className="w-full bg-white border-3 border-neroNonNero shadow-buttons px-10 py-10 flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="text-center">
            <h1 className="font-extrabold text-4xl uppercase mt-4 select-none">
              {isLogin ? "Accedi" : "Crea un account"}
            </h1>
            <p className="text-neroNonNero text-lg normal-case select-none">
              Pronto a sfidare i tuoi amici?
            </p>
          </div>

          {children}

          <ConfirmButton type="submit" color="primary" customClasses="text-2xl py-3" disabled={isLoading}>
            {isLogin ? "Accedi" : "Registrati"}
          </ConfirmButton>
        </form>

        <p className="text-white text-center mt-6 text-sm normal-case select-none">
          {isLogin ? "Non hai un account?" : "Hai già un account?"}
          <Link
            to={isLogin ? "/register" : "/login"}
            className="bg-secondary border-3 border-neroNonNero font-bold uppercase shadow-buttons text-black px-2 py-1 ml-2">
            {isLogin ? "Registrati" : "Accedi"}
          </Link>
        </p>
      </div>
    </div>
  );
};
export default AuthCard;
