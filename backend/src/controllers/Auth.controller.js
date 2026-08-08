const User = require("../models/User.js");
const RefreshToken = require("../models/RefreshToken.js")
const generateJWT = require("../utils/generateJWT.js")
const jwt = require("jsonwebtoken");

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

async function gestioneRefresh(res, userId){
    const refreshToken = generateJWT.refreshToken(userId);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    await new RefreshToken({
      token: refreshToken, 
      userId: userId, 
      expiresAt: expiresAt
    }).save()

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, //non accessibile da js
      secure: process.env.MODE === "production", //solo per https (in prod)
      sameSite: "strict", //cookie inviato solo se richiesta parte da stesso sito
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 giorni
    })
}

/**
 * Enpoint POST /login
 * Effettua il login creando un JWT token e Refresh token
 * Parametri body: email, password
 */
async function login(req, res) {
  try {
    //* Verifica presenza parametri body
    if (!req.body || !req.body.email.trim() || !req.body.password.trim()) {
      return res.status(400).json({ message: "Email e password sono obbigatori." });
    }
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password.trim();

    //* Check se utente è registrato
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Email o password non valide" });
    }

    //* Check se password è giusta
    // Confronta la password in db con quella inserita nel login con il metodo nello schema
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email o password non valide" });
    }

    //* Gestione refreshToken (genera, salva in db, invia cookie)
    //Se un attaccante fa più volte il login (attacco DDos), invalido il precedente token
    const refreshToken = req.cookies.refreshToken
    if(refreshToken){
        await RefreshToken.deleteOne({token: refreshToken})
    }
    await gestioneRefresh(res, user._id)

    //* Logga correttamente e invia risposta json
    return res.status(200).json({
        token: generateJWT.accessToken(user._id),
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
 * Effettua la registrazione di un nuovo utente (e fai il login automatico)
 * Parametri body: email, password, username
 */
async function register(req, res) {
  try {
    //* Verifica presenza parametri body
    if (!req.body || !req.body.email.trim() || !req.body.password.trim() || !req.body.username.trim()) {
      return res.status(400).json({ message: "Email, password e username sono obbigatori." });
    }

    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password.trim();
    const username = req.body.username.trim().toLowerCase();

    //* Verifica correttezza parametri
    if(password.length < 8){
      return res.status(400).json({message: "Scegli una password più sicura."})
    }
    if(!EMAIL_REGEX.test(email)){
      return res.status(400).json({message: "Email non valida."})
    }
    if(username.length < 2 || username.length > 15){
      return res.status(400).json({message: "Username non valido."})
    }
    
    //* Check se email o username già usati
    const existingEmail = await User.findOne({email});
    const existingUsername = await User.findOne({username});
    
    if(existingEmail){
      return res.status(400).json({message: "Email già registrata. Effettua il login."});
    } else if(existingUsername){
      return res.status(400).json({message: "Username già esistente. Prova con un altro ;)"});
    }
    
    //* Salva utente in db
    const newUser = new User({username, email, password});
    await newUser.save();

    //* Gestione refreshToken (genera, salva in db, invia cookie)
    await gestioneRefresh(res, newUser._id)

    //* Restituzione json user
    return res.status(201).json({
      token: generateJWT.accessToken(newUser._id),
      user: { 
        id: newUser._id, 
        username: newUser.username, 
        email: newUser.email },
    });
  } catch (err){
    return res.status(500).json({ message: "Impossibile effettuare la registrazione ora." });
  }
}

/**
 * Enpoint POST /logout
 * Cancella sessione e invalida refreshToken del dispositivo
 * Lascia loggato su altri dispositivi
 */
async function logout(req, res){
  try{
    const refreshToken = req.cookies.refreshToken
    if(refreshToken){
        await RefreshToken.deleteOne({token: refreshToken})
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.MODE === "production",
      sameSite: "strict"
    })
    return res.status(200).json({message: "Logout effettuato con successo."})

  } catch (err){
    return res.status(500).json({ message: "Impossibile effettuare il logout ora." });
  }
}

/**
 * Enpoint POST /refresh
 * Nuovo accessToken da refreshToken
 * Lascia loggato su altri dispositivi
 */
async function refresh(req, res){
  try{
    //* Verifica refreshToken
    const refreshToken = req.cookies.refreshToken
    if (!token) {
      return res.status(401).json({ message: "Refresh token mancante." });
    }

    //* Decodifica per capire utente
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    const user = await User.findById(decoded.userId);
    const refreshTokenDB = RefreshToken.findOne({token: refreshToken})

    if(!user || refreshTokenDB !== token){
        return res.status(403).json({message: "Refresh token non valido."})
    }

    //* Genera nuovo access Token
    const newAccessToken = generateJWT.accessToken(user._id)
    return res.status(200).json({
        accessToken: newAccessToken
    }) 

    //* Rotation del refreshToken (refresh del refresh, per sicurezza ed evitare scadenza del refreshToken giusto quando viene chiamata)
    await RefreshToken.deleteOne({token: refreshToken})
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.MODE === "production",
      sameSite: "strict"
    })

    gestioneRefresh(res, user._id)
  } catch (err){
    return res.status(500).json({ message: "Refresh token scaduto o non valido." });
  }
}

module.exports = {
  login,
  register,
  logout,
  refresh
};
