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
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <aside className="bg-secondary flex flex-col items-center py-5 px-4 shadow-buttons flex-1 uppercase font-extrabold border-3 z-10 rounded-xl h-fit">
          <h3 className="bg-black text-white w-fit px-3 py-1 rounded-xl mb-4 select-none">
            codice stanza
          </h3>
          <span className="block text-6xl tracking-wider ">ABCD12</span>
          <div className="flex gap-3 mt-5 mb-8 mx-auto select-none w-[80%]">
            <ConfirmButton content="Invita amici" bgColor="primary" textColor="neroNonNero"/>
            <ConfirmButton content={<Icon icon="tabler:copy" className="text-neroNonNero" />} bgColor="white" textColor="neroNonNero"/>
          </div>

          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <div className="flex w-full gap-6">
              <SettingsInput label="Rounds" name="rounds" minValue={3} maxValue={30} />
              <SettingsInput label="Max Giocatori" name="maxPlayers" minValue={3} maxValue={8} />
            </div>
            <SettingsInput label="Tempo per rispondere" name="answerTime" type="range" minValue={10} maxValue={60} />
          </form>
        </aside>

        <section className="md:rotate-1 bg-transparent md:bg-white md:border-4 md:border-neroNonNero md:shadow-buttons md:p-10 flex-col gap-6 w-full flex-3 relative">
           <div className="hidden md:flex flex-col items-center gap-3">
                <h1 className="text-4xl font-black uppercase tracking-wide text-black text-center">
                    Lobby di {username}
                </h1>
                <h3 className="bg-primary text-white border-3 border-neroNonNero rounded-full px-6 py-1.5 font-extrabold text-sm uppercase shadow-buttons -rotate-1">
                    In attesa... ({players.length}/{maxPlayers})
                </h3>
          </div>
          <div className="flex md:hidden justify-between items-end text-white font-medium text-sm mb-2 px-1">
            <span className="uppercase font-bold tracking-wide">GIOCATORI ({players.length}/{maxPlayers})</span>
            <span className="text-white/80">In attesa...</span>
          </div>
          <div className="flex md:flex-col gap-5 md:gap-3 my-8 flex-wrap"> 
                   {players.map((player, index) => (
                    <Gamer
                        key={index}
                        username={player}
                        isHost={index === 0}
                        rotation={index % 2 === 0 ? "md:rotate-0" : "md:-rotate-1"}
                    />
                ))}
            <div className="md:hidden flex items-center justify-center w-18 h-16 text-white/50">
               <Icon icon="mdi:plus" className="text-3xl" />
            </div>
          </div>

            <ConfirmButton 
              content="Inizia partita" 
              bgColor="verdinoCarino" 
              textColor="black" 
              customClasses="w-full -rotate-1 py-4 md:py-5 text-xl md:text-4xl" />
        </section>
      </div>
    </>
  );
};

export default Lobby;