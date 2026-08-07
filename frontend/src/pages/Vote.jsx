import { useState } from "react";
import GamePhase from "../components/GamePhase";
import Gamer from "../components/Gamer";
import { Icon } from "@iconify/react";
import ConfirmButton from "../components/ConfirmButton";
import VoteCard from "../components/VoteCard";
import TimeSlider from "../components/TimeSlider";
import MainTitle from "../components/MainTitle";

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
      <GamePhase underPhase="Round 1 di 3" username={ternaData[0]?.username} />
      <section className="flex flex-col items-center justify-center relative z-10 md:mt-10 mt-5">
        <MainTitle title="Vota la terna migliore!" />
        <TimeSlider tempoIniziale={60} />
      </section>
        
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mt-6 flex-1 md:px-30">
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
      </section>
    </>
  );
};

export default Vote;