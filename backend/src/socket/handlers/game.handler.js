const { saveAnswers } = require("../../services/game.service");
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

    let myMatches
    try{
         myMatches = saveAnswers(lobby, socket, matchIndex, answers);
    }catch(err){
        return callback({ error: err });
    }
     
    return callback({
        lobby: serializeLobby(lobby),
        myMatches: myMatches
    })

    const currentRound = lobby.rounds.get(lobby.currentRound)
    const matchCompleted = currentRound.filter(m => m.p1.answers.length >= 1 && m.p2.answers.length >= 1)

     socket.to(lobby.code).emit("game:player_answered", {
      lobby: serializeLobby(lobby),
      matchLefts: currentRound.length - matchCompleted
    })

    //TODO: se matchLeft = 0... chiudi prima
  });
}

module.exports = gameHandlers;
