import GamePhase from "../components/GamePhase";
import Gamer from "../components/Gamer";
import { Icon } from "@iconify/react";
import SendButton from "../components/SendButton";
import SettingsInput from "../components/SettingsInput";

const Lobby = () => {
  const username = "Jonathan";
  const players = ["Jonathan", "Alice", "Bob", "Charlie"];

  return (
    <>
      <GamePhase
        phase="Sala d'attesa"
        underPhase="In attesa di giocatori..."
        username={username}
      />
      <div className="flex gap-20 mx-18 font-primary">
        <aside className="bg-secondary flex flex-col items-center py-5 shadow-buttons flex-1 uppercase font-extrabold border-3 z-10 rounded-xl">
          <h3 className="bg-black text-white w-fit px-3 py-1 rounded-xl mb-4 select-none">
            codice stanza
          </h3>
          <span className="block text-6xl tracking-wider">ABCD12</span>
          <div className="flex gap-3 mt-5 mb-8 mx-auto select-none w-[80%]">
            <button className="bg-primary text-white grow px-5 py-2 uppercase font-bold shadow-buttons border-3 border-neroNonNero">
              Invita amici
            </button>
        
            <button className="bg-white px-3 py-2 shadow-buttons border-3 border-neroNonNero">
              <Icon icon="griddy-icons:copy" />
            </button>
          </div>

          <form className="flex gap-10">
            <SettingsInput label="Rounds" name="rounds"/>

           
          </form>
        </aside>

        <section className="bg-white font-primary flex-2">
            {/* Lista dei giocatori ma il primo è un host */}
            {players.map((player, index) => (
                <Gamer
                    key={index}
                    username={player}
                    isHost={index === 0}
                    imageUser={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=${player}`}
                    rotation={index % 2 === 0 ? "rotate-[0.3deg]" : "-rotate-[0.3deg]"}
                />
            ))}
            <SendButton content="Inizia partita"/>
        </section>
      </div>
    </>
  );
};

export default Lobby;
