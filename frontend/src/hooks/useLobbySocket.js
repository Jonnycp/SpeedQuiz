import { useEffect } from "react";

export function useLobbySocket(socket, setLobby) {
  useEffect(() => {
    if (!socket) return;

    socket.on("lobby:player_joined", (data) => {
      console.log("lobby:player_joined", data);
      setLobby(data.lobby);
    });

    socket.on("lobby:player_disconnected", (data) => {
      console.log("lobby:player_disconnected", data);
      setLobby(data.lobby);
    });

    socket.on("lobby:player_offline", (data) => {
      console.log("lobby:player_offline", data);
      setLobby(data.lobby);
    });

    socket.on("lobby:modified_settings", (data) => {
      console.log("lobby:modified_settings", data);
      setLobby(data.lobby);
    });
    
    socket.on("lobby:player_left", (data) => {
      console.log("lobby:player_left", data);
      setLobby(data.lobby);
    } )

    return () => {
      socket.off("lobby:player_joined");
      socket.off("lobby:player_offline");
      socket.off("lobby:player_disconnected");
      socket.off("lobby:modified_settings");
      socket.off("lobby:player_left");
    };
  }, [socket, setLobby]);
}
