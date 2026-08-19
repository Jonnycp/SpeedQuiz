import { useState } from "react";
import ConfirmButton from "./ConfirmButton";

const QuestionCard = ({ question, onSubmit, isFinal }) => {
  const [answers, setAnswers] = useState(["", "", ""]);

  function handleChange(index, value) {
    setAnswers(answers.map((answer, i) => (i === index ? value : answer)));
  }
  
  return (
    <div className="flex flex-col items-center mt-5 px-4 gap-3 w-full mx-auto md:max-w-3xl">
      <div className="relative w-full bg-white shadow-buttons border-3 border-neroNonNero px-6 py-7 md:px-20 md:py-10 rounded-2xl select-none">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center">
          {question.text}
        </h2>
        <p className="absolute uppercase -top-3 md:-top-5 -left-4 bg-[#FFDF9A] shadow-buttons text-xs px-3 py-1 font-bold -rotate-2 select-none md:text-base">
          domanda flash
        </p>
        <p className="absolute uppercase -bottom-3 -right-2 bg-[#C4C0FF] shadow-buttons text-xs px-3 py-1 rotate-3 text-[#2100A4] font-bold select-none md:text-base">
          non mentire!
        </p>
      </div>

      <form
        className="w-[80%]"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(answers);
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
    </div>
  );
};

export default QuestionCard;
