const { getLobby, serializeLobby, deleteLobby } = require("../../store/lobbyStore");
const { addPlayer, removePlayer } = require("../../services/lobby.service");

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
    io.to(lobby.code).emit("lobby:player_joined", { //! ricorda in socket.io
      player: newPlayer,
      lobby: serializeLobby(lobby),
    });
  });


  
  socket.on("lobby:leave", (callback) => {
    const lobbyCode = socket.data.lobbyCode; 
    const lobby = getLobby(socket.data.lobbyCode);

    //* se il socket non è in nessuna lobby o non ci è mai entrato
    if(!lobbyCode || !lobby) {
      socket.data.lobbyCode = null;
      return callback && callback({ error: "Non sei in nessuna stanza" });
    }

    //* rimuovo il player e avviso tutti gli altri 
    removePlayer(lobby, socket, (callback) => {
      io.to(lobbyCode).emit("lobby:player_left", { // da cambiare in socket.to
        playerLeft: socket.user.id,
        lobby: serializeLobby(lobby)
      })
    })

    if(lobby.players.size === 0){
      deleteLobby(lobbyCode);
    }

    //* aggiorno il code perché chiaramente ha quittato
    socket.data.lobbyCode = null;

    //* il socket non riceve più eventi da io.to().emit 
    socket.leave(lobbyCode);

    callback && callback({success: true});
});
}

module.exports = lobbyHandlers;