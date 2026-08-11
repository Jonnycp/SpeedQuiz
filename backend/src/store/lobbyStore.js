//Semplice wrapper di funzioni per interagire con map lobbies
//Equiparabile a private lobbies, con metodi pubblici... in java

const lobbies = new Map();

function getLobby(code){
    return lobbies.get(code);
}

function setLobby(code, lobby){
    return lobbies.set(code, lobby);
}

function hasLobby(code){
    return lobbies.has(code);
}

function lobbyOwned(userId){
    const lobby = [...lobbies.values()].filter(l => l.hostId === userId && l.status === "LOBBY");
    return lobby;
}

function getPublicLobbies(code){
    return [...lobbies.values()].filter(l => l.config.public && l.players.size < l.config.maxPlayers && l.status === "LOBBY");
}

module.exports = {
    getLobby,
    setLobby,
    hasLobby,
    lobbyOwned,
    getPublicLobbies
}