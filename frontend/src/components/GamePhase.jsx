import { Link } from "react-router";

const GamePhase = ({ phase, underPhase, username }) => {
  return (
    <header className="font-primary px-4 md:px-10 py-3 md:py-5 flex flex-wrap items-center justify-between gap-4 select-none z-10 w-full">

      <Link className="flex flex-col items-start" to="/">
        <h1 className="text-white font-extrabold text-2xl md:text-5xl uppercase tracking-tighter group-hover:scale-105 transition-transform duration-300 -rotate-1 md:pb-2 pb-1">
            {phase || "SPEEDQUIZ"}
        </h1>
        {"underPhase" && (
          <h2 className="text-secondary italic font-extrabold text-sm md:text-lg -mt-1 md:-mt-2 -rotate-2">
            {underPhase}
          </h2>
        )}
      </Link>

      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        
        <Link
          to="/profile"
          className="flex items-center gap-2 bg-white px-2 py-1.5 md:px-4 md:py-2 border-3 border-neroNonNero shadow-buttons cursor-pointer hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] active:translate-y-[2px] active:shadow-none transition-all duration-200"
        >
          <img
            className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-neroNonNero bg-gray-100"
            src={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=${username}`}
            alt={`Avatar di ${username}`}
          />

          <span className="font-extrabold text-xs md:text-sm uppercase text-black max-w-[80px] md:max-w-none">
            {username}
          </span>
        </Link>

        <button className="bg-red-600 text-white italic font-extrabold text-sm md:text-xl px-3 py-1.5 md:px-6 md:py-2 border-3 border-neroNonNero shadow-buttons cursor-pointer hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] active:translate-y-[2px] active:shadow-none transition-all duration-200 uppercase">
          Esci
        </button>
        
      </div>
    </header>
  );
};

export default GamePhase;