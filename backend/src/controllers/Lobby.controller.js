const { lobbyOwned } = require("../store/lobbyStore")
const { createLobby } = require("../services/lobby.service")
/**
 * Enpoint POST /lobbies
 * Crea una nuova stanza (in RAM) con il lobbyStore
 */
async function create(req, res) {
    try{
        const userLobby = lobbyOwned(req.userId);
        
        if(userLobby.length > 0){
            return res.status(200).json({message: "Stanza già esistente", code: userLobby[0].code})
        } else {
            const newLobby = createLobby(req.userId);
            return res.status(201).json({message: "Stanza creata con successo", code: newLobby.code})
        }
    }catch (err) {
        return res.status(500).json({message: "Impossibile creare una stanza ora :("})
    }
}

module.exports = {
    create
}