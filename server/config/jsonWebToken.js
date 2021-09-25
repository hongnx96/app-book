const JWT = require('jsonwebtoken');

const { JWT_SECRET } = require('./variable');

module.exports = {
    encodeToken: (user_id) => {
        return JWT.sign({
            iss: 'Nguyen Hong',
            sub: user_id,
            iat: new Date().setTime(),
            ext: new Date().setDate(new Date().getDate() + 3)
        }, JWT_SECRET);
    }
}