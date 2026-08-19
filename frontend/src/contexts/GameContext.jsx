import { createContext, useContext, useState, useEffect } from "react";
import { initSocketConnection, disconnectSocket } from "../services/socket";
import { useAuth } from "./AuthContext";
import { useLobbySocket } from "../hooks/useLobbySocket";
import { useGameSocket } from "../hooks/useGameSocket";

const GameContext = createContext();

export function GameProvider({ children }) {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [lobby, setLobby] = useState(null);
  const [offset, setOffset] = useState(0);
  const [gameState, setGameState] = useState({
    matchLefts: 0,
  });

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("accessToken");
    const socket = initSocketConnection(token);
    socket.connect();

    setSocket(socket);

    socket.on("connect_error", async (err) => {
      console.error("Errore di connessione:", err.message);

      //* Se token scaduto o non valido... prova a fare refresh
      if (err.message.includes("Access Token")) {
        try {
          const response = await fetch(`/api/v1/auth/refresh`, {
            method: "POST",
            credentials: "include",
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("accessToken", data.accessToken);
            socket.auth = { token: data.accessToken };
            socket.connect();
            console.log("Refresh AccessToken riuscito.");
          } else {
            localStorage.removeItem("accessToken");
            disconnectSocket();
            window.location.reload();
            throw new Error("Refresh AccessToken fallito.");
          }
        } catch (error) {
          console.error("Errore durante il refresh del token:", error);
        }
      }
    });

    return () => {
      disconnectSocket();
      setSocket(null);
    };
  }, [user]);

  useLobbySocket(socket, setLobby);
  useGameSocket(socket, setLobby, gameState, setGameState, setOffset);

  async function joinLobby(code) {
    if (!socket) throw new Error("Socket non connesso");
    setLobby(null); // pulisce la lobby dai valori della vecchia
    const response = await socket.emitWithAck(
      "lobby:join",
      code.trim().toUpperCase().slice(0, 5),
    );
    if (response.error) throw new Error(response.error);
    setLobby(response.lobby);
    setGameState({ ...gameState, matchLefts: response.matchLefts });
    return response;
  }

  async function editSettings(newSettings) {
    if (!socket) throw new Error("Socket non connesso");
    const response = await socket.emitWithAck(
      "lobby:modify_settings",
      newSettings,
    );
    if (response.error) throw new Error(response.error);
    setLobby({ ...lobby, config: response.config });

    return response;
  }

  async function leaveLobby() {
    if (!socket) throw new Error("Socket non connesso");
    const response = await socket.emitWithAck("lobby:leave");
    if (response.error) throw new Error(response.error);
    setLobby(null);
    return response;
  }

  async function startLobby() {
    if (!socket) throw new Error("Socket non connesso");
    const response = await socket.emitWithAck("lobby:start");
    if (response.error) throw new Error(response.error);
    setLobby(response.lobby);
    setOffset(response.serverNow - Date.now());
    return response;
  }

  async function submitAnswer(matchIndex, answers) {
    if (!socket) throw new Error("Socket non connesso");
    const response = await socket.emitWithAck("game:answer", {matchIndex, answers});
    if (response.error) throw new Error(response.error);
    setLobby(response.lobby);
    setGameState({ ...gameState, matchLefts: response.matchLefts });
    console.log("submitAnswer response", response)
    return response;
  }

  return (
    <GameContext.Provider
      value={{
        socket,
        lobby,
        offset,
        gameState,
        joinLobby,
        editSettings,
        leaveLobby,
        startLobby,
        submitAnswer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

//* Hook personalizzato per accedere a context
export function useGame() {
  return useContext(GameContext);
}
