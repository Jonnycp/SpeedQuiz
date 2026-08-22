import { useState, useEffect } from "react";
import ConfirmButton from "./ConfirmButton";
import { useGame } from "../contexts/GameContext";
import { toast } from "react-toastify";

const QuestionForm = ({ isFinal, currentQuestion, setcurrentQuestion }) => {
  const [answers, setAnswers] = useState(["", "", ""]);
  const { submitAnswer } = useGame();

  function handleChange(index, value) {
    setAnswers(answers.map((answer, i) => (i === index ? value : answer)));
  }

  function handleSubmit(answers, currentQuestion, setcurrentQuestion, noNext=false) {
    submitAnswer(currentQuestion, answers)
      .then(() => {
        if (!noNext) {
          setcurrentQuestion(currentQuestion + 1);
        }
      })
      .catch((err) => {
        toast.error(err.message || "Impossibile salvare le risposte");
      });
    }

useEffect(() => {
    if (answers.every((a) => a.trim() === "")) return;

    const timer = setTimeout(() => {
      handleSubmit(answers, currentQuestion, setcurrentQuestion, true);
    }, 400);

    return () => clearTimeout(timer);
  }, [answers]);

  return (
      <form
        className="w-[80%] md:w-[70%] md:max-w-2xl mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(answers, currentQuestion, setcurrentQuestion);
          setAnswers(["", "", ""]);
        }}
      >
        <div className="flex flex-col gap-5 *:w-full *:px-4 md:*:px-6 *:py-4 *:text-sm md:*:text-lg *:border-3 *:border-neroNonNero *:shadow-buttons mt-7 *:placeholder:text-gray-400">
          {answers.map((value, i) => {
            return (
              <input
                key={i}
                value={value}
                placeholder="Inserisci la risposta..."
                onChange={(e) => handleChange(i, e.target.value)}
                maxLength={50}
                className={`z-10 bg-white ${i<1 ? i % 2 ? "rotate-[-1.2deg]" : "rotate-1" : ""}`}
              ></input>
            );
          })}
        </div>

        <div className="w-2/3 mx-auto mt-10 mb-5">
          <ConfirmButton
            color="primary"
            type="submit"
            disabled={answers.every((a) => a.trim() === "")}
            customClasses="w-full -rotate-1 py-4 md:py-3 text-2xl md:text-4xl"
          >
            {isFinal ? "INVIA" : "PROSSIMA"}
          </ConfirmButton>
        </div>
      </form>
  );
};

export default QuestionForm;
