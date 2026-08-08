const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

/**
 * Enpoint POST /login
 * Effettua il login creando un JWT token
 * Parametri body: email, password
 */
async function login(req, res) {
  try {
    if (!req.body || !req.body.email || !req.body.password) {
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

    // Genera access token JWT
    const token = jwt.sign({
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res.status(200).json({
        token,
        user: { id: user._id, username: user.username, email: user.email },
      });

  } catch (err) {
    return res.status(500).json({ message: "Impossibile effettuare il login ora..." });
  }
}

module.exports = {
  login,
};