import { useEffect } from "react";
import { toast } from "react-toastify"

export function useGameSocket(socket, setLobby, gameState, setGameState, setOffset) {
  useEffect(() => {
    if (!socket) return;

    socket.on("game:player_answered", (data) => {
      console.log("game:player_answered", data);
      setLobby(data.lobby);
      setGameState({ ...gameState, matchLefts: data.matchLefts });
    });

    socket.on("game:voting_started", (data) => {
      console.log("game:voting_started", data);
      setLobby(data.lobby);
      setOffset(data.serverNow - Date.now());
    })

    return () => {
      socket.off("game:player_answered");
      socket.off("game:voting_started");
    };
  }, [socket, setLobby, setGameState]);
}
