const jwt = require('jsonwebtoken');
const env = require('../.env');

module.exports = (req, res, next) => {
    let token = req.headers['authorization'].split(' ')[1];
  
    if (!token)
        return res.status(403).send({ error: 'No token provided.' });
    else {
        jwt.verify(token, env.authSecret, (err, decoded) => {
            if (err) {
                return res.status(403).send({ error: 'Token invalid.' });
            }
            else {
                return next();
            }
        });
    }
}