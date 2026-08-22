const Game = require("../models/Game.js");
const User = require("../models/User.js");
const Question = require("../models/Question.js");

async function saveGameResult(lobby) {
  const winnerPlayer = [...lobby.players.values()].reduce((prev, current) => {
    return prev.score > current.score ? prev : current;
  });

  //* Salvataggio partita nel database
  const game = new Game({
    hostId: lobby.hostId,
    hostUsername: lobby.hostUsername,
    config: {
      nRounds: lobby.config.rounds,
      answerTime: lobby.config.answerTimeMs / 1000,
    },
    players: [...lobby.players.values()].map((player) => ({
      user: player.id,
      username: player.username,
      score: player.score,
      isWinner: winnerPlayer.id === player.id,
    })),
  });
  await game.save();


  //* aggiornamento statistiche utente
  async function updateUser(player, winnerPlayer) {
    await User.findByIdAndUpdate(player.id, {
      $inc: {
        "stats.gamesPlayed": 1,
        "stats.gamesWon": winnerPlayer.id === player.id ? 1 : 0,
        "stats.points": player.score,
      },
    });
  }

  await Promise.all([...lobby.players.values()].map((p) => updateUser(p, winnerPlayer)));

  return game;
}

//* aggiornamento delle domande 
async function updateUsedQuestions(lobby) {
    const rounds = [...lobby.rounds.values()]
    const questions = rounds.flat().map(m => m.question._id)

    questions.forEach(async (questionId) => {
        await Question.findByIdAndUpdate(questionId, {
            $inc: { timesUsed: 1 }
        });
    });
}

async function savingENDGame(lobby){
    await updateUsedQuestions(lobby)
    return saveGameResult(lobby)
}

module.exports = { saveGameResult, updateUsedQuestions, savingENDGame }
