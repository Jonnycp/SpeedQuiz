const { getLobby } = require("../../store/lobbyStore")
const { addPlayer } = require("../../services/lobby.service")

function registerLobbyHandlers(io, socket) {
    socket.on("lobby:join", ({lobbyCode}) => {
        if(!lobbyCode.trim()){
            return socket.emit("lobby:error", {message: "Il codice della stanza è obbligatorio"})
        }

        const lobby = getLobby(lobbyCode.trim().toUpperCase())

        if(!lobby){
           return socket.emit("lobby:error", {message: "Stanza inesistente"})
        }

        //* Giocatore ufficialmente entra in stanza (aggiungilo in RAM, entra in stanza, notificalo)
        const newPlayer = addPlayer(lobby, socket)
        socket.data.lobbyCode = lobby.code
        socket.join(lobby.code)
        //TODO: serializzazione lobby??? purtroppo 
        socket.emit("lobby:joined", {lobby: lobby, amIhost: lobby.hostId === socket.user.id})

        //* Notifichiamo altri giocatori (tranne se stesso)
        socket.to(lobby.code).emit("lobby:player_joined", {
            player: newPlayer,
            lobby: lobby
        })

        //TODO: gestione riconessione giocatore
    })
}

module.exports = registerLobbyHandlers