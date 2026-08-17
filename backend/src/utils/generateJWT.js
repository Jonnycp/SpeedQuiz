const jwt = require("jsonwebtoken");

function accessToken(userId, username){
  const token = jwt.sign({
        userId: userId,
        username: username
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
  return token;
}

function refreshToken(userId){
  const token = jwt.sign({
        userId: userId,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );
  return token;
}

module.exports = {
    accessToken,
    refreshToken
}