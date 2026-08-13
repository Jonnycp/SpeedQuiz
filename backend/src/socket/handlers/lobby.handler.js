const { getLobby, serializeLobby } = require("../../store/lobbyStore");
const { addPlayer } = require("../../services/lobby.service");

function lobbyHandlers(io, socket) {
  socket.on("lobby:join", (lobbyCode) => {
    if (!lobbyCode.trim()) {
      return socket.emit("lobby:error", {
        message: "Il codice della stanza è obbligatorio",
      });
    }

    const lobby = getLobby(lobbyCode.trim().toUpperCase());
    if (!lobby) {
      return socket.emit("lobby:error", { message: "Stanza inesistente" });
    }

    //* Giocatore ufficialmente entra in stanza (aggiungilo in RAM, entra in stanza, notificalo)
    let newPlayer;
    try {
        newPlayer = addPlayer(lobby, socket);
    } catch(err) {
        return socket.emit("lobby:error", { message: err.message });
    }

    socket.data.lobbyCode = lobby.code;
    socket.join(lobby.code);

    socket.emit("lobby:joined", {
      lobby: serializeLobby(lobby),
      amIhost: lobby.hostId === socket.user.id,
    });

    //* Notifichiamo altri giocatori (tranne se stesso)
    socket.to(lobby.code).emit("lobby:player_joined", {
      player: newPlayer,
      lobby: serializeLobby(lobby),
    });
  });
}

module.exports = lobbyHandlers