import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useParams, useNavigate } from "react-router";
import { useGame } from "../contexts/GameContext";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";

import GamePhase from "../components/GamePhase";
import Gamer from "../components/Gamer";
import ConfirmButton from "../components/ConfirmButton";
import SettingsInput from "../components/SettingsInput";

const Lobby = () => {
  const navigate = useNavigate();
  const { code } = useParams();
  const { user } = useAuth();
  const { socket, lobby, joinLobby, editSettings, leaveLobby, startLobby } =
    useGame();

  const [settings, setSettings] = useState({
    rounds: lobby?.config.rounds || 3,
    public: lobby?.config.public || false,
    answerTimeMs: lobby?.config.answerTimeMs || 30 * 1000,
  });
  const [isDisabled, setIsDisabled] = useState(true);


  //* Gestione join lobby (o join da link)
  useEffect(() => {
    if (lobby && lobby.code === code) return; // se sei già joinato non ha senso fare un joinlobby
    joinLobby(code)
      .then((data) => navigate("/lobby/" + data.lobby.code, { replace: true }))
      .catch((err) => navigate("/", { replace: true }));
  }, [code, socket]);

  //* All'aggiornamento della lobby
  useEffect(() => {
    if (!lobby) return;

    // Aggiorna le impostazioni locali
    setSettings({
      rounds: lobby.config.rounds,
      public: lobby.config.public,
      answerTimeMs: lobby.config.answerTimeMs,
    });

    //Gestione disabilita pulsante avvia
    if (lobby.players.filter(p => p.connected).length >= lobby.config.minPlayers) {
      setIsDisabled(false);
    }else{
      setIsDisabled(true)
    }

    // Gestione spostamento in altre fasi
    if(lobby.status === "ANSWERING" || lobby.status === "VOTING" || lobby.status === "REVEAL"){
      navigate("/game");
    }else if(lobby.status === "ENDEND"){
      navigate("/leaderboard");
    }
  }, [lobby]);


  //* Gestione chiamata a modifica impostazioni lobby (solo host)
  const handleSettingChange = (newSettings) => {
    setSettings(newSettings);

    if (lobby && lobby.hostId === user.id) {
      editSettings(newSettings)
        .then((data) =>
          console.log("Impostazioni modificate con successo", data),
        )
        .catch((err) =>
          toast.error("Errore nella modifica delle impostazioni")
        );
    }
  };

  //* Gestione avvia lobby
  async function handleStart() {
    try {
      await startLobby();
      navigate("/game");
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  }

  //* Gestione copia codice lobby
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Codice copiato con successo!");
    } catch (err) {
      toast.error("Errore nella copia del codice. Riprova più tardi.");
    }
  }

  //* Gestione condividi link lobby
  async function handleShare() {
    try {
        await navigator.share({
        title: "Unisciti alla mia partita di SpeedQuiz!",
        text: `Unisciti alla mia partita di SpeedQuiz! Usa il codice: ${code}`,
        url: window.location.href,
      });
    } catch(err) {
      toast.error("Errore nella condivisione del codice. Riprova più tardi.");
      console.error("Impossibile condividere il codice ora.", err);
    }
  }

  return (
    <>
      <GamePhase
        phase={"Sala di attesa..."}
        underPhase={isDisabled ? "In attesa di giocatori..." : "Pronto per iniziare!"}
      />

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <aside className="bg-secondary flex flex-col items-center py-5 px-4 shadow-buttons flex-1 uppercase font-extrabold border-3 z-10 rounded-xl h-fit">
          <h3 className="bg-black text-white w-fit px-3 py-1 rounded-xl mb-4 select-none">
            codice stanza
          </h3>
          <span className="block text-6xl tracking-wider "> {code} </span>
          <div className="flex gap-3 mt-5 mb-8 mx-auto select-none w-[80%]">
            <ConfirmButton
              color="primary"
              customClasses="!text-neroNonNero"
              onClick={handleShare}
            >
              Invita amici
            </ConfirmButton>

            <ConfirmButton
              customClasses="!bg-white !text-neroNonNero"
              onClick={handleCopy}
            >
              <Icon icon="tabler:copy" className="text-neroNonNero" />
            </ConfirmButton>
          </div>

          <form className="flex flex-col gap-5">
            {lobby && lobby.hostId !== user.id && (
              <p className="text-xs text-center text-red-500 font-bold bg-white px-2 py-1 rounded-md border-2 border-neroNonNero shadow-buttons">
                Solo l'host può modificare
              </p>
            )}
            <div className="flex w-full gap-6">
              <SettingsInput
                label="Rounds"
                name="rounds"
                minValue={1}
                maxValue={9}
                value={settings.rounds}
                disabled={lobby && lobby.hostId !== user.id}
                onChange={(value) =>
                  handleSettingChange({ ...settings, rounds: value })
                }
              />
              <SettingsInput
                label="Visibilità"
                name="visibility"
                type="checkbox"
                value={settings.public}
                disabled={lobby && lobby.hostId !== user.id}
                onChange={(value) =>
                  handleSettingChange({ ...settings, public: value })
                }
              />
            </div>
            <SettingsInput
              label="Tempo per rispondere"
              name="answerTime"
              type="range"
              minValue={10}
              maxValue={60}
              value={settings.answerTimeMs / 1000}
              disabled={lobby && lobby.hostId !== user.id}
              onChange={(value) =>
                handleSettingChange({ ...settings, answerTimeMs: value * 1000 })
              }
            />
          </form>
        </aside>

        <section className="md:rotate-1 bg-transparent md:bg-white md:border-4 md:border-neroNonNero md:shadow-buttons md:p-10 flex-col gap-6 w-full flex-3 relative">
          <div className="hidden md:flex flex-col items-center gap-3">
            <h1 className="text-4xl font-black uppercase tracking-wide text-black text-center">
              {!lobby ? "..." : "Stanza di " + lobby.hostUsername}
            </h1>
            <h3 className="bg-primary text-white border-3 border-neroNonNero rounded-full px-6 py-1.5 font-extrabold text-sm uppercase shadow-buttons -rotate-1">
              In attesa...
              {!lobby
                ? ""
                : `(${lobby.players.length}/${lobby.config.maxPlayers})`}
            </h3>
          </div>
          <div className="flex md:hidden justify-between items-end text-white font-medium text-sm mb-2 px-1">
            <span className="uppercase font-bold tracking-wide">
              GIOCATORI (
              {!lobby
                ? ""
                : `${lobby.players.length}/${lobby.config.maxPlayers}`}
              )
            </span>
            <span className="text-white/80">In attesa...</span>
          </div>
          <div className="flex md:flex-col gap-5 md:gap-3 my-8 flex-wrap">
            {!lobby ? (
              <p>Caricamento giocatori...</p>
            ) : (
              lobby.players.map((player, index) => (
                <Gamer
                  key={player.id}
                  username={player.username}
                  offline={!player.connected}
                  isHost={player.id === lobby.hostId}
                  rotation={index % 2 === 0 ? "md:rotate-0" : "md:-rotate-1"}
                />
              ))
            )}
            <div className="md:hidden flex items-center justify-center w-18 h-16 text-white/50">
              <Icon icon="mdi:plus" className="text-3xl" />
            </div>
          </div>

          {lobby && (
            <ConfirmButton
              color="verdinoCarino"
              customClasses="w-full -rotate-1 py-4 md:py-5 text-xl md:text-4xl"
              disabled={user.id !== lobby.hostId || isDisabled}
              onClick={handleStart}
            >
              {user.id === lobby.hostId ? "Inizia partita" : "Attendi l'host"}
            </ConfirmButton>
          )}
        </section>
      </div>
    </>
  );
};

export default Lobby;
