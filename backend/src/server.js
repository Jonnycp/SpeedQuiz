const express = require("express"); //import express from "express";
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const http = require("http");
const questionCache = require("./store/questionStore.js")

const indexRouter = require("./routes/index.js");
const initSocket = require("./socket/index.js");

dotenv.config();
const app = express();
const server = http.createServer(app); //rubiamo chieste di express in direzione socket

const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;

// Inizializzazione socket.io
const io = initSocket(server);

// Parsing del body JSON in oggetto JS
app.use(express.json());

// Parsing dei cookie (per refresh token)
app.use(cookieParser());

// Swagger UI setup
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger.js");

// Serve Swagger UI at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Router express
app.use("/api/v1/", indexRouter);

// Rotta fallback (404)
app.use((req, res) => {
  res.status(404).json({ error: "Route non trovata" });
});

//Start mongo e server express + socket
if (mongoUri && mongoUri.length > 0) {
  mongoose.connect(mongoUri).then(() => {
      console.log("Connessione a MongoDB riuscita!");

      //Load domande in cache
      questionCache.load().then(() => console.log("[cache] Domande aggiornate!"))

      server.listen(PORT, () => {
        console.log(`Backend server e Socket server partito su: http://localhost:${PORT}`); // un unico server in ascolto sulla porta 3000 che inoltra le richieste HTTP gestite da express ad app, dalle richieste di handshake Websocket
      });
    }).catch((err) => {
      console.error("ERRORE: Connessione MongoDB - Causa:", err);
    });
} else {
  console.error("ERRORE: Variabile d'ambiente MONGO_URI non impostata.");
}
