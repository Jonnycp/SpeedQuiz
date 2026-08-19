import { useEffect, useState } from "react";

import { useGame } from "../contexts/GameContext";
import { useAuth } from "../contexts/AuthContext";

import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

import GamePhase from "../components/GamePhase";
import MainTitle from "../components/MainTitle.jsx";
import TimeSlider from "../components/TimeSlider.jsx";
import QuestionForm from "../components/QuestionForm.jsx";
import VoteCard from "../components/VoteCard";
import EmptyState from "../components/EmptyState";
import Question from "../components/Question.jsx";

const Game = () => {
  const { user } = useAuth();
  const { code } = useParams();
  const { socket, lobby, joinLobby, submitAnswer, gameState } = useGame();
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const navigate = useNavigate();

  const currentRound = lobby ? lobby.rounds[lobby.currentRound] : [];

  //* Le mie domande da rispondere, per il round
  const myMatch = currentRound.filter(
    (m) => m.p1.id === user.id || m.p2.id === user.id,
  );

  //* Imposta currentQuestion da visualizzare
  useEffect(() => {
    if (!lobby) return;
    if (myMatch.length === 0) return;

    const myMatchIndex = myMatch.findIndex((m) => {
      const me = m.p1.id === user.id ? m.p1 : m.p2;
      return me.answers.length === 0;
    });

    setcurrentQuestion(myMatchIndex);
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

  if (!lobby) return null;

  //* Invio risposte
  function handleSubmit(answers) {
    submitAnswer(currentQuestion, answers)
      .then(() => setcurrentQuestion(currentQuestion + 1))
      .catch((err) => {
        toast.error(err.message || "Impossibile salvare le risposte");
      });
  }

  const hasNextQuestion =
    currentQuestion >= 0 && currentQuestion < myMatch.length;

  let question;
  if (lobby && lobby.status === "ANSWERING") {
    if (hasNextQuestion) {
      question = myMatch[currentQuestion].question;
    }
  } else if (lobby && lobby.status === "VOTING") {
    if (lobby.currentVoting >= 0) {
      question = currentRound[lobby.currentVoting].question;
    }
  }

  const votingMatch = currentRound[lobby.currentVoting];
  const canVote = votingMatch && (votingMatch.p1.id === user.id || votingMatch.p2.id === user.id);

  return (
    <>
      <GamePhase underPhase={`Round ${lobby?.currentRound + 1}`} />

      <section className="flex flex-col items-center justify-center relative z-10">
        {hasNextQuestion ||
          (lobby?.status === "VOTING" && (
            <MainTitle
              title={
                hasNextQuestion
                  ? `Domanda ${currentQuestion + 1} di ${myMatch.length}`
                  : lobby?.status === "VOTING"
                    ? "Vota la terna migliore!"
                    : null
              }
            />
          ))}
        <TimeSlider
          totalTime={
            ((lobby.status === "ANSWERING"
              ? lobby?.config.answerTimeMs
              : lobby?.config.votingTimeMs) /
              1000) *
            2
          }
          endsAt={lobby?.phaseEndAt}
          isBar={lobby.status === "ANSWERING"}
        />
      </section>

      {(hasNextQuestion || lobby?.status === "VOTING") && (
        <Question
          question={question}
          hints={
            lobby.status === "VOTING"
              ? ["che vinca il migliore!", (lobby?.players.length - gameState.votesLeft -2)+ " voti"]
              : null
          }
        />
      )}

      {lobby && lobby.status === "ANSWERING" ? (
        hasNextQuestion ? (
          <QuestionForm
            isFinal={currentQuestion === myMatch.length - 1}
            onSubmit={handleSubmit}
          />
        ) : (
          <EmptyState
            message={
              <div className="md:p-10 text-2xl">
                Attendi gli altri giocatori
                <br />
                <span className="font-normal text-xl">
                  {gameState.matchLefts} di {lobby.players.length}
                </span>
              </div>
            }
          ></EmptyState>
        )
      ) : lobby && lobby.status === "VOTING" ? (
        <section className="flex gap-4 m-6 my-16 md:gap-10 lg:mx-auto md:max-w-4xl">
          {[votingMatch.p1, votingMatch.p2].map((m) => (
            <VoteCard
              id={m.id}
              key={"match-"+lobby.currentVoting+"-"+m.id}
              canVote={canVote}
              username={m.username}
              answers={m.answers}
              hostId={lobby.hostId}
              votedBy={votingMatch.votedBy}
              score={votingMatch.p1.score}
            />
          ))}
        </section>
      ) : null}
    </>
  );
};

export default Game;

