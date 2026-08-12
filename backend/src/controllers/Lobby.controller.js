const { lobbyOwned, getPublicLobbies, serializeLobby } = require("../store/lobbyStore")
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
            const newLobby = createLobby(req.userId, req.username);
            return res.status(201).json({message: "Stanza creata con successo", code: newLobby.code})
        }
    }catch (err) {
        return res.status(500).json({message: "Impossibile creare una stanza ora :("})
    }
}

async function getPublic(req, res) {
    try{
        const publicLobbies = getPublicLobbies(); // è un array di lobby in cui ogni lobby contiene 2 map (players e rounds) -> applico serializedlobby su ogni lobby 
        const serialized = publicLobbies.map((lobby) => {
            return serializeLobby(lobby);
        });
        return res.status(200).json({message: "Lobby pubbliche restituite con successo.", lobbies: serialized});
    }catch(err){
        return res.status(500).json({message: "Impossibile ottenere le stanze pubbliche ora."});
    }
}

module.exports = {
    create,
    getPublic
}