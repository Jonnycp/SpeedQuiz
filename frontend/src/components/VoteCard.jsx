import { useState } from "react";
import { useGame } from "../contexts/GameContext";

import ConfirmButton from "./ConfirmButton";
import MiniPlayer from "./MiniPlayer";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

const VoteCard = ({
  id,
  username,
  canVote,
  answers = [],
  status,
  votedBy,
  score,
  isWinner,
}) => {
  //Pulizia answers vuote
  answers = answers.filter((answer) => answer.trim() !== "");

  const { submitVote } = useGame();
  const [isVoted, setIsVoted] = useState(false);

  function handleVote() {
    if (canVote && !isVoted)
      submitVote(id)
        .then(() => setIsVoted(true))
        .catch((err) => {
          toast.error(err.message || "Impossibile votare ora");
        });
  }

  return (
    <div
      className={`${isWinner ? "animate-flip-in-x border-5 border-primary scale-110 -rotate-2" : "border-3 border-neroNonNero scale-85 rotate-1"} flex-1 relative bg-white font-primary font-extrabold flex flex-col justify-between min-h-40 pt-12 pb-6 px-4 md:px-8 shadow-buttons hover:-translate-y-1 transition-all`}
    >
      <div className="absolute -top-6 left-6 flex items-center z-10">
        <MiniPlayer username={username} id={id} />
      </div>
       {status === "REVEAL" && <p className="animate-pop animate-delay-500 absolute uppercase -top-3 -right-4 bg-[#FFDF9A] shadow-buttons text-xs px-3 py-1 font-bold rotate-8 select-none md:text-base">
            +{score} PTS
        </p>}
      <div className="flex flex-1 flex-col justify-center my-auto gap-4 w-full text-neroNonNero text-lg md:text-xl font-extrabold leading-tight">
        {answers.length > 0 ? (
          answers.map((answer, index) => (
            <span key={"answer-" + id + "-" + index} className="italic">
              "{answer}"
            </span>
          ))
        ) : (
          <span className="flex flex-col items-center justify-center md:mt-3">
            Nessuna risposta
            <Icon icon="glyphs-poly:sad-cry" width="64" />
          </span>
        )}
      </div>
      <div className="w-[92%] mx-auto md:w-full mt-5">
        {status === "VOTING" && canVote && answers.length != 0 && (
          <ConfirmButton
            color="secondary"
            customClasses="w-full py-4 md:py-5 text-xl md:text-2xl"
            onClick={handleVote}
            disabled={isVoted}
          >
            {isVoted ? "Votato" : "Vota"}
          </ConfirmButton>
        )}
        {status === "REVEAL" &&
          votedBy?.map((voter) => (
            <MiniPlayer key={"voter-" + id + "-" + voter} id={voter} isMini/>
          ))}
      </div>
    </div>
  );
};

export default VoteCard;
