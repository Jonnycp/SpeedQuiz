import { useState } from "react";
import GamePhase from "../components/GamePhase";
import Gamer from "../components/Gamer";
import { Icon } from "@iconify/react";
import ConfirmButton from "../components/ConfirmButton";
import VoteCard from "../components/VoteCard";

const Vote = () => {
  const [selectedVote, setSelectedVote] = useState(null);
  const ternaData = [
    { 
      id: 1, 
      username: "MARCO_92", 
      phrases: ["Una pizza al tramonto", "Il silenzio della montagna", "Dormire 10 ore filate"],
      host: false
    },
    { 
      id: 2, 
      username: "ELENA_FLY", 
      phrases: ["Cani che fanno surf", "Gelato al gusto bacon", "Un volo per Marte"],
      host: true
    },
    { 
      id: 3, 
      username: "DEV_GIULIO", 
      phrases: ["Codice che compila", "Caffè infinito gratis", "50 euro nei jeans"],
      host: false
    },
    { 
      id: 4, 
      username: "SARA_ART", 
      phrases: ["Museo aperto di notte", "Dipingere con le dita", "Il colore del vento"],
      host: false
    },
    { 
      id: 5, 
      username: "SARA_ART", 
      phrases: ["Museo aperto di notte", "Dipingere con le dita", "Il colore del vento"],
      host: false
    }
  ];

  return (
    <>
        <GamePhase username={ternaData[0]?.username} />
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl uppercase font-extrabold tracking-wide text-white text-center">
          Vota la terna migliore
        </h1>
      </div>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-6 flex-1 md:px-30">
        {ternaData.map((data) => (
          <VoteCard 
            key={data.id} 
            username={data.username}
            phrases={data.phrases} 
            host={data.host}
            isSelected={selectedVote === data.id}
            onSelect={() => setSelectedVote(data.id)} 
          />
        ))}
      </div>
    </>
  );
};

export default Vote;