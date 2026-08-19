const { saveAnswers, calculateMatchLefts } = require("../../services/game.service");
const { getLobby } = require("../../store/lobbyStore")
const { serializeLobby } = require("../../store/lobbyStore");

function gameHandlers(io, socket) {
  //* GAME SAVE ANSWER
  // Parametri: matchIndex [0, 1] e answers (massimo 3 elementi)
  socket.on("game:answer", ({ matchIndex, answers }, callback) => {
    if (!socket.data.lobbyCode) {
      return callback({ error: "Non sei in nessuna stanza" });
    }

    const lobby = getLobby(socket.data.lobbyCode);
    if (!lobby) {
      return callback({ error: "Stanza non trovata" });
    }

    try{
        saveAnswers(lobby, socket, matchIndex, answers);
    }catch(err){
        return callback({ error: err.message });
    }

     socket.to(lobby.code).emit("game:player_answered", {
      lobby: serializeLobby(lobby),
      matchLefts: calculateMatchLefts(lobby),
    })

    return callback({
        lobby: serializeLobby(lobby),
        matchLefts: calculateMatchLefts(lobby),
    })

    //TODO: se matchLeft = 0... chiudi prima
  });
}

module.exports = gameHandlers;