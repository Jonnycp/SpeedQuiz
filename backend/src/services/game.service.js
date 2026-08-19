const { getLobby, serializeLobby } = require('../store/lobbyStore');
const { startTimer, clearTimer } = require("../store/timerManager")

//* Genera l'oggetto match 
function createMatch(player1, player2, question){
    return {
        question: question, //id, text
        isVoted: false,
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
function startRound(lobby, io){
    if(lobby.currentRound >= lobby.config.rounds){
        //TODO: endGame
    }

    lobby.status = "ANSWERING";
    lobby.currentRound++;
    lobby.currentVoting = -1;

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
        console.log("chiudi fase answering, inizio voting")
        startVotingPhase(lobby, io)
    })

    return lobby;
}

//* Salva le risposte di un giocatore per un match specifico
function saveAnswers(lobby, socket, matchIndex, answers){
    answers = answers ? answers.map(a => a.trim()).filter(a => a !== "") : []

    if(!answers || (matchIndex != 0 && matchIndex != 1) || answers.length < 1 || answers.length > 3){
        throw new Error("Parametri di risposta non validi")
    }

    if(lobby.status !== "ANSWERING") throw new Error("Fase di gioco non abilitata a ricevere risposte" );

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

//* Verifica se ci sono risposte nel match da votare
function hasMatchAnswersNotVoted(match){
    const hasAnwers = match.p1.answers.length > 0 || match.p2.answers.length > 0;
    return hasAnwers && !match.isVoted;
}

//* Avvia fase di voting, chiudendo answering
function startVotingPhase(lobby, io){
    if(!lobby) throw new Error("Lobby non trovata")
    if(lobby.status !== "ANSWERING") throw new Error("Stanza non in fase di answering...")
    
    clearTimer(lobby, "answering");

    const currentRound = lobby.rounds.get(lobby.currentRound);
    lobby.currentVoting = currentRound.findIndex(m => hasMatchAnswersNotVoted(m));

    if(lobby.currentVoting === -1){
        //TODO: next Rounds... niente più match da votare
        console.log("Nessun match da votare, nuovo match")
    }

    lobby.status = "VOTING";
    lobby.phaseEndAt = Date.now() + lobby.config.votingTimeMs;

    startTimer(lobby, "voting", lobby.config.votingTimeMs, () => {
        //TODO: chiudi voting
        console.log("chiudi fase voting, inizio reveal")
    })

    io.to(lobby.code).emit("game:voting_started", {
        lobby: serializeLobby(lobby),
        serverNow: Date.now()
    })
}

//* Salva voto di un giocatore per il match corrente
function saveVote(lobby, socket, voteFor){
    if(!voteFor.trim()) throw new Error("Inserisci l'id del player da votare");
        
    if(lobby.status !== "VOTING") {
        throw new Error("Fase di gioco non abilitata a ricevere risposte");
    }
    
    if(lobby.phaseEndAt < Date.now()){
        throw new Error("Tempo scaduto per rispondere");
    }
    
    const currentRound = lobby.rounds.get(lobby.currentRound);
    if(lobby.currentVoting < 0 || lobby.currentVoting > currentRound.length){
        throw new Error("Match votabile non valido");
    }

    const currentMatch = currentRound[lobby.currentVoting]

    const hasVoted = [...currentMatch.p1.votedBy, ...currentMatch.p2.votedBy].find(v => v === socket.user.id)
    if(hasVoted) throw new Error("Hai già votato in questo match.");

    let votedFor;
    if(currentMatch.p1.id === voteFor.trim()){
        votedFor = currentMatch.p1;
    }else if(currentMatch.p2.id === voteFor.trim()){
        votedFor = currentMatch.p2;
    }else{
        throw new Error(`Il player con id ${voteFor.trim()} non ha partecipato in questo match`)
    }
    
    currentMatch.isVoted = true;
    votedFor.votedBy.push(socket.user.id)

    return currentMatch
}

//* Calcola voti mancanti al match corrente
function calculateVotesLeft(lobby){
    const currentRound = lobby.rounds.get(lobby.currentRound) || [];
    if(lobby.currentVoting < 0) return 0;

    const currentMatch = currentRound[lobby.currentVoting]
    const players = [...lobby.players.keys()].filter(p => currentMatch.p1.id || currentMatch.p2.id)

    const votesLeft = players.filter(p => {
        !currentMatch.p1.votedBy.includes(p) || !currentMatch.p2.votedBy.includes(p)
    });

    return votesLeft.length;
}


module.exports = {
    startRound,
    saveAnswers,
    startVotingPhase,
    saveVote,
    calculateMatchLefts,
    calculateVotesLeft
}