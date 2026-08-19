import { useEffect } from "react";
import { toast } from "react-toastify"

export function useGameSocket(socket, setLobby, gameState, setGameState) {
  useEffect(() => {
    if (!socket) return;

    socket.on("game:player_answered", (data) => {
      console.log("game:player_answered", data);
      setLobby(data.lobby);
      setGameState({ ...gameState, matchLefts: data.matchLefts });
    });


    return () => {
      socket.off("game:player_answered");
    };
  }, [socket, setLobby, setGameState]);
}
