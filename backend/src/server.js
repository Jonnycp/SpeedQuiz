const express = require("express"); //import express from "express";
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const indexRouter = require("./routes/index.js");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;

// Parsing del body in JSON
app.use(express.json());

// Parsing dei cookie (per refresh token)
app.use(cookieParser());

//Router
app.use("/api/v1/", indexRouter);

// Rotta fallback (404)
app.use((req, res) => {
  res.status(404).json({ error: "Route non trovata" });
});

//Start mongo e  server
if (mongoUri || mongoUri.length > 0) {
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Connessione a MongoDB riuscita!");

      app.listen(PORT, () => {
        console.log(`Backend server partito su: http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error("ERRORE: Connessione MongoDB - Causa:", err);
    });
} else {
  console.error("ERRORE: Variabile d'ambiente MONGO_URI non impostata.");
}
