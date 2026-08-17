//type = answering | voting | reveal

function startTimer(lobby, type, timeMs, callback){
    clearTimer(lobby, type)
    lobby.timers[type] = setTimeout(callback, timeMs)
}

function clearTimer(lobby, type){
    if(lobby.timers[type]){
        clearTimeout(lobby.timers[type]);
        lobby.timers[type] = null;
    }
}

function clearAllTimer(lobby){
    Object.keys(lobby.timers).forEach(t => clearTimer(lobby, t))
}

module.exports = {
    startTimer,
    clearTimer,
    clearAllTimer,
}