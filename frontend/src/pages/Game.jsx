import { useEffect, useState } from "react";

import { useGame } from "../contexts/GameContext";
import { useAuth } from "../contexts/AuthContext";

import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

import GamePhase from "../components/GamePhase";
import MainTitle from "../components/MainTitle.jsx";
import TimeSlider from "../components/TimeSlider.jsx";
import QuestionCard from "../components/QuestionCard";
import VoteCard from "../components/VoteCard";
import EmptyState from "../components/EmptyState";

const Game = () => {
  const { user } = useAuth();
  const { code } = useParams();
  const { socket, lobby, joinLobby, submitAnswer, gameState } = useGame();
  const [currentMatch, setCurrentMatch] = useState(0);
  const navigate = useNavigate();

  console.log("Game render", { lobby, currentMatch, gameState });
  const myMatch = lobby
    ? lobby.rounds[lobby.currentRound].filter(
        (m) => m.p1.id === user.id || m.p2.id === user.id,
      )
    : [];
  
  //* Imposta currentMatch da visualizzare
  useEffect(() => {
    if(!lobby) return;
    if(myMatch.length === 0) return;

    const myMatchIndex = myMatch.findIndex(m => {
      const me = m.p1.id === user.id ? m.p1 : m.p2;
      return me.answers.length === 0;
     })

    setCurrentMatch(myMatchIndex);
  }, [lobby?.currentRound, user]);

  //* Redirect se non hai lobby
  useEffect(() => {
    if (!socket) return;
    if (lobby && lobby.code === code) return;
    joinLobby(code).catch((err) => {
      toast.error(
        err.message || "Non sei in una lobby. Verrai reindirizzato alla home.",
      );
      navigate("/");
    });
  }, [lobby, socket]);

  //* Invio risposte
  function handleSubmit(answers) {
    submitAnswer(currentMatch, answers)
      .then(() => setCurrentMatch(currentMatch + 1))
      .catch((err) => {
        toast.error(err.message || "Impossibile salvare le risposte");
      });
  }

  return (
    <>
      <GamePhase underPhase={`Round ${lobby?.currentRound + 1}`} />
      <section className="flex flex-col items-center justify-center relative z-10 md:mt-10 mt-5">
      {currentMatch >= 0 && currentMatch < myMatch.length && (
         <MainTitle title={`Domanda ${currentMatch + 1} di ${myMatch.length}`} />
      )}
        <TimeSlider
          totalTime={(lobby?.config.answerTimeMs / 1000) * 2}
          endsAt={lobby?.phaseEndAt}
        />
      </section>

      {lobby && lobby.status === "ANSWERING" ? (
        currentMatch >= 0 && currentMatch < myMatch.length ? (
          <QuestionCard
            question={myMatch[currentMatch].question}
            isFinal={currentMatch === myMatch.length - 1}
            onSubmit={handleSubmit}
          />
        ) : (
          <EmptyState message={<div className="md:p-10 text-2xl">
            Attendi gli altri giocatori
            <br />
            <span className="font-normal text-xl">
              {gameState.matchLefts} di {lobby.players.length}
            </span>
          </div>}></EmptyState>
        )
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
