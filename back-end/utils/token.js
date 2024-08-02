const jwt = require('jsonwebtoken');


exports.generateAccessToken = (userid, username) => {
  return jwt.sign({ userid, username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.generateRefreshToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_REFRESH_SECRET);
};