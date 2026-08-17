const { getLobby, serializeLobby, deleteLobby } = require("../../store/lobbyStore");
const { addPlayer, removePlayer, prepareStart } = require("../../services/lobby.service");
const { startRound } = require("../../services/game.service");

function lobbyHandlers(io, socket) {
  //* JOIN LOBBY
  
  // Parameters: lobbyCode, callback
  socket.on("lobby:join", (lobbyCode, callback) => {
    if (!lobbyCode.trim()) {
      return callback({ error: "Il codice della stanza è obbligatorio" });
    }

    const lobby = getLobby(lobbyCode.trim().toUpperCase());
    if (!lobby) {
      return callback({ error: "La stanza non esiste" });
    }

    //* Giocatore ufficialmente entra in stanza (aggiungilo in RAM, entra in stanza, notificalo)
    let newPlayer;
    try {
      newPlayer = addPlayer(lobby, socket);
    } catch (err) {
      return callback({ error: err.message });
    }

    socket.data.lobbyCode = lobby.code;
    socket.join(lobby.code);

    callback({
      lobby: serializeLobby(lobby),
      amIhost: lobby.hostId === socket.user.id,
    });

    //* Notifichiamo altri giocatori (tranne se stesso)
    socket.to(lobby.code).emit("lobby:player_joined", {
      player: newPlayer,
      lobby: serializeLobby(lobby),
    });
  });

  //* MODIFICA IMPOSTAZIONI
  // Parametri: settings.public, settings.rounds, settings.answerTimeMs, callback
  socket.on("lobby:modify_settings", (settings, callback) => {
    //* Verifica se sei in una lobby
    if (!socket.data.lobbyCode) {
      return callback({
        error: "Non sei in una stanza.",
      });
    }

    //* Verifica se è l'host
    const lobby = getLobby(socket.data.lobbyCode);
    if (socket.user.id !== lobby.hostId) {
      return callback({
        error: "Non sei l'host della stanza",
      });
    }

    //* Verificare se impostazioni inviate sono valide
    if (!settings ||
      (!settings.public && !settings.rounds && !settings.answerTimeMs)
    ) {
      return callback({
        error:
          "Inserisci almeno un parametro da modificare tra (public, rounds o answerTime)",
      });
    }

    // TempoGame = Nround * (2 * answerTimeSingle + nGiocatori * votingTime)
    if(settings.rounds !== undefined){
      if (settings.rounds < 1 || settings.rounds > 9) {
        return callback({ error: "Numero di rounds non valido (min 1, max 9)"});
      } else {
        lobby.config.rounds = settings.rounds;
      }
    }


    if (settings.answerTimeMs < 10000 || settings.answerTimeMs > 60000) {
      return callback({
        error: "Tempo per rispondere non valido (min 10sec, max 60sec)",
      });
    } else {
      lobby.config.answerTimeMs = settings.answerTimeMs;
    }

    if (settings.public === true || settings.public === false) {
      lobby.config.public = settings.public;
    } else {
      return callback({error: "Impostazione visibilità lobby non valida" });
    }

    callback({
      lobby: serializeLobby(lobby),
      config: lobby.config,
    });

    //* Notifica gli altri giocatori della modifica (tranne se stesso)
    socket.to(lobby.code).emit("lobby:modified_settings", {
      lobby: serializeLobby(lobby),
      config: lobby.config,
    });
  });


  //* ESCI DA LOBBY
  // Parametri: callback
  socket.on("lobby:leave", (callback) => {
    // Socket.IO fornisce come parametro della CB, un'altra CB per inviare la risposta al client quando è "pronta" e risolvere così la promise restituita da emitwithack
    const lobbyCode = socket.data.lobbyCode;
    const lobby = getLobby(socket.data.lobbyCode);

    //* se il socket non è in nessuna lobby o non ci è mai entrato
    if (!lobbyCode || !lobby) {
      socket.data.lobbyCode = null;
      return callback && callback({ error: "Non sei in nessuna stanza" });
    }

    //* rimuovo il player e avviso tutti gli altri
    removePlayer(lobby, socket, (callback) => {
      socket.to(lobbyCode).emit("lobby:player_left", {
        playerLeft: socket.user.id,
        lobby: serializeLobby(lobby),
      });
    });

    if (lobby.players.size === 0) {
      // sposta questo controllo
      deleteLobby(lobbyCode);
    }

    socket.data.lobbyCode = null;

    //* il socket non riceve più eventi da io.to().emit
    socket.leave(lobbyCode);

    callback && callback({ success: true });
  });

  //* AVVIA PARTITA
  socket.on("lobby:start", (callback) => {
    if(!socket.data.lobbyCode){
      return callback({ error: "Non sei in nessuna stanza" });
    }

    const lobby = getLobby(socket.data.lobbyCode);
    if(!lobby){
      return callback({error: "Stanza non trovata"});
    }

    try{
      prepareStart(lobby, socket);
    }catch(err){
      return callback({error: err.message});
    }
    
    //* Chiama startRound da game.service 
    startRound(lobby)
    callback({lobby: serializeLobby(lobby)});

    socket.to(lobby.code).emit("lobby:started", {
      lobby: serializeLobby(lobby)
    })
  });
}
module.exports = lobbyHandlers;
