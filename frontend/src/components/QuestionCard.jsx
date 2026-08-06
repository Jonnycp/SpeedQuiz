import { useState } from "react"

import ConfirmButton from "./ConfirmButton"
import GamePhase from "./GamePhase"


const Question = () => {

    return(
        <div className="flex flex-col items-center mt-10 md:mt-40 px-4 gap-6 w-full max-w-2xl mx-auto"> 
            <div className="relative w-full bg-white shadow-buttons border-3 border-neroNonNero px-6 py-6 md:px-17 md:py-8 rounded-2xl select-none">
                <h2 className="text-lg md:text-3xl font-extrabold text-center">Tre cose che vorresti dire a Ferrara

                </h2>
                <p className="absolute uppercase -top-2 -left-5 bg-[#FFDF9A] shadow-buttons text-xs px-3 py-1 font-bold -rotate-1 select-none md:text-base">domanda flash</p>
                <p className="absolute uppercase -bottom-3 -right-2 bg-[#C4C0FF] shadow-buttons text-xs px-3 py-1 rotate-3 text-[#2100A4] font-bold select-none md:text-base">non mentire!</p>
            </div>

            <form className="w-full">

                <div className="flex flex-col gap-5 *:w-full *:px-4 md:*:px-6 *:py-3 md:*:py-4 *:text-sm md:*:text-lg *:border-3 *:border-neroNonNero *:shadow-buttons mt-7 *:placeholder:text-gray-400">
                    <input placeholder="Inserisci la risposta..." className="bg-white py-3 -rotate-[1.2deg]"></input>
                    <input placeholder="Inserisci la risposta..." className="bg-white py-3 rotate-1"></input>
                    <input placeholder="Inserisci la risposta..." className="bg-white py-3"></input>
                </div>
            
                <div className="w-1/2 mx-auto mt-9">
                    <ConfirmButton content="Invia" color="bg-primary" text_color="text-white"/>
                </div>
            </form>
        </div>
    )
}
export default Question

// mx-30 nel primo div al posto di max-w-2xl mx-auto
// w-[80%] nel form 