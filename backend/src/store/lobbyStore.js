const generateRoomCode = require("../utils/generateRoomCode")

const lobbies = new Map()

function createLobby(ownerId) {
    const code = generateRoomCode()
    const newLobby = {
        code: code,
        hostId: ownerId,
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
    lobbies.set(code, newLobby)
    return newLobby
}

function lobbyOwned(userId){
    const lobby = [...lobbies.values()].filter(l => l.hostId === userId && l.status === "LOBBY");
    return lobby;
}

function getLobby(code){
    return lobbies.get(code);
}

function getPublicLobbies(code){
    return [...lobbies.values()].filter(l => l.config.public && l.players.size < l.config.maxPlayers && l.status === "LOBBY")
}

module.exports = {
    createLobby,
    lobbyOwned,
    getLobby,
    getPublicLobbies
}