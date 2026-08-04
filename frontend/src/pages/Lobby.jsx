import GamePhase from "../components/GamePhase";
import { Icon } from "@iconify/react";

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
        <aside className="bg-secondary flex flex-col items-center py-5 shadow-buttons flex-1 uppercase font-extrabold">
          <h3 className="bg-black text-white w-fit px-2 py-1 rounded-xl mb-4 select-none">
            codice stanza
          </h3>
          <span className="block text-6xl">ABCD12</span>
          <div className="flex px-4 py-3 gap-3">
            <button className="bg-primary text-white px-3 py-2 uppercase font-bold shadow-buttons border-3 border-neroNonNero">
              Invita amici
            </button>

            <button className="bg-white px-3 py-2 shadow-buttons border-neroNonNero">
              <Icon icon="griddy-icons:copy" />
            </button>
          </div>

          <form className="flex gap-10">
            <div className="flex flex-1 flex-col">
              <label for="rounds">Rounds</label>
              <div className="flex gap-2">
                <button>+</button>
                <input
                  type="number"
                  id="rounds"
                  name="rounds"
                  min="1"
                  max="10"
                  defaultValue={3}
                />
                <button>-</button>
              </div>
            </div>

            <div className="flex flex-1 flex-col">
              <label for="maxPlayers">Max Giocatori</label>
              <div className="flex gap-2">
                <button>+</button>
                <input
                  type="number"
                  id="maxPlayers"
                  name="maxPlayers"
                  min="3"
                  max="10"
                  defaultValue={8}
                />
                <button>-</button>
              </div>
            </div>

            <div className="flex flex-1 flex-col">
              <label for="answerTime">Rounds</label>
              <div className="flex gap-2">
                <button>+</button>
                <input
                  type="range"
                  id="answerTime"
                  name="answerTime"
                  min="10"
                  max="60"
                />
                <button>-</button>
              </div>
            </div>
          </form>
        </aside>
        <section className="bg-white font-primary flex-2">
          <h2>{`Stanza di ${username}`}</h2>
          <ul>
            {players.map((player, index) => (
              <li key={index}>
                <div>
                  {player}
                  {index == 0 && <span>CAPO</span>}
                </div>
              </li>
            ))}
          </ul>
          <button className="">Inizia partita</button>
        </section>
      </div>
    </>
  );
};

export default Lobby;
