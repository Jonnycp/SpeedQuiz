const Game = require("../models/Game.js");
const User = require("../models/User.js");
/**
 * Endpoint GET /profile/stats
 * Recupera le statistiche dell'utente e le ultime 10 partite giocate
 */
async function getProfileStats(req, res) {
  try {
    //*cerco l'utetne
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato." });
    }

    //* calcolo winRate
    let winRate = "0.00";
    if (user.stats.gamesPlayed > 0) {
      winRate = ((user.stats.gamesWon / user.stats.gamesPlayed) * 100).toFixed(
        2,
      );
    }

    //* recupero le ultime 10 partite giocate dall'utente
    const recentGames = await Game.find({ "players.user": req.userId })
      .sort({ createdAt: -1 }) //? Ordina dalla più recente alla più vecchia
      .limit(10);

    //* formatto i games per il frontend
    const formattedGames = recentGames.map((game) => {
      const me = game.players.find((p) => p.user.toString() === req.userId.toString(),);
      return {
        id: game._id,
        title: `STANZA DI ${game.hostUsername}`,
        players: game.players.length,
        date: game.createdAt,
        isWinner: me ? me.isWinner : false,
      };
    });

    res.status(200).json({
      stats: {
        points: user.stats.points,
        gamesWon: user.stats.gamesWon,
        gamesPlayed: user.stats.gamesPlayed,
        winRate: winRate,
      },
      games: formattedGames,
    });
  } catch (error) {
    console.error("Errore recupero statistiche:", error);
    return res
      .status(500)
      .json({ message: "Impossibile caricare il profilo in questo momento." });
  }
}

module.exports = {
  getProfileStats,
};
