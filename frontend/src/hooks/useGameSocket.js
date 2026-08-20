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

    socket.on("game:player_voted", (data) => {
      console.log("game:player_voted", data);
      setLobby(data.lobby);
      setGameState({ ...gameState, votes: data.votes });
    })

    socket.on("game:reveal_started", (data) => {
      console.log("game:reveal_started", data);
      setLobby(data.lobby);
      setOffset(data.serverNow - Date.now());
    })

    socket.on("game:round_ended", (data) => {
      console.log("game:round_ended", data);
      setLobby(data.lobby);
    })

    return () => {
      socket.off("game:player_answered");
      socket.off("game:voting_started");
      socket.off("game:player_voted");
      socket.off("game:reveal_started")
      socket.off("game:round_ended")
    };
  }, [socket, setLobby, setGameState]);
}
