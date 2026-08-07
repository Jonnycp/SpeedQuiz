import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

//const express = require("express"); versione vecchia... vecchio decrepito!

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Rotta fallback
app.use((req, res) => {
  res.status(404).json({ code: 404, error: "Route non trovata" });
});

const mongoUri = process.env.MONGODB_URI;

if (mongoUri || mongoUri.length > 0) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connessione a MongoDB riuscita!");

      app.listen(PORT, () => {
        console.log(`Backend server partito su: http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error("ERRORE Connessione MongoDB - Causa:", err);
    });
} else {
  console.error("ERRORE: Variabile d'ambiente MONGO_URI non impostata.");
}
