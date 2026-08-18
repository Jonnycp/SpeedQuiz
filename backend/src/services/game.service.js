const { getLobby } = require('../store/lobbyStore');
const { startTimer } = require("../store/timerManager")

function createMatch(player1, player2, question){
    return {
        question: question, //id, text
        p1: {
            id: player1.id,
            username: player1.username,
            answers: [],
            votedBy: [],
            score: 0
        },
        p2: {
            id: player2.id,
            username: player2.username,
            answers: [],
            votedBy: [],
            score: 0
        },
    }
}

function startRound(lobby){
    if(lobby.currentRound >= lobby.config.rounds){
        //TODO: endGame
    }

    lobby.status = "ANSWERING";
    lobby.currentRound++;

    //* Genera match del round
    const players = [...lobby.players.values()]
    const matches = [];
    for(let i=0; i<players.length; i++){
        const p1 = players[i]
        const p2 = players[(i+1) % players.length] //Con % si torna indietro a ciclo

        matches.push(createMatch(p1, p2, lobby.questions[i + lobby.currentRound*players.length]))        
    }

    lobby.rounds.set(lobby.currentRound, matches)
    lobby.phaseEndAt = Date.now() + lobby.config.answerTimeMs*2 //ognuno risponde a 2 domande

    startTimer(lobby, "answering", lobby.config.answerTimeMs*2, () => {
        //TODO: CHIUDI FASE answering
        console.log("chiudi fase answering, inizio voting")
    })
}




module.exports = {
    startRound
}