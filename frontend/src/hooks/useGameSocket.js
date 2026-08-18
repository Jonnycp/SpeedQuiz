import { useEffect } from "react";
import { toast } from "react-toastify"

export function useGameSocket(socket, setLobby) {
  useEffect(() => {
    if (!socket) return;

    socket.on("game:player_answered", (data) => {
      console.log("lobby:player_joined", data);
      setLobby(data.lobby);
    });


    return () => {
      socket.off("game:player_answered");
    };
  }, [socket, setLobby]);
}
