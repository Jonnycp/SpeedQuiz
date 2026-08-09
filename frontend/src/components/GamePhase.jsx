const GamePhase = ({ phase, underPhase, username }) => {
  return (
    <header className="font-primary px-4 md:px-10 py-3 md:py-5 flex flex-wrap items-center justify-between gap-4 select-none z-10 w-full">

      <div className="flex flex-col items-start">
        <h1 className="text-white font-bold text-2xl md:text-5xl uppercase tracking-tighter group-hover:scale-105 transition-transform duration-300 -rotate-1 md:pb-2 pb-1">
            {phase || "SPEEDQUIZ"}
        </h1>
        {underPhase && (
          <h2 className="text-secondary italic font-semibold text-sm md:text-lg -mt-1 md:-mt-2 -rotate-2">
            {underPhase}
          </h2>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        
        <button
          className="flex items-center gap-2 bg-white px-2 py-1.5 md:px-4 md:py-2 border-3 border-neroNonNero shadow-buttons cursor-pointer hover:bg-primary hover:text-white hover:scale-95 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all duration-300"
        >
          <img
            className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-neroNonNero bg-gray-100"
            src={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=${username}`}
            alt={`Avatar di ${username}`}
          />

          <span className="font-extrabold text-xs md:text-sm uppercase text-black max-w-20 md:max-w-none">
            {username}
          </span>
        </button>

        <button className="bg-[#E53935] text-white font-black px-6 py-2 uppercase border-3 border-neroNonNero shadow-buttons cursor-pointer hover:bg-red-700 hover:scale-95 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all duration-300">
          Esci
        </button>
        
      </div>
    </header>
  );
};

export default GamePhase;