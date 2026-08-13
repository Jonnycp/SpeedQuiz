import ConfirmButton from "./ConfirmButton";

const GamePhase = ({ phase, underPhase, username }) => {
  return (
    <header className="font-primary px-4 md:px-10 py-3 md:py-5 flex flex-wrap items-center justify-between gap-4 select-none z-10 w-full">
      <div className="flex flex-col items-start">
        <h1 className="text-white font-bold text-2xl md:text-5xl uppercase tracking-tighter -rotate-1 md:pb-2 pb-1">
          {phase || "SPEEDQUIZ"}
        </h1>
        {underPhase && (
          <h2 className="text-secondary italic font-semibold text-sm md:text-lg -mt-1 md:-mt-2 -rotate-2">
            {underPhase}
          </h2>
        )}
      </div>
      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        <ConfirmButton
          customClasses="bg-white text-black !px-2 !py-1.5 md:!px-4 md:!py-2 hover:!bg-primary hover:!text-white hover:scale-90 hover:rotate-1"
        >
          <div className="flex items-center gap-2">
            <img
              className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-neroNonNero bg-gray-100"
              src={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=${username}`}
              alt={`Avatar di ${username}`}
            />
            <span className="font-extrabold text-xs md:text-sm uppercase max-w-20 md:max-w-none">
              {username}
            </span>
          </div>
        </ConfirmButton>

        <ConfirmButton
          color="red"
          onClick={() => console.log("Uscita dalla fase di gioco...")}
          customClasses="hover:bg-red-700" 
        >
          ESCI
        </ConfirmButton>
      </div>
    </header>
  );
};
export default GamePhase;