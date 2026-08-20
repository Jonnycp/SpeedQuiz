const { saveAnswers, calculateMatchLefts, calculateVotesLeft, startVotingPhase, saveVote, startRevealPhase } = require("../../services/game.service");
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

    const matchLefts = calculateMatchLefts(lobby);

     socket.to(lobby.code).emit("game:player_answered", {
      lobby: serializeLobby(lobby),
      matchLefts,
    })
    
    if(matchLefts == 0){
      try{
        startVotingPhase(lobby, io);
      }catch(err){
        callback({ error: err.message });
      }
    }

    return callback({
        lobby: serializeLobby(lobby),
        matchLefts,
    })
  });

  //* GAME SAVE VOTEFOR
  // Parametri: voteFor (id del giocatore da votare)
  socket.on("game:vote", (voteFor , callback) => {
    if (!socket.data.lobbyCode) {
      return callback({ error: "Non sei in nessuna stanza" });
    }

    const lobby = getLobby(socket.data.lobbyCode);
    if (!lobby) {
      return callback({ error: "Stanza non trovata" });
    }

    try{
        saveVote(lobby, socket, voteFor);
    }catch(err){
        return callback({ error: err.message });
    }

    const votesLeft = calculateVotesLeft(lobby);
    if(votesLeft == 0){
      startRevealPhase(lobby, io);
    }

    socket.to(lobby.code).emit("game:player_voted", {
      lobby: serializeLobby(lobby),
      votesLeft,
      votes: lobby.players.size - 2 - votesLeft
    })

    return callback({
        lobby: serializeLobby(lobby),
        votesLeft,
        votes: lobby.players.size - 2 - votesLeft
    })
    
  })
}

module.exports = gameHandlers;