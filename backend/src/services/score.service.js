//* Calcola vincitore del match
function calculateMatchWinner(lobby, match){
    if(!lobby) throw new Error("Lobby non trovata")
    if(!match) throw new Error("Match non trovato")
    
    const votedForP1 = match.p1.votedBy.length;
    const votedForP2 = match.p2.votedBy.length;

    //*  calcola lo score, solo se il player ha scritto almeno una risposta
    const scoreP1 = match.p1.answers.length > 0 ? calculateScore(lobby.currentRound, votedForP1, lobby.players.size-2) : 0;
    const scoreP2 = match.p2.answers.length > 0 ? calculateScore(lobby.currentRound, votedForP2, lobby.players.size-2) : 0;

    //* aggiornamento score anche in lobby
    match.p1.score = scoreP1;
    match.p2.score = scoreP2;

    lobby.players.get(match.p1.id).score += scoreP1;
    lobby.players.get(match.p2.id).score += scoreP2;

    //* determinazione del vincitore 
    if(scoreP1 > scoreP2){
        match.p1.isWinner = true;
        return match.p1;
    }else if(scoreP2 > scoreP1){
        match.p2.isWinner = true;
        return match.p2;
    }else{
        match.p1.isWinner = true;
        match.p2.isWinner = true;
        return null; //pareggio
    }
}

//* Funzione per calcolare punteggi: round*10 + %preferenza + bonus (se 100%)
function calculateScore(indexRound, votedFor, voters){
    const perc = Math.floor(votedFor/voters * 100)
    const bonus = perc === 100 ? Number(process.env.BONUS) : 0;
 
    return indexRound*10 + perc + bonus
}

module.exports = { calculateMatchWinner }