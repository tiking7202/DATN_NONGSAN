const jwt = require('jsonwebtoken');


exports.generateAccessToken = (userid, username, fullname, role) => {
  return jwt.sign({ userid, username, fullname, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.generateRefreshToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_REFRESH_SECRET);
};