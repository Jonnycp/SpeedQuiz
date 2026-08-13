import { Icon } from "@iconify/react";
import Header from "../components/Header";
import LobbyCard from "../components/LobbyCard";
import SectionTitle from "../components/SectionTitle";
import { useAuth } from "../contexts/AuthContext"
import ConfirmButton from "../components/ConfirmButton";

const Home = () => {
  const { user } = useAuth();
      const datiUtente = {
        username: "Jonny",
        email: "jonny@speedquiz.it",
        punti: 7083,
        partiteVinte: 10,
        partiteGiocate: 15,
        partite: [
            { id: 1, title: "Stanza di tizio 1", players: 3, maxPlayers: 3, isWinner: false },
            { id: 2, title: "Stanza di tizio 2", players: 1, maxPlayers: 3, isWinner: false },
            { id: 3, title: "Stanza di tizio 3", players: 5, maxPlayers: 6, isWinner: false },
            { id: 4, title: "Stanza di tizio 4", players: 4, maxPlayers: 6, isWinner: false }
        ]
    };

  return (
    <>
      <Header />
      <section className="rotate-1 my-10 mx-5 md:mx-28 xl:mx-72 bg-white font-primary font-extrabold flex flex-col items-start justify-center gap-5 py-5 px-8 md:py-10 md:px-12 border-3 border-neroNonNero shadow-buttons">
        <h3 className="text-3xl uppercase text-background">Ciao, {user.username}!</h3>
        <h2 className="text-xl -rotate-1 uppercase text-center md:text-left bg-secondary border-3 border-neroNonNero shadow-buttons inline py-2 px-3 mx-auto select-none">
          1 domanda, 3 risposte, il più veloce vince!
        </h2>
        <div className="flex flex-col md:flex-row mt-5 gap-8 md:gap-4 uppercase w-full">
          <ConfirmButton 
            color="primary" 
            customClasses="flex flex-col flex-1 items-center text-2xl justify-center -rotate-1 gap-2 cursor-pointer hover:scale-110 transition-all duration-300"
          >
            <Icon icon="mdi:plus-circle" width={30} />
            <span className="ml-2">Crea una partita</span>
          </ConfirmButton>
          <form className="flex flex-col flex-1 p-4 gap-2 text-xl bg-gray-200 text-black shadow-buttons border-3 border-neroNonNero cursor-pointer">
            Unisciti a una partita
            <input
              type="text"
              placeholder="Codice stanza"
              maxLength={6}
              className="mt-3 bg-white p-2 uppercase border-3 border-neroNonNero placeholder:text-gray-400 placeholder:text-lg placeholder:font-medium focus:outline-none"
            />
            <ConfirmButton color="secondary">
                Entra
            </ConfirmButton>
          </form>
        </div>
      </section>

      <section className="mx-10">
        <SectionTitle title="Esplora le stanze" />

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-6 -mx-4 px-4 hide-scrollbar flex md:flex-wrap md:justify-center md:gap-10 md:mt-10 md:pb-10">
              {datiUtente.partite.map((partita) => (
              <div key={partita.id} className="w-[80vw] shrink-0 snap-center md:w-auto h-full">
                  <LobbyCard
                      title={partita.title} 
                      players={partita.players} 
                      players_max={partita.maxPlayers} 
                      rotation="-rotate-1" 
                      content={"Unisciti"} 
                      isWinner={partita.isWinner} 
                  />
              </div>
          ))}
      </div>
      </section>
    </>
  );
};

export default Home;