import GamePhase from "../components/GamePhase.jsx";
import QuestionCard from "../components/QuestionCard.jsx";
import MainTitle from "../components/MainTitle.jsx";
import TimeSlider from "../components/TimeSlider.jsx";

const Question = () => {
  return (
    <>
      <GamePhase underPhase="Round 1 di 3" username="Jonathan" />
      <section className="flex flex-col items-center justify-center relative z-10 md:mt-10 mt-5">
        <MainTitle title="Domanda 1 di 3" />
        <TimeSlider tempoIniziale={20} />
      </section>

      <QuestionCard />
    </>
  );
};

export default Question;
