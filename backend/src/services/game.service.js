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

    return lobby;
}

function saveAnswers(lobby, socket, matchIndex, answers){
    if(!answers || (matchIndex != 0 && matchIndex != 1) || answers.length > 3){
        throw new Error("Parametri di risposta non validi")
    }

    if(lobby.status !== "ANSWERING") return callback({ error: "Fase di gioco non abilitata a ricevere risposte" });

    //TODO: tempo scaduto?
    //TODO: pulizia input
    const matches = lobby.rounds.get(lobby.currentRound)
    const myMatches = matches.filter(m => m.p1.id == socket.user.id || m.p2.id == socket.user.id)

    myMatches[matchIndex].answers = answers;

    const match = myMatches[matchIndex];
    const me = match.p1.id == socket.user.id ? match.p1 : match.p2;
    me.answers = answers;

    return myMatches
}

module.exports = {
    startRound,
    saveAnswers
}