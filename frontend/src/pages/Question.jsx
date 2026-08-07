import { useState } from "react";

import ConfirmButton from "../components/ConfirmButton";
import GamePhase from "../components/GamePhase";
import QuestionCard from "../components/QuestionCard";

const Question = () => {
  return (
    <>
      <GamePhase username="Jonathan" />
      <div className="flex flex-col items-center mt-30 md:mt-50 px-4 gap-6 w-full max-w-2xl mx-auto">
        <QuestionCard domanda="Tre cose che vorresti dire a Ferrara" />

        <form className="w-[80%]">
          <div className="flex flex-col gap-5 *:w-full *:px-4 md:*:px-6 *:py-3 md:*:py-4 *:text-sm md:*:text-lg *:border-3 *:border-neroNonNero *:shadow-buttons mt-7 *:placeholder:text-gray-400">
            <input
              placeholder="Inserisci la risposta..."
              maxLength="50"
              className="bg-white py-3 rotate-[-1.2deg]"
            ></input>
            <input
              placeholder="Inserisci la risposta..."
              maxLength="50"
              className="bg-white py-3 rotate-1"
            ></input>
            <input
              placeholder="Inserisci la risposta..."
              maxLength="50"
              className="bg-white py-3 md:z-10"
            ></input>
          </div>

          <div className="w-1/2 mx-auto my-9">
            <ConfirmButton
              content="Invia"
              customClasses="w-full bg-primary text-white -rotate-1 py-4 md:py-5 text-xl md:text-4xl"
            />
          </div>
        </form>
      </div>
    </>
  );
};
export default Question;

// mx-30 nel primo div al posto di max-w-2xl mx-auto
// w-[80%] nel form
