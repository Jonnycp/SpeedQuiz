const { getLobby, serializeLobby } = require("../../store/lobbyStore");
const { addPlayer } = require("../../services/lobby.service");

function lobbyHandlers(io, socket) {

  socket.on("lobby:join", (lobbyCode, callback) => {
    if (!lobbyCode.trim()) {
      return callback( { error: "Il codice della stanza è obbligatorio" });
    }

    const lobby = getLobby(lobbyCode.trim().toUpperCase());
    if (!lobby) {
      return callback({ error: "La stanza non esiste"} );
    }

    //* Giocatore ufficialmente entra in stanza (aggiungilo in RAM, entra in stanza, notificalo)
    let newPlayer;
    try {
        newPlayer = addPlayer(lobby, socket);
    } catch(err) {
        return callback({ error: err.message });
    }

    socket.data.lobbyCode = lobby.code;
    socket.join(lobby.code);

    callback({
      lobby: serializeLobby(lobby),
      amIhost: lobby.hostId === socket.user.id 
    })

    //* Notifichiamo altri giocatori (tranne se stesso)
    socket.to(lobby.code).emit("lobby:player_joined", {
      player: newPlayer,
      lobby: serializeLobby(lobby),
    });
  });
}

module.exports = lobbyHandlers