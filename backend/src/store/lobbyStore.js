//Semplice wrapper di funzioni per interagire con map lobbies
//Equiparabile a private lobbies, con metodi pubblici... in java

const lobbies = new Map();

function getLobby(code) {
  return lobbies.get(code);
}

function setLobby(code, lobby) {
  return lobbies.set(code, lobby);
}

function hasLobby(code) {
  return lobbies.has(code);
}

function lobbyOwned(userId) {
  const lobby = [...lobbies.values()].filter(
    (l) => l.hostId === userId && l.status === "LOBBY",
  );
  return lobby;
}

function getPublicLobbies() {
  return [...lobbies.values()].filter((l) =>
      l.config.public &&
      l.players.size < l.config.maxPlayers &&
      l.status === "LOBBY",
  );
}

function deleteLobby(code) {
  return lobbies.delete(code);
}

//* elimina le lobby per evitare che la Map delle lobbies cresca indefinitamente 
function reap(){
  const now = Date.now();
  [...lobbies.values()].forEach((lobby) => {
    const isEmpty = lobby.players.size === 0;
    const isOld = now - lobby.lastActivityAt > 10 * 60 * 1000;
    
    if (isEmpty && isOld) {
      lobbies.delete(lobby.code);
    }
  })
}

function startReaper() {
  console.log("[socket] Avvio reaper per eliminare le lobby inattive");
  setInterval(reap, 5 * 60 * 1000);
}

// ritorna un nuovo oggetto lobby in cui le Map (players e rounds) sono trasformate in array grazie a .values(),
// che restituisce un iteratore, e allo spread operator, che consuma quell'iteratore prendendo ogni valore e salvandolo in un nuovo array -> necessario perché JSON.strinfigy() non sa serializzare le Map
function serializeLobby(lobby) {
  return {
    code: lobby.code,
    hostId: lobby.hostId,
    hostUsername: lobby.hostUsername,
    status: lobby.status,
    config: {
      public: lobby.config.public,
      rounds: lobby.config.rounds,
      minPlayers: lobby.config.minPlayers,
      maxPlayers: lobby.config.maxPlayers,
      answerTimeMs: lobby.config.answerTimeMs,
      votingTimeMs: lobby.config.votingTimeMs,
      revealTimems: lobby.config.revealTimems,
    },
    currentRound: lobby.currentRound,
    currentVoting: lobby.currentVoting,
    phaseEndAt: lobby.phaseEndAt,
    players: [...lobby.players.values()],
    rounds: [...lobby.rounds.values()],
    gameId: lobby.gameId
  };
}

module.exports = {
  getLobby,
  setLobby,
  hasLobby,
  deleteLobby,
  lobbyOwned,
  getPublicLobbies,
  serializeLobby,
  startReaper
};
