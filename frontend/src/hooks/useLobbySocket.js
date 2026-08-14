import { useEffect } from "react";

/* 1. capire se divisione in hook è giusta
2. capire dove è il miglior posto per inserire emittori
3. capire come usare ack
4. far funzionare tutto...entro oggi :( ) */

export function useLobbySocket(socket, setLobby) {
  //* ASCOLTATORI
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

    return () => {
      socket.off("lobby:player_joined");
      socket.off("lobby:player_offline");
      socket.off("lobby:player_disconnected");
    };
  }, [socket, setLobby]);
}
