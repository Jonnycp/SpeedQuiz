const { Server } = require("socket.io");

module.exports =  function initSocket(server) {
    const io = new Server(server, {
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST"]
      },
    });

    io.on("connection", (socket) => {
      console.log(`[socket] - connesso ${socket.id}`)

      registerLobbyHandles(io, socket);

      socket.on("disconnect", () => {
        console.log(`[socket] - disconnesso ${socket.id}`)
      })
    })
}

