const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

function generateJWT(userId){
  const token = jwt.sign({
        userId: userId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
  return token;
}

/**
 * Enpoint POST /login
 * Effettua il login creando un JWT token
 * Parametri body: email, password
 */
async function login(req, res) {
  try {
    if (!req.body || !req.body.email.trim() || !req.body.password.trim()) {
      return res.status(400).json({ message: "Email e password sono obbigatori." });
    }
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password.trim();

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Email o password non valide" });
    }

    // Confronta la password in db con quella inserita nel login con il metodo nello schema
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email o password non valide" });
    }

    return res.status(200).json({
        token: generateJWT(user._id),
        user: { 
          id: user._id, 
          username: user.username, 
          email: user.email },
      });

  } catch (err) {
    return res.status(500).json({ message: "Impossibile effettuare il login ora." });
  }
}

/**
 * Enpoint POST /register
 * Effettua la registrazione di un nuovo utente
 * Parametri body: email, password, username
 */
async function register(req, res) {
  try {

    if (!req.body || !req.body.email.trim() || !req.body.password.trim() || !req.body.username.trim()) {
      return res.status(400).json({ message: "Email, password e username sono obbigatori." });
    }

    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password.trim();
    const username = req.body.username.trim().toLowerCase();

    if(password.length < 8){
      return res.status(400).json({message: "Scegli una password più sicura."})
    }
    if(!EMAIL_REGEX.test(email)){
      return res.status(400).json({message: "Email non valida."})
    }
    if(username.length < 2 || username.length > 15){
      return res.status(400).json({message: "Username non valido."})
    }
    
    const existingEmail = await User.findOne({email});
    const existingUsername = await User.findOne({username});
    
    if(existingEmail){
      return res.status(400).json({message: "Email già registrata. Effettua il login."});
    } else if(existingUsername){
      return res.status(400).json({message: "Username già esistente. Prova con un altro ;)"});
    }
    
    const newUser = new User({username, email, password});
    await newUser.save();
    
    return res.status(201).json({
      token: generateJWT(newUser._id),
      user: { 
        id: newUser._id, 
        username: newUser.username, 
        email: newUser.email },
    });
  } catch (err){
    console.error(err)
    return res.status(500).json({ message: "Impossibile effettuare la registrazione ora." });
  }
}

module.exports = {
  login,
  register,
};