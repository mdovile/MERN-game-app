const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No authorization token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token invalid' });
  }
};
