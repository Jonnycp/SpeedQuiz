import { useEffect } from "react";

import { useGame } from "../contexts/GameContext";
import { useAuth } from "../contexts/AuthContext";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import GamePhase from "../components/GamePhase";
import MainTitle from "../components/MainTitle.jsx";
import TimeSlider from "../components/TimeSlider.jsx";
import QuestionCard from "../components/QuestionCard";
import VoteCard from "../components/VoteCard";

const Game = () => {
  const { user } = useAuth();
  const { socket, lobby } = useGame();

  const navigate = useNavigate();

  useEffect(() => {
    if (lobby) return;
    toast.error("Non sei in una lobby. Verrai reindirizzato alla home.");
    navigate("/");
  }, [lobby]);

  const myMatch = lobby ? lobby.rounds[lobby.currentRound].filter((m) => m.p1.id === user.id || m.p2.id === user.id) : [];
 
  return (
    <>
      <GamePhase underPhase={`Round ${lobby?.currentRound+1}`} />
      <section className="flex flex-col items-center justify-center relative z-10 md:mt-10 mt-5">
        <MainTitle title="Domanda 1 di 2" />
        <TimeSlider totalTime={lobby?.config.answerTimeMs/1000 * 2} endsAt={lobby?.phaseEndAt} />
      </section>

      {lobby && lobby.status === "ANSWERING" ? (
        <QuestionCard question={myMatch[0].question} />
      ) : lobby && lobby.status === "VOTING" ? (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-6 flex-1 md:px-30">
          {[].map((data) => (
            <VoteCard
              key={data.id}
              username={data.username}
              phrases={data.phrases}
              host={data.host}
              isSelected={false}
              onSelect={null}
            />
          ))}
        </section>
      ) : null}
    </>
  );
};

export default Game;





