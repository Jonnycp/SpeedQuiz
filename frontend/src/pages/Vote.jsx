import GamePhase from "../components/GamePhase";
import Gamer from "../components/Gamer";
import { Icon } from "@iconify/react";
import ConfirmButton from "../components/ConfirmButton";
import VoteCard from "../components/VoteCard";

const Vote = () => {
  return (
    <>
        <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-4xl uppercase font-extrabold tracking-wide text-white text-center">
                Vota la terna migiore
            </h1>
        </div>
        <VoteCard />
    </>
  );
};

export default Vote;
