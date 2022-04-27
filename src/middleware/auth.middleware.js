const jwt = require('jsonwebtoken');
const {jwtSecret} = require("../../config/auth.config");
const UserService = require("../services/userService");
const userService = new UserService();

/**
 * Verifies jwt token and passes user to request context
 * @param req
 * @param res
 * @param next
 */
const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader){
            res.status(401).send('You are not logged in');
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, jwtSecret, async (err, decoded) => {
            const user = await userService.findUserById(decoded.id);
            if (!user) {
                res.status(404).send({message: "User not found"});
            } else {
                req.user = user;
                next();
            }
        });
    } catch(error) {
        res.status(401).send(error);
        next()
    }
};

module.exports = auth;