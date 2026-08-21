const generateRoomCode = require("../utils/generateRoomCode");
const { pickRandom } = require("../store/questionStore");
const { setLobby } = require("../store/lobbyStore");
const { clearAllTimer } = require("../store/timerManager");


function createLobby(ownerId, owenerUsername) {
    const code = generateRoomCode()
    const newLobby = {
        code: code,
        hostId: ownerId,
        hostUsername: owenerUsername,
        status: "LOBBY", //LOBBY, ANSWERING, VOTING, REVEAL, PAUSED, ENDED
        createdAt: Date.now(),
        lastActivityAt: Date.now(),
        config: {
            public: false,
            rounds: Number(process.env.ROUNDS_DEFAULT),
            minPlayers: 3,
            maxPlayers: Number(process.env.MAX_PLAYERS),
            answerTimeMs: Number(process.env.DEFAULT_ANSWER_TIME), //30sec default
            votingTimeMs: Number(process.env.VOTING_TIME) , //30sec default
            revealTimeMs: Number(process.env.REVEAL_TIME), //15sec default
        },
        players: new Map(), //idPlayer => {}
        questions: [],
        currentRound: -1,
        currentVoting: -1,
        disconnectedTimers: new Map(),
        timers: {
            answering: null,
            voting: null,
            reveal: null
        },
        rounds: new Map(), //indexRound => {}
        phaseEndAt: null,
        gameId: null
    }
    
    setLobby(code, newLobby) // modifica la Map lobbies aggiungendo una nuova lobby con chiave code e valore new lobby 
    return newLobby
}

function addPlayer(lobby, socket){
    //* Gestione persone che erano entrate e si sono disconnesse per sbaglio
    const existingPlayer = lobby.players.get(socket.user.id)
    
    //* Gestione multiaccesso dallo stesso dispositivo (stesso socketId)
    if(existingPlayer && existingPlayer.connected && existingPlayer.socketId !== socket.id){
        throw new Error("Sei già in questa stanza!")
    }

    //* Fai rientrare utente disconnesso
    if(existingPlayer && !existingPlayer.connected){
        existingPlayer.socketId = socket.id;
        existingPlayer.connected = true;
        existingPlayer.disconnectedAt = null;
        
        const timer = lobby.disconnectedTimers.get(socket.user.id)
        if(timer){
            clearTimeout(timer)
            lobby.disconnectedTimers.delete(socket.user.id)
        }
        return existingPlayer
    }

    //* Controlli per fare entrare nuovo giocatore
    if(lobby.players.size >= lobby.config.maxPlayers){
        throw new Error("La stanza è piena")
    }

    if(lobby.status !== "LOBBY"){
        throw new Error("Partita già iniziata")
    }

    //* Nuovo giocatore dentro
    const newPlayer = {
        id: socket.user.id,
        username: socket.user.username,
        socketId: socket.id,
        connected: true,
        disconnectedAt: null,
        score: 0
    }

    lobby.players.set(newPlayer.id, newPlayer)
    return newPlayer
}

function removePlayer(lobby, socket, callback){

    //* Controllo se è lo stesso giocatore connesso dallo stesso dispositivo
    const player = lobby.players.get(socket.user.id);
    if(!player || player.socketId !== socket.id) return false;

    lobby.players.delete(socket.user.id);

    //* Uscita da stanza multicast
    socket.data.lobbyCode = null;
    socket.leave(lobby.code);

    //* Gestione se esce host
    if (lobby.hostId === socket.user.id && lobby.players.size > 0){
        lobby.hostId = [...lobby.players.keys()][0] 
        lobby.hostUsername = lobby.players.get(lobby.hostId).username
    }

    if (lobby.players.size < lobby.config.minPlayers && lobby.status !== "LOBBY" && lobby.status !== "ENDED"){
        lobby.status = "LOBBY"
        lobby.phaseEndAt = null
        lobby.currentRound = -1
        lobby.currentVoting = -1
        lobby.rounds.clear()
        lobby.questions = []
        clearAllTimer(lobby)
    }

    //* Chiamata callback (solitamente evento per notificare altri giocatori)
    callback && callback();
    return true;
}

function markPlayerAsDisconnected(socket, lobby, callback){
    //* CHECK SE GIOCATORE ESISTE
    if(!lobby) throw new Error("Partita non trovata");
    const player = lobby.players.get(socket.user.id)
    if(!player || player.socketId !== socket.id) return;

    //* AGGIORNA DATI GIOCATORE (offline, tempo di disconnessione)
    player.connected = false;
    player.disconnectedAt = Date.now();

    //* TIMER PER RICONESSIONE (se si riconnette entro X sec, altrimenti eliminalo)
    const timer = setTimeout(() => {
        if(!player.connected){
            removePlayer(lobby, socket, callback);
        }
        lobby.disconnectedTimers.delete(socket.user.id);
    }, process.env.DISCONNECTED_TIME || "30000");
    
    //* SALVA TIMER NELLA MAP lobby.disconnectedTimers
    lobby.disconnectedTimers.set(socket.user.id, timer);
}

function prepareStart(lobby, socket){
    if(lobby.status !== "LOBBY" && lobby.status !== "PAUSED"){
      throw new Error("La partita è già stata avviata");
    }
    
    if(lobby.hostId !== socket.user.id){
      throw new Error("Solo l'host può avviare la partita");
    }
    
    //*MINIMO persone online
    const players = [...lobby.players.values()]
    if(players.filter(p => p.connected).length < lobby.config.minPlayers){
      throw new Error("Non ci sono abbastanza giocatori connessi");
    }

    //*Pesca domande per tutti i rounds
    lobby.questions = pickRandom(players.length, "text");

    return lobby;
}

module.exports = {
    createLobby,
    addPlayer,
    removePlayer,
    markPlayerAsDisconnected,
    prepareStart
}