const jwt = require('jsonwebtoken');
const JWT_SECRET = 'iamsahilchalke'

const fetchuser = (req, res, next) => {
    //Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: 'plese authenticate using valid tokens' })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'plese authenticate using valid tokens' })
    }

}

module.exports = fetchuser;