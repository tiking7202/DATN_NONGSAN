const jwt = require('jsonwebtoken');


exports.generateAccessToken = (userid, username, fullname, role, avatar) => {
  return jwt.sign({ userid, username, fullname, role, avatar }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.generateRefreshToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_REFRESH_SECRET);
};