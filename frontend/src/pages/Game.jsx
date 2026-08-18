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

const Game = () => {
  const { user } = useAuth();
  const { code } = useParams();
  const { socket, lobby, joinLobby, submitAnswer } = useGame();
  const [currentMatch, setCurrentMatch] = useState(0);
  const navigate = useNavigate();

  const myMatch = lobby
    ? lobby.rounds[lobby.currentRound].filter(
        (m) => m.p1.id === user.id || m.p2.id === user.id,
      )
    : [];
  const matchCompleted = lobby
    ? lobby.rounds[lobby.currentRound].filter(
        (m) => m.p1.answers.length == 3 && m.p2.answers.length == 3,
      )
    : [];

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

  //* Ripristino a 0 di currentMatch
  useEffect(() => {
    setCurrentMatch(0);
  }, [lobby?.currentRound]);

  function handleSubmit(answers) {
    console.log(currentMatch, answers)
    submitAnswer(currentMatch, answers)
      .then(() => setCurrentMatch(currentMatch + 1))
      .catch((e) => {
        console.log(e);
        toast.error(e.message || "Impossibile salvare le risposte");
      });
  }

  return (
    <>
      <GamePhase underPhase={`Round ${lobby?.currentRound + 1}`} />
      <section className="flex flex-col items-center justify-center relative z-10 md:mt-10 mt-5">
        <MainTitle title={`Domanda ${currentMatch + 1} di ${myMatch.length}`} />
        <TimeSlider
          totalTime={(lobby?.config.answerTimeMs / 1000) * 2}
          endsAt={lobby?.phaseEndAt}
        />
      </section>

      {lobby && lobby.status === "ANSWERING" ? (
        currentMatch < myMatch.length ? (
          <QuestionCard
            question={myMatch[currentMatch].question}
            isFinal={currentMatch === myMatch.length - 1}
            onSubmit={handleSubmit}
          />
        ) : (
          <p className="m-14 text-2xl md:text-3xl font-extrabold text-center bg-white shadow-buttons border-3 border-neroNonNero px-6 py-7 md:px-20 md:py-10 rounded-2xl select-none">
            Attendi gli altri giocatori
            <br />
            <span className="font-normal text-xl">
              {lobby.players.length - matchCompleted.length} di{" "}
              {lobby.players.length}
            </span>
          </p>
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
