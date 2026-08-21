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
import ConfirmButton from "../components/ConfirmButton.jsx";
import ResultPlayer from "../components/ResultPlayer.jsx";

const Game = () => {
  const { user } = useAuth();
  const { code } = useParams();
  const { socket, lobby, joinLobby, gameState, startLobby } = useGame();
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const navigate = useNavigate();

  //* Costanti di utility per frontend
  const currentRound = lobby?.rounds?.[lobby.currentRound] ?? [];
  const myMatch = currentRound.filter((m) => m.p1.id === user.id || m.p2.id === user.id);
  const hasNextQuestion = currentQuestion >= 0 && currentQuestion < myMatch.length;
  const votingMatch = currentRound[lobby?.currentVoting];
  const canVote = votingMatch && !(votingMatch.p1.id === user.id || votingMatch.p2.id === user.id);
  const isHost = user.id === lobby?.hostId;
  
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
    if (lobby && lobby.code === code) return; // abilita il join solo se l'utente non fa parte della lobby
    joinLobby(code)
    .then((response) => {
      if (response.lobby.status === "LOBBY") navigate("/lobby/" + code);
    })
    .catch((err) => {
      toast.error(err.message || "Non sei in una lobby. Verrai reindirizzato alla home.");
      navigate("/");
    });
  }, [code, socket]);

  //* Next round
  function handleNextRound() {
    if(!isHost) return;
    startLobby()
    .catch(err => {
      toast.error(err.message || "Impossibile avviare un nuovo round");
    })
  }

  useEffect(() => {
    if(lobby?.status === 'ENDED' && lobby.gameId){
      navigate("/leaderboard/" + lobby.gameId)
    } else if(lobby?.status === 'LOBBY' && lobby.code === code){
      toast.error(`La partita è stata interrotta perché il numero giocatori non è sufficiente (minimo 3).`);
      navigate("/lobby/" + lobby.code)
    }
    if(lobby?.status === 'LOBBY' && lobby.code){
      navigate("/lobby/" + lobby.code)
    }
  }, [lobby?.status, lobby?.gameId])
  
  
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
      isTime: true,
      isQuestion: votingMatch ? true : false,
      question: votingMatch ? votingMatch.question : null, 
      hints: ["che vinca il migliore!", gameState.votes + " voti"],
    },
    REVEAL: {
      isTitle: true,
      title: "Ecco il vincitore!",
      totalTimeMs: lobby?.config.revealTimeMs,
      isBar: false,
      isTime: false,
      isQuestion: true,
      question: votingMatch ? votingMatch.question : null, 
      hints: ["che vinca il migliore!", gameState.votes + " voti"],
    },
    PAUSED: {
      isTitle: true,
      title: `Round ${lobby?.currentRound + 1} terminato!`,
      totalTimeMs: 0,
      isBar: false,
      isTime: false,
      isQuestion: false,
      question: null, 
      hints: null,
    }
  }
  
  return (
    <>
      <GamePhase underPhase={`Round ${lobby?.currentRound + 1}`} />

      <section className="flex flex-col items-center justify-center relative z-10">
          {TEXTS[lobby?.status]?.isTitle && (
            <MainTitle
              title={TEXTS[lobby?.status]?.title}
            />
          )}
        <TimeSlider
          totalTime={TEXTS[lobby?.status]?.totalTimeMs / 1000}
          endsAt={lobby?.phaseEndAt}
          isBar={TEXTS[lobby?.status]?.isBar}
          isTime={TEXTS[lobby?.status]?.isTime}
        />
      </section>

      {TEXTS[lobby?.status]?.isQuestion && (
        <Question
          question={TEXTS[lobby?.status]?.question}
          hints={TEXTS[lobby?.status]?.hints}
        />
      )}

      {(lobby?.status === "ANSWERING") ? 
          hasNextQuestion ? (
                <QuestionForm
                  isFinal={currentQuestion === myMatch.length - 1}
                  setcurrentQuestion={setcurrentQuestion}
                  currentQuestion={currentQuestion}
                />
              ) 
          : (
              <EmptyState
                message={
                  <div className="md:p-10 text-2xl flex flex-col gap-4">
                    Attendi gli altri giocatori
                    <span className="font-normal text-xl">
                      {gameState.matchLefts} di {lobby.players.length}
                    </span>
                  </div>
                }
              ></EmptyState>
        ) 
        : null}
      
      {lobby?.status === "VOTING" || lobby?.status === "REVEAL" ? 
          (<section className="flex gap-4 m-6 my-16 md:gap-10 lg:mx-auto md:max-w-4xl">
              {votingMatch && [votingMatch.p1, votingMatch.p2].map((m, i) => (
                <VoteCard
                  id={m.id}
                  key={"match-"+lobby.currentVoting+"-"+m.id}
                  canVote={canVote}
                  username={m.username}
                  answers={m.answers}
                  votedBy={m.votedBy}
                  score={m.score}
                  isWinner={m.isWinner}
                  status={lobby.status}
                />
              ))}
          </section>)
      : null}

      {
        lobby?.status === "PAUSED" && (
          <section className="flex flex-col items-center justify-center">
            <div className="flex flex-col gap-4 w-3/4 md:w-1/2 lg:w-1/3">
              {lobby.players.sort((a, b) => b.score - a.score).map((p, i) => (
              <ResultPlayer
                key={p.id}
                username={p.username}
                id={p.id}
                points={p.score}
                isWinner={p.isWinner}
                className={"animate-slide-in-bottom"}
              />
            ))}
            </div>
            <ConfirmButton
              color="verdinoCarino"
              customClasses="py-4 md:py-5 my-10 text-xl md:text-2xl animate-pop"
              disabled={!isHost}
              onClick={handleNextRound}
            >
              {isHost ? "Avvia prossimo round" : "In attesa dell'host"}
            </ConfirmButton>
          </section>
        )
      }
    </>
  );
};

export default Game;

