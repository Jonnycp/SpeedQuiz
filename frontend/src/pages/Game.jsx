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

  //* Costanti di utility per frontend
  const currentRound = lobby ? lobby.rounds[lobby.currentRound] : [];
  const myMatch = currentRound.filter((m) => m.p1.id === user.id || m.p2.id === user.id,);
  const hasNextQuestion = currentQuestion >= 0 && currentQuestion < myMatch.length;
  const votingMatch = currentRound[lobby.currentVoting];
  const canVote = votingMatch && !(votingMatch.p1.id === user.id || votingMatch.p2.id === user.id);

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

  //* Invio risposte
  function handleSubmit(answers) {
    submitAnswer(currentQuestion, answers)
      .then(() => setcurrentQuestion(currentQuestion + 1))
      .catch((err) => {
        toast.error(err.message || "Impossibile salvare le risposte");
      });
  }

  const TEXTS = {
    ANSWERING: {
      isTitle: hasNextQuestion,
      title: hasNextQuestion ? `Domanda ${currentQuestion + 1} di ${myMatch.length}` : null,
      totalTimeMs: lobby?.config.answerTimeMs * 2,
      isBar: true,
      isQuestion: hasNextQuestion,
      question: hasNextQuestion ? myMatch[currentQuestion].question : null,
      hints: null,
    },
    VOTING: {
      isTitle: true,
      title: "Vota la terna migliore!",
      totalTimeMs: lobby?.config.votingTimeMs,
      isBar: false,
      isQuestion: votingMatch ? true : false,
      question: votingMatch ? votingMatch.question : null, 
      hints: ["che vinca il migliore!", gameState.votes + " voti"],
    },
    REVEAL: {
      isTitle: true,
      title: "Ecco il vincitore!",
      totalTimeMs: lobby?.config.revealTimeMs,
      isBar: false,
      isQuestion: true,
      question: votingMatch ? votingMatch.question : null, 
      hints: ["che vinca il migliore!", gameState.votes + " voti"],
    },
  }
  
  return (
    <>
      <GamePhase underPhase={`Round ${lobby?.currentRound + 1}`} />

      <section className="flex flex-col items-center justify-center relative z-10">
          {TEXTS[lobby?.status].isTitle && (
            <MainTitle
              title={TEXTS[lobby?.status].title}
            />
          )}
        <TimeSlider
          totalTime={TEXTS[lobby?.status].totalTimeMs / 1000}
          endsAt={lobby?.phaseEndAt}
          isBar={TEXTS[lobby?.status].isBar}
        />
      </section>

      {TEXTS[lobby?.status].isQuestion && (
        <Question
          question={TEXTS[lobby?.status].question}
          hints={TEXTS[lobby?.status].hints}
        />
      )}

      {(lobby.status === "ANSWERING") ? 
          hasNextQuestion ? (
                <QuestionForm
                  isFinal={currentQuestion === myMatch.length - 1}
                  onSubmit={handleSubmit}
                />
              ) 
          : (
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
        : null}
      
      {lobby.status === "VOTING" || lobby.status === "REVEAL" ? (
        <section className="flex gap-4 m-6 my-16 md:gap-10 lg:mx-auto md:max-w-4xl">
          {votingMatch && [votingMatch.p1, votingMatch.p2].map((m) => (
            <VoteCard
              id={m.id}
              key={"match-"+lobby.currentVoting+"-"+m.id}
              canVote={canVote}
              username={m.username}
              answers={m.answers}
              hostId={lobby.hostId}
              votedBy={votingMatch.votedBy}
              score={votingMatch.p1.score}
              isWinner={votingMatch.isWinner}
            />
          ))}
        </section>
      ) : null}
    </>
  );
};

export default Game;

