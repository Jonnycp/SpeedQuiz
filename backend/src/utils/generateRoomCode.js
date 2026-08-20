const { hasLobby } = require("../store/lobbyStore");

const LENGTH_CODICE = process.env.CODE_LENGTH || 5;
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; //senza O e 0, senza I e 1

function generateRoomCode() {
  let code = "";
  for (let l = 0; l < LENGTH_CODICE; l++) {
    code += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  
  //anche se non arriveremo mai a circa 268mln di utenti contemporanei... (32^5 * 8)
  if(hasLobby(code)){
    return generateRoomCode();
  }else{
    return code;
  }

}

module.exports = generateRoomCode;
