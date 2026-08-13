import { createContext, useContext, useState, useEffect } from "react";
import { initSocketConnection, disconnectSocket } from "../services/socket";
import { useAuth } from "./AuthContext";
import { useLobbySocket } from "../hooks/useLobbySocket";
const GameContext = createContext();

export function GameProvider({ children }) {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [lobby, setLobby] = useState(null);

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

  function joinLobby(code) {
    if (socket) {
      socket.emit("lobby:join", code.trim().toUpperCase().slice(0, 5));
    }
  }

  return (
    <GameContext.Provider value={{ socket, lobby, joinLobby }}>
      {children}
    </GameContext.Provider>
  );
}

//* Hook personalizzato per accedere a context
export function useGame() {
  return useContext(GameContext);
}
