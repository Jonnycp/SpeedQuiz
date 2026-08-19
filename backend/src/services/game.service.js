const { getLobby } = require('../store/lobbyStore');
const { startTimer, clearTimer } = require("../store/timerManager")

//* Genera l'oggetto match 
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

//* Avvia round, generando i match, imposta timer, e chiudi in automatico allo scadere
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

//* Salva le risposte di un giocatore per un match specifico
function saveAnswers(lobby, socket, matchIndex, answers){
    answers = answers ? answers.map(a => a.trim()).filter(a => a !== "") : []

    if(!answers || (matchIndex != 0 && matchIndex != 1) || answers.length < 1 || answers.length > 3){
        throw new Error("Parametri di risposta non validi")
    }

    if(lobby.status !== "ANSWERING") return callback({ error: "Fase di gioco non abilitata a ricevere risposte" });

    if(lobby.phaseEndAt < Date.now()){
        throw new Error("Tempo scaduto per rispondere");
    }

    const matches = lobby.rounds.get(lobby.currentRound);
    const myMatches = matches.filter(m => m.p1.id == socket.user.id || m.p2.id == socket.user.id)

    const match = myMatches[matchIndex];
    const me = match.p1.id == socket.user.id ? match.p1 : match.p2;
    me.answers = answers;

    return myMatches;
}

//* Conta quanti giocatori hanno ancora risposte da inviare
//Per ogni giocatore, filtra i suoi match, e capisci se ha risposte vuote
function calculateMatchLefts(lobby){
    const players = [...lobby.players.values()];
    const currentRound = lobby.rounds.get(lobby.currentRound) || [];
    const matchLefts = players.filter(p => {
        const myMatches = currentRound.filter(m => m.p1.id === p.id || m.p2.id === p.id);
        return myMatches.some(m => {
          const me = m.p1.id === p.id ? m.p1 : m.p2;
          return me.answers.length === 0;
        });
    });

    return matchLefts.length;
}

//* Avvia fase di voting, chiudendo answering
function closeAnsweringPhase(lobby){
    if(!lobby) throw new Error("Lobby non trovata")
    if(lobby.status !== "ANSWERING") throw new Error("Stanza non in fase di answering...")

    lobby.status = "VOTING";
    lobby.phaseEndAt = Date.now() + lobby.config.votingTimeMs;

    clearTimer(lobby, "answering")

    startTimer(lobby, "voting", lobby.config.votingTimeMs, () => {
        //TODO: chiudi voting
        console.log("chiudi fase voting, inizio reveal")
    })

    io.to(lobby.code).emit("")
    
}


module.exports = {
    startRound,
    saveAnswers,
    calculateMatchLefts
}