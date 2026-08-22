const { Server } = require("socket.io");
const jwt = require('jsonwebtoken')

const lobbyHandlers = require("./handlers/lobby.handler")
const connectionHandlers = require("./handlers/connection.handler")
const gameHandlers = require("./handlers/game.handler")

module.exports = function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  //* Middleware autenticazione socket
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Access Token mancante."));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      socket.user = {
        id: decoded.userId,
        username: decoded.username
      };
      socket.data.lobbyCode = null;
      next();

    } catch (err) {
      return next(new Error("Access Token non valido."));
    }
  });

  io.on("connection", (socket) => {
    console.log(`[socket] - connesso ${socket.user.username}`);

    lobbyHandlers(io, socket);
    connectionHandlers(io, socket);
    gameHandlers(io, socket)
  });
};
