import { Icon } from "@iconify/react";
import Header from "../components/Header";
import LobbyCard from "../components/LobbyCard";

const Home = () => {
  const username = "Jonathan";
  return (
    <>
      <Header username={username} />
      <section className="rotate-1 my-10 mx-28 bg-white font-primary font-extrabold flex flex-col items-start justify-center gap-5 py-10 px-12 border-3 border-neroNonNero shadow-buttons">
        <h3 className="text-3xl uppercase text-background">Ciao, {username}</h3>
        <h2 className="text-xl -rotate-1 uppercase bg-secondary border-3 border-neroNonNero shadow-buttons inline py-2 px-3 mx-auto select-none">
          1 domanda, 3 risposte, il più veloce vince!
        </h2>
        <div className="flex mt-5 gap-4 uppercase w-full">
          <button className="flex flex-col flex-1 items-center text-2xl justify-center gap-2 py-10 uppercase bg-primary text-white shadow-buttons border-3 border-neroNonNero hover:-translate-y-2 transition-transform cursor-pointer">
            <Icon icon="mdi:plus-circle" width={50} />
            Crea un partita
          </button>
          <form className="flex flex-col flex-1 p-4 gap-2 text-xl bg-gray-200 text-black shadow-buttons border-3 border-neroNonNero hover:-translate-y-2 transition-transform cursor-pointer">
            Unisciti a una partita
            <input
              type="text"
              placeholder="Codice stanza"
              maxLength={6}
              className="mt-3 bg-white p-2 uppercase border-3 border-neroNonNero placeholder:text-gray-400 placeholder:text-lg placeholder:font-medium"
            />
            <input
              type="submit"
              value="Entra"
              className="uppercase py-2 bg-secondary text-black shadow-buttons border-3 border-neroNonNero"
            />
          </form>
        </div>
      </section>

      <section className="mx-10">
        <div className="flex items-center gap-2 after:flex-1 after:h-0.5 after:bg-black/80">
          <h2 className="text-xl -rotate-1 uppercase bg-terziary border-3 border-neroNonNero shadow-buttons inline py-2 px-3 mx-auto select-none text-white font-extrabold">
            Esplora le stanze
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-10 mt-5 pb-10">
          <LobbyCard title="Stanza di tizio 1" players={3} players_max={6} rotation="rotate-2" />
          <LobbyCard title="Stanza di tizio 2" players={3} players_max={6} rotation="-rotate-2" />
          <LobbyCard title="Stanza di tizio 3" players={3} players_max={6} rotation="rotate-2" />
        </div>

      </section>
    </>
  );
};

export default Home;
