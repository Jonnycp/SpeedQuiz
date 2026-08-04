import GamePhase from "../components/GamePhase";
import Gamer from "../components/Gamer";
import { Icon } from "@iconify/react";
import ConfirmButton from "../components/ConfirmButton";
import SettingsInput from "../components/SettingsInput";

const Lobby = () => {
  const username = "Jonathan";
  const players = ["Jonathan", "Alice", "Bob", "Charlie"];
  const maxPlayers = 6;
  const isCurrentHost = true;

  return (
    <>
      <GamePhase
        phase="Sala d'attesa"
        underPhase="In attesa di giocatori..."
        username={username}
      />
      <div className="flex gap-20 mx-22 font-primary items-center">
        <aside className="bg-secondary flex flex-col items-center py-5 px-4 shadow-buttons flex-1 uppercase font-extrabold border-3 z-10 rounded-xl h-fit">
          <h3 className="bg-black text-white w-fit px-3 py-1 rounded-xl mb-4 select-none">
            codice stanza
          </h3>
          <span className="block text-6xl tracking-wider ">ABCD12</span>
          <div className="flex gap-3 mt-5 mb-8 mx-auto select-none w-[80%]">
            <button className="bg-primary text-white grow px-5 py-2 uppercase font-bold shadow-buttons border-3 border-neroNonNero">
              Invita amici
            </button>

            <button className="bg-white px-3 py-2 shadow-buttons border-3 border-neroNonNero">
              <Icon icon="tabler:copy" />
            </button>
          </div>

          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <div className="flex w-full gap-6">
              <SettingsInput label="Rounds" name="rounds" minValue={3} maxValue={30} />
              <SettingsInput label="Max Giocatori" name="maxPlayers" minValue={3} maxValue={8} />
            </div>
            <SettingsInput label="Tempo per rispondere" name="answerTime" type="range" minValue={10} maxValue={60} />
          </form>
        </aside>

        <section className="rotate-1 bg-transparent md:bg-white md:border-4 md:border-neroNonNero md:shadow-buttons md:p-10 flex-col gap-6 w-full flex-3 relative">
           <div className="hidden md:flex flex-col items-center gap-3">
                <h1 className="text-4xl font-black uppercase tracking-wide text-black text-center">
                    Lobby di {username}
                </h1>
                <h3 className="bg-primary text-white border-3 border-neroNonNero rounded-full px-6 py-1.5 font-extrabold text-sm uppercase shadow-buttons">
                    In attesa... ({players.length}/{maxPlayers})
                </h3>
          </div>
          <div className="flex md:hidden justify-between items-end text-white font-medium text-sm mb-2 px-1">
            <span className="uppercase font-bold tracking-wide">GIOCATORI ({players.length}/{maxPlayers})</span>
            <span className="text-white/80">In attesa...</span>
          </div>
          <div className="hidden md:flex flex-col gap-3 my-8"> 
                   {players.map((player, index) => (
                    <Gamer
                        key={index}
                        username={player}
                        isHost={index === 0}
                        imageUser={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=${player}`}
                        rotation={index % 2 === 0 ? "rotate-0" : "-rotate-1"}
                    />
                ))}
          </div>

          {/*/ Lista dei giocatori in versione mobile */}
          <div className="flex md:hidden flex-wrap gap-5 mb-8">
            {players.map((player, index) => (
              <div key={index} className="flex flex-col items-center w-[72px]">
                <div className="relative">
                  <img
                    className="w-16 h-16 rounded-full border-3 border-neroNonNero shadow-[4px_4px_0_0_#000] object-cover bg-gray-200"
                    src={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=${player}`}
                    alt={player}
                  />
                  {index === 0 && (
                     <div className="absolute top-0 -right-3 bg-verdinoCarino border-2 border-neroNonNero px-1 py-0.5 text-[9px] font-black text-black uppercase z-10">
                       HOST
                     </div>
                  )}
                </div>
                <span className="text-white font-black uppercase mt-3 text-xs tracking-wide truncate max-w-full text-center">
                  {player}
                </span>
              </div>
            ))}

            <div className="flex items-center justify-center w-[72px] h-16 text-white/50">
               <Icon icon="mdi:plus" className="text-3xl" />
            </div>
          </div>

            <ConfirmButton content="Inizia partita"/>
        </section>
      </div>
    </>
  );
};

export default Lobby;
