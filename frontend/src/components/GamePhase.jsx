import ConfirmButton from "./ConfirmButton";
import { useNavigate } from "react-router";
import { useGame } from "../contexts/GameContext";
import { toast } from "react-toastify";

const GamePhase = ({ phase, underPhase }) => {
  const { leaveLobby } = useGame();
  const navigate = useNavigate();

  async function handleLeave() {
    try {
      await leaveLobby();
      navigate("/");
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  }
  
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
          color="red"
          onClick={handleLeave}
          customClasses="hover:bg-red-700"
        >
          ESCI
        </ConfirmButton>
      </div>
    </header>
  );
};
export default GamePhase;