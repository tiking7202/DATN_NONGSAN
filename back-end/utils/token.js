const jwt = require('jsonwebtoken');

exports.generateAccessToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

exports.generateRefreshToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_REFRESH_SECRET);
};