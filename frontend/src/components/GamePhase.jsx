import ConfirmButton from "./ConfirmButton";

const GamePhase = ({ phase, underPhase, onLeave }) => {
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
            bgColor="[#E53935]"
            textColor="white"
            content="esci"
            onClick={onLeave}
            customClasses="hover:bg-red-700"
        />
      </div>
    </header>
  );
};

export default GamePhase;
