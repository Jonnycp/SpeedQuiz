const LENGTH_CODICE = 5;
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; //senza O e 0, senza I e 1

function generateRoomCode() {
  let code = "";
  for (let l = 0; l < LENGTH_CODICE; l++) {
    code += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  
  return code;
}

module.exports = generateRoomCode;
