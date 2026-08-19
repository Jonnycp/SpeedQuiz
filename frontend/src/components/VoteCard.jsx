import { useState } from "react"
import { useGame } from "../contexts/GameContext";

import ConfirmButton from "./ConfirmButton";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify"

const MiniPlayer = ({ username, id, hostId }) => {
  return (
    <>
      <div className="w-12 h-12 rounded-full border-3 border-neroNonNero flex items-center justify-center overflow-hidden z-10 ">
        <img
          src={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=${id}`}
          alt={`Avatar di ${username}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-neroNonNero text-white flex items-center gap-1 font-extrabold text-xs uppercase px-3 py-1.5 -ml-3 pl-5 rounded-r-lg border-2 border-neroNonNero">
        @{username}
        {id === hostId && (
          <Icon
            icon="mdi:crown"
            className="text-[#FFD13B] text-sm md:text-base"
          />
        )}
      </div>
    </>
  );
};

const VoteCard = ({
  id,
  username,
  canVote,
  hostId,
  answers = [],
  votedBy,
  score,
}) => {
  //Pulizia answers vuote
  answers = answers.filter((answer) => answer.trim() !== "");

  const { submitVote } = useGame()
  const [isVoted, setIsVoted] = useState(false)

  function handleVote(){
    if(canVote && !isVoted)
    submitVote(id)
        .then(() => setIsVoted(true))
        .catch((err) => {
            toast.error(err.message || "Impossibile votare ora");
          });
  }

  return (
    <div className="flex-1 relative bg-white font-primary font-extrabold flex flex-col justify-between min-h-40 pt-12 pb-6 px-4 md:py-10 md:px-8 border-3 border-neroNonNero shadow-buttons hover:-translate-y-1 transition-transform">
      <div className="absolute -top-6 left-6 flex items-center z-10">
        <MiniPlayer username={username} id={id} hostId={hostId} />
      </div>
      <div className="flex flex-1 flex-col justify-center my-auto gap-4 w-full text-neroNonNero text-lg md:text-xl font-extrabold leading-tight">
        {answers.length > 0 ? answers.map((answer, index) => (
          <span
            key={"answer-" + id+ "-"+index}
            className="italic"
          >
            "{answer}"
          </span>
        )) : <span
            className="flex flex-col items-center justify-center md:mt-3"
          >
            Nessuna risposta
            <Icon icon="glyphs-poly:sad-cry" width="64"/>
          </span>}
      </div>
      {canVote && answers.length != 0 &&  (
        <div className="w-[92%] mx-auto md:w-full mt-5">
          <ConfirmButton
            color="secondary"
            customClasses="w-full py-4 md:py-5 text-xl md:text-2xl"
            onClick={handleVote}
            isDisabled={isVoted}
          >
            {isVoted ? "Votato" : "Vota"}
          </ConfirmButton>
          <div className="flex gap-2 mt-3 md:mt-5 flex-wrap">
          <MiniPlayer username={"dsds"} id={id} hostId={hostId} />
          <MiniPlayer username={"dsds"} id={id} hostId={hostId} />
          <MiniPlayer username={"dsds"} id={id} hostId={hostId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VoteCard;
