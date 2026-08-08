const crypto = require("crypto")

console.log("\n--------\nTieni al sicuro questa chiave nel .env")
console.log(crypto.randomBytes(32).toString("hex")+"\n--------\n\n")