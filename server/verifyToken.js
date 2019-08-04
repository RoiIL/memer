var jwt = require('jsonwebtoken');
var config = require('./config');

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ authentication: false, message: 'Access denied.' });
  }
    
  jwt.verify(token, config.secret, function(error, decoded) {
    if (error) {
        return res.status(403).send({ authentication: false, message: 'Access denied.' });
    }
      
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;