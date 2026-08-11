const generateRoomCode = require("../utils/generateRoomCode")
const { setLobby } = require("../store/lobbyStore")

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
    setLobby(code, newLobby)
    return newLobby
}

function addPlayer(){

}

module.exports = {
    createLobby
}