import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const GameContext = createContext();
const BACKEND = import.meta.env.VITE_BACKEND_URL;

export function GameProvider({ children }) {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("accessToken");

    const newSocket = io(BACKEND, {
      auth: { token },
    });

    //TODO: LOGICA PER GESTIRE ERRORI CONNESSIONE IO + refresh
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  return (
    <GameContext.Provider value={{ user, socket }}>
      {children}
    </GameContext.Provider>
  );
}

//* Hook personalizzato per accedere a context
export function useGame() {
  return useContext(GameContext);
}
