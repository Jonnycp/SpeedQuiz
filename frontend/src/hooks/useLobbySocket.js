import { useEffect } from "react";
import { toast } from "react-toastify"

export function useLobbySocket(socket, setLobby) {
  useEffect(() => {
    if (!socket) return;

    socket.on("lobby:player_joined", (data) => {
      console.log("lobby:player_joined", data);
      setLobby(data.lobby);
    });

    socket.on("lobby:player_disconnected", (data) => {
      if(data.lobby.status !== "ENDED") {
        console.log("lobby:player_disconnected", data, data.lobby.players.length < data.lobby.config.minPlayers);
        if(data.lobby.players.length < data.lobby.config.minPlayers) {
          toast.error(`${data.playerDisconnected.username} si è disconnessə... Non ci sono abbastanza giocatori per continuare la partita.`)
        } else {
          toast.info(`${data.playerDisconnected.username} si è disconnessə...`)
        }

      }
      if(data.lobby.status !== "ENDED") {
        setLobby(data.lobby);
      }
    });

    socket.on("lobby:player_offline", (data) => {
      if(data.lobby.status !== "ENDED" && data.lobby.status !== "LOBBY") {
        toast.warn(`${data.playerDisconnected.username} è offline...`)
        console.log("lobby:player_offline", data);
      }
      if(data.lobby.status !== "ENDED") {
        setLobby(data.lobby);
      }
    });

    socket.on("lobby:modified_settings", (data) => {
      console.log("lobby:modified_settings", data);
      setLobby(data.lobby);
    });

     socket.on("lobby:started", (data) => {
      console.log("lobby:started", data);
      setLobby(data.lobby);
    })

    return () => {
      socket.off("lobby:player_joined");
      socket.off("lobby:player_offline");
      socket.off("lobby:player_disconnected");
      socket.off("lobby:modified_settings");
      socket.off("lobby:player_left");
      socket.off("lobby:started")
    };
  }, [socket, setLobby]);
}
