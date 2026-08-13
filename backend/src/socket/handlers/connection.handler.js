const { getLobby, serializeLobby } = require("../../store/lobbyStore");
const { markPlayerAsDisconnected } = require("../../services/lobby.service");

function connectionHandlers(io, socket) {
  socket.on("disconnect", () => {
    console.log(`[socket] - disconnesso ${socket.user.username}`);
    
    //* Controllo se player era in game
    const code = socket.data.lobbyCode;
    if (!code) return;

    const lobby = getLobby(code);
    if (!lobby) return;

    //* Rimuovi player al termine del grace time
    try {
      markPlayerAsDisconnected(socket, lobby, () => {
        io.to(lobby.code).emit("lobby:player_disconnected", {
          playerDisconnected: socket.user.id,
          lobby: serializeLobby(lobby),
        });
      });
    } catch (err) {
      return socket.emit("connection:error", { message: err.message });
    }

    //* Evento per avvisare che player è andato offline
     io.to(lobby.code).emit("lobby:player_offline", {
        playerDisconnected: socket.user.id,
        lobby: serializeLobby(lobby),
      });
  });
}

module.exports = connectionHandlers;
