import { Icon } from "@iconify/react";
import Header from "../components/Header";
import LobbyCard from "../components/LobbyCard";
import SectionTitle from "../components/SectionTitle";
import { useAuth } from "../contexts/AuthContext";
import ConfirmButton from "../components/ConfirmButton";
import EmptyState from "../components/EmptyState";

import { useNavigate } from "react-router";
import { createLobbyAPI, getPublicLobbiesAPI } from "../services/api";
import { useState, useEffect } from "react";
import { useGame } from "../contexts/GameContext";

const Home = () => {
  const { user } = useAuth();
  const { socket, joinLobby } = useGame();

  const [publicLobbies, setPublicLobbies] = useState([]);
  const [lobbycode, setLobbyCode] = useState("");
  const [joinError, setJoinError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();

  //* Gestione crea lobby
  async function handleCreateLobby() {
    try {
      const data = await createLobbyAPI();
      navigate(`/lobby/${data.code}`);
    } catch (err) {
      console.log(err.message);
    }
  }

  //* Gestione entra in lobby
  async function handleSubmit(e) {
    e.preventDefault();
    setIsDisabled(true);
    if (!lobbycode) return;
    setJoinError("");
    try {
      await joinLobby(lobbycode);
      navigate(`/lobby/${lobbycode.trim().toUpperCase()}`);
    } catch (err) {
      setJoinError(err.message);
      setLobbyCode("");
    } finally {
      setIsDisabled(false);
    }
  }

  //* Gestisci accensione pulsante ENTRA
  useEffect(() => {
    if (lobbycode.trim().length === 5) setIsDisabled(false);
    else setIsDisabled(true);
  }, [lobbycode]);

  //* Ottieni lobby pubbliche
  useEffect(() => {
    getPublicLobbiesAPI().then((data) => setPublicLobbies(data.lobbies));
  }, []);

  return (
    <>
      <Header />
      <section className="rotate-1 my-10 mx-5 md:mx-28 xl:mx-72 bg-white font-primary font-extrabold flex flex-col items-start justify-center gap-5 py-5 px-8 md:py-10 md:px-12 border-3 border-neroNonNero shadow-buttons">
        <h3 className="text-4xl uppercase text-background mt-3">
          Ciao, {user.username}!
        </h3>
        <h2 className="text-base md:text-xl -rotate-1 uppercase text-center md:text-left bg-secondary border-3 border-neroNonNero shadow-buttons inline py-2 px-3 mx-auto select-none">
          1 domanda, 3 risposte, il più divertente vince!
        </h2>
        <div className="flex flex-col md:flex-row mt-5 gap-8 md:gap-4 uppercase w-full">
          <ConfirmButton
            color="primary"
            customClasses="flex flex-col flex-1 items-center text-2xl justify-center -rotate-1 gap-2 cursor-pointer hover:scale-110 transition-all duration-300 py-12"
            onClick={handleCreateLobby}
          >
            <Icon icon="mdi:plus-circle" width={30} />
            <span className="ml-2">Crea una partita</span>
          </ConfirmButton>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col flex-1 p-4 gap-2 text-xl bg-gray-200 text-black shadow-buttons border-3 border-neroNonNero cursor-pointer"
          >
            Unisciti a una partita
            <input
              type="text"
              placeholder="Codice stanza"
              maxLength={5}
              value={lobbycode}
              onChange={(e) => {
                const sanitizedValue = e.target.value.replace(
                  /[^a-zA-Z2-9]/,
                  "",
                );
                setLobbyCode(sanitizedValue.toUpperCase().trim());
              }}
              className="mt-3 bg-white p-2 uppercase border-3 border-neroNonNero placeholder:text-gray-400 placeholder:text-lg placeholder:font-medium focus:outline-none"
            />
            {joinError && <p className="text-red-500 text-sm">{joinError}</p>}
            <ConfirmButton
              type="submit"
              disabled={isDisabled}
              color="secondary"
            >
              Entra
            </ConfirmButton>
          </form>
        </div>
      </section>

      <section className="mx-10">
        <SectionTitle title="Esplora le stanze" />

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-6 -mx-4 px-4 hide-scrollbar md:flex-wrap md:justify-center md:gap-10 md:mt-10 md:pb-10">
          {publicLobbies.length > 0 ? (
            publicLobbies.map((lobby) => (
              <div
                key={lobby.code}
                className="w-[80vw] shrink-0 snap-center md:w-auto h-full"
              >
                <LobbyCard
                  title={`Stanza di ${lobby.hostUsername}`}
                  players={lobby.players.length}
                  players_max={lobby.config.maxPlayers}
                  rotation="-rotate-1"
                  content={"Unisciti"}
                />
              </div>
            ))
          ) : (
                <EmptyState message="Nessuna stanza disponibile" />
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
