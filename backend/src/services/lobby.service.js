const generateRoomCode = require("../utils/generateRoomCode")
const { setLobby } = require("../store/lobbyStore")

function createLobby(ownerId, owenerUsername) {
    const code = generateRoomCode()
    const newLobby = {
        code: code,
        hostId: ownerId,
        hostUsername: owenerUsername,
        status: "LOBBY", //LOBBY, ANSWERING, VOTING, REVEAL, ENDED
        createdAt: Date.now(),
        config: {
            public: false,
            minPlayers: 3,
            maxPlayers: 8,
            anwserTimeMs: 30000, //30sec default
            votingTimeMs: 30000, //30sec default
        },
        players: new Map(), //idPlayer => {}
        currentRound: -1,
        rounds: new Map() //indexRound => {}
    }
    setLobby(code, newLobby) // modifica la Map lobbies aggiungendo una nuova lobby con chiave code e valore new lobby 
    return newLobby
}

function addPlayer(lobby, socket){
    //* Gestione persone che erano entrate e si sono disconnesse per sbaglio
    const existingPlayer = lobby.players.get(socket.user.id)
    
    //* Attaccante che è connesso e chiama dinuovo la funzione
    if(existingPlayer && existingPlayer.connected){
        throw new Error("Sei già in questa stanza!")
    }

    //* Fai rientrare utente disconnesso
    if(existingPlayer && !existingPlayer.connected){
        existingPlayer.socketId = socket.id;
        existingPlayer.connected = true;
        existingPlayer.disconnectedAt = null;

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

module.exports = {
    createLobby,
    addPlayer
}